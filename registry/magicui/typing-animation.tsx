"use client"

import { useEffect, useRef, useState } from "react"
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
  duration = 40,
  delay = 0,
}: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState("")
  const [started, setStarted] = useState(delay === 0)
  const indexRef = useRef(0)

  useEffect(() => {
    if (delay === 0) return
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (indexRef.current >= children.length) return
    const t = setTimeout(() => {
      indexRef.current += 1
      setDisplayed(children.slice(0, indexRef.current))
    }, duration)
    return () => clearTimeout(t)
  }, [started, displayed, children, duration])

  return (
    <span className={cn("inline", className)}>
      {displayed}
      {displayed.length < children.length && (
        <span
          className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle"
          style={{ height: "0.9em" }}
        />
      )}
    </span>
  )
}
