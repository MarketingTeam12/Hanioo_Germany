import React, { createContext, useContext, useEffect, useState } from "react";
import { TRANSLATIONS, LANG_STORAGE_KEY } from "../data/translations";

const LanguageContext = createContext(null);

function getInitialLang() {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (saved && TRANSLATIONS[saved]) return saved;
  } catch (e) {
    // localStorage may be unavailable (privacy mode, etc.) — fall back silently.
  }
  return "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  const setLang = (next) => {
    if (!TRANSLATIONS[next]) return;
    setLangState(next);
  };

  useEffect(() => {
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      // ignore if storage isn't available
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "de" ? "de" : "en";
    }
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: TRANSLATIONS[lang],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
