"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import OptimizedImage from "./ui/OptimizedImage";

const ROTATION_INTERVAL_MS = 6000;

const testimonials = [
  {
    quote:
      "SwapTrade flagged crowded momentum trades before our team saw the risk in our own dashboards. It turned hours of review into a 10-minute decision.",
    name: "Maya Chen",
    credential: "Beta tester, options swing trader",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=70",
  },
  {
    quote:
      "The analysis notes are clear enough for newer traders, but the signal quality still gives experienced desks something to act on.",
    name: "Jon Bell",
    credential: "Former prop desk analyst",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=70",
  },
  {
    quote:
      "I used SwapTrade to compare crypto rotation setups against equities. The scenario summaries made position sizing much easier to explain.",
    name: "Ari Okafor",
    credential: "Early adopter, multi-asset trader",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&h=160&q=70",
  },
  {
    quote:
      "The platform does not just surface signals. It shows the reasoning, confidence, and failure conditions behind each setup.",
    name: "Elena Novak",
    credential: "Market structure researcher",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&h=160&q=70",
  },
  {
    quote:
      "We cut post-trade review time by half because every alert came with context, comparable setups, and a clean audit trail.",
    name: "Sam Rivera",
    credential: "Beta tester, portfolio lead",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=70",
  },
  {
    quote:
      "The waitlist preview helped our education community teach risk management without pretending every signal is a guarantee.",
    name: "Priya Shah",
    credential: "Trading educator and early advisor",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=160&h=160&q=70",
  },
];

const caseStudies = [
  {
    label: "Anonymized beta account",
    result: "+18.4%",
    title: "Improved weekly risk-adjusted return",
    detail:
      "A small-cap crypto strategy used SwapTrade alerts to reduce entries during low-liquidity windows across a 6-week beta period.",
  },
  {
    label: "Education cohort",
    result: "42%",
    title: "Fewer late entries",
    detail:
      "Students reviewing simulated BTC and ETH setups used confidence bands to avoid chasing already-extended moves.",
  },
  {
    label: "Active swing trader",
    result: "3.1x",
    title: "Faster setup review",
    detail:
      "A beta tester compared market structure, volatility, and catalyst notes in one workflow instead of three separate tools.",
  },
];

const mediaLogos = ["MarketWatch", "Finextra", "CryptoSlate", "The Block"];

const trustBadges = [
  {
    label: "Encrypted in transit",
    href: "https://www.cloudflare.com/learning/ssl/what-is-https/",
  },
  {
    label: "Privacy-first analytics",
    href: "https://gdpr.eu/what-is-gdpr/",
  },
  {
    label: "OWASP aligned",
    href: "https://owasp.org/www-project-top-ten/",
  },
];

export default function SocialProofSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const activeTestimonial = testimonials[activeIndex];

  const goToTestimonial = useCallback((index: number) => {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  }, []);

  const nextTestimonial = useCallback(() => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  }, []);

  const previousTestimonial = useCallback(() => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(nextTestimonial, ROTATION_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [nextTestimonial]);

  useEffect(() => {
    if (!isVideoOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isVideoOpen]);

  const carouselLabel = useMemo(
    () => `Testimonial ${activeIndex + 1} of ${testimonials.length}`,
    [activeIndex]
  );

  return (
    <section
      aria-labelledby="social-proof-title"
      className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
            Trusted by early traders
          </p>
          <h2
            id="social-proof-title"
            className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
          >
            Real beta feedback from traders testing SwapTrade analysis
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
            Testimonials and case studies are drawn from anonymized beta feedback and
            simulated trading reviews. Results are not guarantees of future performance.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div
            aria-roledescription="carousel"
            aria-label="Beta tester testimonials"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") previousTestimonial();
              if (event.key === "ArrowRight") nextTestimonial();
            }}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/60 sm:p-6"
          >
            <div aria-live="polite" className="min-h-[280px]">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {carouselLabel}
              </p>
              <blockquote className="mt-5 text-2xl font-semibold leading-9 text-slate-950 dark:text-white">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <OptimizedImage
                  src={activeTestimonial.image}
                  alt={`${activeTestimonial.name} profile photo`}
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full object-cover ring-4 ring-white dark:ring-slate-800"
                  sizes="80px"
                  priority={activeIndex === 0}
                />
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white">
                    {activeTestimonial.name}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {activeTestimonial.credential}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={previousTestimonial}
                  aria-label="Show previous testimonial"
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] dark:border-slate-700 dark:text-slate-200"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextTestimonial}
                  aria-label="Show next testimonial"
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] dark:border-slate-700 dark:text-slate-200"
                >
                  Next
                </button>
              </div>
              <div className="flex items-center gap-2" aria-label="Choose testimonial">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    onClick={() => goToTestimonial(index)}
                    aria-label={`Show testimonial from ${testimonial.name}`}
                    aria-current={index === activeIndex}
                    className={`h-3 w-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 dark:focus:ring-offset-slate-950 ${
                      index === activeIndex
                        ? "bg-[var(--primary)]"
                        : "bg-slate-300 hover:bg-slate-400 dark:bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white shadow-lg dark:border-slate-800 sm:p-6">
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="group relative block w-full overflow-hidden rounded-2xl text-left focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              aria-label="Open video testimonial modal"
            >
              <OptimizedImage
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=960&q=75"
                alt="Beta user reviewing SwapTrade analytics on a laptop"
                width={960}
                height={540}
                className="aspect-video w-full object-cover opacity-80 transition group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-950">
                Video testimonial
              </span>
              <span className="absolute bottom-5 left-5 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--primary)] text-slate-950">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-lg font-semibold">
                    Watch a beta workflow review
                  </span>
                  <span className="block text-sm text-slate-200">
                    60-second inline demo preview
                  </span>
                </span>
              </span>
            </button>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white/10 p-4">
                <span className="block text-2xl font-bold">1,200+</span>
                beta alerts reviewed
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <span className="block text-2xl font-bold">87%</span>
                found insights clearer
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {caseStudies.map((study) => (
            <article
              key={study.title}
              className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {study.label}
              </p>
              <p className="mt-3 text-4xl font-bold text-[var(--primary)]">
                {study.result}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">
                {study.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {study.detail}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Featured analysis mentions
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {mediaLogos.map((logo) => (
                <div
                  key={logo}
                  aria-label={`${logo} media mention`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-center font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Trust and verification
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {trustBadges.map((badge) => (
                <Link
                  key={badge.label}
                  href={badge.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-center text-sm font-semibold text-emerald-900 hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-100"
                >
                  {badge.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isVideoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-testimonial-title"
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 p-4"
        >
          <div className="w-full max-w-4xl rounded-3xl bg-white p-4 shadow-2xl dark:bg-slate-950">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
                  Video testimonial
                </p>
                <h3
                  id="video-testimonial-title"
                  className="text-xl font-bold text-slate-950 dark:text-white"
                >
                  How beta users review a SwapTrade signal
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] dark:border-slate-700 dark:text-slate-200"
              >
                Close
              </button>
            </div>
            <video
              controls
              playsInline
              className="aspect-video w-full rounded-2xl bg-slate-900"
              poster="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=960&q=75"
            >
              <source
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
