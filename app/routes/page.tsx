import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nassau Destinations — HOP Bahamas Rides",
  description:
    "Fixed-price HOP rides to every major Nassau destination. Airport transfers, Atlantis, Baha Mar, Cruise Port, Blue Lagoon, and more.",
};

const ORANGE = "#F5A020";
const BG = "#161616";
const CARD = "#1e1c14";
const CARD2 = "#222018";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const BORDER = "rgba(255,255,255,0.06)";

const DESTINATIONS = [
  {
    name: "Nassau Airport (LPIA)",
    subtitle: "Lynden Pindling International Airport",
    slug: "nassau-airport",
    from: "from $34",
    time: "~15 min",
    badge: "AIRPORT",
    badgeColor: "#0EA5E9",
    desc: "Pre-book your airport transfer before you land. Fixed price — no surge, no negotiation.",
    bg: "/images/dest-airport.jpg",
    popular: true,
  },
  {
    name: "Atlantis Paradise Island",
    subtitle: "Paradise Island",
    slug: "atlantis-paradise-island",
    from: "from $26",
    time: "~12 min",
    badge: "RESORT",
    badgeColor: "#3aad6e",
    desc: "The most requested route in Nassau. Fixed fare from the airport or downtown.",
    bg: "/images/dest-atlantis.jpg",
    popular: true,
  },
  {
    name: "Nassau Cruise Port",
    subtitle: "Prince George Wharf",
    slug: "nassau-cruise-port",
    from: "from $24",
    time: "~8 min",
    badge: "CRUISE",
    badgeColor: "#0EA5E9",
    desc: "Your ship just docked. HOP gets you to the beach, resort, or city in minutes.",
    bg: "/images/dest-cruise.jpg",
    popular: false,
  },
  {
    name: "Baha Mar & Cable Beach",
    subtitle: "Cable Beach Resort Strip",
    slug: "baha-mar-cable-beach",
    from: "from $29",
    time: "~10 min",
    badge: "RESORT",
    badgeColor: "#3aad6e",
    desc: "Fixed-price rides to Baha Mar, SLS, or anywhere along the Cable Beach strip.",
    bg: "/images/dest-nassau.jpg",
    popular: false,
  },
  {
    name: "Blue Lagoon Island",
    subtitle: "Nassau Ferry Terminal",
    slug: "blue-lagoon-island",
    from: "from $24",
    time: "~10 min",
    badge: "ISLAND",
    badgeColor: "#F5A020",
    desc: "Catch your ferry to Blue Lagoon without the cab-negotiation stress.",
    bg: "/images/cta-bahamas.jpg",
    popular: false,
  },
  {
    name: "Sandals Royal Bahamian",
    subtitle: "Cable Beach",
    slug: "sandals-royal-bahamian",
    from: "from $29",
    time: "~12 min",
    badge: "RESORT",
    badgeColor: "#3aad6e",
    desc: "Luxury-grade transport to Sandals. Arrive exactly when you planned.",
    bg: "/images/dest-luxury.jpg",
    popular: false,
  },
];

