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
        "border-[#EAEAEA] bg-white text-[#171717] hover:border-[#D4A017]",
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
