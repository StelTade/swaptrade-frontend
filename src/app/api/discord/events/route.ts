import { NextResponse } from 'next/server';

// Minimal events endpoint: in production this would read from a CMS or DB
export async function GET() {
  const now = Date.now();
  const events = [
    { id: 'ama-1', title: 'AMA with founders', time: new Date(now + 1000 * 60 * 60 * 24).toISOString() },
    { id: 'event-2', title: 'Community trading challenge', time: new Date(now + 1000 * 60 * 60 * 24 * 3).toISOString() },
  ];
  return NextResponse.json({ events });
}
