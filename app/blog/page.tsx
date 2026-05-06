import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "HOP Blog — Nassau Bahamas Transportation Guides & Tips",
  description:
    "Expert guides on getting around Nassau. Airport transfers, taxis vs HOP, cruise port transport, Atlantis rides, and more — from people who know the island.",
};

const ORANGE = "#F5A020";
const BG = "#161616";
const CARD = "#1e1c14";
const CARD2 = "#222018";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const BORDER = "rgba(255,255,255,0.06)";

const CATEGORIES = ["All", "Nassau Travel Guide", "Features", "Tips", "Group Travel", "Safety"];

const CATEGORY_COLORS: Record<string, string> = {
  "Nassau Travel Guide": ORANGE,
  Features: "#3aad6e",
  Tips: "#60a5fa",
  "Group Travel": "#a78bfa",
  Safety: "#E84040",
};

export default function BlogPage() {
  const featured = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0];
  const rest = BLOG_POSTS.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "88px" }}>
        {/* Header */}
        <section style={{ backgroundColor: BG, padding: "4rem 1.5rem 3rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <Link href="/" className="footer-link" style={{ fontSize: "0.875rem" }}>Home</Link>
              <span style={{ color: MUTED, fontSize: "0.875rem" }}>/</span>
              <span style={{ color: ORANGE, fontSize: "0.875rem", fontWeight: 600 }}>Blog</span>
            </div>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 900,
                color: TEXT,
                letterSpacing: "-0.03em",
                marginBottom: "0.75rem",
              }}
            >
              Nassau transportation — guides, tips &amp; news.
            </h1>
            <p style={{ color: MUTED, fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 560 }}>
              Practical answers for visitors. No Uber in Nassau? We cover that. Airport taxi fares, cruise port routes, Atlantis transfers — all here.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section
          style={{
            backgroundColor: CARD,
            padding: "1rem 1.5rem",
            borderTop: `1px solid ${BORDER}`,
            borderBottom: `1px solid ${BORDER}`,
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {CATEGORIES.map((cat, i) => (
              <span
                key={cat}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "999px",
                  border: `1px solid ${i === 0 ? "rgba(245,160,32,0.4)" : BORDER}`,
                  backgroundColor: i === 0 ? "rgba(245,160,32,0.1)" : "transparent",
                  color: i === 0 ? ORANGE : MUTED,
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </section>

        {/* Featured post */}
        <section style={{ backgroundColor: BG, padding: "3rem 1.5rem 2rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p
              style={{
                color: MUTED,
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                marginBottom: "1rem",
              }}
            >
              FEATURED GUIDE
            </p>
            <Link
              href={`/blog/${featured.slug}`}
              className="card-hover"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2.5rem",
                backgroundColor: CARD,
                borderRadius: 24,
                border: `1px solid ${BORDER}`,
                padding: "2.5rem",
                textDecoration: "none",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1.25rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "999px",
                      backgroundColor: `${CATEGORY_COLORS[featured.category] || ORANGE}18`,
                      color: CATEGORY_COLORS[featured.category] || ORANGE,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    {featured.category}
                  </span>
                  <span style={{ color: MUTED, fontSize: "0.8rem" }}>{featured.date}</span>
                  <span style={{ color: MUTED, fontSize: "0.8rem" }}>·</span>
                  <span style={{ color: MUTED, fontSize: "0.8rem" }}>{featured.readTime}</span>
                </div>
                <h2
                  style={{
                    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                    fontWeight: 800,
                    color: TEXT,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.25,
                    marginBottom: "1rem",
                  }}
                >
                  {featured.title}
                </h2>
                <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  {featured.excerpt}
                </p>
                <span className="hop-link-arrow">
                  Read guide
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
              {/* Visual panel */}
              <div
                style={{
                  borderRadius: 16,
                  backgroundColor: CARD2,
                  border: `1px solid ${BORDER}`,
                  minHeight: 240,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="hidden md:flex"
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(245,160,32,0.08) 0%, transparent 60%)",
                  }}
                />
                <div style={{ textAlign: "center", position: "relative" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 20,
                      backgroundColor: "rgba(245,160,32,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 0.75rem",
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="1.5">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  </div>
                  <p style={{ color: MUTED, fontSize: "0.8rem" }}>Nassau, The Bahamas</p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Post grid */}
        <section style={{ backgroundColor: BG, padding: "1rem 1.5rem 5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p
              style={{
                color: MUTED,
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                marginBottom: "1.5rem",
              }}
            >
              ALL ARTICLES
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-post-card">
                  <div
                    style={{
                      height: 3,
                      width: 32,
                      borderRadius: "999px",
                      backgroundColor: CATEGORY_COLORS[post.category] || ORANGE,
                      marginBottom: "0.25rem",
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span
                      style={{
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                        backgroundColor: `${CATEGORY_COLORS[post.category] || ORANGE}18`,
                        color: CATEGORY_COLORS[post.category] || ORANGE,
                        fontSize: "0.7rem",
                        fontWeight: 700,
                      }}
                    >
                      {post.category}
                    </span>
                    <span style={{ color: MUTED, fontSize: "0.75rem" }}>{post.readTime}</span>
                  </div>
                  <h3
                    style={{
                      color: TEXT,
                      fontWeight: 700,
                      fontSize: "1rem",
                      lineHeight: 1.4,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p style={{ color: MUTED, fontSize: "0.85rem", lineHeight: 1.6, flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "0.75rem",
                      borderTop: `1px solid ${BORDER}`,
                    }}
                  >
                    <span style={{ color: MUTED, fontSize: "0.75rem" }}>{post.date}</span>
                    <span className="hop-link-arrow" style={{ fontSize: "0.8rem" }}>
                      Read
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: CARD, padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 800,
                color: TEXT,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              Ready to book your first HOP ride?
            </h2>
            <p style={{ color: MUTED, fontSize: "0.95rem", marginBottom: "2rem" }}>
              No flagging required. Fixed price. Real-time tracking. Available across Nassau.
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
  );
}
