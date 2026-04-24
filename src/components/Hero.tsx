"use client";

import dynamic from 'next/dynamic';
import { useI18n } from '@/i18n/context';
import OptimizedImage from './ui/OptimizedImage';

const WaitlistForm = dynamic(() => import('./WaitlistForm'), {
  loading: () => <div className="w-full max-w-md h-32 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />,
  ssr: false
});

export default function Hero() {
  const { t } = useI18n();
  return (
    <section
      aria-label="Hero section"
      className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12"
    >
      <div className="flex-1 text-center md:text-left space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          {t("hero.title")}
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl">
          {t("hero.subtitle")}
        </p>
        <div className="pt-4 flex flex-col items-center md:items-start">
          <WaitlistForm />
        </div>
      </div>
      <div className="flex-1 flex justify-center md:justify-end">
        <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-2xl">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
            alt="Trading dashboard illustration"
            width={1200}
            height={900}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
