import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Unsubscribe user from push notifications
 * Removes or marks the push subscription as inactive
 */
export async function POST(req: NextRequest) {
  try {
    const { endpoint } = await req.json();

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Missing endpoint' },
        { status: 400 }
      );
    }

    const db = getDb();

    // Mark subscription as inactive
    const result = db
      .prepare(
        `UPDATE push_subscriptions
         SET is_active = 0, updated_at = ?
         WHERE endpoint = ?`
      )
      .run(Date.now(), endpoint);

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Unsubscribed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to unsubscribe from push notifications:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}
