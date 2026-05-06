"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { TravelCard, CATEGORY_ACCENT } from "@/components/ui/card-7";
import { FocusCards, type FocusCard } from "@/components/ui/focus-rail";

const ORANGE = "#F5A020";
const BG = "#0e0c09";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const BORDER = "rgba(255,255,255,0.07)";

const CATEGORIES = ["All", "Nassau Travel Guide", "Features", "Tips", "Group Travel", "Safety"];

// Posts shown in the FocusCards hero carousel
const FOCUS_SLUGS = [
  "no-uber-nassau-bahamas",
  "nassau-airport-to-atlantis-transfer",
  "nassau-cruise-port-transportation-guide",
  "how-to-get-around-nassau-bahamas",
  "low-data-mode-explained",
];

// Fallback image for posts without coverImage
const FALLBACK_IMAGES: Record<string, string> = {
  "how-to-get-from-nassau-airport-to-atlantis": "/images/dest-atlantis.jpg",
  "scheduled-rides-nassau-airport-transfer": "/images/schedule-road.jpg",
  "group-travel-bahamas-mini-bus": "/images/dest-cruise.jpg",
  "low-data-mode-explained": "/images/dest-nassau.jpg",
  "nassau-luxury-car-service-vs-hop": "/images/dest-luxury.jpg",
  "hop-moments-rewards-guide": "/images/dest-nassau.jpg",
  "nassau-cruise-terminal-transport-guide": "/images/dest-cruise.jpg",
};

function getImage(slug: string, coverImage?: string) {
  return coverImage ?? FALLBACK_IMAGES[slug] ?? "/images/dest-nassau.jpg";
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Build FocusCards data
  const focusPosts: FocusCard[] = FOCUS_SLUGS
    .map((slug, i) => {
      const post = BLOG_POSTS.find((p) => p.slug === slug);
      if (!post) return null;
      return {
        id: i + 1,
        title: post.title,
        description: post.excerpt,
        meta: `${post.category} · ${post.readTime}`,
        imageSrc: getImage(post.slug, post.coverImage),
        href: `/blog/${post.slug}`,
      };
    })
    .filter(Boolean) as FocusCard[];

  // Grid posts (exclude focus posts when showing "All")
  const gridPosts =
    activeCategory === "All"
      ? BLOG_POSTS.filter((p) => !FOCUS_SLUGS.includes(p.slug))
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 88, backgroundColor: BG, minHeight: "100vh" }}>

        {/* ── Header ── */}
        <section style={{ padding: "4rem 1.5rem 2.5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="flex items-center gap-2 mb-5">
              <Link href="/" className="footer-link text-sm">Home</Link>
              <span style={{ color: MUTED }} className="text-sm">/</span>
              <span style={{ color: ORANGE }} className="text-sm font-semibold">Blog</span>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p style={{ color: ORANGE }} className="text-xs font-bold tracking-widest uppercase mb-2">
                  Nassau Travel Knowledge
                </p>
                <h1
                  style={{ color: TEXT, letterSpacing: "-0.03em" }}
                  className="text-4xl md:text-5xl font-black leading-tight mb-3"
                >
                  Guides, tips &amp; news<br />
                  <span style={{ color: ORANGE }}>from Nassau.</span>
                </h1>
                <p style={{ color: MUTED }} className="text-base leading-relaxed max-w-lg">
                  Practical answers for visitors. Airport routes, taxi fares, cruise port tips — from people who know the island.
                </p>
              </div>
              <a
                href="https://app.hopbahamas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary shrink-0"
                style={{ padding: "0.75rem 1.5rem", fontSize: "0.875rem" }}
              >
                Book a ride
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── Category Filter ── */}
        <section style={{ padding: "0 1.5rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }} className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = cat === activeCategory;
              const color = cat === "All" ? ORANGE : (CATEGORY_ACCENT[cat] || ORANGE);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    padding: "0.375rem 1rem",
                    border: `1px solid ${isActive ? color + "60" : BORDER}`,
                    backgroundColor: isActive ? `${color}14` : "transparent",
                    color: isActive ? color : MUTED,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── FocusCards hero — only on "All" ── */}
        {activeCategory === "All" && (
          <section style={{ padding: "3.5rem 1.5rem 2rem" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div className="flex items-center gap-3 mb-6">
                <p style={{ color: MUTED }} className="text-xs font-bold tracking-widest uppercase whitespace-nowrap">
                  Featured Guides
                </p>
                <div style={{ flex: 1, height: 1, backgroundColor: BORDER }} />
              </div>
              <FocusCards cards={focusPosts} />
            </div>
          </section>
        )}

        {/* ── TravelCard grid ── */}
        <section style={{ padding: activeCategory === "All" ? "1.5rem 1.5rem 5rem" : "3rem 1.5rem 5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="flex items-center gap-3 mb-6">
              <p style={{ color: MUTED }} className="text-xs font-bold tracking-widest uppercase whitespace-nowrap">
                {activeCategory === "All" ? "All Articles" : activeCategory}
              </p>
              <div style={{ flex: 1, height: 1, backgroundColor: BORDER }} />
              <span style={{ color: MUTED }} className="text-xs whitespace-nowrap">
                {gridPosts.length} articles
              </span>
            </div>

            {gridPosts.length === 0 ? (
              <div className="flex items-center justify-center py-16">
                <p style={{ color: MUTED }} className="text-sm">No articles in this category yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {gridPosts.map((post) => (
                  <TravelCard
                    key={post.slug}
                    imageUrl={getImage(post.slug, post.coverImage)}
                    imageAlt={post.title}
                    title={post.title}
                    location={post.category}
                    overview={post.excerpt}
                    readTime={post.readTime}
                    date={post.date}
                    href={`/blog/${post.slug}`}
                    accentColor={CATEGORY_ACCENT[post.category] || ORANGE}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ backgroundColor: "#141210", borderTop: `1px solid ${BORDER}`, padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <p style={{ color: ORANGE }} className="text-xs font-bold tracking-widest uppercase mb-3">
              Ready to Ride
            </p>
            <h2
              style={{ color: TEXT, letterSpacing: "-0.02em" }}
              className="text-3xl md:text-4xl font-extrabold leading-tight mb-3"
            >
              Book your first HOP ride in Nassau.
            </h2>
            <p style={{ color: MUTED }} className="text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              Fixed price. Real-time tracking. No flagging required. Available now.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
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
