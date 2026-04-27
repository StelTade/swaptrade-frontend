'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function ConfirmPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get('token');
      const userId = searchParams.get('userId');

      if (!token || !userId) {
        setStatus('error');
        setMessage('Invalid confirmation link');
        return;
      }

      try {
        const response = await fetch('/api/waitlist/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, userId }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 410) {
            setStatus('expired');
            setMessage('This confirmation link has expired. Please join the waitlist again.');
          } else {
            setStatus('error');
            setMessage(data.message || 'Failed to confirm email');
          }
        } else {
          setStatus('success');
          setMessage('Your email has been confirmed! You are now on the waitlist.');
          // Store user ID for dashboard access
          localStorage.setItem('swaptrade_user_id', userId);
        }
      } catch {
        setStatus('error');
        setMessage('An error occurred while confirming your email');
      }
    };

    confirmEmail();
  }, []);

  return (
    <div className="max-w-md mx-auto text-center">
      {status === 'loading' && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <svg
              className="animate-spin h-12 w-12 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <p className="text-lg">Confirming your email...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 space-y-4">
          <div className="flex justify-center">
            <svg
              className="w-16 h-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-green-900 dark:text-green-100">
            Email Confirmed!
          </h1>
          <p className="text-green-800 dark:text-green-200">{message}</p>
          <Link
            href="/dashboard"
            className="inline-block mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 space-y-4">
          <div className="flex justify-center">
            <svg
              className="w-16 h-16 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-900 dark:text-red-100">
            Confirmation Failed
          </h1>
          <p className="text-red-800 dark:text-red-200">{message}</p>
          <Link
            href="/"
            className="inline-block mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Return Home
          </Link>
        </div>
      )}

      {status === 'expired' && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8 space-y-4">
          <div className="flex justify-center">
            <svg
              className="w-16 h-16 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
            Link Expired
          </h1>
          <p className="text-yellow-800 dark:text-yellow-200">{message}</p>
          <Link
            href="/"
            className="inline-block mt-6 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors"
          >
            Join Waitlist Again
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar currentPath="/confirm" />
      <main className="container mx-auto px-4 py-20">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <ConfirmContent />
        </Suspense>
      </main>
    </div>
  );
}
