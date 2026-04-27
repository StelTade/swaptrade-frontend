import { getDb, resetDbForTests } from '@/lib/db';

beforeEach(() => {
  process.env.SWAPTRADE_SQLITE_PATH = ':memory:';
  resetDbForTests();
});

function hasColumn(table: string, column: string): boolean {
  const db = getDb();
  const rows = db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
  return rows.some((r) => r.name === column);
}

test('schema includes points and rewarded_at', () => {
  expect(hasColumn('users', 'points')).toBe(true);
  expect(hasColumn('referrals', 'rewarded_at')).toBe(true);
  expect(hasColumn('points_adjustments', 'action')).toBe(true);
});
