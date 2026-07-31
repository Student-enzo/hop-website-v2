"use client";

import Script from "next/script";

declare global {
  interface Window {
    mountScrollWorld?: (container: HTMLElement, config: Record<string, unknown>) => void;
  }
}

const ACCENT = "#F5A020";

// 2-scene continuity proof: the airport clip Enzo likes, then a NEW leg that
// starts on the airport clip's ACTUAL last frame and glides forward into Nassau.
// Frame-locked seam => continuous, no "slide change with a blur".
const sections = [
  {
    id: "airport",
    label: "Airport",
    clip: "/world/vid/1_airport_v3.mp4",
    poster: "/world/posters/1_airport_v3.jpg",
    still: "/world/stills/1_airport_v3.png",
    accent: ACCENT,
    eyebrow: "FROM THE SECOND YOU LAND",
    title: "Your ride is already here.",
    body: "One tap in the HOP app and you're moving.",
    scroll: 1.6,
    linger: 0.4,
  },
  {
    id: "nassau",
    label: "Nassau",
    clip: "/world/vid/leg2_nassau.mp4",
    poster: "/world/posters/leg2_nassau.jpg",
    still: "/world/stills/2_cruise.png",
    accent: ACCENT,
    eyebrow: "THROUGH NASSAU",
    title: "The island, moving with you.",
    body: "Forward past the harbor, toward the marina — one continuous ride.",
    scroll: 1.8,
    linger: 0.35,
  },
];

const config = {
  brand: { name: "HOP", href: "/" },
  hint: "scroll — one continuous ride",
  nav: true,
  atmosphere: true,
  crossfade: 0.08, // small: seam is frame-locked, so this only hides sub-frame drift
  connectors: [],
  sections,
};

export default function WorldTestMount() {
  function handleEngineLoad() {
    const container = document.getElementById("hop-worldtest-root");
    if (container && window.mountScrollWorld) {
      window.mountScrollWorld(container, config);
    }
  }

  return <Script src="/world/scrub-engine.js" strategy="afterInteractive" onLoad={handleEngineLoad} />;
}
