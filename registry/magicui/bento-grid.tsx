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
    <div className={cn("grid grid-cols-3 gap-4 auto-rows-[16rem]", className)}>
      {children}
    </div>
  )
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string
  className?: string
  background: React.ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-white border border-[#EAEAEA] shadow-sm",
        "transition-all duration-300 hover:shadow-md hover:border-[#D4A017]/30",
        className
      )}
    >
      {/* Background layer — sits at top, fades to white at bottom */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 z-0">{background}</div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
      </div>

      {/* Foreground content — always at bottom, always readable */}
      <div className="relative z-20 mt-auto p-5 pt-0">
        <Icon className="h-5 w-5 text-[#D4A017] mb-2" />
        <h3 className="text-sm font-semibold text-[#171717] mb-0.5">{name}</h3>
        <p className="text-xs text-[#666666] leading-relaxed mb-3">{description}</p>
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
