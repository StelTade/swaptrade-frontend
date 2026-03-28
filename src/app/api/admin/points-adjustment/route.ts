import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import { enforceRateLimit, getClientIp, validateSameOrigin } from '@/lib/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BodySchema = z.object({
  userId: z.string().min(1),
  delta: z.number().int().min(-1000).max(1000),
  reason: z.string().max(200).optional(),
});

export async function POST(req: Request) {
  if (!validateSameOrigin(req)) {
    return NextResponse.json({ message: 'Invalid origin' }, { status: 403 });
  }

  const adminKey = process.env.ADMIN_API_KEY;
  const providedKey = req.headers.get('x-admin-key');
  if (!adminKey || !providedKey || providedKey !== adminKey) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const contentType = req.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return NextResponse.json({ message: 'Unsupported content type' }, { status: 415 });
  }

  const now = Date.now();
  const db = getDb();
  const ip = getClientIp(req);

  const ipLimit = enforceRateLimit({
    db,
    key: `admin-points:ip:${ip}`,
    limit: 60,
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

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const { userId, delta, reason } = parsed.data;
  try {
    const result = db.transaction(() => {
      const userRow = db.prepare('SELECT id, points FROM users WHERE id = ?').get(userId) as
        | { id: string; points: number }
        | undefined;
      if (!userRow) return null;

      const id = crypto.randomUUID();
      db.prepare(
        'INSERT INTO points_adjustments (id, user_id, delta, action, reason, created_at) VALUES (?, ?, ?, ?, ?, ?)'
      ).run(id, userId, delta, 'admin_adjustment', reason?.trim() || null, now);

      db.prepare('UPDATE users SET points = points + ? WHERE id = ?').run(delta, userId);
      const updated = db.prepare('SELECT points FROM users WHERE id = ?').get(userId) as
        | { points: number }
        | undefined;

      return { userId, points: updated?.points ?? userRow.points + delta, delta, adjustmentId: id };
    })();

    if (!result) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
