import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// Landed on after a successful Zoho CRM lead submission (see returnURL in
// ZohoLeadForm.jsx). Zoho does a full-page redirect here, outside of React
// Router's client-side navigation, so the SPA just needs to serve this route.
export default function ThankYou() {
  const { t } = useLanguage();

  return (
    <section className="max-w-2xl mx-auto px-6 py-28 text-center">
      <CheckCircle2 size={48} style={{ color: "var(--saffron)", margin: "0 auto 20px" }} />
      <h1 className="hn-display text-3xl md:text-4xl font-semibold mb-4">{t.popup.success}</h1>
      <p className="text-base mb-8" style={{ color: "var(--ink-soft)" }}>
        {t.pages.contact.intro}
      </p>
      <Link to="/" className="hn-btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold">
        {t.nav.home}
      </Link>
    </section>
  );
}
