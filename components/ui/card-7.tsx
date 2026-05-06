"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Map, Zap, Lightbulb, Users, ShieldCheck, Compass } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Per-category icon
function CategoryIcon({ category }: { category: string }) {
  const cls = "h-5 w-5 text-white/80";
  switch (category) {
    case "Features":       return <Zap className={cls} />;
    case "Tips":           return <Lightbulb className={cls} />;
    case "Group Travel":   return <Users className={cls} />;
    case "Safety":         return <ShieldCheck className={cls} />;
    case "Nassau Travel Guide": return <Map className={cls} />;
    default:               return <Compass className={cls} />;
  }
}

export interface InteractiveTravelCardProps {
  title: string;
  category: string;
  imageUrl: string;
  excerpt: string;
  href: string;
  className?: string;
}

export const InteractiveTravelCard = React.forwardRef<
  HTMLDivElement,
  InteractiveTravelCardProps
>(({ title, category, imageUrl, excerpt, href, className }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 18, stiffness: 140 });
  const springY = useSpring(mouseY, { damping: 18, stiffness: 140 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("w-64 shrink-0 cursor-pointer", className)}
    >
      <motion.div
        whileHover={{
          boxShadow: "0 32px 56px -12px rgba(0,0,0,0.75)",
          borderColor: "rgba(255,255,255,0.15)",
        }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-3 overflow-hidden rounded-3xl border border-white/6 bg-black/85 p-3 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55)] backdrop-blur-sm"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Top row */}
        <div
          className="flex items-center justify-between px-1"
          style={{ transform: "translateZ(18px)" }}
        >
          <CategoryIcon category={category} />
          <motion.div
            whileHover={{ scale: 1.12, boxShadow: "0 0 14px rgba(245,160,32,0.55)" }}
            whileTap={{ scale: 0.92 }}
            style={{ transform: "translateZ(28px)" }}
          >
            <Link
              href={href}
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: "#F5A020" }}
              aria-label={`Read ${title}`}
            >
              <ArrowUpRight className="h-4 w-4 text-black" strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h3
          className="px-1 text-center text-[15px] font-bold leading-snug tracking-[-0.01em] line-clamp-3"
          style={{ color: "#F5A020", transform: "translateZ(22px)" }}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
        >
          {title}
        </motion.h3>

        {/* Framed image */}
        <motion.div
          className="relative overflow-hidden rounded-2xl"
          style={{ height: 168, transform: "translateZ(14px)" }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.55 }}
        >
          {/* Blurred glow behind */}
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full scale-150 object-cover blur-lg opacity-25"
          />
          {/* Main image */}
          <motion.img
            src={imageUrl}
            alt={title}
            className="relative z-10 h-full w-full rounded-2xl object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Excerpt */}
        <motion.p
          className="px-1 pb-1 text-center text-[11px] leading-relaxed text-neutral-500 line-clamp-3"
          style={{ transform: "translateZ(10px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.45 }}
        >
          {excerpt}
        </motion.p>
      </motion.div>
    </motion.div>
  );
});

InteractiveTravelCard.displayName = "InteractiveTravelCard";

export const CATEGORY_ACCENT: Record<string, string> = {
  "Nassau Travel Guide": "#F5A020",
  Features: "#3aad6e",
  Tips: "#60a5fa",
  "Group Travel": "#a78bfa",
  Safety: "#E84040",
};
