"use client"

import * as React from "react"
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion"
import { cn } from "@/lib/utils"

interface CardStickyProps extends HTMLMotionProps<"div"> {
  arrayLength: number
  index: number
  incrementY?: number
  incrementZ?: number
  incrementRotation?: number
  variant?: "dark" | "light"
}

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined)

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (!context) throw new Error("Must be inside ContainerScroll")
  return context
}

export const ContainerScroll: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children, style, className, ...props
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start center", "end end"],
  })
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-svh w-full", className)}
        style={{ perspective: "1000px", ...style }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}

export const CardsContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children, className, ...props
}) => (
  <div
    className={cn("relative", className)}
    style={{ perspective: "1000px", ...props.style }}
    {...props}
  >
    {children}
  </div>
)

export const CardTransformed = React.forwardRef<HTMLDivElement, CardStickyProps>(
  ({
    arrayLength,
    index,
    incrementY = 10,
    incrementZ = 10,
    incrementRotation,
    variant = "dark",
    className,
    style,
    ...props
  }, ref) => {
    const rotation = incrementRotation ?? (-index + 90)
    const { scrollYProgress } = useContainerScrollContext()

    const start = index / (arrayLength + 1)
    const end = (index + 1) / (arrayLength + 1)
    const range = React.useMemo(() => [start, end], [start, end])
    const rotateRange = [range[0] - 1.5, range[1] / 1.5]

    const y = useTransform(scrollYProgress, range, ["0%", "-180%"])
    const rotate = useTransform(scrollYProgress, rotateRange, [rotation, 0])
    const transform = useMotionTemplate`translateZ(${index * incrementZ}px) translateY(${y}) rotate(${rotate}deg)`

    const dx = useTransform(scrollYProgress, rotateRange, [4, 0])
    const dy = useTransform(scrollYProgress, rotateRange, [4, 12])
    const blur = useTransform(scrollYProgress, rotateRange, [2, 24])
    const alpha = useTransform(scrollYProgress, rotateRange, [0.15, 0.2])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const filter = variant === "light"
      ? useMotionTemplate`drop-shadow(${dx}px ${dy}px ${blur}px rgba(0,0,0,${alpha}))`
      : "none"

    const baseClass = variant === "dark"
      ? "absolute will-change-transform flex size-full flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-[#1e1c14]/80 p-6 backdrop-blur-md"
      : "absolute will-change-transform flex size-full flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-[#222018]/80 p-6 backdrop-blur-md"

    return (
      <motion.div
        layout="position"
        ref={ref}
        style={{
          top: index * incrementY,
          transform,
          backfaceVisibility: "hidden",
          zIndex: (arrayLength - index) * incrementZ,
          filter,
          ...style,
        }}
        className={cn(baseClass, className)}
        {...props}
      />
    )
  }
)
CardTransformed.displayName = "CardTransformed"

interface ReviewStarsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
  maxRating?: number
}

export const ReviewStars = React.forwardRef<HTMLDivElement, ReviewStarsProps>(
  ({ rating, maxRating = 5, className, ...props }, ref) => {
    const filled = Math.floor(rating)
    const frac = rating - filled
    const empty = maxRating - filled - (frac > 0 ? 1 : 0)
    const starPath = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"
    return (
      <div ref={ref} className={cn("flex items-center gap-1", className)} {...props}>
        {[...Array(filled)].map((_, i) => (
          <svg key={`f${i}`} className="size-4" fill="#F5A020" viewBox="0 0 20 20"><path d={starPath} /></svg>
        ))}
        {frac > 0 && (
          <svg className="size-4" fill="#F5A020" viewBox="0 0 20 20">
            <defs><linearGradient id="frac-grad"><stop offset={`${frac * 100}%`} stopColor="#F5A020" /><stop offset={`${frac * 100}%`} stopColor="rgba(138,128,112,0.3)" /></linearGradient></defs>
            <path d={starPath} fill="url(#frac-grad)" />
          </svg>
        )}
        {[...Array(empty)].map((_, i) => (
          <svg key={`e${i}`} className="size-4" fill="rgba(138,128,112,0.3)" viewBox="0 0 20 20"><path d={starPath} /></svg>
        ))}
      </div>
    )
  }
)
ReviewStars.displayName = "ReviewStars"
