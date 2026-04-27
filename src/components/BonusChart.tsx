"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BonusAdjustment {
  delta: number;
  createdAt: number;
}

interface BonusChartProps {
  history: BonusAdjustment[];
}

export default function BonusChart({ history }: BonusChartProps) {
  // Sort history by date ascending for the chart
  const sortedHistory = [...history].sort((a, b) => a.createdAt - b.createdAt);

  // Generate data points for cumulative sum
  let cumulative = 0;
  const data = sortedHistory.map((adj) => {
    cumulative += adj.delta;
    return {
      date: new Date(adj.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      bonus: cumulative,
    };
  });

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorBonus" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }} 
            tickLine={false} 
            axisLine={false} 
            stroke="#9ca3af"
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            tickLine={false} 
            axisLine={false} 
            stroke="#9ca3af"
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px', 
              border: 'none', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
            }} 
          />
          <Area
            type="monotone"
            dataKey="bonus"
            stroke="#f59e0b"
            fillOpacity={1}
            fill="url(#colorBonus)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
