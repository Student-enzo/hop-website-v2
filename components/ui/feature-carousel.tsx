"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign, Car, Crown, CalendarCheck, Users, WifiOff,
  Shield, MapPin, Clock, Camera, Star, MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Each entry maps to a real /public/screenshots/ file
const FEATURES = [
  {
    id: "economic",
    label: "Economic Rides",
    icon: DollarSign,
    screenshot: "/screenshots/economic-ride.png",
    bg: "/images/dest-nassau.jpg",
    description: "The lowest fare tier. Best for solo trips and flexible timing around Nassau.",
  },
  {
    id: "standard",
    label: "Standard Rides",
    icon: Car,
    screenshot: "/screenshots/standard-ride.png",
    bg: "/images/dest-atlantis.jpg",
    description: "Nassau's most popular tier — reliable matching, comfortable vehicle, fair pricing.",
  },
  {
    id: "luxury",
    label: "Luxury Rides",
    icon: Crown,
    screenshot: "/screenshots/luxury-select.png",
    bg: "/images/dest-luxury.jpg",
    description: "Flat rate premium vehicles. Sedan ($95), SUV ($120), Mini Bus ($190) — one price, anywhere.",
  },
  {
    id: "schedule",
    label: "Pre-Book Your Ride",
    icon: CalendarCheck,
    screenshot: "/screenshots/schedule-calendar.png",
    bg: "/images/dest-airport.jpg",
    description: "Schedule pickups days or weeks in advance. Route locked, fare confirmed before you land.",
  },
  {
    id: "rideshare",
    label: "Ride Share",
    icon: Users,
    screenshot: "/screenshots/ride-share.png",
    bg: "/images/cta-bahamas.jpg",
    description: "Split the cost on Standard rides. Set seats, choose equal split or custom %, and save.",
  },
  {
    id: "lowdata",
    label: "Low Data Mode",
    icon: WifiOff,
    screenshot: "/screenshots/low-data-active.png",
    bg: "/images/dest-cruise.jpg",
    description: "On weak Bahamian signal, HOP stays functional. Tracking and driver chat stay live.",
  },
  {
    id: "safety",
    label: "SOS Safety",
    icon: Shield,
    screenshot: "/screenshots/sos.png",
    bg: "/images/dest-nassau.jpg",
    description: "One tap triggers a countdown — calls 919, alerts the Safety Desk, texts trusted contacts.",
  },
  {
    id: "tracking",
    label: "Live Tracking",
    icon: MapPin,
    screenshot: "/screenshots/live-tracking.png",
    bg: "/images/dest-atlantis.jpg",
    description: "Watch your driver approach on a live Nassau map. See their exact ETA in real time.",
  },
  {
    id: "priority",
    label: "Priority Pickup",
    icon: Clock,
    screenshot: "/screenshots/priority-pickup.png",
    bg: "/images/dest-airport.jpg",
    description: "Add +$4 to mark your ride as priority and jump the driver matching queue instantly.",
  },
  {
    id: "moments-camera",
    label: "HOP Moments",
    icon: Camera,
    screenshot: "/screenshots/hop-moments-camera.png",
    bg: "/images/cta-bahamas.jpg",
    description: "Share photos, videos, and reels of Nassau — earn points toward rewards with every post.",
  },
  {
    id: "moments-rewards",
    label: "HOP Rewards",
    icon: Star,
    screenshot: "/screenshots/hop-moments-rewards.png",
    bg: "/images/hero-bahamas.jpg",
    description: "Hit point milestones and unlock rewards. Photo = 50 pts. Video = 100 pts. Reel = 195 pts.",
  },
  {
    id: "moments-feedback",
    label: "Rate & Review",
    icon: MessageCircle,
    screenshot: "/screenshots/hop-moments-feedback.png",
    bg: "/images/dest-nassau.jpg",
    description: "Rate your ride and leave feedback. Helps drivers improve and keeps the community strong.",
  },
];

