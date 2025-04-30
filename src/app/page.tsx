import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <Hero />
    </div>
  );
}
