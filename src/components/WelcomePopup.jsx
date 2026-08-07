import React from "react";
import { X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { usePopup } from "../context/PopupContext";
import ZohoLeadForm from "./ZohoLeadForm";

export default function WelcomePopup() {
  const { t } = useLanguage();
  const { open, closePopup } = usePopup();

  if (!open) return null;

  return (
    <div className="hn-popup-overlay" role="dialog" aria-modal="true">
      <div className="hn-popup-card">
        <button className="hn-popup-close" onClick={closePopup} aria-label={t.popup.close}>
          <X size={20} />
        </button>

        <div className="hn-popup-brand" style={{ marginBottom: 8 }}>
          <img src="/hanioo-logo-lockup-cropped.png" alt="Hanioo logo" className="hn-logo-icon w-56 h-auto object-contain" />
        </div>
        <h3 className="hn-display text-lg font-semibold mb-1">{t.popup.title}</h3>
        <p className="text-xs mb-2" style={{ color: "var(--ink-soft)" }}>
          {t.popup.subtitle}
        </p>

        <ZohoLeadForm />
      </div>
    </div>
  );
}
