"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  FileTextIcon,
  BarChart2Icon,
  ShieldAlertIcon,
  UsersIcon,
  ZapIcon,
  BrainIcon,
} from "lucide-react"
import SiteNavbar from "@/components/SiteNavbar"
import SiteFooter from "@/components/SiteFooter"
import { NumberTicker } from "@/registry/magicui/number-ticker"
import { BentoGrid, BentoCard } from "@/registry/magicui/bento-grid"

const stats = [
  { value: 50, suffix: "+", label: "decks per week", sub: "at a typical early-stage VC firm" },
  { value: 45, suffix: " min", label: "per deck", sub: "spent on extraction, notes, and write-ups" },
  { value: 0, suffix: " tools", label: "built for this", sub: "built specifically for analyst-level deal triage, until now" },
]

const features = [
  {
    Icon: BarChart2Icon,
    name: "Deal Pipeline",
    description: "Kanban and table views for your full pipeline. Drag deals between stages, sort by score, and see red flag counts at a glance.",
    href: "/login",
    cta: "View pipeline",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 p-6 pt-12 opacity-60 group-hover:opacity-80 transition-opacity">
        <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-3 text-xs font-mono space-y-2">
          {[
            { name: "Conduit", stage: "Series A", score: "9.1", status: "Active Diligence", color: "bg-[#D4A017]" },
            { name: "Flux", stage: "Seed", score: "8.2", status: "Under Review", color: "bg-blue-400" },
            { name: "Harbr", stage: "Series A", score: "7.6", status: "Meeting Scheduled", color: "bg-purple-400" },
            { name: "Tempo", stage: "Pre-seed", score: "6.1", status: "New", color: "bg-gray-300" },
          ].map((deal) => (
            <div key={deal.name} className="flex items-center justify-between rounded border border-[#EAEAEA] bg-white px-3 py-2">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${deal.color}`} />
                <span className="font-medium text-[#171717]">{deal.name}</span>
                <span className="text-[#999]">{deal.stage}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#D4A017]">{deal.score}</span>
                <span className="rounded-full bg-[#FAFAFA] border border-[#EAEAEA] px-2 py-0.5 text-[#666]">{deal.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: BrainIcon,
    name: "Thesis Fit Scoring",
    description: "Deals scored against your firm’s investment criteria, weighted by what matters to you. Configurable per fund.",
    href: "/login",
    cta: "See scoring",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-70 transition-opacity">
        <div className="text-center">
          <div className="text-6xl font-bold text-[#D4A017]">9.1</div>
          <div className="text-xs text-[#666] mt-1">Thesis Fit Score</div>
          <div className="mt-3 space-y-1 text-left px-4">
            {["Market Size", "Team", "Traction", "Stage Fit"].map((label, i) => (
              <div key={label} className="flex items-center gap-2 text-xs">
                <span className="w-16 text-[#666]">{label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-[#EAEAEA]">
                  <div className="h-full rounded-full bg-[#D4A017]" style={{ width: `${[100, 100, 90, 80][i]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: FileTextIcon,
    name: "Investment Memo Generation",
    description: "One-page internal memo written to sound like a human analyst. Structured for partner meetings, ready in seconds.",
    href: "/login",
    cta: "See an example",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 p-4 pt-10 opacity-50 group-hover:opacity-70 transition-opacity overflow-hidden">
        <div className="space-y-2 text-xs text-[#666] font-mono">
          <div className="font-semibold text-[#171717]">INVESTMENT MEMO — CONDUIT</div>
          <div className="text-[#D4A017]">RECOMMENDATION: PURSUE</div>
          <div className="border-t border-[#EAEAEA] pt-2 space-y-1">
            <div><span className="text-[#171717] font-medium">Market:</span> $4.3B TAM, 112% YoY</div>
            <div><span className="text-[#171717] font-medium">Team:</span> 2x founders, prior exits</div>
            <div><span className="text-[#171717] font-medium">Risks:</span> Regulatory, 3 flagged</div>
            <div><span className="text-[#171717] font-medium">Ask:</span> $8M Series A</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: ShieldAlertIcon,
    name: "AI Authorship Detection",
    description: "Flag AI-generated decks before you spend diligence time on them. Section-level scoring with flagged excerpts.",
    href: "/login",
    cta: "See detection",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-70 transition-opacity">
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-[#171717]">8%</div>
          <div className="text-xs text-[#666]">AI-generated content</div>
          <div className="text-xs text-green-600 font-medium">{"✓"} Likely human-authored</div>
        </div>
      </div>
    ),
  },
  {
    Icon: ZapIcon,
    name: "Automated Red Flags",
    description: "Solo founder, missing revenue model, unsourced market claims. Surfaced automatically, every time.",
    href: "/login",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 p-4 pt-10 opacity-50 group-hover:opacity-70 transition-opacity space-y-2">
        {["Solo founder, no co-founder listed", "Market size unsourced", "No revenue model stated"].map((flag) => (
          <div key={flag} className="flex items-start gap-2 text-xs">
            <span className="text-red-500 mt-0.5">{"⚠"}</span>
            <span className="text-[#666]">{flag}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    Icon: UsersIcon,
    name: "Team Pipeline & Sharing",
    description: "Share deals with your team, message colleagues inside the app, and track who’s looking at what.",
    href: "/login",
    cta: "View plans",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-end p-4 pb-10 opacity-50 group-hover:opacity-70 transition-opacity">
        <div className="flex -space-x-2">
          {["A", "B", "C", "D"].map((l) => (
            <div key={l} className="h-7 w-7 rounded-full bg-[#D4A017] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
              {l}
            </div>
          ))}
          <div className="h-7 w-7 rounded-full bg-[#EAEAEA] border-2 border-white flex items-center justify-center text-[#666] text-xs">
            +3
          </div>
        </div>
      </div>
    ),
  },
]

export default function FeaturesPage() {
  return (
    <div style={{ background: "#FFFFFF", color: "#171717", fontFamily: "Geist, sans-serif" }} className="min-h-screen">
      <SiteNavbar />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-medium tracking-[0.2em] uppercase text-[#666] mb-4"
        >
          What you get
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl font-bold text-[#171717] mb-4"
        >
          The complete analyst stack.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-[#666] max-w-xl mx-auto"
        >
          Everything a VC analyst needs, minus the four hours of prep work.
        </motion.p>
      </section>

      {/* Animated Stats */}
      <section className="pb-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-3 divide-x divide-[#EAEAEA] border border-[#EAEAEA] rounded-xl bg-[#FAFAFA]">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-8 text-center"
            >
              <div className="text-4xl font-bold text-[#171717] mb-1 flex items-center justify-center gap-0.5">
                <NumberTicker value={s.value} />
                <span>{s.suffix}</span>
              </div>
              <div className="text-sm font-medium text-[#171717] mb-1">{s.label}</div>
              <div className="text-xs text-[#999]">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bento Grid */}
      <section className="pb-24 px-6 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold text-[#171717] mb-8"
        >
          Every analyst does this manually.<br />
          <span className="text-[#666] font-normal">Nobody should have to.</span>
        </motion.h2>
        <BentoGrid>
          {features.map((f, i) => {
            const { className: colSpan, ...cardProps } = f
            return (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={colSpan}
              >
                <BentoCard {...cardProps} />
              </motion.div>
            )
          })}
        </BentoGrid>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 text-center border-t border-[#EAEAEA]">
        <h2 className="text-3xl font-bold text-[#171717] mb-4">Ready to cut your prep time?</h2>
        <p className="text-[#666] mb-8">Free to try. No credit card. No onboarding call.</p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 bg-[#D4A017] hover:bg-[#B8860B] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Start for free →
        </Link>
      </section>

      <SiteFooter />
    </div>
  )
}
