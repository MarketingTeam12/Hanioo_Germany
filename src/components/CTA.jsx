import React from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "../context/LanguageContext";
import { usePopup } from "../context/PopupContext";

export default function CTA({ data }) {
  const { t } = useLanguage();
  const { openPopup } = usePopup();
  const cta = data || t.cta;

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <Reveal>
        <div
          className="rounded-3xl px-8 py-16 md:p-16 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--maroon), var(--maroon-deep))" }}
        >
          <div className="hn-glow" style={{ width: 300, height: 300, background: "var(--gold)", top: -100, right: -60 }} />
          <div className="relative z-10">
            <h2 className="hn-display text-3xl md:text-5xl font-semibold mb-4" style={{ color: "var(--ivory)" }}>
              {cta.title}
            </h2>
            <p className="max-w-lg mx-auto mb-8" style={{ color: "rgba(255,249,238,0.85)" }}>
              {cta.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                className="px-6 py-3 rounded-full font-semibold flex items-center gap-2"
                style={{ background: "var(--gold)", color: "#FFFFFF" }}
                onClick={openPopup}
              >
                {cta.bookBtn} <ArrowRight size={18} />
              </button>
              <button
                className="px-6 py-3 rounded-full font-semibold border"
                style={{ borderColor: "rgba(255,249,238,0.5)", color: "var(--ivory)" }}
              >
                {cta.joinBtn}
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
