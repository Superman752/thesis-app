"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { DatabaseIcon, TargetIcon, ZapIcon, NetworkIcon, CalendarCheckIcon, HistoryIcon } from "lucide-react"

const reasons = [
  {
    Icon: DatabaseIcon,
    title: "Institutional Memory",
    description: "Every memo, score, and decision lives in one searchable workspace. Nothing leaves when an analyst does.",
  },
  {
    Icon: TargetIcon,
    title: "Thesis Fit Scoring",
    description: "Deals scored against your fund's actual investment criteria, not a generic checklist.",
  },
  {
    Icon: ZapIcon,
    title: "Built for Deal Velocity",
    description: "Structured analysis and a partner ready memo in under 30 seconds, every time.",
  },
  {
    Icon: NetworkIcon,
    title: "Firm-Wide Intelligence",
    description: "A growing database of every company you've evaluated, searchable by sector, stage, and outcome.",
  },
  {
    Icon: CalendarCheckIcon,
    title: "Meeting Preparation",
    description: "Founder summaries and discussion points ready before every call, pulled from prior analysis.",
  },
  {
    Icon: HistoryIcon,
    title: "Decision Tracking",
    description: "See why a deal was passed on or pursued, months later, without digging through old emails.",
  },
]

function TiltCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="group rounded-xl border border-[#EAEAEA] bg-white p-6 hover:border-[#D4A017]/30 hover:shadow-md transition-shadow"
    >
      <motion.div
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFFDF5] mb-3"
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
        style={{
          transform: `translateZ(20px) rotate(${rotate.y * 0.5}deg)`,
        }}
      >
        <reason.Icon className="h-4 w-4 text-[#D4A017]" />
      </motion.div>
      <h3 className="text-sm font-semibold text-[#171717] mb-1.5">{reason.title}</h3>
      <p className="text-xs text-[#666] leading-relaxed">{reason.description}</p>
    </motion.div>
  )
}

export function WhyThesis() {
  return (
    <section className="py-24 px-6 bg-white border-y border-[#EAEAEA]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#666] mb-3">
            Why venture firms choose Thesis
          </p>
          <h2 className="text-3xl font-bold text-[#171717]">
            Every investment decision. One workspace.
          </h2>
          <p className="text-[#666] mt-3 max-w-lg mx-auto">
            Not a one-off tool for reading a deck. A system your whole firm uses on every deal, every week.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reasons.map((r, i) => (
            <TiltCard key={r.title} reason={r} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a href="/why-thesis" className="text-sm font-medium text-[#D4A017] hover:text-[#B8860B] transition-colors">
            See the full case for Thesis
          </a>
        </motion.div>
      </div>
    </section>
  )
}