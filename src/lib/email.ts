export async function sendWaitlistSignupEmail({
  to,
  name,
  verificationLink,
  userId,
  referralLink,
  isPremium,
}: {
  to: string;
  name?: string;
  verificationLink?: string;
  userId?: string;
  referralLink?: string;
  isPremium?: boolean;
}) {
  if (process.env.EMAIL_MODE !== 'enabled') return;

  const subject = 'Welcome to SwapTrade — Confirm your email';

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL || 'swaptrade.com'}`;
  const unsubscribeLink = `${baseUrl}/api/email/preferences/unsubscribe?email=${encodeURIComponent(to)}`;
  const prefsLink = `${baseUrl}/preferences?email=${encodeURIComponent(to)}`;

  const displayName = name ? name.split(' ')[0] : '';
  const verifyHtml = verificationLink
    ? `<p style="text-align:center;margin:20px 0"><a href="${verificationLink}" style="background:#16a34a;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:600;">Confirm your email</a></p>`
    : '';

  const referralHtml = referralLink
    ? `<p>Your referral link: <a href="${referralLink}">${referralLink}</a></p>`
    : '';

  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial; color: #0f172a;">
      <h2>Welcome${displayName ? `, ${displayName}` : ''}!</h2>
      <p>Thanks for joining the SwapTrade waitlist. We'll keep you updated while you wait for early access.</p>
      ${verifyHtml}
      ${referralHtml}
      <p style="font-size:13px;color:#6b7280">Manage your email preferences <a href="${prefsLink}">here</a> or <a href="${unsubscribeLink}">unsubscribe</a>.</p>
    </div>
  `;

  const sendgridKey = process.env.SENDGRID_API_KEY;
  if (sendgridKey) {
    try {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sendgridKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: process.env.SENDER_EMAIL || 'noreply@swaptrade.com', name: 'SwapTrade' },
          subject,
          content: [{ type: 'text/html', value: html }],
        }),
      });
      console.debug('Sent welcome email to', to);
    } catch (err) {
      console.error('SendGrid send error', err);
    }
  } else {
    console.log(`(dev) would send welcome email to ${to}`);
    console.log(html);
  }

  return;
}

export async function sendMagicLinkEmail({ to, token }: { to: string; token: string }) {
  if (process.env.EMAIL_MODE !== 'enabled') return;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL || 'swaptrade.com'}`;
  const link = `${baseUrl}/auth/magic/verify?token=${encodeURIComponent(token)}`;
  const subject = `Your magic login link for SwapTrade`;
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; color:#0f172a;">
      <p>Click the link below to sign in to your SwapTrade dashboard. The link expires in 30 minutes.</p>
      <p style="text-align:center;margin:20px 0"><a href="${link}" style="background:#16a34a;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:600;">Sign in to SwapTrade</a></p>
      <p style="font-size:13px;color:#6b7280">If you did not request this, you can ignore this email.</p>
    </div>
  `;

  const sendgridKey = process.env.SENDGRID_API_KEY;
  if (sendgridKey) {
    try {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sendgridKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: process.env.SENDER_EMAIL || 'noreply@swaptrade.com', name: 'SwapTrade' },
          subject,
          content: [{ type: 'text/html', value: html }],
        }),
      });
      console.debug('Sent magic link to', to);
    } catch (err) {
      console.error('SendGrid magic link error', err);
    }
  } else {
    console.log(`(dev) magic link for ${to}: ${link}`);
  }
}

export async function sendPremiumWaitlistEmail(data: {
  email: string;
  name: string;
  position: number;
  isNew: boolean;
}) {
  if (process.env.EMAIL_MODE !== 'enabled') return;

  // Email template for premium waitlist
  const subject = data.isNew
    ? `Welcome to SwapTrade Premium! You're #${data.position}`
    : 'Already on SwapTrade Premium Waitlist';

  /*
  const htmlContent = `
    ... (template content) ...
  `;
  */

  // In production, integrate with email service (SendGrid, Postmark, etc.)
  console.debug('Premium waitlist email:', {
    to: data.email,
    subject,
    position: data.position,
  });

  // Placeholder - implement with your email service
  // await emailService.send({ to: data.email, subject, html: htmlContent });

  return;
}
