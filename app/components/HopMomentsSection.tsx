"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const ORANGE = "#F5A020"
const TEXT = "#f0ede8"

// 21.dev StaggerText pattern — each word slides up from clipped span on viewport enter
function StaggerText({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.065, delayChildren: 0.1 } },
  }
  const word = {
    hidden: { y: "110%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  }

  return (
    <div ref={ref}>
      {lines.map((line, li) => (
        <motion.div
          key={li}
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em", overflow: "hidden", lineHeight: 1.08 }}
        >
          {line.split(" ").map((w, wi) => (
            <span key={wi} style={{ overflow: "hidden", display: "inline-block" }}>
              <motion.span variants={word} style={{ display: "inline-block" }}>
                {w}
              </motion.span>
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

const PILLS = [
  { label: "Photo", pts: "50 pts" },
  { label: "Video", pts: "100 pts" },
  { label: "Reel", pts: "195 pts" },
]

export default function HopMomentsSection() {
  return (
    <section
      className="photo-hero mob-schedule-section"
      style={{ backgroundImage: "url('/images/hero-bahamas.jpg')", padding: "6rem 1.5rem", minHeight: 580 }}
    >
      {/* Overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(95deg, rgba(10,8,4,0.94) 0%, rgba(10,8,4,0.76) 52%, rgba(10,8,4,0.22) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,8,4,0.2) 0%, transparent 30%, transparent 70%, rgba(22,22,22,0.8) 100%)" }} />

      <div
        style={{ position: "relative", maxWidth: 1200, margin: "0 auto", display: "grid", gap: "3rem", alignItems: "center" }}
        className="grid grid-cols-1 lg:grid-cols-2"
      >
        {/* Left — copy */}
        <div>
          <span style={{ display: "inline-block", padding: "0.3rem 0.875rem", backgroundColor: "rgba(245,160,32,0.15)", border: "1px solid rgba(245,160,32,0.35)", borderRadius: 999, color: ORANGE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
            HOP INSIDERS
          </span>

          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 900, color: TEXT, letterSpacing: "-0.03em", marginBottom: "1rem", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            <StaggerText lines={["Other tourists pay full price.", "You get cashback."]} />
          </h2>

          <p style={{ color: "rgba(240,237,232,0.75)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.75rem", maxWidth: 420 }}>
            After every ride, snap Nassau — points stack up automatically and cash lands back on your next trip.
          </p>

          {/* Earn pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2rem" }}>
            {PILLS.map((p) => (
              <span
                key={p.label}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.4rem 0.875rem",
                  backgroundColor: "rgba(245,160,32,0.1)",
                  border: "1px solid rgba(245,160,32,0.25)",
                  borderRadius: 999,
                  color: ORANGE,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <span style={{ color: "rgba(240,237,232,0.7)", fontWeight: 500 }}>{p.label}</span>
                {" · "}
                {p.pts}
              </span>
            ))}
          </div>

          <a
            href="https://app.hopbahamas.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.875rem 1.75rem", backgroundColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, color: TEXT, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}
          >
            Claim your insider advantage
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEXT} strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>

        {/* Right — 3 staggered phone frames */}
        <div className="hidden lg:flex" style={{ justifyContent: "center", alignItems: "center", position: "relative", height: 520 }}>
          {/* Back-left: feedback / post-ride Hop Moment CTA */}
          <div style={{ position: "absolute", left: "2%", bottom: 20, transform: "rotate(-6deg) translateY(8px) scale(0.88)", opacity: 0.7, zIndex: 1 }}>
            <div style={{ display: "inline-block", borderRadius: 36, padding: 8, background: "linear-gradient(145deg, #2a2a2a 0%, #181818 100%)", boxShadow: "0 24px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)" }}>
              <div style={{ borderRadius: 30, overflow: "hidden", width: 180, height: 390 }}>
                <Image src="/screenshots/hop-moments-feedback.png" alt="HOP — Share a Hop Moment" width={180} height={390} style={{ objectFit: "cover", display: "block" }} />
              </div>
            </div>
          </div>

          {/* Center front: Hop Moments rewards screen */}
          <div className="phone-glow" style={{ position: "relative", zIndex: 3 }}>
            <div style={{ display: "inline-block", borderRadius: 44, padding: 10, background: "linear-gradient(145deg, #2e2e2e 0%, #181818 100%)", boxShadow: "0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.09)" }}>
              <div style={{ borderRadius: 36, overflow: "hidden", width: 210, height: 454 }}>
                <Image src="/screenshots/hop-moments-rewards.png" alt="HOP Moments rewards" width={210} height={454} style={{ objectFit: "cover", display: "block" }} />
              </div>
            </div>
          </div>

          {/* Back-right: camera */}
          <div style={{ position: "absolute", right: "2%", bottom: 20, transform: "rotate(6deg) translateY(8px) scale(0.88)", opacity: 0.7, zIndex: 1 }}>
            <div style={{ display: "inline-block", borderRadius: 36, padding: 8, background: "linear-gradient(145deg, #2a2a2a 0%, #181818 100%)", boxShadow: "0 24px 56px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)" }}>
              <div style={{ borderRadius: 30, overflow: "hidden", width: 180, height: 390 }}>
                <Image src="/screenshots/hop-moments-camera.png" alt="HOP Moments camera" width={180} height={390} style={{ objectFit: "cover", display: "block" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
