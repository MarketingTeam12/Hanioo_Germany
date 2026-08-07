import React, { useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

// Zoho CRM "Web to Lead" form (HANIOO GERMAN POPUP form, id 588346000042156002).
// Submits as a real HTML form POST straight to Zoho — this endpoint does not
// support fetch/AJAX from the browser, so on successful validation the form
// is left to submit natively and the browser is redirected to `returnURL`.
const ZOHO_ACTION = "https://crm.zoho.in/crm/WebToLeadForm";
const ZOHO_FORM_ID = "WebToLeads588346000042156002";
const RECAPTCHA_SITE_KEY = "6LfWlnktAAAAADyz6F2gjwFCyVKLmtSV6cQMtjvM";

// Maps a route path to a human-readable page name so Zoho CRM shows exactly
// which page a lead was submitted from (e.g. "About", "Contact").
function pageNameFromPath(pathname) {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/about")) return "About";
  if (pathname.startsWith("/service/")) return `Service Detail (${pathname.split("/service/")[1]})`;
  if (pathname.startsWith("/service")) return "Service";
  if (pathname.startsWith("/how-it-works")) return "How It Works";
  if (pathname.startsWith("/contact")) return "Contact";
  return pathname;
}

export default function ZohoLeadForm() {
  const { t } = useLanguage();
  const p = t.popup;
  const uid = useId();
  const location = useLocation();
  const sourcePage = pageNameFromPath(location.pathname);

  const formRef = useRef(null);
  const recaptchaBoxRef = useRef(null);
  const widgetIdRef = useRef(null);

  const [values, setValues] = useState({ name: "", contact: "", city: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [captchaOk, setCaptchaOk] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const PHONE_RE = /^[0-9+()\-\s]{7,15}$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Render the Google reCAPTCHA widget once the api.js script (loaded in
  // index.html) is ready. Polls briefly since script load order can vary.
  useEffect(() => {
    let cancelled = false;

    const tryRender = () => {
      if (cancelled) return;
      if (window.grecaptcha && window.grecaptcha.render && recaptchaBoxRef.current && widgetIdRef.current === null) {
        widgetIdRef.current = window.grecaptcha.render(recaptchaBoxRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
          theme: "light",
          callback: () => setCaptchaOk(true),
          "expired-callback": () => setCaptchaOk(false),
        });
      } else if (!cancelled) {
        setTimeout(tryRender, 300);
      }
    };

    tryRender();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = p.errors.name;
    if (!values.contact.trim() || !PHONE_RE.test(values.contact.trim())) next.contact = p.errors.contact;
    if (!values.city.trim()) next.city = p.errors.city;
    if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) next.email = p.errors.email;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    if (!validate()) {
      e.preventDefault();
      return;
    }
    if (!captchaOk) {
      e.preventDefault();
      setErrors((er) => ({ ...er, captcha: p.errors.captchaMissing || "Please complete the captcha." }));
      return;
    }
    // Validation passed — let the browser submit the form natively to Zoho.
    // IMPORTANT: do NOT unmount the form here (e.g. via setSubmitted swapping
    // the JSX to a success view). The native POST is still in-flight at this
    // point, and if React removes the <form> node from the DOM before the
    // browser finishes submitting it, the browser cancels the submission
    // outright ("Form submission canceled because the form is not
    // connected"), so Zoho never receives the lead. Only disable the button;
    // the browser will navigate away to `returnURL` on success.
    setSubmitting(true);
  };

  return (
    <form
      ref={formRef}
      action={ZOHO_ACTION}
      name={ZOHO_FORM_ID}
      method="POST"
      acceptCharset="UTF-8"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Required Zoho hidden fields — do not remove */}
      <input type="text" style={{ display: "none" }} name="xnQsjsdp" value="f22644c6120816db603b86c78fdffa9d4b995792f245a85ffff3f5402faae154" readOnly />
      <input type="hidden" name="zc_gad" value="" readOnly />
      <input
        type="text"
        style={{ display: "none" }}
        name="xmIwtLD"
        value="11f84162bc158ebebc0a7ebd805eb2c178ace5f27e33947d4fb2f4ff172642474da623a5969cc90a45e064843ad4ee8a"
        readOnly
      />
      <input type="text" style={{ display: "none" }} name="actionType" value="TGVhZHM=" readOnly />
      <input type="text" style={{ display: "none" }} name="returnURL" value="https://hanioo.de/thank-you" readOnly />
      <input type="hidden" name="Lead Source" value="Website" readOnly />
      <input type="hidden" name="LEADCF39" value={sourcePage} readOnly />
      <input type="hidden" name="LEADCF29" value="." readOnly />
      {/* Honeypot — must stay empty */}
      <input type="text" style={{ display: "none" }} name="aG9uZXlwb3Q" defaultValue="" tabIndex={-1} autoComplete="off" />

      <div className={`hn-field ${errors.name ? "has-error" : ""}`}>
        <label htmlFor={`${uid}-name`}>{p.name}</label>
        <input
          id={`${uid}-name`}
          type="text"
          name="Last Name"
          maxLength={80}
          placeholder={p.namePh}
          value={values.name}
          onChange={handleChange("name")}
        />
        {errors.name && <div className="hn-field-error">{errors.name}</div>}
      </div>

      <div className={`hn-field ${errors.contact ? "has-error" : ""}`}>
        <label htmlFor={`${uid}-contact`}>{p.contact}</label>
        <input
          id={`${uid}-contact`}
          type="tel"
          name="Mobile"
          maxLength={30}
          placeholder={p.contactPh}
          value={values.contact}
          onChange={handleChange("contact")}
        />
        {errors.contact && <div className="hn-field-error">{errors.contact}</div>}
      </div>

      <div className={`hn-field ${errors.city ? "has-error" : ""}`}>
        <label htmlFor={`${uid}-city`}>{p.city}</label>
        <input
          id={`${uid}-city`}
          type="text"
          name="City"
          maxLength={100}
          placeholder={p.cityPh}
          value={values.city}
          onChange={handleChange("city")}
        />
        {errors.city && <div className="hn-field-error">{errors.city}</div>}
      </div>

      <div className={`hn-field ${errors.email ? "has-error" : ""}`}>
        <label htmlFor={`${uid}-email`}>{p.email}</label>
        <input
          id={`${uid}-email`}
          type="email"
          name="Email"
          maxLength={100}
          placeholder={p.emailPh}
          value={values.email}
          onChange={handleChange("email")}
        />
        {errors.email && <div className="hn-field-error">{errors.email}</div>}
      </div>

      <div className={`hn-field ${errors.message ? "has-error" : ""}`}>
        <label htmlFor={`${uid}-message`}>{p.message}</label>
        <textarea
          id={`${uid}-message`}
          name="Description"
          rows={2}
          placeholder={p.messagePh}
          value={values.message}
          onChange={handleChange("message")}
        />
      </div>

      <div className="hn-field" style={{ marginBottom: "8px" }}>
        <div ref={recaptchaBoxRef} />
        {errors.captcha && <div className="hn-field-error">{errors.captcha}</div>}
      </div>

      <button
        type="submit"
        className="hn-btn-primary w-full py-2 rounded-full font-semibold mt-1"
        disabled={submitting}
        style={submitting ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
      >
        {submitting ? p.sending : p.submit}
      </button>
    </form>
  );
}
