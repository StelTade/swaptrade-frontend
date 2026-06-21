import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import { normalizeEmail, sha256Hex, enforceRateLimit, getClientIp } from '@/lib/security';
import { sendMagicLinkEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BodySchema = z.object({ email: z.string().min(1) });

export async function POST(req: Request) {
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return NextResponse.json({ message: 'Unsupported content type' }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: 'Invalid body' }, { status: 400 });

  const normalized = normalizeEmail(parsed.data.email);
  const db = getDb();
  const now = Date.now();
  const ip = getClientIp(req);

  // rate limit per IP and per email
  const ipLimit = enforceRateLimit({ db, key: `magic:ip:${ip}`, limit: 10, windowMs: 10 * 60 * 1000, now });
  if (!ipLimit.ok) {
    return NextResponse.json({ message: 'Too many requests' }, { status: 429, headers: { 'Retry-After': String(ipLimit.retryAfterSeconds) } });
  }

  // find or create user
  const emailHash = sha256Hex(normalized);
  const emailLimit = enforceRateLimit({ db, key: `magic:email:${emailHash}`, limit: 5, windowMs: 60 * 60 * 1000, now });
  if (!emailLimit.ok) {
    return NextResponse.json({ message: 'Too many requests for this email' }, { status: 429, headers: { 'Retry-After': String(emailLimit.retryAfterSeconds) } });
  }
  let user = db.prepare('SELECT id FROM users WHERE email_hash = ? OR email = ? LIMIT 1').get(emailHash, normalized) as
    | { id: string }
    | undefined;

  if (!user) {
    const userId = crypto.randomUUID();
    db.prepare('INSERT INTO users (id, email, email_hash, verified, created_at) VALUES (?, ?, ?, 0, ?)').run(
      userId,
      normalized,
      emailHash,
      now
    );
    user = { id: userId };
  }

  const token = crypto.randomBytes(24).toString('base64url');
  const expiresAt = now + 30 * 60 * 1000; // 30 minutes
  const id = crypto.randomUUID();

  db.prepare('INSERT INTO magic_links (id, user_id, token, expires_at, created_at) VALUES (?, ?, ?, ?, ?)').run(
    id,
    user.id,
    token,
    expiresAt,
    now
  );

  try {
    await sendMagicLinkEmail({ to: normalized, token });
  } catch (err) {
    console.error('sendMagicLinkEmail error', err);
  }

  return NextResponse.json({ ok: true });
}
