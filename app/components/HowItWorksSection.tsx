"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const CARD = "#1e1c14";
const CARD2 = "#222018";
const TEXT = "#f0ede8";
const MUTED = "#8a8070";
const ORANGE = "#F5A020";
const BORDER = "rgba(255,255,255,0.06)";

const STEP_DURATION = 4500;

const STEPS = [
  {
    num: "01",
    title: "Type your destination",
    desc: "Open HOP, type where you're headed. Your flat fare appears instantly — no meter, no haggling.",
    img: "/screenshots/select-location.png",
    imgAlt: "HOP destination search",
    chips: [
      { label: "Where to?", sub: "Type your destination here", side: "left" as const, y: 44 },
      { label: "Tap to select", sub: "Tap on the location to select", side: "right" as const, y: 67 },
    ],
    glow: "rgba(14,165,233,0.18)",
  },
  {
    num: "02",
    title: "Choose your experience",
    desc: "Pick ECO, Standard, or Luxury — price locked before your driver moves. No surprises, ever.",
    img: "/screenshots/home-map.png",
    imgAlt: "HOP ride tier selection",
    chips: [
      { label: "Choose your experience", sub: "ECO · Standard · Luxury", side: "left" as const, y: 76 },
      { label: "$34.57 · Flat fare", sub: "Price locked before pickup", side: "right" as const, y: 57 },
    ],
    glow: "rgba(245,160,32,0.18)",
  },
  {
    num: "03",
    title: "Finding your driver",
    desc: "HOP matches you with the nearest driver. Tap +$4 priority to get picked up even faster.",
    img: "/screenshots/finding-driver.png",
    imgAlt: "HOP finding driver",
    chips: [
      { label: "Want faster pickup?", sub: "Add +$4 to mark as priority", side: "left" as const, y: 81 },
      { label: "Pickup ETA: 1 min", sub: "Scanning nearby drivers", side: "right" as const, y: 16 },
    ],
    glow: "rgba(245,160,32,0.12)",
  },
  {
    num: "04",
    title: "Ride in progress",
    desc: "Watch your driver in real time. Chat, share your trip, or hit SOS — all from one screen.",
    img: "/screenshots/ride-in-progress.png",
    imgAlt: "HOP ride in progress — live tracking",
    chips: [
      { label: "Rodrigo is on the way", sub: "★★★★★ · ETA 2 min", side: "left" as const, y: 70 },
      { label: "Share your trip", sub: "Trusted contacts see your ride", side: "right" as const, y: 54 },
    ],
    glow: "rgba(58,173,110,0.18)",
  },
  {
    num: "✦",
    title: "Pro tip: Low Data Mode",
    desc: "On weak signal, tap the wifi⊘ icon to switch modes — tracking, ETA, and chat keep running.",
    img: "/screenshots/low-data-mode.png",
    imgAlt: "HOP Low Data Mode",
    chips: [
      { label: "Tap the wifi⊘ icon", sub: "Activates Low Data Mode instantly", side: "left" as const, y: 38 },
      { label: "ETA keeps updating", sub: "Map pauses · chat stays on", side: "right" as const, y: 64 },
    ],
    glow: "rgba(245,160,32,0.10)",
  },
];

