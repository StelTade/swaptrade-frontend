import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get('email');
  const reason = url.searchParams.get('reason') || null;
  if (!email) {
    return NextResponse.json({ message: 'Missing email' }, { status: 400 });
  }

  try {
    const db = getDb();
    const now = Date.now();
    db.prepare('INSERT OR REPLACE INTO unsubscribed_emails (email, reason, created_at) VALUES (?, ?, ?)').run(email, reason, now);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
