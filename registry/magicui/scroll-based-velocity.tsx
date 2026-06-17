"use client"

import { useRef } from "react"
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollVelocityRowProps {
  children: React.ReactNode
  baseVelocity?: number
  direction?: 1 | -1
  className?: string
}

export function ScrollVelocityRow({
  children,
  baseVelocity = 2.5,
  direction = 1,
  className,
}: ScrollVelocityRowProps) {
  const baseX = useMotionValue(0)
  const directionFactor = useRef<number>(direction)

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)

  function wrap(min: number, max: number, v: number) {
    const range = max - min
    const mod = (((v - min) % range) + range) % range
    return mod + min
  }

  useAnimationFrame((_, delta) => {
    const moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="flex overflow-hidden whitespace-nowrap w-full">
      <motion.div className={cn("flex whitespace-nowrap flex-shrink-0", className)} style={{ x }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="flex-shrink-0 pr-2">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

interface ScrollVelocityContainerProps {
  children: React.ReactNode
  className?: string
}

export function ScrollVelocityContainer({ children, className }: ScrollVelocityContainerProps) {
  return (
    <div className={cn("flex flex-col gap-4 overflow-hidden py-4", className)}>
      {children}
    </div>
  )
}
