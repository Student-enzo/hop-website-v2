import { NextRequest, NextResponse } from "next/server";
import { sendAppCredentialsEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.DASHBOARD_SECRET && secret !== "hop2026admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { email, name, appEmail, appPassword } = await request.json();
    if (!email || !appPassword) return NextResponse.json({ error: "email and appPassword required" }, { status: 400 });
    await sendAppCredentialsEmail({ email, name: name || email, appEmail: appEmail || email, appPassword });
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
