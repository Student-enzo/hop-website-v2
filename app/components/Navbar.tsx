"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const ORANGE = "#F5A020";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const GOLD = "#d4a855";

const TIERS = [
  { tag: "ECO", color: MUTED, name: "Economic", detail: "Solo trips & short hops", price: "from $15", href: "/services#eco" },
  { tag: "STD", color: ORANGE, name: "Standard", detail: "Most popular · daily comfort", price: "from $20", href: "/services#standard" },
  { tag: "LUX", color: GOLD, name: "Luxury", detail: "Sedan, SUV & Mini Bus", price: "from $95", href: "/services#luxury" },
];

const NAV_LINKS = [
  { label: "Routes", href: "/routes" },
  { label: "Schedule", href: "/services#schedule" },
  { label: "Safety", href: "/services#safety" },
  { label: "Rewards", href: "/services#rewards" },
  { label: "Blog", href: "/blog" },
];

const MOBILE_ALL = [
  { label: "Routes", href: "/routes" },
  { label: "Schedule a Ride", href: "/services#schedule" },
  { label: "Safety", href: "/services#safety" },
  { label: "Rewards & HOP Moments", href: "/services#rewards" },
  { label: "Blog", href: "/blog" },
  { label: "All Services", href: "/services" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ridesOpen, setRidesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ridesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ridesRef.current && !ridesRef.current.contains(e.target as Node)) {
        setRidesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 14,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          width: "calc(100% - 32px)",
          maxWidth: 1080,
          backgroundColor: scrolled ? "rgba(18,16,10,0.96)" : "rgba(18,16,10,0.82)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          borderRadius: 999,
          border: scrolled ? "1px solid rgba(245,160,32,0.22)" : "1px solid rgba(255,255,255,0.1)",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,160,32,0.08)"
            : "0 4px 24px rgba(0,0,0,0.35)",
          transition: "background-color 0.3s, border-color 0.3s, box-shadow 0.3s",
          overflow: "visible",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 6px 6px 8px", height: 56 }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", padding: "0.375rem 0.5rem", textDecoration: "none", flexShrink: 0 }}>
            <Image src="/hop-logo.png" alt="HOP" width={64} height={28} style={{ objectFit: "contain", display: "block" }} priority />
          </Link>

          {/* Desktop nav — centered */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "0.125rem", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>

            {/* Rides dropdown trigger */}
            <div ref={ridesRef} style={{ position: "relative" }}>
              <button
                onMouseEnter={() => setRidesOpen(true)}
                onMouseLeave={(e) => {
                  if (!ridesRef.current?.contains(e.relatedTarget as Node)) setRidesOpen(false);
                }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: ridesOpen ? TEXT : MUTED,
                  fontSize: "0.875rem", fontWeight: 500,
                  display: "flex", alignItems: "center", gap: "0.2rem",
                  padding: "0.4rem 0.75rem", borderRadius: 999,
                  transition: "color 0.15s, background-color 0.15s",
                  backgroundColor: ridesOpen ? "rgba(245,160,32,0.08)" : "transparent",
                  whiteSpace: "nowrap",
                }}
              >
                Rides
                <svg
                  width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  style={{ transition: "transform 0.2s", transform: ridesOpen ? "rotate(180deg)" : "none" }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Rides dropdown panel */}
              {ridesOpen && (
                <div
                  onMouseEnter={() => setRidesOpen(true)}
                  onMouseLeave={() => setRidesOpen(false)}
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    paddingTop: 10,
                    zIndex: 100,
                    width: 300,
                  }}
                >
                <div style={{
                    backgroundColor: "rgba(18,16,10,0.98)",
                    backdropFilter: "blur(32px)",
                    WebkitBackdropFilter: "blur(32px)",
                    border: "1px solid rgba(245,160,32,0.18)",
                    borderRadius: 20,
                    padding: "1rem",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)",
                  }}
                >
                  <p style={{ color: MUTED, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.6rem", padding: "0 0.25rem" }}>
                    CHOOSE YOUR TIER
                  </p>
                  {TIERS.map((tier) => (
                    <Link
                      key={tier.tag}
                      href={tier.href}
                      onClick={() => setRidesOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: "0.65rem", padding: "0.625rem 0.5rem", borderRadius: 12, textDecoration: "none", transition: "background-color 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <span style={{
                        fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.1em",
                        color: tier.color, backgroundColor: `${tier.color}1a`,
                        border: `1px solid ${tier.color}30`, padding: "0.2rem 0.5rem",
                        borderRadius: 999, flexShrink: 0, minWidth: 38, textAlign: "center" as const,
                      }}>
                        {tier.tag}
                      </span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: "block", color: TEXT, fontSize: "0.85rem", fontWeight: 700 }}>{tier.name}</span>
                        <span style={{ display: "block", color: MUTED, fontSize: "0.72rem", marginTop: "0.1rem" }}>{tier.detail}</span>
                      </span>
                      <span style={{ color: tier.color, fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}>{tier.price}</span>
                    </Link>
                  ))}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "0.625rem", paddingTop: "0.625rem" }}>
                    <Link
                      href="/services"
                      onClick={() => setRidesOpen(false)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.45rem 0.5rem", color: ORANGE, fontSize: "0.8rem", fontWeight: 700, textDecoration: "none", borderRadius: 8, transition: "background-color 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(245,160,32,0.07)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      Compare all tiers
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>
                </div>
              )}
            </div>

            {/* Other links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: MUTED, fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", padding: "0.4rem 0.75rem", borderRadius: 999, transition: "color 0.15s, background-color 0.15s", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = TEXT; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = MUTED; e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right CTAs */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            <Link
              href="/#download"
              style={{
                color: MUTED, fontSize: "0.8rem", fontWeight: 600,
                textDecoration: "none", padding: "0.4rem 0.875rem",
                borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)",
                transition: "color 0.15s, border-color 0.15s",
                whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "0.3rem",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = TEXT; e.currentTarget.style.borderColor = "rgba(245,160,32,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = MUTED; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              Get App
            </Link>
            <a
              href="https://app.hopbahamas.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: ORANGE, color: "#161616", fontWeight: 700,
                fontSize: "0.875rem", padding: "0.5rem 1.25rem",
                borderRadius: 999, textDecoration: "none",
                display: "flex", alignItems: "center", gap: "0.35rem",
                whiteSpace: "nowrap", transition: "opacity 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.boxShadow = "0 0 20px rgba(245,160,32,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Book a Ride
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            style={{ background: "none", border: "none", padding: "8px", cursor: "pointer", marginRight: 4 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div style={{ width: 22, display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ display: "block", height: 2, background: TEXT, borderRadius: 2, transition: "transform 0.2s", transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span style={{ display: "block", height: 2, background: TEXT, borderRadius: 2, opacity: mobileOpen ? 0 : 1, transition: "opacity 0.2s" }} />
              <span style={{ display: "block", height: 2, background: TEXT, borderRadius: 2, transition: "transform 0.2s", transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 80,
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100% - 32px)",
            maxWidth: 1080,
            zIndex: 49,
            backgroundColor: "rgba(18,16,10,0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: 20,
            border: "1px solid rgba(245,160,32,0.15)",
            padding: "1.25rem 1.5rem 1.5rem",
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
          }}
        >
          {/* Tier quick-picks */}
          <p style={{ color: MUTED, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.75rem" }}>RIDE TIERS</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", marginBottom: "1rem" }}>
            {TIERS.map((tier) => (
              <Link
                key={tier.tag}
                href={tier.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem",
                  padding: "0.75rem 0.5rem", backgroundColor: "rgba(255,255,255,0.04)",
                  borderRadius: 14, textDecoration: "none",
                  border: `1px solid ${tier.color}25`,
                }}
              >
                <span style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.1em", color: tier.color }}>{tier.tag}</span>
                <span style={{ color: TEXT, fontSize: "0.82rem", fontWeight: 700 }}>{tier.name}</span>
                <span style={{ color: tier.color, fontSize: "0.72rem", fontWeight: 700 }}>{tier.price}</span>
              </Link>
            ))}
          </div>

          {/* Other links */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.75rem" }}>
            {MOBILE_ALL.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "0.75rem 0", color: TEXT, fontWeight: 500,
                  textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.04)",
                  fontSize: "0.95rem",
                }}
              >
                {link.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </Link>
            ))}
          </div>

          {/* Mobile CTAs */}
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            <a
              href="https://app.hopbahamas.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              style={{ textAlign: "center", padding: "0.875rem", borderRadius: 999, backgroundColor: ORANGE, color: "#161616", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}
            >
              Book a Ride →
            </a>
            <Link
              href="/#download"
              onClick={() => setMobileOpen(false)}
              style={{ textAlign: "center", padding: "0.75rem", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", color: TEXT, fontWeight: 600, textDecoration: "none", fontSize: "0.9rem" }}
            >
              Download the App
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
