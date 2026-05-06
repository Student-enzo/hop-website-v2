"use client";

import { useState, useEffect, useCallback } from "react";

const SECRET = "hop2026admin";

const BG = "#161616";
const CARD = "#1e1c14";
const CARD2 = "#222018";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const ORANGE = "#F5A020";
const GREEN = "#3aad6e";
const RED = "#E84040";
const OCEAN = "#0EA5E9";
const BORDER = "rgba(255,255,255,0.06)";

const STATUS_COLORS: Record<string, string> = {
  pending: "#F5A020",
  confirmed: "#3aad6e",
  completed: "#0EA5E9",
  cancelled: "#E84040",
};

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  tier: string;
  luxVehicle?: string;
  price: number;
  pax?: number;
  bags?: number;
  status: string;
  createdAt: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function formatTime12(t: string) {
  if (!t) return "—";
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/book?secret=${SECRET}`);
    if (res.ok) setBookings(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchBookings();
  }, [authed, fetchBookings]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/book?secret=${SECRET}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const sendEmail = (b: Booking) => {
    const subject = encodeURIComponent(`Your HOP Ride — ${b.id}`);
    const body = encodeURIComponent(
      `Hi ${b.name},\n\nYour HOP ride has been confirmed!\n\nBooking: ${b.id}\nRoute: ${b.pickup} → ${b.dropoff}\nDate: ${b.date} at ${formatTime12(b.time)}\nTier: ${b.tier === "eco" ? "ECO" : "Standard"} · $${b.price}\n\nDownload HOP:\n• App Store: https://apps.apple.com/app/hop-bahamas\n• Google Play: https://play.google.com/store/apps/hop-bahamas\n\nYour account has been created. Check the app to see your ride details.\n\nHOP Team`
    );
    window.open(`mailto:${b.email}?subject=${subject}&body=${body}`);
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: BG, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
        <div style={{ backgroundColor: CARD, borderRadius: 20, border: `1px solid ${BORDER}`, padding: "2.5rem", width: "100%", maxWidth: 380, boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}>
          <div style={{ marginBottom: "1.75rem" }}>
            <p style={{ color: ORANGE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.5rem" }}>HOP BAHAMAS</p>
            <h1 style={{ color: TEXT, fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.02em" }}>Operator Dashboard</h1>
            <p style={{ color: MUTED, fontSize: "0.85rem", marginTop: "0.4rem" }}>Enter your access key to view bookings.</p>
          </div>
          <input
            type="password"
            placeholder="Access key"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && password === SECRET && setAuthed(true)}
            style={{ width: "100%", backgroundColor: CARD2, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "0.875rem 1rem", color: TEXT, fontSize: "0.95rem", fontFamily: "inherit", outline: "none", marginBottom: "0.75rem", boxSizing: "border-box" }}
          />
          <button
            onClick={() => password === SECRET ? setAuthed(true) : alert("Wrong key")}
            style={{ width: "100%", backgroundColor: ORANGE, border: "none", borderRadius: 999, padding: "0.875rem", color: BG, fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", fontFamily: "inherit" }}
          >
            Enter →
          </button>
        </div>
      </div>
    );
  }

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    revenue: bookings.filter((b) => b.status !== "cancelled").reduce((s, b) => s + (b.price || 0), 0),
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG, color: TEXT, fontFamily: "inherit" }}>
      {/* Header */}
      <div style={{ backgroundColor: CARD, borderBottom: `1px solid ${BORDER}`, padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ color: ORANGE, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em" }}>HOP BAHAMAS</p>
          <h1 style={{ color: TEXT, fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.02em" }}>Operator Dashboard</h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button onClick={fetchBookings} style={{ padding: "0.5rem 1rem", backgroundColor: CARD2, border: `1px solid ${BORDER}`, borderRadius: 999, color: MUTED, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit" }}>
            {loading ? "Refreshing…" : "↻ Refresh"}
          </button>
          <button onClick={() => setAuthed(false)} style={{ padding: "0.5rem 1rem", backgroundColor: "transparent", border: `1px solid ${BORDER}`, borderRadius: 999, color: MUTED, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit" }}>
            Sign out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total Bookings", value: stats.total, color: TEXT },
            { label: "Pending", value: stats.pending, color: ORANGE },
            { label: "Confirmed", value: stats.confirmed, color: GREEN },
            { label: "Total Revenue", value: `$${stats.revenue}`, color: OCEAN },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: "1.25rem 1.5rem" }}>
              <p style={{ color: MUTED, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "0.4rem" }}>{s.label.toUpperCase()}</p>
              <p style={{ color: s.color, fontWeight: 900, fontSize: "2rem", letterSpacing: "-0.04em" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          {["all", "pending", "confirmed", "completed", "cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: 999,
                border: `1px solid ${filter === f ? ORANGE : BORDER}`,
                backgroundColor: filter === f ? "rgba(245,160,32,0.12)" : "transparent",
                color: filter === f ? ORANGE : MUTED,
                fontSize: "0.8rem",
                fontWeight: filter === f ? 700 : 400,
                cursor: "pointer",
                fontFamily: "inherit",
                textTransform: "capitalize",
              }}
            >
              {f === "all" ? `All (${bookings.length})` : `${f} (${bookings.filter((b) => b.status === f).length})`}
            </button>
          ))}
        </div>

        {/* Bookings table */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem", color: MUTED }}>
            {loading ? "Loading bookings…" : "No bookings yet."}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {filtered.map((b) => (
              <div
                key={b.id}
                style={{ backgroundColor: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: "1.25rem 1.5rem", display: "grid", gap: "1rem", alignItems: "start" }}
                className="grid grid-cols-1 md:grid-cols-4"
              >
                {/* Col 1: ID + route */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                    <span style={{ backgroundColor: "rgba(245,160,32,0.12)", border: "1px solid rgba(245,160,32,0.2)", borderRadius: 999, padding: "0.15rem 0.6rem", color: ORANGE, fontSize: "0.72rem", fontWeight: 800 }}>{b.id}</span>
                    <span style={{ backgroundColor: `${STATUS_COLORS[b.status] || MUTED}18`, border: `1px solid ${STATUS_COLORS[b.status] || MUTED}40`, borderRadius: 999, padding: "0.15rem 0.6rem", color: STATUS_COLORS[b.status] || MUTED, fontSize: "0.68rem", fontWeight: 700, textTransform: "capitalize" }}>{b.status}</span>
                  </div>
                  <p style={{ color: TEXT, fontWeight: 700, fontSize: "0.85rem", lineHeight: 1.4 }}>{b.pickup}</p>
                  <p style={{ color: MUTED, fontSize: "0.75rem" }}>→ {b.dropoff}</p>
                  <p style={{ color: MUTED, fontSize: "0.72rem", marginTop: "0.25rem" }}>
                    {b.date ? formatDate(b.date + "T00:00") : "No date"}{b.time ? ` at ${formatTime12(b.time)}` : ""}
                  </p>
                </div>

                {/* Col 2: Passenger */}
                <div>
                  <p style={{ color: TEXT, fontWeight: 700, fontSize: "0.9rem" }}>{b.name}</p>
                  <p style={{ color: OCEAN, fontSize: "0.78rem" }}>{b.email}</p>
                  <p style={{ color: MUTED, fontSize: "0.78rem" }}>{b.phone}</p>
                </div>

                {/* Col 3: Fare */}
                <div>
                  <p style={{ color: ORANGE, fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.02em" }}>${b.price}</p>
                  <p style={{ color: MUTED, fontSize: "0.75rem" }}>
                    {b.tier === "eco" ? "ECO · Sedan" : b.tier === "luxury" ? `Luxury · ${b.luxVehicle ?? "Sedan"}` : "Standard · Premium"}
                    {b.pax ? ` · ${b.pax} pax` : ""}
                    {b.bags ? ` · ${b.bags} bag${b.bags > 1 ? "s" : ""}` : ""}
                  </p>
                  <p style={{ color: MUTED, fontSize: "0.68rem", marginTop: "0.25rem" }}>Booked {formatDate(b.createdAt)}</p>
                </div>

                {/* Col 4: Actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <button
                    onClick={() => sendEmail(b)}
                    style={{ padding: "0.5rem 1rem", backgroundColor: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)", borderRadius: 999, color: OCEAN, fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", textAlign: "center" }}
                  >
                    ✉ Send App Link
                  </button>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {b.status === "pending" && (
                      <button onClick={() => updateStatus(b.id, "confirmed")} style={{ flex: 1, padding: "0.4rem", backgroundColor: "rgba(58,173,110,0.12)", border: "1px solid rgba(58,173,110,0.25)", borderRadius: 999, color: GREEN, fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                        Confirm
                      </button>
                    )}
                    {b.status === "confirmed" && (
                      <button onClick={() => updateStatus(b.id, "completed")} style={{ flex: 1, padding: "0.4rem", backgroundColor: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)", borderRadius: 999, color: OCEAN, fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                        Complete
                      </button>
                    )}
                    {b.status !== "cancelled" && (
                      <button onClick={() => updateStatus(b.id, "cancelled")} style={{ flex: 1, padding: "0.4rem", backgroundColor: "rgba(232,64,64,0.08)", border: "1px solid rgba(232,64,64,0.2)", borderRadius: 999, color: RED, fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
