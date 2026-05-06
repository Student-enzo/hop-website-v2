import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HowItWorksSection from "./components/HowItWorksSection";
import TestimonialsSection from "./components/TestimonialsSection";
import NassauMomentsSection from "./components/NassauMomentsSection";
import DestinationsSection from "./components/DestinationsSection";
import HeroBookingWidget from "./components/HeroBookingWidget";
import StickyMobileCTA from "./components/StickyMobileCTA";
import RideTiersSection from "./components/RideTiersSection";
import HopMomentsSection from "./components/HopMomentsSection";
import SafetySection from "./components/SafetySection";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import BlogGuideCarousel from "./components/BlogGuideCarousel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOP — Nassau's Ride App. No Uber? No Problem.",
  description:
    "No Uber in Nassau, Bahamas. HOP gives you fixed prices, pre-booking before you land, and real-time safety. Book your ride in under a minute — no app download required.",
};

const ORANGE = "#F5A020";
const BG = "#161616";
const CARD = "#1e1c14";
const CARD2 = "#222018";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const BORDER = "rgba(255,255,255,0.06)";
const GREEN = "#3aad6e";
const GOLD = "#d4a855";

const PHOTOS = {
  heroBg: "/images/hero-bahamas.jpg",
  ctaBg: "/images/cta-bahamas.jpg",
  palmRoad: "/images/schedule-road.jpg",
};

// Nassau lifestyle video for scroll-expand animation
const EXPERIENCE_VIDEO = "https://www.youtube.com/watch?v=qfeJ5kWswgc";
const EXPERIENCE_BG = "/images/hero-bahamas.jpg";

