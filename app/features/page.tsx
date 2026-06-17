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
import { BentoCard, BentoGrid } from "@/registry/magicui/bento-grid"
import { NumberTicker } from "@/registry/magicui/number-ticker"
import SiteNavbar from "@/components/SiteNavbar"
import SiteFooter from "@/components/SiteFooter"

const deals = [
  { name: "Conduit", stage: "Series A", score: "9.1", color: "#D4A017" },
  { name: "Flux", stage: "Seed", score: "8.2", color: "#3B82F6" },
  { name: "Harbr", stage: "Series A", score: "7.6", color: "#8B5CF6" },
]

const pdfFiles = [
  { name: "conduit-deck.pdf", status: "Analyzed", color: "text-green-600 bg-green-50" },
  { name: "harbr-pitch.pdf", status: "Flagged", color: "text-red-600 bg-red-50" },
  { name: "nova-deck.pdf", status: "Analyzing", color: "text-blue-600 bg-blue-50" },
]

const redFlagItems = [
  "Solo founder, no co-founder listed",
  "Market size unsourced",
  "No revenue model stated",
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
    visual: (
      <div className="flex flex-col gap-1.5 p-3 h-full justify-center">
        {deals.map((d) => (
          <div
            key={d.name}
            className="flex items-center justify-between rounded-lg border border-[#EAEAEA] bg-white px-3 py-2 text-xs shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: d.color }}
              />
              <span className="font-medium text-[#171717]">{d.name}</span>
              <span className="text-[#999]">{d.stage}</span>
            </div>
            <span className="font-bold" style={{ color: d.color }}>
              {d.score}
            </span>
          </div>
        ))}
      </div>
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
    visual: (
      <div className="flex flex-col items-center justify-center h-full gap-1">
        <div className="text-4xl font-black text-[#D4A017]">9.1</div>
        <div className="text-[10px] text-[#999] tracking-wide">THESIS FIT</div>
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
    visual: (
      <div className="flex flex-col gap-1.5 p-3 h-full justify-center">
        {pdfFiles.map((f) => (
          <div
            key={f.name}
            className="flex items-center justify-between rounded-lg border border-[#EAEAEA] bg-white px-2.5 py-1.5 text-[10px]"
          >
            <span className="font-medium text-[#171717] truncate max-w-[90px]">
              {f.name}
            </span>
            <span className={`rounded-full px-1.5 py-0.5 font-medium ${f.color}`}>
              {f.status}
            </span>
          </div>
        ))}
      </div>
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
    visual: (
      <div className="flex flex-col items-center justify-center h-full gap-1">
        <div className="text-4xl font-black text-[#171717]">8%</div>
        <div className="text-[10px] text-green-600 font-medium">Likely human-authored</div>
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
    visual: (
      <div className="flex flex-col gap-1.5 p-3 h-full justify-center">
        {redFlagItems.map((flag) => (
          <div
            key={flag}
            className="rounded-lg bg-red-50 border border-red-100 px-2.5 py-1.5 text-[10px] text-red-700"
          >
            {flag}
          </div>
        ))}
      </div>
    ),
  },
  {
    Icon: UsersIcon,
    name: "Team Pipeline & Sharing",
    description:
      "Share deals with your team, message colleagues inside the app, and track who's reviewing what.",
    href: "/login",
    cta: "View plans",
    className: "col-span-3 lg:col-span-1",
    visual: (
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <div className="flex -space-x-3">
          {["#D4A017", "#3B82F6", "#8B5CF6", "#10B981"].map((color, i) => (
            <div
              key={i}
              className="h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: color }}
            >
              {["A", "B", "C", "D"][i]}
            </div>
          ))}
        </div>
        <div className="text-[10px] text-[#999]">4 analysts active</div>
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
          {features.map((f, i) => (
            <motion.div
              key={f.name}
              className={f.className}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <BentoCard
                name={f.name}
                description={f.description}
                Icon={f.Icon}
                href={f.href}
                cta={f.cta}
                visual={f.visual}
              />
            </motion.div>
          ))}
        </BentoGrid>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 text-center border-t border-[#EAEAEA]">
        <h2 className="text-3xl font-bold text-[#171717] mb-4">
          Ready to cut your prep time?
        </h2>
        <p className="text-[#666] mb-8">Free to try. No credit card. No onboarding call.</p>
        <a
          href="/login"
          className="inline-flex items-center gap-2 bg-[#D4A017] hover:bg-[#B8860B] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Start for free
        </a>
      </section>

      <SiteFooter />
    </div>
  )
}
