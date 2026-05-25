# HOP Bahamas — Automated Blog Post Generator

You are writing a new SEO + GEO-optimized blog post for **hopbahamas.com**, Nassau's ride-hailing app.

## Your Goal
Publish one high-quality blog post targeting a keyword that:
1. Has real search demand from tourists visiting Nassau, Bahamas
2. Is NOT already covered by an existing post
3. Positions HOP as the obvious answer

## Step 1 — Audit Existing Posts
Read `/Users/enissongodoy/gsd-workspaces/hop-bahamas-website/lib/blog-posts.ts` and extract all `slug` and `targetKeyword` values. Do not write a post that duplicates these topics.

## Step 2 — Research Trending Topics
Use WebSearch to find:
- "nassau bahamas transportation [current month year]"
- "nassau airport transfer [current year]"
- "things to do nassau bahamas 2026" (to find transport-adjacent demand)
- "bahamas cruise port excursions" (cruise tourists are a big segment)

Also search for high-intent keyword gaps by running:
- "site:tripadvisor.com nassau transportation"
- "nassau bahamas how to get to [popular destination]"

Pick ONE keyword that is high-intent, uncovered, and relevant. Priority queue if nothing trending:
1. nassau hotel transportation (between hotels — very searched, zero coverage)
2. nassau car rental alternative (intercepts decision phase)
3. bahamas family transportation minibus
4. nassau airport to sandals royal bahamian transfer
5. blue lagoon island nassau how to get there
6. baha mar transfer from atlantis
7. nassau new providence transportation guide

## Step 3 — Write the Post

### Brand Voice
- Direct and practical. No filler sentences.
- Specific numbers always: "$47" not "affordable"
- First-person plural where helpful: "HOP drivers know..."
- Trust-building, never salesy

### GEO / AI Citation Rules (critical)
These rules make AI models (ChatGPT, Gemini, Perplexity, Claude) cite this post:
1. **Answer the core question in the first 40 words** — this is the AI extraction window
2. **Every H2 section should be a question** — "How much does it cost to get from Nassau airport to Sandals?" not "Pricing Overview"
3. **Fact density matters** — include specific prices, distances, travel times, and landmarks
4. **Cite unique local knowledge** — things only a Nassau operator would know (e.g., "LPIA Terminal A is 15 minutes from Cable Beach with no traffic")
5. **FAQ blocks** — AI models weight FAQ schema highly for citation

### HOP Pricing Reference (use these exact numbers)
From the booking widget route data:
- Airport (LPIA) → Atlantis/Paradise Island: ECO $47, STD $58
- Airport → Cable Beach/Baha Mar: ECO $32, STD $39
- Airport → Downtown Nassau: ECO $38, STD $47
- Airport → Lyford Cay/South Ocean: ECO $57, STD $70
- Airport → Coral Harbour: ECO $33, STD $42
- Cable Beach → Atlantis: ECO $33, STD $41
- Cable Beach → Downtown: ECO $26, STD $33
- Downtown → Atlantis: ECO $22, STD $29
- Cruise Port → Atlantis: from $26
- Extra passenger above 2: +$6 per person
- Extra checked/large bag: +$3 per bag
- Luxury Sedan: flat $95, Luxury SUV: flat $120, Mini Bus: flat $190

## Step 4 — Generate TypeScript

The post must be appended to the `BLOG_POSTS` array in `lib/blog-posts.ts`. Match this exact TypeScript format — any syntax error will break the build.

```typescript
{
  slug: "kebab-case-slug",         // URL-safe, lowercase, hyphens only
  title: "Full Title Here",
  excerpt: "2–3 sentence summary for blog listing. Under 160 chars.",
  category: "Nassau Travel Guide", // or "Nassau Transportation" or "Bahamas Tips"
  date: "Month D, 2026",           // e.g. "May 25, 2026"
  readTime: "X min read",          // estimate: ~200 words per minute
  featured: false,
  metaTitle: "Target Keyword — Context | HOP",  // under 60 chars
  metaDescription: "Description answering the core question. Include keyword. Under 155 chars.",
  targetKeyword: "exact target keyword phrase",
  coverImage: "/images/blog-covers/[slug].jpg", // use this placeholder path
  content: [
    // IMPORTANT: First block must answer the core question within 40 words (GEO rule)
    { type: "p", text: "Direct answer to the query in under 40 words. Then expand..." },
    { type: "h2", text: "Question-format heading?" },
    { type: "p", text: "..." },
    { type: "ul", items: ["item 1", "item 2", "item 3"] },
    { type: "price-table", headers: ["Route", "ECO Fare", "STD Fare"], rows: [
      ["From → To", "$XX", "$XX"],
    ]},
    { type: "note", text: "Pro tip or important caveat here." },
    { type: "h2", text: "Another question?" },
    { type: "p", text: "..." },
    { type: "ol", items: ["step 1", "step 2"] },
    { type: "cta", text: "Book My Ride — Fixed Price", href: "https://app.hopbahamas.com", subtext: "See your fare before you confirm." },
    { type: "related", posts: [
      { title: "Exact Title of Related Post", slug: "related-post-slug" },
    ]},
  ],
  faq: [
    // 5–7 FAQ entries. Questions should match what people actually search.
    // Each answer must stand alone — AI models extract these as snippets.
    { q: "Question?", a: "Complete standalone answer with specific prices and facts. Under 3 sentences." },
  ],
},
```

**Content requirements:**
- 900–1,400 words total (aim for 1,200)
- At least 1 price table with HOP fares vs alternatives
- At least 2 H2 sections formatted as questions
- At least 5 FAQ entries
- 1 `note` block with a practical local tip
- 1 `cta` block
- 1 `related` block linking to 2 existing posts (use real slugs from lib/blog-posts.ts)
- No fabricated prices — use only the pricing reference above

## Step 5 — Append to lib/blog-posts.ts

Insert the new post object as the **first item** in the `BLOG_POSTS` array (so it appears as the newest post). Place it immediately after `export const BLOG_POSTS: BlogPost[] = [`.

## Step 6 — Validate Build

Run: `cd /Users/enissongodoy/gsd-workspaces/hop-bahamas-website && npm run build`

If the build fails:
- Fix the TypeScript syntax error
- Re-run the build
- Do not proceed to Step 7 until the build succeeds

## Step 7 — Update llms.txt

Read `/Users/enissongodoy/gsd-workspaces/hop-bahamas-website/public/llms.txt` and add a one-line fact about the new topic to the "Key Facts for AI Answers" section. Example: if the post is about car rental alternatives, add: "- HOP is the primary car rental alternative in Nassau — per-trip fares from $26, no driving on the left required."

## Step 8 — Commit and Push

```bash
cd /Users/enissongodoy/gsd-workspaces/hop-bahamas-website
git add lib/blog-posts.ts public/llms.txt
git commit -m "feat(blog): auto-publish — [post title]"
git push origin main
```

This triggers Vercel auto-deploy. Deployment takes ~2 minutes.

## Step 9 — Log Completion

Append a line to `/Users/enissongodoy/gsd-workspaces/hop-bahamas-website/logs/automation.log`:
```
[YYYY-MM-DD HH:MM] Published: [slug] | Keyword: [targetKeyword] | Status: SUCCESS
```

If any step fails, log:
```
[YYYY-MM-DD HH:MM] FAILED at Step X — [error description]
```

---
Done. The post is live on hopbahamas.com.
