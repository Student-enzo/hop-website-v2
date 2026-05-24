"use client"

import { useState, useRef } from "react"
import { trackEvent } from "@/lib/analytics"
import { motion, AnimatePresence } from "framer-motion"
import { getSupabase } from "@/lib/supabase"

const BG = "#161616"
const TEXT = "#f0ede8"
const MUTED = "#8a8070"
const ORANGE = "#F5A020"
const GREEN = "#3aad6e"
const OCEAN = "#0EA5E9"
const GOLD = "#d4a855"

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

type Tier = "eco" | "standard" | "luxury"

const today = new Date().toISOString().split("T")[0]

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

const inputBase: React.CSSProperties = {
  background: "none", border: "none", outline: "none",
  color: TEXT, fontSize: "1.05rem", width: "100%",
  fontFamily: "inherit", padding: 0,
  colorScheme: "dark" as React.CSSProperties["colorScheme"],
}

function Circle({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{ width: 42, height: 42, borderRadius: "50%", backgroundColor: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {children}
    </div>
  )
}

const BAR = ["Route", "Group", "When", "Ride", "You"]

function StepBar({ idx }: { idx: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", marginBottom: "1.25rem" }}>
      {BAR.map((label, i) => {
        const done = i < idx
        const active = i === idx
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: active || done ? ORANGE : "rgba(255,255,255,0.07)", fontSize: "0.6rem", fontWeight: 800, color: active || done ? BG : MUTED, flexShrink: 0, transition: "background-color 0.2s" }}>
                {done ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: "0.7rem", color: active ? TEXT : done ? ORANGE : MUTED, fontWeight: active ? 700 : 400, whiteSpace: "nowrap" }}>{label}</span>
            </div>
            {i < BAR.length - 1 && <div style={{ width: 12, height: 1, backgroundColor: i < idx ? ORANGE : "rgba(255,255,255,0.1)", flexShrink: 0 }} />}
          </div>
        )
      })}
    </div>
  )
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "110%" : "-110%", opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] } },
  exit: (dir: number) => ({ x: dir > 0 ? "-110%" : "110%", opacity: 0, transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] } }),
}

function NextBtn({ onClick, disabled = false, label = "Next →" }: { onClick: () => void; disabled?: boolean; label?: string }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ flex: 1, padding: "0.95rem", backgroundColor: disabled ? "rgba(245,160,32,0.28)" : ORANGE, border: "none", borderRadius: 999, color: BG, fontWeight: 800, fontSize: "0.975rem", cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: disabled ? "none" : "0 4px 20px rgba(245,160,32,0.28)" }}>
      {label}
    </button>
  )
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ padding: "0.95rem 1.25rem", backgroundColor: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, color: MUTED, fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit" }}>
      ← Back
    </button>
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

