import React from "react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Trust from "../components/Trust";
import StatsMarquee from "../components/StatsMarquee";
import CTA from "../components/CTA";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const about = t.pages.about;

  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.title} />
      <StatsMarquee />
      <section className="max-w-3xl mx-auto px-6 py-20">
        <Reveal>
          <p className="text-lg mb-6" style={{ color: "var(--ink-soft)" }}>{about.intro}</p>
          <p className="text-lg" style={{ color: "var(--ink-soft)" }}>{about.intro2}</p>
        </Reveal>
      </section>
      <Trust />
      <CTA />
    </>
  );
}
