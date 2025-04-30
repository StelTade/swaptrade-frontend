'use client';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left column with text content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              A crypto trading simulator
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              using virtual assets on Starknet
            </p>
            <a
              href="/signup"
              className="inline-block bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              aria-label="Get started with SwapTrade"
            >
              Get Started
            </a>
          </div>

          {/* Right column with illustration */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg" role="img" aria-label="Trading illustration">
              <svg
                className="w-full h-auto"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="400" height="400" fill="#f3f4f6" rx="8" />
                <path
                  d="M200 100L300 250H100L200 100Z"
                  fill="#16a34a"
                  opacity="0.2"
                />
                <path
                  d="M200 150L275 275H125L200 150Z"
                  fill="#16a34a"
                  opacity="0.4"
                />
                <path
                  d="M200 200L250 300H150L200 200Z"
                  fill="#16a34a"
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;