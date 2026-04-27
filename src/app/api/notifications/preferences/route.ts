import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { NextRequest } from 'next/server';
import type { NotificationPreferences } from '@/lib/notifications';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Save user's notification preferences to database
 */
export async function POST(req: NextRequest) {
  try {
    const { userId, preferences } = await req.json() as {
      userId: string;
      preferences: NotificationPreferences;
    };

    if (!userId || !preferences) {
      return NextResponse.json(
        { error: 'Missing userId or preferences' },
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

    // Check if preferences already exist
    const existing = db
      .prepare('SELECT id FROM notification_preferences WHERE user_id = ?')
      .get(userId) as { id: string } | undefined;

    const prefsJson = JSON.stringify(preferences);

    if (existing) {
      // Update existing preferences
      db.prepare(
        `UPDATE notification_preferences
         SET preferences_data = ?, updated_at = ?
         WHERE user_id = ?`
      ).run(prefsJson, Date.now(), userId);
    } else {
      // Insert new preferences
      db.prepare(
        `INSERT INTO notification_preferences
         (user_id, preferences_data, created_at, updated_at)
         VALUES (?, ?, ?, ?)`
      ).run(userId, prefsJson, Date.now(), Date.now());
    }

    return NextResponse.json(
      { success: true, message: 'Preferences saved' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to save notification preferences:', error);
    return NextResponse.json(
      { error: 'Failed to save preferences' },
      { status: 500 }
    );
  }
}

/**
 * Get user's notification preferences
 */
export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    const db = getDb();

    // Get preferences
    const result = db
      .prepare('SELECT preferences_data FROM notification_preferences WHERE user_id = ?')
      .get(userId) as { preferences_data: string } | undefined;

    if (!result) {
      return NextResponse.json(
        {
          enabled: true,
          tradeAlerts: true,
          priceAlerts: true,
          referralNotifications: true,
          systemNotifications: true,
          sound: true,
          vibration: true,
        },
        { status: 200 }
      );
    }

    const preferences = JSON.parse(result.preferences_data);
    return NextResponse.json(preferences, { status: 200 });
  } catch (error) {
    console.error('Failed to get notification preferences:', error);
    return NextResponse.json(
      { error: 'Failed to get preferences' },
      { status: 500 }
    );
  }
}
