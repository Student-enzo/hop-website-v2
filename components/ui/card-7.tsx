"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface InteractiveTravelCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  excerpt: string;
  href: string;
  className?: string;
}

export const InteractiveTravelCard = React.forwardRef<
  HTMLDivElement,
  InteractiveTravelCardProps
>(({ title, subtitle, imageUrl, excerpt, href, className }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 15, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 15, stiffness: 150 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

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
      className={cn("w-72 cursor-pointer", className)}
    >
      {/* Card body */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileHover={{
          scale: 1.01,
          boxShadow: "0 35px 60px -15px rgba(0,0,0,0.7)",
          borderColor: "rgba(255,255,255,0.18)",
        }}
        className="flex flex-col gap-3 overflow-hidden rounded-3xl border border-white/8 bg-black/80 p-2.5 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-sm"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Top row — icon + arrow link */}
        <motion.div
          className="flex items-center justify-between px-1.5 pt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{ transform: "translateZ(20px)" }}
        >
          {/* HOP location pin icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" opacity={0.9}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>

          {/* Arrow button */}
          <motion.div
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(245,160,32,0.6)" }}
            whileTap={{ scale: 0.95 }}
            style={{ transform: "translateZ(30px)" }}
          >
            <Link
              href={href}
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: "#F5A020" }}
              aria-label={`Read ${title}`}
            >
              <ArrowUpRight className="h-5 w-5 text-black" strokeWidth={2.5} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-center text-3xl font-black uppercase leading-tight tracking-tight"
          style={{
            background: "linear-gradient(135deg, #F5A020 0%, #f0c060 50%, #F5A020 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            transform: "translateZ(25px)",
          }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          {title}
        </motion.h3>

        {/* Framed image */}
        <motion.div
          className="relative overflow-hidden rounded-2xl"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ transform: "translateZ(15px)" }}
        >
          {/* Blurred background glow */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl opacity-20">
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full scale-150 object-cover blur-md"
            />
          </div>
          {/* Main image */}
          <motion.img
            src={imageUrl}
            alt={title}
            className="relative z-10 w-full rounded-2xl object-cover shadow-lg"
            style={{ height: 200 }}
            animate={{ scale: isHovered ? 1.04 : 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Excerpt */}
        <motion.p
          className="px-1 pb-1 text-center text-xs font-light leading-relaxed text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          style={{ transform: "translateZ(10px)" }}
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