export default function HeroBookingWidget() {
  const [stepIdx, setStepIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [pickup, setPickup] = useState("")
  const [dropoff, setDropoff] = useState("")
  const [pax, setPax] = useState(2)
  const [bags, setBags] = useState(0)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [tier, setTier] = useState<Tier | null>(null)
  const [luxVehicle, setLuxVehicle] = useState("sedan")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [photoPreview, setPhotoPreview] = useState("")
  const [photoUploading, setPhotoUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [bookingId, setBookingId] = useState("")
  const [error, setError] = useState("")

  const dropoffOptions = pickup
    ? ROUTE_DATA.filter((r) => r[0] === pickup).map((r) => r[1])
    : Array.from(new Set(ROUTE_DATA.map((r) => r[1])))

  const match = ROUTE_DATA.find((r) => r[0] === pickup && r[1] === dropoff)
  const ecoPrice = match ? calcPrice(match[2], pax, bags) : null
  const stdPrice = match ? calcPrice(match[3], pax, bags) : null
  const luxPrice = LUX_VEHICLES.find((v) => v.id === luxVehicle)?.price ?? 95

  const price = tier === "luxury" ? luxPrice : tier === "eco" ? ecoPrice : stdPrice

  function goNext() {
    if (stepIdx === 0 && pickup && dropoff) trackEvent("booking_started", { pickup, dropoff })
    setDir(1); setStepIdx((i) => i + 1); setError("")
  }
  function goBack() { setDir(-1); setStepIdx((i) => i - 1); setError("") }

  const handleConfirm = async () => {
    setError("")
    if (!name.trim() || name.trim().length < 2) { setError("Please enter your full name."); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email."); return }
    if (phone.replace(/\D/g, "").length < 7) { setError("Please enter a valid phone number."); return }
    setLoading(true)
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickup, dropoff, date, time, tier, luxVehicle: tier === "luxury" ? luxVehicle : undefined, price, pax, bags, name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), profilePhotoUrl: photoUrl || undefined }),
      })
      const data = await res.json()
      if (data.success) {
        trackEvent("booking_completed", { tier: tier ?? "unknown", price: price ?? 0, pickup, dropoff })
        setBookingId(data.id); goNext()
      } else {
        trackEvent("booking_error", { reason: data.error ?? "unknown" })
        setError(data.error || "Something went wrong. Please try again.")
      }
    } catch {
      trackEvent("booking_error", { reason: "network_error" })
      setError("Network error. Please try again.")
    }
    finally { setLoading(false) }
  }

  const reset = () => {
    setStepIdx(0); setDir(1); setPickup(""); setDropoff(""); setPax(2); setBags(0)
    setDate(""); setTime(""); setTier(null); setLuxVehicle("sedan")
    setName(""); setPhone(""); setEmail(""); setBookingId(""); setError("")
    setPhotoUrl(""); setPhotoPreview(""); setPhotoUploading(false)
  }

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoPreview(URL.createObjectURL(file))
    setPhotoUploading(true)
    try {
      const ext = file.name.split(".").pop() ?? "jpg"
      const path = `bookings/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const sb = getSupabase()
      const { data, error: upErr } = await sb.storage.from("hop-avatars").upload(path, file, { contentType: file.type, upsert: false })
      if (upErr) throw upErr
      const { data: urlData } = sb.storage.from("hop-avatars").getPublicUrl(data.path)
      setPhotoUrl(urlData.publicUrl)
    } catch {
      setPhotoPreview("")
    } finally {
      setPhotoUploading(false)
    }
  }

  function fmt(d: string) {
    if (!d) return ""
    return new Date(d + "T00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }
  function fmtT(t: string) {
    if (!t) return ""
    const [h, m] = t.split(":").map(Number)
    return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`
  }

  return (
    <div style={{ maxWidth: 520, width: "100%" }}>
      {stepIdx < 5 && <StepBar idx={Math.min(stepIdx, 4)} />}

      <div style={{ overflow: "hidden" }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={stepIdx} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">

            {/* ── 0: Route ── */}
            {stepIdx === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                <div style={card}>
                  <Circle color={OCEAN}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={OCEAN} strokeWidth="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
                  </Circle>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: OCEAN, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.3rem" }}>PICKUP</p>
                    <select value={pickup} onChange={(e) => { setPickup(e.target.value); setDropoff("") }} style={{ ...selectBase, color: pickup ? TEXT : MUTED }}>
                      <option value="" style={{ backgroundColor: "#1e1c14" }}>Where are you coming from?</option>
                      {LOCATIONS.map((l) => <option key={l} value={l} style={{ backgroundColor: "#1e1c14" }}>{l}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ ...card, opacity: pickup ? 1 : 0.55, transition: "opacity 0.2s" }}>
                  <Circle color={ORANGE}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                  </Circle>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: ORANGE, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.3rem" }}>DROP-OFF</p>
                    <select value={dropoff} onChange={(e) => setDropoff(e.target.value)} disabled={!pickup} style={{ ...selectBase, color: dropoff ? TEXT : MUTED }}>
                      <option value="" style={{ backgroundColor: "#1e1c14" }}>Where are you headed?</option>
                      {dropoffOptions.map((l) => <option key={l} value={l} style={{ backgroundColor: "#1e1c14" }}>{l}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <NextBtn onClick={goNext} disabled={!pickup || !dropoff} />
                </div>
              </div>
            )}

            {/* ── 1: Group ── */}
            {stepIdx === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                <p style={{ color: TEXT, fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em", marginBottom: "0.1rem" }}>Who&apos;s coming?</p>
                <Counter label="PASSENGERS" sub="+$6 per person above 2" value={pax} min={1} max={15} onDec={() => setPax((p) => Math.max(1, p - 1))} onInc={() => setPax((p) => Math.min(15, p + 1))} accent={OCEAN} />
                <Counter label="CHECKED / BIG BAGS" sub="+$3 per oversize bag" value={bags} min={0} max={8} onDec={() => setBags((b) => Math.max(0, b - 1))} onInc={() => setBags((b) => Math.min(8, b + 1))} accent={MUTED} />
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <BackBtn onClick={goBack} />
                  <NextBtn onClick={goNext} />
                </div>
              </div>
            )}

            {/* ── 2: When ── */}
            {stepIdx === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                <p style={{ color: TEXT, fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em", marginBottom: "0.1rem" }}>When do you need the ride?</p>
                <div style={card}>
                  <Circle color={MUTED}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  </Circle>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: ORANGE, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.3rem" }}>DATE</p>
                    <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} style={inputBase} />
                  </div>
                </div>
                <div style={card}>
                  <Circle color={MUTED}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  </Circle>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: ORANGE, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.3rem" }}>TIME</p>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={inputBase} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <BackBtn onClick={goBack} />
                  <NextBtn onClick={goNext} disabled={!date || !time} />
                </div>
              </div>
            )}

            {/* ── 3: Tier ── */}
            {stepIdx === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                <p style={{ color: TEXT, fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em", marginBottom: "0.1rem" }}>Pick your ride</p>
                {(
                  [
                    { t: "eco" as Tier, tag: "ECO", name: "Economic", sub: "Sedan · ~5 min longer pickup", price: ecoPrice ? `$${ecoPrice}` : "—", color: OCEAN, border: "rgba(14,165,233,0.22)", hoverBorder: "rgba(14,165,233,0.5)", hoverBg: "rgba(14,165,233,0.06)" },
                    { t: "standard" as Tier, tag: "STD", name: "Standard", sub: "Premium sedan · fastest pickup", price: stdPrice ? `$${stdPrice}` : "—", color: ORANGE, border: "rgba(245,160,32,0.22)", hoverBorder: "rgba(245,160,32,0.5)", hoverBg: "rgba(245,160,32,0.06)" },
                    { t: "luxury" as Tier, tag: "LUX", name: "Luxury", sub: "Sedan · SUV · Mini Bus", price: "from $95", color: GOLD, border: "rgba(212,168,85,0.22)", hoverBorder: "rgba(212,168,85,0.5)", hoverBg: "rgba(212,168,85,0.06)" },
                  ] as const
                ).map((row) => (
                  <TierBtn key={row.t} row={row} onClick={() => { trackEvent("booking_tier_selected", { tier: row.t }); setTier(row.t); goNext() }} />
                ))}
                <BackBtn onClick={goBack} />
              </div>
            )}

            {/* ── 4: Contact ── */}
            {stepIdx === 4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                <p style={{ color: TEXT, fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.02em", marginBottom: "0.1rem" }}>Your contact info</p>

                {tier === "luxury" && (
                  <div style={{ ...card, flexDirection: "column", alignItems: "stretch", gap: "0.5rem" }}>
                    <p style={{ color: GOLD, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em" }}>CHOOSE VEHICLE</p>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      {LUX_VEHICLES.map((v) => (
                        <button key={v.id} onClick={() => setLuxVehicle(v.id)} style={{ flex: 1, padding: "0.625rem 0.4rem", borderRadius: 10, border: luxVehicle === v.id ? "1px solid rgba(212,168,85,0.55)" : "1px solid rgba(255,255,255,0.07)", backgroundColor: luxVehicle === v.id ? "rgba(212,168,85,0.1)" : "rgba(255,255,255,0.03)", cursor: "pointer", fontFamily: "inherit", textAlign: "center" as const }}>
                          <p style={{ color: luxVehicle === v.id ? GOLD : TEXT, fontSize: "0.78rem", fontWeight: 700 }}>{v.label}</p>
                          <p style={{ color: luxVehicle === v.id ? GOLD : MUTED, fontWeight: 700, fontSize: "0.85rem", marginTop: "0.15rem" }}>${v.price}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {[
                  { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>, label: "FULL NAME", type: "text", placeholder: "Your full name", value: name, set: setName },
                  { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.2 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.49 16l.43.92z" /></svg>, label: "PHONE / WHATSAPP", type: "tel", placeholder: "+1 (242) 000-0000", value: phone, set: setPhone },
                  { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, label: "EMAIL", type: "email", placeholder: "you@email.com", value: email, set: setEmail },
                ].map((f) => (
                  <div key={f.label} style={card}>
                    <Circle color={MUTED}>{f.icon}</Circle>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: ORANGE, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.3rem" }}>{f.label}</p>
                      <input type={f.type} placeholder={f.placeholder} value={f.value} onChange={(e) => f.set(e.target.value)} style={inputBase} />
                    </div>
                  </div>
                ))}

                {/* Photo upload */}
                <div style={{ ...card, cursor: "pointer" }} onClick={() => fileInputRef.current?.click()}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", overflow: "hidden", flexShrink: 0, backgroundColor: "rgba(245,160,32,0.08)", border: "1px solid rgba(245,160,32,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {photoPreview ? (
                      <img src={photoPreview} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><circle cx="12" cy="13" r="4"/><path d="M5 7h2l2-3h6l2 3h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/></svg>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: ORANGE, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.25rem" }}>
                      PROFILE PHOTO <span style={{ color: MUTED, fontWeight: 400, textTransform: "none" as const, letterSpacing: 0 }}>· optional</span>
                    </p>
                    {photoUploading ? (
                      <p style={{ color: MUTED, fontSize: "0.8rem" }}>Uploading…</p>
                    ) : photoUrl ? (
                      <p style={{ color: GREEN, fontSize: "0.8rem", fontWeight: 600 }}>✓ Photo added</p>
                    ) : (
                      <p style={{ color: MUTED, fontSize: "0.8rem" }}>Tap to add a selfie for your profile</p>
                    )}
                  </div>
                  {photoPreview && (
                    <button onClick={(e) => { e.stopPropagation(); setPhotoUrl(""); setPhotoPreview(""); }} style={{ padding: "0.25rem 0.5rem", border: "none", background: "none", color: MUTED, fontSize: "0.9rem", cursor: "pointer", flexShrink: 0 }}>✕</button>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" capture="user" style={{ display: "none" }} onChange={handlePhotoSelect} />
                </div>

                {error && <p style={{ color: "#E84040", fontSize: "0.78rem", paddingLeft: "0.25rem" }}>{error}</p>}

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <BackBtn onClick={goBack} />
                  <NextBtn onClick={handleConfirm} disabled={loading || photoUploading} label={loading ? "Confirming…" : `Confirm · $${price} →`} />
                </div>
                <p style={{ color: MUTED, fontSize: "0.68rem", lineHeight: 1.5 }}>We&apos;ll send your HOP account + app download link to your email.</p>
              </div>
            )}

            {/* ── 5: Done ── */}
            {stepIdx === 5 && (
              <div style={{ ...card, flexDirection: "column", textAlign: "center", gap: "0", padding: "2rem 1.5rem" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: "rgba(58,173,110,0.12)", border: "2px solid rgba(58,173,110,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <div style={{ display: "inline-block", padding: "0.2rem 1rem", backgroundColor: "rgba(245,160,32,0.1)", border: "1px solid rgba(245,160,32,0.2)", borderRadius: 999, marginBottom: "0.875rem" }}>
                  <span style={{ color: ORANGE, fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.06em" }}>{bookingId}</span>
                </div>
                <h3 style={{ color: TEXT, fontWeight: 800, fontSize: "1.25rem", marginBottom: "0.4rem" }}>Ride confirmed!</h3>
                <p style={{ color: MUTED, fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  Check <span style={{ color: TEXT }}>{email}</span> — your HOP account and app link are on the way.
                </p>
                <div style={{ textAlign: "left", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "0.875rem 1rem", marginBottom: "1.25rem", width: "100%" }}>
                  {[
                    { label: "Route", value: `${pickup} → ${dropoff}` },
                    { label: "Date & Time", value: `${fmt(date)} · ${fmtT(time)}` },
                    { label: "Passengers", value: `${pax} pax${bags > 0 ? ` · ${bags} bag${bags > 1 ? "s" : ""}` : ""}` },
                    { label: "Tier & Fare", value: tier === "luxury" ? `Luxury ${LUX_VEHICLES.find((v) => v.id === luxVehicle)?.label ?? ""} · $${price}` : `${tier === "eco" ? "ECO" : "Standard"} · $${price}` },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", padding: "0.3rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <span style={{ color: MUTED, fontSize: "0.73rem" }}>{row.label}</span>
                      <span style={{ color: TEXT, fontSize: "0.73rem", fontWeight: 600, textAlign: "right" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <button onClick={reset} style={{ width: "100%", padding: "0.875rem", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, color: TEXT, fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit" }}>
                  Book another ride
                </button>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {stepIdx === 0 && (
        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", marginTop: "1rem" }}>
          {[{ dot: GREEN, label: "12,400+ rides" }, { dot: OCEAN, label: "Flat rates always" }, { dot: ORANGE, label: "Verified drivers" }].map((s) => (
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

type TierRow = { t: Tier; tag: string; name: string; sub: string; price: string; color: string; border: string; hoverBorder: string; hoverBg: string }

function TierBtn({ row, onClick }: { row: TierRow; onClick: () => void }) {
  const [hover, setHover] = useState(false)
  const card2: React.CSSProperties = {
    backgroundColor: hover ? row.hoverBg : "rgba(18,16,10,0.82)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: `1px solid ${hover ? row.hoverBorder : row.border}`,
    borderRadius: 16,
    padding: "1.1rem 1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
    cursor: "pointer",
    fontFamily: "inherit",
    textAlign: "left" as const,
    width: "100%",
    transition: "border-color 0.15s, background-color 0.15s",
  }
  const MUTED2 = "#8a8070"
  const TEXT2 = "#f0ede8"
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={card2}>
      <div style={{ width: 42, height: 42, borderRadius: "50%", backgroundColor: `${row.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontSize: "0.6rem", fontWeight: 800, color: row.color }}>{row.tag}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: TEXT2, fontWeight: 700, fontSize: "1rem" }}>{row.name}</p>
        <p style={{ color: MUTED2, fontSize: "0.78rem", marginTop: "0.15rem" }}>{row.sub}</p>
      </div>
      <p style={{ color: row.color, fontWeight: 900, fontSize: "1.55rem", letterSpacing: "-0.03em", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>{row.price}</p>
    </button>
  )
}
