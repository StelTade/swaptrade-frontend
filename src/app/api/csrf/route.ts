import { NextResponse } from 'next/server';
import { CSRF_COOKIE_NAME, generateCsrfToken } from '@/lib/security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const token = generateCsrfToken();
  const res = NextResponse.json({ token }, { status: 200 });
  res.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
  return res;
}

