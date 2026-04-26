# Waitlist Feature - Testing Guide

## Quick Start

### 1. Local Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### 2. Test the Signup Flow

#### Step 1: Homepage Form
1. Visit `http://localhost:3000`
2. You should see the **WaitlistStatus** component (empty on first visit)
3. Below it, see the **WaitlistForm** with email and name fields
4. Fill in:
   - Email: `test@example.com`
   - Name: `John` (optional)
5. Click "Join Waitlist"
6. See success message: "You're on the list!"
7. Browser localStorage now contains `swaptrade_user_id` (open DevTools → Application → LocalStorage)

### 3. Test Email Confirmation

#### Step 1: Check Email Sending
1. Form submission logs to console: `npm run dev` output shows email request
2. Email output appears as: `Email would be sent to test@example.com...`

#### Step 2: Manual Confirmation Testing
1. Copy the userId from localStorage (DevTools)
2. Generate a test token manually (for now, we log what would be sent)
3. Visit confirmation page with test parameters:
   ```
   http://localhost:3000/confirm?token=test_token_12345&userId=<COPIED_USER_ID>
   ```
4. Should see "Confirmation Failed" (since token isn't real for testing)

### 4. Test Status Component

#### Step 1: Verified User
After signup, visit homepage again:
1. WaitlistStatus component shows: "Confirm Your Email" (blue notification)
2. Suggests checking inbox and clicking confirmation link
3. Once verified (after email confirmation), shows green "Email Confirmed!" message

### 5. Test API Endpoints

#### Get Status
```bash
# In another terminal/Postman
curl -X POST http://localhost:3000/api/waitlist/status \
  -H "Content-Type: application/json" \
  -d '{"userId": "YOUR_USER_ID_FROM_LOCALSTORAGE"}'

# Response:
# {
#   "isOnWaitlist": true,
#   "verified": false,
#   "joinedDate": "Apr 25, 2026",
#   "email": "test@example.com"
# }
```

#### Attempt Email Confirmation (will fail without real token)
```bash
curl -X POST http://localhost:3000/api/waitlist/confirm \
  -H "Content-Type: application/json" \
  -d '{"token": "test_token", "userId": "YOUR_USER_ID"}'

# Response (expected to fail):
# {"message": "Invalid confirmation token"}
```

### 6. Test Rate Limiting

#### Signup Rate Limit (IP-based)
```bash
# Try to signup 21 times from same IP within 10 minutes
# Request 21 will fail with 429 Too Many Requests

# Same with email-based limit
# Same email 6 times within 1 hour = 429
```

### 7. Test Error Handling

#### Invalid Email
```bash
# Empty email
# Invalid format (no @)
# Email with spaces
```

#### Missing CAPTCHA (if enabled)
```bash
# Skip CAPTCHA if TURNSTILE_SECRET_KEY is set
# Should return 400: "Captcha required"
```

#### Expired Token
```bash
curl -X POST http://localhost:3000/api/waitlist/confirm \
  -H "Content-Type: application/json" \
  -d '{"token": "expired_token", "userId": "user_id"}'

# Response (if token is old):
# {"message": "Confirmation link has expired"} (410 Gone)
```

## Testing Checklist

### Form Validation
- [ ] Empty email rejected
- [ ] Invalid email format rejected
- [ ] Valid email accepted
- [ ] Optional name field accepts text
- [ ] Form shows loading state while submitting
- [ ] Success message appears after submission
- [ ] Success message has "Join with another email" button

### API Testing
- [ ] Signup returns user ID and referral code
- [ ] Status endpoint returns correct user info
- [ ] Rate limiting works (HTTP 429)
- [ ] CSRF token requirement enforced
- [ ] Invalid input rejected (HTTP 400)
- [ ] Database updates correctly

### UI/UX Testing
- [ ] Form is responsive on mobile/tablet/desktop
- [ ] Dark mode works correctly
- [ ] Accessibility: keyboard navigation works
- [ ] Accessibility: screen reader compatible
- [ ] Loading states appear
- [ ] Error messages are clear
- [ ] Success page has proper redirect

### Database Testing
- [ ] Users table has new record after signup
- [ ] Email hash is stored correctly
- [ ] User points initialized to 0
- [ ] Referral code generated
- [ ] Email verification table ready (for tokens)

### Security Testing
- [ ] CSRF token required for signup
- [ ] Rate limiting blocks excessive requests
- [ ] Email normalization works (case-insensitive)
- [ ] SQL injection not possible (Zod validation)
- [ ] XSS protection via escaping
- [ ] Sensitive data encrypted if configured

## Debugging Tips

### Check Console Output
```bash
# Terminal running `npm run dev`
# Watch for:
# - "Email would be sent to..."
# - HTTP request logs
# - Database query logs
# - Referral code generated
```

### Browser DevTools
```javascript
// Console tab
localStorage.getItem('swaptrade_user_id')  // See user ID

// Application tab → LocalStorage
// See all stored data
```

### Check Database
```bash
# Database is created at .data/swaptrade.sqlite
# Use SQLite browser to inspect:
# - SELECT * FROM users;
# - SELECT * FROM referral_codes;
# - SELECT * FROM rate_limits;
```

## Known Issues & Workarounds

### Issue: Form keeps showing after signup
**Cause**: Page not refreshing
**Fix**: Refresh page or use browser back/forward

### Issue: "Email already exists" error
**Cause**: Email already in database
**Fix**: Use different email for testing or reset database

### Issue: Referral code not generated
**Cause**: Database setup issue
**Fix**: Delete `.data/swaptrade.sqlite` and restart

### Issue: CAPTCHA not showing
**Cause**: TURNSTILE keys not set
**Fix**: Form still works, CAPTCHA is optional

## Production Testing

Before deploying:

1. **Email Service Integration**
   - Test with actual email provider
   - Verify delivery rate
   - Check spam folder

2. **Token Generation**
   - Implement random token generation
   - Verify token expiration works
   - Test token cleanup

3. **Load Testing**
   - Simulate 1000+ concurrent signups
   - Monitor database performance
   - Check memory usage

4. **Security Audit**
   - Test CSRF protection
   - Verify rate limiting accuracy
   - Check for information leakage

5. **Analytics**
   - Track signup conversion rate
   - Monitor email confirmation rate
   - Track referral effectiveness

## Next Steps

1. Integrate email service (SendGrid/Resend/AWS SES)
2. Generate and send real verification tokens
3. Test in staging environment
4. Set up monitoring and alerts
5. Deploy to production
6. Monitor usage and user feedback
