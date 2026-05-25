import { type NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import path from "path";

const SECRET = "hop2026admin";

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("secret") !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const filePath = path.join(process.cwd(), "public", "blog-automation-runs.json");
    if (!existsSync(filePath)) return NextResponse.json([]);
    const data = JSON.parse(readFileSync(filePath, "utf-8"));
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch {
    return NextResponse.json([]);
  }
}
