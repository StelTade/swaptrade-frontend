'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import VerificationStatus from '@/components/verification/VerificationStatus';
import ReferralLink from '@/components/referral/ReferralLink';

function VerifyPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { isLoading, isVerified, error, verifyEmail, user } = useEmailVerification();

  useEffect(() => {
    if (token && !isLoading && !isVerified && !error) {
      verifyEmail(token);
    }
  }, [token, verifyEmail, isLoading, isVerified, error]);

  const handleResend = async () => {
    // For resend, we'd need the email, but since we don't have it in the URL,
    // redirect to resend page
    window.location.href = '/resend-verification';
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <Link href="/" className="text-2xl font-bold text-[#16a34a]">
              SwapTrade
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Email Verification
            </h2>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <VerificationStatus
              status="error"
              message="No verification token provided. Please check your email for the verification link."
            />
            <div className="mt-6 text-center">
              <Link
                href="/resend-verification"
                className="text-sm text-[#16a34a] hover:text-[#15803d]"
              >
                Resend verification email
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-[#16a34a]">
            SwapTrade
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLoading && (
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16a34a] mx-auto"></div>
              <p className="text-gray-600">Verifying your email...</p>
            </div>
          )}

          {isVerified && (
            <div className="space-y-6">
              <VerificationStatus
                status="verified"
                message="Your email has been verified successfully! You're now on the waitlist."
              />

              {user?.referralCode && (
                <ReferralLink referralCode={user.referralCode} />
              )}

              <Link
                href="/"
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#16a34a] hover:bg-[#15803d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16a34a]"
              >
                Back to Home
              </Link>
            </div>
          )}

          {error && (
            <div className="space-y-4">
              <VerificationStatus
                status={error.includes('expired') ? 'expired' : 'error'}
                message={error}
                onResend={handleResend}
              />
              <Link
                href="/signup"
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16a34a]"
              >
                Back to Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16a34a] mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <VerifyPageContent />
    </Suspense>
  );
}