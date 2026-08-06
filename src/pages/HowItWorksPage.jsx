import React from "react";
import PageHero from "../components/PageHero";
import HowItWorks from "../components/HowItWorks";
import HowItWorksVideo from "../components/HowItWorksVideo";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import { useLanguage } from "../context/LanguageContext";

export default function HowItWorksPage() {
  const { t } = useLanguage();
  const howItWorks = t.pages.howItWorks;

  return (
    <>
      <PageHero eyebrow={howItWorks.eyebrow} title={howItWorks.title} intro={howItWorks.intro} />
      <div className="max-w-6xl mx-auto px-6 -mb-6">
        <HowItWorksVideo />
      </div>
      <HowItWorks steps={howItWorks.steps} />
      <FAQ />
      <Testimonials />
      <CTA />
    </>
  );
}
