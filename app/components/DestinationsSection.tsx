"use client"

import Link from "next/link"
import { StackedCardsInteraction } from "@/components/ui/stacked-cards-interaction"

const ORANGE = "#F5A020"
const TEXT = "#f0ede8"
const MUTED = "#8a8070"
const CARD2 = "#222018"
const BORDER = "rgba(255,255,255,0.06)"
const BG = "#0e0c09"

// Top 3 destinations shown in stacked cards — using vivid Unsplash photos
const FEATURED = [
  {
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=680&h=420&fit=crop",
    name: "Nassau Airport (LPIA)",
    sub: "Airport Transfers",
    from: "from $20",
    time: "~15 min",
    href: "/routes/nassau-airport",
  },
  {
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=680&h=420&fit=crop",
    name: "Atlantis Paradise Island",
    sub: "Paradise Island",
    from: "from $28",
    time: "~12 min",
    href: "/routes/atlantis-paradise-island",
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=680&h=420&fit=crop",
    name: "Baha Mar & Cable Beach",
    sub: "Cable Beach Resort Strip",
    from: "from $22",
    time: "~10 min",
    href: "/routes/baha-mar-cable-beach",
  },
]

// Top 4 routes for the compact list — numbers only, JSX adds "from $"
const ALL_ROUTES = [
  { name: "Nassau Airport (LPIA)", sub: "Airport Transfers", from: "20", time: "15 min", href: "/routes/nassau-airport" },
  { name: "Atlantis Paradise Island", sub: "Paradise Island", from: "28", time: "12 min", href: "/routes/atlantis-paradise-island" },
  { name: "Nassau Cruise Port", sub: "Prince George Wharf", from: "15", time: "8 min", href: "/routes/nassau-cruise-port" },
  { name: "Baha Mar & Cable Beach", sub: "Cable Beach Resort Strip", from: "22", time: "10 min", href: "/routes/baha-mar-cable-beach" },
]

export default function DestinationsSection() {
  return (
    <section style={{ backgroundColor: BG, padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "3.5rem" }}>
          <div>
            <p style={{ color: ORANGE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.5rem" }}>POPULAR DESTINATIONS</p>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Where are you headed?
            </h2>
          </div>
          <Link href="/routes" style={{ color: ORANGE, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            All destinations
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>

        {/* 2-col layout: stacked cards left + route list right */}
        <div style={{ display: "grid", gap: "4rem", alignItems: "start" }} className="grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT: Interactive stacked cards */}
          <div style={{ flexDirection: "column", alignItems: "center", position: "relative", paddingBottom: "2.5rem" }}
               className="hidden lg:flex">
            <StackedCardsInteraction cards={FEATURED} />
          </div>

          {/* RIGHT: Full route list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {ALL_ROUTES.map((route, i) => (
              <Link
                key={route.href}
                href={route.href}
                style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  padding: "1.375rem 1.25rem",
                  backgroundColor: CARD2,
                  borderRadius: 14,
                  border: `1px solid ${BORDER}`,
                  textDecoration: "none",
                  transition: "border-color 0.2s, background-color 0.15s",
                }}
                className="schedule-card"
              >
                {/* Number badge */}
                <div style={{
                  width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                  backgroundColor: "rgba(245,160,32,0.08)",
                  border: "1px solid rgba(245,160,32,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: ORANGE, fontWeight: 800, fontSize: "0.72rem",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Name + sub */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: TEXT, fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.2, marginBottom: "0.2rem" }}>{route.name}</p>
                  <p style={{ color: MUTED, fontSize: "0.75rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>{route.sub}</p>
                </div>

                {/* Price + time */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ color: ORANGE, fontWeight: 700, fontSize: "0.9rem", lineHeight: 1.2 }}>from ${route.from}</p>
                  <p style={{ color: MUTED, fontSize: "0.75rem" }}>{route.time}</p>
                </div>

                {/* Arrow */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" style={{ flexShrink: 0 }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ))}

            {/* Bottom CTA */}
            <div style={{ marginTop: "1rem", padding: "1.25rem", backgroundColor: "rgba(245,160,32,0.06)", borderRadius: 14, border: "1px solid rgba(245,160,32,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              <div>
                <p style={{ color: TEXT, fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.2rem" }}>Don&apos;t see your destination?</p>
                <p style={{ color: MUTED, fontSize: "0.8rem" }}>HOP goes anywhere in Nassau. Enter your address to get a fare.</p>
              </div>
              <a
                href="https://app.hopbahamas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: "0.7rem 1.25rem", fontSize: "0.85rem", textDecoration: "none", whiteSpace: "nowrap" as const }}
              >
                Get a fare
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
