import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { NextRequest } from 'next/server';
import type { NotificationPayload } from '@/lib/notifications';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Send notifications to users with active subscriptions
 * Internal API endpoint for backend services
 * 
 * Security: Should be protected by CSRF token and API authentication
 */
export async function POST(req: NextRequest) {
  try {
    // Verify this is an internal request (should have proper auth in production)
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { userIds, payload } = await req.json() as {
      userIds: string[];
      payload: NotificationPayload;
    };

    if (!userIds || !Array.isArray(userIds) || !payload) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const db = getDb();

    // Get active subscriptions for the users
    const placeholders = userIds.map(() => '?').join(',');
    const subscriptions = db
      .prepare(
        `SELECT subscription_data FROM push_subscriptions
         WHERE user_id IN (${placeholders}) AND is_active = 1`
      )
      .all(...userIds) as Array<{ subscription_data: string }>;

    if (subscriptions.length === 0) {
      return NextResponse.json(
        { success: true, sent: 0, message: 'No active subscriptions found' },
        { status: 200 }
      );
    }

    const results = {
      sent: 0,
      failed: 0,
      errors: [] as string[],
    };

    // In production, send push notifications to each subscription
    // This would integrate with a push notification service
    for (const sub of subscriptions) {
      try {
        JSON.parse(sub.subscription_data);
        // Here you would send the actual push notification
        // await sendPushNotification(subscription, payload);
        results.sent++;
      } catch (error) {
        results.failed++;
        results.errors.push(`Failed to send to subscription: ${error}`);
      }
    }

    return NextResponse.json(
      {
        success: true,
        ...results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to send notifications:', error);
    return NextResponse.json(
      { error: 'Failed to send notifications' },
      { status: 500 }
    );
  }
}
