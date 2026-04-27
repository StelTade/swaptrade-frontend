import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Subscribe user to push notifications
 * Stores the push subscription endpoint in the database
 */
export async function POST(req: NextRequest) {
  try {
    const { userId, subscription } = await req.json();

    if (!userId || !subscription) {
      return NextResponse.json(
        { error: 'Missing userId or subscription' },
        { status: 400 }
      );
    }

    const db = getDb();

    // Verify user exists
    const user = db
      .prepare('SELECT id FROM users WHERE id = ?')
      .get(userId) as { id: string } | undefined;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if subscription already exists
    const existing = db
      .prepare('SELECT id FROM push_subscriptions WHERE user_id = ? AND endpoint = ?')
      .get(userId, subscription.endpoint) as { id: string } | undefined;

    if (existing) {
      // Update existing subscription
      db.prepare(
        `UPDATE push_subscriptions
         SET subscription_data = ?, updated_at = ?, is_active = 1
         WHERE user_id = ? AND endpoint = ?`
      ).run(JSON.stringify(subscription), Date.now(), userId, subscription.endpoint);
    } else {
      // Insert new subscription
      db.prepare(
        `INSERT INTO push_subscriptions
         (user_id, endpoint, auth_key, p256dh_key, subscription_data, created_at, updated_at, is_active)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1)`
      ).run(
        userId,
        subscription.endpoint,
        subscription.keys?.auth || null,
        subscription.keys?.p256dh || null,
        JSON.stringify(subscription),
        Date.now(),
        Date.now()
      );
    }

    return NextResponse.json(
      { success: true, message: 'Subscription saved' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to save push subscription:', error);
    return NextResponse.json(
      { error: 'Failed to save subscription' },
      { status: 500 }
    );
  }
}
