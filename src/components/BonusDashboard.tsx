"use client";

import React, { useEffect } from "react";
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