const NASSAU_MOMENTS = [
  { src: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80", alt: "Nassau aerial view", caption: "Nassau from above" },
  { src: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80", alt: "Bahamas turquoise beach", caption: "Crystal clear waters" },
  { src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80", alt: "People enjoying Nassau", caption: "Arrive in style" },
  { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80", alt: "Tropical paradise beach", caption: "Paradise awaits" },
  { src: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=800&q=80", alt: "Bahamas resort", caption: "Resort to resort" },
  { src: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=800&q=80", alt: "People in a ride", caption: "Your ride, your way" },
];

const DESTINATIONS = [
  { name: "Nassau Airport (LPIA)", sub: "Airport Transfers", from: "from $20", time: "~15 min", href: "/routes/nassau-airport", bg: "/images/dest-airport.jpg" },
  { name: "Atlantis Paradise Island", sub: "Paradise Island", from: "from $28", time: "~12 min", href: "/routes/atlantis-paradise-island", bg: "/images/dest-atlantis.jpg" },
  { name: "Nassau Cruise Port", sub: "Prince George Wharf", from: "from $15", time: "~8 min", href: "/routes/nassau-cruise-port", bg: "/images/dest-cruise.jpg" },
  { name: "Baha Mar & Cable Beach", sub: "Cable Beach Resort Strip", from: "from $22", time: "~10 min", href: "/routes/baha-mar-cable-beach", bg: "/images/dest-nassau.jpg" },
  { name: "Blue Lagoon Island", sub: "Blue Lagoon Ferry Terminal", from: "from $18", time: "~10 min", href: "/routes/blue-lagoon-island", bg: "/images/cta-bahamas.jpg" },
  { name: "Sandals Royal Bahamian", sub: "Cable Beach", from: "from $24", time: "~12 min", href: "/routes/sandals-royal-bahamian", bg: "/images/dest-luxury.jpg" },
];

const NASSAU_VIDEOS = [
  { id: "qfeJ5kWswgc", title: "Nassau, Bahamas — Life on the Island" },
  { id: "UEJ8Ozio4Lk", title: "Getting Around Nassau" },
  { id: "T-gzRdP2t18", title: "Atlantis Paradise Island Tour" },
  { id: "hQ6ocg_7MrY", title: "Nassau Travel Guide 2025" },
];


function AppStoreButtons({ size = "lg" }: { size?: "sm" | "lg" }) {
  const pad = size === "lg" ? "1rem 1.75rem" : "0.625rem 1.25rem";
  const fs = size === "lg" ? "1rem" : "0.875rem";
  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <a href="#" className="btn-white" style={{ padding: pad, fontSize: fs }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill={BG}>
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        App Store
      </a>
      <a href="#" className="btn-secondary" style={{ padding: pad, fontSize: fs }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill={TEXT}>
          <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l15 8.5c.6.35.6 1.25 0 1.6l-15 8.5c-.66.5-1.6.03-1.6-.8z" />
        </svg>
        Google Play
      </a>
    </div>
  );
}

function PhoneFrame({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div
      className="phone-glow"
      style={{
        position: "relative",
        display: "inline-block",
        borderRadius: "48px",
        padding: "10px",
        background: "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ borderRadius: "40px", overflow: "hidden", width: 220, height: 476 }}>
        <Image src={src} alt={alt} width={220} height={476} style={{ objectFit: "cover", display: "block" }} priority={priority} />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section
          className="photo-hero"
          style={{ backgroundImage: `url('${PHOTOS.heroBg}')`, minHeight: "100vh", display: "flex", alignItems: "center" }}
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(12,10,6,0.78) 0%, rgba(12,10,6,0.55) 45%, rgba(12,10,6,0.12) 75%, rgba(12,10,6,0) 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "18%", background: "linear-gradient(to bottom, transparent, #161616)" }} />

          <div
            style={{ position: "relative", width: "100%", maxWidth: 1200, margin: "0 auto", padding: "7rem 1.5rem 5rem", display: "grid", gap: "3rem", alignItems: "center" }}
            className="grid grid-cols-1 lg:grid-cols-2"
          >
            {/* Left — headline + booking widget */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.875rem", backgroundColor: "rgba(245,160,32,0.12)", border: "1px solid rgba(245,160,32,0.3)", borderRadius: "999px", marginBottom: "1.25rem" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: ORANGE, flexShrink: 0, boxShadow: `0 0 6px ${ORANGE}` }} />
                <span style={{ color: ORANGE, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em" }}>NASSAU, BAHAMAS</span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.0,
                  color: TEXT,
                  marginBottom: "0.75rem",
                  textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                }}
              >
                Get anywhere{" "}
                <span style={{ color: ORANGE, fontStyle: "italic" }}>in Nassau.</span>
              </h1>

              <p style={{ fontSize: "1rem", color: "rgba(240,237,232,0.75)", lineHeight: 1.65, marginBottom: "1.75rem", maxWidth: 480 }}>
                Flat rates. No haggling. Verified drivers. Airport, beach, hotel — HOP gets you there in minutes.
              </p>

              <HeroBookingWidget />
            </div>

            {/* Right — phone screenshots + app store buttons */}
            <div className="hidden lg:flex" style={{ flexDirection: "column", alignItems: "center", justifyContent: "flex-end", alignSelf: "stretch", gap: "2rem", paddingBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "1.25rem" }}>
                <div style={{ transform: "rotate(-3deg) translateY(16px)" }}>
                  <PhoneFrame src="/screenshots/home-map.png" alt="HOP app — Nassau map view" priority />
                </div>
                <div style={{ transform: "rotate(3deg)" }}>
                  <PhoneFrame src="/screenshots/hero-ride.png" alt="HOP booking — fixed fare to Atlantis" priority />
                </div>
              </div>
              {/* App store buttons */}
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1.5rem" }}>
                <a href="#" className="app-store-btn">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill={TEXT} style={{ flexShrink: 0 }}>
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <p style={{ color: "rgba(240,237,232,0.55)", fontSize: "0.65rem", lineHeight: 1, letterSpacing: "0.02em" }}>Download on the</p>
                    <p style={{ color: TEXT, fontSize: "1.05rem", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.01em" }}>App Store</p>
                  </div>
                </a>
                <a href="#" className="app-store-btn">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill={TEXT} style={{ flexShrink: 0 }}>
                    <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l15 8.5c.6.35.6 1.25 0 1.6l-15 8.5c-.66.5-1.6.03-1.6-.8z" />
                  </svg>
                  <div>
                    <p style={{ color: "rgba(240,237,232,0.55)", fontSize: "0.65rem", lineHeight: 1, letterSpacing: "0.02em" }}>Get it on</p>
                    <p style={{ color: TEXT, fontSize: "1.05rem", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.01em" }}>Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="pexels-credit">Photo via Pexels</a>
        </section>

        {/* ── EVERY MEMORY — scroll-expand animation with lifestyle video ── */}
        <ScrollExpandMedia
          mediaType="video"
          mediaSrc={EXPERIENCE_VIDEO}
          bgImageSrc={EXPERIENCE_BG}
          title="Every Memory Starts With A Ride"
          date="Nassau · Bahamas"
          scrollToExpand="Scroll to expand"
          textBlend={false}
        >
          <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
            <p style={{ color: ORANGE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "1rem", textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}>THE HOP EXPERIENCE</p>
            <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: "1.25rem", lineHeight: 1.2, textShadow: "0 2px 16px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.9)" }}>
              Nassau is waiting. Your ride is one tap away.
            </h3>
            <p style={{ color: "rgba(240,237,232,0.9)", fontSize: "1rem", lineHeight: 1.75, maxWidth: 580, margin: "0 auto 2rem", textShadow: "0 1px 12px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.8)" }}>
              Flying in, headed to Atlantis, or exploring Cable Beach — HOP is how Nassau moves. Fixed fares, reliable pickups, and a safety net built for the island.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://app.hopbahamas.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "0.875rem 1.75rem", fontSize: "0.95rem" }}>
                Get My Ride
              </a>
              <Link href="/routes" className="btn-secondary" style={{ padding: "0.875rem 1.75rem", fontSize: "0.95rem", display: "inline-flex", alignItems: "center" }}>
                Explore Destinations
              </Link>
            </div>
          </div>
        </ScrollExpandMedia>

        {/* ── HOW IT WORKS ── */}
        <HowItWorksSection />

        {/* ── SCHEDULE FEATURE ── */}
        <section
          className="photo-hero"
          style={{ backgroundImage: `url('${PHOTOS.palmRoad}')`, padding: "6rem 1.5rem", minHeight: 580 }}
        >
          {/* Overlay: heavy left → fades right */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(95deg, rgba(10,8,4,0.93) 0%, rgba(10,8,4,0.75) 52%, rgba(10,8,4,0.25) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,8,4,0.2) 0%, transparent 30%, transparent 70%, rgba(22,22,22,0.8) 100%)" }} />

          <div
            style={{ position: "relative", maxWidth: 1200, margin: "0 auto", display: "grid", gap: "3rem", alignItems: "center" }}
            className="grid grid-cols-1 lg:grid-cols-2"
          >
            {/* Left — copy */}
            <div>
              <span style={{ display: "inline-block", padding: "0.3rem 0.875rem", backgroundColor: "rgba(245,160,32,0.15)", border: "1px solid rgba(245,160,32,0.35)", borderRadius: 999, color: ORANGE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
                SCHEDULE
              </span>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 900, color: TEXT, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1rem", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
                Going to the airport at 6 AM?<br />Schedule it now.
              </h2>
              <p style={{ color: "rgba(240,237,232,0.75)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.75rem", maxWidth: 440 }}>
                Plan rides days or weeks in advance. Set the route, pick the date, lock the price.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[
                  "One-time or recurring (weekdays, selected days)",
                  "Full price breakdown before confirming",
                  "Credit/debit card accepted",
                  "Groups of 1–15 supported",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}><path d="M20 6L9 17l-5-5" /></svg>
                    <span style={{ color: "rgba(240,237,232,0.85)", fontSize: "0.9rem" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://app.hopbahamas.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 1.75rem", backgroundColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, color: TEXT, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", transition: "background-color 0.15s, border-color 0.15s" }}
              >
                Learn about scheduling
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEXT} strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </div>

            {/* Right — 3 staggered phone frames */}
            <div className="hidden lg:flex" style={{ justifyContent: "center", alignItems: "center", position: "relative", height: 520 }}>
              {/* Back-left phone */}
              <div style={{ position: "absolute", left: "2%", bottom: 20, transform: "rotate(-6deg) translateY(8px) scale(0.88)", opacity: 0.7, zIndex: 1 }}>
                <div style={{ display: "inline-block", borderRadius: 36, padding: 8, background: "linear-gradient(145deg, #2a2a2a 0%, #181818 100%)", boxShadow: "0 24px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)" }}>
                  <div style={{ borderRadius: 30, overflow: "hidden", width: 180, height: 390 }}>
                    <Image src="/screenshots/schedule-route.png" alt="HOP schedule route" width={180} height={390} style={{ objectFit: "cover", display: "block" }} />
                  </div>
                </div>
              </div>

              {/* Center front phone */}
              <div className="phone-glow" style={{ position: "relative", zIndex: 3 }}>
                <div style={{ display: "inline-block", borderRadius: 44, padding: 10, background: "linear-gradient(145deg, #2e2e2e 0%, #181818 100%)", boxShadow: "0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.09)" }}>
                  <div style={{ borderRadius: 36, overflow: "hidden", width: 210, height: 454 }}>
                    <Image src="/screenshots/schedule-calendar.png" alt="HOP schedule calendar" width={210} height={454} style={{ objectFit: "cover", display: "block" }} />
                  </div>
                </div>
              </div>

              {/* Back-right phone */}
              <div style={{ position: "absolute", right: "2%", bottom: 20, transform: "rotate(6deg) translateY(8px) scale(0.88)", opacity: 0.7, zIndex: 1 }}>
                <div style={{ display: "inline-block", borderRadius: 36, padding: 8, background: "linear-gradient(145deg, #2a2a2a 0%, #181818 100%)", boxShadow: "0 24px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)" }}>
                  <div style={{ borderRadius: 30, overflow: "hidden", width: 180, height: 390 }}>
                    <Image src="/screenshots/schedule-summary.png" alt="HOP schedule summary" width={180} height={390} style={{ objectFit: "cover", display: "block" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="pexels-credit">Photo via Pexels</a>
        </section>

        {/* ── CONTEXT STRIP ── */}
        <section
          style={{
            backgroundColor: CARD2,
            borderBottom: `1px solid ${BORDER}`,
            padding: "0.875rem 1.5rem",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "No Uber in Nassau", icon: "✕" },
              { label: "Street taxis have no meters", icon: "✕" },
              { label: "HOP shows your fare upfront", icon: "✓" },
            ].map((item, i) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 1.25rem", flexShrink: 0 }}>
                {i > 0 && <span style={{ color: BORDER, marginRight: "1.25rem", fontSize: "1.2rem", fontWeight: 200 }}>|</span>}
                <span
                  style={{
                    color: i === 2 ? "#3aad6e" : "#E84040",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                  }}
                >
                  {item.icon}
                </span>
                <span style={{ color: i === 2 ? TEXT : MUTED, fontSize: "0.85rem", fontWeight: i === 2 ? 600 : 400 }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── NASSAU MOMENTS ── */}
        <NassauMomentsSection />

        {/* ── TESTIMONIALS ── */}
        <TestimonialsSection />

        {/* ── DESTINATIONS ── */}
        <DestinationsSection />

        {/* ── SAFETY ── */}
        <SafetySection />

        {/* ── NASSAU LIFE VIDEOS ── */}
        <section style={{ backgroundColor: BG, padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <p style={{ color: ORANGE, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.5rem" }}>SEE NASSAU</p>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                The island you&apos;re coming to see.
              </h2>
              <p style={{ color: MUTED, fontSize: "0.95rem", marginTop: "0.5rem" }}>
                Plan your first ride to the right place.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
              {NASSAU_VIDEOS.map((v) => (
                <div
                  key={v.id}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    border: `1px solid ${BORDER}`,
                    backgroundColor: CARD2,
                  }}
                >
                  <div style={{ position: "relative", paddingTop: "56.25%" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${v.id}?modestbranding=1&rel=0`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: 0,
                      }}
                    />
                  </div>
                  <div style={{ padding: "0.875rem 1rem" }}>
                    <p style={{ color: MUTED, fontSize: "0.8rem" }}>{v.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RIDE TIERS ── */}
        <RideTiersSection />

        {/* ── HOP MOMENTS ── */}
        <HopMomentsSection />

        {/* ── BLOG PREVIEW ── */}
        <section style={{ backgroundColor: CARD, padding: "5rem 1.5rem", borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
              <div>
                <p style={{ color: ORANGE, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.5rem" }}>NASSAU GUIDE</p>
                <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em" }}>
                  Answers for first-time visitors.
                </h2>
              </div>
              <Link href="/blog" className="hop-link-arrow" style={{ flexShrink: 0 }}>
                All guides
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>

            {/* Carousel */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <BlogGuideCarousel
                posts={[
                  {
                    slug: "no-uber-nassau-bahamas",
                    title: "No Uber in Nassau — Here's What Actually Works",
                    excerpt: "Uber and Lyft don't operate in Nassau. Here's the exact alternative tourists rely on — and why it's actually better.",
                    category: "Nassau Travel Guide",
                    readTime: "4 min read",
                    image: "https://images.pexels.com/photos/34167075/pexels-photo-34167075.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&fit=crop",
                  },
                  {
                    slug: "nassau-taxi-cost-guide-2025",
                    title: "How Much Does a Taxi Cost in Nassau in 2025?",
                    excerpt: "Government-regulated fares, airport pricing tables, and how to avoid being overcharged on your first ride.",
                    category: "Nassau Travel Guide",
                    readTime: "5 min read",
                    image: "https://images.pexels.com/photos/5647593/pexels-photo-5647593.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&fit=crop",
                  },
                  {
                    slug: "nassau-airport-to-atlantis-transfer",
                    title: "Nassau Airport to Atlantis: All Your Options",
                    excerpt: "Shuttle vs taxi vs HOP — with prices, wait times, and a clear recommendation for each type of traveler.",
                    category: "Nassau Travel Guide",
                    readTime: "6 min read",
                    image: "https://images.pexels.com/photos/28443535/pexels-photo-28443535.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&fit=crop",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* ── DOWNLOAD CTA ── */}
        <section
          id="download"
          className="photo-hero"
          style={{ backgroundImage: `url('${PHOTOS.ctaBg}')`, padding: "7rem 1.5rem" }}
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(12,10,6,0.45) 0%, rgba(12,10,6,0.82) 100%)" }} />
          <div style={{ position: "relative", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.35rem 0.85rem", backgroundColor: "rgba(245,160,32,0.15)", border: "1px solid rgba(245,160,32,0.3)", borderRadius: "999px", marginBottom: "1.5rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: ORANGE, display: "block" }} />
              <span style={{ color: ORANGE, fontSize: "0.8rem", fontWeight: 600 }}>Available Now in Nassau</span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, color: TEXT, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "0.75rem", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
              Ride Nassau the smart way.
            </h2>
            <p style={{ fontSize: "1.15rem", fontStyle: "italic", color: "rgba(240,237,232,0.6)", marginBottom: "0.75rem", letterSpacing: "0.01em" }}>
              Every memory starts with a ride.
            </p>
            <p style={{ color: "rgba(240,237,232,0.8)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Book your first ride in under a minute. Or use the web app — no download needed.
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <a
                href="https://app.hopbahamas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: "1.1rem 2.5rem", fontSize: "1.1rem", gap: "0.6rem", boxShadow: "0 0 40px rgba(245,160,32,0.3)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BG} strokeWidth="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
                Get My Ride
              </a>
              <p style={{ color: MUTED, fontSize: "0.78rem" }}>Free cancellation · No card required · Works in browser</p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ height: 1, width: 60, backgroundColor: "rgba(255,255,255,0.15)" }} />
                <span style={{ color: MUTED, fontSize: "0.8rem" }}>or download the app</span>
                <div style={{ height: 1, width: 60, backgroundColor: "rgba(255,255,255,0.15)" }} />
              </div>
              <AppStoreButtons />
            </div>
          </div>
          <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="pexels-credit">Photo via Pexels</a>
        </section>

      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
