/**
 * Premium Waitlist Analytics & Metrics
 */

import { getDb } from '@/lib/db';

export interface WaitlistStats {
  totalSignups: number;
  todaySignups: number;
  weekSignups: number;
  averagePositionWait: number;
  estimatedConversionRate: number;
}

export interface TopReferrers {
  position: number;
  email: string;
  name: string | null;
  signupDate: number;
}

/**
 * Get premium waitlist statistics
 */
export function getPremiumWaitlistStats(): WaitlistStats {
  const db = getDb();
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const weekMs = 7 * dayMs;

  const totalRow = db
    .prepare('SELECT COUNT(*) as count FROM premium_waitlist WHERE is_active = 1')
    .get() as { count: number };

  const todayRow = db
    .prepare(
      `SELECT COUNT(*) as count FROM premium_waitlist 
       WHERE is_active = 1 AND created_at > ?`
    )
    .get(now - dayMs) as { count: number };

  const weekRow = db
    .prepare(
      `SELECT COUNT(*) as count FROM premium_waitlist 
       WHERE is_active = 1 AND created_at > ?`
    )
    .get(now - weekMs) as { count: number };

  // Calculate average wait position
  const avgRow = db
    .prepare(
      `SELECT AVG(position) as avg_position FROM premium_waitlist WHERE is_active = 1`
    )
    .get() as { avg_position: number | null };

  const averagePosition = avgRow.avg_position ? Math.round(avgRow.avg_position) : 0;

  return {
    totalSignups: totalRow.count,
    todaySignups: todayRow.count,
    weekSignups: weekRow.count,
    averagePositionWait: averagePosition,
    estimatedConversionRate: 0.35, // 35% industry average
  };
}

/**
 * Get recent premium waitlist signups
 */
export function getRecentSignups(limit: number = 10): TopReferrers[] {
  const db = getDb();

  return db
    .prepare(
      `SELECT position, email, name, created_at as signupDate
       FROM premium_waitlist
       WHERE is_active = 1
       ORDER BY created_at DESC
       LIMIT ?`
    )
    .all(limit) as TopReferrers[];
}

/**
 * Calculate conversion metrics
 */
export function getConversionMetrics() {
  const db = getDb();

  const stats = getPremiumWaitlistStats();

  // Estimate conversion opportunities
  const convertibleAtLimit = Math.min(stats.totalSignups, 500);
  const conversionPotential = Math.ceil(convertibleAtLimit * 0.35); // 35% conversion

  return {
    totalWaitlist: stats.totalSignups,
    conversionPotential,
    conversionTarget: 500,
    conversionRate: (stats.totalSignups / 500) * 100, // percentage of capacity
    estimatedRevenue: conversionPotential * 9.99 * 12, // 12 months at $9.99/month
  };
}

/**
 * Get growth rate (signups per day + trend)
 */
export function getGrowthMetrics() {
  const db = getDb();
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  const past7Days = [];
  for (let i = 6; i >= 0; i--) {
    const startOfDay = now - (i + 1) * dayMs;
    const endOfDay = now - i * dayMs;

    const row = db
      .prepare(
        `SELECT COUNT(*) as count FROM premium_waitlist
         WHERE is_active = 1 AND created_at > ? AND created_at <= ?`
      )
      .get(startOfDay, endOfDay) as { count: number };

    past7Days.push(row.count);
  }

  const average = Math.round(past7Days.reduce((a, b) => a + b, 0) / 7);
  const trend = past7Days[6] > average ? 'up' : past7Days[6] < average ? 'down' : 'stable';

  return {
    past7Days,
    averagePerDay: average,
    trend,
    projectedMonthly: average * 30,
  };
}

/**
 * Export premium waitlist data (CSV format)
 */
export function exportWaitlistAsCSV(): string {
  const db = getDb();

  const records = db
    .prepare(
      `SELECT position, email, name, created_at
       FROM premium_waitlist
       WHERE is_active = 1
       ORDER BY position ASC`
    )
    .all() as Array<{ position: number; email: string; name: string | null; created_at: number }>;

  const headers = ['Position', 'Email', 'Name', 'Signup Date'];
  const rows = records.map((r) => [
    r.position,
    r.email,
    r.name || '',
    new Date(r.created_at).toISOString(),
  ]);

  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

  return csv;
}

/**
 * Get waitlist position for an email
 */
export function getPositionForEmail(email: string): number | null {
  const db = getDb();

  const record = db
    .prepare(
      `SELECT position FROM premium_waitlist 
       WHERE email = ? AND is_active = 1`
    )
    .get(email) as { position: number } | undefined;

  return record?.position || null;
}

/**
 * Check if email is already on waitlist
 */
export function isEmailOnWaitlist(email: string): boolean {
  const db = getDb();

  const record = db
    .prepare(
      `SELECT id FROM premium_waitlist 
       WHERE email = ? AND is_active = 1`
    )
    .get(email);

  return !!record;
}

/**
 * Get waitlist capacity and remaining spots
 */
export function getCapacityInfo() {
  const db = getDb();
  const MAX_CAPACITY = 500;

  const countRow = db
    .prepare('SELECT COUNT(*) as count FROM premium_waitlist WHERE is_active = 1')
    .get() as { count: number };

  const remaining = Math.max(0, MAX_CAPACITY - countRow.count);
  const filled = countRow.count;

  return {
    capacity: MAX_CAPACITY,
    filled,
    remaining,
    percentageFilled: (filled / MAX_CAPACITY) * 100,
    isFull: remaining === 0,
  };
}
