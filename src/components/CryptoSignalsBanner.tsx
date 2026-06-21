"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

interface Signal {
  id: string;
  asset: string;
  pair: string;
  coinGeckoId: string;
  direction: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  analysis: string;
  sparklineData: { value: number }[];
  currentPrice?: number;
  priceChange24h?: number;
}

const initialSignals: Omit<Signal, 'currentPrice' | 'priceChange24h'>[] = [
  {
    id: 'btc-usdt-1',
    asset: 'BTC',
    pair: 'BTC/USDT',
    coinGeckoId: 'bitcoin',
    direction: 'bullish',
    confidence: 87,
    analysis: 'Strong support at $67k with increasing institutional accumulation. RSI showing bullish divergence.',
    sparklineData: Array.from({ length: 24 }, (_, i) => ({ value: 65000 + Math.random() * 5000 }))
  },
  {
    id: 'eth-usdt-1',
    asset: 'ETH',
    pair: 'ETH/USDT',
    coinGeckoId: 'ethereum',
    direction: 'bearish',
    confidence: 72,
    analysis: 'Approaching key resistance level at $3,500. Watch for rejection if volume fails to sustain.',
    sparklineData: Array.from({ length: 24 }, (_, i) => ({ value: 3200 + Math.random() * 300 }))
  },
  {
    id: 'sol-usdt-1',
    asset: 'SOL',
    pair: 'SOL/USDT',
    coinGeckoId: 'solana',
    direction: 'bullish',
    confidence: 91,
    analysis: 'Network activity surging with new DeFi protocols launching. Strong technical breakout confirmed.',
    sparklineData: Array.from({ length: 24 }, (_, i) => ({ value: 140 + Math.random() * 20 }))
  },
  {
    id: 'ada-usdt-1',
    asset: 'ADA',
    pair: 'ADA/USDT',
    coinGeckoId: 'cardano',
    direction: 'neutral',
    confidence: 55,
    analysis: 'Consolidating in a tight range. Wait for breakout confirmation before entering position.',
    sparklineData: Array.from({ length: 24 }, (_, i) => ({ value: 0.45 + Math.random() * 0.05 }))
  }
];

const STORAGE_KEY = 'swaptrade_crypto_signals_banner_closed';

export default function CryptoSignalsBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [signals, setSignals] = useState<Signal[]>(initialSignals as Signal[]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFading, setIsFading] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') {
      setIsVisible(false);
    }
  }, []);

  // Fetch real prices from CoinGecko
  const fetchPrices = useCallback(async () => {
    try {
      const coinIds = initialSignals.map(s => s.coinGeckoId).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`,
        { next: { revalidate: 300 } } // Cache for 5 minutes
      );
      
      if (!response.ok) throw new Error('Failed to fetch prices');
      
      const data = await response.json();
      
      setSignals(prev => prev.map(signal => {
        const coinData = data[signal.coinGeckoId];
        if (coinData) {
          return {
            ...signal,
            currentPrice: coinData.usd,
            priceChange24h: coinData.usd_24h_change
          };
        }
        return signal;
      }));
      
      setHasError(false);
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    // Refresh prices every 5 minutes
    const priceInterval = setInterval(fetchPrices, 5 * 60 * 1000);
    return () => clearInterval(priceInterval);
  }, [fetchPrices]);

  // Auto-rotate signals every 8 seconds
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % signals.length);
        setIsFading(false);
      }, 300);
    }, 8000);
    return () => clearInterval(rotationInterval);
  }, [signals.length]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleReopen = () => {
    setIsVisible(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  const goToPrevious = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + signals.length) % signals.length);
      setIsFading(false);
    }, 300);
  };

  const goToNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % signals.length);
      setIsFading(false);
    }, 300);
  };

  const getDirectionStyles = (direction: string) => {
    switch (direction) {
      case 'bullish':
        return {
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          text: 'text-green-400',
          badge: 'bg-green-500 text-white'
        };
      case 'bearish':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          text: 'text-red-400',
          badge: 'bg-red-500 text-white'
        };
      default:
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/30',
          text: 'text-yellow-400',
          badge: 'bg-yellow-500 text-black'
        };
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return '...';
    if (price >= 1000) return `$${price.toLocaleString()}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  };

  const currentSignal = signals[currentIndex];
  const styles = currentSignal ? getDirectionStyles(currentSignal.direction) : null;

  if (!isVisible) {
    return (
      <button
        onClick={handleReopen}
        className="fixed bottom-4 right-4 z-50 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg shadow-lg border border-slate-700 transition-all"
        aria-label="Reopen market signals banner"
      >
        📊 Show Signals
      </button>
    );
  }

  if (hasError && isLoading) return null;

  return (
    <>
      <div className="sticky bottom-0 left-0 right-0 z-50 p-4 md:p-6">
        <div 
          className={`max-w-5xl mx-auto ${styles?.bg} ${styles?.border} border backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden`}
          role="region"
          aria-label="Live crypto market signals"
          aria-live="polite"
        >
          <div className="p-4 md:p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-slate-400">Live Market Signals</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrevious}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Previous signal"
                >
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-xs text-slate-500 px-2">
                  {currentIndex + 1}/{signals.length}
                </span>
                <button
                  onClick={goToNext}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Next signal"
                >
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={handleClose}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors ml-2"
                  aria-label="Close banner"
                >
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {currentSignal && (
              <div className={`transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Left - Asset Info */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-lg font-bold text-white">
                        {currentSignal.asset.slice(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{currentSignal.pair}</h3>
                        <p className="text-2xl font-bold text-white">{formatPrice(currentSignal.currentPrice)}</p>
                        {currentSignal.priceChange24h !== undefined && (
                          <p className={`text-sm ${currentSignal.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {currentSignal.priceChange24h >= 0 ? '+' : ''}{currentSignal.priceChange24h.toFixed(2)}%
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Middle - Sparkline */}
                  <div className="flex-shrink-0 w-full lg:w-32 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentSignal.sparklineData}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={currentSignal.direction === 'bullish' ? '#4ade80' : currentSignal.direction === 'bearish' ? '#f87171' : '#facc15'}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Center - Signal Info */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles?.badge}`}>
                        {currentSignal.direction.toUpperCase()}
                      </span>
                      <span className="text-sm text-slate-400">
                        {currentSignal.confidence}% confidence
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{currentSignal.analysis}</p>
                  </div>

                  {/* Right - CTA */}
                  <div className="flex-shrink-0">
                    <Link
                      href="/signals"
                      className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Progress indicators */}
            <div className="flex justify-center gap-1.5 mt-4">
              {signals.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsFading(true);
                    setTimeout(() => {
                      setCurrentIndex(index);
                      setIsFading(false);
                    }, 300);
                  }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-6 bg-white' : 'w-1 bg-white/30'
                  }`}
                  aria-label={`Go to signal ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Spacer to prevent content from being hidden under the banner */}
      <div className="h-32 md:h-28" />
    </>
  );
}