"use client"

import type { ReactNode } from 'react'
import { cn } from "@/lib/utils"
import { UploadIcon, BarChart2Icon, Share2Icon } from "lucide-react"

interface DisplayCardProps {
  step: string
  icon: ReactNode
  title: string
  description: string
  className?: string
}

function DisplayCard({ step, icon, title, description, className }: DisplayCardProps) {
  return (
    <div
      className={cn(
        "[grid-area:stack]",
        "relative w-[280px] py-5 px-5",
        "rounded-xl border border-[#EAEAEA] bg-white shadow-sm",
        "flex flex-col gap-3",
        "select-none",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span
          style={{
            fontFamily: 'Geist Mono, monospace',
            fontSize: 10,
            color: '#D4A017',
            letterSpacing: '0.15em',
            fontWeight: 600,
          }}
        >
          {step}
        </span>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 7,
            background: '#FFFDF5',
            border: '1px solid rgba(212,160,23,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </div>
      </div>
      <div>
        <p
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: 13,
            fontWeight: 600,
            color: '#171717',
            marginBottom: 4,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </p>
        <p style={{ fontSize: 11, color: '#999999', lineHeight: 1.5 }}>{description}</p>
      </div>
    </div>
  )
}

const cards = [
  {
    step: "01",
    icon: <UploadIcon className="h-3 w-3 text-[#D4A017]" />,
    title: "Upload the deck",
    description: "Drag in any pitch deck PDF. No formatting needed.",
    className: "translate-y-[14px] translate-x-[14px] -rotate-[3deg] opacity-35",
  },
  {
    step: "02",
    icon: <BarChart2Icon className="h-3 w-3 text-[#D4A017]" />,
    title: "Review the analysis",
    description: "Six scoring dimensions. About 30 seconds.",
    className: "translate-y-[7px] translate-x-[7px] -rotate-[1.5deg] opacity-65",
  },
  {
    step: "03",
    icon: <Share2Icon className="h-3 w-3 text-[#D4A017]" />,
    title: "Share the memo",
    description: "Investment memo ready for your partner meeting.",
    className: "",
  },
]

export function DisplayCards({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center py-12", className)}>
      <div className="grid [grid-template-areas:'stack'] place-items-center">
        {cards.map((card, i) => (
          <DisplayCard key={i} {...card} />
        ))}
      </div>
    </div>
  )
}