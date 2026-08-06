import React from "react";
import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import { MODE_ICONS } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

export default function Modes() {
  const { t } = useLanguage();
  const modes = t.modes;

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <Reveal>
        <div className="hn-eyebrow mb-3">{modes.eyebrow}</div>
        <h2 className="hn-display text-3xl md:text-4xl font-semibold mb-4 max-w-xl">
          {modes.title}
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {modes.items.map((m, i) => {
          const Icon = MODE_ICONS[i];
          return (
            <Reveal key={m.tag} delay={i * 120}>
              <div
                className="hn-card rounded-3xl p-8 h-full"
                style={{
                  background: i === 0 ? "var(--forest)" : "var(--maroon)",
                  color: "var(--ivory)",
                  borderColor: "transparent",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: "rgba(255,249,238,0.15)" }}
                >
                  <Icon size={22} />
                </div>
                <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>
                  {m.tag}
                </div>
                <h3 className="hn-display text-2xl font-semibold mb-4">{m.title}</h3>
                <ul className="space-y-2">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,249,238,0.9)" }}>
                      <CheckCircle2 size={16} style={{ color: "var(--gold)" }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
