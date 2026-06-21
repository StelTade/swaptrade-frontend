import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  if (!token) return NextResponse.json({ message: 'Missing token' }, { status: 400 });

  const db = getDb();
  const now = Date.now();
  const row = db.prepare('SELECT id, user_id, expires_at, used_at FROM magic_links WHERE token = ? LIMIT 1').get(token) as
    | { id: string; user_id: string; expires_at: number; used_at: number | null }
    | undefined;

  if (!row) return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
  if (row.used_at) return NextResponse.json({ message: 'Token already used' }, { status: 410 });
  if (row.expires_at < now) return NextResponse.json({ message: 'Token expired' }, { status: 410 });

  db.prepare('UPDATE magic_links SET used_at = ? WHERE id = ?').run(now, row.id);

  return NextResponse.json({ ok: true, userId: row.user_id });
}
