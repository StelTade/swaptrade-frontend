import PremiumWaitlist from '@/components/PremiumWaitlist';

export const metadata = {
  title: 'SwapTrade Premium - Join the Waitlist',
  description: 'Get early access to SwapTrade Premium with founding member pricing and exclusive benefits. Limited to 500 spots.',
  openGraph: {
    title: 'SwapTrade Premium - Join the Waitlist',
    description: 'Get early access to SwapTrade Premium with founding member pricing.',
    type: 'website',
  },
};

export default function PremiumWaitlistPage() {
  return <PremiumWaitlist showBenefits={true} compact={false} />;
}
