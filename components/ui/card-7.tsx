"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InteractiveTravelCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  actionText: string;
  href: string;
  onActionClick: () => void;
  className?: string;
}

export const InteractiveTravelCard = React.forwardRef<
  HTMLDivElement,
  InteractiveTravelCardProps
>(
  (
    { title, subtitle, imageUrl, actionText, href, onActionClick, className },
    ref
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const { width, height, left, top } = rect;
      mouseX.set((e.clientX - left) / width - 0.5);
      mouseY.set((e.clientY - top) / height - 0.5);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "relative h-[26rem] w-80 rounded-3xl bg-black shadow-2xl overflow-hidden",
          className
        )}
      >
        <div
          style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
          className="absolute inset-3 grid h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] grid-rows-[1fr_auto] rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Background Image */}
          <img
            src={imageUrl}
            alt={`${title}, ${subtitle}`}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Darkening overlay */}
          <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/20 via-transparent to-black/60" />

          {/* Card Content */}
          <div className="relative flex flex-col justify-between rounded-xl p-4 text-white">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <motion.h2
                  style={{ transform: "translateZ(50px)" }}
                  className="text-xl font-bold leading-tight line-clamp-3"
                >
                  {title}
                </motion.h2>
                <motion.p
                  style={{ transform: "translateZ(40px)" }}
                  className="text-xs font-light text-white/75 mt-0.5"
                >
                  {subtitle}
                </motion.p>
              </div>
              <motion.a
                href={href}
                whileHover={{ scale: 1.1, rotate: "2.5deg" }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Read more about ${title}`}
                style={{ transform: "translateZ(60px)" }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm ring-1 ring-inset ring-white/40 transition-colors hover:bg-white/35"
              >
                <ArrowUpRight className="h-5 w-5 text-white" />
              </motion.a>
            </div>

            {/* Footer Button */}
            <motion.button
              onClick={onActionClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ transform: "translateZ(40px)" }}
              className="w-full rounded-lg py-3 text-center font-semibold text-white transition-colors bg-white/10 backdrop-blur-md ring-1 ring-inset ring-white/20 hover:bg-white/20"
            >
              {actionText}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }
);
InteractiveTravelCard.displayName = "InteractiveTravelCard";

// Category accent colors — used by blog page
export const CATEGORY_ACCENT: Record<string, string> = {
  "Nassau Travel Guide": "#F5A020",
  Features: "#3aad6e",
  Tips: "#60a5fa",
  "Group Travel": "#a78bfa",
  Safety: "#E84040",
};
