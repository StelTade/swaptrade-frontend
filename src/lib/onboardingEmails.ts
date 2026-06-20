import { getDb } from './db';
import { sha256Hex } from './security';

type ScheduleOptions = {
  userId: string;
  email: string;
  name?: string | null;
  referralLink?: string | null;
  isPremium?: boolean;
};

const BASE_SEQUENCE = [
  { days: 0, template: 'welcome' },
  { days: 2, template: 'features' },
  { days: 6, template: 'market_sample' },
  { days: 13, template: 'lead_trader' },
  { days: 20, template: 'community_invite' },
  { days: 27, template: 'early_access_guide' },
  { days: 34, template: 'final_reminder' },
];

const PREMIUM_EXTRA = { days: 1, template: 'premium_bonus' };

export async function schedulePostSignupSequence(opts: ScheduleOptions) {
  const db = getDb();
  const now = Date.now();

  const insert = db.prepare(
    'INSERT INTO email_jobs (id, user_id, email, template, send_at, meta, created_at, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  );

  const seq = [...BASE_SEQUENCE];
  if (opts.isPremium) {
    // Insert premium bonus email after day 0
    seq.splice(1, 0, PREMIUM_EXTRA);
  }

  const jobs = seq.map((item) => {
    const sendAt = now + item.days * 24 * 60 * 60 * 1000;
    const id = cryptoId();
    const meta = JSON.stringify({ name: opts.name || null, referralLink: opts.referralLink || null, isPremium: !!opts.isPremium });
    insert.run(id, opts.userId, opts.email, item.template, sendAt, meta, now, 'pending');
    return { id, template: item.template, sendAt };
  });

  return jobs;
}

export async function fetchDueEmailJobs(limit = 50) {
  const db = getDb();
  const now = Date.now();
  const rows = db.prepare('SELECT * FROM email_jobs WHERE status = ? AND send_at <= ? ORDER BY send_at ASC LIMIT ?').all('pending', now, limit);
  return rows as Array<any>;
}

export async function markJobSent(jobId: string) {
  const db = getDb();
  const now = Date.now();
  db.prepare('UPDATE email_jobs SET status = ?, sent_at = ? WHERE id = ?').run('sent', now, jobId);
}

export async function markJobFailed(jobId: string) {
  const db = getDb();
  db.prepare('UPDATE email_jobs SET status = ? WHERE id = ?').run('failed', jobId);
}

function cryptoId() {
  return (globalThis.crypto && (globalThis.crypto as any).randomUUID && (globalThis.crypto as any).randomUUID()) || ('id-' + Math.random().toString(36).slice(2, 10));
}

export async function sendJobUsingProvider(job: any) {
  // job: { id, user_id, email, template, meta }
  const sendgridKey = process.env.SENDGRID_API_KEY;
  const unsubscribeBase = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/email/preferences/unsubscribe`;
  const prefsBase = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/preferences`;
  const meta = job.meta ? JSON.parse(job.meta) : {};

  const trackingParam = `?jid=${encodeURIComponent(job.id)}&tmpl=${encodeURIComponent(job.template)}`;

  const referralLink = meta.referralLink ? `${meta.referralLink}${meta.referralLink.includes('?') ? '&' : '?'}jid=${encodeURIComponent(job.id)}` : null;

  const subjectByTemplate: Record<string, string> = {
    welcome: `Welcome to SwapTrade — confirm your email`,
    features: `Discover SwapTrade features`,
    market_sample: `Exclusive market analysis sample`,
    lead_trader: `A conversation with a lead trader`,
    community_invite: `Join our community`,
    early_access_guide: `Prepare for early access`,
    final_reminder: `Final reminder before launch`,
    premium_bonus: `Premium bonus content just for you`,
  };

  const subject = subjectByTemplate[job.template] || 'SwapTrade update';

  function renderTemplate(template: string) {
    const name = meta.name || '';
    const unsubscribeLink = `${unsubscribeBase}?email=${encodeURIComponent(job.email)}&jid=${encodeURIComponent(job.id)}`;
    const prefsLink = `${prefsBase}?email=${encodeURIComponent(job.email)}`;

    switch (template) {
      case 'welcome':
        return `
          <h2>Welcome ${name ? `${name}` : ''}!</h2>
          <p>Thanks for joining SwapTrade. Your referral link is below — share it to move up the waitlist.</p>
          <p><a href="${referralLink || '#'}">Access your referral link</a></p>
          <p>Manage preferences: <a href="${prefsLink}">Email preferences</a> • <a href="${unsubscribeLink}">Unsubscribe</a></p>
        `;
      case 'features':
        return `
          <h2>What SwapTrade can do</h2>
          <ul>
            <li>Real-time simulated trading</li>
            <li>Advanced analytics and charts</li>
            <li>Leaderboards and challenges</li>
          </ul>
          <p>Learn more in the app: <a href="${process.env.NEXT_PUBLIC_BASE_URL || ''}/features${trackingParam}">Feature tour</a></p>
        `;
      case 'market_sample':
        return `
          <h2>Exclusive Market Analysis</h2>
          <p>Here's a short sample analysis to show how our insights work.</p>
          <blockquote style="background:#f8fafc;padding:12px;border-left:4px solid #16a34a">Market trend: simulated data shows BTC momentum increasing over 7-day window.</blockquote>
          <p>Open the full report: <a href="${process.env.NEXT_PUBLIC_BASE_URL || ''}/reports/market-sample${trackingParam}">Read report</a></p>
        `;
      case 'lead_trader':
        return `
          <h2>Interview with a lead trader</h2>
          <p>We interviewed one of our lead traders about strategy and risk management. Watch the interview here:</p>
          <p><a href="${process.env.NEXT_PUBLIC_BASE_URL || ''}/content/lead-trader${trackingParam}">Watch interview</a></p>
        `;
      case 'community_invite':
        return `
          <h2>Join the community</h2>
          <p>Connect with other traders on Discord and Telegram.</p>
          <p><a href="https://discord.gg/swaptrade${trackingParam}">Join Discord</a> • <a href="https://t.me/swaptrade${trackingParam}">Join Telegram</a></p>
        `;
      case 'early_access_guide':
        return `
          <h2>Prepare for early access</h2>
          <p>Checklist: verify your email, follow our onboarding guide, test the demo account.</p>
          <p>Guide: <a href="${process.env.NEXT_PUBLIC_BASE_URL || ''}/guide/early-access${trackingParam}">Get the guide</a></p>
        `;
      case 'final_reminder':
        return `
          <h2>Final reminder</h2>
          <p>We're launching soon — make sure your account details are up to date.</p>
          <p><a href="${process.env.NEXT_PUBLIC_BASE_URL || ''}/dashboard${trackingParam}">Open your dashboard</a></p>
        `;
      case 'premium_bonus':
        return `
          <h2>Premium bonus content</h2>
          <p>As a premium waitlist member, here's exclusive analysis and strategy notes.</p>
          <p><a href="${process.env.NEXT_PUBLIC_BASE_URL || ''}/premium/content${trackingParam}">View premium content</a></p>
        `;
      default:
        return `<p>Update: ${template}</p><p><a href="${unsubscribeLink}">Unsubscribe</a></p>`;
    }
  }

  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; color:#0f172a;">
      ${renderTemplate(job.template)}
      <hr style="margin:18px 0" />
      <p style="font-size:13px;color:#6b7280">Manage your email: <a href="${prefsBase}?email=${encodeURIComponent(job.email)}">Preferences</a> • <a href="${unsubscribeBase}?email=${encodeURIComponent(job.email)}">Unsubscribe</a></p>
    </div>
  `;

  if (sendgridKey) {
    try {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sendgridKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: job.email }], subject }],
          from: { email: process.env.SENDER_EMAIL || 'noreply@swaptrade.com', name: 'SwapTrade' },
          content: [{ type: 'text/html', value: html }],
          tracking_settings: {
            click_tracking: { enable: true, enable_text: true },
            open_tracking: { enable: true }
          }
        }),
      });
      await markJobSent(job.id);
      return true;
    } catch (err) {
      console.error('SendGrid onboard send failed', err);
      await markJobFailed(job.id);
      return false;
    }
  }

  // Fallback: log and mark sent
  console.log(`(dev) would send onboarding email to ${job.email}: ${subject}`);
  console.log(html);
  await markJobSent(job.id);
  return true;
}
