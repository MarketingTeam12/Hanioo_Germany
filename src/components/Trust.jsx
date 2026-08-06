import React from "react";
import Reveal from "./Reveal";
import { TRUST_ICONS } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

export default function Trust() {
  const { t } = useLanguage();
  const trust = t.trust;

  return (
    <section className="py-24" style={{ background: "var(--panel)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="hn-eyebrow mb-3">{trust.eyebrow}</div>
          <h2 className="hn-display text-3xl md:text-4xl font-semibold mb-4 max-w-xl">
            {trust.title}
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {trust.items.map((item, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <Reveal key={item.title} delay={i * 100}>
                <div className="hn-card rounded-2xl p-6 h-full">
                  <div className="hn-icon-badge mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
