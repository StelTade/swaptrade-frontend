import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section 
      aria-label="Hero section"
      className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12"
    >
      <div className="flex-1 text-center md:text-left space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          A crypto trading simulator
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl">
          Experience risk-free crypto trading using virtual assets on Starknet. Perfect for learning and strategy testing.
        </p>
        <div className="pt-4">
          <Link 
            href="/signup"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#16a34a] hover:bg-[#15803d] rounded-lg transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16a34a]"
            role="button"
            aria-label="Get started with SwapTrade"
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="flex-1 flex justify-center md:justify-end">
        <div className="relative w-full max-w-lg aspect-square">
          <svg
            className="w-full h-full text-[#16a34a]/10"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M100 0C155.228 0 200 44.772 200 100C200 155.228 155.228 200 100 200C44.772 200 0 155.228 0 100C0 44.772 44.772 0 100 0ZM100 20C55.817 20 20 55.817 20 100C20 144.183 55.817 180 100 180C144.183 180 180 144.183 180 100C180 55.817 144.183 20 100 20ZM100 40C133.137 40 160 66.863 160 100C160 133.137 133.137 160 100 160C66.863 160 40 133.137 40 100C40 66.863 66.863 40 100 40Z"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-3/4 h-3/4 text-[#16a34a]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}