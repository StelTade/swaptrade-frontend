'use client';

import { useEffect } from 'react';
import { useAnalytics } from './AnalyticsProvider';
import { useABTest } from '@/hooks/useABTest';
import WaitlistForm from '@/components/WaitlistForm';
import Navbar from '@/components/Navbar';

const HERO_EXPERIMENT = {
  key: 'hero_headline',
  variants: ['control', 'variant_a', 'variant_b'] as const,
} as const;

const HEADLINES: Record<string, { title: string; subtitle: string }> = {
  control: {
    title: 'Join the SwapTrade Waitlist',
    subtitle: 'Be first to access the next generation of decentralized trading.',
  },
  variant_a: {
    title: 'Trade Smarter. Start Free.',
    subtitle: 'Get early access to SwapTrade and unlock exclusive launch rewards.',
  },
  variant_b: {
    title: 'Your Spot on SwapTrade Awaits',
    subtitle: 'Limited early access — reserve your place and earn referral bonuses.',
  },
};

export default function WaitlistContent() {
  const { track } = useAnalytics();
  const { variant } = useABTest(HERO_EXPERIMENT);

  // Track page view (and re-track when variant resolves from null → actual value)
  useEffect(() => {
    if (variant === null) return;
    track('page_view', { ab_variant: variant });
  }, [track, variant]);

  const headline = HEADLINES[variant ?? 'control'] ?? HEADLINES['control'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {headline.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{headline.subtitle}</p>
          <WaitlistForm />
        </div>
      </main>
    </div>
  );
}
