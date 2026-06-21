import AnalyticsProvider from './components/AnalyticsProvider';
import WaitlistContent from './components/WaitlistContent';

export default function WaitlistPage() {
  return (
    <AnalyticsProvider>
      <WaitlistContent />
    </AnalyticsProvider>
  );
}
