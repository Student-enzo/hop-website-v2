import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ride from Nassau Cruise Port — HOP Bahamas",
  description:
    "Your cruise ship just docked. HOP gets you from Prince George Wharf to the beach, Atlantis, or anywhere in Nassau — fixed price, no haggling.",
};

const ORANGE = "#F5A020";
const BG = "#161616";
const CARD = "#1e1c14";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const BORDER = "rgba(255,255,255,0.06)";

const FARES = [
  { tier: "Economic", price: "$24+", time: "~8 min", note: "Best value for short trips" },
  { tier: "Standard", price: "$30+", time: "~8 min", note: "Most popular", featured: true },
  { tier: "Luxury Sedan", price: "$95", time: "~8 min", note: "Flat rate anywhere in Nassau" },
  { tier: "Luxury SUV", price: "$120", time: "~8 min", note: "Flat rate, 7 passengers" },
  { tier: "Mini Bus", price: "$190", time: "~10 min", note: "Groups up to 15" },
];

const FAQS = [
  { q: "Is Uber available at Nassau Cruise Port?", a: "No. Uber and Lyft do not operate in the Bahamas. HOP is the reliable app-based alternative with transparent, fixed pricing." },
  { q: "Can I book before my ship docks?", a: "Yes. Schedule your HOP ride before you arrive so it's waiting when you exit the terminal." },
  { q: "Can HOP take a group of cruise passengers?", a: "Absolutely. Book a Mini Bus for up to 15 passengers at a $190 flat rate, or an SUV for up to 7 at $120." },
  { q: "How far is Atlantis from the Nassau Cruise Port?", a: "About 7 km — roughly 8–12 minutes by car. HOP shows the exact price before you book." },
];

export default function CruisePortPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "88px" }}>
        <section className="photo-hero" style={{ backgroundImage: "url('/images/dest-cruise.jpg')", padding: "5rem 1.5rem 4rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(22,22,22,0.75) 0%, rgba(22,22,22,0.92) 70%, #161616 100%)" }} />
          <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <Link href="/" className="footer-link" style={{ fontSize: "0.875rem" }}>Home</Link>
              <span style={{ color: MUTED, fontSize: "0.875rem" }}>/</span>
              <Link href="/routes" className="footer-link" style={{ fontSize: "0.875rem" }}>Destinations</Link>
              <span style={{ color: MUTED, fontSize: "0.875rem" }}>/</span>
              <span style={{ color: ORANGE, fontSize: "0.875rem", fontWeight: 600 }}>Cruise Port</span>
            </div>
            <div style={{ display: "inline-flex", padding: "0.35rem 0.85rem", backgroundColor: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)", borderRadius: "999px", marginBottom: "1rem" }}>
              <span style={{ color: "#0EA5E9", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em" }}>CRUISE — PRINCE GEORGE WHARF</span>
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, color: TEXT, letterSpacing: "-0.03em", marginBottom: "0.75rem", lineHeight: 1.05 }}>
              Your ship just docked. Now what?
            </h1>
            <p style={{ color: "rgba(138,128,112,0.9)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 540, marginBottom: "2rem" }}>
              HOP gets you from Prince George Wharf to the beach, Atlantis, Baha Mar, or anywhere in Nassau — fixed price, no haggling.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="https://app.hopbahamas.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "0.875rem 1.75rem", fontSize: "0.95rem" }}>Book from Cruise Port</a>
              <Link href="/#download" className="btn-secondary" style={{ padding: "0.875rem 1.75rem", fontSize: "0.95rem", display: "inline-flex", alignItems: "center" }}>Download the App</Link>
            </div>
          </div>
          <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="pexels-credit">Photo via Pexels</a>
        </section>

        <section style={{ backgroundColor: CARD, padding: "1.5rem", borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[{ label: "From", value: "Nassau Cruise Port — Prince George Wharf" }, { label: "To", value: "Anywhere in Nassau & Paradise Island" }, { label: "Typical time", value: "8–20 min depending on destination" }].map((r) => (
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
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>Ready to explore Nassau?</h2>
            <p style={{ color: MUTED, fontSize: "0.95rem", marginBottom: "2rem" }}>Book your ride from the cruise port in seconds.</p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
              <a href="https://app.hopbahamas.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "0.875rem 2rem", fontSize: "0.95rem" }}>Book via Web App</a>
              <Link href="/#download" className="btn-secondary" style={{ padding: "0.875rem 2rem", fontSize: "0.95rem", display: "inline-flex", alignItems: "center" }}>Download the App</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
