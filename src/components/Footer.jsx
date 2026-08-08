import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUp,
  Building2,
  ChevronRight,
  Facebook,
  FileText,
  Globe2,
  Headphones,
  Home,
  Info,
  Instagram,
  Linkedin,
  Link2,
  Mail,
  Phone,
  Settings2,
  ShieldCheck,
  Users,
  Video,
  Workflow,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import WhatsAppIcon from "./icons/WhatsAppIcon";

// Small badge icon used above each footer column heading.
function HeadingBadge({ children, color }) {
  return (
    <span className="hn-footer-heading-badge" style={color ? { background: color } : undefined}>
      {children}
    </span>
  );
}

// Small colored icon badge used next to each "Our Services" row —
// icons pulled from the same SERVICE_ICONS set used on the Service page.
function ServiceIcon({ icon: Icon, color }) {
  return (
    <span className="hn-footer-service-icon" style={{ background: color }}>
      <Icon size={13} />
    </span>
  );
}

// Wavy divider that sits on the seam between the section above and the footer,
// so the footer doesn't start with a hard straight edge.
function FooterWave() {
  return (
    <svg
      className="hn-footer-wave"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0,32 C240,60 480,4 720,20 C960,36 1200,58 1440,26 L1440,60 L0,60 Z"
        fill="#071E42"
      />
    </svg>
  );
}

// Faint globe-and-language watermark drawn in the footer background —
// echoes the "languages that connect" idea behind the Hanioo logo.
function FooterGlobeMark() {
  return (
    <svg
      className="hn-footer-globemark"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <ellipse cx="200" cy="200" rx="150" ry="60" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <ellipse cx="200" cy="200" rx="150" ry="120" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="1.2" />
      <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

// Footer nav link. Quick Links show a static arrow glyph (matches the
// reference layout); Our Services show a colored icon badge instead.
function FooterNavLink({ to, href, children, icon }) {
  const content = icon ? (
    <>
      {icon}
      <span>{children}</span>
    </>
  ) : (
    <>
      <ChevronRight size={13} className="hn-footer-link-arrow" />
      <span>{children}</span>
    </>
  );
  const className = "hn-footer-link hn-footer-link-row";
  return to ? (
    <Link to={to} className={className}>{content}</Link>
  ) : (
    <a href={href} className={className}>{content}</a>
  );
}


// Update these once — every contact/social link in the footer reads from them.
const CONTACT_PHONE_HREF = "tel:+94112345678";
const CONTACT_EMAIL_HREF = "mailto:hello@hanioo.de";
const SOCIALS = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/hanioo", bg: "#1877F2" },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/hanioo",
    bg: "linear-gradient(45deg, #F09433, #E6683C, #DC2743, #CC2366, #BC1888)",
  },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/hanioo", bg: "#0A66C2" },
  { icon: WhatsAppIcon, label: "WhatsApp", href: "https://wa.me/94112345678", bg: "#25D366" },
];

// Quick Links column — paths line up with the routes in App.jsx, each
// paired with its own colored icon badge (same visual language as the
// "Our Services" column below).
const QUICK_LINK_PATHS = ["/", "/service", "/how-it-works", "/about", "/contact"];
const QUICK_LINK_ICONS = [
  { icon: Home, color: "#3B82F6" },
  { icon: Settings2, color: "#8B5CF6" },
  { icon: Workflow, color: "#F59E0B" },
  { icon: Info, color: "#14B8A6" },
  { icon: Phone, color: "#F43F5E" },
];

