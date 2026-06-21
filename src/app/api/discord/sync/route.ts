import { NextResponse } from 'next/server';

const DISCORD_API = 'https://discord.com/api/v10';

export async function POST(req: Request) {
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID;
  if (!botToken || !guildId) return NextResponse.json({ message: 'Discord not configured' }, { status: 500 });

  try {
    const { discordId, addPremium } = await req.json();
    if (!discordId) return NextResponse.json({ message: 'Missing discordId' }, { status: 400 });

    // role ids should be configured via env
    const premiumRole = process.env.DISCORD_PREMIUM_ROLE_ID;
    if (!premiumRole) return NextResponse.json({ message: 'Premium role not configured' }, { status: 500 });

    // Add or remove role
    const method = addPremium ? 'PUT' : 'DELETE';
    const url = `${DISCORD_API}/guilds/${guildId}/members/${discordId}/roles/${premiumRole}`;
    const res = await fetch(url, { method, headers: { Authorization: `Bot ${botToken}` } });
    if (!res.ok) return NextResponse.json({ message: 'Failed to update role' }, { status: 502 });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
