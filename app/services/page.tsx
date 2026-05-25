"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { FeatureCarousel } from "@/components/ui/feature-carousel";

const ORANGE = "#F5A020";
const BG = "#0a0806";
const CARD = "#161410";
const CARD2 = "#1e1c14";
const GOLD = "#d4a855";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const BORDER = "rgba(255,255,255,0.06)";

function FadeUp({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

const TIERS = [
  {
    badge: "ECO", color: MUTED,
    name: "Economic",
    price: "from $15",
    desc: "Lowest fare tier. Best for solo trips and flexible timing.",
    sub: "~5 min longer pickup · standard comfort",
  },
  {
    badge: "STD", color: ORANGE,
    name: "Standard",
    price: "from $20",
    desc: "Most popular. Reliable matching and fair pricing.",
    sub: "Fastest average pickup · daily driver comfort",
    popular: true,
  },
  {
    badge: "LUX", color: GOLD,
    name: "Luxury",
    price: "from $95",
    desc: "Flat rate across all Nassau. Sedan, SUV, or Mini Bus.",
    sub: "Priority matching · premium comfort",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: BG, minHeight: "100vh" }}>

        {/* ── HERO ── */}
        <section style={{ position: "relative", overflow: "hidden", minHeight: "60vh", display: "flex", alignItems: "center" }}>
          <Image
            src="/images/hero-bahamas.jpg"
            alt="Nassau Bahamas"
            fill
            style={{ objectFit: "cover", objectPosition: "center 40%", opacity: 0.3 }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(10,8,6,0.85) 0%, rgba(10,8,6,0.5) 55%, rgba(10,8,6,0.9) 100%)" }} />

          <div style={{ position: "relative", width: "100%", maxWidth: 1200, margin: "0 auto", padding: "clamp(5.5rem,10vw,8rem) 1.5rem 4rem" }}>
            <FadeUp>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <Link href="/" style={{ color: MUTED, fontSize: "0.875rem", textDecoration: "none" }}>Home</Link>
                <span style={{ color: MUTED, fontSize: "0.875rem" }}>/</span>
                <span style={{ color: ORANGE, fontSize: "0.875rem", fontWeight: 600 }}>Rides</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.05}>
              <p style={{ color: ORANGE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "1rem" }}>NASSAU, BAHAMAS</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 style={{
                fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)",
                fontWeight: 900,
                color: TEXT,
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
                marginBottom: "1.25rem",
                maxWidth: 740,
              }}>
                Every way to ride<br />
                <span style={{ color: ORANGE }}>in Nassau.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p style={{ color: MUTED, fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 500, marginBottom: "2rem" }}>
                Economic, Standard, and Luxury. Fixed pricing, scheduled pickups, and ride-share — all designed for Nassau.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <a
                  href="https://app.hopbahamas.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  onClick={() => trackEvent("cta_click", { label: "book_ride", location: "services_hero" })}
                  style={{ padding: "0.875rem 1.75rem", fontSize: "0.95rem", textDecoration: "none", gap: "0.5rem" }}
                >
                  Book a Ride
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
                <a href="#tiers" style={{ padding: "0.875rem 1.75rem", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: TEXT, borderRadius: 999, fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}>
                  Compare tiers
                </a>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── FEATURE CAROUSEL ── */}
        <section style={{ backgroundColor: BG, padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <p style={{ color: ORANGE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.75rem" }}>WHAT HOP OFFERS</p>
                <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
                  Every feature. Explored.
                </h2>
                <p style={{ color: MUTED, fontSize: "0.95rem", maxWidth: 420, margin: "0 auto" }}>
                  Tap any feature to learn what makes HOP different for Nassau travel.
                </p>
              </div>
            </FadeUp>
            <FeatureCarousel />
          </div>
        </section>

        {/* ── RIDE TIERS SUMMARY ── */}
        <section id="tiers" style={{ backgroundColor: CARD, padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <FadeUp>
              <p style={{ color: ORANGE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.75rem" }}>RIDE TIERS</p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.025em", marginBottom: "0.5rem" }}>
                Three tiers. One price shown upfront.
              </h2>
              <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "3rem", maxWidth: 480 }}>
                Every tier shows your complete fare before you confirm. No meter, no surprise at drop-off.
              </p>
            </FadeUp>

            <div>
              {TIERS.map((tier, i) => (
                <motion.div
                  key={tier.badge}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    borderTop: `1px solid ${BORDER}`,
                    padding: "1.75rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    position: "relative",
                  }}
                >
                  {tier.popular && (
                    <div style={{
                      position: "absolute", top: 0, right: 0,
                      backgroundColor: ORANGE, color: BG,
                      fontSize: "0.6rem", fontWeight: 800, padding: "0.2rem 0.75rem",
                      borderRadius: "0 0 0 8px",
                    }}>MOST POPULAR</div>
                  )}
                  <span style={{
                    fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.1em",
                    color: tier.color, backgroundColor: `${tier.color}1a`,
                    border: `1px solid ${tier.color}30`,
                    padding: "0.25rem 0.6rem", borderRadius: 999,
                    flexShrink: 0, minWidth: 48, textAlign: "center",
                  }}>
                    {tier.badge}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: TEXT, fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.2rem" }}>{tier.name}</p>
                    <p style={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.5, marginBottom: "0.25rem" }}>{tier.desc}</p>
                    <p style={{ color: tier.color, fontSize: "0.75rem", fontWeight: 600, opacity: 0.75 }}>{tier.sub}</p>
                  </div>
                  <span style={{ color: tier.color, fontWeight: 700, fontSize: "0.95rem", flexShrink: 0 }}>{tier.price}</span>
                </motion.div>
              ))}
              <div style={{ borderTop: `1px solid ${BORDER}` }} />
            </div>

            <FadeUp delay={0.1}>
              <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a
                  href="https://app.hopbahamas.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  onClick={() => trackEvent("cta_click", { label: "book_ride", location: "services_tiers" })}
                  style={{ padding: "0.875rem 1.75rem", fontSize: "0.925rem", textDecoration: "none", gap: "0.5rem" }}
                >
                  Book your ride
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
                <Link
                  href="/#download"
                  style={{ color: ORANGE, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.875rem 0" }}
                >
                  Download the app
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── SAFETY + SCREENSHOTS ── */}
        <section style={{ backgroundColor: BG, padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "grid", gap: "4rem", alignItems: "center" }} className="services-two-col">
              <FadeUp>
                <p style={{ color: "#E84040", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.75rem" }}>SAFETY</p>
                <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.025em", marginBottom: "0.75rem" }}>
                  Safety built in.<br /><span style={{ color: "#E84040" }}>Not an afterthought.</span>
                </h2>
                <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 440 }}>
                  SOS button, trusted contacts, live location sharing, driver verification, and a dedicated Safety Desk — all active on every ride.
                </p>
                {[
                  { label: "SOS button — calls 919 + alerts safety desk", color: "#E84040" },
                  { label: "Trusted contacts receive live tracking on SOS", color: "#E84040" },
                  { label: "Share live location from any ride screen", color: ORANGE },
                  { label: "All drivers are ID-verified", color: "#3aad6e" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.875rem" }}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: item.color, flexShrink: 0, marginTop: 6 }} />
                    <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.5 }}>{item.label}</p>
                  </motion.div>
                ))}
              </FadeUp>

              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}
              >
                <div style={{ opacity: 0.7, transform: "rotate(-4deg) translateY(10px) scale(0.88)" }}>
                  <div style={{ display: "inline-block", borderRadius: 36, padding: 8, background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)", boxShadow: "0 24px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)" }}>
                    <div style={{ borderRadius: 30, overflow: "hidden", width: 180, height: 390 }}>
                      <Image src="/screenshots/home-map.png" alt="HOP ride map" width={180} height={390} style={{ objectFit: "cover", display: "block" }} />
                    </div>
                  </div>
                </div>
                <div style={{ transform: "translateY(-10px)" }}>
                  <div style={{ display: "inline-block", borderRadius: 44, padding: 10, background: "linear-gradient(145deg, #2e2e2e, #181818)", boxShadow: "0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.09)", filter: "drop-shadow(0 16px 48px rgba(245,160,32,0.12))" }}>
                    <div style={{ borderRadius: 36, overflow: "hidden", width: 210, height: 454 }}>
                      <Image src="/screenshots/sos.png" alt="HOP SOS emergency screen" width={210} height={454} style={{ objectFit: "cover", display: "block" }} />
                    </div>
                  </div>
                </div>
                <div style={{ opacity: 0.7, transform: "rotate(4deg) translateY(10px) scale(0.88)" }}>
                  <div style={{ display: "inline-block", borderRadius: 36, padding: 8, background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)", boxShadow: "0 24px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)" }}>
                    <div style={{ borderRadius: 30, overflow: "hidden", width: 180, height: 390 }}>
                      <Image src="/screenshots/ride-in-progress.png" alt="HOP ride in progress" width={180} height={390} style={{ objectFit: "cover", display: "block" }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ position: "relative", overflow: "hidden", padding: "6rem 1.5rem", textAlign: "center" }}>
          <Image src="/images/cta-bahamas.jpg" alt="Nassau" fill style={{ objectFit: "cover", opacity: 0.2 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,8,6,0.75) 0%, rgba(10,8,6,0.96) 100%)" }} />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}
          >
            <p style={{ color: ORANGE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "1rem" }}>READY TO RIDE</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: TEXT, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "0.75rem" }}>
              Book your first HOP<br />ride in Nassau.
            </h2>
            <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Fixed price. Real-time tracking. No flagging required. Available now.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.875rem" }}>
              <a
                href="https://app.hopbahamas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                onClick={() => trackEvent("cta_click", { label: "book_ride", location: "services_cta_bottom" })}
                style={{ padding: "0.9rem 2rem", fontSize: "0.95rem", textDecoration: "none" }}
              >
                Book via Web App
              </a>
              <a href="/#download" style={{ padding: "0.9rem 2rem", backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", color: TEXT, borderRadius: 999, fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}>
                Download the App
              </a>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (min-width: 768px) { .services-two-col { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 767px) { .services-two-col { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
