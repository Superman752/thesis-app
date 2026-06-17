"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  BarChart2Icon,
  BrainIcon,
  FileTextIcon,
  ShieldAlertIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react"
import { FileTextIcon as RadixFileIcon } from "@radix-ui/react-icons"
import { BentoCard, BentoGrid } from "@/registry/magicui/bento-grid"
import { AnimatedList, AnimatedListItem } from "@/registry/magicui/animated-list"
import { NumberTicker } from "@/registry/magicui/number-ticker"
import { Marquee } from "@/registry/magicui/marquee"
import SiteNavbar from "@/components/SiteNavbar"
import SiteFooter from "@/components/SiteFooter"

const deals = [
  { name: "Conduit", stage: "Series A", score: "9.1", color: "bg-[#D4A017]" },
  { name: "Flux", stage: "Seed · B2B SaaS", score: "8.2", color: "bg-blue-400" },
  { name: "Harbr", stage: "Series A · Climate", score: "7.6", color: "bg-purple-400" },
  { name: "Tempo", stage: "Pre-seed · Health", score: "6.1", color: "bg-gray-300" },
  { name: "Nova", stage: "Seed · AI Infra", score: "8.8", color: "bg-green-400" },
]

const pdfFiles = [
  { name: "conduit-deck.pdf", pages: "47 slides", status: "Analyzed" },
  { name: "flux-series-a.pdf", pages: "32 slides", status: "Memo ready" },
  { name: "harbr-pitch.pdf", pages: "28 slides", status: "Flagged" },
  { name: "tempo-seed.pdf", pages: "19 slides", status: "Analyzed" },
  { name: "nova-deck.pdf", pages: "41 slides", status: "Analyzing..." },
]

const redFlagItems = [
  { label: "Solo founder, no co-founder listed", severity: "high" },
  { label: "Market size unsourced", severity: "medium" },
  { label: "No revenue model stated", severity: "high" },
  { label: "Unrealistic 10x growth projection", severity: "medium" },
  { label: "Missing team bios", severity: "low" },
]

