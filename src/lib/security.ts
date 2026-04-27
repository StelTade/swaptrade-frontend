import crypto from 'crypto';
import type Database from 'better-sqlite3';

function base64Url(bytes: Buffer): string {
  return bytes
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function sanitizeName(name: string): string {
  const trimmed = name.trim().slice(0, 100);
  return trimmed.replace(/[\u0000-\u001F\u007F]/g, '');
}

export function sha256Hex(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp;
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp;
  return 'unknown';
}

export function validateSameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  const url = new URL(req.url);
  return origin === url.origin;
}

function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  const out: Record<string, string> = {};
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  }
  return out;
}

export const CSRF_COOKIE_NAME = '__Host-swaptrade-csrf';
export const CSRF_HEADER_NAME = 'x-csrf-token';

export function generateCsrfToken(): string {
  return base64Url(crypto.randomBytes(32));
}

export function validateCsrf(req: Request): boolean {
  const headerToken = req.headers.get(CSRF_HEADER_NAME);
  if (!headerToken) return false;
  const cookies = parseCookies(req.headers.get('cookie'));
  const cookieToken = cookies[CSRF_COOKIE_NAME];
  if (!cookieToken) return false;
  const a = Buffer.from(headerToken);
  const b = Buffer.from(cookieToken);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function isSqliteConstraintError(err: unknown): boolean {
  return (
    err instanceof Error &&
    (err as Error & { code?: string }).code === 'SQLITE_CONSTRAINT'
  );
}

export function enforceRateLimit(params: {
  db: Database.Database;
  key: string;
  limit: number;
  windowMs: number;
  now: number;
}): { ok: true } | { ok: false; retryAfterSeconds: number } {
  const { db, key, limit, windowMs, now } = params;

  return db.transaction(() => {
    const row = db
      .prepare('SELECT count, reset_at FROM rate_limits WHERE key = ?')
      .get(key) as { count: number; reset_at: number } | undefined;

    if (!row || row.reset_at <= now) {
      db.prepare('INSERT OR REPLACE INTO rate_limits (key, count, reset_at) VALUES (?, ?, ?)')
        .run(key, 1, now + windowMs);
      return { ok: true } as const;
    }

    if (row.count >= limit) {
      return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((row.reset_at - now) / 1000)) } as const;
    }

    db.prepare('UPDATE rate_limits SET count = count + 1 WHERE key = ?').run(key);
    return { ok: true } as const;
  })();
}

function getEncryptionKey(): Buffer | null {
  const raw = process.env.SWAPTRADE_DATA_KEY;
  if (!raw) return null;
  try {
    const key = Buffer.from(raw, 'base64');
    if (key.length !== 32) return null;
    return key;
  } catch {
    return null;
  }
}

export function encryptTextIfPossible(plaintext: string): string | null {
  const key = getEncryptionKey();
  if (!key) return null;

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return base64Url(Buffer.concat([iv, tag, ciphertext]));
}

export async function verifyTurnstile(params: {
  token: string;
  ip: string;
}): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  const form = new URLSearchParams();
  form.set('secret', secret);
  form.set('response', params.token);
  if (params.ip !== 'unknown') form.set('remoteip', params.ip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  });

  if (!res.ok) return false;
  const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
  return Boolean(data?.success);
}
