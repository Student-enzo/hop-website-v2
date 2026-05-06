import { MetadataRoute } from "next"
import { BLOG_POSTS } from "@/lib/blog-posts"

const BASE = "https://hopbahamas.com"

// Site launch date — used for static pages
const LAUNCH = new Date("2026-04-22")

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUrls = BLOG_POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.9 : 0.7,
  }))

  return [
    { url: BASE, lastModified: LAUNCH, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/blog`, lastModified: LAUNCH, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/services`, lastModified: LAUNCH, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/routes`, lastModified: LAUNCH, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/routes/nassau-airport`, lastModified: LAUNCH, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/routes/atlantis-paradise-island`, lastModified: LAUNCH, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/routes/nassau-cruise-port`, lastModified: LAUNCH, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/routes/baha-mar-cable-beach`, lastModified: LAUNCH, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/routes/blue-lagoon-island`, lastModified: LAUNCH, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/routes/sandals-royal-bahamian`, lastModified: LAUNCH, changeFrequency: "monthly", priority: 0.7 },
    ...blogUrls,
  ]
}
