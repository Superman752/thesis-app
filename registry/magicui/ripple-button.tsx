"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string
  duration?: string
  href?: string
}

export function RippleButton({
  className,
  children,
  rippleColor = "rgba(255,255,255,0.5)",
  duration = "600ms",
  href,
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; key: number }[]>([])

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const key = Date.now()
    setRipples((prev) => [...prev, { x, y, key }])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.key !== key)), parseInt(duration))
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e)
    onClick?.(e)
  }

  const button = (
    <button
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#D4A017] hover:bg-[#B8860B] text-white font-semibold px-6 py-3 text-sm transition-colors",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
        {children}
      </span>
      {ripples.map((r) => (
        <span
          key={r.key}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: r.x,
            top: r.y,
            width: 10,
            height: 10,
            backgroundColor: rippleColor,
            transform: "translate(-50%, -50%)",
            animation: `ripple-effect ${duration} ease-out`,
          }}
        />
      ))}
      <style>{`
        @keyframes ripple-effect {
          to { width: 500px; height: 500px; opacity: 0; }
        }
      `}</style>
    </button>
  )

  if (href) return <a href={href} className="inline-block">{button}</a>
  return button
}
