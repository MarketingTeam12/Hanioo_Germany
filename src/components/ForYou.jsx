import React, { useState } from "react";
import Reveal from "./Reveal";
import { CUSTOMER_FEATURE_ICONS, INTERPRETER_FEATURE_ICONS } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

export default function ForYou({ data }) {
  const { t } = useLanguage();
  const [audience, setAudience] = useState("customer");
  const forYou = data || t.forYou;
  const activeFeatures = audience === "customer" ? forYou.customerFeatures : forYou.interpreterFeatures;
  const activeIcons = audience === "customer" ? CUSTOMER_FEATURE_ICONS : INTERPRETER_FEATURE_ICONS;

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="hn-eyebrow mb-3">{forYou.eyebrow}</div>
              <h2 className="hn-display text-3xl md:text-4xl font-semibold max-w-lg">
                {forYou.title}
              </h2>
            </div>
            <div className="flex gap-2 p-1 rounded-full" style={{ background: "rgba(15,27,45,0.035)", border: "1px solid var(--line)" }}>
              <button
                className={`hn-tab-btn px-5 py-2 rounded-full text-sm font-semibold ${audience === "customer" ? "active" : ""}`}
                onClick={() => setAudience("customer")}
              >
                {forYou.customerTab}
              </button>
              <button
                className={`hn-tab-btn px-5 py-2 rounded-full text-sm font-semibold ${audience === "interpreter" ? "active" : ""}`}
                onClick={() => setAudience("interpreter")}
              >
                {forYou.interpreterTab}
              </button>
            </div>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {activeFeatures.map((f, i) => {
            const Icon = activeIcons[i];
            return (
              <Reveal key={f.title} delay={i * 90}>
                <div className="hn-card rounded-2xl p-6 flex gap-4 h-full">
                  <div className="hn-icon-badge">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1.5">{f.title}</h3>
                    <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{f.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
