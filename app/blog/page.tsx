"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { BLOG_POSTS } from "@/lib/blog-posts"
import { TravelCard } from "@/components/ui/card-7"
import { FocusRail } from "@/components/ui/focus-rail"

const ORANGE = "#F5A020"
const BG = "#0e0c09"
const TEXT = "#f0ede8"
const MUTED = "#8a8070"
const BORDER = "rgba(255,255,255,0.06)"

const CATEGORIES = ["All", "Nassau Travel Guide", "Features", "Tips", "Group Travel", "Safety"]

const CATEGORY_COLORS: Record<string, string> = {
  "Nassau Travel Guide": ORANGE,
  Features: "#3aad6e",
  Tips: "#60a5fa",
  "Group Travel": "#a78bfa",
  Safety: "#E84040",
}

// Posts shown in the FocusRail carousel (top picks)
const RAIL_SLUGS = [
  "no-uber-nassau-bahamas",
  "nassau-airport-to-atlantis-transfer",
  "nassau-cruise-port-transportation-guide",
  "how-to-get-around-nassau-bahamas",
  "nassau-taxi-cost-guide-2025",
  "low-data-mode-explained",
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const railPosts = RAIL_SLUGS
    .map((slug) => BLOG_POSTS.find((p) => p.slug === slug))
    .filter(Boolean) as typeof BLOG_POSTS

  const gridPosts = BLOG_POSTS.filter((p) => {
    const inRail = RAIL_SLUGS.includes(p.slug)
    const matchesCat = activeCategory === "All" || p.category === activeCategory
    return !inRail && matchesCat
  })

  // When filtering, also include rail posts in the grid
  const filteredGrid =
    activeCategory === "All"
      ? gridPosts
      : BLOG_POSTS.filter((p) => p.category === activeCategory)

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "88px", backgroundColor: BG, minHeight: "100vh" }}>

        {/* ── Header ── */}
        <section style={{ padding: "4rem 1.5rem 2.5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <Link href="/" className="footer-link" style={{ fontSize: "0.875rem" }}>Home</Link>
              <span style={{ color: MUTED, fontSize: "0.875rem" }}>/</span>
              <span style={{ color: ORANGE, fontSize: "0.875rem", fontWeight: 600 }}>Blog</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p style={{ color: ORANGE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.6rem" }}>
                  NASSAU TRAVEL KNOWLEDGE
                </p>
                <h1
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 900,
                    color: TEXT,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    marginBottom: "0.75rem",
                  }}
                >
                  Guides, tips &amp; news<br />
                  <span style={{ color: ORANGE }}>from Nassau.</span>
                </h1>
                <p style={{ color: MUTED, fontSize: "1rem", lineHeight: 1.7, maxWidth: 500 }}>
                  Practical answers for visitors. Taxi fares, airport routes, cruise port tips — from people who know the island.
                </p>
              </div>
              <a
                href="https://app.hopbahamas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: "0.75rem 1.5rem", fontSize: "0.875rem", flexShrink: 0 }}
              >
                Book a ride
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── Category Filter ── */}
        <section style={{ padding: "0 1.5rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => {
              const isActive = cat === activeCategory
              const color = cat === "All" ? ORANGE : (CATEGORY_COLORS[cat] || ORANGE)
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "0.4rem 1rem",
                    borderRadius: "999px",
                    border: `1px solid ${isActive ? color + "55" : BORDER}`,
                    backgroundColor: isActive ? `${color}14` : "transparent",
                    color: isActive ? color : MUTED,
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </section>

        {/* ── FocusRail (featured carousel) — only on "All" filter ── */}
        {activeCategory === "All" && (
          <section style={{ padding: "3.5rem 1.5rem 2rem" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                <p style={{ color: MUTED, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                  FEATURED GUIDES
                </p>
                <div style={{ flex: 1, height: 1, backgroundColor: BORDER }} />
              </div>
              <FocusRail posts={railPosts} />
            </div>
          </section>
        )}

        {/* ── Post Grid ── */}
        <section style={{ padding: activeCategory === "All" ? "1.5rem 1.5rem 5rem" : "3rem 1.5rem 5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
              <p style={{ color: MUTED, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                {activeCategory === "All" ? "ALL ARTICLES" : activeCategory.toUpperCase()}
              </p>
              <div style={{ flex: 1, height: 1, backgroundColor: BORDER }} />
              <span style={{ color: MUTED, fontSize: "0.75rem" }}>{filteredGrid.length} articles</span>
            </div>

            {filteredGrid.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem 0", color: MUTED }}>
                <p style={{ fontSize: "1rem" }}>No articles in this category yet.</p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                  gap: "1.25rem",
                  alignItems: "start",
                }}
              >
                {filteredGrid.map((post, i) => (
                  <TravelCard
                    key={post.slug}
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    category={post.category}
                    date={post.date}
                    readTime={post.readTime}
                    coverImage={post.coverImage}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ backgroundColor: "#141210", borderTop: `1px solid ${BORDER}`, padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <p style={{ color: ORANGE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
              READY TO RIDE
            </p>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 800,
                color: TEXT,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: "0.75rem",
              }}
            >
              Book your first HOP ride in Nassau.
            </h2>
            <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Fixed price. Real-time tracking. No flagging required. Available now.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
              <a
                href="https://app.hopbahamas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: "0.875rem 2rem", fontSize: "0.95rem" }}
              >
                Book via Web App
              </a>
              <a href="/#download" className="btn-secondary" style={{ padding: "0.875rem 2rem", fontSize: "0.95rem" }}>
                Download the App
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
