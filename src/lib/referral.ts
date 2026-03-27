/**
 * Generate a cryptographically secure random referral code
 * @param length - Length of the referral code (default: 10)
 * @returns A unique referral code
 */
export function generateReferralCode(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  // Use crypto.getRandomValues for cryptographically secure randomness
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }

  return result;
}

/**
 * Generate a referral link from a referral code
 * @param referralCode - The referral code
 * @param baseUrl - Base URL (default: current origin)
 * @returns Complete referral URL
 */
export function generateReferralLink(referralCode: string, baseUrl?: string): string {
  const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://swaptrade.com');
  return `${base}/signup?ref=${referralCode}`;
}

/**
 * Extract referral code from URL search parameters
 * @param searchParams - URL search parameters
 * @returns Referral code or null if not found
 */
export function getReferralCodeFromUrl(searchParams: URLSearchParams): string | null {
  return searchParams.get('ref');
}

/**
 * Validate referral code format (alphanumeric, 8-12 characters)
 * @param code - Referral code to validate
 * @returns True if valid, false otherwise
 */
export function isValidReferralCode(code: string): boolean {
  const referralCodeRegex = /^[A-Z0-9]{8,12}$/;
  return referralCodeRegex.test(code);
}