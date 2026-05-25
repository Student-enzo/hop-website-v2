import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TrackedLink from "../../components/TrackedLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ride to Atlantis Paradise Island — HOP Bahamas Fixed Price",
  description:
    "Fixed-price HOP rides to Atlantis Paradise Island from Nassau Airport, downtown Nassau, or anywhere on the island. Book now or schedule ahead.",
};

const ORANGE = "#F5A020";
const BG = "#161616";
const CARD = "#1e1c14";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const BORDER = "rgba(255,255,255,0.06)";

const FARES = [
  { tier: "Economic", price: "$26+", time: "~12 min", note: "Best value for solo travel" },
  { tier: "Standard", price: "$32+", time: "~12 min", note: "Most popular route", featured: true },
  { tier: "Luxury Sedan", price: "$95", time: "~12 min", note: "Flat rate, up to 4 passengers" },
  { tier: "Luxury SUV", price: "$120", time: "~12 min", note: "Flat rate, up to 7 passengers" },
  { tier: "Mini Bus", price: "$190", time: "~15 min", note: "Flat rate, groups up to 15" },
];

const FAQS = [
  {
    q: "How much does it cost to get from Nassau Airport to Atlantis?",
    a: "With HOP, Standard rides to Atlantis start from $32. The exact fare is shown before you confirm — no negotiating at the curb.",
  },
  {
    q: "Is there Uber to Atlantis Paradise Island?",
    a: "Uber and Lyft are not available in the Bahamas. HOP is Nassau's app-based ride service with transparent pricing.",
  },
  {
    q: "Can I book a group transfer to Atlantis?",
    a: "Yes. Groups of 6+ automatically get group pricing. Book a Mini Bus for $190 flat to fit up to 15 passengers.",
  },
  {
    q: "Can I schedule a pickup from Atlantis?",
    a: "Absolutely. HOP works both ways. Schedule your return trip from the resort before you arrive.",
  },
];

export default function AtlantisPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "88px" }}>
        <section
          className="photo-hero"
          style={{
            backgroundImage: "url('/images/dest-atlantis.jpg')",
            padding: "5rem 1.5rem 4rem",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(22,22,22,0.75) 0%, rgba(22,22,22,0.92) 70%, #161616 100%)" }} />
          <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <Link href="/" className="footer-link" style={{ fontSize: "0.875rem" }}>Home</Link>
              <span style={{ color: MUTED, fontSize: "0.875rem" }}>/</span>
              <Link href="/routes" className="footer-link" style={{ fontSize: "0.875rem" }}>Destinations</Link>
              <span style={{ color: MUTED, fontSize: "0.875rem" }}>/</span>
              <span style={{ color: ORANGE, fontSize: "0.875rem", fontWeight: 600 }}>Atlantis</span>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.35rem 0.85rem", backgroundColor: "rgba(58,173,110,0.15)", border: "1px solid rgba(58,173,110,0.3)", borderRadius: "999px", marginBottom: "1rem" }}>
              <span style={{ color: "#3aad6e", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em" }}>RESORT — PARADISE ISLAND</span>
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, color: TEXT, letterSpacing: "-0.03em", marginBottom: "0.75rem", lineHeight: 1.05 }}>
              Ride to Atlantis Paradise Island — Fixed Price, No Surprises.
            </h1>
            <p style={{ color: "rgba(138,128,112,0.9)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 540, marginBottom: "2rem" }}>
              The most requested route in Nassau. From the airport, downtown, or anywhere on the island — HOP gets you to Atlantis with a fare you agreed to before you moved.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <TrackedLink href="https://app.hopbahamas.com" target="_blank" rel="noopener noreferrer" className="btn-primary" eventLabel="book_ride" eventLocation="routes_atlantis_hero" style={{ padding: "0.875rem 1.75rem", fontSize: "0.95rem" }}>
                Book Ride to Atlantis
              </TrackedLink>
              <Link href="/#download" className="btn-secondary" style={{ padding: "0.875rem 1.75rem", fontSize: "0.95rem", display: "inline-flex", alignItems: "center" }}>
                Download the App
              </Link>
            </div>
          </div>
          <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="pexels-credit">Photo via Pexels</a>
        </section>

        <section style={{ backgroundColor: CARD, padding: "1.5rem", borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { label: "From", value: "Nassau Airport (LPIA) / Downtown Nassau" },
              { label: "To", value: "Atlantis Resort, Paradise Island" },
              { label: "Distance", value: "~13 km" },
              { label: "Typical time", value: "10–15 min" },
            ].map((r) => (
              <div key={r.label}>
                <p style={{ color: MUTED, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.07em" }}>{r.label.toUpperCase()}</p>
                <p style={{ color: TEXT, fontWeight: 600, fontSize: "0.9rem", marginTop: "0.2rem" }}>{r.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ backgroundColor: BG, padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>Choose your ride</h2>
            <p style={{ color: MUTED, fontSize: "0.95rem", marginBottom: "2rem" }}>All fares shown before you confirm. No surge pricing.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
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

        <section style={{ backgroundColor: CARD, padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gap: "3rem", alignItems: "center" }} className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>Why HOP for Atlantis?</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { title: "Price confirmed before pickup", desc: "No taxi-meter anxiety. Know your fare the moment you confirm the booking." },
                  { title: "Airport-to-resort scheduling", desc: "Book from home before you fly. Driver tracks your arrival." },
                  { title: "Group-ready", desc: "Groups of 6+ get automatic group pricing. Mini Bus fits 15." },
                  { title: "Both directions", desc: "HOP picks you up from Atlantis too — schedule your return before you arrive." },
                ].map((item) => (
                  <li key={item.title} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3aad6e" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 1 }}><path d="M20 6L9 17l-5-5" /></svg>
                    <div>
                      <p style={{ color: TEXT, fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.2rem" }}>{item.title}</p>
                      <p style={{ color: MUTED, fontSize: "0.82rem", lineHeight: 1.55 }}>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${BORDER}`, position: "relative", minHeight: 320 }}>
              <Image src="/screenshots/hero-ride.png" alt="HOP booking confirmation — ride to Atlantis" fill style={{ objectFit: "cover", objectPosition: "top" }} />
            </div>
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
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
              Ready to book your Atlantis transfer?
            </h2>
            <p style={{ color: MUTED, fontSize: "0.95rem", marginBottom: "2rem" }}>Fixed price. No flagging. Book now or schedule ahead.</p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
              <TrackedLink href="https://app.hopbahamas.com" target="_blank" rel="noopener noreferrer" className="btn-primary" eventLabel="book_ride" eventLocation="routes_atlantis_bottom" style={{ padding: "0.875rem 2rem", fontSize: "0.95rem" }}>
                Book via Web App
              </TrackedLink>
              <Link href="/#download" className="btn-secondary" style={{ padding: "0.875rem 2rem", fontSize: "0.95rem", display: "inline-flex", alignItems: "center" }}>
                Download the App
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
