import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "../context/LanguageContext";

export default function Testimonials({ data }) {
  const { t } = useLanguage();
  const content = data || t.testimonials;
  const testimonials = content.items;
  const [testiIndex, setTestiIndex] = useState(0);

  useEffect(() => {
    // Reset to the first slide whenever the language (and therefore the
    // testimonial list) changes, so we never point past the array length.
    setTestiIndex(0);
  }, [t.code]);

  const nextTesti = useCallback(() => {
    setTestiIndex((i) => (i + 1) % testimonials.length);
  }, [testimonials.length]);
  const prevTesti = useCallback(() => {
    setTestiIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const id = setInterval(nextTesti, 6000);
    return () => clearInterval(id);
  }, [nextTesti]);

  const current = testimonials[testiIndex];

  return (
    <section className="py-24" style={{ background: "var(--ink)", color: "var(--ivory)" }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <div className="hn-eyebrow mb-3" style={{ color: "var(--gold)" }}>{content.eyebrow}</div>
          <h2 className="hn-display text-3xl md:text-4xl font-semibold mb-12">
            {content.title}
          </h2>
        </Reveal>

        <div className="hn-glass-panel relative min-h-[220px] flex flex-col items-center justify-center px-6 py-10 md:px-12 md:py-12">
          <Quote size={32} style={{ color: "var(--gold)" }} className="mb-4" />
          <p
            key={testiIndex}
            className="hn-testimonial-quote hn-display text-xl md:text-2xl font-medium leading-relaxed mb-6"
          >
            "{current.quote}"
          </p>
          <div className="text-sm">
            <span className="font-semibold">{current.name}</span>
            <span style={{ color: "rgba(255,249,238,0.6)" }}> — {current.role}</span>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={prevTesti}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ border: "1px solid rgba(255,249,238,0.3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,249,238,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestiIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === testiIndex ? 22 : 8,
                    height: 8,
                    background: i === testiIndex ? "var(--gold)" : "rgba(255,249,238,0.3)",
                  }}
                />
              ))}
            </div>
            <button
              onClick={nextTesti}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ border: "1px solid rgba(255,249,238,0.3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,249,238,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
