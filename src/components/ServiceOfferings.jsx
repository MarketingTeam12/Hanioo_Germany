import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { SERVICE_ICONS } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

export default function ServiceOfferings() {
  const { t } = useLanguage();
  const offerings = t.pages.service.offerings;

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <Reveal>
        <div className="hn-eyebrow mb-3">{offerings.eyebrow}</div>
        <h2 className="hn-display text-3xl md:text-4xl font-semibold mb-12 max-w-xl">
          {offerings.title}
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-8">
        {offerings.items.map((item, i) => {
          const Icon = SERVICE_ICONS[i];
          return (
            <Reveal key={item.slug} delay={i * 100}>
              <div className="hn-service-card rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="hn-service-card-img">
                  <img src={item.image} alt={item.alt} loading="lazy" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="hn-icon-badge mb-3">
                    <Icon size={18} />
                  </div>
                  <h3 className="hn-display text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm mb-4 flex-1" style={{ color: "var(--ink-soft)" }}>
                    {item.text}
                  </p>

                  <Link
                    to={`/service/${item.slug}`}
                    className="hn-service-card-link inline-flex items-center gap-1 text-sm font-semibold mt-auto self-start"
                  >
                    {offerings.learnMore} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
