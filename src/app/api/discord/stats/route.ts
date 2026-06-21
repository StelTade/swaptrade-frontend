import { NextResponse } from 'next/server';

export const runtime = 'edge';

const DISCORD_API = 'https://discord.com/api/v10';

export async function GET() {
  const guildId = process.env.DISCORD_GUILD_ID;
  const botToken = process.env.DISCORD_BOT_TOKEN;
  if (!guildId || !botToken) {
    return NextResponse.json({ message: 'Discord not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(`${DISCORD_API}/guilds/${guildId}?with_counts=true`, {
      headers: { Authorization: `Bot ${botToken}` },
    });
    if (!res.ok) return NextResponse.json({ message: 'Failed' }, { status: 502 });
    const data = await res.json();
    return NextResponse.json({ memberCount: data.approximate_member_count ?? data.approximate_presence_count ?? null });
  } catch (err) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
