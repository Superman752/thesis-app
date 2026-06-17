import { cn } from "@/lib/utils"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("grid grid-cols-3 gap-4", className)}>
      {children}
    </div>
  )
}

export function BentoCard({
  name,
  className,
  visual,
  description,
  href,
  cta,
}: {
  name: string
  className?: string
  visual: React.ReactNode
  description: string
  href: string
  cta: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl bg-white border border-[#EAEAEA] shadow-sm",
        "transition-all duration-300 hover:shadow-md hover:border-[#D4A017]/30",
        className
      )}
    >
      {/* Visual zone — fixed height, normal flow, never overlaps text below */}
      <div className="relative h-40 w-full overflow-hidden bg-[#FAFAFA] border-b border-[#EAEAEA]">
        {visual}
      </div>

      {/* Text zone — always below the visual, never behind it */}
      <div className="flex flex-col p-5 flex-1">
        <div className="h-0.5 w-8 bg-[#D4A017] mb-3" />
        <h3 className="text-sm font-semibold text-[#171717] mb-1">{name}</h3>
        <p className="text-xs text-[#666666] leading-relaxed mb-3 flex-1">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#D4A017] hover:text-[#B8860B] transition-colors"
        >
          {cta}
          <ArrowRightIcon className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}
