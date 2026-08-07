import React, { useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { useLanguage } from "../context/LanguageContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-\s]{7,15}$/;

// Same Web3Forms key used by the popup form — replace at web3forms.com if needed.
const WEB3FORMS_ACCESS_KEY = "535134e3-b468-4ab4-b816-62148c1be5a5";

export default function Contact() {
  const { t } = useLanguage();
  const contact = t.pages.contact;
  const p = t.popup;

  const [values, setValues] = useState({ name: "", contact: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = p.errors.name;
    if (!values.contact.trim() || !PHONE_RE.test(values.contact.trim())) next.contact = p.errors.contact;
    if (!values.email.trim() || !EMAIL_RE.test(values.email.trim())) next.email = p.errors.email;
    if (!values.message.trim()) next.message = p.errors.message;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New enquiry from Hanioo website (contact page)",
          from_name: "Hanioo website",
          name: values.name,
          contact_number: values.contact,
          email: values.email,
          message: values.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(p.sendError);
      }
    } catch (err) {
      setSubmitError(p.sendError);
    } finally {
      setSubmitting(false);
    }
  };

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
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 size={40} style={{ color: "var(--saffron)", margin: "0 auto 12px" }} />
                <h3 className="hn-display text-xl font-semibold">{p.success}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className={`hn-field ${errors.name ? "has-error" : ""}`}>
                  <label htmlFor="c-name">{p.name}</label>
                  <input id="c-name" type="text" placeholder={p.namePh} value={values.name} onChange={handleChange("name")} />
                  {errors.name && <div className="hn-field-error">{errors.name}</div>}
                </div>

                <div className={`hn-field ${errors.contact ? "has-error" : ""}`}>
                  <label htmlFor="c-contact">{p.contact}</label>
                  <input id="c-contact" type="tel" placeholder={p.contactPh} value={values.contact} onChange={handleChange("contact")} />
                  {errors.contact && <div className="hn-field-error">{errors.contact}</div>}
                </div>

                <div className={`hn-field ${errors.email ? "has-error" : ""}`}>
                  <label htmlFor="c-email">{p.email}</label>
                  <input id="c-email" type="email" placeholder={p.emailPh} value={values.email} onChange={handleChange("email")} />
                  {errors.email && <div className="hn-field-error">{errors.email}</div>}
                </div>

                <div className={`hn-field ${errors.message ? "has-error" : ""}`}>
                  <label htmlFor="c-message">{p.message}</label>
                  <textarea id="c-message" rows={4} placeholder={p.messagePh} value={values.message} onChange={handleChange("message")} />
                  {errors.message && <div className="hn-field-error">{errors.message}</div>}
                </div>

                {submitError && <div className="hn-field-error mb-2">{submitError}</div>}

                <button
                  type="submit"
                  className="hn-btn-primary w-full py-3 rounded-full font-semibold mt-2"
                  disabled={submitting}
                  style={submitting ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
                >
                  {submitting ? p.sending : p.submit}
                </button>
              </form>
            )}
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
