import { cn } from "@/lib/utils"
import { ArrowRightIcon } from "lucide-react"

export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("grid grid-cols-3 gap-4 auto-rows-[18rem]", className)}>
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
        "bg-white border border-[#EAEAEA]",
        "shadow-sm hover:shadow-md transition-shadow duration-300",
        className
      )}
    >
      <div className="absolute inset-0">{background}</div>
      <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300 group-hover:translate-y-[-4px]">
        <Icon className="h-5 w-5 text-[#D4A017]" />
        <h3 className="text-base font-semibold text-[#171717]">{name}</h3>
        <p className="text-sm text-[#666666] leading-relaxed">{description}</p>
      </div>
      <div className="z-10 flex items-center p-4 pt-0">
        <a
          href={href}
          className="flex items-center gap-1 text-xs font-medium text-[#D4A017] hover:text-[#B8860B] transition-colors"
        >
          {cta}
          <ArrowRightIcon className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}
