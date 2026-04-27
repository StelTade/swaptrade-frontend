import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import {
  enforceRateLimit,
  getClientIp,
  normalizeEmail,
  sha256Hex,
  validateCsrf,
  validateSameOrigin,
} from '@/lib/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VerifyBodySchema = z
  .object({
    email: z.string().min(1).max(254).optional(),
    userId: z.string().min(1).optional(),
  })
  .refine((v) => Boolean(v.email || v.userId), { message: 'email or userId is required' });

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
    key: `waitlist-verify:ip:${ip}`,
    limit: 30,
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

  const parsed = VerifyBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const email = parsed.data.email ? normalizeEmail(parsed.data.email) : undefined;
  const userId = parsed.data.userId;

  if (email && !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ message: 'Please enter a valid email address' }, { status: 400 });
  }

  const emailHash = email ? sha256Hex(email) : undefined;
  try {
    const result = database.transaction(() => {
      const userRow = userId
        ? (database.prepare('SELECT id, verified FROM users WHERE id = ?').get(userId) as
            | { id: string; verified: 0 | 1 }
            | undefined)
        : (database
            .prepare('SELECT id, verified FROM users WHERE email_hash = ? OR email = ? LIMIT 1')
            .get(emailHash, email) as
            | { id: string; verified: 0 | 1 }
            | undefined);

      if (!userRow) {
        return null;
      }

      if (userRow.verified !== 1) {
        database.prepare('UPDATE users SET verified = 1 WHERE id = ?').run(userRow.id);
      }

      let pointsAwarded = 0;
      const referralRow = database
        .prepare('SELECT referrer_id, rewarded_at FROM referrals WHERE referred_id = ?')
        .get(userRow.id) as { referrer_id: string; rewarded_at: number | null } | undefined;

      if (referralRow && referralRow.rewarded_at == null) {
        const rewardUpdate = database
          .prepare(
            'UPDATE referrals SET rewarded_at = ? WHERE referred_id = ? AND rewarded_at IS NULL'
          )
          .run(now, userRow.id);

        if (rewardUpdate.changes === 1) {
          const adjustmentId = crypto.randomUUID();
          database
            .prepare(
              'INSERT INTO points_adjustments (id, user_id, delta, action, reason, created_at) VALUES (?, ?, ?, ?, ?, ?)'
            )
            .run(adjustmentId, referralRow.referrer_id, 1, 'referral_success', `referred:${userRow.id}`, now);
          database
            .prepare('UPDATE users SET points = points + 1 WHERE id = ?')
            .run(referralRow.referrer_id);
          pointsAwarded = 1;
        }
      }

      const pointsRow = database
        .prepare('SELECT points FROM users WHERE id = ?')
        .get(userRow.id) as { points: number } | undefined;

      return { id: userRow.id, verified: true, points: pointsRow?.points ?? 0, pointsAwarded };
    })();

    if (!result) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
