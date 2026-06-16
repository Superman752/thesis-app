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
  pulseColor = "#EAB308",
  duration = "1.8s",
  href,
  ...props
}: PulsatingButtonProps) {
  const inner = (
    <button
      className={cn(
        "relative flex cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-black bg-[#EAB308]",
        className
      )}
      style={{ "--pulse-color": pulseColor, "--duration": duration } as React.CSSProperties}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      <div
        className="absolute inset-0 rounded-lg animate-ping opacity-20"
        style={{ backgroundColor: pulseColor, animationDuration: duration }}
      />
    </button>
  )
  if (href) return <a href={href}>{inner}</a>
  return inner
}
