import React from "react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

const SECTIONS = [
  {
    title: "1. Introduction",
    body: "Hanioo (\"we\", \"us\", \"our\") provides on-demand interpreter and translation services. This Privacy Policy explains what personal data we collect, why we collect it, and how it is used, stored, and protected when you use our website or app.",
  },
  {
    title: "2. Information We Collect",
    body: "We may collect information you provide directly (name, phone number, email address, city, and any message you send us via forms such as the popup or contact page), as well as technical information collected automatically (device/browser type, IP address, and usage data) to help us operate and improve the service.",
  },
  {
    title: "3. How We Use Your Information",
    body: "We use the information we collect to respond to enquiries, connect you with an interpreter, process bookings, send service-related communications, improve our platform, and comply with legal obligations. We do not sell your personal data to third parties.",
  },
  {
    title: "4. Data Sharing",
    body: "We may share information with trusted service providers who help us operate (for example, our CRM provider) strictly for the purpose of delivering our services, and only to the extent necessary. We may also disclose information where required by law.",
  },
  {
    title: "5. Data Retention & Security",
    body: "We retain personal data only for as long as necessary to fulfil the purposes described in this policy or as required by law, and we take reasonable technical and organisational measures to protect it against unauthorised access, loss, or misuse.",
  },
  {
    title: "6. Your Rights",
    body: "Depending on your location, you may have the right to access, correct, or request deletion of your personal data, and to object to or restrict certain processing. To exercise these rights, please contact us using the details below.",
  },
  {
    title: "7. Contact Us",
    body: "If you have any questions about this Privacy Policy or how your data is handled, please reach out to us via the Contact page.",
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
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
