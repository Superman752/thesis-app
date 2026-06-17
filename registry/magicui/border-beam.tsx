"use client"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  colorFrom?: string
  colorTo?: string
}

export function BorderBeam({
  className,
  duration = 8,
  colorFrom = "#D4A017",
  colorTo = "#ffffff",
}: BorderBeamProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}
      style={{ "--duration": duration } as React.CSSProperties}
    >
      {/* A thin gradient ring: a conic gradient clipped to the border via a
          padding-box / border-box double mask, spinning so the bright arc
          travels around the edge. Masked to the border so it never fills
          (or "blobs" over) the card interior. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "1.5px",
          background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 40deg, ${colorTo} 70deg, transparent 110deg)`,
          animation: `border-beam-spin calc(var(--duration) * 1s) linear infinite`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      />
    </div>
  )
}
