'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import VerificationStatus from '@/components/verification/VerificationStatus';

export default function ResendVerificationPage() {
  const [email, setEmail] = useState('');
  const { isLoading, resendVerification } = useEmailVerification();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const result = await resendVerification(email);

    setMessageType(result.success ? 'success' : 'error');
    setMessage(result.message);

    if (result.success) {
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-[#16a34a]">
            SwapTrade
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Resend Verification Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address to receive a new verification link
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#16a34a] focus:border-[#16a34a] sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#16a34a] hover:bg-[#15803d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16a34a] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Verification Email'}
              </button>
            </div>
          </form>

          {message && (
            <div className="mt-4">
              <VerificationStatus
                status={messageType === 'success' ? 'verified' : 'error'}
                message={message}
              />
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Remember your verification link?</span>
              </div>
            </div>

            <div className="mt-6 text-center space-y-2">
              <Link
                href="/signup"
                className="text-sm text-[#16a34a] hover:text-[#15803d] block"
              >
                Back to Signup
              </Link>
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-800 block"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}