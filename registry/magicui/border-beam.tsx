"use client"

import { useEffect, useRef } from "react"
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
  size = 100,
  duration = 8,
  colorFrom = "#EAB308",
  colorTo = "#ffffff",
}: BorderBeamProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}
      style={
        {
          "--size": size,
          "--duration": duration,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-[1px] rounded-[inherit]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, var(--color-from) 10%, var(--color-to) 20%, transparent 30%)`,
          animation: `border-beam-spin calc(var(--duration) * 1s) linear infinite`,
          WebkitMaskImage: `linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: `xor`,
          maskComposite: `exclude`,
        }}
      />
      <style>{`
        @keyframes border-beam-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
