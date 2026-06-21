"use client";

import React, { useEffect, useState, useRef } from 'react';

type Coin = {
  id: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number | null;
};

const CACHE_KEY = 'marketTicker:data:v1';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export default function MarketTickerTape() {
  const [coins, setCoins] = useState<Coin[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  async function fetchData() {
    try {
      setError(null);
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&price_change_percentage=24h',
        { cache: 'no-store' }
      );
      if (!res.ok) throw new Error('Failed to fetch market data');
      const data = (await res.json()) as any[];
      const parsed: Coin[] = data.map((d) => ({
        id: d.id,
        symbol: (d.symbol || '').toUpperCase(),
        current_price: d.current_price ?? 0,
        price_change_percentage_24h: d.price_change_percentage_24h ?? null,
      }));
      if (!mountedRef.current) return;
      setCoins(parsed);
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ ts: Date.now(), data: parsed })
        );
      } catch {}
    } catch (e) {
      if (!mountedRef.current) return;
      setError('Market data unavailable');
      // Try to load cached data if available
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.data) setCoins(parsed.data as Coin[]);
        }
      } catch {}
    }
  }

  useEffect(() => {
    // Load from cache if fresh
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.ts && Date.now() - parsed.ts < CACHE_TTL && parsed?.data) {
          setCoins(parsed.data as Coin[]);
        }
      }
    } catch {}

    fetchData();
    const iv = setInterval(fetchData, CACHE_TTL); // refresh every 5 minutes
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = coins && coins.length ? coins : [];

  const formatPrice = (p: number) => {
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: p >= 1 ? 2 : 6,
      }).format(p);
    } catch {
      return `$${p.toFixed(2)}`;
    }
  };

  return (
    <div className="fixed left-0 right-0 bottom-0 z-50 pointer-events-auto">
      <div className="w-full bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 border-t border-slate-700 py-2">
        <div className="max-w-7xl mx-auto px-4">
          {error && !items.length ? (
            <div className="text-center text-sm text-red-400">{error}</div>
          ) : (
            <div
              className="overflow-hidden"
              aria-live="polite"
            >
              <div
                className="ticker-track flex gap-6 items-center whitespace-nowrap"
                style={{ alignItems: 'center' }}
              >
                {/* duplicate items for smooth infinite scroll */}
                <div className="ticker-group flex gap-6 items-center">
                  {items.map((c) => (
                    <div
                      key={`a-${c.id}`}
                      className="ticker-item flex items-center space-x-3 text-white/90 text-sm sm:text-base"
                      title={`${c.symbol} ${c.current_price}`}
                    >
                      <span className="font-semibold tracking-wide w-12 sm:w-16">{c.symbol}</span>
                      <span className="hidden sm:inline-block">{formatPrice(c.current_price)}</span>
                      <span
                        className={`ml-2 ${
                          (c.price_change_percentage_24h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'
                        } font-medium`}
                      >
                        {(c.price_change_percentage_24h ?? 0) >= 0 ? '+' : ''}
                        {c.price_change_percentage_24h !== null
                          ? `${(c.price_change_percentage_24h).toFixed(2)}%`
                          : '—'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="ticker-group flex gap-6 items-center">
                  {items.map((c) => (
                    <div
                      key={`b-${c.id}`}
                      className="ticker-item flex items-center space-x-3 text-white/90 text-sm sm:text-base"
                      title={`${c.symbol} ${c.current_price}`}
                    >
                      <span className="font-semibold tracking-wide w-12 sm:w-16">{c.symbol}</span>
                      <span className="hidden sm:inline-block">{formatPrice(c.current_price)}</span>
                      <span
                        className={`ml-2 ${
                          (c.price_change_percentage_24h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'
                        } font-medium`}
                      >
                        {(c.price_change_percentage_24h ?? 0) >= 0 ? '+' : ''}
                        {c.price_change_percentage_24h !== null
                          ? `${(c.price_change_percentage_24h).toFixed(2)}%`
                          : '—'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .ticker-track {
          display: flex;
          gap: 6rem;
          will-change: transform;
          animation: tickerScroll 28s linear infinite;
        }

        .ticker-group {
          display: flex;
          align-items: center;
        }

        .ticker-item { 
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 640px) {
          .ticker-track { animation-duration: 20s; }
        }

      `}</style>
    </div>
  );
}
