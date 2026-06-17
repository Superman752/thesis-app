"use client"
import { cn } from "@/lib/utils"

interface PulsatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string
  duration?: string
  href?: string
}

export function PulsatingButton({
  className,
  children,
  pulseColor = "#D4A017",
  duration = "1.8s",
  href,
  ...props
}: PulsatingButtonProps) {
  const inner = (
    <button
      className={cn(
        "relative flex cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white bg-[#D4A017] hover:bg-[#B8860B] transition-colors",
        className
      )}
      style={{ "--pulse-color": pulseColor, "--duration": duration } as React.CSSProperties}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      <div
        className="absolute inset-0 rounded-lg animate-ping opacity-10"
        style={{ backgroundColor: pulseColor, animationDuration: duration }}
      />
    </button>
  )
  if (href) return <a href={href}>{inner}</a>
  return inner
}
