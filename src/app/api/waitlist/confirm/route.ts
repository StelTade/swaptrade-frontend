import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import {
  enforceRateLimit,
  getClientIp,
  validateSameOrigin,
} from '@/lib/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ConfirmBodySchema = z.object({
  token: z.string().min(1),
  userId: z.string().min(1),
});

export async function POST(req: Request) {
  if (!validateSameOrigin(req)) {
    return NextResponse.json({ message: 'Invalid origin' }, { status: 403 });
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
    key: `waitlist-confirm:ip:${ip}`,
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

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const parsed = ConfirmBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
  }

  const { token, userId } = parsed.data;

  try {
    const result = database.transaction(() => {
      // Find and verify the token
      const tokenRow = database
        .prepare('SELECT id, user_id, expires_at FROM email_verification_tokens WHERE token = ?')
        .get(token) as
        | { id: string; user_id: string; expires_at: number }
        | undefined;

      if (!tokenRow) {
        return { success: false, error: 'Invalid confirmation token', status: 400 };
      }

      // Check if token belongs to the specified user
      if (tokenRow.user_id !== userId) {
        return { success: false, error: 'Token does not match user', status: 400 };
      }

      // Check if token has expired
      if (tokenRow.expires_at < now) {
        return { success: false, error: 'Confirmation link has expired', status: 410 };
      }

      // Get user
      const user = database
        .prepare('SELECT id, verified FROM users WHERE id = ?')
        .get(userId) as { id: string; verified: 0 | 1 } | undefined;

      if (!user) {
        return { success: false, error: 'User not found', status: 404 };
      }

      // Mark user as verified
      if (user.verified !== 1) {
        database.prepare('UPDATE users SET verified = 1 WHERE id = ?').run(userId);
      }

      // Delete the used token
      database.prepare('DELETE FROM email_verification_tokens WHERE id = ?').run(tokenRow.id);

      // Clean up expired tokens
      database
        .prepare('DELETE FROM email_verification_tokens WHERE expires_at < ?')
        .run(now);

      return { success: true, error: null, status: 200 };
    })();

    if (!result.success) {
      return NextResponse.json(
        { message: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json(
      { message: 'Email confirmed successfully', verified: true },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
