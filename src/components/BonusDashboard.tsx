"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBonuses } from "@/store/bonusSlice";
import BonusChart from "./BonusChart";

export default function BonusDashboard({ userId }: { userId: string }) {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.bonus);

  useEffect(() => {
    if (userId) {
      dispatch(fetchBonuses(userId));
    }
  }, [dispatch, userId]);

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto p-6 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 w-1/4 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg border border-red-200 dark:border-red-800">
          {error}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trading Bonuses</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your rewards for active trading and milestones.
          </p>
        </div>
        <div className="bg-amber-100 dark:bg-amber-900/30 px-4 py-2 rounded-full border border-amber-200 dark:border-amber-800">
          <span className="text-amber-700 dark:text-amber-400 font-semibold">
            {data.totalBonuses.toLocaleString()} Total Points
          </span>
        </div>
      </header>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Available Balance</p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
            {data.totalBonuses.toLocaleString()}
          </p>
          <div className="mt-4 flex items-center text-green-500 text-sm font-medium">
            <span>+12.5% vs last week</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Active Bonuses</p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
            {data.history.filter(h => h.delta > 0).length}
          </p>
          <p className="mt-4 text-sm text-gray-500">Across all trading pairs</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Next Tier Progress</p>
          <div className="mt-4 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="mt-2 text-xs text-gray-500 text-right">350 pts to Gold Tier</p>
        </div>
      </div>

      {/* Chart Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Bonus Accumulation Over Time</h2>
        <BonusChart history={data.history} />
      </section>

      {/* Bonus Calculator Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Bonus Calculator</h2>
        <BonusCalculator />
      </section>

      {/* History Breakdown */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Earnings History</h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {data.history.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 capitalize">
                      {item.action.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {item.reason}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-right text-gray-900 dark:text-white">
                    <span className={item.delta > 0 ? "text-green-500" : "text-red-500"}>
                      {item.delta > 0 ? "+" : ""}{item.delta.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
              {data.history.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No bonus history found. Start trading to earn rewards!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// Bonus Calculator Component
function BonusCalculator() {
  const [tradingVolume, setTradingVolume] = useState<number>(10000);
  const [monthlyVolume, setMonthlyVolume] = useState<number>(50000);

  // Bonus rate tiers based on monthly trading volume
  const getBonusRate = (monthlyVol: number): number => {
    if (monthlyVol >= 1000000) return 0.005; // 0.5% for >$1M
    if (monthlyVol >= 500000) return 0.004;  // 0.4% for >$500K
    if (monthlyVol >= 100000) return 0.003;  // 0.3% for >$100K
    if (monthlyVol >= 50000) return 0.002;   // 0.2% for >$50K
    return 0.001;                            // 0.1% base rate
  };

  const currentRate = getBonusRate(monthlyVolume);
  const estimatedBonus = tradingVolume * currentRate;
  const monthlyEstimatedBonus = monthlyVolume * currentRate;

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getTierLabel = (rate: number): string => {
    switch (rate) {
      case 0.005: return "Elite Tier (0.5%)";
      case 0.004: return "Platinum Tier (0.4%)";
      case 0.003: return "Gold Tier (0.3%)";
      case 0.002: return "Silver Tier (0.2%)";
      default: return "Bronze Tier (0.1%)";
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Single Trade Volume
            </span>
            <div className="mt-2">
              <input
                type="range"
                min="1000"
                max="1000000"
                step="1000"
                value={tradingVolume}
                onChange={(e) => setTradingVolume(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">$1K</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(tradingVolume)}
                </span>
                <span className="text-xs text-gray-500">$1M</span>
              </div>
            </div>
          </label>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Monthly Trading Volume
            </span>
            <div className="mt-2">
              <input
                type="range"
                min="1000"
                max="2000000"
                step="5000"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">$1K</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(monthlyVolume)}
                </span>
                <span className="text-xs text-gray-500">$2M</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-700 dark:text-amber-400 font-medium uppercase tracking-wider">Current Tier</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {getTierLabel(currentRate)}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {(currentRate * 100).toFixed(1)}% rebate on all trades
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-700 dark:text-green-400 font-medium uppercase tracking-wider">Per-Trade Bonus</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {formatCurrency(estimatedBonus)}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Earned on this single trade
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-400 font-medium uppercase tracking-wider">Monthly Projection</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {formatCurrency(monthlyEstimatedBonus)}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Estimated monthly earnings
          </p>
        </div>
      </div>

      {/* Tier Comparison */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Volume Tiers & Rates</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-4 text-left text-gray-600 dark:text-gray-400">Tier</th>
                <th className="py-3 px-4 text-left text-gray-600 dark:text-gray-400">Monthly Volume Requirement</th>
                <th className="py-3 px-4 text-left text-gray-600 dark:text-gray-400">Bonus Rate</th>
                <th className="py-3 px-4 text-left text-gray-600 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {[
                { tier: "Bronze", minVolume: 0, rate: 0.001 },
                { tier: "Silver", minVolume: 50000, rate: 0.002 },
                { tier: "Gold", minVolume: 100000, rate: 0.003 },
                { tier: "Platinum", minVolume: 500000, rate: 0.004 },
                { tier: "Elite", minVolume: 1000000, rate: 0.005 },
              ].map((tier) => {
                const isCurrentTier = getBonusRate(monthlyVolume) === tier.rate;
                const hasQualified = monthlyVolume >= tier.minVolume;
                return (
                  <tr key={tier.tier} className={isCurrentTier ? "bg-amber-50 dark:bg-amber-900/10" : ""}>
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{tier.tier}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {tier.minVolume === 0 ? "Any volume" : formatCurrency(tier.minVolume) + "+"}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{(tier.rate * 100).toFixed(1)}%</td>
                    <td className="py-3 px-4">
                      {isCurrentTier ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                          Current
                        </span>
                      ) : hasQualified ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Qualified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400">
                          {formatCurrency(tier.minVolume - monthlyVolume)} to unlock
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}