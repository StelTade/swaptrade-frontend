'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import WaitlistForm from '@/components/WaitlistForm';
import WaitlistSuccess from '@/components/WaitlistSuccess';
import UserDashboard from '@/components/UserDashboard';

function WaitlistPageInner() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref') || searchParams.get('referral') || undefined;

  const [userId, setUserId] = useState<string | null>(null);
  const [myReferralCode, setMyReferralCode] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleSuccess = (id: string, code: string | null) => {
    setUserId(id);
    setMyReferralCode(code);
  };

  const handleReset = () => {
    setUserId(null);
    setMyReferralCode(null);
    setShowDashboard(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-4 py-16 gap-10">
      <div className="text-center space-y-3 max-w-lg">
        <h1 className="text-4xl font-bold text-[#16a34a]">Join the SwapTrade Waitlist</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Be the first to access risk-free crypto trading simulation. Sign up below and refer
          friends to move up the list.
        </p>
      </div>

      {!userId ? (
        <WaitlistForm onSuccess={handleSuccess} referralCode={refCode} />
      ) : (
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
          <WaitlistSuccess referralCode={myReferralCode} onReset={handleReset} />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowDashboard((v) => !v)}
              className="px-5 py-2 rounded-lg border border-[#16a34a] text-[#16a34a] hover:bg-green-50 dark:hover:bg-green-900/20 text-sm font-medium transition-colors"
            >
              {showDashboard ? 'Hide Dashboard' : 'View My Status'}
            </button>
          </div>

          {showDashboard && <UserDashboard userId={userId} />}
        </div>
      )}
    </div>
  );
}

export default function WaitlistPage() {
  return (
    <Suspense>
      <WaitlistPageInner />
    </Suspense>
  );
}
