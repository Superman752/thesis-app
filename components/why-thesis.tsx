"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DatabaseIcon, TargetIcon, ZapIcon, NetworkIcon, CalendarCheckIcon, HistoryIcon } from "lucide-react"

const reasons = [
  { Icon: DatabaseIcon, title: "Institutional Memory", description: "Every memo, score, and decision lives in one searchable workspace. Nothing leaves when an analyst does.", color: "#D4A017" },
  { Icon: TargetIcon, title: "Thesis Fit Scoring", description: "Deals scored against your fund's actual investment criteria, not a generic checklist.", color: "#3B82F6" },
  { Icon: ZapIcon, title: "Built for Deal Velocity", description: "Structured analysis and a partner ready memo in under 30 seconds, every time.", color: "#10B981" },
  { Icon: NetworkIcon, title: "Firm-Wide Intelligence", description: "A growing database of every company you've evaluated, searchable by sector, stage, and outcome.", color: "#8B5CF6" },
  { Icon: CalendarCheckIcon, title: "Meeting Preparation", description: "Founder summaries and discussion points ready before every call, pulled from prior analysis.", color: "#EC4899" },
  { Icon: HistoryIcon, title: "Decision Tracking", description: "See why a deal was passed on or pursued, months later, without digging through old emails.", color: "#F59E0B" },
]

function ReasonCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative overflow-hidden rounded-xl border bg-white p-6 cursor-pointer transition-shadow duration-200"
      style={{
        borderColor: hovered ? reason.color : "#EAEAEA",
        boxShadow: hovered ? `0 12px 24px -8px ${reason.color}33` : "0 1px 2px rgba(0,0,0,0.02)",
      }}
    >
      {/* Sliding accent bar */}
      <motion.div
        className="absolute top-0 left-0 h-1 rounded-tr-full"
        style={{ backgroundColor: reason.color }}
        initial={{ width: 0 }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Icon that swaps fill and scales */}
      <motion.div
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg mb-4"
        animate={{
          backgroundColor: hovered ? reason.color : "#FAFAFA",
          scale: hovered ? 1.15 : 1,
          rotate: hovered ? -6 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <motion.div
          animate={{ color: hovered ? "#FFFFFF" : reason.color }}
          transition={{ duration: 0.2 }}
        >
          <reason.Icon className="h-5 w-5" />
        </motion.div>
      </motion.div>

      <h3 className="text-sm font-semibold text-[#171717] mb-1.5">{reason.title}</h3>
      <p className="text-xs text-[#666] leading-relaxed">{reason.description}</p>

      {/* Reveal-on-hover arrow indicator */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-3 flex items-center gap-1 text-xs font-medium"
            style={{ color: reason.color }}
          >
            Learn more
            <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
              →
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function WhyThesis() {
  return (
    <section className="py-24 px-6 bg-white border-y border-[#EAEAEA]">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-center mb-14">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#666] mb-3">Why venture firms choose Thesis</p>
          <h2 className="text-3xl font-bold text-[#171717]">Every investment decision. One workspace.</h2>
          <p className="text-[#666] mt-3 max-w-lg mx-auto">Not a one-off tool for reading a deck. A system your whole firm uses on every deal, every week.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reasons.map((r, i) => <ReasonCard key={r.title} reason={r} index={i} />)}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }} className="text-center mt-12">
          <a href="/why-thesis" className="text-sm font-medium text-[#D4A017] hover:text-[#B8860B] transition-colors">See the full case for Thesis</a>
        </motion.div>
      </div>
    </section>
  )
}
