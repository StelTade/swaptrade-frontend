'use client';

interface WaitlistSuccessProps {
  referralCode: string | null;
  onReset: () => void;
}

export default function WaitlistSuccess({ referralCode, onReset }: WaitlistSuccessProps) {
  const referralUrl =
    referralCode && typeof window !== 'undefined'
      ? `${window.location.origin}/?ref=${referralCode}`
      : null;

  const copyLink = async () => {
    if (!referralUrl) return;
    await navigator.clipboard.writeText(referralUrl);
  };

  return (
    <div
      className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center space-y-4 w-full max-w-md"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center justify-center">
        <svg
          className="w-12 h-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-1">
          You&apos;re on the list!
        </h3>
        <p className="text-sm text-green-700 dark:text-green-300">
          Check your email for a confirmation link. We&apos;ll notify you when SwapTrade is ready.
        </p>
      </div>

      {referralUrl && (
        <div className="space-y-2 text-left">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            Share your referral link to move up the list:
          </p>
          <div className="flex gap-2 items-center">
            <input
              readOnly
              value={referralUrl}
              aria-label="Your referral link"
              className="flex-1 px-3 py-2 rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none"
            />
            <button
              type="button"
              onClick={copyLink}
              className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onReset}
        className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1"
      >
        Join with another email
      </button>
    </div>
  );
}
