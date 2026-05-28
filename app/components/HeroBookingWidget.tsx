"use client"

import { useState } from "react"
import { trackEvent } from "@/lib/analytics"
import { motion, AnimatePresence } from "framer-motion"

const BG = "#161616"
const TEXT = "#f0ede8"
const MUTED = "#8a8070"
const ORANGE = "#F5A020"
const GREEN = "#3aad6e"
const OCEAN = "#0EA5E9"

const EXTRA_PAX = 6
const EXTRA_BAG = 3

const LUX_VEHICLES = [
  { id: "sedan", label: "Sedan", pax: "Up to 4 pax", price: 95 },
  { id: "suv", label: "SUV", pax: "Up to 7 pax", price: 120 },
  { id: "minibus", label: "Mini Bus", pax: "Up to 15 pax", price: 190 },
] as const

const ROUTE_DATA: [string, string, number, number][] = [
  ["Nassau Airport (LPIA)", "Atlantis / Paradise Island", 47, 58],
  ["Nassau Airport (LPIA)", "Cable Beach / Baha Mar", 32, 39],
  ["Nassau Airport (LPIA)", "Downtown Nassau", 38, 47],
  ["Nassau Airport (LPIA)", "South Ocean / Lyford Cay", 57, 70],
  ["Nassau Airport (LPIA)", "Coral Harbour", 33, 42],
  ["Nassau Airport (LPIA)", "Fox Hill", 51, 62],
  ["Nassau Airport (LPIA)", "South Beach", 49, 60],
  ["Cable Beach / Baha Mar", "Atlantis / Paradise Island", 33, 41],
  ["Cable Beach / Baha Mar", "Downtown Nassau", 26, 33],
  ["Cable Beach / Baha Mar", "Nassau Airport (LPIA)", 29, 37],
  ["Cable Beach / Baha Mar", "Fox Hill", 36, 45],
  ["Cable Beach / Baha Mar", "South Beach", 39, 49],
  ["Cable Beach / Baha Mar", "Coral Harbour", 46, 58],
  ["Downtown Nassau", "Atlantis / Paradise Island", 22, 29],
  ["Downtown Nassau", "Cable Beach / Baha Mar", 26, 33],
  ["Downtown Nassau", "Nassau Airport (LPIA)", 35, 45],
  ["Downtown Nassau", "South Beach", 32, 41],
  ["Downtown Nassau", "Fox Hill", 31, 39],
  ["Downtown Nassau", "Coral Harbour", 43, 54],
  ["Atlantis / Paradise Island", "Cable Beach / Baha Mar", 33, 41],
  ["Atlantis / Paradise Island", "Downtown Nassau", 22, 29],
  ["Atlantis / Paradise Island", "Nassau Airport (LPIA)", 44, 55],
  ["Atlantis / Paradise Island", "Fox Hill", 34, 43],
  ["Atlantis / Paradise Island", "South Beach", 36, 45],
  ["Atlantis / Paradise Island", "Coral Harbour", 50, 62],
  ["Montagu / Eastern Road", "Atlantis / Paradise Island", 18, 22],
  ["Montagu / Eastern Road", "Downtown Nassau", 16, 19],
  ["Montagu / Eastern Road", "Cable Beach / Baha Mar", 26, 32],
  ["Montagu / Eastern Road", "Nassau Airport (LPIA)", 40, 48],
  ["Montagu / Eastern Road", "Coral Harbour", 37, 44],
  ["South Beach", "Cable Beach / Baha Mar", 37, 44],
  ["South Beach", "Downtown Nassau", 30, 36],
  ["South Beach", "Atlantis / Paradise Island", 33, 40],
  ["South Beach", "Nassau Airport (LPIA)", 44, 53],
  ["South Beach", "Coral Harbour", 33, 40],
  ["Fox Hill", "Downtown Nassau", 28, 34],
  ["Fox Hill", "Atlantis / Paradise Island", 31, 38],
  ["Fox Hill", "Cable Beach / Baha Mar", 33, 40],
  ["Fox Hill", "Nassau Airport (LPIA)", 46, 55],
  ["Fox Hill", "Coral Harbour", 44, 53],
  ["Coral Harbour", "Cable Beach / Baha Mar", 44, 53],
  ["Coral Harbour", "Downtown Nassau", 40, 49],
  ["Coral Harbour", "Atlantis / Paradise Island", 47, 57],
  ["Coral Harbour", "Nassau Airport (LPIA)", 28, 34],
]

