"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  Area,
} from "recharts";

interface PricePoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface ChartPoint extends PricePoint {
  sma10?: number;
  sma20?: number;
  upperBand?: number;
  lowerBand?: number;
}

const samplePriceData: PricePoint[] = [
  { date: "2024-03-01", open: 103.2, high: 107.3, low: 102.4, close: 105.8, volume: 18200 },
  { date: "2024-03-04", open: 106.0, high: 108.9, low: 104.7, close: 108.2, volume: 21000 },
  { date: "2024-03-05", open: 108.5, high: 110.4, low: 106.9, close: 109.7, volume: 18900 },
  { date: "2024-03-06", open: 109.8, high: 112.1, low: 108.0, close: 111.4, volume: 22000 },
  { date: "2024-03-07", open: 111.6, high: 114.3, low: 110.8, close: 113.9, volume: 24000 },
  { date: "2024-03-08", open: 114.2, high: 116.7, low: 113.5, close: 115.6, volume: 21500 },
  { date: "2024-03-11", open: 115.8, high: 118.4, low: 114.9, close: 117.0, volume: 22500 },
  { date: "2024-03-12", open: 117.2, high: 119.5, low: 116.1, close: 118.9, volume: 20700 },
  { date: "2024-03-13", open: 119.2, high: 120.8, low: 117.6, close: 118.2, volume: 19800 },
  { date: "2024-03-14", open: 118.4, high: 121.1, low: 117.8, close: 120.6, volume: 23200 },
  { date: "2024-03-15", open: 120.8, high: 123.3, low: 120.1, close: 122.4, volume: 24800 },
  { date: "2024-03-18", open: 122.6, high: 125.0, low: 121.9, close: 124.0, volume: 26000 },
  { date: "2024-03-19", open: 124.2, high: 127.1, low: 123.4, close: 126.7, volume: 27000 },
  { date: "2024-03-20", open: 127.0, high: 128.8, low: 125.9, close: 127.6, volume: 25500 },
  { date: "2024-03-21", open: 127.4, high: 129.6, low: 126.2, close: 129.0, volume: 24200 },
  { date: "2024-03-22", open: 129.4, high: 131.9, low: 128.5, close: 131.2, volume: 26300 },
  { date: "2024-03-25", open: 131.8, high: 133.5, low: 130.7, close: 132.4, volume: 27800 },
  { date: "2024-03-26", open: 132.6, high: 134.8, low: 131.5, close: 134.1, volume: 28700 },
  { date: "2024-03-27", open: 134.3, high: 136.2, low: 133.7, close: 135.6, volume: 29600 },
  { date: "2024-03-28", open: 135.8, high: 138.4, low: 135.0, close: 137.9, volume: 30500 },
  { date: "2024-03-29", open: 138.0, high: 140.7, low: 137.1, close: 140.2, volume: 31200 },
  { date: "2024-04-01", open: 140.5, high: 143.2, low: 139.8, close: 142.7, volume: 32800 },
  { date: "2024-04-02", open: 143.0, high: 145.4, low: 142.1, close: 144.9, volume: 33500 },
  { date: "2024-04-03", open: 145.2, high: 147.0, low: 144.3, close: 146.5, volume: 34100 },
  { date: "2024-04-04", open: 146.8, high: 149.1, low: 146.0, close: 148.9, volume: 35200 },
  { date: "2024-04-05", open: 149.2, high: 151.0, low: 148.6, close: 150.8, volume: 36100 },
  { date: "2024-04-08", open: 151.0, high: 153.7, low: 150.5, close: 153.1, volume: 37200 },
  { date: "2024-04-09", open: 153.4, high: 155.8, low: 152.6, close: 154.3, volume: 37800 },
];

function calculateSMA(data: number[], period: number): Array<number | undefined> {
  return data.map((_, index) => {
    if (index < period - 1) return undefined;
    const slice = data.slice(index - period + 1, index + 1);
    const sum = slice.reduce((acc, value) => acc + value, 0);
    return sum / slice.length;
  });
}

function calculateStdDev(data: number[]): number {
  const mean = data.reduce((acc, value) => acc + value, 0) / data.length;
  const variance = data.reduce((acc, value) => acc + (value - mean) ** 2, 0) / data.length;
  return Math.sqrt(variance);
}

function annotateIndicators(data: PricePoint[]): ChartPoint[] {
  const closes = data.map((point) => point.close);
  const sma10 = calculateSMA(closes, 10);
  const sma20 = calculateSMA(closes, 20);

  return data.map((point, index) => {
    const extended = { ...point } as ChartPoint;

    extended.sma10 = sma10[index];
    extended.sma20 = sma20[index];

    if (index >= 19) {
      const window = closes.slice(index - 19, index + 1);
      const middle = sma20[index] as number;
      const deviation = calculateStdDev(window);
      extended.upperBand = middle + deviation * 2;
      extended.lowerBand = middle - deviation * 2;
    }

    return extended;
  });
}

function formatTooltipLabel(value: string): string {
  return `Date: ${value}`;
}

export default function AdvancedChart() {
  const chartData = useMemo(() => annotateIndicators(samplePriceData), []);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-10">
      <div className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-sm dark:border-gray-700 dark:bg-slate-950/80">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Advanced Charting
            </p>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
              Price action with custom indicators
            </h2>
          </div>
          <div className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
            Traders can review price, simple moving averages, and Bollinger Bands in one interactive chart.
          </div>
        </div>

        <div className="h-[440px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 12, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fill: "#475569" }} tickLine={false} axisLine={false} minTickGap={24} />
              <YAxis tick={{ fill: "#475569" }} tickLine={false} axisLine={false} width={60} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: 12,
                  color: "#f8fafc",
                }}
                labelFormatter={formatTooltipLabel}
                formatter={(value: number | string, name: string) => [value, name]}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: 12 }} />
              <Area
                type="monotone"
                dataKey="upperBand"
                stroke="transparent"
                fill="rgba(59, 130, 246, 0.08)"
                activeDot={false}
                dot={false}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="lowerBand"
                stroke="transparent"
                fill="rgba(59, 130, 246, 0.08)"
                activeDot={false}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#0f172a"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5, fill: "#2563eb" }}
                name="Close"
              />
              <Line
                type="monotone"
                dataKey="sma10"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                name="SMA 10"
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="sma20"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="SMA 20"
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="upperBand"
                stroke="#60a5fa"
                strokeDasharray="4 4"
                dot={false}
                name="Upper Band"
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="lowerBand"
                stroke="#60a5fa"
                strokeDasharray="4 4"
                dot={false}
                name="Lower Band"
                isAnimationActive={false}
              />
              <Brush dataKey="date" height={40} stroke="#0f172a" travellerWidth={10} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
