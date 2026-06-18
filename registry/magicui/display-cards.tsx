"use client"

import { cn } from "@/lib/utils"
import { UploadIcon, SearchCheckIcon, SendIcon } from "lucide-react"

interface DisplayCardProps {
  className?: string
  icon?: React.ReactNode
  title?: string
  description?: string
  date?: string
  step?: string
}

function DisplayCard({
  className,
  icon,
  title,
  description,
  date,
  step,
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "absolute flex h-32 w-[20rem] flex-col justify-between rounded-xl border border-[#EAEAEA] bg-white px-5 py-4 shadow-sm transition-transform duration-500",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-[#D4A017] font-semibold">{step}</span>
        <span className="inline-flex items-center justify-center rounded-full bg-[#FFFDF5] p-1.5">
          {icon}
        </span>
        <p className="text-base font-semibold text-[#171717]">{title}</p>
      </div>
      <p className="text-sm text-[#666] leading-snug">{description}</p>
      <p className="text-xs text-[#999]">{date}</p>
    </div>
  )
}

export default function DisplayCards() {
  const cards = [
    {
      step: "01",
      icon: <UploadIcon className="size-4 text-[#D4A017]" />,
      title: "Upload the deck",
      description: "Drag in any pitch deck PDF",
      date: "Under 5 seconds",
      className: "z-30 -translate-x-16 -translate-y-4 -rotate-3 hover:-translate-y-6 hover:z-40",
    },
    {
      step: "02",
      icon: <SearchCheckIcon className="size-4 text-[#D4A017]" />,
      title: "Review the analysis",
      description: "Six scoring dimensions, run in parallel",
      date: "About 30 seconds",
      className: "z-20 translate-x-0 translate-y-2 rotate-0 hover:-translate-y-2 hover:z-40",
    },
    {
      step: "03",
      icon: <SendIcon className="size-4 text-[#D4A017]" />,
      title: "Share the memo",
      description: "Partner ready, exportable instantly",
      date: "One click",
      className: "z-10 translate-x-16 translate-y-8 rotate-3 hover:translate-y-2 hover:z-40",
    },
  ]

  return (
    <div className="relative h-56 w-full flex items-center justify-center">
      {cards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  )
}