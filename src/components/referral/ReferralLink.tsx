'use client';

import { useState } from 'react';
import { AiOutlineCopy, AiOutlineCheck, AiOutlineShareAlt } from 'react-icons/ai';
import { generateReferralLink } from '@/lib/referral';

interface ReferralLinkProps {
  referralCode: string;
  className?: string;
}

export default function ReferralLink({ referralCode, className = '' }: ReferralLinkProps) {
  const [copied, setCopied] = useState(false);
  const referralUrl = generateReferralLink(referralCode);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const shareViaWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join SwapTrade Waitlist',
          text: 'Check out SwapTrade - a crypto trading simulator! Join the waitlist with my referral link.',
          url: referralUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className={`bg-gradient-to-r from-[#16a34a]/10 to-[#15803d]/10 rounded-lg p-6 border border-[#16a34a]/20 ${className}`}>
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          🎉 Welcome to SwapTrade!
        </h3>
        <p className="text-sm text-gray-600">
          Share your referral link and earn rewards when friends join!
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-md p-3 border border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Your Referral Link:</p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={referralUrl}
              readOnly
              className="flex-1 text-sm font-mono bg-gray-50 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#16a34a]"
            />
            <button
              onClick={copyToClipboard}
              className="p-2 text-[#16a34a] hover:bg-[#16a34a]/10 rounded transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <AiOutlineCheck className="w-5 h-5" /> : <AiOutlineCopy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-[#16a34a] text-white text-sm font-medium rounded-md hover:bg-[#15803d] transition-colors"
          >
            {copied ? (
              <>
                <AiOutlineCheck className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <AiOutlineCopy className="w-4 h-4 mr-2" />
                Copy Link
              </>
            )}
          </button>

          {'share' in navigator && (
            <button
              onClick={shareViaWebShare}
              className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              <AiOutlineShareAlt className="w-4 h-4 mr-2" />
              Share
            </button>
          )}
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Referral code: <span className="font-mono font-semibold">{referralCode}</span>
          </p>
        </div>
      </div>
    </div>
  );
}