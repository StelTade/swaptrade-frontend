import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit') || '50')));

  const db = getDb();
  try {
    const rows = db
      .prepare(
        `
          SELECT id, points, created_at
          FROM users
          ORDER BY points DESC, created_at ASC
          LIMIT ?
        `.trim()
      )
      .all(limit) as Array<{ id: string; points: number }>;

    const countStmt = db.prepare(
      `
        SELECT COUNT(*) AS count
        FROM referrals r
        JOIN users u ON u.id = r.referred_id
        WHERE r.referrer_id = ?
          AND u.verified = 1
          AND r.rewarded_at IS NOT NULL
      `.trim()
    );

    const leaderboard = rows.map((r) => {
      const c = countStmt.get(r.id) as { count: number };
      return { userId: r.id, points: r.points, successfulReferrals: c.count };
    });

    return NextResponse.json({ leaderboard }, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

