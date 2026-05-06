import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock } from "lucide-react";

interface TravelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  imageAlt: string;
  logo?: React.ReactNode;
  title: string;
  location: string;
  overview: string;
  readTime: string;
  date: string;
  href: string;
  accentColor?: string;
}

const TravelCard = React.forwardRef<HTMLDivElement, TravelCardProps>(
  (
    {
      className,
      imageUrl,
      imageAlt,
      logo,
      title,
      location,
      overview,
      readTime,
      date,
      href,
      accentColor = "#F5A020",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg",
          "transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2",
          className
        )}
        style={{ minHeight: 380 }}
        {...props}
      >
        {/* Background Image with Zoom Effect on Hover */}
        <img
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

        {/* Content Container */}
        <div className="relative flex h-full flex-col justify-between p-5 text-card-foreground" style={{ minHeight: 380 }}>
          {/* Top Section: Logo / Category Pill */}
          <div className="flex items-start">
            {logo ? (
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/50 bg-black/20 backdrop-blur-sm">
                {logo}
              </div>
            ) : (
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide backdrop-blur-sm"
                style={{
                  backgroundColor: `${accentColor}25`,
                  border: `1px solid ${accentColor}50`,
                  color: accentColor,
                }}
              >
                {location}
              </span>
            )}
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-3">
            {/* Meta row */}
            <div className="flex items-center gap-2 text-white/60 text-xs">
              <Clock className="h-3 w-3" />
              <span>{readTime}</span>
              <span className="opacity-40">·</span>
              <span>{date}</span>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold leading-tight text-white line-clamp-2" style={{ letterSpacing: "-0.01em" }}>
              {title}
            </h3>

            {/* Overview */}
            <p className="text-sm leading-relaxed text-white/65 line-clamp-2">
              {overview}
            </p>

            {/* Price row → "Read guide" CTA */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-baseline gap-1">
                <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: accentColor }} />
                <span className="text-xs font-semibold" style={{ color: accentColor }}>
                  Nassau, Bahamas
                </span>
              </div>
              <Button
                asChild
                size="sm"
                className="rounded-full text-xs font-bold px-4"
                style={{ backgroundColor: accentColor, color: "#0e0c09" }}
              >
                <Link href={href}>
                  Read guide
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TravelCard.displayName = "TravelCard";

export { TravelCard };

// ─── Category color map ────────────────────────────────────────────────────────
export const CATEGORY_ACCENT: Record<string, string> = {
  "Nassau Travel Guide": "#F5A020",
  Features: "#3aad6e",
  Tips: "#60a5fa",
  "Group Travel": "#a78bfa",
  Safety: "#E84040",
};
