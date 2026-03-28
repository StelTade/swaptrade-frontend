import { GET as leaderboardGET } from '@/app/api/leaderboard/route';
import { getDb, resetDbForTests } from '@/lib/db';

beforeEach(() => {
  process.env.SWAPTRADE_SQLITE_PATH = ':memory:';
  resetDbForTests();
  getDb();
});

test('leaderboard sorts by points desc then created_at asc', async () => {
  const db = getDb();
  const now = Date.now();

  db.prepare(
    'INSERT INTO users (id, email, verified, created_at, points) VALUES (?, ?, 1, ?, ?)'
  ).run('u1', 'u1@example.com', now + 10, 5);
  db.prepare(
    'INSERT INTO users (id, email, verified, created_at, points) VALUES (?, ?, 1, ?, ?)'
  ).run('u2', 'u2@example.com', now, 5);
  db.prepare(
    'INSERT INTO users (id, email, verified, created_at, points) VALUES (?, ?, 1, ?, ?)'
  ).run('u3', 'u3@example.com', now, 10);

  const res = await leaderboardGET(new Request('http://localhost:3000/api/leaderboard?limit=10'));
  expect(res.status).toBe(200);
  const json = (await res.json()) as { leaderboard: Array<{ userId: string }> };
  expect(json.leaderboard.map((x) => x.userId)).toEqual(['u3', 'u2', 'u1']);
});
