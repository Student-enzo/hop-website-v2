import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOP Rides — Nassau Bahamas Transportation Services",
  description:
    "Economic, Standard, and Luxury rides in Nassau. Sedan from $95, SUV from $120, Mini Bus from $190. Scheduled pickups, ride share, priority rides, and Low Data Mode.",
};

const ORANGE = "#F5A020";
const BG = "#161616";
const CARD = "#1e1c14";
const CARD2 = "#222018";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const BORDER = "rgba(255,255,255,0.06)";

function SectionDivider({ id, label, color = ORANGE }: { id: string; label: string; color?: string }) {
  return (
    <div id={id} style={{ borderTop: `1px solid ${BORDER}`, padding: "3.5rem 1.5rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <span
          style={{
            display: "inline-block",
            padding: "0.3rem 0.8rem",
            backgroundColor: `${color}18`,
            border: `1px solid ${color}30`,
            borderRadius: "999px",
            color,
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            marginBottom: "2rem",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

const VEHICLES = [
  {
    name: "Sedan",
    capacity: "4 passengers",
    price: "$95 fixed",
    desc: "Executive sedan for city rides and premium pickups. Great for solo or duo airport transfers.",
    tag: "Most popular for tourists",
  },
  {
    name: "SUV",
    capacity: "7 passengers",
    price: "$120 fixed",
    desc: "More comfort, more luggage room, and premium space for families or small groups.",
    tag: "Best for families",
  },
  {
    name: "Mini Bus",
    capacity: "15 passengers",
    price: "$190 fixed",
    desc: "Best for large groups, wedding parties, airport pickups, and corporate transfers.",
    tag: "Best for large groups",
  },
  {
    name: "Luggage Car",
    capacity: "Add-on",
    price: "Add-on",
    desc: "A dedicated support vehicle for extra boxes, bags, and oversized luggage. Added alongside another vehicle.",
    tag: "Extra luggage option",
  },
];

const DIFFERENTIATORS = [
  {
    id: "transparent",
    title: "Transparent pricing",
    desc: "You see the fare before the driver moves. No meter running. No surprises. Luxury rides are flat-rate across all of Nassau — Sedan $95, SUV $120, Mini Bus $190.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    id: "low-data",
    title: "Low Data Mode",
    desc: "On weak Bahamian signal, HOP stays functional. Maps pause — but ride tracking, ETA updates, and driver chat continue. Designed for island connectivity.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2">
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
      </svg>
    ),
  },
  {
    id: "rideshare",
    title: "Ride Share",
    desc: "Split the cost on Standard rides. Same great experience, shared fare. Available on any Standard trip.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "priority",
    title: "Priority queue",
    desc: "Add +$4 to any ride to jump the driver matching queue. Requires a saved HOP card. Useful when time matters.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: "luggage",
    title: "Luggage-aware",
    desc: "Every ride has a separate luggage counter. Add large bags and the app adjusts your vehicle recommendation automatically.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    id: "cash",
    title: "Credit/debit card",
    desc: "Pay with any major credit or debit card. Secure, fast, and accepted across all ride types.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "88px" }}>
        {/* Header */}
        <section style={{ backgroundColor: BG, padding: "4rem 1.5rem 3rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <Link href="/" style={{ color: MUTED, fontSize: "0.875rem", textDecoration: "none" }}>Home</Link>
              <span style={{ color: MUTED, fontSize: "0.875rem" }}>/</span>
              <span style={{ color: ORANGE, fontSize: "0.875rem", fontWeight: 600 }}>Rides</span>
            </div>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 900,
                color: TEXT,
                letterSpacing: "-0.03em",
                marginBottom: "1rem",
                maxWidth: 700,
              }}
            >
              Every ride option — explained clearly.
            </h1>
            <p style={{ color: MUTED, fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 560 }}>
              Economic, Standard, and Luxury. Fixed pricing, scheduled pickups, and ride-share — all designed for Nassau.
            </p>
          </div>
        </section>

        {/* ── RIDE TIERS ── */}
        <section style={{ backgroundColor: CARD, padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
              Ride tiers
            </h2>
            <p style={{ color: MUTED, fontSize: "0.9rem", marginBottom: "2.5rem" }}>
              Three options. All show the full price before you confirm.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Economic */}
              <div style={{ backgroundColor: CARD2, borderRadius: 20, border: `1px solid ${BORDER}`, padding: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }} className="grid-cols-1 md:grid-cols-2">
                <div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.08em", color: MUTED, backgroundColor: `${MUTED}18`, padding: "0.2rem 0.6rem", borderRadius: "999px" }}>ECO</span>
                  <h3 style={{ color: TEXT, fontWeight: 800, fontSize: "1.4rem", margin: "0.5rem 0 0.75rem" }}>Economic</h3>
                  <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" }}>
                    The lowest fare tier. Best for solo trips and short distances where timing is flexible. May take slightly longer to match with a driver.
                  </p>
                  <p style={{ color: MUTED, fontSize: "0.85rem", lineHeight: 1.65, padding: "0.875rem", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: 12, border: `1px solid ${BORDER}` }}>
                    <strong style={{ color: TEXT }}>Good to know:</strong> Economic keeps your fare lower, but it may be less attractive to nearby drivers. You can start the search; if matching takes longer, you can improve the offer while HOP keeps looking.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ padding: "1rem 1.25rem", backgroundColor: BG, borderRadius: 14, border: `1px solid ${BORDER}` }}>
                    <p style={{ color: MUTED, fontSize: "0.75rem", marginBottom: "0.2rem" }}>Fare</p>
                    <p style={{ color: TEXT, fontWeight: 700 }}>Distance-based · Lowest tier</p>
                  </div>
                  <div style={{ padding: "1rem 1.25rem", backgroundColor: BG, borderRadius: 14, border: `1px solid ${BORDER}` }}>
                    <p style={{ color: MUTED, fontSize: "0.75rem", marginBottom: "0.2rem" }}>VAT</p>
                    <p style={{ color: TEXT, fontWeight: 700 }}>12% applied to all rides</p>
                  </div>
                  <div style={{ padding: "1rem 1.25rem", backgroundColor: BG, borderRadius: 14, border: `1px solid ${BORDER}` }}>
                    <p style={{ color: MUTED, fontSize: "0.75rem", marginBottom: "0.2rem" }}>Best for</p>
                    <p style={{ color: TEXT, fontWeight: 700 }}>Budget trips, flexible timing</p>
                  </div>
                </div>
              </div>

              {/* Standard */}
              <div style={{ backgroundColor: "rgba(245,160,32,0.06)", borderRadius: 20, border: "1px solid rgba(245,160,32,0.2)", padding: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start", position: "relative" }} className="grid-cols-1 md:grid-cols-2">
                <div style={{ position: "absolute", top: -1, right: 20, backgroundColor: ORANGE, color: BG, fontSize: "0.7rem", fontWeight: 800, padding: "0.25rem 0.75rem", borderRadius: "0 0 8px 8px" }}>MOST COMMON</div>
                <div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.08em", color: ORANGE, backgroundColor: `${ORANGE}18`, padding: "0.2rem 0.6rem", borderRadius: "999px" }}>STAND</span>
                  <h3 style={{ color: TEXT, fontWeight: 800, fontSize: "1.4rem", margin: "0.5rem 0 0.75rem" }}>Standard</h3>
                  <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" }}>
                    The default tier. Reliable matching, comfortable vehicle, fair pricing. Most passengers use Standard for everyday trips across Nassau.
                  </p>
                  <p style={{ color: MUTED, fontSize: "0.85rem", lineHeight: 1.65, padding: "0.875rem", backgroundColor: "rgba(245,160,32,0.04)", borderRadius: 12, border: "1px solid rgba(245,160,32,0.12)" }}>
                    <strong style={{ color: TEXT }}>Bahamian law:</strong> For more than 2 passengers, HOP is obligated by Bahamian law to charge per extra passenger. This is a required disclosure — not an upsell.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ padding: "1rem 1.25rem", backgroundColor: BG, borderRadius: 14, border: `1px solid ${BORDER}` }}>
                    <p style={{ color: MUTED, fontSize: "0.75rem", marginBottom: "0.2rem" }}>Fare</p>
                    <p style={{ color: TEXT, fontWeight: 700 }}>Distance-based · Standard rate</p>
                  </div>
                  <div style={{ padding: "1rem 1.25rem", backgroundColor: BG, borderRadius: 14, border: `1px solid ${BORDER}` }}>
                    <p style={{ color: MUTED, fontSize: "0.75rem", marginBottom: "0.2rem" }}>Ride Share</p>
                    <p style={{ color: ORANGE, fontWeight: 700 }}>Available — split cost with others</p>
                  </div>
                  <div style={{ padding: "1rem 1.25rem", backgroundColor: BG, borderRadius: 14, border: `1px solid ${BORDER}` }}>
                    <p style={{ color: MUTED, fontSize: "0.75rem", marginBottom: "0.2rem" }}>Best for</p>
                    <p style={{ color: TEXT, fontWeight: 700 }}>Most everyday trips in Nassau</p>
                  </div>
                </div>
              </div>

              {/* Luxury */}
              <div id="luxury" style={{ backgroundColor: "rgba(212,168,85,0.04)", borderRadius: 20, border: "1px solid rgba(212,168,85,0.15)", padding: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }} className="grid-cols-1 md:grid-cols-2">
                <div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.08em", color: "#d4a855", backgroundColor: "#d4a85518", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>LUX</span>
                  <h3 style={{ color: TEXT, fontWeight: 800, fontSize: "1.4rem", margin: "0.5rem 0 0.75rem" }}>Luxury</h3>
                  <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" }}>
                    Premium vehicles at flat rates. No distance charges — just one price for any destination in Nassau. Two pricing modes: Fixed Price (flat rate) or Hourly Service (private driver by the hour).
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {VEHICLES.map((v) => (
                      <div
                        key={v.name}
                        style={{
                          padding: "0.5rem 0.875rem",
                          backgroundColor: CARD2,
                          borderRadius: 10,
                          border: "1px solid rgba(212,168,85,0.15)",
                        }}
                      >
                        <p style={{ color: "#d4a855", fontWeight: 700, fontSize: "0.8rem" }}>{v.name}</p>
                        <p style={{ color: MUTED, fontSize: "0.7rem" }}>{v.capacity} · {v.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${BORDER}`, position: "relative", minHeight: 260 }} className="hidden md:block">
                  <Image
                    src="/screenshots/luxury-vehicles.png"
                    alt="HOP Luxury vehicle options: Sedan, SUV, Mini Bus, Luggage Car"
                    fill
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SCHEDULE ── */}
        <SectionDivider id="schedule" label="SCHEDULE" />
        <section style={{ backgroundColor: BG, padding: "2rem 1.5rem 4rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
              Scheduled rides
            </h2>
            <p style={{ color: MUTED, fontSize: "0.9rem", marginBottom: "3rem", maxWidth: 560 }}>
              Plan rides days or weeks in advance. Route, date, time, group size — all locked in before the ride day.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
              {[
                {
                  step: "Route",
                  desc: "Set your pickup and dropoff. HOP shows the trip distance and estimated time.",
                },
                {
                  step: "Calendar",
                  desc: "Pick the date, exact time (morning / afternoon / night), and how often it repeats.",
                },
                {
                  step: "Group",
                  desc: "Choose Economic, Standard, or Luxury. Set passenger count and luggage.",
                },
                {
                  step: "Summary",
                  desc: "Full price breakdown — base fare + 12% VAT. Confirm with cash or a saved card.",
                },
              ].map((s, i) => (
                <div key={s.step} style={{ backgroundColor: CARD, borderRadius: 20, border: `1px solid ${BORDER}`, padding: "1.5rem" }}>
                  <span style={{ color: ORANGE, fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.05em" }}>STEP {i + 1}</span>
                  <h3 style={{ color: TEXT, fontWeight: 700, fontSize: "1.1rem", margin: "0.4rem 0 0.5rem" }}>{s.step}</h3>
                  <p style={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Use cases */}
            <div style={{ backgroundColor: CARD, borderRadius: 20, border: `1px solid ${BORDER}`, padding: "2rem" }}>
              <h3 style={{ color: TEXT, fontWeight: 700, fontSize: "1.1rem", marginBottom: "1.25rem" }}>Common scheduled ride use cases</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                {[
                  { title: "Airport pickups", detail: "Lynden Pindling International — schedule days in advance." },
                  { title: "Hotel transfers", detail: "Atlantis, Baha Mar, Nassau Cruise Terminal." },
                  { title: "School runs", detail: "Weekday repeating schedules for regular routes." },
                  { title: "Hospital appointments", detail: "One-time pickup at a specific morning time." },
                  { title: "Group events", detail: "Coordinate multi-passenger pickup for parties and events." },
                ].map((uc) => (
                  <div key={uc.title} style={{ padding: "1rem", backgroundColor: CARD2, borderRadius: 14, border: `1px solid ${BORDER}` }}>
                    <p style={{ color: ORANGE, fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.3rem" }}>{uc.title}</p>
                    <p style={{ color: MUTED, fontSize: "0.8rem" }}>{uc.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SAFETY ── */}
        <SectionDivider id="safety" label="SAFETY" color="#E84040" />
        <section style={{ backgroundColor: CARD, padding: "2rem 1.5rem 4rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="grid-cols-1 md:grid-cols-2">
              <div>
                <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
                  Safety features
                </h2>
                <p style={{ color: MUTED, fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.7 }}>
                  Safety is built into every ride — not an add-on. These features work automatically in the background, and activate instantly when you need them.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    {
                      title: "SOS button",
                      desc: "Visible on the home screen and throughout every ride state. Tap to trigger a 3-second countdown. Can call 919, alert the RIDE Safety Desk, and message trusted contacts — all at once.",
                      color: "#E84040",
                    },
                    {
                      title: "RIDE Safety Desk",
                      desc: "HOP's internal monitoring team. When you trigger SOS, they receive your ride details and coordinate help with local services.",
                      color: "#E84040",
                    },
                    {
                      title: "Trusted contacts",
                      desc: "Pre-set contacts receive a live tracking link when SOS is triggered. Set up in the Safety Toolkit under your profile.",
                      color: "#E84040",
                    },
                    {
                      title: "Share location",
                      desc: "During any ride, send a live location link to anyone directly from the map screen.",
                      color: ORANGE,
                    },
                    {
                      title: "Driver verification",
                      desc: "Drivers are ID-verified before they can accept rides. Rating system creates additional accountability.",
                      color: "#3aad6e",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        padding: "1.125rem",
                        backgroundColor: CARD2,
                        borderRadius: 16,
                        border: `1px solid ${BORDER}`,
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          backgroundColor: `${item.color}18`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2.5">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <div>
                        <p style={{ color: TEXT, fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.25rem" }}>{item.title}</p>
                        <p style={{ color: MUTED, fontSize: "0.8rem", lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", paddingTop: "3rem" }} className="hidden md:flex">
                <div style={{ borderRadius: 48, padding: 10, background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)", boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)" }}>
                  <div style={{ borderRadius: 40, overflow: "hidden", width: 220, height: 476 }}>
                    <Image src="/screenshots/sos.png" alt="HOP SOS modal with emergency alert options" width={220} height={476} style={{ objectFit: "cover", display: "block" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── REWARDS ── */}
        <SectionDivider id="rewards" label="HOP MOMENTS & REWARDS" />
        <section style={{ backgroundColor: BG, padding: "2rem 1.5rem 4rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="grid-cols-1 md:grid-cols-2">
              <div>
                <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
                  Hop Moments & Rewards
                </h2>
                <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                  Share moments of Nassau — photos, videos, reels — and earn points. Hit milestones to unlock rewards. It&apos;s part loyalty program, part community.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                  {[
                    { type: "Photo", pts: "50 pts", icon: "📷" },
                    { type: "Video", pts: "100 pts", icon: "🎬" },
                    { type: "Reel", pts: "195 pts", icon: "✨" },
                    { type: "Ride complete", pts: "TBD", icon: "🚗" },
                  ].map((item) => (
                    <div
                      key={item.type}
                      style={{
                        padding: "1rem",
                        backgroundColor: CARD,
                        borderRadius: 14,
                        border: `1px solid ${BORDER}`,
                        textAlign: "center",
                      }}
                    >
                      <p style={{ color: TEXT, fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.25rem" }}>{item.type}</p>
                      <p style={{ color: ORANGE, fontSize: "0.875rem", fontWeight: 700 }}>{item.pts}</p>
                    </div>
                  ))}
                </div>
                <div style={{ backgroundColor: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: "1.25rem" }}>
                  <p style={{ color: TEXT, fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.75rem" }}>Reward milestones</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ flex: 1, height: 6, backgroundColor: CARD2, borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ width: "25%", height: "100%", backgroundColor: ORANGE, borderRadius: 999 }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                    {["250", "500", "750", "1000"].map((m) => (
                      <span key={m} style={{ color: MUTED, fontSize: "0.7rem" }}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }} className="hidden md:flex">
                <div style={{ borderRadius: 48, padding: 10, background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)", boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)" }}>
                  <div style={{ borderRadius: 40, overflow: "hidden", width: 220, height: 476 }}>
                    <Image src="/screenshots/hop-moments-rewards.png" alt="HOP Moments rewards screen" width={220} height={476} style={{ objectFit: "cover", display: "block" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DIFFERENTIATORS ── */}
        <section style={{ backgroundColor: CARD, padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: "2.5rem" }}>
              More reasons to use HOP
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {DIFFERENTIATORS.map((d) => (
                <div
                  key={d.id}
                  id={d.id}
                  style={{ backgroundColor: CARD2, borderRadius: 20, border: `1px solid ${BORDER}`, padding: "1.5rem" }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(245,160,32,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                    {d.icon}
                  </div>
                  <h3 style={{ color: TEXT, fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem" }}>{d.title}</h3>
                  <p style={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.65 }}>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: BG, padding: "4rem 1.5rem", textAlign: "center" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 900, color: TEXT, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
              Ready to ride?
            </h2>
            <p style={{ color: MUTED, fontSize: "1rem", marginBottom: "2rem" }}>
              Book now via the web app or download HOP on your phone.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
              <a
                href="https://app.hopbahamas.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "0.875rem 2rem", backgroundColor: ORANGE, color: BG, borderRadius: "999px", fontWeight: 700, textDecoration: "none" }}
              >
                Book a Ride Now
              </a>
              <a
                href="#"
                style={{ padding: "0.875rem 2rem", backgroundColor: CARD, border: `1px solid ${BORDER}`, color: TEXT, borderRadius: "999px", fontWeight: 600, textDecoration: "none" }}
              >
                Download the App
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
