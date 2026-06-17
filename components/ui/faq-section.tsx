"use client"

import { useEffect, useRef, useState } from "react"

const faqs = [
  {
    q: "What counts as a pitch deck?",
    a: "Any PDF you upload. One upload = one deck, regardless of page count. We support standard pitch decks, one-pagers, and even data room teasers. If it's a PDF, Thesis can read it.",
  },
  {
    q: "How accurate is the thesis fit scoring?",
    a: "The scoring is calibrated against your fund's stated thesis: stage, sector, check size, and geography. Every score comes with a breakdown so you can see exactly why a deal ranked the way it did.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrade or downgrade anytime. You're billed monthly with no lock-in, and changes take effect immediately. If you upgrade mid-cycle, you're only charged the prorated difference.",
  },
  {
    q: "Is there a trial for Pro?",
    a: "The Solo plan is free forever with 10 decks per month. That's the trial, no time limit, no credit card required. Upgrade when the volume or team features make sense for you.",
  },
  {
    q: "How does Firm billing work?",
    a: "Flat $99/month for up to 10 analysts, unlimited decks across the team. If your team is larger than 10, contact us. We do custom pricing for larger firms.",
  },
  {
    q: "Where does my data go?",
    a: "Decks are processed and immediately discarded. We don't store your pitch deck files after analysis is complete. The structured output lives in your Thesis account and is never used to train models or shared with third parties.",
  },
  {
    q: "How long does analysis actually take?",
    a: "Under 30 seconds for most decks. Longer decks (50+ pages with dense financials) can take up to 60 seconds. You'll see a live progress indicator while it runs.",
  },
  {
    q: "Does this replace my analyst?",
    a: "No. Thesis handles the first-pass read so your analyst spends time on deals worth their attention. The memo output is a starting point, not a final word. Your judgment still drives every investment decision.",
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white p-5 transition-all hover:border-[#D4A017]/40 hover:shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-3">
          <span className="text-xs text-[#999] font-mono">{String(index).padStart(2, "0")}</span>
          <h3 className="text-sm font-semibold text-[#171717] leading-tight">{q}</h3>
        </div>
        <span className="ml-4 text-[#D4A017] text-lg leading-none flex-shrink-0 transition group-hover:text-[#B8860B]">
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${
          open ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="text-sm text-[#666] leading-relaxed pl-7">{a}</p>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const spiralRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (!spiralRef.current) return
    const SIZE = 500
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
    const N = 500
    const DOT = 1.4
    const CENTER = SIZE / 2
    const MAX_R = CENTER - 8 - DOT
    const svgNS = "http://www.w3.org/2000/svg"
    const svg = document.createElementNS(svgNS, "svg")
    svg.setAttribute("width", String(SIZE))
    svg.setAttribute("height", String(SIZE))
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`)

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5
      const frac = idx / N
      const r = Math.sqrt(frac) * MAX_R
      const theta = idx * GOLDEN_ANGLE
      const x = CENTER + r * Math.cos(theta)
      const y = CENTER + r * Math.sin(theta)
      const c = document.createElementNS(svgNS, "circle")
      c.setAttribute("cx", x.toFixed(3))
      c.setAttribute("cy", y.toFixed(3))
      c.setAttribute("r", String(DOT))
      c.setAttribute("fill", "#D4A017")
      c.setAttribute("opacity", "0.5")
      const anim = document.createElementNS(svgNS, "animate")
      anim.setAttribute("attributeName", "opacity")
      anim.setAttribute("values", "0.15;0.55;0.15")
      anim.setAttribute("dur", "3s")
      anim.setAttribute("begin", `${(frac * 3).toFixed(3)}s`)
      anim.setAttribute("repeatCount", "indefinite")
      c.appendChild(anim)
      svg.appendChild(c)
    }

    spiralRef.current.innerHTML = ""
    spiralRef.current.appendChild(svg)
  }, [])

  const filtered = query
    ? faqs.filter(({ q, a }) => (q + a).toLowerCase().includes(query.toLowerCase()))
    : faqs

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Gold spiral background */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-20"
        style={{ maskImage: "radial-gradient(circle at center, white 30%, transparent 70%)" }}
      >
        <div ref={spiralRef} />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 pb-6 border-b border-[#EAEAEA]">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#999] mb-2">
              Got questions
            </p>
            <h2 className="text-4xl font-bold text-[#171717]">Common questions.</h2>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            className="h-9 w-52 rounded-xl border border-[#EAEAEA] bg-[#FAFAFA] px-3 text-sm text-[#171717] outline-none transition focus:border-[#D4A017] placeholder:text-[#999]"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {filtered.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i + 1} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-2 text-center text-[#999] py-8">No questions match your search.</p>
          )}
        </div>
      </div>
    </section>
  )
}
