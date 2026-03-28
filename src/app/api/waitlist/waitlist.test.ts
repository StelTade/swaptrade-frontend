import { GET as csrfGET } from '@/app/api/csrf/route';
import { POST as waitlistPOST } from '@/app/api/waitlist/route';
import { POST as verifyPOST } from '@/app/api/waitlist/verify/route';
import { getDb, resetDbForTests } from '@/lib/db';

jest.mock('@/lib/email', () => ({
  sendWaitlistSignupEmail: jest.fn(async () => undefined),
}));

function getCookieValue(setCookie: string, name: string): string | null {
  const parts = setCookie.split(';')[0]?.split('=');
  if (!parts || parts.length < 2) return null;
  const k = parts[0]?.trim();
  const v = parts.slice(1).join('=').trim();
  if (k !== name) return null;
  return v;
}

async function issueCsrf() {
  const res = await csrfGET();
  const json = (await res.json()) as { token: string };
  const setCookie = res.headers.get('set-cookie');
  expect(setCookie).toBeTruthy();
  const cookieToken = getCookieValue(setCookie as string, '__Host-swaptrade-csrf');
  expect(cookieToken).toBeTruthy();
  return { token: json.token, cookie: `__Host-swaptrade-csrf=${cookieToken}` };
}

function makeRequest(params: {
  url: string;
  method: string;
  json?: unknown;
  origin?: string;
  csrfToken?: string;
  cookie?: string;
}) {
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (params.origin) headers.origin = params.origin;
  if (params.csrfToken) headers['x-csrf-token'] = params.csrfToken;
  if (params.cookie) headers.cookie = params.cookie;
  return new Request(params.url, {
    method: params.method,
    headers,
    body: params.json ? JSON.stringify(params.json) : undefined,
  });
}

beforeEach(() => {
  process.env.SWAPTRADE_SQLITE_PATH = ':memory:';
  delete process.env.TURNSTILE_SECRET_KEY;
  resetDbForTests();
  getDb();
});

test('signup creates user and referral code; invalid referral rejected', async () => {
  const csrf = await issueCsrf();

  const res = await waitlistPOST(
    makeRequest({
      url: 'http://localhost:3000/api/waitlist',
      method: 'POST',
      origin: 'http://localhost:3000',
      csrfToken: csrf.token,
      cookie: csrf.cookie,
      json: { email: 'a@example.com', name: 'A' },
    })
  );
  expect(res.status).toBe(200);
  const data = (await res.json()) as { user: { id: string }; myReferralCode: string };
  expect(data.user.id).toBeTruthy();
  expect(data.myReferralCode).toMatch(/^[a-zA-Z0-9]{6,12}$/);

  const { sendWaitlistSignupEmail } = jest.requireMock('@/lib/email') as {
    sendWaitlistSignupEmail: jest.Mock;
  };
  expect(sendWaitlistSignupEmail).toHaveBeenCalledWith({ to: 'a@example.com', name: 'A' });

  const bad = await waitlistPOST(
    makeRequest({
      url: 'http://localhost:3000/api/waitlist',
      method: 'POST',
      origin: 'http://localhost:3000',
      csrfToken: csrf.token,
      cookie: csrf.cookie,
      json: { email: 'b@example.com', referralCode: '!!bad!!' },
    })
  );
  expect(bad.status).toBe(400);
});

test('successful referral awards 1 point once (idempotent)', async () => {
  const csrf = await issueCsrf();

  const referrerRes = await waitlistPOST(
    makeRequest({
      url: 'http://localhost:3000/api/waitlist',
      method: 'POST',
      origin: 'http://localhost:3000',
      csrfToken: csrf.token,
      cookie: csrf.cookie,
      json: { email: 'referrer@example.com' },
    })
  );
  const referrer = (await referrerRes.json()) as { user: { id: string }; myReferralCode: string };

  const referredRes = await waitlistPOST(
    makeRequest({
      url: 'http://localhost:3000/api/waitlist',
      method: 'POST',
      origin: 'http://localhost:3000',
      csrfToken: csrf.token,
      cookie: csrf.cookie,
      json: { email: 'referred@example.com', referralCode: referrer.myReferralCode },
    })
  );
  expect(referredRes.status).toBe(200);
  const referred = (await referredRes.json()) as { user: { id: string } };

  const v1 = await verifyPOST(
    makeRequest({
      url: 'http://localhost:3000/api/waitlist/verify',
      method: 'POST',
      origin: 'http://localhost:3000',
      csrfToken: csrf.token,
      cookie: csrf.cookie,
      json: { userId: referred.user.id },
    })
  );
  expect(v1.status).toBe(200);
  const v1Data = (await v1.json()) as { pointsAwarded: number };
  expect(v1Data.pointsAwarded).toBe(1);

  const v2 = await verifyPOST(
    makeRequest({
      url: 'http://localhost:3000/api/waitlist/verify',
      method: 'POST',
      origin: 'http://localhost:3000',
      csrfToken: csrf.token,
      cookie: csrf.cookie,
      json: { userId: referred.user.id },
    })
  );
  const v2Data = (await v2.json()) as { pointsAwarded: number };
  expect(v2Data.pointsAwarded).toBe(0);

  const db = getDb();
  const pointsRow = db.prepare('SELECT points FROM users WHERE id = ?').get(referrer.user.id) as
    | { points: number }
    | undefined;
  expect(pointsRow?.points).toBe(1);
});
