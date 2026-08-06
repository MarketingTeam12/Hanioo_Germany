import React from "react";
import PageHero from "../components/PageHero";
import ServiceOfferings from "../components/ServiceOfferings";
import ForYou from "../components/ForYou";
import CTA from "../components/CTA";
import { useLanguage } from "../context/LanguageContext";

export default function Service() {
  const { t } = useLanguage();
  const service = t.pages.service;

  return (
    <>
      <PageHero eyebrow={service.eyebrow} title={service.title} intro={service.intro} />
      <ServiceOfferings />
      <ForYou />
      <CTA />
    </>
  );
}
