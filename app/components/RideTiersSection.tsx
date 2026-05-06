"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

const ORANGE = "#F5A020"
const TEXT = "#f0ede8"
const MUTED = "#8a8070"
const BG = "#1e1c14"
const BORDER = "rgba(255,255,255,0.06)"
const GOLD = "#d4a855"

const TIERS = [
  {
    tag: "ECO",
    tagColor: MUTED,
    name: "Economic",
    description: "Lower fare for solo trips and short hops around Nassau.",
    detail: "~5 min longer pickup · standard comfort",
    price: "from $15",
    href: "/services#eco",
    image: "https://images.pexels.com/photos/12960352/pexels-photo-12960352.jpeg?auto=compress&cs=tinysrgb&w=560&h=360&fit=crop",
  },
  {
    tag: "STAND",
    tagColor: ORANGE,
    name: "Standard",
    description: "The most popular tier. Reliable, comfortable, confirmed fare before you move.",
    detail: "Fastest average pickup · daily driver comfort",
    price: "from $20",
    href: "/services#standard",
    image: "https://images.pexels.com/photos/15774577/pexels-photo-15774577.jpeg?auto=compress&cs=tinysrgb&w=560&h=360&fit=crop",
  },
  {
    tag: "LUX",
    tagColor: GOLD,
    name: "Luxury",
    description: "Sedan ($95), SUV ($120), or Mini Bus ($190). Flat rate, zero distance surprises.",
    detail: "Priority matching · premium comfort",
    price: "from $95",
    href: "/services#luxury",
    image: "https://images.pexels.com/photos/36377051/pexels-photo-36377051.jpeg?auto=compress&cs=tinysrgb&w=560&h=360&fit=crop",
  },
]

export default function RideTiersSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current) }
  }, [mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  return (
    <section style={{ backgroundColor: BG, padding: "5rem 1.5rem" }}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}
      >
        {/* Floating image preview — mouse-following */}
        <div
          className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl"
          style={{
            left: containerRef.current?.getBoundingClientRect().left ?? 0,
            top: containerRef.current?.getBoundingClientRect().top ?? 0,
            transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 110}px, 0)`,
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.85,
            transition: "opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), scale 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div style={{ width: 280, height: 175, backgroundColor: "#111", borderRadius: 12, overflow: "hidden", position: "relative" }}>
            {TIERS.map((tier, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={tier.name}
                src={tier.image}
                alt={tier.name}
                style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: "cover",
                  transition: "all 0.45s ease-out",
                  opacity: hoveredIndex === index ? 1 : 0,
                  transform: `scale(${hoveredIndex === index ? 1 : 1.08})`,
                  filter: hoveredIndex === index ? "none" : "blur(8px)",
                }}
              />
            ))}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)" }} />
          </div>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ color: ORANGE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
            RIDE TIERS
          </p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Three tiers. One price shown upfront.
          </h2>
          <p style={{ color: MUTED, fontSize: "0.95rem", marginTop: "0.625rem", lineHeight: 1.6, maxWidth: 520 }}>
            The difference? Pickup speed and comfort level. Your fare is always confirmed before you move.
          </p>
        </div>

        {/* Tier list */}
        <div>
          {TIERS.map((tier, index) => (
            <Link
              key={tier.name}
              href={tier.href}
              className="group block"
              onMouseEnter={() => { setHoveredIndex(index); setIsVisible(true) }}
              onMouseLeave={() => { setHoveredIndex(null); setIsVisible(false) }}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                position: "relative",
                padding: "1.5rem 1rem",
                borderTop: `1px solid ${BORDER}`,
              }}>
                {/* Hover background highlight */}
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundColor: "rgba(245,160,32,0.04)",
                  borderRadius: 12,
                  opacity: hoveredIndex === index ? 1 : 0,
                  transform: `scale(${hoveredIndex === index ? 1 : 0.97})`,
                  transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
                }} />

                <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "1.25rem" }}>
                  {/* Tier badge */}
                  <span style={{
                    fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.1em",
                    color: tier.tagColor,
                    backgroundColor: `${tier.tagColor}1a`,
                    border: `1px solid ${tier.tagColor}30`,
                    padding: "0.2rem 0.6rem",
                    borderRadius: 999,
                    flexShrink: 0,
                    minWidth: 52,
                    textAlign: "center" as const,
                  }}>
                    {tier.tag}
                  </span>

                  {/* Name + description */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
                      <h3 style={{ color: TEXT, fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.01em", position: "relative", lineHeight: 1.2 }}>
                        {tier.name}
                        <span style={{
                          position: "absolute", left: 0, bottom: -1, height: "1px",
                          backgroundColor: TEXT,
                          transition: "width 0.3s ease-out",
                          width: hoveredIndex === index ? "100%" : 0,
                          display: "block",
                        }} />
                      </h3>
                      <svg
                        width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke={MUTED} strokeWidth="2"
                        style={{
                          transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
                          opacity: hoveredIndex === index ? 1 : 0,
                          transform: hoveredIndex === index ? "translate(0,0)" : "translate(-5px, 5px)",
                          flexShrink: 0,
                        }}
                      >
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </div>

                    <p style={{
                      color: hoveredIndex === index ? "rgba(240,237,232,0.72)" : MUTED,
                      fontSize: "0.875rem", lineHeight: 1.5,
                      transition: "color 0.25s ease-out",
                      marginBottom: "0.3rem",
                    }}>
                      {tier.description}
                    </p>

                    <p style={{
                      color: tier.tagColor,
                      fontSize: "0.75rem", fontWeight: 600,
                      letterSpacing: "0.02em",
                      opacity: hoveredIndex === index ? 1 : 0.65,
                      transition: "opacity 0.25s ease-out",
                    }}>
                      {tier.detail}
                    </p>
                  </div>

                  {/* Price */}
                  <span style={{
                    color: tier.tagColor,
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    fontVariantNumeric: "tabular-nums",
                    flexShrink: 0,
                  }}>
                    {tier.price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          <div style={{ borderTop: `1px solid ${BORDER}` }} />
        </div>

        {/* CTAs */}
        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <a
            href="https://app.hopbahamas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: "0.875rem 1.75rem", fontSize: "0.925rem", textDecoration: "none", gap: "0.5rem" }}
          >
            Book your ride
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <Link
            href="/services"
            style={{ color: ORANGE, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            Compare all tiers
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
