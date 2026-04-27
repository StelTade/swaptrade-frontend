"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDashboard, trackShare, fetchShareAnalytics, type ShareChannel } from "@/store/referralSlice";
import QRCodeDisplay from "./QRCodeDisplay";

function ShareButtons({ 
  url, 
  onShare 
}: { 
  url: string;
  onShare: (channel: ShareChannel) => Promise<void>;
}) {
  const [trackingChannels, setTrackingChannels] = useState<Set<ShareChannel>>(new Set());
  
  const text = encodeURIComponent("Join SwapTrade — the risk-free crypto trading simulator!");
  
  const handleShareClick = async (channel: ShareChannel, href: string) => {
    setTrackingChannels((prev) => new Set(prev).add(channel));
    try {
      await onShare(channel);
    } finally {
      setTrackingChannels((prev) => {
        const next = new Set(prev);
        next.delete(channel);
        return next;
      });
    }
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const shareOptions = [
    {
      channel: 'twitter' as ShareChannel,
      label: 'Twitter / X',
      bgColor: 'bg-sky-500 hover:bg-sky-600',
      href: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
    },
    {
      channel: 'facebook' as ShareChannel,
      label: 'Facebook',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      channel: 'whatsapp' as ShareChannel,
      label: 'WhatsApp',
      bgColor: 'bg-green-500 hover:bg-green-600',
      href: `https://wa.me/?text=${text}%20${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="flex gap-3 flex-wrap">
      {shareOptions.map(({ channel, label, bgColor, href }) => (
        <button
          key={channel}
          onClick={() => handleShareClick(channel, href)}
          disabled={trackingChannels.has(channel)}
          className={`px-4 py-2 rounded-lg ${bgColor} text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label={`Share on ${label}`}
        >
          {trackingChannels.has(channel) ? '...' : label}
        </button>
      ))}
    </div>
  );
}

export default function ReferralDashboard({ userId }: { userId: string }) {
  const dispatch = useAppDispatch();
  const { data, loading, error, analytics } = useAppSelector((state) => state.referral);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboard(userId));
    dispatch(fetchShareAnalytics(userId));
  }, [dispatch, userId]);

  const referralUrl = data?.referralCode
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/?ref=${data.referralCode}`
    : null;

  const copyLink = async () => {
    if (!referralUrl) return;
    await navigator.clipboard.writeText(referralUrl);
    
    // Track copy action
    if (data?.referralCode) {
      dispatch(trackShare({
        userId,
        referralCode: data.referralCode,
        shareChannel: 'copy',
      }));
    }
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async (channel: ShareChannel) => {
    if (data?.referralCode) {
      dispatch(trackShare({
        userId,
        referralCode: data.referralCode,
        shareChannel: channel,
      }));
    }
  };

  if (loading) {
    return (
      <div role="status" aria-live="polite" className="space-y-4 max-w-4xl mx-auto px-4 py-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
        ))}
        <span className="sr-only">Loading dashboard…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="max-w-4xl mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <main
      aria-label="Referral dashboard"
      className="max-w-4xl mx-auto px-4 py-8 space-y-6"
    >
      <h1 className="text-3xl font-bold text-[var(--foreground)]">Your Referral Dashboard</h1>

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

      {/* Main sharing section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: Link and buttons */}
        {referralUrl && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Share Your Referral Link</h2>
            
            {/* Copy link section */}
            <div className="space-y-3">
              <label className="text-sm text-gray-600 dark:text-gray-400">Link</label>
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
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Social share buttons */}
            <div className="space-y-3">
              <label className="text-sm text-gray-600 dark:text-gray-400">Social Sharing</label>
              <ShareButtons 
                url={referralUrl}
                onShare={handleShare}
              />
            </div>

            {/* Share analytics */}
            {analytics && analytics.totalShares > 0 && (
              <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-[var(--foreground)] mb-2">
                  Total Shares: <span className="text-[var(--primary)]">{analytics.totalShares}</span>
                </p>
                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  {Object.entries(analytics.sharesByChannel).map(([channel, count]) => (
                    <div key={channel} className="flex justify-between">
                      <span className="capitalize">{channel}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Right column: QR Code */}
        {referralUrl && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">QR Code</h2>
              <button
                onClick={() => setShowQR(!showQR)}
                className="text-sm text-[var(--primary)] hover:underline"
              >
                {showQR ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showQR && (
              <div className="flex justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <QRCodeDisplay
                  url={referralUrl}
                  referralCode={data.referralCode}
                  size={220}
                  onDownload={() => handleShare('qr')}
                />
              </div>
            )}
            
            {!showQR && (
              <div className="flex items-center justify-center h-48 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                  Click &quot;Show&quot; to display QR code
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Referred users */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
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
