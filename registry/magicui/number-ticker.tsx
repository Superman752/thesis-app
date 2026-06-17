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
  duration = 1500,
  delay = 0,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const startTimeout = setTimeout(() => {
      const startTime = performance.now()

      const tick = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        // ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setCurrent(Math.floor(eased * value))
        if (progress < 1) requestAnimationFrame(tick)
        else setCurrent(value)
      }

      requestAnimationFrame(tick)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [isInView, value, duration, delay])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {current}
    </span>
  )
}
