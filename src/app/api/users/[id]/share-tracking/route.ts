import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export interface TrackShareRequest {
  referralCode?: string;
  shareChannel: 'twitter' | 'facebook' | 'whatsapp' | 'copy' | 'qr';
}

export interface TrackShareResponse {
  success: boolean;
  shareId?: string;
  message?: string;
}

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
): Promise<NextResponse<TrackShareResponse>> {
  const { id } = await ctx.params;

  try {
    const body = (await req.json()) as TrackShareRequest;
    const { referralCode, shareChannel } = body;

    // Validate input
    if (!shareChannel || !['twitter', 'facebook', 'whatsapp', 'copy', 'qr'].includes(shareChannel)) {
      return NextResponse.json(
        { success: false, message: 'Invalid share channel' },
        { status: 400 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const db = getDb();

    // Verify user exists
    const user = db
      .prepare('SELECT id FROM users WHERE id = ?')
      .get(id) as { id: string } | undefined;

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Record the share event
    const shareId = randomUUID();
    const timestamp = Math.floor(Date.now() / 1000);

    db.prepare(
      `INSERT INTO share_tracking (id, user_id, referral_code, share_channel, created_at)
       VALUES (?, ?, ?, ?, ?)`
    ).run(shareId, id, referralCode || null, shareChannel, timestamp);

    return NextResponse.json(
      { success: true, shareId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Share tracking error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to track share' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to retrieve share analytics for a user's referral code
 * Returns count of shares by channel and total shares
 */
export async function GET(
  _: Request,
  ctx: { params: Promise<{ id: string }> }
): Promise<NextResponse<{ 
  success: boolean;
  analytics?: {
    totalShares: number;
    sharesByChannel: Record<string, number>;
  };
  message?: string;
}>> {
  const { id } = await ctx.params;

  try {
    const db = getDb();

    // Verify user exists
    const user = db
      .prepare('SELECT id FROM users WHERE id = ?')
      .get(id) as { id: string } | undefined;

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Get share analytics
    const shares = db
      .prepare(
        `SELECT share_channel, COUNT(*) as count
         FROM share_tracking
         WHERE user_id = ?
         GROUP BY share_channel`
      )
      .all(id) as Array<{ share_channel: string; count: number }>;

    const sharesByChannel: Record<string, number> = {};
    let totalShares = 0;

    shares.forEach((share) => {
      sharesByChannel[share.share_channel] = share.count;
      totalShares += share.count;
    });

    return NextResponse.json(
      {
        success: true,
        analytics: {
          totalShares,
          sharesByChannel,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Share analytics error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve analytics' },
      { status: 500 }
    );
  }
}
