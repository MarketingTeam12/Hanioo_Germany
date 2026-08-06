import React from "react";
import Hero from "../components/Hero";
import StatsMarquee from "../components/StatsMarquee";
import HowItWorks from "../components/HowItWorks";
import Languages from "../components/Languages";
import ForYou from "../components/ForYou";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const home = t.home;

  return (
    <>
      <Hero />
      <StatsMarquee stats={home.stats} />
      <HowItWorks steps={home.steps} />
      <Languages />
      <ForYou data={home.forYou} />
      <Testimonials data={home.testimonials} />
      <CTA data={home.cta} />
    </>
  );
}
