import WaitlistHero from "@/components/WaitlistHero";
import Navbar from "@/components/Navbar";

export default function WaitlistPage() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <WaitlistHero />
    </div>
  );
}