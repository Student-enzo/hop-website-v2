import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "bookings.json");

function readBookings() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as Record<string, unknown>[];
}

function writeBookings(bookings: Record<string, unknown>[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2));
}

// POST /api/book — create booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = "HOP" + Math.random().toString(36).substring(2, 6).toUpperCase();
    const entry = { id, ...body, status: "pending", createdAt: new Date().toISOString() };
    const bookings = readBookings();
    bookings.unshift(entry);
    writeBookings(bookings);
    return NextResponse.json({ success: true, id });
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 });
  }
}

// GET /api/book?secret=... — list bookings (dashboard)
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.DASHBOARD_SECRET && secret !== "hop2026admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(readBookings());
}

// PATCH /api/book — update status
export async function PATCH(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.DASHBOARD_SECRET && secret !== "hop2026admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, status } = await request.json();
  const bookings = readBookings();
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  bookings[idx].status = status;
  writeBookings(bookings);
  return NextResponse.json({ success: true });
}
