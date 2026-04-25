export async function sendWaitlistSignupEmail(_: { to: string; name?: string }) {
  if (process.env.EMAIL_MODE !== 'enabled') return;
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

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #fbbf24 0%, #f97316 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; }
          .content { padding: 30px 0; }
          .benefit { margin: 15px 0; padding: 15px; background: #f3f4f6; border-left: 4px solid #fbbf24; }
          .button { display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #f97316 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { border-top: 1px solid #e5e7eb; padding-top: 20px; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to SwapTrade Premium!</h1>
            <p style="font-size: 24px; margin: 10px 0;">
              ${data.isNew ? `Your Position: #${data.position}` : 'You\'re Already on the List!'}
            </p>
          </div>

          <div class="content">
            <p>Hi ${data.name},</p>

            <p>${
              data.isNew
                ? `Great news! You've successfully joined our premium waitlist. There are only 500 founding member spots available, and you're #${data.position}!`
                : 'You\'re already on our premium waitlist. Thanks for your interest!'
            }</p>

            <h2 style="color: #1f2937; margin-top: 30px;">What's Coming in SwapTrade Premium:</h2>

            <div class="benefit">
              <strong>⚡ Advanced Analytics</strong> - Real-time portfolio insights and detailed performance metrics
            </div>
            <div class="benefit">
              <strong>🎯 AI Trading Signals</strong> - Machine learning-powered buy/sell recommendations
            </div>
            <div class="benefit">
              <strong>📊 Pro Charts</strong> - Advanced technical analysis with 50+ indicators
            </div>
            <div class="benefit">
              <strong>🔔 Priority Alerts</strong> - Instant notifications for price movements
            </div>
            <div class="benefit">
              <strong>👥 VIP Community</strong> - Access to exclusive trading strategies
            </div>
            <div class="benefit">
              <strong>📈 Portfolio Tools</strong> - Risk management and position sizing calculators
            </div>

            <h2 style="color: #1f2937; margin-top: 30px;">Your Benefits as a Founding Member:</h2>
            <ul style="color: #374151; line-height: 1.8;">
              <li><strong>30% Lifetime Discount</strong> - Lock in savings on all premium features forever</li>
              <li><strong>Early Access</strong> - Get premium features as soon as they launch</li>
              <li><strong>Beta Testing</strong> - Shape the future with early access to new tools</li>
              <li><strong>Priority Support</strong> - Direct access to our support team</li>
            </ul>

            <p style="text-align: center; margin: 30px 0;">
              <a href="https://swaptrade.com/premium" class="button">View Premium Features</a>
            </p>

            <h2 style="color: #1f2937; margin-top: 30px;">Launch Timeline</h2>
            <p style="color: #374151;">We're targeting launch in Q2 2026. Sign-ups are capped at 500 founding members, so secure your spot now!</p>

            <p style="color: #374151; margin-top: 20px;">
              Questions? Reply to this email or visit our help center.
            </p>
          </div>

          <div class="footer">
            <p>© 2026 SwapTrade. All rights reserved.</p>
            <p>You received this email because you joined our premium waitlist.</p>
          </div>
        </div>
      </body>
    </html>
  `;

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


