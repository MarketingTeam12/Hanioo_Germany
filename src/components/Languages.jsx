import React from "react";
import { Globe2 } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "../context/LanguageContext";

// Flags are shown as emoji so no extra image assets are needed — they
// render as full-color flag glyphs on nearly every modern OS/browser.
// Each entry has an English and German label; the German label is shown
// whenever the site's language (set via the navbar) is German — this
// list itself is just a display of services, not a language switcher.
const LANGUAGES = [
  { flag: "🇬🇧", en: "English Translation", de: "Englisch Übersetzung" },
  { flag: "🇸🇦", en: "Arabic Translation", de: "Arabisch Übersetzung" },
  { flag: "🇷🇺", en: "Russian Translation", de: "Russisch Übersetzung" },
  { flag: "🇵🇹", en: "Portuguese Translation", de: "Portugiesisch Übersetzung" },
  { flag: "🇫🇷", en: "French Translation", de: "Französisch Übersetzung" },
  { flag: "🇧🇬", en: "Bulgarian Translation", de: "Bulgarisch Übersetzung" },
  { flag: "🇪🇸", en: "Spanish Translation", de: "Spanisch Übersetzung" },
  { flag: "🇹🇷", en: "Turkish Translation", de: "Türkisch Übersetzung" },
  { flag: "🇳🇱", en: "Dutch Translation", de: "Niederländisch Übersetzung" },
  { flag: "🇮🇳", en: "Hindi Translation", de: "Hindi Übersetzung" },
  { flag: "🇵🇰", en: "Urdu Translation", de: "Urdu Übersetzung" },
  { flag: "🇮🇳", en: "Malayalam Translation", de: "Malayalam Übersetzung" },
  { flag: "🇨🇳", en: "Chinese Translation", de: "Chinesisch Übersetzung" },
  { flag: "🇩🇪", en: "German Translation", de: "Deutsch Übersetzung" },
];

export default function Languages({ data: dataProp }) {
  const { t, lang } = useLanguage();
  const data = dataProp || t.home.languages;
  const moreLabel = lang === "de" ? "200+ Sprachen Übersetzung" : "200+ Languages Translation";

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <Reveal>
        <div className="hn-eyebrow mb-3">{data.eyebrow}</div>
        <h2 className="hn-display text-3xl md:text-4xl font-semibold mb-4 max-w-xl">
          {data.title}
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {LANGUAGES.map((item, i) => (
          <Reveal key={item.en} delay={i * 40}>
            <button type="button" className="hn-lang-pill">
              <span className="hn-lang-pill-flag" aria-hidden="true">{item.flag}</span>
              <span className="hn-lang-pill-name">{lang === "de" ? item.de : item.en}</span>
            </button>
          </Reveal>
        ))}
        <Reveal delay={LANGUAGES.length * 40}>
          <button type="button" className="hn-lang-pill">
            <span className="hn-lang-pill-flag hn-lang-pill-globe" aria-hidden="true">
              <Globe2 size={18} />
            </span>
            <span className="hn-lang-pill-name">{moreLabel}</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
