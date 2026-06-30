"use client"

import { motion } from "framer-motion"
import { BentoCard, BentoGrid } from "@/registry/magicui/bento-grid"
import { RippleButton } from "@/registry/magicui/ripple-button"
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
    name: "Team Pipeline & Sharing",
    description:
      "Share deals with your team, message colleagues inside the app, and track who's reviewing what.",
    href: "/login",
    cta: "View plans",
    className: "col-span-3 lg:col-span-2",
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
  {
    name: "30-Second Turnaround",
    description: "From upload to structured analysis. No queue, no waiting, no 'check back later.'",
    href: "/login",
    cta: "See it work",
    className: "col-span-3 lg:col-span-1",
    visual: (
      <div className="flex flex-col items-center justify-center h-full gap-1">
        <div className="text-4xl font-black text-[#D4A017]">
          <NumberTicker value={30} />
          <span className="text-2xl">s</span>
        </div>
        <div className="text-[10px] text-[#999] tracking-wide">AVERAGE ANALYSIS TIME</div>
      </div>
    ),
  },
  {
    name: "Thesis Fit Breakdown",
    description: "Not just a fit score. See exactly which criteria matched and which didn't, weighted by what your fund actually cares about.",
    href: "/login",
    cta: "See scoring logic",
    className: "col-span-3 lg:col-span-2",
    visual: (
      <div className="flex flex-col gap-1.5 p-3 h-full justify-center">
        {[
          { label: "Sector Fit", pct: 98 },
          { label: "Stage Fit", pct: 95 },
          { label: "Geography Fit", pct: 100 },
          { label: "Market Size Fit", pct: 85 },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-2 text-xs">
            <span className="w-28 text-[#666] text-right flex-shrink-0">{row.label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-[#EAEAEA]">
              <div className="h-full rounded-full bg-[#D4A017]" style={{ width: `${row.pct}%` }} />
            </div>
            <span className="w-8 text-right text-[#171717] font-medium flex-shrink-0">{row.pct}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "Founder Credibility Score",
    description: "Founder background, prior exits, and execution signals rolled into one score. See it before you take the meeting.",
    href: "/login",
    cta: "See an example",
    className: "col-span-3 lg:col-span-1",
    visual: (
      <div className="flex flex-col items-center justify-center h-full gap-1.5">
        <div className="text-4xl font-black text-[#D4A017]">9.1</div>
        <div className="text-[10px] text-[#999] tracking-wide">FOUNDER CREDIBILITY</div>
        <div className="flex gap-1 mt-1">
          {["Prior exit", "Domain expert", "Technical co-founder"].map((tag) => (
            <span key={tag} className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#FAFAFA] border border-[#EAEAEA] text-[#666]">
              {tag}
            </span>
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
                href={f.href}
                cta={f.cta}
                visual={f.visual}
              />
            </motion.div>
          ))}
        </BentoGrid>
      </section>

      {/* Real analyst workflow */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#666] mb-3">By the numbers</p>
          <h2 className="text-3xl font-bold text-[#171717]">What this actually saves you.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-xl border border-[#EAEAEA] bg-[#FAFAFA] p-8"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-[#999] mb-6">Without Thesis</p>
            <div className="space-y-4">
              {[
                { task: "Read the deck end to end", time: "15 min" },
                { task: "Extract key data manually", time: "10 min" },
                { task: "Score against thesis criteria", time: "8 min" },
                { task: "Research team and market", time: "7 min" },
                { task: "Write up notes for the partner", time: "10 min" },
              ].map((row) => (
                <div key={row.task} className="flex items-center justify-between py-2 border-b border-[#EAEAEA] last:border-0">
                  <span className="text-sm text-[#666]">{row.task}</span>
                  <span className="text-sm font-medium text-[#999] bg-white border border-[#EAEAEA] rounded px-2 py-0.5">{row.time}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3">
                <span className="text-sm font-semibold text-[#171717]">Total per deck</span>
                <span className="text-lg font-bold text-[#171717]">~50 min</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-xl border border-[#D4A017]/30 bg-white p-8"
            style={{ boxShadow: "0 4px 24px rgba(212,160,23,0.08)" }}
          >
            <p className="text-xs font-medium uppercase tracking-wide text-[#D4A017] mb-6">With Thesis</p>
            <div className="space-y-4">
              {[
                { task: "Upload the PDF", time: "5 sec" },
                { task: "Analysis runs automatically", time: "25 sec" },
                { task: "Review structured output", time: "2 min" },
                { task: "Forward memo to partner", time: "30 sec" },
              ].map((row) => (
                <div key={row.task} className="flex items-center justify-between py-2 border-b border-[#EAEAEA] last:border-0">
                  <span className="text-sm text-[#666]">{row.task}</span>
                  <span className="text-sm font-medium text-[#D4A017] bg-[#FFFDF5] border border-[#D4A017]/20 rounded px-2 py-0.5">{row.time}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3">
                <span className="text-sm font-semibold text-[#171717]">Total per deck</span>
                <span className="text-lg font-bold text-[#D4A017]">~3 min</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { stat: "94%", label: "Time saved per deck", sub: "From ~50 minutes to under 3" },
            { stat: "50+", label: "Decks per analyst weekly", sub: "That's 40+ hours of extraction saved" },
            { stat: "30s", label: "Average analysis time", sub: "From upload to full structured output" },
          ].map((item, i) => (
            <motion.div
              key={item.stat}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="rounded-xl border border-[#EAEAEA] bg-white p-6 text-center"
            >
              <div className="text-4xl font-bold text-[#D4A017] mb-1">{item.stat}</div>
              <div className="text-sm font-semibold text-[#171717] mb-1">{item.label}</div>
              <div className="text-xs text-[#999]">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow fit Q&A */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#666] mb-3">
            How it fits your workflow
          </p>
          <h2 className="text-3xl font-bold text-[#171717]">
            Built around how decks actually move through a firm.
          </h2>
        </motion.div>

        <div className="space-y-6">
          {[
            {
              q: "Where does this fit if my firm already uses Affinity or a CRM?",
              a: "Thesis isn't a CRM replacement. It handles the first-pass read and memo generation before a deal is worth logging seriously. Most teams keep their CRM for relationship tracking and use Thesis for the analysis step that happens before that.",
            },
            {
              q: "Can multiple analysts work on the same pipeline?",
              a: "Yes. The Firm plan supports up to 10 analysts sharing one pipeline, with each deal's analysis visible to the whole team regardless of who uploaded the deck.",
            },
            {
              q: "What if a deck doesn't have much information in it?",
              a: "Each scoring dimension falls back gracefully rather than failing. If a deck is missing financials or a clear GTM section, Thesis scores what it can and flags what's missing instead of producing an incomplete or broken analysis.",
            },
            {
              q: "Does the scoring adjust to my fund's specific thesis?",
              a: "Yes. Thesis fit scoring is calibrated to the stage, sector, and check size your fund actually invests in, not a generic startup checklist.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="rounded-xl border border-[#EAEAEA] bg-white p-6"
            >
              <h3 className="text-sm font-semibold text-[#171717] mb-2">{item.q}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 text-center border-t border-[#EAEAEA]">
        <h2 className="text-3xl font-bold text-[#171717] mb-4">
          Ready to cut your prep time?
        </h2>
        <p className="text-[#666] mb-8">Free to try. No credit card. No onboarding call.</p>
        <RippleButton href="/login">Start for free</RippleButton>
      </section>

      <SiteFooter />
    </div>
  )
}
