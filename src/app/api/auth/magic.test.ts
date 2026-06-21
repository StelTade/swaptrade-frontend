import { POST as requestMagic } from './magic/request/route';
import { GET as verifyMagic } from './magic/verify/route';
import { GET as csrfGET } from '@/app/api/csrf/route';
import { getDb, resetDbForTests } from '@/lib/db';

function makeRequest(params: { url: string; method: string; json?: unknown; origin?: string; csrfToken?: string; cookie?: string; }) {
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (params.origin) headers.origin = params.origin;
  if (params.csrfToken) headers['x-csrf-token'] = params.csrfToken;
  if (params.cookie) headers.cookie = params.cookie;
  return new Request(params.url, { method: params.method, headers, body: params.json ? JSON.stringify(params.json) : undefined });
}

beforeEach(() => {
  process.env.SWAPTRADE_SQLITE_PATH = ':memory:';
  resetDbForTests();
  getDb();
});

test('magic link request and verify lifecycle', async () => {
  const req = makeRequest({ url: 'http://localhost/api/auth/magic/request', method: 'POST', json: { email: 'test@example.com' } });
  const res = await requestMagic(req as Request);
  expect(res.status).toBe(200);

  // find token in DB
  const db = getDb();
  const row = db.prepare('SELECT token, user_id FROM magic_links LIMIT 1').get() as { token: string; user_id: string } | undefined;
  expect(row).toBeTruthy();

  const verifyReq = new Request(`http://localhost/api/auth/magic/verify?token=${encodeURIComponent(row!.token)}`);
  const verifyRes = await verifyMagic(verifyReq as Request);
  expect(verifyRes.status).toBe(200);
  const json = await verifyRes.json();
  expect(json.userId).toBe(row!.user_id);
});
