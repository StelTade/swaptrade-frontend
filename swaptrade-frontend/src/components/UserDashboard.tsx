'use client';

import { useEffect, useState, useCallback } from 'react';

interface DashboardData {
  userId: string;
  points: number;
  rank: number;
  referralCode: string | null;
  totalReferrals: number;
  successfulReferrals: number;
  referrals: Array<{ displayName: string; verified: boolean; joinedAt: number }>;
}

interface UserDashboardProps {
  userId: string;
}

export default function UserDashboard({ userId }: UserDashboardProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(`/api/users/${userId}/dashboard`);
      if (res.status === 403) throw new Error('Your account is not yet verified.');
      if (!res.ok) throw new Error('Failed to load dashboard.');
      setData(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const referralUrl =
    data?.referralCode && typeof window !== 'undefined'
      ? `${window.location.origin}/?ref=${data.referralCode}`
      : null;

  const copyLink = async () => {
    if (!referralUrl) return;
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div role="status" aria-live="polite" className="space-y-4 w-full max-w-2xl">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
        ))}
        <span className="sr-only">Loading dashboard…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="w-full max-w-2xl text-center text-red-500 py-8">
        {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <section aria-label="Waitlist dashboard" className="w-full max-w-2xl space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Your Waitlist Status</h2>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Points', value: data.points.toLocaleString() },
          { label: 'Rank', value: `#${data.rank}` },
          { label: 'Referrals', value: `${data.successfulReferrals} / ${data.totalReferrals}` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center"
          >
            <p className="text-2xl font-bold text-[#16a34a]">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Referral link */}
      {referralUrl && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Your Referral Link</h3>
          <div className="flex gap-2 items-center">
            <input
              readOnly
              value={referralUrl}
              aria-label="Your referral link"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none"
            />
            <button
              type="button"
              onClick={copyLink}
              className="px-4 py-2 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-medium transition-colors whitespace-nowrap"
              aria-label="Copy referral link to clipboard"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      {/* Referred users */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          People You&apos;ve Referred ({data.totalReferrals})
        </h3>
        {data.referrals.length === 0 ? (
          <p className="text-gray-500 text-sm">No referrals yet. Share your link to move up the list!</p>
        ) : (
          <ul className="space-y-2" aria-label="Referred users list">
            {data.referrals.map((r, i) => (
              <li
                key={i}
                className="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <span className="text-sm text-gray-900 dark:text-gray-100">{r.displayName}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    r.verified
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}
                >
                  {r.verified ? 'Verified ✓' : 'Pending'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
