import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`hn-scroll-top ${visible ? "visible" : ""}`}
      onClick={scrollUp}
      aria-label={t.scrollTop}
      title={t.scrollTop}
    >
      <ArrowUp size={22} />
    </button>
  );
}
