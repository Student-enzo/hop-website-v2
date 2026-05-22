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
const PURPLE = "#A855F7";
const BORDER = "rgba(255,255,255,0.06)";

const STATUS_COLORS: Record<string, string> = {
  pending: "#F5A020", confirmed: "#3aad6e", completed: "#0EA5E9", cancelled: "#E84040",
};

type Booking = {
  id: string; name: string; email: string; phone: string;
  pickup: string; dropoff: string; date: string; time: string;
  tier: string; lux_vehicle?: string; price: number;
  pax?: number; bags?: number; status: string; created_at: string;
  profile_photo_url?: string;
};

type Subscriber = {
  id: string; email: string; name?: string;
  source: string; subscribed_at: string;
};

type Lead = {
  email: string; name?: string; source: string;
  subscribedAt?: string; bookingCount: number;
  totalSpend: number; lastActivity: string; stage: string;
  latestBooking?: Booking;
};

function fmtDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function fmtTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}
function exportCSV(rows: Record<string, unknown>[], filename: string) {
  const keys = Object.keys(rows[0] || {});
  const csv = [keys.join(","), ...rows.map((r) => keys.map((k) => `"${String(r[k] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = filename;
  a.click();
}

function StatCard({ label, value, color, sub }: { label: string; value: string | number; color: string; sub?: string }) {
  return (
    <div style={{ backgroundColor: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: "1.25rem 1.5rem" }}>
      <p style={{ color: MUTED, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.35rem" }}>{label.toUpperCase()}</p>
      <p style={{ color, fontWeight: 900, fontSize: "1.9rem", letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ color: MUTED, fontSize: "0.72rem", marginTop: "0.3rem" }}>{sub}</p>}
    </div>
  );
}

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"bookings" | "email" | "crm">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [welcomeModal, setWelcomeModal] = useState<Booking | null>(null);
  const [welcomePass, setWelcomePass] = useState("");
  const [welcomeSending, setWelcomeSending] = useState(false);
  const [welcomeSent, setWelcomeSent] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    try {
      const [bRes, sRes] = await Promise.all([
        fetch(`/api/book?secret=${SECRET}`),
        fetch(`/api/subscribers?secret=${SECRET}`),
      ]);
      const bData = await bRes.json();
      const sData = await sRes.json();
      if (!bRes.ok) {
        setApiError(`Bookings API error (${bRes.status}): ${bData?.error ?? JSON.stringify(bData)}`);
      } else {
        setBookings(Array.isArray(bData) ? bData : []);
      }
      if (sRes.ok) setSubscribers(Array.isArray(sData) ? sData : []);
    } catch (e) {
      setApiError(e instanceof Error ? e.message : String(e));
    }
    setLoading(false);
  }, []);

  useEffect(() => { if (authed) fetchAll(); }, [authed, fetchAll]);

  const sendWelcome = async () => {
    if (!welcomeModal || !welcomePass.trim()) return;
    setWelcomeSending(true);
    const res = await fetch(`/api/welcome?secret=${SECRET}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: welcomeModal.email, name: welcomeModal.name, appEmail: welcomeModal.email, appPassword: welcomePass }),
    });
    setWelcomeSending(false);
    if (res.ok) {
      setWelcomeSent(welcomeModal.email);
      setWelcomeModal(null);
      setWelcomePass("");
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/book?secret=${SECRET}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  // Build CRM leads by merging subscribers + bookings
  const leads = useCallback((): Lead[] => {
    const map = new Map<string, Lead>();
    subscribers.forEach((s) => {
      map.set(s.email, {
        email: s.email, name: s.name, source: s.source,
        subscribedAt: s.subscribed_at, bookingCount: 0,
        totalSpend: 0, lastActivity: s.subscribed_at, stage: "subscriber",
      });
    });
    bookings.forEach((b) => {
      const existing = map.get(b.email);
      const spend = b.status !== "cancelled" ? (b.price || 0) : 0;
      if (existing) {
        existing.bookingCount += 1;
        existing.totalSpend += spend;
        if (b.created_at > existing.lastActivity) {
          existing.lastActivity = b.created_at;
          existing.latestBooking = b;
        }
        existing.stage = existing.bookingCount >= 2 ? "repeat" : "booked";
        if (!existing.name && b.name) existing.name = b.name;
      } else {
        map.set(b.email, {
          email: b.email, name: b.name, source: "booking",
          bookingCount: 1, totalSpend: spend,
          lastActivity: b.created_at, stage: "booked", latestBooking: b,
        });
      }
    });
    return Array.from(map.values()).sort((a, b) => b.lastActivity.localeCompare(a.lastActivity));
  }, [subscribers, bookings]);

  const STAGE_COLOR: Record<string, string> = {
    subscriber: MUTED, booked: GREEN, repeat: OCEAN,
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: BG, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
        <div style={{ backgroundColor: CARD, borderRadius: 20, border: `1px solid ${BORDER}`, padding: "2.5rem", width: "100%", maxWidth: 380 }}>
          <p style={{ color: ORANGE, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.4rem" }}>HOP BAHAMAS</p>
          <h1 style={{ color: TEXT, fontWeight: 800, fontSize: "1.5rem", marginBottom: "0.4rem" }}>Operator Dashboard</h1>
          <p style={{ color: MUTED, fontSize: "0.85rem", marginBottom: "1.5rem" }}>Enter your access key to continue.</p>
          <input
            type="password" placeholder="Access key" value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && password === SECRET && setAuthed(true)}
            style={{ width: "100%", backgroundColor: CARD2, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "0.875rem 1rem", color: TEXT, fontSize: "0.95rem", fontFamily: "inherit", outline: "none", marginBottom: "0.75rem", boxSizing: "border-box" }}
          />
          <button
            onClick={() => password === SECRET ? setAuthed(true) : alert("Wrong key")}
            style={{ width: "100%", backgroundColor: ORANGE, border: "none", borderRadius: 999, padding: "0.875rem", color: BG, fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", fontFamily: "inherit" }}
          >Enter →</button>
        </div>
      </div>
    );
  }

  const crmLeads = leads();
  const bStats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    revenue: bookings.filter((b) => b.status !== "cancelled").reduce((s, b) => s + (b.price || 0), 0),
  };
  const filtered = (filter === "all" ? bookings : bookings.filter((b) => b.status === filter))
    .filter((b) => !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.email.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
    <div style={{ minHeight: "100vh", backgroundColor: BG, color: TEXT }}>
      {/* Header */}
      <div style={{ backgroundColor: CARD, borderBottom: `1px solid ${BORDER}`, padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div>
            <p style={{ color: ORANGE, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em" }}>HOP BAHAMAS</p>
            <p style={{ color: TEXT, fontWeight: 800, fontSize: "1.1rem" }}>Operator Dashboard</p>
          </div>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            {(["bookings", "email", "crm"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "0.45rem 1rem", borderRadius: 999, border: "none",
                backgroundColor: tab === t ? "rgba(245,160,32,0.15)" : "transparent",
                color: tab === t ? ORANGE : MUTED,
                fontWeight: tab === t ? 700 : 400, fontSize: "0.85rem",
                cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize",
              }}>
                {t === "bookings" ? `Bookings (${bStats.total})` : t === "email" ? `Email (${subscribers.length})` : `CRM (${crmLeads.length})`}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={fetchAll} style={{ padding: "0.4rem 0.9rem", backgroundColor: CARD2, border: `1px solid ${BORDER}`, borderRadius: 999, color: MUTED, fontSize: "0.78rem", cursor: "pointer", fontFamily: "inherit" }}>
            {loading ? "…" : "↻ Refresh"}
          </button>
          <button onClick={() => setAuthed(false)} style={{ padding: "0.4rem 0.9rem", backgroundColor: "transparent", border: `1px solid ${BORDER}`, borderRadius: 999, color: MUTED, fontSize: "0.78rem", cursor: "pointer", fontFamily: "inherit" }}>
            Sign out
          </button>
        </div>
      </div>

      {apiError && (
        <div style={{ background: "rgba(232,64,64,0.12)", border: "1px solid rgba(232,64,64,0.3)", borderRadius: 12, margin: "1rem 2rem", padding: "0.875rem 1.25rem" }}>
          <p style={{ color: RED, fontWeight: 700, fontSize: "0.82rem", marginBottom: "0.25rem" }}>API Error — data could not load</p>
          <p style={{ color: "#f0ede8", fontSize: "0.78rem", fontFamily: "monospace", wordBreak: "break-all" }}>{apiError}</p>
        </div>
      )}

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* ── BOOKINGS TAB ── */}
        {tab === "bookings" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
              <StatCard label="Total Bookings" value={bStats.total} color={TEXT} />
              <StatCard label="Pending" value={bStats.pending} color={ORANGE} sub="need confirmation" />
              <StatCard label="Confirmed" value={bStats.confirmed} color={GREEN} />
              <StatCard label="Total Revenue" value={`$${bStats.revenue}`} color={OCEAN} sub="excl. cancelled" />
            </div>

            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <input
                placeholder="Search name, email, ID…" value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: "1 1 220px", backgroundColor: CARD2, border: `1px solid ${BORDER}`, borderRadius: 999, padding: "0.45rem 1rem", color: TEXT, fontSize: "0.82rem", fontFamily: "inherit", outline: "none" }}
              />
              {["all", "pending", "confirmed", "completed", "cancelled"].map((f) => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: "0.4rem 0.9rem", borderRadius: 999,
                  border: `1px solid ${filter === f ? ORANGE : BORDER}`,
                  backgroundColor: filter === f ? "rgba(245,160,32,0.1)" : "transparent",
                  color: filter === f ? ORANGE : MUTED,
                  fontWeight: filter === f ? 700 : 400, fontSize: "0.78rem",
                  cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize",
                }}>{f === "all" ? `All (${bookings.length})` : `${f} (${bookings.filter((b) => b.status === f).length})`}</button>
              ))}
              <button onClick={() => exportCSV(bookings.map((b) => ({ id: b.id, name: b.name, email: b.email, phone: b.phone, route: `${b.pickup} → ${b.dropoff}`, date: b.date, time: b.time, tier: b.tier, price: b.price, pax: b.pax, status: b.status, booked: b.created_at })), "hop-bookings.csv")}
                style={{ padding: "0.4rem 0.9rem", backgroundColor: "transparent", border: `1px solid ${BORDER}`, borderRadius: 999, color: MUTED, fontSize: "0.78rem", cursor: "pointer", fontFamily: "inherit" }}>
                ↓ Export CSV
              </button>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", color: MUTED }}>{loading ? "Loading…" : "No bookings found."}</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {filtered.map((b) => (
                  <div key={b.id} style={{ backgroundColor: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: "1.25rem 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "1rem", alignItems: "center" }}>
                    <div>
                      <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                        <span style={{ background: "rgba(245,160,32,0.12)", border: "1px solid rgba(245,160,32,0.2)", borderRadius: 999, padding: "0.1rem 0.55rem", color: ORANGE, fontSize: "0.68rem", fontWeight: 800 }}>{b.id}</span>
                        <span style={{ background: `${STATUS_COLORS[b.status] || MUTED}18`, border: `1px solid ${STATUS_COLORS[b.status] || MUTED}35`, borderRadius: 999, padding: "0.1rem 0.55rem", color: STATUS_COLORS[b.status] || MUTED, fontSize: "0.65rem", fontWeight: 700, textTransform: "capitalize" }}>{b.status}</span>
                      </div>
                      <p style={{ color: TEXT, fontWeight: 700, fontSize: "0.85rem" }}>{b.pickup}</p>
                      <p style={{ color: MUTED, fontSize: "0.75rem" }}>→ {b.dropoff}</p>
                      <p style={{ color: MUTED, fontSize: "0.7rem", marginTop: "0.2rem" }}>{fmtDate(b.date + "T00:00")} {b.time ? `at ${fmtTime(b.time)}` : ""}</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      {b.profile_photo_url ? (
                        <img src={b.profile_photo_url} alt={b.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: `2px solid ${ORANGE}40`, flexShrink: 0 }} />
                      ) : (
                        <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "rgba(245,160,32,0.08)", border: "1px solid rgba(245,160,32,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ color: MUTED, fontSize: "1rem" }}>👤</span>
                        </div>
                      )}
                      <div>
                        <p style={{ color: TEXT, fontWeight: 700 }}>{b.name}</p>
                        <p style={{ color: OCEAN, fontSize: "0.78rem" }}>{b.email}</p>
                        <p style={{ color: MUTED, fontSize: "0.78rem" }}>{b.phone}</p>
                      </div>
                    </div>
                    <div>
                      <p style={{ color: ORANGE, fontWeight: 900, fontSize: "1.3rem" }}>${b.price}</p>
                      <p style={{ color: MUTED, fontSize: "0.73rem" }}>{b.tier === "eco" ? "Economic" : b.tier === "luxury" ? `Luxury · ${b.lux_vehicle ?? "Sedan"}` : "Standard"} · {b.pax ?? 1} pax</p>
                      <p style={{ color: MUTED, fontSize: "0.68rem" }}>Booked {fmtDate(b.created_at)}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", minWidth: 120 }}>
                      {b.status === "pending" && <button onClick={() => updateStatus(b.id, "confirmed")} style={{ padding: "0.4rem 0.75rem", background: "rgba(58,173,110,0.12)", border: "1px solid rgba(58,173,110,0.25)", borderRadius: 999, color: GREEN, fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>✓ Confirm</button>}
                      {b.status === "confirmed" && <button onClick={() => updateStatus(b.id, "completed")} style={{ padding: "0.4rem 0.75rem", background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)", borderRadius: 999, color: OCEAN, fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>✓ Complete</button>}
                      {b.status !== "cancelled" && <button onClick={() => updateStatus(b.id, "cancelled")} style={{ padding: "0.4rem 0.75rem", background: "rgba(232,64,64,0.08)", border: "1px solid rgba(232,64,64,0.2)", borderRadius: 999, color: RED, fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>✕ Cancel</button>}
                      <button onClick={() => { setWelcomeModal(b); setWelcomePass(""); }} style={{ padding: "0.4rem 0.75rem", background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 999, color: PURPLE, fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                        {welcomeSent === b.email ? "✓ Sent" : "✉ Welcome"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── EMAIL MARKETING TAB ── */}
        {tab === "email" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
              <StatCard label="Total Subscribers" value={subscribers.length} color={TEXT} />
              <StatCard label="Newsletter" value={subscribers.filter((s) => s.source === "newsletter").length} color={ORANGE} sub="direct signups" />
              <StatCard label="From Booking" value={subscribers.filter((s) => s.source === "booking").length} color={GREEN} sub="auto-enrolled" />
              <StatCard label="Converted" value={crmLeads.filter((l) => l.bookingCount > 0).length} color={OCEAN} sub="subscriber → booked" />
            </div>

            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", alignItems: "center", flexWrap: "wrap" }}>
              <p style={{ color: MUTED, fontSize: "0.82rem", flex: 1 }}>{subscribers.length} subscribers total</p>
              <button onClick={() => exportCSV(subscribers.map((s) => ({ email: s.email, name: s.name ?? "", source: s.source, date: s.subscribed_at })), "hop-subscribers.csv")}
                style={{ padding: "0.4rem 0.9rem", border: `1px solid ${BORDER}`, borderRadius: 999, color: MUTED, fontSize: "0.78rem", cursor: "pointer", fontFamily: "inherit", background: "transparent" }}>
                ↓ Export CSV
              </button>
            </div>

            <div style={{ backgroundColor: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "0.75rem 1.25rem", borderBottom: `1px solid ${BORDER}` }}>
                {["Email", "Name", "Source", "Subscribed"].map((h) => (
                  <p key={h} style={{ color: MUTED, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em" }}>{h.toUpperCase()}</p>
                ))}
              </div>
              {subscribers.length === 0 ? (
                <p style={{ color: MUTED, padding: "2rem", textAlign: "center" }}>{loading ? "Loading…" : "No subscribers yet."}</p>
              ) : subscribers.map((s, i) => (
                <div key={s.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "0.875rem 1.25rem", borderBottom: i < subscribers.length - 1 ? `1px solid ${BORDER}` : "none", alignItems: "center" }}>
                  <p style={{ color: OCEAN, fontSize: "0.83rem" }}>{s.email}</p>
                  <p style={{ color: TEXT, fontSize: "0.83rem" }}>{s.name || "—"}</p>
                  <span style={{
                    display: "inline-block", padding: "0.15rem 0.6rem", borderRadius: 999,
                    background: s.source === "newsletter" ? "rgba(245,160,32,0.1)" : "rgba(58,173,110,0.1)",
                    border: `1px solid ${s.source === "newsletter" ? "rgba(245,160,32,0.25)" : "rgba(58,173,110,0.25)"}`,
                    color: s.source === "newsletter" ? ORANGE : GREEN,
                    fontSize: "0.65rem", fontWeight: 700, textTransform: "capitalize" as const,
                  }}>{s.source}</span>
                  <p style={{ color: MUTED, fontSize: "0.78rem" }}>{fmtDate(s.subscribed_at)}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── CRM TAB ── */}
        {tab === "crm" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
              <StatCard label="Total Leads" value={crmLeads.length} color={TEXT} />
              <StatCard label="Subscribers" value={crmLeads.filter((l) => l.stage === "subscriber").length} color={MUTED} sub="not yet booked" />
              <StatCard label="Booked" value={crmLeads.filter((l) => l.stage === "booked").length} color={GREEN} sub="1 booking" />
              <StatCard label="Repeat" value={crmLeads.filter((l) => l.stage === "repeat").length} color={OCEAN} sub="2+ bookings" />
            </div>

            <div style={{ marginBottom: "1rem", display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
              <p style={{ color: MUTED, fontSize: "0.82rem", flex: 1 }}>All contacts — subscribers + bookers merged by email</p>
              <button onClick={() => exportCSV(crmLeads.map((l) => ({ email: l.email, name: l.name ?? "", stage: l.stage, source: l.source, bookings: l.bookingCount, spend: l.totalSpend, lastActivity: l.lastActivity })), "hop-crm.csv")}
                style={{ padding: "0.4rem 0.9rem", border: `1px solid ${BORDER}`, borderRadius: 999, color: MUTED, fontSize: "0.78rem", cursor: "pointer", fontFamily: "inherit", background: "transparent" }}>
                ↓ Export CRM CSV
              </button>
            </div>

            <div style={{ backgroundColor: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "0.75rem 1.25rem", borderBottom: `1px solid ${BORDER}` }}>
                {["Contact", "Stage", "Bookings", "Total Spend", "Last Activity"].map((h) => (
                  <p key={h} style={{ color: MUTED, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em" }}>{h.toUpperCase()}</p>
                ))}
              </div>
              {crmLeads.length === 0 ? (
                <p style={{ color: MUTED, padding: "2rem", textAlign: "center" }}>{loading ? "Loading…" : "No leads yet."}</p>
              ) : crmLeads.map((l, i) => (
                <div key={l.email} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "0.875rem 1.25rem", borderBottom: i < crmLeads.length - 1 ? `1px solid ${BORDER}` : "none", alignItems: "center" }}>
                  <div>
                    <p style={{ color: TEXT, fontWeight: 600, fontSize: "0.85rem" }}>{l.name || "—"}</p>
                    <p style={{ color: OCEAN, fontSize: "0.75rem" }}>{l.email}</p>
                    {l.latestBooking && <p style={{ color: MUTED, fontSize: "0.68rem" }}>{l.latestBooking.pickup} → {l.latestBooking.dropoff}</p>}
                  </div>
                  <span style={{
                    display: "inline-block", padding: "0.15rem 0.65rem", borderRadius: 999,
                    background: `${STAGE_COLOR[l.stage] || MUTED}18`,
                    border: `1px solid ${STAGE_COLOR[l.stage] || MUTED}35`,
                    color: STAGE_COLOR[l.stage] || MUTED,
                    fontSize: "0.65rem", fontWeight: 700, textTransform: "capitalize" as const, width: "fit-content",
                  }}>{l.stage}</span>
                  <p style={{ color: l.bookingCount > 0 ? TEXT : MUTED, fontWeight: l.bookingCount > 0 ? 700 : 400, fontSize: "0.85rem" }}>
                    {l.bookingCount > 0 ? `${l.bookingCount} ride${l.bookingCount > 1 ? "s" : ""}` : "—"}
                  </p>
                  <p style={{ color: l.totalSpend > 0 ? ORANGE : MUTED, fontWeight: 700, fontSize: "0.85rem" }}>
                    {l.totalSpend > 0 ? `$${l.totalSpend}` : "—"}
                  </p>
                  <p style={{ color: MUTED, fontSize: "0.78rem" }}>{fmtDate(l.lastActivity)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
    {/* Welcome modal */}
    {welcomeModal && (
      <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }}
        onClick={(e) => e.target === e.currentTarget && setWelcomeModal(null)}>
        <div style={{ backgroundColor: "#1e1c14", border: `1px solid ${BORDER}`, borderRadius: 20, padding: "2rem", width: "100%", maxWidth: 420 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            {welcomeModal.profile_photo_url ? (
              <img src={welcomeModal.profile_photo_url} alt={welcomeModal.name} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: `2px solid ${ORANGE}50` }} />
            ) : (
              <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: "rgba(245,160,32,0.1)", border: `1px solid ${ORANGE}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>👤</div>
            )}
            <div>
              <p style={{ color: TEXT, fontWeight: 700, fontSize: "1rem" }}>{welcomeModal.name}</p>
              <p style={{ color: OCEAN, fontSize: "0.8rem" }}>{welcomeModal.email}</p>
            </div>
          </div>

          <p style={{ color: MUTED, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.4rem" }}>APP PASSWORD</p>
          <input
            type="text" placeholder="Enter temp password (e.g. HOP@2026)"
            value={welcomePass} onChange={(e) => setWelcomePass(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendWelcome()}
            style={{ width: "100%", backgroundColor: "#222018", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "0.875rem 1rem", color: TEXT, fontSize: "0.95rem", fontFamily: "monospace", outline: "none", marginBottom: "1.25rem", boxSizing: "border-box" as const }}
          />
          <p style={{ color: MUTED, fontSize: "0.72rem", marginBottom: "1.25rem", lineHeight: 1.5 }}>
            This sends a branded email to <span style={{ color: TEXT }}>{welcomeModal.email}</span> with the app download links (App Store + Google Play) and the credentials above.
          </p>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => setWelcomeModal(null)} style={{ flex: 1, padding: "0.75rem", backgroundColor: "transparent", border: `1px solid ${BORDER}`, borderRadius: 999, color: MUTED, fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
            <button onClick={sendWelcome} disabled={welcomeSending || !welcomePass.trim()} style={{ flex: 2, padding: "0.75rem", backgroundColor: welcomePass.trim() ? PURPLE : "rgba(168,85,247,0.25)", border: "none", borderRadius: 999, color: "#fff", fontWeight: 800, fontSize: "0.9rem", cursor: welcomePass.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
              {welcomeSending ? "Sending…" : "✉ Send Welcome Email"}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
