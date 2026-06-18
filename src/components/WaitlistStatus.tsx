'use client';

import { useEffect, useState } from 'react';

interface WaitlistStatus {
  isOnWaitlist: boolean;
  verified: boolean;
  joinedDate?: string;
  position?: number;
  eta?: string;
  daysUntilAccess?: number;
}

export default function WaitlistStatus() {
  const [status, setStatus] = useState<WaitlistStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const checkStatus = async () => {
    const userId = localStorage.getItem('swaptrade_user_id');

    if (!userId) {
      setStatus({ isOnWaitlist: false, verified: false });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/waitlist/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(data);
        setLastUpdated(new Date());
      } else {
        setStatus({ isOnWaitlist: false, verified: false });
      }
    } catch {
      setStatus({ isOnWaitlist: false, verified: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
    
    // Set up real-time updates - refresh position every 5 minutes (300000 ms)
    const interval = setInterval(checkStatus, 300000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />;
  }

  if (!status?.isOnWaitlist) {
    return null;
  }

  if (!status.verified) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Confirm Your Email
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              We sent you a confirmation email. Please check your inbox and click the confirmation link to complete your registration.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <svg
          className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
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
        <div className="flex-1">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
            Email Confirmed!
          </h3>
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg relative mb-4">
            You&apos;re on the waitlist! We&apos;ll notify you when SwapTrade launches.
          </div>
          <div className="grid grid-cols-2 gap-4 mb-3">
            {status.position && (
              <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center">
                <p className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">Your Position</p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">#{status.position}</p>
              </div>
            )}
            {status.eta && (
              <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center">
                <p className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">Estimated Access</p>
                <p className="text-xl font-bold text-green-800 dark:text-green-200">{status.eta}</p>
              </div>
            )}
          </div>
          {lastUpdated && (
            <p className="text-xs text-green-700 dark:text-green-400">
              Last updated: {lastUpdated.toLocaleTimeString()} • Refreshes automatically every 5 minutes
            </p>
          )}
        </div>
      </div>
    </div>
  );
}