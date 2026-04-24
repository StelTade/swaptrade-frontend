import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';

const Leaderboard = dynamic(() => import('@/components/Leaderboard'), {
  loading: () => (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-12 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"
          />
        ))}
      </div>
    </div>
  ),
  ssr: false
});

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <Hero />
      <Leaderboard />
    </div>
  );
}
