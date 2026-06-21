import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import { sendPremiumWaitlistEmail } from '@/lib/email';
import {
  enforceRateLimit,
  getClientIp,
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

const PremiumWaitlistSchema = z.object({
  email: z.string().min(1).max(254),
  name: z.string().max(100).optional(),
  captchaToken: z.string().min(1).optional(),
});

export async function POST(req: Request) {
  // Validate request
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
  const db = getDb();
  const ip = getClientIp(req);

  // Rate limiting by IP
  const ipLimit = enforceRateLimit({
    db,
    key: `premium-waitlist:ip:${ip}`,
    limit: 10,
    windowMs: 10 * 60 * 1000,
    now,
  });

  if (!ipLimit.ok) {
    return NextResponse.json(
      { message: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(ipLimit.retryAfterSeconds) } }
    );
  }

  // Parse request body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const parsed = PremiumWaitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const email = parsed.data.email;
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !EMAIL_REGEX.test(normalizedEmail)) {
    return NextResponse.json({ message: 'Please enter a valid email address' }, { status: 400 });
  }

  const emailHash = sha256Hex(normalizedEmail);

  // Rate limiting by email
  const emailLimit = enforceRateLimit({
    db,
    key: `premium-waitlist:email:${emailHash}`,
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

  // Verify captcha if enabled
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
    type SpotConfig = { total_spots: number; spots_taken: number };

    const result = db.transaction(() => {
      // Release expired reservations before checking availability
      db.prepare('DELETE FROM spot_reservations WHERE expires_at <= ? AND confirmed = 0').run(now);

      // Check if already on premium waitlist
      const existing = db
        .prepare('SELECT id, position FROM premium_waitlist WHERE email_hash = ? LIMIT 1')
        .get(emailHash) as { id: string; position: number } | undefined;

      if (existing) {
        // Mark any reservation as confirmed
        db.prepare('UPDATE spot_reservations SET confirmed = 1 WHERE email_hash = ?').run(emailHash);
        return { isNew: false, position: existing.position, email: normalizedEmail };
      }

      // Verify a spot is available (reservation or open pool)
      const config = db
        .prepare('SELECT total_spots, spots_taken FROM premium_spot_config WHERE id = 1')
        .get() as SpotConfig;

      const reservation = db
        .prepare('SELECT id FROM spot_reservations WHERE email_hash = ? AND expires_at > ?')
        .get(emailHash, now) as { id: string } | undefined;

      const activeReservations = (
        db
          .prepare('SELECT COUNT(*) as cnt FROM spot_reservations WHERE expires_at > ? AND confirmed = 0')
          .get(now) as { cnt: number }
      ).cnt;

      const spotsAvailable = config.total_spots - config.spots_taken - activeReservations;

      if (!reservation && spotsAvailable <= 0) {
        throw Object.assign(new Error('No spots available'), { code: 'SPOTS_FULL' });
      }

      // Get next position and insert
      const lastRow = db
        .prepare('SELECT MAX(position) AS max_pos FROM premium_waitlist')
        .get() as { max_pos: number | null };
      const nextPosition = (lastRow.max_pos || 0) + 1;

      db.prepare(
        `INSERT INTO premium_waitlist
         (id, email, email_hash, name, position, interested_date, is_active, created_at)
         VALUES (?, ?, ?, ?, ?, ?, 1, ?)`
      ).run(crypto.randomUUID(), normalizedEmail, emailHash, name || null, nextPosition, now, now);

      // Decrement available spots and confirm/remove reservation
      db.prepare(
        'UPDATE premium_spot_config SET spots_taken = spots_taken + 1, updated_at = ? WHERE id = 1'
      ).run(now);

      if (reservation) {
        db.prepare('UPDATE spot_reservations SET confirmed = 1 WHERE email_hash = ?').run(emailHash);
      }

      return { isNew: true, position: nextPosition, email: normalizedEmail };
    })();

    // Send confirmation email
    try {
      await sendPremiumWaitlistEmail({
        email: normalizedEmail,
        name: name || 'Trader',
        position: result.position,
        isNew: result.isNew,
      });
    } catch (emailError) {
      console.error('Failed to send premium waitlist email:', emailError);
      // Don't fail the request if email fails
    }

    // Track event (for analytics)
    console.debug('Premium waitlist signup:', {
      email: normalizedEmail,
      position: result.position,
      isNew: result.isNew,
      timestamp: now,
    });

    return NextResponse.json(
      {
        success: true,
        message: result.isNew
          ? `Welcome! Your position: #${result.position}`
          : 'Already on waitlist',
        position: result.position,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && (error as Error & { code?: string }).code === 'SPOTS_FULL') {
      return NextResponse.json({ message: 'Sorry, all premium spots are taken.' }, { status: 409 });
    }
    console.error('Premium waitlist signup error:', error);
    return NextResponse.json(
      { message: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check waitlist stats/position
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    if (!email) {
      // Return general stats if no email provided
      const db = getDb();
      const stats = db
        .prepare(
          `SELECT 
            COUNT(*) as total,
            MIN(position) as first_position,
            MAX(position) as last_position
           FROM premium_waitlist
           WHERE is_active = 1`
        )
        .get() as { total: number; first_position: number; last_position: number };

      return NextResponse.json(
        {
          totalWaitlisted: stats.total,
          estimatedLaunch: 'Q2 2026',
          foundingMembersAvailable: 500,
        },
        { status: 200 }
      );
    }

    // If email provided, return position
    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
    }

    const emailHash = sha256Hex(normalizedEmail);
    const db = getDb();
    const record = db
      .prepare('SELECT position FROM premium_waitlist WHERE email_hash = ? AND is_active = 1')
      .get(emailHash) as { position: number } | undefined;

    if (!record) {
      return NextResponse.json({ message: 'Not found', onWaitlist: false }, { status: 404 });
    }

    return NextResponse.json(
      {
        position: record.position,
        onWaitlist: true,
        message: `You're #${record.position} on the waitlist`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to get waitlist position:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve position' },
      { status: 500 }
    );
  }
}
