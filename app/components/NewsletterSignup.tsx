"use client";

import { useState } from "react";

const ORANGE = "#F5A020";
const BG = "#161616";
const CARD = "#1e1c14";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const BORDER = "rgba(255,255,255,0.06)";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section style={{ backgroundColor: CARD, borderTop: `1px solid ${BORDER}`, padding: "3rem 1.5rem" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: ORANGE, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Stay in the loop
        </p>
        <h2 style={{ color: TEXT, fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem", lineHeight: 1.2 }}>
          HOP updates, Nassau travel tips, and exclusive offers.
        </h2>
        <p style={{ color: MUTED, fontSize: "0.875rem", marginBottom: "1.5rem" }}>
          No spam. Unsubscribe anytime.
        </p>

        {status === "done" ? (
          <div style={{ padding: "1rem 1.5rem", backgroundColor: "rgba(58,173,110,0.08)", border: "1px solid rgba(58,173,110,0.2)", borderRadius: 12 }}>
            <p style={{ color: "#3aad6e", fontWeight: 700, fontSize: "0.9rem" }}>You&apos;re in. Check your inbox.</p>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: "1 1 220px",
                padding: "0.75rem 1rem",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: `1px solid ${BORDER}`,
                borderRadius: 999,
                color: TEXT,
                fontSize: "0.9rem",
                fontFamily: "inherit",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: status === "loading" ? "rgba(245,160,32,0.4)" : ORANGE,
                border: "none",
                borderRadius: 999,
                color: BG,
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              {status === "loading" ? "…" : "Get updates →"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p style={{ color: "#E84040", fontSize: "0.8rem", marginTop: "0.5rem" }}>Something went wrong. Try again.</p>
        )}
      </div>
    </section>
  );
}
