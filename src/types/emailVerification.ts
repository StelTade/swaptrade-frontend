export interface WaitlistUser {
  id: string;
  email: string;
  status: 'pending' | 'verified' | 'expired';
  referralCode?: string;
  referredBy?: string;
  createdAt: Date;
  verifiedAt?: Date;
}

export interface VerificationToken {
  token: string;
  email: string;
  expiresAt: Date;
  used: boolean;
}

export interface EmailVerificationRequest {
  email: string;
  referralCode?: string;
}

export interface EmailVerificationResponse {
  success: boolean;
  message: string;
  user?: WaitlistUser;
  referralLink?: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ResendVerificationResponse {
  success: boolean;
  message: string;
}