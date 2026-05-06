"use client"

import * as React from "react"
import Image from "next/image"
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  ReviewStars,
} from "@/components/blocks/animated-cards-stack"

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Rachel M.",
    trip: "Airport → Atlantis · May 2025",
    rating: 5,
    text: "Landed at LPIA and my HOP driver was already there. Flat rate shown before I even left baggage claim. No haggling, no stress — exactly what you need after a long flight.",
    initials: "RM",
    color: "#0EA5E9",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
  },
  {
    id: "t2",
    name: "James T.",
    trip: "Baha Mar → Downtown · April 2025",
    rating: 5,
    text: "Every other time I've taken a taxi in Nassau I've had to argue the price. With HOP the fare was locked before I got in. Driver was on time, car was clean. This is how it should work.",
    initials: "JT",
    color: "#F5A020",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    id: "t3",
    name: "Sofia K.",
    trip: "Paradise Island → Fox Hill · March 2025",
    rating: 4.5,
    text: "Scheduled my airport ride at 5 AM the night before. Got a confirmation, driver showed up on time, price was exactly what the app said. Couldn't ask for more.",
    initials: "SK",
    color: "#3aad6e",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  },
  {
    id: "t4",
    name: "Marcus W.",
    trip: "Nassau Airport → Cable Beach · Feb 2025",
    rating: 5,
    text: "Group of 6 from our cruise. HOP handled all of us with one booking, split the fare clearly on screen. Way better than fighting over taxis at the port.",
    initials: "MW",
    color: "#d4a855",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
]

export default function TestimonialsSection() {
  return (
    <section style={{ backgroundColor: "#161616" }}>
      {/* Sticky header */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 1.5rem 0" }}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p style={{ color: "#F5A020", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.6rem" }}>REVIEWS</p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 800, color: "#f0ede8", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "0.75rem" }}>
            Real riders. Real Nassau.
          </h2>
          <p style={{ color: "#8a8070", fontSize: "1rem", maxWidth: 440, margin: "0 auto" }}>
            What people say after their first HOP ride.
          </p>
        </div>
      </div>

      {/* Animated stack — scroll-driven */}
      <ContainerScroll className="h-[300vh]">
        <div className="sticky left-0 top-0 h-svh w-full flex items-center justify-center py-12">
          <CardsContainer className="size-full h-[440px] w-[360px] mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <CardTransformed
                key={t.id}
                arrayLength={TESTIMONIALS.length}
                index={i + 2}
                variant="dark"
              >
                {/* Stars + quote */}
                <div className="flex flex-col items-center gap-4 text-center w-full">
                  <ReviewStars rating={t.rating} />
                  <blockquote style={{ color: "rgba(240,237,232,0.9)", fontSize: "0.95rem", lineHeight: 1.7, fontStyle: "italic" }}>
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 w-full">
                  <div style={{ width: 46, height: 46, borderRadius: "50%", overflow: "hidden", border: `2px solid ${t.color}40`, flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.avatar} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <p style={{ color: "#f0ede8", fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.2 }}>{t.name}</p>
                    <p style={{ color: "#8a8070", fontSize: "0.72rem", marginTop: 2 }}>{t.trip}</p>
                  </div>
                  {/* HOP logo */}
                  <div style={{ marginLeft: "auto", backgroundColor: "rgba(245,160,32,0.1)", border: "1px solid rgba(245,160,32,0.2)", borderRadius: 999, padding: "0.35rem 0.7rem", display: "flex", alignItems: "center" }}>
                    <Image src="/hop-logo-yellow.png" alt="HOP" width={36} height={14} style={{ objectFit: "contain", display: "block" }} />
                  </div>
                </div>
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
    </section>
  )
}
