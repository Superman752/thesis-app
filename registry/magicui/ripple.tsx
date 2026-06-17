"use client"

import { cn } from "@/lib/utils"

interface RippleProps {
  mainCircleSize?: number
  mainCircleOpacity?: number
  numCircles?: number
  className?: string
}

export function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
}: RippleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none",
        className
      )}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70
        const opacity = mainCircleOpacity - i * 0.025
        const animationDelay = `${i * 0.12}s`
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid"
        const borderOpacity = 10 + i * 5

        return (
          <div
            key={i}
            className="absolute inset-0 m-auto animate-ripple rounded-full border bg-[#D4A017]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderStyle,
              borderColor: `rgba(212, 160, 23, ${borderOpacity / 100})`,
              backgroundColor: `rgba(212, 160, 23, ${(mainCircleOpacity - i * 0.03) / 4})`,
            }}
          />
        )
      })}
    </div>
  )
}
