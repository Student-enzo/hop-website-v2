"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

interface FocusPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  coverImage?: string
}

interface FocusRailProps {
  posts: FocusPost[]
}

function getPosition(index: number, active: number, total: number) {
  let offset = index - active
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

export function FocusRail({ posts }: FocusRailProps) {
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a - 1 + posts.length) % posts.length)
  const next = () => setActive((a) => (a + 1) % posts.length)

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {/* Rail */}
      <div
        style={{
          position: "relative",
          height: 440,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: 1200,
        }}
      >
        {posts.map((post, i) => {
          const offset = getPosition(i, active, posts.length)
          const absOffset = Math.abs(offset)
          const visible = absOffset <= 2

          if (!visible) return null

          const x = offset * 340
          const scale = offset === 0 ? 1 : 0.78 - absOffset * 0.06
          const rotateY = offset * -28
          const z = offset === 0 ? 0 : -160 - absOffset * 40
          const opacity = offset === 0 ? 1 : Math.max(0, 0.55 - absOffset * 0.12)
          const accentColor = CATEGORY_COLORS[post.category] || ORANGE

          return (
            <motion.div
              key={post.slug}
              animate={{ x, scale, rotateY, z, opacity }}
              transition={{ type: "spring", stiffness: 200, damping: 26, mass: 0.8 }}
              style={{
                position: "absolute",
                width: 300,
                transformStyle: "preserve-3d",
                zIndex: offset === 0 ? 10 : 5 - absOffset,
                cursor: offset !== 0 ? "pointer" : "default",
              }}
              onClick={() => offset !== 0 && setActive(i)}
            >
              <div
                style={{
                  borderRadius: 22,
                  overflow: "hidden",
                  backgroundColor: "#1a1810",
                  border: offset === 0
                    ? `1.5px solid ${accentColor}55`
                    : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: offset === 0
                    ? `0 32px 64px rgba(0,0,0,0.55), 0 0 0 1px ${accentColor}22`
                    : "0 12px 32px rgba(0,0,0,0.4)",
                  pointerEvents: offset !== 0 ? "none" : "auto",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: 190, overflow: "hidden" }}>
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="300px"
                    />
                  ) : (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(135deg, ${accentColor}22 0%, rgba(14,12,9,0.8) 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" opacity={0.5}>
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                    </div>
                  )}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,24,16,0.95) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", top: 12, left: 12 }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.2rem 0.65rem",
                        borderRadius: 999,
                        backgroundColor: `${accentColor}22`,
                        border: `1px solid ${accentColor}44`,
                        color: accentColor,
                        fontSize: "0.67rem",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "1.125rem 1.25rem 1.375rem" }}>
                  <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "rgba(138,128,112,0.7)", fontSize: "0.7rem" }}>{post.date}</span>
                    <span style={{ color: "rgba(138,128,112,0.4)" }}>·</span>
                    <span style={{ color: "rgba(138,128,112,0.7)", fontSize: "0.7rem" }}>{post.readTime}</span>
                  </div>
                  <h3
                    style={{
                      color: "#f0ede8",
                      fontWeight: 700,
                      fontSize: "0.975rem",
                      lineHeight: 1.35,
                      letterSpacing: "-0.01em",
                      marginBottom: "0.65rem",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    style={{
                      color: "#8a8070",
                      fontSize: "0.8rem",
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      marginBottom: "1.125rem",
                    }}
                  >
                    {post.excerpt}
                  </p>
                  {offset === 0 && (
                    <Link
                      href={`/blog/${post.slug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.5rem 1.125rem",
                        borderRadius: 999,
                        backgroundColor: accentColor,
                        color: "#0e0c09",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        textDecoration: "none",
                      }}
                    >
                      Read guide
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0e0c09" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1.5rem" }}>
        <button
          onClick={prev}
          aria-label="Previous"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.12)",
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "#f0ede8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        {/* Dots */}
        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === active ? 20 : 6,
                height: 6,
                borderRadius: 999,
                backgroundColor: i === active ? ORANGE : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.12)",
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "#f0ede8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
