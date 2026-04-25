import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import { sendWaitlistSignupEmail } from '@/lib/email';
import {
  encryptTextIfPossible,
  enforceRateLimit,
  getClientIp,
  isSqliteConstraintError,
  normalizeEmail,
  sanitizeName,
  sha256Hex,
  validateCsrf,
  validateSameOrigin,
  verifyTurnstile,
} from '@/lib/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WaitlistBodySchema = z.object({
  email: z.string().min(1).max(254),
  name: z.string().max(100).optional(),
  referralCode: z.string().max(64).optional(),
  captchaToken: z.string().min(1).optional(),
});

function generateReferralCode(): string {
  const bytes = crypto.randomBytes(9);
  return bytes
    .toString('base64url')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 12);
}

export async function POST(req: Request) {
  if (!validateSameOrigin(req)) {
    return NextResponse.json({ message: 'Invalid origin' }, { status: 403 });
  }
  if (!validateCsrf(req)) {
    return NextResponse.json({ message: 'CSRF validation failed' }, { status: 403 });
  }
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return NextResponse.json({ message: 'Unsupported content type' }, { status: 415 });
  }

  const now = Date.now();
  const database = getDb();
  const ip = getClientIp(req);

  const ipLimit = enforceRateLimit({
    db: database,
    key: `waitlist:ip:${ip}`,
    limit: 20,
    windowMs: 10 * 60 * 1000,
    now,
  });
  if (!ipLimit.ok) {
    return NextResponse.json(
      { message: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(ipLimit.retryAfterSeconds) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const parsed = WaitlistBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const email = parsed.data.email;
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail || !EMAIL_REGEX.test(normalizedEmail)) {
    return NextResponse.json({ message: 'Please enter a valid email address' }, { status: 400 });
  }

  const emailHash = sha256Hex(normalizedEmail);
  const emailLimit = enforceRateLimit({
    db: database,
    key: `waitlist:email:${emailHash}`,
    limit: 5,
    windowMs: 60 * 60 * 1000,
    now,
  });
  if (!emailLimit.ok) {
    return NextResponse.json(
      { message: 'Too many requests for this email' },
      { status: 429, headers: { 'Retry-After': String(emailLimit.retryAfterSeconds) } }
    );
  }

  const name = parsed.data.name ? sanitizeName(parsed.data.name) : undefined;
  const referralCode = parsed.data.referralCode?.trim() || undefined;
  if (referralCode && !/^[a-zA-Z0-9_-]{1,64}$/.test(referralCode)) {
    return NextResponse.json({ message: 'Invalid referral code' }, { status: 400 });
  }

  if (process.env.TURNSTILE_SECRET_KEY) {
    const captchaToken = parsed.data.captchaToken;
    if (!captchaToken) {
      return NextResponse.json({ message: 'Captcha required' }, { status: 400 });
    }
    const captchaOk = await verifyTurnstile({ token: captchaToken, ip });
    if (!captchaOk) {
      return NextResponse.json({ message: 'Captcha verification failed' }, { status: 400 });
    }
  }

  try {
    const result = database.transaction(() => {
      const existingUser = database
        .prepare('SELECT id, verified FROM users WHERE email_hash = ? OR email = ? LIMIT 1')
        .get(emailHash, normalizedEmail) as { id: string; verified: 0 | 1 } | undefined;

      const userId = existingUser?.id ?? crypto.randomUUID();
      if (!existingUser) {
        const emailEnc = encryptTextIfPossible(normalizedEmail);
        const nameEnc = name ? encryptTextIfPossible(name) : null;
        database
          .prepare(
            'INSERT INTO users (id, email, email_hash, email_enc, name, name_enc, verified, created_at) VALUES (?, ?, ?, ?, ?, ?, 0, ?)'
          )
          .run(userId, normalizedEmail, emailHash, emailEnc, name || null, nameEnc, now);
      } else {
        const emailEnc = encryptTextIfPossible(normalizedEmail);
        database
          .prepare(
            'UPDATE users SET email_hash = COALESCE(email_hash, ?), email_enc = COALESCE(email_enc, ?) WHERE id = ?'
          )
          .run(emailHash, emailEnc, userId);

        if (name) {
          const nameEnc = encryptTextIfPossible(name);
          database
            .prepare(
              'UPDATE users SET name = COALESCE(name, ?), name_enc = COALESCE(name_enc, ?) WHERE id = ?'
            )
            .run(name, nameEnc, userId);
        }
      }

      let referralCreated = false;
      let referralRejectedReason: 'invalid' | 'inactive' | 'expired' | 'self' | 'duplicate' | null =
        null;
      let referrerId: string | null = null;

      if (referralCode) {
        const codeRow = database
          .prepare('SELECT code, referrer_id, active, expires_at FROM referral_codes WHERE code = ?')
          .get(referralCode) as
          | { code: string; referrer_id: string; active: 0 | 1; expires_at: number | null }
          | undefined;

        if (!codeRow) {
          referralRejectedReason = 'invalid';
        } else if (codeRow.active !== 1) {
          referralRejectedReason = 'inactive';
        } else if (codeRow.expires_at != null && codeRow.expires_at < now) {
          referralRejectedReason = 'expired';
        } else {
          const referrer = database
            .prepare('SELECT id, email, email_hash FROM users WHERE id = ?')
            .get(codeRow.referrer_id) as
            | { id: string; email: string; email_hash: string | null }
            | undefined;

          if (!referrer) {
            referralRejectedReason = 'invalid';
          } else if (
            (referrer.email_hash && referrer.email_hash === emailHash) ||
            normalizeEmail(referrer.email) === normalizedEmail
          ) {
            referralRejectedReason = 'self';
          } else {
            referrerId = referrer.id;
            const existingReferral = database
              .prepare('SELECT referrer_id FROM referrals WHERE referred_id = ?')
              .get(userId) as { referrer_id: string } | undefined;

            if (existingReferral) {
              if (existingReferral.referrer_id !== referrerId) {
                referralRejectedReason = 'duplicate';
              }
            } else {
              database
                .prepare('INSERT INTO referrals (referrer_id, referred_id, created_at) VALUES (?, ?, ?)')
                .run(referrerId, userId, now);
              referralCreated = true;
            }
          }
        }
      }

      const activeReferralCodeRow = database
        .prepare(
          `
            SELECT code
            FROM referral_codes
            WHERE referrer_id = ?
              AND active = 1
              AND (expires_at IS NULL OR expires_at >= ?)
            ORDER BY created_at DESC
            LIMIT 1
          `.trim()
        )
        .get(userId, now) as { code: string } | undefined;

      let myReferralCode = activeReferralCodeRow?.code;
      if (!myReferralCode) {
        const insertReferralCode = database.prepare(
          'INSERT INTO referral_codes (code, referrer_id, active, expires_at, created_at) VALUES (?, ?, 1, NULL, ?)'
        );

        for (let attempt = 0; attempt < 5; attempt++) {
          const candidate = generateReferralCode();
          try {
            insertReferralCode.run(candidate, userId, now);
            myReferralCode = candidate;
            break;
          } catch (err) {
            if (!isSqliteConstraintError(err)) throw err;
          }
        }

        if (!myReferralCode) {
          throw new Error('Failed to generate referral code');
        }
      }

      return {
        user: { id: userId, verified: Boolean(existingUser?.verified) },
        myReferralCode,
        referralCreated,
        referralRejectedReason,
        referrerId,
      };
    })();

    if (result.referralRejectedReason) {
      const messageByReason: Record<typeof result.referralRejectedReason, string> = {
        invalid: 'Invalid referral code',
        inactive: 'Referral code is inactive',
        expired: 'Referral code has expired',
        self: 'Self-referrals are not allowed',
        duplicate: 'Referral already applied',
      };

      return NextResponse.json(
        { ...result, message: messageByReason[result.referralRejectedReason] },
        { status: result.referralRejectedReason === 'duplicate' ? 409 : 400 }
      );
    }

    try {
      await sendWaitlistSignupEmail({
        to: normalizedEmail,
        name,
        verificationLink: undefined, // TODO: Add verification link when email service is set up
      });
    } catch {}

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    if (isSqliteConstraintError(err)) {
      return NextResponse.json({ message: 'Request conflicts with existing data' }, { status: 409 });
    }

    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
