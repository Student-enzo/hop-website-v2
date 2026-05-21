import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1e1c14",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "3rem 1.5rem 2rem",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-3">
              <Image
                src="/hop-logo.png"
                alt="HOP Bahamas"
                width={80}
                height={38}
                style={{ objectFit: "contain" }}
              />
            </div>
            <p style={{ color: "#8a8070", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: 280 }}>
              Ride-hailing built for Nassau. Fixed prices, scheduled pickups, and safety tools for every trip.
            </p>
            {/* App store buttons */}
            <div className="flex gap-3 mt-4 flex-wrap">
              <a
                href="https://apps.apple.com/us/app/hop-bahamas/id6756782428"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#222018",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textDecoration: "none",
                  color: "#f0ede8",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f0ede8">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href="https://app.hopbahamas.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#222018",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textDecoration: "none",
                  color: "#f0ede8",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f0ede8">
                  <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l15 8.5c.6.35.6 1.25 0 1.6l-15 8.5c-.66.5-1.6.03-1.6-.8z" />
                </svg>
                Google Play
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p style={{ color: "#f0ede8", fontWeight: 700, fontSize: "0.875rem", marginBottom: "1rem" }}>Product</p>
            {[
              { label: "Rides", href: "/services" },
              { label: "Destinations", href: "/routes" },
              { label: "Schedule", href: "/services#schedule" },
              { label: "Safety", href: "/services#safety" },
              { label: "Rewards", href: "/services#rewards" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="footer-link"
                style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <p style={{ color: "#f0ede8", fontWeight: 700, fontSize: "0.875rem", marginBottom: "1rem" }}>Company</p>
            {[
              { label: "Blog", href: "/blog" },
              { label: "Support", href: "#" },
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Service", href: "/terms-of-service" },
              { label: "Cancellation Policy", href: "/cancellation-policy" },
              { label: "Driver App", href: "#" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="footer-link"
                style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <p style={{ color: "#8a8070", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} HOP Bahamas. Nassau, The Bahamas.
          </p>
          <p style={{ color: "#8a8070", fontSize: "0.8rem" }}>
            All prices in USD. 12% VAT applied to rides.
          </p>
        </div>
      </div>
    </footer>
  );
}
