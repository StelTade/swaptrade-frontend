"use client";

import { useState, useEffect } from "react";

// ── Animated counter hook ─────────────────────────────────────────────────────
function useCounter(target: number, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return value;
}

// ── Floating particle (pure CSS, no lib) ─────────────────────────────────────
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full bg-amber-400/20 blur-sm animate-ping"
      style={style}
    />
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  value,
  suffix,
  label,
  color,
}: {
  value: number;
  suffix: string;
  label: string;
  color: string;
}) {
  const count = useCounter(value);
  return (
    <div className="flex flex-col items-center bg-slate-800/60 border border-slate-700/60 rounded-2xl px-6 py-5 backdrop-blur-sm hover:border-amber-500/40 transition-colors">
      <span className={`text-3xl font-black tabular-nums ${color}`}>
        {count}
        {suffix}
      </span>
      <span className="text-xs text-slate-400 mt-1 text-center">{label}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function WaitlistHero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Delegates to the existing waitlist API used by WaitlistForm
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 py-24">

      {/* ── Background glow ── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[120px]" />
      </div>
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-orange-600/5 blur-[100px]" />

      {/* ── Floating particles ── */}
      <Particle style={{ top: "15%", left: "10%", width: 6, height: 6, animationDuration: "3s" }} />
      <Particle style={{ top: "70%", left: "85%", width: 8, height: 8, animationDuration: "4s", animationDelay: "1s" }} />
      <Particle style={{ top: "40%", left: "92%", width: 5, height: 5, animationDuration: "2.5s", animationDelay: "0.5s" }} />
      <Particle style={{ top: "80%", left: "5%",  width: 7, height: 7, animationDuration: "3.5s", animationDelay: "1.5s" }} />

      {/* ── Grid overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-sm font-semibold text-amber-300 tracking-wide">
            NOW IN BETA — LIMITED SPOTS
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
          <span className="text-white">Trade Smarter</span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-red-400">
            on Stellar
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          SwapTrade is the professional-grade DEX built on Stellar —
          real-time signals, AI-powered insights, and zero gas surprises.
          Join the waitlist before spots fill up.
        </p>

        {/* CTA Form */}
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-2xl shadow-lg shadow-amber-500/30">
              ✓
            </div>
            <p className="text-xl font-bold text-white">You&apos;re on the list!</p>
            <p className="text-slate-400 text-sm">We&apos;ll notify you the moment access opens.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3.5 text-white placeholder-slate-500 outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 transition-all"
                disabled={loading}
              />
              {error && (
                <p className="mt-1.5 text-left text-xs text-red-400">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="shrink-0 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3.5 font-bold text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? "Joining..." : "Get Early Access"}
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-slate-600">
          No spam · Unsubscribe anytime · First 100 members get lifetime 30% off
        </p>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 w-full max-w-lg">
          <StatCard value={500}  suffix="+"  label="Waitlist members"   color="text-amber-400" />
          <StatCard value={30}   suffix="%"  label="Founding discount"  color="text-orange-400" />
          <StatCard value={50}   suffix="+"  label="Pro features"       color="text-red-400" />
        </div>

        {/* Social proof */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Built on Stellar
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Non-custodial
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Sub-second finality
          </span>
        </div>
      </div>
    </section>
  );
}
