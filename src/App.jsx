import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./styles.css";

import { LanguageProvider } from "./context/LanguageContext";
import { PopupProvider } from "./context/PopupContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WelcomePopup from "./components/WelcomePopup";
import ScrollToTop from "./components/ScrollToTop";
import FloatingActions from "./components/FloatingActions";

import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import ServiceDetail from "./pages/ServiceDetail";
import HowItWorksPage from "./pages/HowItWorksPage";
import Contact from "./pages/Contact";

// Jumps the viewport back to the top whenever the route changes, so
// navigating between pages behaves like a proper multi-page site.
function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

// Re-mounts the active page on every navigation so its fade/slide-in
// animation replays, giving page changes a lightweight transition.
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="hn-page-fade">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/service/:slug" element={<ServiceDetail />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

function Site() {
  return (
    <div className="hn-root">
      <WelcomePopup />
      <Navbar />
      <ScrollManager />
      <AnimatedRoutes />
      <Footer />
      <FloatingActions />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PopupProvider>
        <BrowserRouter>
          <Site />
        </BrowserRouter>
      </PopupProvider>
    </LanguageProvider>
  );
}
