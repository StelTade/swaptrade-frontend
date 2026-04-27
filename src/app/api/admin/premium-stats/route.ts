import { NextResponse } from 'next/server';
import {
  getPremiumWaitlistStats,
  getConversionMetrics,
  getGrowthMetrics,
  getCapacityInfo,
  getRecentSignups,
} from '@/lib/premium-analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Admin endpoint to get premium waitlist analytics
 * Should be protected with proper authentication in production
 */
export async function GET() {
  try {
    // TODO: Add authentication check
    // const isAdmin = await verifyAdminToken(req);
    // if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const stats = getPremiumWaitlistStats();
    const conversion = getConversionMetrics();
    const growth = getGrowthMetrics();
    const capacity = getCapacityInfo();
    const recentSignups = getRecentSignups(10);

    return NextResponse.json(
      {
        stats,
        conversion,
        growth,
        capacity,
        recentSignups,
        timestamp: Date.now(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to get premium waitlist stats:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve statistics' },
      { status: 500 }
    );
  }
}
