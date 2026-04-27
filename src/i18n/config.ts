export const locales = ['en', 'fr', 'es', 'de', 'zh', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  zh: '中文',
  ar: 'العربية',
};

// RTL languages
export const rtlLocales: Locale[] = ['ar'];
