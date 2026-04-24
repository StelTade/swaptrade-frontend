import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold underline text-center text-brand-green">
        Welcome to SwapTrade
      </h1>
      <Link
        href="/waitlist"
        className="px-6 py-3 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white font-medium transition-colors"
      >
        Join the Waitlist
      </Link>
    </div>
  )
}