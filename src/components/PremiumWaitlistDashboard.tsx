'use client';

import { useEffect, useState } from 'react';

interface WaitlistStats {
  totalSignups: number;
  todaySignups: number;
  weekSignups: number;
  averagePositionWait: number;
  estimatedConversionRate: number;
}

interface ConversionMetrics {
  totalWaitlist: number;
  conversionPotential: number;
  conversionTarget: number;
  conversionRate: number;
  estimatedRevenue: number;
}

interface GrowthMetrics {
  past7Days: number[];
  averagePerDay: number;
  trend: 'up' | 'down' | 'stable';
  projectedMonthly: number;
}

interface CapacityInfo {
  capacity: number;
  filled: number;
  remaining: number;
  percentageFilled: number;
  isFull: boolean;
}

interface AnalyticsData {
  stats: WaitlistStats;
  conversion: ConversionMetrics;
  growth: GrowthMetrics;
  capacity: CapacityInfo;
  recentSignups: Array<{
    position: number;
    email: string;
    name: string | null;
    signupDate: number;
  }>;
}

export default function PremiumWaitlistDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/premium-stats');
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load analytics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Auto-refresh every 30 seconds if enabled
    if (autoRefresh) {
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="mt-4 text-gray-600">Loading analytics...</p>
      </div>
    );
  }

  if (error || !data) {
    return <div className="p-8 text-red-600">{error || 'No data available'}</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Premium Waitlist Analytics</h1>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-600">Auto-refresh</span>
        </label>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-semibold">TOTAL SIGNUPS</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{data.stats.totalSignups}</p>
          <p className="text-xs text-green-600 mt-2">
            ↑ {data.stats.todaySignups} today
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
          <p className="text-gray-600 text-sm font-semibold">CAPACITY</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {data.capacity.percentageFilled.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600 mt-2">
            {data.capacity.filled} / {data.capacity.capacity}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-semibold">POTENTIAL REVENUE</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ${(data.conversion.estimatedRevenue / 1000).toFixed(0)}k
          </p>
          <p className="text-xs text-gray-600 mt-2">
            First year projection
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm font-semibold">7-DAY TREND</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {data.growth.averagePerDay}
            <span className="text-sm">/day</span>
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Trend: {data.growth.trend === 'up' ? '📈' : '📉'} {data.growth.trend}
          </p>
        </div>
      </div>

      {/* Capacity Bar */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Capacity Status</h2>
        <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full flex items-center justify-end pr-3 transition-all duration-300"
            style={{ width: `${data.capacity.percentageFilled}%` }}
          >
            <span className="text-white font-bold text-sm">
              {Math.round(data.capacity.percentageFilled)}%
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{data.capacity.filled} filled</span>
          <span>{data.capacity.remaining} remaining</span>
        </div>
      </div>

      {/* Growth Chart (Simple) */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">7-Day Signup Trend</h2>
        <div className="flex items-end justify-between h-48 gap-2">
          {data.growth.past7Days.map((count, idx) => {
            const max = Math.max(...data.growth.past7Days, 1);
            const height = (count / max) * 100;
            return (
              <div
                key={idx}
                className="flex-1 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer relative group"
                style={{ height: `${height}%`, minHeight: '2px' }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap hidden group-hover:block">
                  {count} signups
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-4 text-xs text-gray-600">
          <span>7 days ago</span>
          <span>Today</span>
        </div>
      </div>

      {/* Conversion Metrics */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversion Potential</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Expected Conversions:</span>
              <span className="font-bold">{data.conversion.conversionPotential}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Conversion Rate:</span>
              <span className="font-bold">
                {(data.stats.estimatedConversionRate * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly ARPU:</span>
              <span className="font-bold">$9.99</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Projections</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Signups (Projected):</span>
              <span className="font-bold">{data.growth.projectedMonthly}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Months to Full Capacity:</span>
              <span className="font-bold">
                {data.stats.todaySignups > 0
                  ? Math.ceil(data.capacity.remaining / (data.stats.todaySignups * 30))
                  : '∞'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">First Year MRR (at 35% conversion):</span>
              <span className="font-bold">
                ${(data.conversion.estimatedRevenue / 12 / 1000).toFixed(1)}k
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Signups */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Signups</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-900">Position</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-900">Name</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-900">Email</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-900">Signup Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.recentSignups.map((signup) => (
                <tr key={signup.position} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-semibold text-blue-600">
                    #{signup.position}
                  </td>
                  <td className="px-4 py-2 text-gray-900">{signup.name || '—'}</td>
                  <td className="px-4 py-2 text-gray-600 truncate">{signup.email}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {new Date(signup.signupDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
