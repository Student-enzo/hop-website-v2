import { type NextRequest, NextResponse } from "next/server";
import { BLOG_POSTS } from "@/lib/blog-posts";

const SECRET = "hop2026admin";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("secret") !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(
    BLOG_POSTS.map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      category: p.category,
      readTime: p.readTime,
      targetKeyword: p.targetKeyword,
      featured: p.featured,
      coverImage: p.coverImage ?? null,
    }))
  );
}
