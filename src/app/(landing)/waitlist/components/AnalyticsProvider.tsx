'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WaitlistEvent =
  | 'page_view'
  | 'cta_click'
  | 'tier_selection'
  | 'payment_attempt'
  | 'successful_signup'
  | 'referral_share';

export interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

interface AnalyticsContextValue {
  /** Whether the user has accepted non-essential cookies */
  consentGiven: boolean;
  giveConsent: () => void;
  revokeConsent: () => void;
  track: (event: WaitlistEvent, properties?: EventProperties) => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AnalyticsContext = createContext<AnalyticsContextValue>({
  consentGiven: false,
  giveConsent: () => {},
  revokeConsent: () => {},
  track: () => {},
});

export const useAnalytics = () => useContext(AnalyticsContext);

// ---------------------------------------------------------------------------
// Helpers – thin wrappers so real SDKs can be swapped in without touching
// business logic. All PII is redacted before sending.
// ---------------------------------------------------------------------------

/** Redact any property whose key looks like it contains personal data. */
function redactPII(props: EventProperties): EventProperties {
  const PII_KEYS = /email|name|phone|address|ip/i;
  const safe: EventProperties = {};
  for (const [k, v] of Object.entries(props)) {
    safe[k] = PII_KEYS.test(k) ? '[redacted]' : v;
  }
  return safe;
}

function sendGA4(event: string, properties: EventProperties) {
  if (typeof window === 'undefined') return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === 'function') {
    gtag('event', event, properties);
  }
}

function sendMixpanel(event: string, properties: EventProperties) {
  if (typeof window === 'undefined') return;
  const mixpanel = (
    window as Window & { mixpanel?: { track: (e: string, p: EventProperties) => void } }
  ).mixpanel;
  if (mixpanel && typeof mixpanel.track === 'function') {
    mixpanel.track(event, properties);
  }
}

// ---------------------------------------------------------------------------
// Cookie helpers (GDPR/CCPA compliant)
// ---------------------------------------------------------------------------

const CONSENT_COOKIE = 'swaptrade_analytics_consent';

function readConsentCookie(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split('; ').some((c) => c === `${CONSENT_COOKIE}=true`);
}

function writeConsentCookie(value: boolean) {
  if (typeof document === 'undefined') return;
  const maxAge = value ? 60 * 60 * 24 * 365 : 0; // 1 year or delete
  document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface AnalyticsProviderProps {
  children: React.ReactNode;
  /** GA4 Measurement ID (e.g. G-XXXXXXXXXX). Falls back to env var. */
  ga4MeasurementId?: string;
}

export default function AnalyticsProvider({ children, ga4MeasurementId }: AnalyticsProviderProps) {
  const [consentGiven, setConsentGiven] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  // Queue events that arrive before consent is granted
  const queue = useRef<Array<{ event: WaitlistEvent; properties: EventProperties }>>([]);

  // Read persisted consent on mount
  useEffect(() => {
    const persisted = readConsentCookie();
    if (persisted) {
      setConsentGiven(true);
    } else {
      setShowBanner(true);
    }
  }, []);

  // Inject GA4 script once consent is given
  useEffect(() => {
    if (!consentGiven) return;
    const measurementId =
      ga4MeasurementId ?? process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
    if (!measurementId || document.getElementById('ga4-script')) return;

    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    (window as Window & { dataLayer?: unknown[] }).dataLayer =
      (window as Window & { dataLayer?: unknown[] }).dataLayer ?? [];
    (window as Window & { gtag?: (...args: unknown[]) => void }).gtag = function (
      ...args: unknown[]
    ) {
      ((window as Window & { dataLayer?: unknown[] }).dataLayer as unknown[]).push(args);
    };
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (!gtag) return;
    gtag('js', new Date());
    gtag('config', measurementId, { anonymize_ip: true });
  }, [consentGiven, ga4MeasurementId]);

  // Flush queued events once consent arrives
  useEffect(() => {
    if (!consentGiven) return;
    while (queue.current.length > 0) {
      const item = queue.current.shift();
      if (item) {
        const safe = redactPII(item.properties);
        sendGA4(item.event, safe);
        sendMixpanel(item.event, safe);
      }
    }
  }, [consentGiven]);

  const track = useCallback(
    (event: WaitlistEvent, properties: EventProperties = {}) => {
      const safe = redactPII(properties);
      if (!consentGiven) {
        queue.current.push({ event, properties: safe });
        return;
      }
      sendGA4(event, safe);
      sendMixpanel(event, safe);
    },
    [consentGiven]
  );

  const giveConsent = useCallback(() => {
    writeConsentCookie(true);
    setConsentGiven(true);
    setShowBanner(false);
  }, []);

  const revokeConsent = useCallback(() => {
    writeConsentCookie(false);
    setConsentGiven(false);
    setShowBanner(false);
    queue.current = [];
  }, []);

  return (
    <AnalyticsContext.Provider value={{ consentGiven, giveConsent, revokeConsent, track }}>
      {children}
      {showBanner && (
        <ConsentBanner onAccept={giveConsent} onDecline={revokeConsent} />
      )}
    </AnalyticsContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Cookie consent banner
// ---------------------------------------------------------------------------

function ConsentBanner({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-sm text-gray-700 dark:text-gray-300">
          We use analytics cookies to improve your experience and measure conversion rates. Your
          data is anonymised and never sold.{' '}
          <span className="text-gray-500 dark:text-gray-400 text-xs">
            (GDPR/CCPA compliant)
          </span>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={onDecline}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 text-sm rounded-lg bg-[#16a34a] text-white hover:bg-[#15803d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16a34a]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
