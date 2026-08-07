import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import ZohoLeadForm from "../components/ZohoLeadForm";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const contact = t.pages.contact;

  return (
    <>
      <PageHero eyebrow={contact.eyebrow} title={contact.title} intro={contact.intro} />

      <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-5 gap-12">
        <Reveal className="md:col-span-2">
          <div className="hn-card rounded-2xl p-8">
            <h3 className="hn-display text-xl font-semibold mb-5">{contact.eyebrow}</h3>
            <div className="space-y-4 text-sm" style={{ color: "var(--ink-soft)" }}>
              <div className="flex items-center gap-3">
                <div className="hn-icon-badge" style={{ width: 36, height: 36 }}>
                  <Mail size={16} />
                </div>
                hello@hanioo.com
              </div>
              <div className="flex items-center gap-3">
                <div className="hn-icon-badge" style={{ width: 36, height: 36 }}>
                  <Phone size={16} />
                </div>
                +49 30 1234 5678
              </div>
              <div className="flex items-center gap-3">
                <div className="hn-icon-badge" style={{ width: 36, height: 36 }}>
                  <MapPin size={16} />
                </div>
                Berlin, Deutschland
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="md:col-span-3" delay={100}>
          <div className="hn-card rounded-2xl p-8">
            <ZohoLeadForm />
          </div>
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <Reveal>
          <div className="hn-contact-map">
            <iframe
              title="Hanioo location on map"
              src="https://maps.google.com/maps?q=Berlin%2C%20Deutschland&t=&z=12&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
