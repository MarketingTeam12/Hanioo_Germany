import React from "react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using Hanioo's website, app, or interpreter/translation services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.",
  },
  {
    title: "2. Our Services",
    body: "Hanioo connects users with independent interpreters and translators for on-demand and scheduled language support. We make reasonable efforts to ensure quality and availability but do not guarantee uninterrupted or error-free service at all times.",
  },
  {
    title: "3. Bookings & Cancellations",
    body: "Cancellation windows and any applicable refunds are shown clearly at the time of booking, before payment, so you know the terms up front. Refund eligibility is determined by the policy displayed at booking.",
  },
  {
    title: "4. User Responsibilities",
    body: "You agree to provide accurate information when using our forms and services, to use the platform lawfully, and not to misuse, disrupt, or attempt unauthorised access to our systems.",
  },
  {
    title: "5. Payments",
    body: "Prices for services are displayed at the time of booking. Payment terms, applicable taxes, and any additional fees will be communicated clearly before you confirm a booking.",
  },
  {
    title: "6. Limitation of Liability",
    body: "To the maximum extent permitted by law, Hanioo is not liable for indirect, incidental, or consequential damages arising from the use of our services, except where such liability cannot be excluded by law.",
  },
  {
    title: "7. Changes to These Terms",
    body: "We may update these Terms from time to time. Continued use of our services after changes are posted constitutes acceptance of the revised Terms.",
  },
  {
    title: "8. Contact Us",
    body: "For questions about these Terms of Service, please reach out to us via the Contact page.",
  },
];

export default function TermsOfService() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" />
      <section className="max-w-3xl mx-auto px-6 py-20">
        <Reveal>
          <p className="text-sm mb-10" style={{ color: "var(--ink-soft)" }}>
            Last updated: August 2026. Please note this is placeholder policy text — replace it with content reviewed by your legal counsel before going live.
          </p>
        </Reveal>
        {SECTIONS.map((s, i) => (
          <Reveal key={s.title} delay={i * 60}>
            <div className="mb-8">
              <h2 className="hn-display text-xl font-semibold mb-2">{s.title}</h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>{s.body}</p>
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
