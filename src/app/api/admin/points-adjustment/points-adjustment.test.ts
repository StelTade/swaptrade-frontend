import { POST as adminAdjustPOST } from '@/app/api/admin/points-adjustment/route';
import { getDb, resetDbForTests } from '@/lib/db';

function makeReq(params: { key?: string; json: unknown }) {
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (params.key) headers['x-admin-key'] = params.key;
  headers.origin = 'http://localhost:3000';
  return new Request('http://localhost:3000/api/admin/points-adjustment', {
    method: 'POST',
    headers,
    body: JSON.stringify(params.json),
  });
}

beforeEach(() => {
  process.env.SWAPTRADE_SQLITE_PATH = ':memory:';
  process.env.ADMIN_API_KEY = 'k';
  resetDbForTests();
  getDb();
});

test('admin adjustments require key and update points', async () => {
  const db = getDb();
  db.prepare(
    'INSERT INTO users (id, email, verified, created_at, points) VALUES (?, ?, 1, ?, ?)'
  ).run('u1', 'u1@example.com', Date.now(), 0);

  const unauthorized = await adminAdjustPOST(makeReq({ json: { userId: 'u1', delta: 5 } }));
  expect(unauthorized.status).toBe(401);

  const ok = await adminAdjustPOST(makeReq({ key: 'k', json: { userId: 'u1', delta: 5, reason: 'x' } }));
  expect(ok.status).toBe(200);
  const data = (await ok.json()) as { points: number };
  expect(data.points).toBe(5);
});
