import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const db = getDb();

  try {
    const user = db
      .prepare('SELECT id, verified FROM users WHERE id = ?')
      .get(id) as { id: string; verified: number } | undefined;

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    if (!user.verified) {
      return NextResponse.json({ message: 'Account not verified' }, { status: 403 });
    }

    const pointsRow = db
      .prepare('SELECT points FROM users WHERE id = ?')
      .get(id) as { points: number };

    const referralCode = db
      .prepare(
        `SELECT code FROM referral_codes
         WHERE referrer_id = ? AND active = 1
         ORDER BY created_at DESC LIMIT 1`
      )
      .get(id) as { code: string } | undefined;

    const referrals = db
      .prepare(
        `SELECT r.referred_id, r.created_at, u.verified
         FROM referrals r
         JOIN users u ON u.id = r.referred_id
         WHERE r.referrer_id = ?
         ORDER BY r.created_at DESC`
      )
      .all(id) as Array<{ referred_id: string; created_at: number; verified: number }>;

    const successfulReferrals = referrals.filter((r) => r.verified && r.created_at).length;

    // Rank: count users with more points (ties broken by created_at)
    const rankRow = db
      .prepare(
        `SELECT COUNT(*) + 1 AS rank FROM users
         WHERE points > (SELECT points FROM users WHERE id = ?)`
      )
      .get(id) as { rank: number };

    return NextResponse.json({
      userId: id,
      points: pointsRow.points,
      rank: rankRow.rank,
      referralCode: referralCode?.code ?? null,
      totalReferrals: referrals.length,
      successfulReferrals,
      referrals: referrals.map((r, i) => ({
        displayName: `Referral #${i + 1}`,
        verified: Boolean(r.verified),
        joinedAt: r.created_at,
      })),
    });
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
