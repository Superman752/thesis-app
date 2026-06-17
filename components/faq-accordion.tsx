"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  {
    q: "What counts as a pitch deck?",
    a: "Any PDF you upload. One upload = one deck, regardless of page count. We support standard pitch decks, one-pagers, and even data room teasers. If it's a PDF, Thesis can read it."
  },
  {
    q: "How accurate is the thesis fit scoring?",
    a: "The scoring is calibrated against your fund's stated thesis — stage, sector, check size, and geography. It's not a black box: every score comes with a breakdown so you can see exactly why a deal ranked the way it did. Most analysts find it flags genuine mismatches they'd have caught themselves, just faster."
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrade or downgrade anytime. You're billed monthly with no lock-in, and changes take effect immediately. If you upgrade mid-cycle, you're only charged the prorated difference."
  },
  {
    q: "Is there a trial for Pro?",
    a: "The Solo plan is free forever with 10 decks per month. That's the trial — no time limit, no credit card required. Upgrade when the volume or team features make sense for you."
  },
  {
    q: "How does Firm billing work?",
    a: "Flat $99/month for up to 10 analysts, unlimited decks across the team. If your team is larger than 10, contact us — we do custom pricing for larger firms and multi-fund structures."
  },
  {
    q: "Where does my data go?",
    a: "Decks are processed and immediately discarded — we don't store your pitch deck files after analysis is complete. The structured output (scores, memos, red flags) lives in your Thesis account and is never used to train models or shared with third parties."
  },
  {
    q: "How long does analysis actually take?",
    a: "Under 30 seconds for most decks. Longer decks (50+ pages with dense financials) can take up to 60 seconds. You'll see a live progress indicator while it runs."
  },
  {
    q: "Does this replace my analyst?",
    a: "No. Thesis handles the first-pass read so your analyst spends time on deals worth their attention, not on filtering obvious mismatches. The memo output is a starting point, not a final word — your judgment still drives every investment decision."
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.05 }}
      className="border-b"
      style={{ borderColor: "#EAEAEA" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-sm font-medium" style={{ color: "#171717" }}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xl leading-none flex-shrink-0"
          style={{ color: "#999999" }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed" style={{ color: "#666666" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQAccordion() {
  return (
    <section className="py-24 px-6 max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-3xl font-bold mb-12"
        style={{ color: "#171717" }}
      >
        Common questions.
      </motion.h2>
      <div>
        {faqs.map((item, i) => (
          <FAQItem key={i} q={item.q} a={item.a} index={i} />
        ))}
      </div>
    </section>
  )
}
