import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import { enforceRateLimit, getClientIp, normalizeEmail, sha256Hex, validateCsrf, validateSameOrigin } from '@/lib/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RESERVATION_TTL_MS = 15 * 60 * 1000;
const SOCIAL_PROOF_WINDOW_MS = 60 * 60 * 1000;

type SpotConfig = {
  total_spots: number;
  spots_taken: number;
  price_increase_at: number;
  updated_at: number;
};

function releaseExpiredReservations(db: ReturnType<typeof getDb>, now: number) {
  db.prepare(
    'DELETE FROM spot_reservations WHERE expires_at <= ? AND confirmed = 0'
  ).run(now);
}

/**
 * GET /api/waitlist/spots
 * Returns real-time scarcity stats synced to server time.
 */
export async function GET() {
  const db = getDb();
  const now = Date.now();

  releaseExpiredReservations(db, now);

  const config = db
    .prepare('SELECT total_spots, spots_taken, price_increase_at, updated_at FROM premium_spot_config WHERE id = 1')
    .get() as SpotConfig;

  const activeReservations = (
    db
      .prepare('SELECT COUNT(*) as cnt FROM spot_reservations WHERE expires_at > ? AND confirmed = 0')
      .get(now) as { cnt: number }
  ).cnt;

  const spotsAvailable = Math.max(0, config.total_spots - config.spots_taken - activeReservations);

  const recentSignups = (
    db
      .prepare(
        'SELECT COUNT(*) as cnt FROM premium_waitlist WHERE created_at >= ? AND is_active = 1'
      )
      .get(now - SOCIAL_PROOF_WINDOW_MS) as { cnt: number }
  ).cnt;

  return NextResponse.json(
    {
      spotsAvailable,
      spotsTotal: config.total_spots,
      spotsTaken: config.spots_taken,
      priceIncreasesAt: config.price_increase_at,
      serverTime: now,
      recentSignups,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}

const ReserveSchema = z.object({ email: z.string().min(1).max(254) });

/**
 * POST /api/waitlist/spots
 * Reserves a spot for 15 min during checkout. Idempotent for the same email.
 */
export async function POST(req: Request) {
  if (!validateSameOrigin(req)) {
    return NextResponse.json({ message: 'Invalid origin' }, { status: 403 });
  }
  if (!validateCsrf(req)) {
    return NextResponse.json({ message: 'CSRF validation failed' }, { status: 403 });
  }

  const db = getDb();
  const now = Date.now();
  const ip = getClientIp(req);

  const limit = enforceRateLimit({ db, key: `spots:ip:${ip}`, limit: 20, windowMs: 10 * 60 * 1000, now });
  if (!limit.ok) {
    return NextResponse.json({ message: 'Too many requests' }, { status: 429 });
  }

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = ReserveSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const emailHash = sha256Hex(normalizeEmail(parsed.data.email));

  const result = db.transaction(() => {
    releaseExpiredReservations(db, now);

    const config = db
      .prepare('SELECT total_spots, spots_taken FROM premium_spot_config WHERE id = 1')
      .get() as SpotConfig;

    const activeReservations = (
      db
        .prepare('SELECT COUNT(*) as cnt FROM spot_reservations WHERE expires_at > ? AND confirmed = 0')
        .get(now) as { cnt: number }
    ).cnt;

    const spotsAvailable = config.total_spots - config.spots_taken - activeReservations;

    // Check if caller already has an active or confirmed reservation
    const existing = db
      .prepare('SELECT id, expires_at, confirmed FROM spot_reservations WHERE email_hash = ?')
      .get(emailHash) as { id: string; expires_at: number; confirmed: number } | undefined;

    if (existing?.confirmed) {
      return { reserved: true, expiresAt: null, alreadyConfirmed: true };
    }

    if (existing && existing.expires_at > now) {
      return { reserved: true, expiresAt: existing.expires_at, alreadyConfirmed: false };
    }

    if (spotsAvailable <= 0) {
      return { reserved: false, expiresAt: null, alreadyConfirmed: false };
    }

    const expiresAt = now + RESERVATION_TTL_MS;
    db.prepare(
      `INSERT INTO spot_reservations (id, email_hash, reserved_at, expires_at, confirmed)
       VALUES (?, ?, ?, ?, 0)
       ON CONFLICT(email_hash) DO UPDATE SET reserved_at = excluded.reserved_at, expires_at = excluded.expires_at, confirmed = 0`
    ).run(crypto.randomUUID(), emailHash, now, expiresAt);

    return { reserved: true, expiresAt, alreadyConfirmed: false };
  })();

  if (!result.reserved) {
    return NextResponse.json({ message: 'No spots available', reserved: false }, { status: 409 });
  }

  return NextResponse.json({ reserved: true, expiresAt: result.expiresAt }, { status: 200 });
}
