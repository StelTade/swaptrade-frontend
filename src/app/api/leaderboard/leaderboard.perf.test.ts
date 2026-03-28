import { performance } from 'perf_hooks';
import { GET as leaderboardGET } from '@/app/api/leaderboard/route';
import { getDb, resetDbForTests } from '@/lib/db';

beforeEach(() => {
  process.env.SWAPTRADE_SQLITE_PATH = ':memory:';
  resetDbForTests();
  getDb();
});

test('leaderboard query remains fast for moderate dataset', async () => {
  const db = getDb();
  const now = Date.now();
  const insert = db.prepare(
    'INSERT INTO users (id, email, verified, created_at, points) VALUES (?, ?, 1, ?, ?)'
  );

  for (let i = 0; i < 3000; i++) {
    insert.run(`u${i}`, `u${i}@example.com`, now + i, i % 100);
  }

  const t0 = performance.now();
  const res = await leaderboardGET(new Request('http://localhost:3000/api/leaderboard?limit=50'));
  const t1 = performance.now();

  expect(res.status).toBe(200);
  const json = (await res.json()) as { leaderboard: Array<{ userId: string; points: number }> };
  expect(json.leaderboard).toHaveLength(50);
  expect(t1 - t0).toBeLessThan(2000);
});
