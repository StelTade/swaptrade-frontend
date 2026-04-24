import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Leaderboard from '@/components/Leaderboard';
import AdvancedChart from '@/components/AdvancedChart';

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <Hero />
      <AdvancedChart />
      <Leaderboard />
    </div>
  );
}
