'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_SPOTS = 500;
const LOW_SPOT_THRESHOLD = 0.1; // 10% = 50 spots
const POLL_INTERVAL_MS = 2000;
const SOCIAL_PROOF_REFRESH_MS = 15 * 60 * 1000;

type SpotStats = {
  spotsAvailable: number;
  spotsTotal: number;
  priceIncreasesAt: number;
  serverTime: number;
  recentSignups: number;
};

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function useAnimatedNumber(value: number) {
  const [display, setDisplay] = useState(value);
  const [flash, setFlash] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (value === prev.current) return;
    prev.current = value;
    setFlash(true);
    setDisplay(value);
    const t = setTimeout(() => setFlash(false), 600);
    return () => clearTimeout(t);
  }, [value]);

  return { display, flash };
}

function Countdown({ endsAt, serverTime }: { endsAt: number; serverTime: number }) {
  // Offset between server clock and local clock so the countdown is tamper-resistant
  const clockOffset = useRef(serverTime - Date.now());
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, endsAt - (Date.now() + clockOffset.current))
  );

  useEffect(() => {
    const tick = () =>
      setRemaining(Math.max(0, endsAt - (Date.now() + clockOffset.current)));
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const mins = Math.floor((remaining % 3_600_000) / 60_000);
  const secs = Math.floor((remaining % 60_000) / 1_000);

  const parts = days > 0
    ? [{ label: 'days', value: days }, { label: 'hrs', value: hours }, { label: 'min', value: mins }, { label: 'sec', value: secs }]
    : [{ label: 'hrs', value: hours }, { label: 'min', value: mins }, { label: 'sec', value: secs }];

  return (
    <div className="flex items-center gap-2 justify-center flex-wrap">
      {parts.map(({ label, value }, i) => (
        <span key={label} className="flex items-center gap-1">
          {i > 0 && <span className="text-orange-400 font-bold">:</span>}
          <span className="inline-flex flex-col items-center">
            <span className="font-mono text-2xl font-black text-white tabular-nums w-10 text-center">
              {pad(value)}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">{label}</span>
          </span>
        </span>
      ))}
    </div>
  );
}

export default function PremiumCountdown() {
  const [stats, setStats] = useState<SpotStats | null>(null);
  const [error, setError] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/waitlist/spots', { cache: 'no-store' });
      if (!res.ok) throw new Error('fetch');
      const data = (await res.json()) as SpotStats;
      setStats(data);
      setError(false);
    } catch {
      setError(true);
    }
  };

  // Initial fetch + polling for spot count (every 2 s)
  useEffect(() => {
    fetchStats();
    const poll = setInterval(fetchStats, POLL_INTERVAL_MS);
    return () => clearInterval(poll);
  }, []);

  // Social proof refreshes every 15 min — we just re-use the main poll, 
  // but the server only counts signups in the last hour so this is naturally fresh.
  useEffect(() => {
    const id = setInterval(fetchStats, SOCIAL_PROOF_REFRESH_MS);
    return () => clearInterval(id);
  }, []);

  const spotsAvailable = stats?.spotsAvailable ?? TOTAL_SPOTS;
  const isLow = spotsAvailable / (stats?.spotsTotal ?? TOTAL_SPOTS) < LOW_SPOT_THRESHOLD;
  const isSoldOut = spotsAvailable === 0;

  const { display: displayedSpots, flash } = useAnimatedNumber(spotsAvailable);

  const urgencyColor = isSoldOut
    ? 'text-red-400'
    : isLow
    ? 'text-orange-400'
    : 'text-amber-300';

  const urgencyBorder = isSoldOut
    ? 'border-red-500/50'
    : isLow
    ? 'border-orange-500/50'
    : 'border-amber-500/30';

  const urgencyBg = isSoldOut
    ? 'from-red-900/30 to-red-800/20'
    : isLow
    ? 'from-orange-900/30 to-orange-800/20'
    : 'from-amber-900/20 to-slate-800/20';

  if (error && !stats) return null;

  return (
    <div
      className={`rounded-2xl border ${urgencyBorder} bg-gradient-to-br ${urgencyBg} p-6 space-y-5 w-full max-w-sm mx-auto`}
      role="region"
      aria-label="Premium spot availability"
    >
      {/* Spots remaining */}
      <div className="text-center space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Founding spots remaining
        </p>
        <div className="flex items-baseline justify-center gap-2">
          <span
            className={`font-black text-5xl tabular-nums transition-all duration-300 ${urgencyColor} ${
              flash ? 'scale-110' : 'scale-100'
            }`}
          >
            {isSoldOut ? '0' : displayedSpots.toLocaleString()}
          </span>
          <span className="text-slate-400 text-sm">/ {(stats?.spotsTotal ?? TOTAL_SPOTS).toLocaleString()}</span>
        </div>

        {isSoldOut ? (
          <p className="text-red-400 text-sm font-semibold animate-pulse">
            🔴 All spots taken
          </p>
        ) : isLow ? (
          <p className="text-orange-400 text-sm font-semibold animate-pulse">
            ⚠️ Almost gone — act now
          </p>
        ) : null}
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            isSoldOut
              ? 'bg-red-500'
              : isLow
              ? 'bg-gradient-to-r from-orange-500 to-red-500'
              : 'bg-gradient-to-r from-amber-400 to-orange-500'
          }`}
          style={{
            width: `${Math.min(
              100,
              (((stats?.spotsTotal ?? TOTAL_SPOTS) - spotsAvailable) /
                (stats?.spotsTotal ?? TOTAL_SPOTS)) *
                100
            )}%`,
          }}
        />
      </div>

      {/* Countdown */}
      {stats && !isSoldOut && (
        <div className="text-center space-y-1 border-t border-slate-700/60 pt-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Launch price increases in
          </p>
          <Countdown endsAt={stats.priceIncreasesAt} serverTime={stats.serverTime} />
        </div>
      )}

      {/* Social proof */}
      {stats && stats.recentSignups > 0 && !isSoldOut && (
        <p className="text-center text-xs text-slate-400">
          🔥{' '}
          <span className="text-amber-300 font-semibold">
            {stats.recentSignups}
          </span>{' '}
          {stats.recentSignups === 1 ? 'spot' : 'spots'} taken in the last hour
        </p>
      )}
    </div>
  );
}
