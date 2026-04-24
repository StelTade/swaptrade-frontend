"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDashboard } from "@/store/referralSlice";

function ShareButtons({ url }: { url: string }) {
  const text = encodeURIComponent("Join SwapTrade — the risk-free crypto trading simulator!");
  return (
    <div className="flex gap-3 flex-wrap">
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium transition-colors"
        aria-label="Share on Twitter"
      >
        Twitter / X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        aria-label="Share on Facebook"
      >
        Facebook
      </a>
      <a
        href={`https://wa.me/?text=${text}%20${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors"
        aria-label="Share on WhatsApp"
      >
        WhatsApp
      </a>
    </div>
  );
}

export default function ReferralDashboard({ userId }: { userId: string }) {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.referral);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboard(userId));
  }, [dispatch, userId]);

  const referralUrl = data?.referralCode
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/?ref=${data.referralCode}`
    : null;

  const copyLink = async () => {
    if (!referralUrl) return;
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div role="status" aria-live="polite" className="space-y-4 max-w-2xl mx-auto px-4 py-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
        ))}
        <span className="sr-only">Loading dashboard…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="max-w-2xl mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <main
      aria-label="Referral dashboard"
      className="max-w-2xl mx-auto px-4 py-8 space-y-6"
    >
      <h1 className="text-2xl font-bold text-[var(--foreground)]">Your Referral Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Points", value: data.points.toLocaleString() },
          { label: "Rank", value: `#${data.rank}` },
          { label: "Referrals", value: `${data.successfulReferrals} / ${data.totalReferrals}` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center"
          >
            <p className="text-2xl font-bold text-[var(--primary)]">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Referral link */}
      {referralUrl && (
        <div className="space-y-3">
          <h2 className="font-semibold text-[var(--foreground)]">Your Referral Link</h2>
          <div className="flex gap-2 items-center">
            <input
              readOnly
              value={referralUrl}
              aria-label="Your referral link"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm text-[var(--foreground)] focus:outline-none"
            />
            <button
              onClick={copyLink}
              className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:opacity-90 text-white text-sm font-medium transition-opacity whitespace-nowrap"
              aria-label="Copy referral link to clipboard"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <ShareButtons url={referralUrl} />
        </div>
      )}

      {/* Referred users */}
      <div className="space-y-3">
        <h2 className="font-semibold text-[var(--foreground)]">
          People You&apos;ve Referred ({data.totalReferrals})
        </h2>
        {data.referrals.length === 0 ? (
          <p className="text-gray-500 text-sm">No referrals yet. Share your link to get started!</p>
        ) : (
          <ul className="space-y-2" aria-label="Referred users list">
            {data.referrals.map((r, i) => (
              <li
                key={i}
                className="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <span className="text-sm text-[var(--foreground)]">{r.displayName}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    r.verified
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {r.verified ? "Verified ✓" : "Pending"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
