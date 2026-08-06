import React from "react";
import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import { STEP_ICONS } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

export default function HowItWorks({ compact = false, steps: stepsProp }) {
  const { t } = useLanguage();
  const steps = stepsProp || t.steps;

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <Reveal>
        <div className="hn-eyebrow mb-3">{steps.eyebrow}</div>
        <h2 className="hn-display text-3xl md:text-4xl font-semibold mb-4 max-w-xl">
          {steps.title}
        </h2>
      </Reveal>

      <div className="hn-timeline mt-16">
        {steps.items.map((step, i) => {
          const Icon = STEP_ICONS[i];
          const side = i % 2 === 0 ? "left" : "right";
          return (
            <Reveal key={step.n} delay={i * 120}>
              <div className={`hn-timeline-row hn-timeline-row-${side}`}>
                <div className="hn-timeline-node">
                  <span className="hn-timeline-node-inner">
                    <Icon size={20} />
                  </span>
                </div>

                <div className="hn-timeline-card">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="hn-display text-2xl font-semibold"
                      style={{ color: "var(--gold-soft)", WebkitTextStroke: "1.5px var(--maroon)" }}
                    >
                      {step.n}
                    </span>
                    {step.duration && (
                      <span className="hn-duration-chip">{step.duration}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                    {step.text}
                  </p>
                  {step.badges && step.badges.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mt-5">
                      {step.badges.map((b) => (
                        <li key={b} className="hn-step-pill">
                          <CheckCircle2 size={13} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
