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
- **Referral System**: Unique referral links for user acquisition and rewards

## Components

### Frontend Components

#### Pages
- `/signup` - Waitlist signup form with referral code handling
- `/verify` - Email verification page with referral link display
- `/resend-verification` - Resend verification email page

#### Components
- `VerificationStatus` - Displays verification status with appropriate icons and messages
- `ReferralLink` - Referral link display and sharing component

#### Hooks
- `useEmailVerification` - Custom hook for managing verification state and API calls

#### Utilities
- `referral.ts` - Referral code generation and validation utilities

#### Types
- `WaitlistUser` - User data structure with referral fields
- `VerificationToken` - Token data structure
- `EmailVerificationRequest/Response` - API request/response types

### API Endpoints (Backend)

The following API endpoints need to be implemented in the backend:

#### POST `/api/waitlist/signup`
- Accepts: `{ email: string, referralCode?: string }`
- Sends verification email with unique token
- Returns: Success/error message

#### POST `/api/verify-email`
- Accepts: `{ token: string }`
- Validates token and updates user status to "verified"
- Generates unique referral code for user
- Returns: Success/error message with user data including referral code

#### POST `/api/resend-verification`
- Accepts: `{ email: string }`
- Sends new verification email
- Returns: Success/error message

## User Flow

1. User visits `/signup` and enters their email (optional referral code from URL)
2. System generates verification token and sends email
3. User receives email with verification link: `/verify?token=<token>`
4. User clicks link, system validates token
5. If valid, user status becomes "verified" and unique referral code is generated
6. User receives referral link for sharing
7. If expired/invalid, user can request new verification email

## Referral System

### Overview
Upon successful email verification, each user receives a unique referral link that can be shared to invite friends to join the waitlist.

### Features
- **Unique Codes**: Cryptographically secure 10-character alphanumeric codes
- **URL Format**: `https://swaptrade.com/signup?ref=UNIQUE_CODE`
- **Tracking**: Referral relationships stored in database
- **Sharing**: Copy-to-clipboard and native share API support
- **Validation**: Referral codes validated on signup

### Referral Flow
1. User completes email verification
2. System generates unique referral code
3. Referral link displayed with sharing options
4. Friends can click link to signup with referral tracking
5. Referral relationships maintained for future rewards

### Technical Details
- **Code Generation**: Uses `crypto.getRandomValues()` for security
- **Length**: 10 characters (8-12 range supported)
- **Format**: Uppercase alphanumeric only
- **Uniqueness**: Database constraints prevent collisions
- **URL Handling**: Automatic extraction from `?ref=` parameter

## Email Template

The verification email should include:
- SwapTrade branding
- Clear call-to-action button
- Verification link with token
- Expiration notice
- Contact information for support
- Referral link (after verification)

## Security Considerations

- Tokens should be cryptographically secure
- Tokens should expire after reasonable time (24 hours)
- Referral codes should be unique and collision-resistant
- Rate limiting on signup and resend endpoints
- Input validation and sanitization
- HTTPS required for all verification and referral links

## Error Handling

- Invalid tokens: Display error message with option to resend
- Expired tokens: Display expiration message with resend option
- Invalid referral codes: Graceful fallback to normal signup
- Network errors: Retry mechanism and user-friendly messages
- Duplicate signups: Handle gracefully without sending multiple emails

## Integration

### Email Service Provider
- SendGrid, Mailgun, or similar service
- Template management for branded emails
- Include referral links in welcome emails
- Delivery tracking and analytics

### Database Schema
```sql
-- Users table
CREATE TABLE waitlist_users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  status ENUM('pending', 'verified', 'expired') DEFAULT 'pending',
  referral_code VARCHAR(12) UNIQUE,
  referred_by VARCHAR(12),
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

-- Indexes for performance
CREATE INDEX idx_waitlist_users_referral_code ON waitlist_users(referral_code);
CREATE INDEX idx_waitlist_users_referred_by ON waitlist_users(referred_by);
CREATE INDEX idx_verification_tokens_email ON verification_tokens(email);
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