const features = [
  {
    Icon: BarChart2Icon,
    name: "Deal Pipeline",
    description:
      "Kanban and table views for your full pipeline. Sort by score, drag between stages, see red flag counts at a glance.",
    href: "/login",
    cta: "View pipeline",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedList
        className="absolute top-4 left-4 right-4 max-h-[200px] overflow-hidden"
        delay={1800}
      >
        {deals.map((d) => (
          <AnimatedListItem key={d.name}>
            <div className="flex items-center justify-between rounded-lg border border-[#EAEAEA] bg-white px-3 py-2 text-xs shadow-sm">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full flex-shrink-0 ${d.color}`} />
                <span className="font-medium text-[#171717]">{d.name}</span>
                <span className="text-[#999]">{d.stage}</span>
              </div>
              <span className="font-bold text-[#D4A017]">{d.score}</span>
            </div>
          </AnimatedListItem>
        ))}
      </AnimatedList>
    ),
  },
  {
    Icon: BrainIcon,
    name: "Thesis Fit Scoring",
    description:
      "Deals scored against your firm's criteria, weighted by what matters. Configurable per fund.",
    href: "/login",
    cta: "See scoring",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute top-4 left-0 right-0 flex flex-col items-center">
        <div className="text-5xl font-black text-[#D4A017] opacity-80">9.1</div>
        <div className="text-[10px] text-[#999] mb-3">THESIS FIT</div>
        <div className="w-full px-4 space-y-1.5">
          {[
            { label: "Market Size", pct: 100 },
            { label: "Team", pct: 100 },
            { label: "Traction", pct: 90 },
            { label: "Stage Fit", pct: 80 },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-2 text-[10px]">
              <span className="w-16 text-[#666] text-right">{row.label}</span>
              <div className="flex-1 h-1 rounded-full bg-[#EAEAEA]">
                <motion.div
                  className="h-full rounded-full bg-[#D4A017]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${row.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: FileTextIcon,
    name: "Investment Memo Generation",
    description:
      "One-page internal memo written like a human analyst. Structured for partner meetings, ready in seconds.",
    href: "/login",
    cta: "See an example",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        vertical
        className="absolute top-4 left-3 right-3 h-[160px] [mask-image:linear-gradient(to_bottom,transparent_0%,#fff_20%,#fff_80%,transparent_100%)] [--duration:12s]"
      >
        {pdfFiles.map((f) => (
          <div
            key={f.name}
            className="flex items-center justify-between rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] px-3 py-2 text-[10px] mb-1"
          >
            <div className="flex items-center gap-1.5">
              <RadixFileIcon className="h-3 w-3 text-[#D4A017]" />
              <span className="font-medium text-[#171717] truncate max-w-[100px]">
                {f.name}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[#999]">{f.pages}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                  f.status === "Flagged"
                    ? "bg-red-50 text-red-500"
                    : f.status === "Analyzing..."
                    ? "bg-blue-50 text-blue-500"
                    : "bg-green-50 text-green-600"
                }`}
              >
                {f.status}
              </span>
            </div>
          </div>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: ShieldAlertIcon,
    name: "AI Authorship Detection",
    description:
      "Flag AI-generated decks before you spend diligence time on them. Section-level scoring with flagged excerpts.",
    href: "/login",
    cta: "See detection",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute top-4 left-0 right-0 flex flex-col items-center gap-2 px-4">
        <div className="relative h-20 w-20">
          <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
            <circle cx="40" cy="40" r="30" fill="none" stroke="#EAEAEA" strokeWidth="8" />
            <motion.circle
              cx="40"
              cy="40"
              r="30"
              fill="none"
              stroke="#D4A017"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 30 * 0.08} ${2 * Math.PI * 30 * 0.92}`}
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-black text-[#171717]">8%</span>
            <span className="text-[9px] text-[#999]">AI</span>
          </div>
        </div>
        <p className="text-[10px] text-green-600 font-medium">Likely human-authored</p>
        <div className="w-full space-y-1">
          {["Executive Summary", "Problem / Solution", "Market Sizing"].map((s, i) => (
            <div key={s} className="flex items-center justify-between text-[10px]">
              <span className="text-[#666]">{s}</span>
              <span className="text-[#999]">{[6, 9, 14][i]}%</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: ZapIcon,
    name: "Automated Red Flags",
    description:
      "Solo founder, missing revenue model, unsourced market claims. Surfaced automatically, every time.",
    href: "/login",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute top-4 left-3 right-3 space-y-1.5">
        {redFlagItems.map((flag, i) => (
          <motion.div
            key={flag.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-100 px-2.5 py-2 text-[10px]"
          >
            <span className="text-red-400 mt-0.5 flex-shrink-0">!</span>
            <span className="text-red-700 leading-tight">{flag.label}</span>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    Icon: UsersIcon,
    name: "Team Pipeline & Sharing",
    description:
      "Share deals with your team, message colleagues inside the app, and track who's reviewing what. No more forwarded PDFs.",
    href: "/login",
    cta: "View plans",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute top-4 left-0 right-0 flex flex-col items-center gap-3">
        <div className="flex -space-x-3">
          {["#D4A017", "#3B82F6", "#8B5CF6", "#10B981"].map((color, i) => (
            <div
              key={i}
              className="h-9 w-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm"
              style={{ backgroundColor: color }}
            >
              {["A", "B", "C", "D"][i]}
            </div>
          ))}
          <div className="h-9 w-9 rounded-full border-2 border-white bg-[#EAEAEA] flex items-center justify-center text-[#666] text-xs font-medium shadow-sm">
            +3
          </div>
        </div>
        <div className="text-[10px] text-[#999]">4 analysts active</div>
        <div className="w-full px-4 space-y-1.5">
          {[
            { analyst: "Alex K.", action: "reviewing Conduit", time: "2m ago" },
            { analyst: "Maya R.", action: "left note on Flux", time: "8m ago" },
            { analyst: "Chris B.", action: "flagged Harbr", time: "12m ago" },
          ].map((item) => (
            <div
              key={item.analyst}
              className="flex items-center justify-between text-[10px] rounded border border-[#EAEAEA] bg-[#FAFAFA] px-2 py-1.5"
            >
              <span className="font-medium text-[#171717]">{item.analyst}</span>
              <span className="text-[#999]">{item.action}</span>
              <span className="text-[#bbb]">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

const stats = [
  { value: 50, suffix: "+", label: "decks per week", sub: "at a typical early-stage VC firm" },
  { value: 45, suffix: " min", label: "per deck", sub: "spent on extraction before any real thinking" },
  { value: 0, suffix: " tools", label: "built for this", sub: "specifically for analyst-level deal triage, until now" },
]

export default function FeaturesPage() {
  return (
    <div
      style={{ background: "#FFFFFF", color: "#171717", fontFamily: "Geist, sans-serif" }}
      className="min-h-screen"
    >
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

      {/* Stats */}
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

      {/* Bento */}
      <section className="pb-24 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold text-[#171717]">
            Every analyst does this manually.
          </h2>
          <p className="text-[#666] mt-1">Nobody should have to.</p>
        </motion.div>
        <BentoGrid>
          {features.map((f, i) => {
            const { className: colSpan, ...cardProps } = f
            return (
              <motion.div
                key={f.name}
                className={colSpan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <BentoCard {...cardProps} className="" />
              </motion.div>
            )
          })}
        </BentoGrid>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 text-center border-t border-[#EAEAEA]">
        <h2 className="text-3xl font-bold text-[#171717] mb-4">
          Ready to cut your prep time?
        </h2>
        <p className="text-[#666] mb-8">Free to try. No credit card. No onboarding call.</p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 bg-[#D4A017] hover:bg-[#B8860B] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Start for free
        </Link>
      </section>

      <SiteFooter />
    </div>
  )
}
