"use client"

import React, { useRef } from "react"
import Link from "next/link"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion"

const RED = "#E84040"
const ORANGE = "#F5A020"
const TEXT = "#f0ede8"
const MUTED = "#8a8070"
const CARD2 = "#222018"
const BORDER = "rgba(255,255,255,0.06)"

const FEATURES = [
  {
    title: "SOS button",
    desc: "Always visible. 3-second countdown before alert fires.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "RIDE Safety Desk",
    desc: "HOP's internal team monitors and coordinates help.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Trusted contacts",
    desc: "Sends a live tracking link to people you choose.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: "919 integration",
    desc: "Option to dial Nassau emergency services directly.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
]

function TiltCard({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [0, 100], [6, -6])
  const rotateY = useTransform(mouseX, [0, 300], [-6, 6])
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 25 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 25 })

  const glowX = useTransform(mouseX, [0, 300], [0, 100])
  const glowY = useTransform(mouseY, [0, 100], [0, 100])
  const glowOpacity = useSpring(useTransform(mouseX, [0, 300], [0, 0.4]), { stiffness: 300, damping: 30 })

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
        backgroundColor: CARD2,
        borderRadius: 16,
        border: `1px solid ${BORDER}`,
        cursor: "default",
      }}
    >
      {/* Glow layer */}
      <motion.div
        style={{
          position: "absolute", inset: 0, borderRadius: 16,
          pointerEvents: "none",
          opacity: glowOpacity,
          background: `radial-gradient(80px at ${glowX}% ${glowY}%, rgba(232,64,64,0.35), transparent 60%)`,
        }}
      />
      {/* Border shimmer on hover */}
      <motion.div
        style={{
          position: "absolute", inset: 0, borderRadius: 16,
          border: "1px solid transparent",
          pointerEvents: "none",
          opacity: glowOpacity,
          boxShadow: "inset 0 0 0 1px rgba(232,64,64,0.3)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </motion.div>
  )
}

export default function SafetySection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" })
  const phoneRef = useRef<HTMLDivElement>(null)
  const phoneInView = useInView(phoneRef, { once: true, margin: "-80px" })

  return (
    <section style={{ backgroundColor: CARD2, padding: "5rem 1.5rem" }}>
      <div
        style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gap: "4rem", alignItems: "center" }}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left — phone with SOS pulse ring */}
        <motion.div
          ref={phoneRef}
          initial={{ opacity: 0, x: -40 }}
          animate={phoneInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex"
          style={{ justifyContent: "center", alignItems: "center", position: "relative" }}
        >
          {/* Pulse rings behind phone */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.6 + i * 0.15], opacity: [0.35, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
              style={{
                position: "absolute",
                width: 160, height: 160,
                borderRadius: "50%",
                border: `1px solid ${RED}`,
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Phone frame */}
          <div style={{ display: "inline-block", borderRadius: 44, padding: 10, background: "linear-gradient(145deg, #2e2e2e 0%, #181818 100%)", boxShadow: "0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.09)", position: "relative", zIndex: 2 }}>
            <div style={{ borderRadius: 36, overflow: "hidden", width: 240, height: 520 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/screenshots/sos.png" alt="HOP SOS screen" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>
        </motion.div>

        {/* Right — copy + feature cards */}
        <div>
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ display: "inline-block", padding: "0.3rem 0.8rem", backgroundColor: "rgba(232,64,64,0.12)", border: "1px solid rgba(232,64,64,0.2)", borderRadius: 999, color: RED, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "1.25rem" }}>
              SAFETY
            </span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: "1rem", lineHeight: 1.15 }}>
              We monitor every ride.
            </h2>
            <p style={{ color: MUTED, fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.75rem" }}>
              One tap activates the SOS system. No drama — just reliable help when you need it.
            </p>
          </motion.div>

          {/* Tilt feature cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.75rem" }}>
            {FEATURES.map((item, i) => (
              <TiltCard key={item.title} delay={0.1 + i * 0.08}>
                <div style={{ display: "flex", gap: "0.875rem", padding: "0.875rem", alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(232,64,64,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background-color 0.2s" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ color: TEXT, fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>{item.title}</p>
                    <p style={{ color: MUTED, fontSize: "0.8rem", lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          <Link href="/services#safety" style={{ color: ORANGE, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem", transition: "gap 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = "0.65rem")}
            onMouseLeave={(e) => (e.currentTarget.style.gap = "0.4rem")}
          >
            Full safety overview
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
