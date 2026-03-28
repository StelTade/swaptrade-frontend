export async function sendWaitlistSignupEmail(_: { to: string; name?: string }) {
  if (process.env.EMAIL_MODE !== 'enabled') return;
  return;
}