export default function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);

  const startRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const phoneRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    if (flipping) return;
    setFlipping(true);
    setTimeout(() => {
      setActive(i);
      setProgress(0);
      startRef.current = performance.now();
      setFlipping(false);
    }, 280);
  }, [flipping]);

  useEffect(() => {
    startRef.current = performance.now();
    const tick = (now: number) => {
      if (pausedRef.current) {
        startRef.current = now;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / STEP_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        setActive((prev) => {
          const next = (prev + 1) % STEPS.length;
          setFlipping(true);
          setTimeout(() => {
            setFlipping(false);
          }, 280);
          startRef.current = now;
          return next;
        });
        setProgress(0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = phoneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -12, y: dx * 14 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const step = STEPS[active];

  return (
    <section style={{ backgroundColor: "#0e0c09", padding: "5rem 1.5rem", overflow: "hidden" }}>
      <style>{`
        @keyframes hiw-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes hiw-chip-in-left {
          from { opacity:0; transform: translateX(-18px) scale(0.92); }
          to   { opacity:1; transform: translateX(0)    scale(1); }
        }
        @keyframes hiw-chip-in-right {
          from { opacity:0; transform: translateX(18px) scale(0.92); }
          to   { opacity:1; transform: translateX(0)    scale(1); }
        }
        @keyframes hiw-glow-pulse {
          0%,100% { opacity:.7; transform:scale(1);   }
          50%      { opacity:1;  transform:scale(1.08); }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{ color: ORANGE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.6rem" }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: TEXT, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Type your destination.<br />Confirm. Done.
          </h2>
        </div>

        <div style={{ display: "grid", gap: "4rem", alignItems: "center" }} className="grid grid-cols-1 md:grid-cols-2">

          {/* ── LEFT: vertical timeline ── */}
          <div style={{ position: "relative" }}>
            {/* Animated vertical connector line — runs between circles, not through them */}
            <div style={{ position: "absolute", left: 19, top: 59, bottom: 59, width: 1, backgroundColor: BORDER, zIndex: 0 }}>
              <div style={{
                position: "absolute", top: 0, left: 0, width: "100%",
                height: `${(active / Math.max(STEPS.length - 1, 1)) * 100}%`,
                backgroundColor: ORANGE, transition: "height 0.6s cubic-bezier(0.4,0,0.2,1)",
              }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {STEPS.map((s, i) => {
                const isActive = active === i;
                const isPast = i < active;
                return (
                  <button
                    key={s.num}
                    onClick={() => goTo(i)}
                    onMouseEnter={() => { pausedRef.current = true; }}
                    onMouseLeave={() => { pausedRef.current = false; }}
                    style={{
                      display: "flex", gap: "1.25rem", alignItems: "flex-start",
                      padding: "1.25rem 1rem 1.25rem 0", textAlign: "left",
                      background: "none", border: "none", cursor: "pointer",
                      fontFamily: "inherit", position: "relative", zIndex: 1,
                    }}
                  >
                    {/* Circle */}
                    <div style={{
                      width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                      position: "relative", zIndex: 2,
                      backgroundColor: isActive ? ORANGE : isPast ? CARD2 : CARD2,
                      border: `2px solid ${isActive ? ORANGE : isPast ? "rgba(245,160,32,0.4)" : BORDER}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background-color 0.3s, border-color 0.3s",
                    }}>
                      {isPast
                        ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                        : <span style={{ color: isActive ? "#161616" : MUTED, fontWeight: 800, fontSize: s.num === "✦" ? "0.9rem" : "0.72rem" }}>{s.num}</span>
                      }
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, paddingTop: "0.35rem" }}>
                      <p style={{ color: isActive ? TEXT : MUTED, fontWeight: isActive ? 700 : 500, fontSize: "1rem", letterSpacing: "-0.01em", marginBottom: isActive ? "0.5rem" : 0, transition: "color 0.2s" }}>
                        {s.title}
                      </p>
                      <div style={{ overflow: "hidden", maxHeight: isActive ? "4rem" : 0, transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
                        <p style={{ color: MUTED, fontSize: "0.875rem", lineHeight: 1.65, paddingBottom: "0.25rem" }}>{s.desc}</p>
                      </div>

                      {/* Progress bar */}
                      {isActive && (
                        <div style={{ height: 2, backgroundColor: "rgba(245,160,32,0.12)", borderRadius: 99, marginTop: "0.75rem", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${progress}%`, backgroundColor: ORANGE, transition: "width 0.1s linear", borderRadius: 99 }} />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: 3D floating phone ── */}
          <div
            className="hidden md:flex"
            style={{ justifyContent: "center", alignItems: "center", position: "relative", height: 560 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background radial glow — shifts color per step */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: 32,
              background: `radial-gradient(ellipse 60% 55% at 50% 55%, ${step.glow}, transparent 70%)`,
              transition: "background 0.8s ease",
              animation: "hiw-glow-pulse 4s ease-in-out infinite",
              pointerEvents: "none",
            }} />

            {/* Phone with 3D tilt + float */}
            <div
              ref={phoneRef}
              style={{
                animation: "hiw-float 5s ease-in-out infinite",
                transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 0.15s ease-out",
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* Phone frame */}
              <div style={{
                display: "inline-block",
                borderRadius: 48,
                padding: 10,
                background: "linear-gradient(145deg, #2e2e2e 0%, #181818 100%)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.09), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}>
                {/* Notch */}
                <div style={{ position: "relative", borderRadius: 40, overflow: "hidden", width: 220, height: 476 }}>
                  <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 60, height: 20, backgroundColor: "#111", borderRadius: 10, zIndex: 5 }} />
                  {/* Crossfading screenshots */}
                  {STEPS.map((s, i) => (
                    <div key={s.num} style={{
                      position: "absolute", inset: 0,
                      opacity: active === i && !flipping ? 1 : 0,
                      transform: active === i && !flipping ? "scale(1)" : "scale(1.04)",
                      transition: "opacity 0.35s ease, transform 0.35s ease",
                    }}>
                      <Image src={s.img} alt={s.imgAlt} width={220} height={476} style={{ objectFit: "cover", display: "block" }} unoptimized />
                    </div>
                  ))}
                  {/* Screen shine overlay */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)", pointerEvents: "none", zIndex: 4 }} />
                </div>
              </div>

              {/* Floating chips */}
              {step.chips.map((chip, ci) => (
                <div
                  key={`${active}-${ci}`}
                  style={{
                    position: "absolute",
                    top: `${chip.y}%`,
                    ...(chip.side === "left" ? { right: "calc(100% + 14px)" } : { left: "calc(100% + 14px)" }),
                    backgroundColor: "rgba(18,16,10,0.92)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: `1px solid rgba(255,255,255,0.14)`,
                    borderRadius: 12,
                    padding: "0.5rem 0.875rem",
                    whiteSpace: "nowrap",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    animation: `${chip.side === "left" ? "hiw-chip-in-left" : "hiw-chip-in-right"} 0.45s cubic-bezier(0.34,1.56,0.64,1) ${ci * 0.15}s both`,
                    zIndex: 10,
                    minWidth: 130,
                  }}
                >
                  <p style={{ color: TEXT, fontWeight: 700, fontSize: "0.78rem", lineHeight: 1.2, marginBottom: "0.15rem" }}>{chip.label}</p>
                  <p style={{ color: MUTED, fontSize: "0.65rem" }}>{chip.sub}</p>
                  {/* Arrow pointer */}
                  <div style={{
                    position: "absolute", top: "50%", transform: "translateY(-50%)",
                    ...(chip.side === "left" ? { right: -5 } : { left: -5 }),
                    width: 8, height: 8,
                    backgroundColor: "rgba(18,16,10,0.92)",
                    border: `1px solid rgba(255,255,255,0.14)`,
                    borderRadius: 2,
                    rotate: "45deg",
                    ...(chip.side === "left" ? { borderLeft: "none", borderBottom: "none" } : { borderRight: "none", borderTop: "none" }),
                  }} />
                </div>
              ))}
            </div>

            {/* Bottom step indicator pill */}
            <div style={{
              position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
              display: "flex", gap: "0.4rem", alignItems: "center",
              backgroundColor: "rgba(22,22,22,0.85)", backdropFilter: "blur(16px)",
              border: `1px solid ${BORDER}`, borderRadius: 999,
              padding: "0.45rem 1rem",
            }}>
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: active === i ? 22 : 6, height: 6, borderRadius: 999, border: "none", padding: 0,
                    backgroundColor: active === i ? ORANGE : "rgba(255,255,255,0.18)",
                    transition: "width 0.35s ease, background-color 0.35s ease",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Feature highlights (replaces standalone Features section) ── */}
        <div style={{ marginTop: "3.5rem", display: "grid", gap: "1px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", backgroundColor: BORDER, borderRadius: 20, overflow: "hidden", border: `1px solid ${BORDER}` }}>
          {[
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 6s0-2 2-2 2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 2 2"/><path d="M1 12s0-2 2-2 2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 2 2"/><path d="M1 18s0-2 2-2 2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 2 2"/>
                </svg>
              ),
              title: "Low Data Mode",
              desc: "Maps pause on weak signal — tracking, ETA, and chat keep running.",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ),
              title: "Fixed prices. No surprises.",
              desc: "Fare locked before your driver moves. Never at destination.",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                </svg>
              ),
              title: "Book now or schedule ahead",
              desc: "Instant rides or plan days in advance. Airport pickup at 5 AM? Done.",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
              title: "SOS + Safety Desk",
              desc: "One tap alerts emergency services, HOP Safety Desk, and trusted contacts.",
            },
          ].map((f) => (
            <div key={f.title} style={{ backgroundColor: CARD2, padding: "1.5rem" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: "rgba(245,160,32,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.875rem" }}>
                {f.icon}
              </div>
              <p style={{ color: TEXT, fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.35rem", lineHeight: 1.3 }}>{f.title}</p>
              <p style={{ color: MUTED, fontSize: "0.8rem", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
