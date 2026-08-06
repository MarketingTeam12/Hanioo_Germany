import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function StatsMarquee({ stats: statsProp }) {
  const { t } = useLanguage();
  const stats = statsProp || t.stats;

  return (
    <section
      className="py-6 overflow-hidden"
      style={{ background: "var(--ink)", color: "var(--ivory)" }}
    >
      <div className="hn-marquee-track">
        {[...stats, ...stats].map((s, i) => (
          <div key={i} className="flex items-center gap-3 whitespace-nowrap">
            <span className="hn-display text-2xl font-semibold" style={{ color: "var(--gold)" }}>
              {s.value}
            </span>
            <span className="text-sm" style={{ color: "rgba(255,249,238,0.75)" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
