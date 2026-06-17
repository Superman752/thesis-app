"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypingAnimationProps {
  children: string
  className?: string
  duration?: number
  delay?: number
}

export function TypingAnimation({
  children,
  className,
  duration = 50,
  delay = 0,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayedText === children) return

    const timeout = setTimeout(() => {
      setDisplayedText(children.slice(0, displayedText.length + 1))
    }, duration)

    return () => clearTimeout(timeout)
  }, [started, displayedText, children, duration])

  return (
    <span className={cn("inline", className)}>
      {displayedText}
      {displayedText !== children && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}
