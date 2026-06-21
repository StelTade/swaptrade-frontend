import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  try {
    const db = getDb();

    const user = db.prepare('SELECT email FROM users WHERE id = ?').get(id) as { email?: string } | undefined;
    if (!user || !user.email) return NextResponse.json({ ok: false, message: 'User not found' }, { status: 404 });

    const premium = db.prepare('SELECT id FROM premium_waitlist WHERE email = ? LIMIT 1').get(user.email) as { id?: string } | undefined;

    const content = [
      { id: '1', title: 'Getting Started Guide', body: 'Step-by-step onboarding to maximize your early access.' },
      { id: '2', title: 'Market Analysis Sample', body: 'A short sample of our premium market insights.' },
    ];

    const premiumContent = premium
      ? [{ id: 'p1', title: 'Premium Strategy Pack', body: 'Advanced strategies for premium members.' }]
      : [];

    return NextResponse.json({ ok: true, isPremium: !!premium, content: [...content, ...premiumContent] }, { status: 200 });
  } catch (err) {
    console.error('exclusive content error', err);
    return NextResponse.json({ ok: false, message: 'Internal error' }, { status: 500 });
  }
}
