"use client"

import { motion } from "framer-motion"

const memoSections = [
  { label: "Company",    value: "Conduit",                                  delay: 0 },
  { label: "Stage",      value: "Series A · Fintech",                       delay: 0.05 },
  { label: "Thesis Fit", value: "9.1 / 10",                                 delay: 0.1,  highlight: true },
  { label: "Market Size",value: "$4.3B TAM, 112% YoY growth",               delay: 0.15 },
  { label: "Team",       value: "2x founders, prior exit at Series B",       delay: 0.2 },
  { label: "Key Risks",  value: "Regulatory exposure in 2 target markets",   delay: 0.25 },
  { label: "Ask",        value: "$8M Series A at $32M post",                 delay: 0.3 },
]

export function MemoPreview() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#666] mb-3">
            What you actually get
          </p>
          <h2 className="text-3xl font-bold text-[#171717]">
            This is the memo. Not a mockup.
          </h2>
          <p className="text-[#666] mt-3 max-w-lg mx-auto">
            Every deck you upload generates exactly this — structured, scored, and ready to forward to a partner.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-[#EAEAEA] bg-white shadow-md overflow-hidden"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAEAEA] bg-[#FAFAFA]">
            <div className="text-sm font-semibold text-[#171717]">INVESTMENT MEMO</div>
            <div className="text-xs px-2.5 py-1 rounded-full bg-[#D4A017] text-white font-medium">
              PURSUE
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#EAEAEA]">
            {memoSections.map((row) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: row.delay }}
                className="flex items-center justify-between px-6 py-4"
              >
                <span className="text-xs font-medium text-[#999] uppercase tracking-wide w-32 flex-shrink-0">
                  {row.label}
                </span>
                <span
                  className={`text-sm text-right ${
                    row.highlight
                      ? "font-bold text-[#D4A017] text-base"
                      : "text-[#171717]"
                  }`}
                >
                  {row.value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Footer bar */}
          <div className="px-6 py-4 bg-[#FAFAFA] border-t border-[#EAEAEA] flex items-center justify-between">
            <span className="text-xs text-[#999]">Generated in 28 seconds</span>
            <a
              href="/login"
              className="text-xs font-medium text-[#D4A017] hover:text-[#B8860B] transition-colors"
            >
              Upload your own deck →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
