import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Reveal from "../components/Reveal";
import CTA from "../components/CTA";
import { SERVICE_ICONS } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import { usePopup } from "../context/PopupContext";

export default function ServiceDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const { openPopup } = usePopup();
  const offerings = t.pages.service.offerings;

  const index = offerings.items.findIndex((item) => item.slug === slug);
  if (index === -1) {
    return <Navigate to="/service" replace />;
  }

  const item = offerings.items[index];
  const Icon = SERVICE_ICONS[index];

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-4">
        <Link
          to="/service"
          className="hn-service-card-link inline-flex items-center gap-2 text-sm font-semibold"
        >
          <ArrowLeft size={16} /> {offerings.backToServices}
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="hn-service-detail-img rounded-3xl overflow-hidden">
            <img src={item.image} alt={item.alt} />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="hn-icon-badge mb-5">
            <Icon size={22} />
          </div>
          <h1 className="hn-display text-3xl md:text-4xl font-semibold mb-4">{item.title}</h1>
          <p className="text-base mb-4" style={{ color: "var(--ink-soft)" }}>
            {item.text}
          </p>
          <p className="text-base mb-8" style={{ color: "var(--ink-soft)" }}>
            {item.detail}
          </p>

          <button
            className="hn-btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold"
            onClick={openPopup}
          >
            {t.hero.bookBtn} <ArrowRight size={18} />
          </button>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <Reveal>
          <h2 className="hn-display text-xl font-semibold mb-6">{offerings.highlightsHeading}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {item.highlights.map((h) => (
              <div key={h} className="flex items-start gap-3 hn-card rounded-2xl p-5">
                <CheckCircle2 size={18} style={{ color: "var(--saffron)", flexShrink: 0, marginTop: 2 }} />
                <span className="text-sm" style={{ color: "var(--ink-soft)" }}>
                  {h}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <CTA />
    </>
  );
}
