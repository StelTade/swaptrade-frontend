'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import ReferralLink from '@/components/referral/ReferralLink';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import { fetchDashboard, trackShare } from '@/store/referralSlice';

type LeaderboardItem = {
  displayName: string;
  referrals: number;
  rank: number;
};

function maskName(name: string) {
  if (!name) return 'Anonymous';
  // show first char and a short suffix, keep anonymous feel
  return `${name.charAt(0)}***#${(Math.abs(hashCode(name)) % 9000) + 1000}`;
}

function hashCode(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return h | 0;
}

export default function ReferralProgram({ userId, isPremium }: { userId: string; isPremium?: boolean }) {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((s) => s.referral);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [notifiedMilestones, setNotifiedMilestones] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!userId) return;
    dispatch(fetchDashboard(userId));

    let mounted = true;

    // fetch leaderboard snapshot
    fetch('/api/referrals/leaderboard')
      .then((r) => r.ok ? r.json() : Promise.reject('Failed'))
      .then((json) => {
        if (!mounted) return;
        setLeaderboard(json.leaderboard || []);
      })
      .catch(() => {
        // ignore — leaderboard optional
      });

    // try real-time updates via EventSource
    let es: EventSource | null = null;
    try {
      es = new EventSource('/api/referrals/leaderboard/stream');
      es.onmessage = (ev) => {
        try {
          const parsed = JSON.parse(ev.data);
          if (Array.isArray(parsed)) setLeaderboard(parsed as LeaderboardItem[]);
        } catch (err) {
          // ignore
        }
      };
      es.onerror = () => setStreamError('Leaderboard realtime connection failed');
    } catch (err) {
      // EventSource not available or not supported
    }

    return () => {
      mounted = false;
      if (es) es.close();
    };
  }, [dispatch, userId]);

  // computed values
  const referralUrl = useMemo(() => {
    if (!data?.referralCode) return null;
    if (typeof window === 'undefined') return `/?ref=${data.referralCode}`;
    return `${window.location.origin}/?ref=${data.referralCode}`;
  }, [data?.referralCode]);

  const advancementPerReferral = isPremium ? 2 : 1;
  const totalAdvancement = (data?.successfulReferrals || 0) * advancementPerReferral;

  // send milestone notification request when hit 5 referrals (free premium month)
  useEffect(() => {
    if (!userId || !data) return;
    const count = data.successfulReferrals || 0;
    const milestones = [5];
    milestones.forEach((m) => {
      if (count >= m && !notifiedMilestones[m]) {
        // request backend to send email/notification for milestone
        fetch(`/api/users/${userId}/notify-milestone`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ milestone: m, referrals: count }),
        }).catch(() => {});
        setNotifiedMilestones((p) => ({ ...p, [m]: true }));
      }
    });
  }, [data, userId, notifiedMilestones]);

  const handleShare = async (channel: string) => {
    if (!data?.referralCode) return;
    dispatch(trackShare({ userId, referralCode: data.referralCode, shareChannel: channel as any } as any));
  };

  if (!data) return null;

  return (
    <section aria-label="Referral program" className="space-y-6 max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold">Invite friends — move up the waitlist</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          {data.referralCode && <ReferralLink referralCode={data.referralCode} />}

          <div className="mt-4 space-y-2 p-4 rounded-lg border border-gray-200 bg-gray-50">
            <p className="text-sm">Referrals: <strong>{data.successfulReferrals}</strong></p>
            <p className="text-sm">Waitlist advancement: <strong>{totalAdvancement} positions</strong></p>
            <p className="text-sm">Per-referral credit: <strong>{advancementPerReferral}</strong></p>
            <p className="text-sm">Free premium month at <strong>5</strong> referrals.</p>
          </div>

          {/* sharing buttons */}
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Share</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { handleShare('twitter'); window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Join me on SwapTrade — a crypto trading simulator!')}&url=${encodeURIComponent(referralUrl || '')}`,'_blank'); }}
                className="px-3 py-2 rounded bg-sky-500 text-white text-sm"
              >Twitter / X</button>

              <button
                onClick={() => { handleShare('telegram'); window.open(`https://t.me/share/url?url=${encodeURIComponent(referralUrl || '')}&text=${encodeURIComponent('Join SwapTrade — risk-free crypto trading simulator!')}`,'_blank'); }}
                className="px-3 py-2 rounded bg-blue-400 text-white text-sm"
              >Telegram</button>

              <button
                onClick={() => { handleShare('discord'); window.open('https://discord.com/channels/@me','_blank'); }}
                className="px-3 py-2 rounded bg-violet-600 text-white text-sm"
              >Discord</button>

              <button
                onClick={() => { handleShare('email'); window.location.href = `mailto:?subject=${encodeURIComponent('Join SwapTrade')}&body=${encodeURIComponent(`Join SwapTrade — sign up with my referral link: ${referralUrl}`)}`; }}
                className="px-3 py-2 rounded bg-gray-700 text-white text-sm"
              >Email</button>

              <button
                onClick={() => { handleShare('copy'); navigator.clipboard.writeText(referralUrl || ''); }}
                className="px-3 py-2 rounded bg-gray-300 text-black text-sm"
              >Copy Link</button>
            </div>
          </div>
        </div>

        <div>
          <div className="p-4 rounded-lg border border-gray-200 bg-white space-y-3">
            <h3 className="text-lg font-medium">Leaderboard</h3>
            {streamError && <p className="text-xs text-red-500">{streamError}</p>}
            <ol className="space-y-2">
              {leaderboard.slice(0, 10).map((it) => (
                <li key={it.rank} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">#{it.rank}</span>
                    <span className="ml-2 text-sm text-gray-600">{maskName(it.displayName)}</span>
                  </div>
                  <div className="text-sm font-semibold">{it.referrals}</div>
                </li>
              ))}
            </ol>

            <div className="mt-3 text-xs text-gray-500">
              Top referrers receive exclusive rewards. Your progress updates in near real-time.
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg border border-gray-200 bg-gray-50">
            <p className="text-sm">Exclusive milestones</p>
            <ul className="text-sm list-disc ml-5 mt-2 space-y-1">
              <li>Move up <strong>1</strong> position per referral (<strong>2</strong> if Premium).</li>
              <li>Free Premium month at <strong>5</strong> successful referrals.</li>
              <li>Top referrers get early access and exclusive badges.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* QR preview */}
      {referralUrl && (
        <div className="flex items-center gap-4">
          <QRCodeDisplay url={referralUrl} referralCode={data.referralCode || ''} size={120} onDownload={() => handleShare('qr')} />
          <div className="text-sm text-gray-600">Scan to join using your referral link.</div>
        </div>
      )}
    </section>
  );
}
