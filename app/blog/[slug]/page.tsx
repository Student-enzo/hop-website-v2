import { notFound } from "next/navigation";
import Link from "next/link";
import TrackedLink from "../../components/TrackedLink";
import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StickyMobileCTA from "../../components/StickyMobileCTA";
import { BLOG_POSTS, getPostBySlug, getRelatedPosts, type ContentBlock } from "@/lib/blog-posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

function parsePostDate(dateStr: string): string {
  // Convert "May 3, 2026" → "2026-05-03" for ISO 8601
  try {
    return new Date(dateStr).toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const isoDate = parsePostDate(post.date);
  const canonical = `https://hopbahamas.com/blog/${slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [post.targetKeyword, "nassau bahamas transportation", "hop bahamas"],
    alternates: { canonical },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: isoDate,
      url: canonical,
      siteName: "HOP Bahamas",
      images: post.coverImage ? [{ url: `https://hopbahamas.com${post.coverImage}`, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: post.coverImage ? [`https://hopbahamas.com${post.coverImage}`] : [],
    },
  };
}

const ORANGE = "#F5A020";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const CARD = "#1e1c14";
const CARD2 = "#222018";
const BORDER = "rgba(255,255,255,0.06)";

const CATEGORY_COLORS: Record<string, string> = {
  "Nassau Travel Guide": ORANGE,
  Features: "#3aad6e",
  Tips: "#60a5fa",
  "Group Travel": "#a78bfa",
  Safety: "#E84040",
};

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={i}
          style={{
            fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
            fontWeight: 800,
            color: TEXT,
            letterSpacing: "-0.02em",
            marginTop: "2.5rem",
            marginBottom: "0.75rem",
            lineHeight: 1.25,
          }}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: TEXT,
            marginTop: "1.75rem",
            marginBottom: "0.5rem",
          }}
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p
          key={i}
          style={{
            color: MUTED,
            fontSize: "1rem",
            lineHeight: 1.8,
            marginBottom: "1rem",
          }}
        >
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul
          key={i}
          style={{
            color: MUTED,
            fontSize: "1rem",
            lineHeight: 1.8,
            paddingLeft: "1.25rem",
            marginBottom: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
        >
          {block.items.map((item, j) => (
            <li key={j} style={{ listStyleType: "disc" }}>
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol
          key={i}
          style={{
            color: MUTED,
            fontSize: "1rem",
            lineHeight: 1.8,
            paddingLeft: "1.25rem",
            marginBottom: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
        >
          {block.items.map((item, j) => (
            <li key={j} style={{ listStyleType: "decimal" }}>
              {item}
            </li>
          ))}
        </ol>
      );
    case "note":
      return (
        <div
          key={i}
          style={{
            backgroundColor: "rgba(245,160,32,0.08)",
            border: "1px solid rgba(245,160,32,0.2)",
            borderRadius: 12,
            padding: "1rem 1.25rem",
            marginBottom: "1.25rem",
            color: "#e8c87a",
            fontSize: "0.9rem",
            lineHeight: 1.6,
          }}
        >
          {block.text}
        </div>
      );
    case "price-table":
      return (
        <div key={i} style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.875rem",
              minWidth: 480,
            }}
          >
            <thead>
              <tr>
                {block.headers.map((h, j) => (
                  <th
                    key={j}
                    style={{
                      textAlign: "left",
                      padding: "0.625rem 1rem",
                      backgroundColor: CARD2,
                      color: ORANGE,
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      letterSpacing: "0.06em",
                      borderBottom: `1px solid ${BORDER}`,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, j) => (
                <tr
                  key={j}
                  style={{
                    backgroundColor: j % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                  }}
                >
                  {row.map((cell, k) => (
                    <td
                      key={k}
                      style={{
                        padding: "0.625rem 1rem",
                        color: k === 0 ? TEXT : MUTED,
                        fontWeight: k === 0 ? 600 : 400,
                        borderBottom: `1px solid ${BORDER}`,
                        lineHeight: 1.5,
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "cta":
      return (
        <div
          key={i}
          style={{
            backgroundColor: CARD2,
            borderRadius: 16,
            border: "1px solid rgba(245,160,32,0.2)",
            padding: "1.75rem",
            margin: "2rem 0",
            textAlign: "center",
          }}
        >
          <a
            href={block.href}
            target={block.href.startsWith("http") ? "_blank" : undefined}
            rel={block.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="btn-primary"
            style={{ padding: "0.875rem 2rem", fontSize: "0.95rem", display: "inline-flex" }}
          >
            {block.text}
          </a>
          {block.subtext && (
            <p style={{ color: MUTED, fontSize: "0.8rem", marginTop: "0.5rem" }}>{block.subtext}</p>
          )}
        </div>
      );
    case "related":
      return (
        <div
          key={i}
          style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            border: `1px solid ${BORDER}`,
            borderRadius: 12,
            padding: "1rem 1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ color: ORANGE, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
            RELATED READING
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {block.posts.map((rp, j) => (
              <li key={j}>
                <Link
                  href={`/blog/${rp.slug}`}
                  style={{ color: TEXT, fontSize: "0.9rem", textDecoration: "underline", textDecorationColor: "rgba(245,160,32,0.4)" }}
                >
                  {rp.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    case "image":
      return (
        <div key={i} style={{ margin: "2rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.6)", maxWidth: 260 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={block.src} alt={block.alt} style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
          {block.caption && (
            <p style={{ color: MUTED, fontSize: "0.8rem", fontStyle: "italic", textAlign: "center" }}>{block.caption}</p>
          )}
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const catColor = CATEGORY_COLORS[post.category] || ORANGE;

  const isoDate = parsePostDate(post.date);
  const postUrl = `https://hopbahamas.com/blog/${post.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    url: postUrl,
    datePublished: isoDate,
    dateModified: isoDate,
    image: post.coverImage ? `https://hopbahamas.com${post.coverImage}` : undefined,
    author: { "@type": "Organization", name: "HOP Bahamas", url: "https://hopbahamas.com" },
    publisher: {
      "@type": "Organization",
      name: "HOP Bahamas",
      url: "https://hopbahamas.com",
      logo: { "@type": "ImageObject", url: "https://hopbahamas.com/hop-logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://hopbahamas.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://hopbahamas.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {post.faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <Navbar />
      <StickyMobileCTA />
      <main style={{ paddingTop: "88px" }}>
        {/* Article header */}
        <section style={{ backgroundColor: "#161616", padding: "3.5rem 1.5rem 2.5rem" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.5rem" }}>
              <Link href="/" className="footer-link" style={{ fontSize: "0.8rem" }}>Home</Link>
              <span style={{ color: MUTED, fontSize: "0.8rem" }}>/</span>
              <Link href="/blog" className="footer-link" style={{ fontSize: "0.8rem" }}>Blog</Link>
              <span style={{ color: MUTED, fontSize: "0.8rem" }}>/</span>
              <span style={{ color: ORANGE, fontSize: "0.8rem", fontWeight: 600, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {post.title}
              </span>
            </div>

            {/* Category + meta */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: "999px",
                  backgroundColor: `${catColor}18`,
                  color: catColor,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                {post.category}
              </span>
              <span style={{ color: MUTED, fontSize: "0.8rem" }}>{post.date}</span>
              <span style={{ color: MUTED, fontSize: "0.8rem" }}>·</span>
              <span style={{ color: MUTED, fontSize: "0.8rem" }}>{post.readTime}</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 900,
                color: TEXT,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "1rem",
              }}
            >
              {post.title}
            </h1>
            <p
              style={{
                color: MUTED,
                fontSize: "1.1rem",
                lineHeight: 1.7,
                marginBottom: "2rem",
                borderBottom: `1px solid ${BORDER}`,
                paddingBottom: "2rem",
              }}
            >
              {post.excerpt}
            </p>
          </div>
        </section>

        {/* Article body */}
        <section style={{ backgroundColor: "#161616", padding: "0 1.5rem 4rem" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            {post.content.map((block, i) => renderBlock(block, i))}
          </div>
        </section>

        {/* FAQ section */}
        {post.faq.length > 0 && (
          <section style={{ backgroundColor: CARD, padding: "3.5rem 1.5rem", borderTop: `1px solid ${BORDER}` }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              <h2
                style={{
                  fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
                  fontWeight: 800,
                  color: TEXT,
                  letterSpacing: "-0.02em",
                  marginBottom: "2rem",
                }}
              >
                Frequently Asked Questions
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {post.faq.map((item, i) => (
                  <div key={i} className="faq-item">
                    <p style={{ color: TEXT, fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem" }}>
                      {item.q}
                    </p>
                    <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.7 }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section style={{ backgroundColor: "#161616", padding: "4rem 1.5rem", borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                padding: "0.3rem 0.9rem",
                borderRadius: "999px",
                backgroundColor: "rgba(245,160,32,0.1)",
                border: "1px solid rgba(245,160,32,0.2)",
                color: ORANGE,
                fontSize: "0.75rem",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              HOP · Nassau, Bahamas
            </div>
            <h2
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 900,
                color: TEXT,
                letterSpacing: "-0.03em",
                marginBottom: "0.75rem",
              }}
            >
              Ready to book? Fixed price. No surprises.
            </h2>
            <p style={{ color: MUTED, fontSize: "0.95rem", marginBottom: "2rem" }}>
              Pre-book your ride before you land. See the fare before you confirm.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.75rem" }}>
              <TrackedLink
                href="https://app.hopbahamas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                eventLabel="book_ride"
                eventLocation="blog_post_cta"
                style={{ padding: "0.875rem 2rem", fontSize: "0.95rem" }}
              >
                Book My Ride
              </TrackedLink>
              <Link
                href="/blog"
                className="btn-secondary"
                style={{ padding: "0.875rem 2rem", fontSize: "0.95rem" }}
              >
                More Guides
              </Link>
            </div>
            <p style={{ color: MUTED, fontSize: "0.75rem", marginTop: "0.75rem" }}>
              Free cancellation · No app required
            </p>
          </div>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section style={{ backgroundColor: CARD, padding: "3.5rem 1.5rem 5rem", borderTop: `1px solid ${BORDER}` }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <p style={{ color: MUTED, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
                RELATED GUIDES
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
                {related.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="blog-post-card">
                    <div
                      style={{
                        height: 3,
                        width: 32,
                        borderRadius: "999px",
                        backgroundColor: CATEGORY_COLORS[rp.category] || ORANGE,
                      }}
                    />
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span
                        style={{
                          padding: "0.2rem 0.6rem",
                          borderRadius: "999px",
                          backgroundColor: `${CATEGORY_COLORS[rp.category] || ORANGE}18`,
                          color: CATEGORY_COLORS[rp.category] || ORANGE,
                          fontSize: "0.7rem",
                          fontWeight: 700,
                        }}
                      >
                        {rp.category}
                      </span>
                      <span style={{ color: MUTED, fontSize: "0.75rem" }}>{rp.readTime}</span>
                    </div>
                    <h3 style={{ color: TEXT, fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.4 }}>
                      {rp.title}
                    </h3>
                    <span className="hop-link-arrow" style={{ fontSize: "0.8rem", marginTop: "auto" }}>
                      Read
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
