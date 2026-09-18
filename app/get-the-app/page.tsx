import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_HREF,
  WHATSAPP_URL,
} from "../../lib/app-links";

export const metadata: Metadata = {
  title: "Get the HOP App — Rides in Nassau, Bahamas",
  description:
    "Download HOP to book airport pickups, scheduled trips, and rides around Nassau. Fixed fares, verified drivers, live GPS tracking.",
};

const ORANGE = "#F5A020";
const BG = "#161616";
const CARD = "#1e1c14";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const BORDER = "rgba(255,255,255,0.06)";

const storeBtn: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  backgroundColor: CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: 14,
  padding: "0.85rem 1.35rem",
  textDecoration: "none",
  minWidth: 200,
};

const steps = [
  "Download HOP and sign up with your phone number.",
  "Set your pickup and where you're going — the fare is fixed before you book.",
  "Track your verified driver on the map the whole way.",
];

export default function GetTheAppPage() {
  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh", color: TEXT }}>
      <Navbar />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <p
          style={{
            color: ORANGE,
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          Book a ride
        </p>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: "0.75rem", lineHeight: 1.2 }}>
          Get the HOP app
        </h1>
        <p style={{ color: MUTED, fontSize: "1rem", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 560 }}>
          Booking now happens in the app — that&apos;s where your driver, your live map, and
          your trip history all live. Airport → Atlantis from $47, Cable Beach from $32,
          fixed before you book.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={storeBtn}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill={TEXT} style={{ flexShrink: 0 }}>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div>
              <p style={{ color: "rgba(240,237,232,0.55)", fontSize: "0.65rem", lineHeight: 1 }}>Download on the</p>
              <p style={{ fontSize: "1.05rem", fontWeight: 800, lineHeight: 1.25 }}>App Store</p>
            </div>
          </a>

          {GOOGLE_PLAY_URL ? (
            <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" style={storeBtn}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill={TEXT} style={{ flexShrink: 0 }}>
                <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l15 8.5c.6.35.6 1.25 0 1.6l-15 8.5c-.66.5-1.6.03-1.6-.8z" />
              </svg>
              <div>
                <p style={{ color: "rgba(240,237,232,0.55)", fontSize: "0.65rem", lineHeight: 1 }}>Get it on</p>
                <p style={{ fontSize: "1.05rem", fontWeight: 800, lineHeight: 1.25 }}>Google Play</p>
              </div>
            </a>
          ) : (
            <div style={{ ...storeBtn, opacity: 0.6 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill={MUTED} style={{ flexShrink: 0 }}>
                <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l15 8.5c.6.35.6 1.25 0 1.6l-15 8.5c-.66.5-1.6.03-1.6-.8z" />
              </svg>
              <div>
                <p style={{ color: "rgba(240,237,232,0.55)", fontSize: "0.65rem", lineHeight: 1 }}>Coming soon to</p>
                <p style={{ fontSize: "1.05rem", fontWeight: 800, lineHeight: 1.25, color: MUTED }}>Google Play</p>
              </div>
            </div>
          )}
        </div>

        {!GOOGLE_PLAY_URL && (
          <div
            style={{
              backgroundColor: CARD,
              border: `1px solid ${BORDER}`,
              borderRadius: 14,
              padding: "1.35rem 1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <p style={{ fontWeight: 700, marginBottom: "0.5rem" }}>On Android?</p>
            <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" }}>
              The Android app is on its way. Until it lands, message us and we&apos;ll book your
              ride for you — same fixed fares, same verified drivers.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: ORANGE,
                  color: "#161616",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  padding: "0.7rem 1.35rem",
                  borderRadius: 999,
                  textDecoration: "none",
                }}
              >
                Book on WhatsApp →
              </a>
              <a
                href={SUPPORT_PHONE_HREF}
                style={{
                  border: `1px solid ${BORDER}`,
                  color: TEXT,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  padding: "0.7rem 1.35rem",
                  borderRadius: 999,
                  textDecoration: "none",
                }}
              >
                Call {SUPPORT_PHONE}
              </a>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1rem" }}>How it works</h2>
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {steps.map((step, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: "0.9rem",
                alignItems: "flex-start",
                marginBottom: "0.9rem",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 26,
                  height: 26,
                  borderRadius: 999,
                  backgroundColor: "rgba(245,160,32,0.12)",
                  color: ORANGE,
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i + 1}
              </span>
              <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7 }}>{step}</p>
            </li>
          ))}
        </ol>
      </main>
      <Footer />
    </div>
  );
}
