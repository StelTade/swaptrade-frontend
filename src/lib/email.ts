export async function sendWaitlistSignupEmail({
  to,
}: {
  to: string;
  name?: string;
  verificationLink?: string;
}) {
  if (process.env.EMAIL_MODE !== 'enabled') return;

  // Generate email subject and content
  const subject = 'Welcome to SwapTrade Waitlist!';

  /*
  const displayName = name ? name.split(' ')[0] : 'there';
  const confirmationButton = verificationLink
    ? `<p style="text-align: center; margin: 30px 0;">
        <a href="${verificationLink}" style="display: inline-block; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Confirm Your Email
        </a>
      </p>`
    : '';

  const expirationNote = verificationLink
    ? '<p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 20px;">This link expires in 24 hours.</p>'
    : '';

  const htmlContent = `
    ... (template content) ...
  `;
  */

  // TODO: Implement actual email sending via email provider (SendGrid, Resend, etc.)
  console.log(`Email would be sent to ${to} with subject: ${subject}`);
  return;
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
