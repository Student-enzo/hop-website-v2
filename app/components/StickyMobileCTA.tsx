"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

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
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: visible
          ? "translateX(-50%) translateY(0) scale(1)"
          : "translateX(-50%) translateY(calc(100% + 2rem)) scale(0.92)",
        zIndex: 50,
        transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <a
        href="https://app.hopbahamas.com"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("cta_click", { label: "sticky_book_ride", location: "sticky_mobile" })}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.6rem",
          padding: "0.8rem 1.5rem",
          backgroundColor: "#F5A020",
          borderRadius: "999px",
          textDecoration: "none",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 24px rgba(245,160,32,0.45), 0 2px 8px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        {/* Car icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h14l4 4v4a2 2 0 01-2 2h-2" />
          <circle cx="7.5" cy="17.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
        <span style={{ color: "#161616", fontWeight: 800, fontSize: "0.9rem", letterSpacing: "-0.01em" }}>
          Book My Ride
        </span>
        <span style={{ color: "rgba(22,22,22,0.55)", fontSize: "0.75rem", fontWeight: 600 }}>
          from $26
        </span>
      </a>
    </div>
  );
}