const AUTO_PLAY_INTERVAL = 3400;
const ITEM_HEIGHT = 62;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex = ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;
  const nextStep = useCallback(() => setStep((prev) => prev + 1), []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;
    let d = diff;
    if (diff > len / 2) d -= len;
    if (diff < -len / 2) d += len;
    if (d === 0) return "active";
    if (d === -1) return "prev";
    if (d === 1) return "next";
    return "hidden";
  };

  const activeFeature = FEATURES[currentIndex];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div
        className="relative overflow-hidden flex flex-col lg:flex-row border"
        style={{
          borderRadius: "2.5rem",
          minHeight: 600,
          borderColor: "rgba(255,255,255,0.07)",
        }}
      >
        {/* ── Left: scrolling feature list ── */}
        <div
          className="w-full lg:w-[37%] relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-12 lg:pl-12"
          style={{ backgroundColor: "#0a0806", minHeight: 340 }}
        >
          <div className="absolute inset-x-0 top-0 h-20 z-40 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #0a0806 0%, transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-20 z-40 pointer-events-none"
            style={{ background: "linear-gradient(to top, #0a0806 0%, transparent 100%)" }} />

          <div className="relative w-full flex items-center justify-start z-20" style={{ height: 400 }}>
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(-(FEATURES.length / 2), FEATURES.length / 2, distance);
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  style={{ height: ITEM_HEIGHT, width: "max-content" }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.2,
                  }}
                  transition={{ type: "spring", stiffness: 90, damping: 22, mass: 1 }}
                  className="absolute flex items-center"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "flex items-center gap-3 px-5 md:px-6 py-3 rounded-full border transition-all duration-500 text-sm tracking-tight whitespace-nowrap uppercase font-semibold",
                      isActive
                        ? "z-10"
                        : "bg-transparent border-white/10 text-white/40 hover:border-white/25 hover:text-white/65"
                    )}
                    style={isActive ? {
                      backgroundColor: "#F5A020",
                      borderColor: "#F5A020",
                      color: "#0a0806",
                    } : {}}
                  >
                    <Icon size={15} strokeWidth={2.2} className="flex-shrink-0" />
                    {feature.label}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Right: phone screenshot on blurred Bahamas background ── */}
        <div
          className="flex-1 relative flex items-center justify-center border-t lg:border-t-0 lg:border-l overflow-hidden"
          style={{ borderColor: "rgba(255,255,255,0.05)", minHeight: 600 }}
        >
          {/* Blurred Bahamas background — cross-fades per feature */}
          <AnimatePresence mode="sync">
            <motion.div
              key={activeFeature.bg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <Image
                src={activeFeature.bg}
                alt=""
                fill
                style={{ objectFit: "cover", filter: "blur(28px) saturate(1.5)", transform: "scale(1.15)" }}
              />
              {/* Dark overlay so phone is readable */}
              <div className="absolute inset-0" style={{ background: "rgba(10,8,6,0.55)" }} />
            </motion.div>
          </AnimatePresence>

          {/* Vignette edges */}
          <div className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(10,8,6,0.75) 100%)" }} />

          {/* Phone cards */}
          <div className="relative z-20 w-full h-full" style={{ minHeight: 600 }}>
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? "-38%" : isNext ? "38%" : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.8 : 0.65,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.28 : 0,
                    rotate: isPrev ? -5 : isNext ? 5 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.85 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Phone frame */}
                  <div style={{
                    position: "relative",
                    borderRadius: 44,
                    padding: 9,
                    background: "linear-gradient(145deg, #333 0%, #1a1a1a 100%)",
                    boxShadow: isActive
                      ? "0 40px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.1), 0 0 60px rgba(245,160,32,0.18)"
                      : "0 20px 50px rgba(0,0,0,0.6)",
                    transition: "box-shadow 0.5s ease",
                  }}>
                    <div style={{ borderRadius: 36, overflow: "hidden", width: 210, height: 454 }}>
                      <Image
                        src={feature.screenshot}
                        alt={feature.label}
                        width={210}
                        height={454}
                        style={{ objectFit: "cover", objectPosition: "top", display: "block" }}
                      />
                    </div>
                  </div>

                  {/* Caption below phone — only when active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        style={{
                          position: "absolute",
                          bottom: 28,
                          left: 32,
                          right: 32,
                          textAlign: "center",
                          zIndex: 30,
                        }}
                      >
                        <div style={{
                          display: "inline-flex", alignItems: "center", gap: "0.4rem",
                          padding: "0.25rem 0.875rem",
                          backgroundColor: "rgba(245,160,32,0.18)",
                          border: "1px solid rgba(245,160,32,0.35)",
                          borderRadius: 999,
                          marginBottom: "0.5rem",
                          backdropFilter: "blur(12px)",
                        }}>
                          <Icon size={11} strokeWidth={2.5} color="#F5A020" />
                          <span style={{ color: "#F5A020", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                            {feature.label}
                          </span>
                        </div>
                        <p style={{
                          color: "rgba(240,237,232,0.92)",
                          fontSize: "0.875rem",
                          lineHeight: 1.55,
                          fontWeight: 500,
                          textShadow: "0 1px 12px rgba(0,0,0,0.95)",
                          maxWidth: 340,
                          margin: "0 auto",
                        }}>
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
