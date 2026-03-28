import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const db = getDb();

  try {
    const userRow = db.prepare('SELECT id, points FROM users WHERE id = ?').get(id) as
      | { id: string; points: number }
      | undefined;

    if (!userRow) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const successfulReferralsRow = db
      .prepare(
        `
          SELECT COUNT(*) AS count
          FROM referrals r
          JOIN users u ON u.id = r.referred_id
          WHERE r.referrer_id = ?
            AND u.verified = 1
            AND r.rewarded_at IS NOT NULL
        `.trim()
      )
      .get(id) as { count: number };

    const adjustmentsRow = db
      .prepare('SELECT COALESCE(SUM(delta), 0) AS sum FROM points_adjustments WHERE user_id = ?')
      .get(id) as { sum: number };

    return NextResponse.json(
      {
        userId: id,
        points: userRow.points,
        successfulReferrals: successfulReferralsRow.count,
        adjustmentsSum: adjustmentsRow.sum,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

