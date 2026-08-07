import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, Check, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { usePopup } from "../context/PopupContext";

const FLAGS = {
  en: "https://flagcdn.com/w40/gb.png",
  de: "https://flagcdn.com/w40/de.png",
};

function StoreBadges({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href="https://play.google.com/store/search?q=hanioo&c=apps&hl=en_IN"
        target="_blank"
        rel="noopener noreferrer"
        className="hn-store-badge"
        aria-label="Get it on Google Play"
      >
        <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" />
      </a>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="hn-store-badge hn-store-badge--apple"
        aria-label="Download on the App Store"
      >
        <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" />
      </a>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const desktopLangRef = useRef(null);
  const mobileLangRef = useRef(null);
  const { lang, setLang, t } = useLanguage();
  const { openPopup } = usePopup();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      const inDesktop = desktopLangRef.current && desktopLangRef.current.contains(e.target);
      const inMobile = mobileLangRef.current && mobileLangRef.current.contains(e.target);
      if (!inDesktop && !inMobile) setLangOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const navItems = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/service", label: t.nav.service },
    { to: "/how-it-works", label: t.nav.howItWorks },
    { to: "/contact", label: t.nav.contact },
  ];

  const linkClass = ({ isActive }) => `hn-link whitespace-nowrap ${isActive ? "active" : ""}`;

  const LanguageMenu = ({ mobile }) => (
    <div className="relative" ref={mobile ? mobileLangRef : desktopLangRef}>
      <button
        className="hn-link hn-lang-trigger flex items-center gap-2"
        onClick={() => setLangOpen((v) => !v)}
      >
        <img src={FLAGS[lang]} alt="" className="hn-flag-icon" />
        {t.nav.languages}
        <ChevronDown size={14} className={`hn-chevron ${langOpen ? "open" : ""}`} />
      </button>
      {langOpen && (
        <div className="hn-lang-menu" style={mobile ? { position: "static", boxShadow: "none", border: "1px solid rgba(255,255,255,0.1)", marginTop: 8 } : undefined}>
          <button
            className={`hn-lang-option ${lang === "de" ? "active" : ""}`}
            onClick={() => {
              setLang("de");
              setLangOpen(false);
            }}
          >
            <img src={FLAGS.de} alt="Germany flag" className="hn-flag-icon" />
            Deutschland (Deutsch)
            {lang === "de" && <Check size={14} className="ml-auto" />}
          </button>
          <button
            className={`hn-lang-option ${lang === "en" ? "active" : ""}`}
            onClick={() => {
              setLang("en");
              setLangOpen(false);
            }}
          >
            <img src={FLAGS.en} alt="UK flag" className="hn-flag-icon" />
            English
            {lang === "en" && <Check size={14} className="ml-auto" />}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className={`hn-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="hn-topbar">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-5">
            <a href={`tel:${t.footer.contactPhone.replace(/\s+/g, "")}`} className="hn-topbar-link">
              <Phone size={13} /> {t.footer.contactPhone}
            </a>
            <a href={`mailto:${t.footer.contactEmail}`} className="hn-topbar-link hidden sm:flex">
              <Mail size={13} /> {t.footer.contactEmail}
            </a>
          </div>
          <div className="hn-topbar-link">
            <Clock size={13} /> {t.nav.availability}
          </div>
        </div>
      </div>
      <div className="hn-nav-inner max-w-6xl mx-auto flex items-center justify-between gap-4 px-6">
        <Link to="/" className="hn-logo flex items-center gap-2 shrink-0" onClick={() => setMenuOpen(false)}>
          <img
            src="/hanioo-logo-lockup.png"
            alt="Hanioo logo"
            className="hn-logo-icon h-24 sm:h-28 w-auto object-contain"
          />
          {/* <span className="flex flex-col leading-none">
            <span className="hn-display font-semibold text-xl tracking-tight">Hanioo</span>
            <span className="hn-logo-sub">හනියෝ</span>
          </span> */}
        </Link>

        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 mx-auto">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className={linkClass} onClick={openPopup}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-5 shrink-0">
          <LanguageMenu />
          <StoreBadges />
        </div>

        <button className="xl:hidden hn-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`hn-mobile-menu xl:hidden ${menuOpen ? "open" : ""}`}>
        <div className="px-6 pb-6 flex flex-col gap-4 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          {navItems.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => `hn-link text-left ${i === 0 ? "pt-4" : ""} ${isActive ? "active" : ""}`}
              onClick={() => {
                setMenuOpen(false);
                openPopup();
              }}
            >
              {item.label}
            </NavLink>
          ))}
          <LanguageMenu mobile />
          <button className="hn-btn-secondary px-4 py-2 rounded-full text-sm font-semibold self-start">
            {t.nav.login}
          </button>
          <StoreBadges className="mt-2" />
        </div>
      </div>
    </header>
  );
}
