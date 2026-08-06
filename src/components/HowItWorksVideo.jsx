import React, { useEffect, useRef } from "react";

// --------------------------------------------------------------------
// Video slot for the How It Works page.
//
// To add your own video: drop the file at
//   public/videos/how-it-works.mp4
// (and optionally public/videos/how-it-works.webm as a fallback source).
// The frame below is fixed to a 16:9 ratio and capped at 800px wide, so
// whatever video you add will sit at the right size automatically —
// no extra changes needed here.
// --------------------------------------------------------------------

export default function HowItWorksVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Some browsers (notably Chrome) only honor autoplay once `muted`
    // is set as a real DOM property, not just the JSX attribute — so we
    // set it explicitly here and kick off playback ourselves.
    video.muted = true;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Autoplay was blocked (e.g. low-power mode) — the visible
        // controls let the person start it manually instead.
      });
    }
  }, []);

  return (
    <div className="hn-video-frame">
      <video
        ref={videoRef}
        className="hn-video-el"
        controls
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/how-it-works-poster.svg"
      >
        <source src="/videos/how-it-works.mp4" type="video/mp4" />
        <source src="/videos/how-it-works.webm" type="video/webm" />
        Your browser doesn't support embedded videos.
      </video>
    </div>
  );
}
