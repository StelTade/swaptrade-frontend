import { NextResponse } from 'next/server';

const DISCORD_OAUTH_URL = 'https://discord.com/api/oauth2/authorize';

export function GET() {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirect = process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/discord/callback` : '/api/discord/callback';
  if (!clientId) return NextResponse.json({ message: 'Discord not configured' }, { status: 500 });

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirect,
    response_type: 'code',
    scope: 'identify guilds.join email',
    prompt: 'consent',
  });

  return NextResponse.redirect(`${DISCORD_OAUTH_URL}?${params.toString()}`);
}
