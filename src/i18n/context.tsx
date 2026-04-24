"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Locale, defaultLocale, locales, rtlLocales } from "./config";

type Messages = Record<string, Record<string, string>>;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const messageCache: Partial<Record<Locale, Messages>> = {};

async function loadMessages(locale: Locale): Promise<Messages> {
  if (messageCache[locale]) return messageCache[locale]!;
  const mod = await import(`./locales/${locale}.json`);
  messageCache[locale] = mod.default as Messages;
  return messageCache[locale]!;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Messages>({});

  useEffect(() => {
    const saved = localStorage.getItem("swaptrade_locale") as Locale | null;
    const initial = saved && locales.includes(saved) ? saved : defaultLocale;
    setLocaleState(initial);
  }, []);

  useEffect(() => {
    loadMessages(locale).then(setMessages);
    localStorage.setItem("swaptrade_locale", locale);
    // Set dir attribute for RTL support
    document.documentElement.setAttribute(
      "dir",
      rtlLocales.includes(locale) ? "rtl" : "ltr"
    );
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const [namespace, ...rest] = key.split(".");
      const msgKey = rest.join(".");
      const ns = messages[namespace];
      let value = ns?.[msgKey] ?? key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          value = value.replace(`{${k}}`, String(v));
        });
      }
      return value;
    },
    [messages]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
