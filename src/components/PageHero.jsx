import React from "react";
import Reveal from "./Reveal";

// Shared banner used at the top of every standalone page (About, Service,
// How It Works, Contact) so the multi-page site still feels like one theme.
export default function PageHero({ eyebrow, title, intro }) {
  return (
    <section className="hn-page-hero px-6 pt-20 pb-16 md:pt-28 md:pb-20 text-center">
      <div className="hn-pattern-bg" />
      <div className="hn-glow" style={{ width: 320, height: 320, background: "var(--gold)", top: -100, left: "10%" }} />
      <div className="hn-glow" style={{ width: 280, height: 280, background: "var(--forest)", bottom: -120, right: "8%" }} />
      <div className="relative z-10 max-w-2xl mx-auto">
        <Reveal>
          <div className="hn-eyebrow mb-4" style={{ color: "var(--gold)",fontSize:"15px" }}>{eyebrow}</div>
          <h1 className="hn-display text-3xl md:text-5xl font-semibold mb-6 leading-tight">{title}</h1>
          <div className="hn-ribbon mx-auto mb-6" />
          {intro && (
            <p className="text-base md:text-lg" style={{ color: "rgba(255,249,238,0.88)" }}>
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
