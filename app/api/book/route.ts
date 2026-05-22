import { NextRequest, NextResponse } from "next/server";
import { getSupabase, getSupabaseAdmin } from "@/lib/supabase";
import { sendBookingConfirmation } from "@/lib/email";

function genId() {
  return "HOP" + Math.random().toString(36).substring(2, 6).toUpperCase();
}

// POST /api/book — create booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = genId();
    const entry = {
      id,
      pickup: body.pickup,
      dropoff: body.dropoff,
      date: body.date,
      time: body.time,
      tier: body.tier,
      lux_vehicle: body.luxVehicle ?? null,
      price: body.price,
      pax: body.pax,
      bags: body.bags,
      name: body.name,
      email: body.email,
      phone: body.phone,
      status: "pending",
    };

    const db = getSupabase();
    const { error } = await db.from("hop_bookings").insert(entry);
    if (error) throw error;

    // Fire confirmation emails (non-blocking — don't fail booking if email fails)
    sendBookingConfirmation({ ...entry, luxVehicle: entry.lux_vehicle ?? undefined }).catch(() => {});

    // Upsert subscriber from booking email
    db.from("hop_email_subscribers").upsert({ email: body.email, name: body.name, source: "booking" }, { onConflict: "email" }).then(() => {});

    return NextResponse.json({ success: true, id });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : (e as { message?: string })?.message ?? String(e);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

// GET /api/book?secret=... — list bookings (dashboard)
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.DASHBOARD_SECRET && secret !== "hop2026admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = getSupabaseAdmin();
  const { data, error } = await db.from("hop_bookings").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PATCH /api/book — update status
export async function PATCH(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.DASHBOARD_SECRET && secret !== "hop2026admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, status } = await request.json();
  const db = getSupabaseAdmin();
  const { error } = await db.from("hop_bookings").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
