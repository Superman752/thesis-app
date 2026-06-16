"use client"
import { cn } from "@/lib/utils"

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
}

export function InteractiveHoverButton({ className, children, href, ...props }: InteractiveHoverButtonProps) {
  const inner = (
    <button
      className={cn(
        "group relative flex cursor-pointer items-center justify-center rounded-lg border px-6 py-3 text-sm font-medium transition-all duration-300",
        "border-white/20 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/5",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
  if (href) return <a href={href}>{inner}</a>
  return inner
}