export default function RoutesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "88px" }}>

        {/* Header with Pexels Atlantis bg */}
        <section
          className="photo-hero"
          style={{
            backgroundImage: "url('/images/routes-hero.jpg')",
            padding: "5rem 1.5rem 4rem",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(22,22,22,0.75) 0%, rgba(22,22,22,0.9) 60%, #161616 100%)" }} />
          <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <Link href="/" className="footer-link" style={{ fontSize: "0.875rem" }}>Home</Link>
              <span style={{ color: MUTED, fontSize: "0.875rem" }}>/</span>
              <span style={{ color: ORANGE, fontSize: "0.875rem", fontWeight: 600 }}>Destinations</span>
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, color: TEXT, letterSpacing: "-0.03em", marginBottom: "0.75rem", lineHeight: 1.05 }}>
              Where are you headed?
            </h1>
            <p style={{ color: "rgba(138,128,112,0.9)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 540 }}>
              Fixed-price rides to every major Nassau destination. Book now, schedule ahead, or use the web app — no download needed.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
              <a href="https://app.hopbahamas.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "0.875rem 1.75rem", fontSize: "0.95rem" }}>
                Book a Ride Now
              </a>
              <Link href="/#download" className="btn-secondary" style={{ padding: "0.875rem 1.75rem", fontSize: "0.95rem", display: "inline-flex", alignItems: "center" }}>
                Download the App
              </Link>
            </div>
          </div>
          <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="pexels-credit">Photo via Pexels</a>
        </section>

        {/* Destinations grid */}
        <section style={{ backgroundColor: BG, padding: "3rem 1.5rem 5rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>

            {/* Popular first */}
            <p style={{ color: MUTED, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "1.25rem" }}>ALL DESTINATIONS</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
              {DESTINATIONS.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/routes/${dest.slug}`}
                  className="destination-card"
                  style={{ backgroundImage: `url('${dest.bg}')` }}
                >
                  {dest.popular && (
                    <div style={{ position: "absolute", top: 14, right: 14, zIndex: 2, backgroundColor: ORANGE, color: BG, fontSize: "0.65rem", fontWeight: 800, padding: "0.2rem 0.65rem", borderRadius: "999px", letterSpacing: "0.06em" }}>
                      POPULAR
                    </div>
                  )}
                  <div className="destination-card-content" style={{ minHeight: 280 }}>
                    <div>
                      <span style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.08em", color: dest.badgeColor, backgroundColor: `${dest.badgeColor}20`, padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
                        {dest.badge}
                      </span>
                      <h2 style={{ color: TEXT, fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.01em", margin: "0.6rem 0 0.3rem", lineHeight: 1.2 }}>{dest.name}</h2>
                      <p style={{ color: "rgba(138,128,112,0.8)", fontSize: "0.8rem", marginBottom: "0.75rem" }}>{dest.subtitle}</p>
                      <p style={{ color: "rgba(240,237,232,0.75)", fontSize: "0.85rem", lineHeight: 1.55, marginBottom: "1rem" }}>{dest.desc}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span style={{ color: ORANGE, fontWeight: 800, fontSize: "1rem" }}>{dest.from}</span>
                        <span style={{ color: MUTED, fontSize: "0.8rem" }}>·</span>
                        <span style={{ color: MUTED, fontSize: "0.8rem" }}>{dest.time}</span>
                        <span className="hop-link-arrow" style={{ marginLeft: "auto", fontSize: "0.8rem" }}>
                          See rides
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why HOP bar */}
        <section style={{ backgroundColor: CARD, padding: "3.5rem 1.5rem", borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ color: MUTED, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "1.5rem", textAlign: "center" }}>WHY CHOOSE HOP</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
              {[
                { icon: "💳", title: "Price before you book", desc: "See the exact fare before you confirm. No surprises." },
                { icon: "📅", title: "Schedule up to 7 days ahead", desc: "Plan your airport transfer before you even leave home." },
                { icon: "🛡", title: "SOS on every ride", desc: "One tap alerts emergency services and your contacts." },
                { icon: "📶", title: "Works on weak signal", desc: "Low Data Mode keeps HOP functional across Nassau." },
              ].map((w) => (
                <div key={w.title} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: CARD2, border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.1rem" }}>
                    {w.icon}
                  </div>
                  <div>
                    <p style={{ color: TEXT, fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.25rem" }}>{w.title}</p>
                    <p style={{ color: MUTED, fontSize: "0.8rem", lineHeight: 1.5 }}>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: BG, padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
              Ready to book?
            </h2>
            <p style={{ color: MUTED, fontSize: "0.95rem", marginBottom: "2rem" }}>
              Fixed price. No flagging. Book via web app or download HOP.
            </p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
              <a href="https://app.hopbahamas.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "0.875rem 2rem", fontSize: "0.95rem" }}>
                Book via Web App
              </a>
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