function calcPrice(base: number, pax: number, bags: number) {
  return base + Math.max(0, pax - 2) * EXTRA_PAX + bags * EXTRA_BAG
}

const LOCATIONS = Array.from(new Set(ROUTE_DATA.map((r) => r[0])))

const card: React.CSSProperties = {
  backgroundColor: "rgba(18,16,10,0.82)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 16,
  padding: "1.1rem 1.25rem",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
}

const selectBase: React.CSSProperties = {
  background: "none", border: "none", outline: "none",
  color: TEXT, fontSize: "1.05rem", width: "100%",
  fontFamily: "inherit", padding: 0, cursor: "pointer",
  appearance: "none", WebkitAppearance: "none",
}

function Circle({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{ width: 42, height: 42, borderRadius: "50%", backgroundColor: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {children}
    </div>
  )
}

function Counter({ label, sub, value, min, max, onDec, onInc, accent }: {
  label: string; sub: string; value: number; min: number; max: number;
  onDec: () => void; onInc: () => void; accent: string
}) {
  return (
    <div style={card}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: accent, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.2rem" }}>{label}</p>
        <p style={{ color: MUTED, fontSize: "0.78rem" }}>{sub}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", flexShrink: 0 }}>
        <button type="button" onClick={onDec} disabled={value <= min} style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.06)", color: TEXT, fontWeight: 700, fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: value <= min ? "not-allowed" : "pointer", fontFamily: "inherit", padding: 0, opacity: value <= min ? 0.3 : 1 }}>−</button>
        <span style={{ color: TEXT, fontWeight: 800, fontSize: "1.15rem", minWidth: 22, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>{value}</span>
        <button type="button" onClick={onInc} disabled={value >= max} style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.06)", color: TEXT, fontWeight: 700, fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: value >= max ? "not-allowed" : "pointer", fontFamily: "inherit", padding: 0, opacity: value >= max ? 0.3 : 1 }}>+</button>
      </div>
    </div>
  )
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "110%" : "-110%", opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] } },
  exit: (dir: number) => ({ x: dir > 0 ? "-110%" : "110%", opacity: 0, transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] } }),
}

const APP_URL = "https://app.hopbahamas.com"
const APP_STORE_URL = "https://apps.apple.com/us/app/hop-bahamas/id6756782428"
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.hopbahamas.rider"

