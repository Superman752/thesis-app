"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useMemo, useState } from "react"

export function AnimatedList({
  className,
  children,
  delay = 1000,
}: {
  className?: string
  children: React.ReactNode
  delay?: number
}) {
  const [index, setIndex] = useState(0)
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % childrenArray.length)
    }, delay)
    return () => clearInterval(interval)
  }, [childrenArray.length, delay])

  const itemsToShow = useMemo(
    () => childrenArray.slice(0, index + 1).reverse(),
    [index, childrenArray]
  )

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <AnimatePresence>
        {itemsToShow.map((item) => (
          <AnimatedListItem key={(item as React.ReactElement).key}>
            {item}
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  )
}

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }
  return (
    <motion.div {...animations} layout>
      {children}
    </motion.div>
  )
}
