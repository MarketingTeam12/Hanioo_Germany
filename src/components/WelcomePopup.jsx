import React, { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { usePopup } from "../context/PopupContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-\s]{7,15}$/;

// Web3Forms — sends the popup submission straight to the site's inbox
// without needing a custom backend. Get/replace the key at web3forms.com.
const WEB3FORMS_ACCESS_KEY = "535134e3-b468-4ab4-b816-62148c1be5a5";

export default function WelcomePopup() {
  const { t } = useLanguage();
  const { open, closePopup } = usePopup();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [values, setValues] = useState({ name: "", contact: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = t.popup.errors.name;
    if (!values.contact.trim() || !PHONE_RE.test(values.contact.trim())) next.contact = t.popup.errors.contact;
    if (!values.email.trim() || !EMAIL_RE.test(values.email.trim())) next.email = t.popup.errors.email;
    if (!values.message.trim()) next.message = t.popup.errors.message;
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
          subject: "New enquiry from Hanioo website (popup)",
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
        setSubmitError(t.popup.sendError);
      }
    } catch (err) {
      setSubmitError(t.popup.sendError);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    closePopup();
    // Reset so the next time it's opened (e.g. via a "Book an interpreter"
    // button) it starts on a clean form instead of the success screen.
    window.setTimeout(() => {
      setSubmitted(false);
      setSubmitError("");
      setValues({ name: "", contact: "", email: "", message: "" });
      setErrors({});
    }, 300);
  };

  if (!open) return null;

  return (
    <div className="hn-popup-overlay" role="dialog" aria-modal="true">
      <div className="hn-popup-card">
        <button className="hn-popup-close" onClick={handleClose} aria-label={t.popup.close}>
          <X size={20} />
        </button>

        {submitted ? (
          <div className="hn-popup-success">
            <CheckCircle2 size={40} style={{ color: "var(--saffron)", margin: "0 auto 12px" }} />
            <h3 className="hn-display text-xl font-semibold mb-2">{t.popup.success}</h3>
            <button className="hn-btn-primary px-6 py-2 rounded-full font-semibold mt-4" onClick={handleClose}>
              {t.popup.close}
            </button>
          </div>
        ) : (
          <>
            <div className="hn-popup-brand">
              <img src="/hanioo-logo-lockup.png" alt="Hanioo logo" className="hn-logo-icon w-64 h-auto object-contain" />
              {/* <span className="hn-display font-semibold">Hanioo</span> */}
            </div>
            <h3 className="hn-display text-2xl font-semibold mb-2">{t.popup.title}</h3>
            <p className="text-sm mb-6" style={{ color: "var(--ink-soft)" }}>
              {t.popup.subtitle}
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className={`hn-field ${errors.name ? "has-error" : ""}`}>
                <label htmlFor="hn-name">{t.popup.name}</label>
                <input
                  id="hn-name"
                  type="text"
                  placeholder={t.popup.namePh}
                  value={values.name}
                  onChange={handleChange("name")}
                />
                {errors.name && <div className="hn-field-error">{errors.name}</div>}
              </div>

              <div className={`hn-field ${errors.contact ? "has-error" : ""}`}>
                <label htmlFor="hn-contact">{t.popup.contact}</label>
                <input
                  id="hn-contact"
                  type="tel"
                  placeholder={t.popup.contactPh}
                  value={values.contact}
                  onChange={handleChange("contact")}
                />
                {errors.contact && <div className="hn-field-error">{errors.contact}</div>}
              </div>

              <div className={`hn-field ${errors.email ? "has-error" : ""}`}>
                <label htmlFor="hn-email">{t.popup.email}</label>
                <input
                  id="hn-email"
                  type="email"
                  placeholder={t.popup.emailPh}
                  value={values.email}
                  onChange={handleChange("email")}
                />
                {errors.email && <div className="hn-field-error">{errors.email}</div>}
              </div>

              <div className={`hn-field ${errors.message ? "has-error" : ""}`}>
                <label htmlFor="hn-message">{t.popup.message}</label>
                <textarea
                  id="hn-message"
                  rows={4}
                  placeholder={t.popup.messagePh}
                  value={values.message}
                  onChange={handleChange("message")}
                />
                {errors.message && <div className="hn-field-error">{errors.message}</div>}
              </div>

              {submitError && <div className="hn-field-error mb-2">{submitError}</div>}

              <button
                type="submit"
                className="hn-btn-primary w-full py-3 rounded-full font-semibold mt-2"
                disabled={submitting}
                style={submitting ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
              >
                {submitting ? t.popup.sending : t.popup.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