export default function HeroBookingWidget() {
  const [step, setStep] = useState<"route" | "fares">("route")
  const [dir, setDir] = useState(1)
  const [pickup, setPickup] = useState("")
  const [dropoff, setDropoff] = useState("")
  const [pax, setPax] = useState(2)
  const [bags, setBags] = useState(0)

  const dropoffOptions = pickup
    ? ROUTE_DATA.filter((r) => r[0] === pickup).map((r) => r[1])
    : Array.from(new Set(ROUTE_DATA.map((r) => r[1])))

  const match = ROUTE_DATA.find((r) => r[0] === pickup && r[1] === dropoff)
  const ecoPrice = match ? calcPrice(match[2], pax, bags) : null
  const stdPrice = match ? calcPrice(match[3], pax, bags) : null

  function showFares() {
    trackEvent("fare_check", { pickup, dropoff, pax })
    setDir(1)
    setStep("fares")
  }

  function reset() {
    setDir(-1)
    setStep("route")
    setPickup("")
    setDropoff("")
    setPax(2)
    setBags(0)
  }

  function bookNow(tier: string, price: number) {
    trackEvent("book_now_click", { tier, price, pickup, dropoff })
    window.open(APP_URL, "_blank", "noopener,noreferrer")
  }

  const tiers = [
    {
      tag: "ECO", name: "Economic", sub: "Solo trips & short hops",
      price: ecoPrice ? `$${ecoPrice}` : "—",
      color: GREEN, tier: "eco",
      numPrice: ecoPrice ?? 0,
    },
    {
      tag: "STD", name: "Standard", sub: "Most popular · daily comfort",
      price: stdPrice ? `$${stdPrice}` : "—",
      color: ORANGE, tier: "standard",
      numPrice: stdPrice ?? 0,
    },
    ...LUX_VEHICLES.map((v) => ({
      tag: "LUX", name: `Luxury ${v.label}`, sub: v.pax,
      price: `$${v.price}`,
      color: "#d4a855", tier: "luxury",
      numPrice: v.price,
    })),
  ]

  return (
    <div style={{ width: "100%", maxWidth: 460 }}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          {step === "route" && (
            <motion.div key="route" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <p style={{ color: MUTED, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.25rem" }}>GET YOUR FARE ESTIMATE</p>

                {/* Pickup */}
                <div style={card}>
                  <Circle color={ORANGE}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></svg>
                  </Circle>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: ORANGE, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.2rem" }}>FROM</p>
                    <select value={pickup} onChange={(e) => { setPickup(e.target.value); setDropoff("") }} style={selectBase}>
                      <option value="" disabled style={{ background: BG }}>Select pickup location</option>
                      {LOCATIONS.map((l) => <option key={l} value={l} style={{ background: BG }}>{l}</option>)}
                    </select>
                  </div>
                </div>

                {/* Dropoff */}
                <div style={{ ...card, opacity: pickup ? 1 : 0.5 }}>
                  <Circle color={GREEN}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={GREEN} stroke="none" /></svg>
                  </Circle>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: GREEN, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.2rem" }}>TO</p>
                    <select value={dropoff} onChange={(e) => setDropoff(e.target.value)} disabled={!pickup} style={{ ...selectBase, opacity: pickup ? 1 : 0.5 }}>
                      <option value="" disabled style={{ background: BG }}>Select destination</option>
                      {dropoffOptions.map((l) => <option key={l} value={l} style={{ background: BG }}>{l}</option>)}
                    </select>
                  </div>
                </div>

                {/* Pax + Bags */}
                <Counter label="PASSENGERS" sub="How many people?" value={pax} min={1} max={15} onDec={() => setPax((p) => p - 1)} onInc={() => setPax((p) => p + 1)} accent={OCEAN} />
                <Counter label="BAGS" sub="Checked luggage pieces" value={bags} min={0} max={10} onDec={() => setBags((b) => b - 1)} onInc={() => setBags((b) => b + 1)} accent={MUTED} />

                <button
                  onClick={showFares}
                  disabled={!pickup || !dropoff}
                  style={{ width: "100%", padding: "1rem", backgroundColor: pickup && dropoff ? ORANGE : "rgba(245,160,32,0.28)", border: "none", borderRadius: 999, color: BG, fontWeight: 800, fontSize: "1rem", cursor: pickup && dropoff ? "pointer" : "not-allowed", fontFamily: "inherit", boxShadow: pickup && dropoff ? "0 4px 20px rgba(245,160,32,0.28)" : "none", marginTop: "0.25rem" }}
                >
                  See fares →
                </button>
              </div>
            </motion.div>
          )}

          {step === "fares" && (
            <motion.div key="fares" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ marginBottom: "0.25rem" }}>
                  <p style={{ color: MUTED, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.3rem" }}>FARE ESTIMATE</p>
                  <p style={{ color: TEXT, fontWeight: 800, fontSize: "1rem" }}>{pickup} → {dropoff}</p>
                  <p style={{ color: MUTED, fontSize: "0.78rem" }}>{pax} passenger{pax > 1 ? "s" : ""}{bags > 0 ? ` · ${bags} bag${bags > 1 ? "s" : ""}` : ""} · fixed price, no surge</p>
                </div>

                {tiers.map((t) => (
                  <FareCard key={t.name} tag={t.tag} name={t.name} sub={t.sub} price={t.price} color={t.color} onBook={() => bookNow(t.tier, t.numPrice)} />
                ))}

                <div style={{ backgroundColor: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "1rem 1.25rem", marginTop: "0.25rem" }}>
                  <p style={{ color: MUTED, fontSize: "0.72rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                    Ready to book? Create your account on the HOP app and complete your booking in under 2 minutes.
                  </p>
                  <a
                    href={APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("book_now_click", { pickup, dropoff, source: "widget_cta" })}
                    style={{ display: "block", width: "100%", padding: "0.95rem", backgroundColor: ORANGE, borderRadius: 999, color: BG, fontWeight: 800, fontSize: "1rem", textDecoration: "none", textAlign: "center", boxSizing: "border-box" as const, marginBottom: "0.5rem", boxShadow: "0 4px 20px rgba(245,160,32,0.28)" }}
                  >
                    Book now at app.hopbahamas.com →
                  </a>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "block", padding: "0.65rem", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, color: TEXT, fontWeight: 600, fontSize: "0.78rem", textDecoration: "none", textAlign: "center", boxSizing: "border-box" as const }}>
                      App Store
                    </a>
                    <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "block", padding: "0.65rem", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, color: TEXT, fontWeight: 600, fontSize: "0.78rem", textDecoration: "none", textAlign: "center", boxSizing: "border-box" as const }}>
                      Google Play
                    </a>
                  </div>
                </div>

                <button onClick={reset} style={{ padding: "0.6rem", backgroundColor: "transparent", border: "none", borderRadius: 999, color: MUTED, fontWeight: 500, fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit" }}>
                  ← Check another route
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step === "route" && (
        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", marginTop: "1rem", alignItems: "center" }}>
          <a href="#testimonials" style={{ display: "flex", alignItems: "center", gap: "0.3rem", textDecoration: "none" }}>
            <span style={{ color: ORANGE, fontSize: "0.82rem", fontWeight: 800 }}>4.9 ★</span>
            <span style={{ color: MUTED, fontSize: "0.78rem" }}>reviews</span>
          </a>
          {[{ dot: GREEN, label: "12,400+ rides" }, { dot: ORANGE, label: "Verified drivers" }].map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: s.dot, display: "block", flexShrink: 0 }} />
              <span style={{ color: MUTED, fontSize: "0.78rem" }}>{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function FareCard({ tag, name, sub, price, color, onBook }: {
  tag: string; name: string; sub: string; price: string; color: string; onBook: () => void
}) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onBook}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "100%", display: "flex", alignItems: "center", gap: "1rem",
        backgroundColor: hover ? `${color}12` : "rgba(18,16,10,0.82)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${hover ? color + "50" : "rgba(255,255,255,0.1)"}`,
        borderRadius: 16, padding: "1rem 1.25rem",
        cursor: "pointer", fontFamily: "inherit", textAlign: "left",
        transition: "border-color 0.15s, background-color 0.15s",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ width: 42, height: 42, borderRadius: "50%", backgroundColor: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontSize: "0.6rem", fontWeight: 800, color }}>{tag}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: TEXT, fontWeight: 700, fontSize: "0.95rem" }}>{name}</p>
        <p style={{ color: MUTED, fontSize: "0.75rem", marginTop: "0.1rem" }}>{sub}</p>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ color, fontWeight: 900, fontSize: "1.5rem", letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>{price}</p>
        <p style={{ color: MUTED, fontSize: "0.65rem", marginTop: "0.1rem" }}>Book on app →</p>
      </div>
    </button>
  )
}
