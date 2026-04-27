'use client';

import { useState, useRef, useEffect } from 'react';

interface PremiumBenefit {
  icon: string;
  title: string;
  description: string;
}

const PREMIUM_BENEFITS: PremiumBenefit[] = [
  {
    icon: '⚡',
    title: 'Advanced Analytics',
    description: 'Real-time portfolio insights and detailed performance metrics',
  },
  {
    icon: '🎯',
    title: 'AI Trading Signals',
    description: 'Machine learning-powered buy/sell recommendations',
  },
  {
    icon: '📊',
    title: 'Pro Charts',
    description: 'Advanced technical analysis with 50+ indicators',
  },
  {
    icon: '🔔',
    title: 'Priority Alerts',
    description: 'Instant notifications for price movements and opportunities',
  },
  {
    icon: '👥',
    title: 'VIP Community',
    description: 'Access to exclusive trading strategies and expert insights',
  },
  {
    icon: '📈',
    title: 'Portfolio Tools',
    description: 'Risk management and position sizing calculators',
  },
];

interface PremiumWaitlistFormProps {
  onSuccess?: () => void;
  showBenefits?: boolean;
  compact?: boolean;
}

interface FormData {
  email: string;
  name: string;
}

interface FormErrors {
  email?: string;
  name?: string;
  submit?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PremiumWaitlist({
  onSuccess,
  showBenefits = true,
  compact = false,
}: PremiumWaitlistFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const captchaContainerRef = useRef<HTMLDivElement | null>(null);
  const captchaWidgetIdRef = useRef<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // Fetch CSRF token
  useEffect(() => {
    let cancelled = false;
    fetch('/api/csrf', { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) throw new Error('csrf');
        const data = (await res.json().catch(() => null)) as { token?: string } | null;
        if (!data?.token) throw new Error('csrf');
        if (!cancelled) setCsrfToken(data.token);
      })
      .catch(() => {
        if (!cancelled) {
          setErrors((prev) => ({ ...prev, submit: 'Security token unavailable' }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Setup Turnstile captcha
  useEffect(() => {
    if (!turnstileSiteKey) return;
    if (!captchaContainerRef.current) return;

    setCaptchaToken(null);
    setCaptchaError(null);

    const scriptId = 'turnstile-script';
    if (!document.getElementById(scriptId)) {
      const s = document.createElement('script');
      s.id = scriptId;
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }

    const render = () => {
      if (!captchaContainerRef.current) return;
      if (!window.turnstile?.render) return;
      if (captchaWidgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(captchaWidgetIdRef.current);
      }

      const widgetId = window.turnstile.render(captchaContainerRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token: unknown) => {
          if (typeof token === 'string') setCaptchaToken(token);
        },
        'expired-callback': () => {
          setCaptchaToken(null);
          setCaptchaError('Captcha expired. Please try again.');
        },
        'error-callback': () => {
          setCaptchaToken(null);
          setCaptchaError('Captcha error. Please try again.');
        },
      });
      captchaWidgetIdRef.current = widgetId;
    };

    if (window.turnstile?.render) {
      render();
    } else {
      const checkTurnstile = setInterval(() => {
        if (window.turnstile?.render) {
          render();
          clearInterval(checkTurnstile);
        }
      }, 100);
      return () => clearInterval(checkTurnstile);
    }
  }, [turnstileSiteKey]);

  const validateField = (name: string, value: string): string | undefined => {
    if (name === 'email') {
      if (!value) return 'Email is required';
      if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email';
      return undefined;
    }
    if (name === 'name') {
      if (!value) return 'Name is required';
      if (value.length < 2) return 'Name must be at least 2 characters';
      if (value.length > 100) return 'Name must be less than 100 characters';
      return undefined;
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    newErrors.email = validateField('email', formData.email);
    newErrors.name = validateField('name', formData.name);

    setTouched({ email: true, name: true });

    if (newErrors.email || newErrors.name) {
      setErrors(newErrors);
      return;
    }

    if (!csrfToken) {
      setErrors({ submit: 'Security token not ready' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/waitlist/premium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          captchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          submit: data.message || 'Failed to join waitlist',
        });
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setFormData({ email: '', name: '' });
      if (onSuccess) {
        onSuccess();
      }

      // Track conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'premium_waitlist_signup', {
          email: formData.email,
        });
      }
    } catch {
      setErrors({
        submit: 'An error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (compact) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-amber-200 dark:border-orange-900">
          {isSuccess ? (
            <div className="text-center">
              <div className="text-4xl mb-3">✓</div>
              <h3 className="font-bold text-lg text-amber-900 dark:text-amber-100 mb-2">
                You&apos;re On The List!
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-200">
                Check your email for exclusive early-access updates
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-amber-300 dark:border-orange-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  disabled={isLoading}
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-amber-300 dark:border-orange-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  disabled={isLoading}
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>

              {captchaError && (
                <p className="text-xs text-red-600 dark:text-red-400">{captchaError}</p>
              )}

              {captchaContainerRef && (
                <div ref={captchaContainerRef} className="flex justify-center" />
              )}

              {errors.submit && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Joining...' : 'Join Premium Waitlist'}
              </button>

              <p className="text-xs text-center text-amber-700 dark:text-amber-200">
                ✨ First 100 members get lifetime 30% discount
              </p>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20 sm:py-32">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full">
            <span className="text-sm font-semibold text-amber-300">✨ Coming Soon</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-300 to-red-400">
            SwapTrade Premium
          </h1>

          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Level up your trading game with professional-grade tools, AI-powered insights,
            and exclusive access to our expert community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl">
              Join the Waitlist
            </button>
            <button className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all border border-slate-500">
              Learn More
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-20 max-w-2xl mx-auto">
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <div className="text-3xl font-black text-amber-400 mb-2">500+</div>
            <div className="text-sm text-slate-400">Waitlist Members</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <div className="text-3xl font-black text-orange-400 mb-2">30%</div>
            <div className="text-sm text-slate-400">Founding Discount</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <div className="text-3xl font-black text-red-400 mb-2">50+</div>
            <div className="text-sm text-slate-400">Advanced Features</div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      {showBenefits && (
        <div className="bg-slate-800/50 border-y border-slate-700 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">What You&apos;ll Get</h2>
            <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
              Everything you need to trade like a pro
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PREMIUM_BENEFITS.map((benefit, idx) => (
                <div
                  key={idx}
                  className="group bg-slate-900/50 border border-slate-700 hover:border-amber-500/50 rounded-xl p-6 transition-all hover:shadow-lg hover:shadow-amber-500/10"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{benefit.title}</h3>
                  <p className="text-slate-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Waitlist Form Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Copy */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white">
              Early Access Starts Now
            </h2>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0">🎯</div>
                <div>
                  <h3 className="font-bold text-white mb-1">First-Mover Advantage</h3>
                  <p className="text-slate-400">
                    Be among the first to experience the next evolution of trading
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0">💰</div>
                <div>
                  <h3 className="font-bold text-white mb-1">Founding Member Pricing</h3>
                  <p className="text-slate-400">
                    Lock in 30% lifetime discount when premium launches
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0">🚀</div>
                <div>
                  <h3 className="font-bold text-white mb-1">Priority Feature Access</h3>
                  <p className="text-slate-400">
                    Shape the future with early access to beta features
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0">🏆</div>
                <div>
                  <h3 className="font-bold text-white mb-1">VIP Community</h3>
                  <p className="text-slate-400">
                    Connect with elite traders and share strategies
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-600/50 rounded-lg p-6">
              <p className="text-amber-100">
                <strong>Limited Time Offer:</strong> Join in April and get beta access
                immediately. Only 500 founding spots available.
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-white mb-3">You&apos;re In!</h3>
                <p className="text-slate-400 mb-6">
                  We&apos;ve sent details to your email. Watch for exclusive updates and launch announcements.
                </p>
                <div className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg">
                  Position: #{Math.floor(Math.random() * 500) + 1}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Trader"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  {touched.name && errors.name && (
                    <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {captchaError && (
                  <p className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded p-3">
                    {captchaError}
                  </p>
                )}

                {captchaContainerRef && (
                  <div ref={captchaContainerRef} className="flex justify-center" />
                )}

                {errors.submit && (
                  <p className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded p-3">
                    {errors.submit}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 disabled:from-gray-500 disabled:via-gray-500 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-lg"
                >
                  {isLoading ? 'Joining...' : '🚀 Join Premium Waitlist'}
                </button>

                <p className="text-center text-xs text-slate-500">
                  ✓ No spam • ✓ Easy unsubscribe • ✓ Early access guaranteed
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-800/50 border-y border-slate-700 py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Common Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: 'When will SwapTrade Premium launch?',
                a: 'We&apos;re targeting Q2 2026. Waitlist members will get early access first.',
              },
              {
                q: 'Is there a cost?',
                a: '$9.99/month after launch. But founding members lock in 30% savings forever.',
              },
              {
                q: 'What if I change my mind?',
                a: 'No commitment required. You can unsubscribe anytime before launch.',
              },
              {
                q: 'Do I need a paid account first?',
                a: 'No! Premium is separate. Start with our free tier and upgrade whenever you&apos;re ready.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
                <h3 className="font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 border-t border-amber-600/30 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Trade Like a Pro?</h2>
          <p className="text-slate-300 mb-8">
            Join 500+ traders already on the waitlist and get founding member pricing
            locked in forever.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg transition-all hover:scale-105 shadow-lg">
            Secure Your Spot Now
          </button>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
    };
    gtag?: (event: string, name: string, data?: Record<string, unknown>) => void;
  }
}
