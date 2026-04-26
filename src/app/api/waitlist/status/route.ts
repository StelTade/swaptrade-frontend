import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import { enforceRateLimit, getClientIp } from '@/lib/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const StatusBodySchema = z.object({
  userId: z.string().min(1),
});

export async function POST(req: Request) {
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return NextResponse.json({ message: 'Unsupported content type' }, { status: 415 });
  }

  const now = Date.now();
  const database = getDb();
  const ip = getClientIp(req);

  const ipLimit = enforceRateLimit({
    db: database,
    key: `waitlist-status:ip:${ip}`,
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

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const parsed = StatusBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const { userId } = parsed.data;

  try {
    const user = database
      .prepare('SELECT id, email, verified, created_at FROM users WHERE id = ?')
      .get(userId) as
      | { id: string; email: string; verified: 0 | 1; created_at: number }
      | undefined;

    if (!user) {
      return NextResponse.json(
        { isOnWaitlist: false, verified: false },
        { status: 200 }
      );
    }

    // Format the joined date
    const joinedDate = new Date(user.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return NextResponse.json(
      {
        isOnWaitlist: true,
        verified: user.verified === 1,
        joinedDate,
        email: user.email,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
