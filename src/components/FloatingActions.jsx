import React from "react";
import { MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// Update these two once — every button below reads from them.
const WHATSAPP_NUMBER = "94112345678"; // digits only, country code first, no + or spaces
const PHONE_NUMBER = "+94 11 234 5678";
const PHONE_TEL_HREF = `tel:${PHONE_NUMBER.replace(/\s+/g, "")}`;

export default function FloatingActions() {
  const { t } = useLanguage();
  const fa = t.floatingActions;

  return (
    <div className="hn-float-stack" aria-label={fa.groupLabel}>
      <a
        className="hn-float-btn hn-float-whatsapp"
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={fa.whatsapp}
        title={fa.whatsapp}
      >
        <MessageCircle size={22} />
      </a>

      <a
        className="hn-float-btn hn-float-call"
        href={PHONE_TEL_HREF}
        aria-label={fa.call}
        title={fa.call}
      >
        <Phone size={20} />
      </a>
    </div>
  );
}
