import React, { createContext, useContext, useState } from "react";

const PopupContext = createContext(null);

// Controls the shared "Book an interpreter" lead-capture popup so any
// button anywhere on the site (Hero, CTA sections, Navbar, etc.) can
// open it, not just the one auto-shown on page load.
export function PopupProvider({ children }) {
  const [open, setOpen] = useState(true);

  const openPopup = () => setOpen(true);
  const closePopup = () => setOpen(false);

  const value = { open, openPopup, closePopup };

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>;
}

export function usePopup() {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error("usePopup must be used within a PopupProvider");
  return ctx;
}
