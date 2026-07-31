"use client";

import { useState, useSyncExternalStore } from "react";
import Script from "next/script";
import BookingOpener from "./BookingOpener";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServer() {
  return false;
}

declare global {
  interface Window {
    mountScrollWorld?: (container: HTMLElement, config: Record<string, unknown>) => void;
  }
}

const V = (name: string) => `/world/vid/${name}`;
const VM = (name: string) => `/world/vid/${name.replace(/\.mp4$/, "-m.mp4")}`;
const P = (name: string) => `/world/posters/${name}.jpg`;
const PM = (name: string) => `/world/posters/${name}-m.jpg`;
const S = (name: string) => `/world/stills/${name}.png`;

const ACCENT = "#F5A020";

const sections = [
  {
    id: "airport",
    label: "Airport",
    clip: V("1_airport_v3.mp4"),
    clipMobile: VM("1_airport_v3.mp4"),
    poster: P("1_airport_v3"),
    posterMobile: PM("1_airport_v3"),
    still: S("1_airport_v3"),
    accent: ACCENT,
    eyebrow: "FROM THE SECOND YOU LAND",
    title: "Your ride is already here.",
    body: "One tap in the HOP app and you're moving — rides, tours, and a personal concierge, no extra cost.",
    tags: ["Rides", "Tours", "Concierge"],
    scroll: 1.6,
    linger: 0.4,
  },
  {
    id: "cruise",
    label: "Nassau",
    clip: V("2_cruise.mp4"),
    clipMobile: VM("2_cruise.mp4"),
    poster: P("2_cruise"),
    posterMobile: PM("2_cruise"),
    still: S("2_cruise"),
    accent: ACCENT,
    eyebrow: "THROUGH NASSAU",
    title: "The island, moving with you.",
    body: "Past the harbor, the cruise port, the color of Bay Street — HOP knows the way.",
    scroll: 1.2,
  },
  {
    id: "boat",
    label: "Crossing",
    clip: V("3_boat.mp4"),
    clipMobile: VM("3_boat.mp4"),
    poster: P("3_boat"),
    posterMobile: PM("3_boat"),
    still: S("3_boat"),
    accent: ACCENT,
    eyebrow: "BY LAND OR BY SEA",
    title: "Cross to paradise.",
    body: "Your concierge booked the boat too. Atlantis, dead ahead.",
    scroll: 1.5,
    linger: 0.35,
  },
  {
    id: "atlantis",
    label: "Atlantis",
    clip: V("4_atlantis.mp4"),
    clipMobile: VM("4_atlantis.mp4"),
    poster: P("4_atlantis"),
    posterMobile: PM("4_atlantis"),
    still: S("4_atlantis"),
    accent: ACCENT,
    eyebrow: "CONCIERGE-PICKED",
    title: "Lunch over the harbor.",
    body: "Walk the Marina Village like you belong — because today, you do.",
    scroll: 1.4,
  },
  {
    id: "food",
    label: "Lunch",
    clip: V("4b_food.mp4"),
    clipMobile: VM("4b_food.mp4"),
    poster: P("4b_food"),
    posterMobile: PM("4b_food"),
    still: S("4b_food"),
    accent: ACCENT,
    eyebrow: "NO EXTRA COST",
    title: "Your table was waiting.",
    body: "Fresh Bahamian lobster, the yachts behind it. Arranged before you asked.",
    scroll: 1.4,
    linger: 0.45,
  },
  {
    id: "beach",
    label: "Beach",
    clip: V("5_beach.mp4"),
    clipMobile: VM("5_beach.mp4"),
    poster: P("5_beach"),
    posterMobile: PM("5_beach"),
    still: S("5_beach"),
    accent: ACCENT,
    eyebrow: "THE BAHAMAS ONLY LOCALS KNOW",
    title: "Sunset, all to yourself.",
    body: "Beyond the resorts there's a beach with your name on it. HOP takes you there.",
    tags: ["Guided tours included"],
    scroll: 1.7,
    linger: 0.5,
  },
  {
    id: "entrance",
    label: "Nightlife",
    clip: V("6_entrance.mp4"),
    clipMobile: VM("6_entrance.mp4"),
    poster: P("6_entrance"),
    posterMobile: PM("6_entrance"),
    still: S("6_entrance"),
    accent: ACCENT,
    eyebrow: "THE NIGHT IS YOURS",
    title: "Arrive like you mean it.",
    body: "Dinner, casino, show — the night runs on your schedule, not a timetable.",
    scroll: 1.3,
  },
  {
    id: "rooftop",
    label: "Rooftop",
    clip: V("7_rooftop.mp4"),
    clipMobile: VM("7_rooftop.mp4"),
    poster: P("7_rooftop"),
    posterMobile: PM("7_rooftop"),
    still: S("7_rooftop"),
    accent: ACCENT,
    eyebrow: "ANY HOUR",
    title: "And home again — whenever you say.",
    body: "From the second you land to the last toast of the night: one app, 24/7.",
    scroll: 1.8,
    linger: 0.5,
    // The engine's ctaBtns() reads cta.primary/cta.secondary, not a flat {label,href}.
    cta: { primary: { label: "Book a HOP", href: "https://app.hopbahamas.com" } },
  },
];

const config = {
  brand: { name: "HOP", href: "/" },
  hint: "scroll to begin the ride",
  nav: true,
  atmosphere: true,
  crossfade: 0.12,
  connectors: [],
  sections,
};

export default function WorldMount() {
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getReducedMotionServer);
  const [dismissed, setDismissed] = useState(false);
  const openerUp = !reducedMotion && !dismissed;

  function handleEngineLoad() {
    const container = document.getElementById("hop-world-root");
    if (container && window.mountScrollWorld) {
      window.mountScrollWorld(container, config);
    }
  }

  return (
    <>
      <Script src="/world/scrub-engine.js" strategy="afterInteractive" onLoad={handleEngineLoad} />
      <BookingOpener active={openerUp} onDismiss={() => setDismissed(true)} />
      <a
        href="https://app.hopbahamas.com"
        className="hop-world-pill"
        style={{
          position: "fixed",
          right: "clamp(14px, 3vw, 28px)",
          bottom: "clamp(14px, 3vw, 28px)",
          zIndex: 90,
          display: openerUp ? "none" : "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "13px 22px",
          borderRadius: 999,
          textDecoration: "none",
          fontFamily: "var(--font-quicksand), sans-serif",
          fontWeight: 700,
          fontSize: "0.92rem",
          color: "#14130f",
          background: ACCENT,
          boxShadow: "0 8px 28px rgba(245,160,32,0.35), 0 2px 10px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.25)",
          transition: "transform 0.2s ease",
        }}
      >
        Book a HOP
      </a>
    </>
  );
}
