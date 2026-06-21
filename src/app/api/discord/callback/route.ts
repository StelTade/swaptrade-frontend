import { NextResponse } from 'next/server';

const DISCORD_TOKEN_URL = 'https://discord.com/api/oauth2/token';
const DISCORD_API = 'https://discord.com/api/v10';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  if (!code) return NextResponse.json({ message: 'Missing code' }, { status: 400 });

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirect = process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/discord/callback` : `${url.origin}/api/discord/callback`;
  if (!clientId || !clientSecret) return NextResponse.json({ message: 'Discord not configured' }, { status: 500 });

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirect,
  });

  try {
    const tokenRes = await fetch(DISCORD_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    if (!tokenRes.ok) return NextResponse.json({ message: 'Token exchange failed' }, { status: 502 });
    const tokenJson = await tokenRes.json();

    // Get user's Discord identity
    const meRes = await fetch(`${DISCORD_API}/users/@me`, { headers: { Authorization: `Bearer ${tokenJson.access_token}` } });
    if (!meRes.ok) return NextResponse.json({ message: 'Failed to fetch Discord user' }, { status: 502 });
    const me = await meRes.json();

    // At this point, the server should associate discord id with our user and assign roles via bot token
    // For now redirect back to /confirm with success
    const redirectUrl = `${url.origin}/?discordConnected=1`;
    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
