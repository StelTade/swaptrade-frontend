import { NextResponse } from 'next/server';

const DISCORD_API = 'https://discord.com/api/v10';

export async function POST(req: Request) {
  const webhook = process.env.DISCORD_WELCOME_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ message: 'No webhook configured' }, { status: 500 });

  try {
    const body = await req.json();
    const { discordId, displayName } = body;
    const content = `Welcome <@${discordId}>! 🎉\nThanks for joining the SwapTrade community, ${displayName || 'friend'}.`;
    await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content }) });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
