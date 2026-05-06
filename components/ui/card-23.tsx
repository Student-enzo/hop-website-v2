"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ArticleCardProps {
  tag: string;
  date: { month: string; day: number };
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  location: { city: string; country: string };
  className?: string;
}

const cardVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  hover: { y: -5, scale: 1.02 },
};

const imageVariants: Variants = {
  hover: { scale: 1.08 },
};

const ArticleCard = React.forwardRef<HTMLDivElement, ArticleCardProps>(
  ({ className, tag, date, title, description, imageUrl, imageAlt, location }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1a1810] text-[#f0ede8] shadow-sm cursor-pointer",
        className
      )}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ duration: 0.3, ease: "easeInOut" as const }}
    >
      <div className="p-5">
        <header className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-[#222018] px-3 py-1 text-xs font-medium text-[#8a8070]">
            {tag}
          </span>
          <div className="flex items-center text-xs font-semibold">
            <span className="rounded-l-md bg-[#222018] px-2.5 py-1.5 text-[#8a8070]">
              {date.month.toUpperCase()}
            </span>
            <span className="rounded-r-md bg-[#F5A020] px-2.5 py-1.5 text-[#0e0c09]">
              {date.day}
            </span>
          </div>
        </header>

        <main className="space-y-2">
          <h3 className="text-lg font-bold tracking-tight leading-snug">{title}</h3>
          <p className="text-sm text-[#8a8070] leading-relaxed">{description}</p>
        </main>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover"
          variants={imageVariants}
          transition={{ duration: 0.4, ease: "easeOut" as const }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 flex items-center gap-2 p-4 text-white">
          <MapPin className="h-3.5 w-3.5 text-[#F5A020]" />
          <div>
            <p className="text-sm font-semibold leading-tight">{location.city}</p>
            <p className="text-xs text-white/70">{location.country}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
);
ArticleCard.displayName = "ArticleCard";

export { ArticleCard };
