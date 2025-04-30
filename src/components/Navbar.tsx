import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          SwapTrade
        </Link>
        <div className="flex space-x-4">
          {/* Hamburger menu with three horizontal lines */}
          <div className="flex flex-col space-y-1.5">
            <div className="w-8 h-0.5 bg-black"></div>
            <div className="w-8 h-0.5 bg-black"></div>
            <div className="w-8 h-0.5 bg-black"></div>
          </div>
        </div>
      </div>
    </header>
  );
}