// Our Services column — mirrors the offerings on the Service page, each
// paired with its icon + accent color from the project's SERVICE_ICONS set.
const SERVICE_ITEMS = [
  { slug: "video-call-interpretation", icon: Video, color: "#F43F5E" },
  { slug: "on-site-interpretation", icon: Users, color: "#10B981" },
  { slug: "certified-document-translation", icon: FileText, color: "#F59E0B" },
  { slug: "corporate-event-bookings", icon: Building2, color: "#3B82F6" },
  { slug: "telephone-interpretation", icon: Headphones, color: "#8B5CF6" },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="hn-footer pt-16 pb-8">
      <FooterWave />
      <FooterGlobeMark />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand + tagline + socials */}
          <div className="lg:col-span-2">
            <Link to="/" className="hn-footer-logo-wrap flex items-center gap-2 mb-5">
              <img
                src="/hanioo-logo-lockup-footer.png"
                alt="Hanioo logo"
                className="hn-footer-logo h-20 sm:h-28 w-auto object-contain"
              />
            </Link>
            <p className="text-sm max-w-xs mb-6" style={{ color: "rgba(255,249,238,0.75)" }}>
              {f.tagline}
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, label, href, bg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="hn-footer-social"
                  style={{ background: bg }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-semibold text-sm mb-4 flex items-center" style={{ color: "var(--ivory)" }}>
              <HeadingBadge color="linear-gradient(140deg, #3B82F6, #1D4ED8 130%)"><Link2 size={15} /></HeadingBadge>
              {f.quickLinksHeading}
            </div>
            <ul className="space-y-2.5 text-sm">
              {f.quickLinks.map((label, i) => (
                <li key={label}>
                  <FooterNavLink
                    to={QUICK_LINK_PATHS[i]}
                    icon={<ServiceIcon icon={QUICK_LINK_ICONS[i].icon} color={QUICK_LINK_ICONS[i].color} />}
                  >
                    {label}
                  </FooterNavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <div className="font-semibold text-sm mb-4 flex items-center" style={{ color: "var(--ivory)" }}>
              <HeadingBadge color="linear-gradient(140deg, #8B5CF6, #6D28D9 130%)"><Headphones size={15} /></HeadingBadge>
              {f.servicesHeading}
            </div>
            <ul className="space-y-2.5 text-sm">
              {f.services.map((label, i) => (
                <li key={label}>
                  <FooterNavLink
                    to={`/service/${SERVICE_ITEMS[i].slug}`}
                    icon={<ServiceIcon icon={SERVICE_ITEMS[i].icon} color={SERVICE_ITEMS[i].color} />}
                  >
                    {label}
                  </FooterNavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <div className="font-semibold text-sm mb-4 flex items-center" style={{ color: "var(--ivory)" }}>
              <HeadingBadge color="linear-gradient(140deg, #10B981, #047857 130%)"><Phone size={14} /></HeadingBadge>
              {f.getInTouchHeading}
            </div>
            <ul className="space-y-3 text-sm mb-5">
              <li className="flex items-center gap-2.5">
                <ServiceIcon icon={Globe2} color="linear-gradient(140deg, #38BDF8, #0284C7 130%)" />
                <span style={{ color: "rgba(255,249,238,0.8)" }}>{f.availability}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <ServiceIcon icon={Phone} color="linear-gradient(140deg, #34D399, #047857 130%)" />
                <a href={CONTACT_PHONE_HREF} className="hn-footer-link">{f.contactPhone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <ServiceIcon icon={Mail} color="linear-gradient(140deg, #FBBF24, #D97706 130%)" />
                <a href={CONTACT_EMAIL_HREF} className="hn-footer-link">{f.contactEmail}</a>
              </li>
            </ul>

            <div className="hn-footer-enrolled">
              <div className="hn-footer-avatar-stack">
                <span className="hn-footer-avatar" style={{ background: "linear-gradient(140deg, #3B82F6, #1D4ED8 130%)" }}><Users size={13} /></span>
                <span className="hn-footer-avatar" style={{ background: "linear-gradient(140deg, #10B981, #047857 130%)" }}><ShieldCheck size={13} /></span>
                <span className="hn-footer-avatar" style={{ background: "linear-gradient(140deg, #8B5CF6, #6D28D9 130%)" }}><Headphones size={13} /></span>
              </div>
              <div className="text-sm">
                <strong style={{ color: "var(--ivory)" }}>{f.enrolledStat}</strong>{" "}
                <span style={{ color: "rgba(255,249,238,0.7)" }}>{f.enrolledText}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs"
          style={{ borderTop: "1px solid rgba(255,249,238,0.12)", color: "rgba(255,249,238,0.6)" }}
        >
          <span>© {new Date().getFullYear()} {f.copyright} | {f.legalNote}</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hn-footer-link text-xs">{f.privacyLink}</Link>
            <span className="hn-footer-dot" />
            <Link to="/terms-of-service" className="hn-footer-link text-xs">{f.termsLink}</Link>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
              className="hn-footer-totop"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
