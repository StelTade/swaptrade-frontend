# Email Verification System

This document describes the email verification system implemented for the SwapTrade waitlist signup process.

## Overview

The email verification system ensures that users provide valid email addresses and helps prevent spam signups. When users sign up for the waitlist, they receive a verification email with a unique token that they must click to activate their entry.

## Features

- **Secure Token Generation**: Uses JWT or random UUID for verification tokens
- **Token Expiration**: Tokens expire after a configurable period (default: 24 hours)
- **Email Templates**: Branded email templates matching the SwapTrade design
- **Error Handling**: Graceful handling of expired or invalid tokens
- **Resend Functionality**: Users can request new verification emails
- **Status Tracking**: User verification status is tracked in the database

## Components

### Frontend Components

#### Pages
- `/signup` - Waitlist signup form
- `/verify` - Email verification page
- `/resend-verification` - Resend verification email page

#### Components
- `VerificationStatus` - Displays verification status with appropriate icons and messages

#### Hooks
- `useEmailVerification` - Custom hook for managing verification state and API calls

#### Types
- `WaitlistUser` - User data structure
- `VerificationToken` - Token data structure
- `EmailVerificationRequest/Response` - API request/response types

### API Endpoints (Backend)

The following API endpoints need to be implemented in the backend:

#### POST `/api/waitlist/signup`
- Accepts: `{ email: string }`
- Sends verification email with unique token
- Returns: Success/error message

#### POST `/api/verify-email`
- Accepts: `{ token: string }`
- Validates token and updates user status to "verified"
- Returns: Success/error message

#### POST `/api/resend-verification`
- Accepts: `{ email: string }`
- Sends new verification email
- Returns: Success/error message

## User Flow

1. User visits `/signup` and enters their email
2. System generates verification token and sends email
3. User receives email with verification link: `/verify?token=<token>`
4. User clicks link, system validates token
5. If valid, user status becomes "verified"
6. If expired/invalid, user can request new verification email

## Email Template

The verification email should include:
- SwapTrade branding
- Clear call-to-action button
- Verification link with token
- Expiration notice
- Contact information for support

## Security Considerations

- Tokens should be cryptographically secure
- Tokens should expire after reasonable time (24 hours)
- Rate limiting on signup and resend endpoints
- Input validation and sanitization
- HTTPS required for all verification links

## Error Handling

- Invalid tokens: Display error message with option to resend
- Expired tokens: Display expiration message with resend option
- Network errors: Retry mechanism and user-friendly messages
- Duplicate signups: Handle gracefully without sending multiple emails

## Integration

### Email Service Provider
- SendGrid, Mailgun, or similar service
- Template management for branded emails
- Delivery tracking and analytics

### Database Schema
```sql
-- Users table
CREATE TABLE waitlist_users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  status ENUM('pending', 'verified', 'expired') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verified_at TIMESTAMP NULL
);

-- Verification tokens table
CREATE TABLE verification_tokens (
  token VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Testing

- Unit tests for token generation and validation
- Integration tests for email sending
- E2E tests for complete verification flow
- Edge cases: expired tokens, invalid tokens, network failures

## Future Enhancements

- Email preference management
- Bulk verification for enterprise users
- Analytics and conversion tracking
- Multi-language support for emails
- Advanced spam prevention measures