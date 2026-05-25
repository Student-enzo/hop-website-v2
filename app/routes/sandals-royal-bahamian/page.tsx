import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TrackedLink from "../../components/TrackedLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ride to Sandals Royal Bahamian — HOP Bahamas",
  description:
    "Luxury and fixed-price rides to Sandals Royal Bahamian in Nassau. From the airport or downtown — fare confirmed before you move. Book via HOP.",
};

const ORANGE = "#F5A020";
const BG = "#161616";
const CARD = "#1e1c14";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const BORDER = "rgba(255,255,255,0.06)";
const GOLD = "#d4a855";

const FARES = [
  { tier: "Standard", price: "$36+", time: "~12 min", note: "Reliable and comfortable", featured: true },
  { tier: "Luxury Sedan", price: "$95", time: "~12 min", note: "Flat rate, 4 passengers" },
  { tier: "Luxury SUV", price: "$120", time: "~12 min", note: "Flat rate, 7 passengers" },
];

const FAQS = [
  { q: "Is Uber available to Sandals Royal Bahamian?", a: "Uber and Lyft don't operate in the Bahamas. HOP is Nassau's app-based ride option — transparent pricing, no negotiating." },
  { q: "Can I book a luxury car to Sandals?", a: "Yes. HOP Luxury Sedan ($95) and SUV ($120) are flat-rate rides. Perfect for an arrival that matches the resort experience." },
  { q: "Can I schedule pickup from Sandals?", a: "Absolutely. Schedule your return trip before you check in. HOP works both ways — from and to the resort." },
];

export default function SandalsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "88px" }}>
        <section className="photo-hero" style={{ backgroundImage: "url('/images/dest-luxury.jpg')", padding: "5rem 1.5rem 4rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(22,22,22,0.8) 0%, rgba(22,22,22,0.92) 70%, #161616 100%)" }} />
          <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <Link href="/" className="footer-link" style={{ fontSize: "0.875rem" }}>Home</Link>
              <span style={{ color: MUTED }}>/</span>
              <Link href="/routes" className="footer-link" style={{ fontSize: "0.875rem" }}>Destinations</Link>
              <span style={{ color: MUTED }}>/</span>
              <span style={{ color: ORANGE, fontSize: "0.875rem", fontWeight: 600 }}>Sandals Royal Bahamian</span>
            </div>
            <div style={{ display: "inline-flex", padding: "0.35rem 0.85rem", backgroundColor: "rgba(212,168,85,0.15)", border: "1px solid rgba(212,168,85,0.3)", borderRadius: "999px", marginBottom: "1rem" }}>
              <span style={{ color: GOLD, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em" }}>LUXURY RESORT — CABLE BEACH</span>
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, color: TEXT, letterSpacing: "-0.03em", marginBottom: "0.75rem", lineHeight: 1.05 }}>
              Ride to Sandals Royal Bahamian — Arrive in style.
            </h1>
            <p style={{ color: "rgba(138,128,112,0.9)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 540, marginBottom: "2rem" }}>
              HOP Luxury gets you to Sandals Royal Bahamian with a confirmed fare — no haggling, no meters. Arrive the right way.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <TrackedLink href="https://app.hopbahamas.com" target="_blank" rel="noopener noreferrer" className="btn-primary" eventLabel="book_ride" eventLocation="routes_sandals_hero" style={{ padding: "0.875rem 1.75rem", fontSize: "0.95rem" }}>Book Ride to Sandals</TrackedLink>
              <Link href="/#download" className="btn-secondary" style={{ padding: "0.875rem 1.75rem", fontSize: "0.95rem", display: "inline-flex", alignItems: "center" }}>Download the App</Link>
            </div>
          </div>
          <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="pexels-credit">Photo via Pexels</a>
        </section>

        <section style={{ backgroundColor: BG, padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>Choose your ride</h2>
            <p style={{ color: MUTED, fontSize: "0.95rem", marginBottom: "2rem" }}>Fixed price shown before you confirm.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
              {FARES.map((fare) => (
                <div key={fare.tier} style={{ backgroundColor: fare.featured ? "rgba(245,160,32,0.06)" : CARD, borderRadius: 16, border: fare.featured ? "1px solid rgba(245,160,32,0.3)" : `1px solid ${BORDER}`, padding: "1.25rem", position: "relative" }}>
                  {fare.featured && <div style={{ position: "absolute", top: -1, right: 16, backgroundColor: ORANGE, color: BG, fontSize: "0.65rem", fontWeight: 800, padding: "0.2rem 0.65rem", borderRadius: "0 0 8px 8px" }}>POPULAR</div>}
                  <p style={{ color: fare.featured ? ORANGE : TEXT, fontWeight: 700, fontSize: "1rem", marginBottom: "0.25rem" }}>{fare.tier}</p>
                  <p style={{ color: ORANGE, fontWeight: 900, fontSize: "1.5rem", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>{fare.price}</p>
                  <p style={{ color: MUTED, fontSize: "0.78rem", marginBottom: "0.5rem" }}>{fare.time}</p>
                  <p style={{ color: MUTED, fontSize: "0.75rem", fontStyle: "italic" }}>{fare.note}</p>
                </div>
              ))}
            </div>
            <p style={{ color: MUTED, fontSize: "0.78rem", marginTop: "1rem" }}>All prices in USD. 12% VAT included.</p>
          </div>
        </section>

        <section style={{ backgroundColor: BG, padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: "2rem" }}>Frequently asked questions</h2>
            {FAQS.map((faq) => (
              <div key={faq.q} className="faq-item">
                <h3 style={{ color: TEXT, fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.6rem" }}>{faq.q}</h3>
                <p style={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.65 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ backgroundColor: CARD, padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>Ready to arrive in style?</h2>
            <p style={{ color: MUTED, fontSize: "0.95rem", marginBottom: "2rem" }}>Book your HOP Luxury transfer to Sandals Royal Bahamian.</p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
              <TrackedLink href="https://app.hopbahamas.com" target="_blank" rel="noopener noreferrer" className="btn-primary" eventLabel="book_ride" eventLocation="routes_sandals_bottom" style={{ padding: "0.875rem 2rem", fontSize: "0.95rem" }}>Book via Web App</TrackedLink>
              <Link href="/#download" className="btn-secondary" style={{ padding: "0.875rem 2rem", fontSize: "0.95rem", display: "inline-flex", alignItems: "center" }}>Download the App</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
