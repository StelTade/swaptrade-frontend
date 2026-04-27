"use client";

import { useEffect, useState, useCallback } from "react";
import { useI18n } from "@/i18n/context";

interface LeaderboardEntry {
  rank: number;
  displayName: string;
  points: number;
  successfulReferrals: number;
}

const REFRESH_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

function anonymize(userId: string): string {
  return `User${userId.slice(-4).toUpperCase()}`;
}

const MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useI18n();

  const fetchLeaderboard = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch("/api/leaderboard?limit=10");
      if (!res.ok) throw new Error("Failed to load leaderboard");
      const data = await res.json();
      const ranked: LeaderboardEntry[] = data.leaderboard.map(
        (
          item: { userId: string; points: number; successfulReferrals: number },
          idx: number
        ) => ({
          rank: idx + 1,
          displayName: anonymize(item.userId),
          points: item.points,
          successfulReferrals: item.successfulReferrals,
        })
      );
      setEntries(ranked);
    } catch {
      setError(t("leaderboard.error"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  return (
    <section
      aria-label="Referral leaderboard"
      className="w-full max-w-2xl mx-auto px-4 py-8"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-[var(--foreground)]">
        {t("leaderboard.title")}
      </h2>

      {loading && (
        <div role="status" aria-live="polite" className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
          ))}
          <span className="sr-only">{t("leaderboard.loading")}</span>
        </div>
      )}

      {error && (
        <p role="alert" className="text-center text-red-500 py-4">{error}</p>
      )}

      {!loading && !error && entries.length === 0 && (
        <p className="text-center text-gray-500 py-4">{t("leaderboard.empty")}</p>
      )}

      {!loading && !error && entries.length > 0 && (
        <ol className="space-y-2" aria-label="Leaderboard rankings">
          {entries.map((entry) => (
            <li
              key={entry.rank}
              className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-colors
                ${entry.rank === 1 ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20" : ""}
                ${entry.rank === 2 ? "border-gray-400 bg-gray-50 dark:bg-gray-800/40" : ""}
                ${entry.rank === 3 ? "border-orange-400 bg-orange-50 dark:bg-orange-900/20" : ""}
                ${entry.rank > 3 ? "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/20" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 text-center font-bold text-lg" aria-label={`Rank ${entry.rank}`}>
                  {MEDAL[entry.rank] ?? `#${entry.rank}`}
                </span>
                <span className="font-medium text-[var(--foreground)]">
                  {entry.displayName}
                </span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[var(--primary)]">
                  {t("leaderboard.points", { points: entry.points.toLocaleString() })}
                </span>
                <span className="block text-xs text-gray-500">
                  {entry.successfulReferrals} {entry.successfulReferrals !== 1 ? t("leaderboard.referrals") : t("leaderboard.referral")}
                </span>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
