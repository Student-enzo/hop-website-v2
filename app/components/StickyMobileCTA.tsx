"use client";

import { useEffect, useState } from "react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = document.documentElement.scrollHeight * 0.3;
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        padding: "0.5rem 1rem",
        background: "rgba(12,10,6,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(245,160,32,0.2)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        transform: visible ? "translateY(0)" : "translateY(110%)",
        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      className="md:hidden"
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: "#f0ede8", fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.2 }}>
          Book a Ride
        </p>
        <p style={{ color: "#8a8070", fontSize: "0.72rem", marginTop: "0.1rem" }}>
          Fixed price · Free cancellation
        </p>
      </div>
      <a
        href="https://app.hopbahamas.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: "#F5A020",
          color: "#161616",
          fontWeight: 800,
          fontSize: "0.875rem",
          padding: "0.625rem 1.25rem",
          borderRadius: "999px",
          textDecoration: "none",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Get My Ride →
      </a>
    </div>
  );
}
