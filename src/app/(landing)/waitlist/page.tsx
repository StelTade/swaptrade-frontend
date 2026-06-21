import { Suspense } from 'react';
import AnalyticsProvider from './components/AnalyticsProvider';
import WaitlistContent from './components/WaitlistContent';

function WaitlistSkeleton() {
  return <div>Loading...</div>;
}

export default function WaitlistPage() {
  return (
    <AnalyticsProvider>
      <Suspense fallback={<WaitlistSkeleton />}>
        <WaitlistContent />
      </Suspense>
    </AnalyticsProvider>
  );
}