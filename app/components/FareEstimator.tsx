"use client";

import { useState } from "react";

// Real fares computed from Ride Pricing Master Sheet V4 (+12% already applied)
// Format: [from, to, eco_price, std_price]
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
];

const LOCATIONS = Array.from(new Set(ROUTE_DATA.map((r) => r[0])));

const ORANGE = "#F5A020";
const MUTED = "#8a8070";
const CARD2 = "#222018";
const TEXT = "#f0ede8";
const BORDER = "rgba(255,255,255,0.06)";
const GREEN = "#3aad6e";

export default function FareEstimator() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const toDests = from
    ? ROUTE_DATA.filter((r) => r[0] === from).map((r) => r[1])
    : Array.from(new Set(ROUTE_DATA.map((r) => r[1])));

  const match = ROUTE_DATA.find((r) => r[0] === from && r[1] === to);

  const selectStyle = {
    backgroundColor: CARD2,
    color: TEXT,
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    padding: "0.75rem 2.5rem 0.75rem 1rem",
    fontSize: "0.9rem",
    width: "100%",
    cursor: "pointer",
    outline: "none",
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
    fontFamily: "inherit",
  };

  return (
    <div
      style={{
        backgroundColor: "#1a1810",
        border: "1px solid rgba(245,160,32,0.18)",
        borderRadius: 20,
        padding: "1.75rem",
        maxWidth: 480,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "rgba(245,160,32,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5">
            <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
          </svg>
        </div>
        <p style={{ color: ORANGE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em" }}>FARE ESTIMATOR</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {/* From */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 1 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </div>
          <select
            style={{ ...selectStyle, paddingLeft: "2.25rem" }}
            value={from}
            onChange={(e) => { setFrom(e.target.value); setTo(""); }}
          >
            <option value="">From — pickup location</option>
            {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <svg style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        {/* To */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 1 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </div>
          <select
            style={{ ...selectStyle, paddingLeft: "2.25rem", opacity: from ? 1 : 0.5, cursor: from ? "pointer" : "not-allowed" }}
            value={to}
            onChange={(e) => setTo(e.target.value)}
            disabled={!from}
          >
            <option value="">To — drop-off location</option>
            {toDests.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <svg style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Result */}
      {match && (
        <div
          style={{
            marginTop: "1rem",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(245,160,32,0.2)",
          }}
        >
          {/* Tiers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div
              style={{
                padding: "1rem 1.25rem",
                backgroundColor: "rgba(245,160,32,0.05)",
                borderRight: "1px solid rgba(245,160,32,0.12)",
              }}
            >
              <p style={{ color: MUTED, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.35rem" }}>ECO</p>
              <p style={{ color: TEXT, fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-0.03em", lineHeight: 1 }}>
                ${match[2]}
              </p>
              <p style={{ color: MUTED, fontSize: "0.65rem", marginTop: "0.3rem" }}>Sedan · incl. VAT</p>
            </div>
            <div
              style={{
                padding: "1rem 1.25rem",
                backgroundColor: "rgba(245,160,32,0.1)",
              }}
            >
              <p style={{ color: ORANGE, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.35rem" }}>STANDARD</p>
              <p style={{ color: ORANGE, fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-0.03em", lineHeight: 1 }}>
                ${match[3]}
              </p>
              <p style={{ color: MUTED, fontSize: "0.65rem", marginTop: "0.3rem" }}>Premium · incl. VAT</p>
            </div>
          </div>

          {/* Badges + CTA */}
          <div style={{ padding: "0.875rem 1.25rem", backgroundColor: "rgba(245,160,32,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {[
                { dot: GREEN, label: "Fixed price" },
                { dot: "#0EA5E9", label: "No surge" },
              ].map((b) => (
                <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: b.dot, flexShrink: 0, display: "block" }} />
                  <span style={{ color: MUTED, fontSize: "0.7rem" }}>{b.label}</span>
                </div>
              ))}
            </div>
            <a
              href="https://app.hopbahamas.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: ORANGE,
                color: "#161616",
                fontWeight: 800,
                fontSize: "0.8rem",
                padding: "0.5rem 1.1rem",
                borderRadius: "999px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                fontFamily: "inherit",
              }}
            >
              Book This Ride →
            </a>
          </div>
        </div>
      )}

      {!match && from && to && (
        <p style={{ color: MUTED, fontSize: "0.8rem", marginTop: "0.75rem" }}>
          Route not in estimator —{" "}
          <a href="https://app.hopbahamas.com" target="_blank" rel="noopener noreferrer" style={{ color: ORANGE, textDecoration: "none" }}>
            check the app for exact pricing
          </a>.
        </p>
      )}

      <p style={{ color: MUTED, fontSize: "0.68rem", marginTop: "0.875rem" }}>
        Exact fare confirmed before you book. Free cancellation. Prices include 10% VAT.
      </p>
    </div>
  );
}
