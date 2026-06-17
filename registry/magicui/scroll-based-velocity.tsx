"use client"

import { useRef } from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollVelocityRowProps {
  children: React.ReactNode
  baseVelocity?: number
  direction?: 1 | -1
  className?: string
}

export function ScrollVelocityRow({
  children,
  baseVelocity = 3,
  direction = 1,
  className,
}: ScrollVelocityRowProps) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })
  const directionFactor = useRef<number>(direction)

  // Wrap cleanly within a single copy's width (-25% to 0, since we render 4 copies)
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)

  function wrap(min: number, max: number, v: number) {
    const range = max - min
    const mod = (((v - min) % range) + range) % range
    return mod + min
  }

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) directionFactor.current = -1 * direction
    else if (velocityFactor.get() > 0) directionFactor.current = direction
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
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
