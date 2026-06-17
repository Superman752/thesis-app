"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface NumberTickerProps {
  value: number
  className?: string
  duration?: number
  delay?: number
}

export function NumberTicker({
  value,
  className,
  duration = 1200,
  delay = 0,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [current, setCurrent] = useState(0)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isInView || hasStarted.current) return
    hasStarted.current = true

    const timeout = setTimeout(() => {
      const startTime = performance.now()
      const tick = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const next = Math.round(eased * value)
        setCurrent(next)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)

    return () => clearTimeout(timeout)
  }, [isInView, value, duration, delay])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {current}
    </span>
  )
}
