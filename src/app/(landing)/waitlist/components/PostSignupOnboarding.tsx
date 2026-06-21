"use client";

import { useEffect, useState } from 'react';

export default function PostSignupOnboarding() {
  const [status, setStatus] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('swaptrade_user_id');
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch('/api/waitlist/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => setStatus(data))
      .catch(() => setStatus(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="animate-pulse h-24 bg-gray-100 dark:bg-gray-800 rounded" />;
  if (!status) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Thanks for joining — here&apos;s what happens next</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">We&apos;ll keep you updated via email while you wait for access. You can check your waitlist position, referral progress, and exclusive content below.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-center">
          <p className="text-xs text-gray-500">Your Position</p>
          <p className="text-2xl font-bold">#{status.position ?? '-'}</p>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-center">
          <p className="text-xs text-gray-500">Referrals</p>
          <p className="text-2xl font-bold">{status.referrals ?? 0}</p>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-center">
          <p className="text-xs text-gray-500">ETA</p>
          <p className="text-2xl font-bold">{status.eta ?? 'TBD'}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <a href="/dashboard" className="inline-block px-4 py-2 bg-[#16a34a] text-white rounded">Go to Dashboard</a>
        <a href="/preferences" className="inline-block px-4 py-2 border rounded">Email Preferences</a>
        <a href="#exclusive" className="inline-block px-4 py-2 border rounded">Exclusive Content</a>
      </div>
    </div>
  );
}
