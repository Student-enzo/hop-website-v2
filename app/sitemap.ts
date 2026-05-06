import { MetadataRoute } from "next"
import { BLOG_POSTS } from "@/lib/blog-posts"

const BASE = "https://hopbahamas.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUrls = BLOG_POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.9 : 0.7,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/routes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/routes/nassau-airport`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/routes/atlantis-paradise-island`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/routes/nassau-cruise-port`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/routes/baha-mar-cable-beach`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/routes/blue-lagoon-island`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/routes/sandals-royal-bahamian`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...blogUrls,
  ]
}
