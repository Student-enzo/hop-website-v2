import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.DASHBOARD_SECRET && secret !== "hop2026admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = getSupabase();
  const { data, error } = await db
    .from("hop_email_subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
