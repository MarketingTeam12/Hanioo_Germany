import React, { useEffect, useState } from "react";
import { Check, ShieldCheck, ArrowRight, Star, Mic2, CalendarCheck } from "lucide-react";
import { GREETINGS } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import { usePopup } from "../context/PopupContext";

// Steps of the little booking-flow demo that plays inside the phone mockup:
// 0 = match card only, 1 = user message, 2 = "typing…", 3 = interpreter reply,
// 4 = trial call connects. Then it loops back to 0.
const PHONE_STEPS = [900, 1400, 1300, 1600, 2600];

export default function Hero() {
  const [greetIndex, setGreetIndex] = useState(0);
  const [phoneStep, setPhoneStep] = useState(0);
  const { t } = useLanguage();
  const { openPopup } = usePopup();

  useEffect(() => {
    const id = setInterval(() => {
      setGreetIndex((i) => (i + 1) % GREETINGS.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      setPhoneStep((s) => (s + 1) % PHONE_STEPS.length);
    }, PHONE_STEPS[phoneStep]);
    return () => clearTimeout(id);
  }, [phoneStep]);

  return (
    <section className="hn-hero-dark">
      <div className="hn-hero-glow" style={{ width: 460, height: 460, background: "#3B82F6", top: -160, right: -120 }} />
      <div className="hn-hero-glow" style={{ width: 360, height: 360, background: "#0EA5E9", bottom: -140, left: -100 }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="hn-hero-dark-eyebrow mb-4">{t.hero.eyebrow}</div>
          <h1 className="hn-display text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "#FFFFFF" }}>
            {t.hero.sayWord}{" "}
            <span
              className="hn-greeting-wrap inline-block align-bottom"
              style={{ width: `${GREETINGS[greetIndex].word.length + 0.6}ch`, transition: "width 0.4s var(--ease)" }}
            >
              <span key={greetIndex} className="hn-greeting" style={{ color: "#93C5FD" }}>
                {GREETINGS[greetIndex].word}
              </span>
            </span>{" "}
            {t.hero.titleLine2}
          </h1>

          <p className="text-lg mb-7 max-w-md" style={{ color: "#B7C3E0" }}>
            {t.hero.subtitle}
          </p>

          <div className="hn-check-list mb-8">
            {t.hero.checklist.map((item, i) => (
              <div className="hn-check-item" key={i}>
                <span className="hn-check-dot">
                  <Check size={14} strokeWidth={3} />
                </span>
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              className="hn-btn-primary px-6 py-3 rounded-full font-semibold flex items-center gap-2"
              onClick={openPopup}
            >
              {t.hero.bookBtn} <ArrowRight size={18} />
            </button>
            <button className="hn-btn-secondary px-6 py-3 rounded-full font-semibold">
              {t.hero.joinBtn}
            </button>
          </div>

          <div className="flex items-center gap-2 mt-6 text-sm" style={{ color: "#93A3C7" }}>
            <ShieldCheck size={16} style={{ color: "#0EA5E9" }} />
            {t.hero.verified}
          </div>
        </div>

        <div className="relative z-10 flex justify-center">
          <div className="hn-phone hn-float">
            <div className="hn-phone-notch" />
            <div className="hn-phone-status">
              <span>9:41</span>
              <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <Mic2 size={12} />
                <ShieldCheck size={12} />
              </span>
            </div>
            <div className="hn-phone-header">
              <div className="hn-phone-title">Hanioo</div>
              <div className="hn-phone-online">Online</div>
            </div>
            <div className="hn-phone-body">
              <div className="hn-phone-match-card">
                <div className="hn-phone-avatar">
                  {t.hero.phoneDemo.matchName
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div className="hn-phone-match-info">
                  <div className="hn-phone-match-name">
                    {t.hero.phoneDemo.matchName}
                    <ShieldCheck size={13} style={{ color: "#0EA5E9" }} />
                  </div>
                  <div className="hn-phone-match-lang">
                    {t.hero.phoneDemo.matchLangs}
                    <span className="hn-phone-match-dot" />
                    <Star size={11} fill="#38BDF8" style={{ color: "#38BDF8" }} />
                    {t.hero.phoneDemo.matchRating}
                  </div>
                </div>
                <div className={`hn-phone-booking-tag ${phoneStep >= 4 ? "show" : ""}`}>
                  <CalendarCheck size={11} />
                  {t.hero.phoneDemo.bookingTag}
                </div>
              </div>

              <div className={`hn-phone-bubble hn-phone-bubble-user hn-msg ${phoneStep >= 1 ? "show" : ""}`}>
                {t.hero.phoneDemo.userMsg}
              </div>

              <div className={`hn-phone-typing hn-msg ${phoneStep === 2 ? "show" : ""}`}>
                <span />
                <span />
                <span />
              </div>

              <div className={`hn-phone-bubble hn-phone-bubble-reply hn-msg ${phoneStep >= 3 ? "show" : ""}`}>
                {t.hero.phoneDemo.replyMsg}
              </div>

              <div className={`hn-phone-call-card hn-msg ${phoneStep >= 4 ? "show" : ""}`}>
                <span className="hn-phone-call-left">
                  <Mic2 size={13} />
                  {t.hero.phoneDemo.callLabel}
                </span>
                <span className="hn-phone-call-status">
                  <span className="hn-phone-call-dot" />
                  {t.hero.phoneDemo.callStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="hn-phone-float-card hn-float-a" style={{ top: 10, left: -10 }}>
            <Star size={16} fill="#38BDF8" style={{ color: "#38BDF8" }} />
            4.9 average rating
          </div>
          <div className="hn-phone-float-card hn-float-b" style={{ bottom: 40, right: -18 }}>
            <ShieldCheck size={16} style={{ color: "#071E42" }} />
            Trial call
          </div>
        </div>
      </div>
    </section>
  );
}
