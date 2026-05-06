"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const ORANGE = "#F5A020"

const CATEGORY_COLORS: Record<string, string> = {
  "Nassau Travel Guide": ORANGE,
  Features: "#3aad6e",
  Tips: "#60a5fa",
  "Group Travel": "#a78bfa",
  Safety: "#E84040",
}

interface TravelCardProps {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  coverImage?: string
  index?: number
}

export function TravelCard({ slug, title, excerpt, category, date, readTime, coverImage, index = 0 }: TravelCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 120, damping: 18 })
  const springY = useSpring(y, { stiffness: 120, damping: 18 })

  const rotateX = useTransform(springY, [-0.5, 0.5], ["6deg", "-6deg"])
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-6deg", "6deg"])

  const accentColor = CATEGORY_COLORS[category] || ORANGE

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 800, rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group"
    >
      <Link
        href={`/blog/${slug}`}
        style={{
          display: "block",
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: "#1a1810",
          border: "1px solid rgba(255,255,255,0.07)",
          textDecoration: "none",
          position: "relative",
          height: "100%",
        }}
      >
        {/* Image panel with zoom on hover */}
        <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
          {coverImage ? (
            <motion.div
              style={{ position: "absolute", inset: 0 }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={coverImage}
                alt={title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </motion.div>
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg, ${accentColor}18 0%, rgba(14,12,9,0.6) 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" opacity={0.6}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
          )}
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(26,24,16,1) 0%, rgba(26,24,16,0.3) 50%, transparent 100%)",
            }}
          />
          {/* Category pill over image */}
          <div style={{ position: "absolute", top: 12, left: 12 }}>
            <span
              style={{
                display: "inline-block",
                padding: "0.2rem 0.65rem",
                borderRadius: 999,
                backgroundColor: `${accentColor}22`,
                border: `1px solid ${accentColor}44`,
                color: accentColor,
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.125rem 1.25rem 1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
            <span style={{ color: "rgba(138,128,112,0.7)", fontSize: "0.72rem" }}>{date}</span>
            <span style={{ color: "rgba(138,128,112,0.4)", fontSize: "0.7rem" }}>·</span>
            <span style={{ color: "rgba(138,128,112,0.7)", fontSize: "0.72rem" }}>{readTime}</span>
          </div>

          <h3
            style={{
              color: "#f0ede8",
              fontWeight: 700,
              fontSize: "0.975rem",
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              marginBottom: "0.6rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h3>

          <p
            style={{
              color: "#8a8070",
              fontSize: "0.82rem",
              lineHeight: 1.65,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              marginBottom: "1rem",
            }}
          >
            {excerpt}
          </p>

          {/* Footer row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <motion.span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: accentColor,
                fontSize: "0.78rem",
                fontWeight: 700,
              }}
              whileHover={{ gap: "0.55rem" }}
              transition={{ duration: 0.2 }}
            >
              Read guide
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.span>
          </div>
        </div>

        {/* Hover glow border */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            border: `1.5px solid ${accentColor}`,
            opacity: 0,
            pointerEvents: "none",
          }}
          whileHover={{ opacity: 0.35 }}
          transition={{ duration: 0.25 }}
        />
      </Link>
    </motion.div>
  )
}
