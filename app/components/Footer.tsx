"use client";

import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

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
            {/* Contact */}
            <div className="flex gap-3 mt-4 flex-wrap">
              <a
                href="https://wa.me/12420000000"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_click", { label: "whatsapp", location: "footer" })}
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  color: "#25D366", fontSize: "0.82rem", fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp us
              </a>
              <a
                href="mailto:support@hopbahamas.com"
                style={{ color: "#8a8070", fontSize: "0.82rem", textDecoration: "none" }}
              >
                support@hopbahamas.com
              </a>
            </div>

            {/* App store buttons */}
            <div className="flex gap-3 mt-3 flex-wrap">
              <a
                href="https://apps.apple.com/us/app/hop-bahamas/id6756782428"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_click", { label: "app_store_download", location: "footer" })}
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
                onClick={() => trackEvent("cta_click", { label: "book_ride", location: "footer" })}
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
