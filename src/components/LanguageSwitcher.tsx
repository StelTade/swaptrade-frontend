"use client";

import { useI18n } from "@/i18n/context";
import { locales, localeNames, Locale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="relative inline-block">
      <label htmlFor="language-select" className="sr-only">
        {t("language.label")}
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="appearance-none bg-transparent border border-gray-300 dark:border-gray-600 text-[var(--foreground)] text-sm rounded-md px-3 py-1.5 pr-7 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] cursor-pointer"
        aria-label={t("language.label")}
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
      {/* chevron icon */}
      <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400" aria-hidden="true">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
  );
}
