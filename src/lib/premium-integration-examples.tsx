/**
 * Integration Examples: Premium Waitlist
 * 
 * Shows how to integrate the premium waitlist into your app
 */

'use client';

import React from 'react';
import PremiumWaitlist from '@/components/PremiumWaitlist';
import PremiumWaitlistDashboard from '@/components/PremiumWaitlistDashboard';

/**
 * Example 1: Full Premium Landing Page
 * Route: /premium
 */
export function PremiumLandingPageExample() {
  return (
    <PremiumWaitlist
      showBenefits={true}
      compact={false}
      onSuccess={() => {
        console.log('User joined premium waitlist');
        // Could redirect or show success modal
      }}
    />
  );
}

/**
 * Example 2: Compact Form in Home Page
 * Add to hero section or footer
 */
export function CompactPremiumFormExample() {
  return (
    <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Upgrade to Premium
            </h2>
            <p className="text-slate-300 mb-6">
              Get professional trading tools, AI signals, and exclusive community access.
              Join 500+ traders on the waitlist.
            </p>
          </div>
          <PremiumWaitlist compact={true} showBenefits={false} />
        </div>
      </div>
    </section>
  );
}

/**
 * Example 3: Admin Dashboard
 * Route: /admin/premium-waitlist
 */
export function AdminDashboardExample() {
  return (
    <div className="min-h-screen bg-gray-100">
      <PremiumWaitlistDashboard />
    </div>
  );
}

/**
 * Example 4: In Navbar - Premium CTA Button
 */
export function NavbarPremiumCTA() {
  return (
    <a
      href="/premium"
      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg transition-all hover:scale-105"
      title="Join SwapTrade Premium waitlist"
    >
      ✨ Premium
    </a>
  );
}

/**
 * Example 5: Track conversion with analytics
 */
export function trackPremiumSignup(email: string, position: number) {
  // Google Analytics
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof window !== 'undefined' && (window as any).gtag) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag('event', 'premium_signup', {
      email,
      position,
      timestamp: new Date().toISOString(),
    });
  }

  // Segment or other analytics
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof window !== 'undefined' && (window as any).analytics) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).analytics.track('Premium Signed Up', {
      email,
      position,
    });
  }

  // Custom event
  window.dispatchEvent(
    new CustomEvent('premium:signup', {
      detail: { email, position },
    })
  );
}

/**
 * Example 6: Custom modal with premium invite
 */
export function PremiumUpgradeModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-white text-center">
          <div className="text-5xl mb-3">⚡</div>
          <h2 className="text-2xl font-bold">Unlock Premium</h2>
          <p className="mt-2 text-amber-50">
            Professional trading tools are here
          </p>
        </div>

        <div className="p-8">
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-lg">🎯</span>
              <span className="text-gray-700">Advanced analytics & AI signals</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lg">📊</span>
              <span className="text-gray-700">Pro charts with 50+ indicators</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lg">👥</span>
              <span className="text-gray-700">Exclusive VIP trading community</span>
            </li>
          </ul>

          <div className="space-y-3">
            <a
              href="/premium"
              className="block w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg text-center hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              Join Premium Waitlist
            </a>
            <button
              onClick={onClose}
              className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
            >
              Maybe Later
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            ✨ Early access pricing • 30% lifetime discount • Founding members only
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Example 7: Conditional rendering based on waitlist position
 */
export function WaitlistPositionCard({ email }: { email: string }) {
  const [position, setPosition] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`/api/waitlist/premium?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.onWaitlist) {
          setPosition(data.position);
        }
      })
      .finally(() => setLoading(false));
  }, [email]);

  if (loading) return <div className="text-center p-4">Loading...</div>;

  if (position === null) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-900">Not on the premium waitlist yet.</p>
        <a
          href="/premium"
          className="text-blue-600 hover:underline font-semibold"
        >
          Join now →
        </a>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg">
      <p className="text-gray-900 font-semibold">
        🎉 You&apos;re #{position} on the premium waitlist!
      </p>
      <p className="text-sm text-gray-600 mt-1">
        You&apos;ll be among the first to access SwapTrade Premium when it launches.
      </p>
    </div>
  );
}

/**
 * Example 8: Referral bonus for premium signups
 */
export function getPremiumReferralBonusText(referralCode: string): string {
  return `Join SwapTrade Premium and get 30% lifetime discount. Use code: ${referralCode}`;
}

/**
 * Example 9: Email marketing segmentation
 */
export function segmentForEmailMarketing(position: number): string {
  if (position <= 50) return 'vip-early'; // Top 50
  if (position <= 200) return 'priority'; // Next 150
  if (position <= 500) return 'standard'; // Rest of founding
  return 'general'; // Not on waitlist
}

const examples = {
  PremiumLandingPageExample,
  CompactPremiumFormExample,
  AdminDashboardExample,
  NavbarPremiumCTA,
  trackPremiumSignup,
  PremiumUpgradeModal,
  WaitlistPositionCard,
  getPremiumReferralBonusText,
  segmentForEmailMarketing,
};

// Export all examples
export default examples;
