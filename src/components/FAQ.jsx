import React, { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "../context/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();
  const faq = t.pages.howItWorks.faq;
  const [openIndex, setOpenIndex] = useState(0);

  if (!faq) return null;

  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <Reveal>
        <div className="hn-eyebrow mb-3 justify-center flex">{faq.eyebrow}</div>
        <h2 className="hn-display text-3xl md:text-4xl font-semibold mb-12 text-center">
          {faq.title}
        </h2>
      </Reveal>

      <div className="flex flex-col gap-3">
        {faq.items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal key={item.q} delay={i * 60}>
              <div className={`hn-faq-item rounded-2xl ${isOpen ? "open" : ""}`}>
                <button
                  className="hn-faq-question"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <Plus size={18} className="hn-faq-icon flex-shrink-0" />
                </button>
                <div className="hn-faq-answer-wrap">
                  <p className="hn-faq-answer">{item.a}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
