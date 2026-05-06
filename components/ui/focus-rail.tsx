"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FocusCard {
  id: number;
  title: string;
  description: string;
  meta: string;
  imageSrc: string;
  href: string;
}

interface FocusCardsProps {
  cards: FocusCard[];
  className?: string;
}

function Card({
  card,
  index,
  hovered,
  setHovered,
}: {
  card: FocusCard;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative overflow-hidden rounded-2xl cursor-pointer",
        "transition-all duration-300 ease-out",
        hovered !== null && hovered !== index
          ? "opacity-50 blur-[1px] scale-[0.98]"
          : "opacity-100 scale-100"
      )}
      style={{ height: 340, flex: 1, minWidth: 180 }}
    >
      {/* Background image */}
      <img
        src={card.imageSrc}
        alt={card.title}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out",
          hovered === index ? "scale-110" : "scale-100"
        )}
      />

      {/* Gradient overlay — stronger on hover */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          hovered === index
            ? "opacity-100"
            : "opacity-80"
        )}
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* Content — revealed on hover */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {/* Meta tag */}
        <span
          className={cn(
            "mb-2 inline-block self-start rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold tracking-widest uppercase",
            "bg-white/10 text-white/70 backdrop-blur-sm border border-white/10",
            "transition-all duration-300",
            hovered === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          {card.meta}
        </span>

        {/* Title */}
        <h3 className="text-base font-bold text-white leading-tight mb-1.5 line-clamp-2" style={{ letterSpacing: "-0.01em" }}>
          {card.title}
        </h3>

        {/* Description — only visible on hover */}
        <p
          className={cn(
            "text-sm text-white/65 leading-relaxed line-clamp-2 mb-3",
            "transition-all duration-300",
            hovered === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          )}
        >
          {card.description}
        </p>

        {/* CTA */}
        <Link
          href={card.href}
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-bold rounded-full px-3.5 py-1.5 w-fit",
            "transition-all duration-300",
            hovered === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ backgroundColor: "#F5A020", color: "#0e0c09" }}
        >
          Read guide
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export function FocusCards({ cards, className }: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "flex gap-3 w-full",
        "flex-col sm:flex-row",
        className
      )}
    >
      {cards.map((card, i) => (
        <Card
          key={card.id}
          card={card}
          index={i}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}

// Named alias kept for backwards compat
export { FocusCards as FocusRail };
export type { FocusCard };
