import React from "react";

// The real WhatsApp glyph (phone handset inside a speech bubble),
// used wherever the site links out to WhatsApp — footer social row
// and the floating "chat on WhatsApp" button — instead of a generic
// chat-bubble icon, so it reads as the actual WhatsApp brand mark.
export default function WhatsAppIcon({ size = 20, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.02 3C9.4 3 4.02 8.38 4.02 15c0 2.22.6 4.3 1.65 6.09L3 29l8.1-2.63A11.9 11.9 0 0 0 16.02 27C22.64 27 28 21.62 28 15S22.64 3 16.02 3Zm0 21.7c-1.94 0-3.75-.53-5.3-1.46l-.38-.22-4.8 1.56 1.57-4.68-.25-.4a9.63 9.63 0 0 1-1.5-5.1c0-5.36 4.36-9.72 9.66-9.72 5.3 0 9.63 4.36 9.63 9.72s-4.33 9.7-9.63 9.7Z" />
      <path d="M21.2 17.66c-.28-.14-1.66-.82-1.92-.91-.26-.1-.44-.14-.63.14-.19.28-.72.91-.88 1.1-.16.19-.32.21-.6.07-.28-.14-1.18-.44-2.24-1.39-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.63-1.53-.87-2.1-.23-.55-.46-.48-.63-.49h-.54c-.19 0-.5.07-.76.35-.26.28-1 .98-1 2.38 0 1.4 1.02 2.76 1.16 2.95.14.19 2.01 3.14 4.9 4.28.68.3 1.22.47 1.63.6.68.22 1.3.19 1.79.11.55-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.13-.25-.2-.53-.34Z" />
    </svg>
  );
}
