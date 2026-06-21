import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { validateSameOrigin, enforceRateLimit, getClientIp } from '@/lib/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get('email');
  if (!email) {
    return NextResponse.json({ message: 'Missing email' }, { status: 400 });
  }
  try {
    const db = getDb();
    const row = db.prepare('SELECT preferences_data FROM email_preferences WHERE email = ?').get(email) as
      | { preferences_data: string }
      | undefined;
    if (!row) {
      return NextResponse.json({ email, preferences: null });
    }
    return NextResponse.json({ email, preferences: JSON.parse(row.preferences_data) });
  } catch (err) {
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!validateSameOrigin(req)) {
    return NextResponse.json({ message: 'Invalid origin' }, { status: 403 });
  }
  try {
    const db = getDb();
    const now = Date.now();
    const ip = getClientIp(req);
    const ipLimit = enforceRateLimit({ db, key: `prefs:ip:${ip}`, limit: 20, windowMs: 10 * 60 * 1000, now });
    if (!ipLimit.ok) {
      return NextResponse.json({ message: 'Too many requests' }, { status: 429, headers: { 'Retry-After': String(ipLimit.retryAfterSeconds) } });
    }
    const body = await req.json();
    const { email, preferences } = body as { email?: string; preferences?: any };
    if (!email || !preferences) {
      return NextResponse.json({ message: 'Missing email or preferences' }, { status: 400 });
    }
    db.prepare('INSERT OR REPLACE INTO email_preferences (email, preferences_data, updated_at) VALUES (?, ?, ?)').run(
      email,
      JSON.stringify(preferences),
      now
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }
}
