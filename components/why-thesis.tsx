"use client"

import { motion } from "framer-motion"
import { CheckIcon, XIcon } from "lucide-react"

const comparison = [
  { label: "Pitch deck analysis", thesis: true, chatgpt: true },
  { label: "Investment memo generation", thesis: true, chatgpt: true },
  { label: "Deal pipeline tracking", thesis: true, chatgpt: false },
  { label: "Thesis fit scoring (your firm's criteria)", thesis: true, chatgpt: false },
  { label: "Founder credibility scoring", thesis: true, chatgpt: false },
  { label: "Persists across deals and analysts", thesis: true, chatgpt: false },
  { label: "Built for repeat use, not one-off prompts", thesis: true, chatgpt: false },
]

export function WhyThesis() {
  return (
    <section className="py-24 px-6 bg-white border-y border-[#EAEAEA]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#666] mb-3">
            Why not just use ChatGPT
          </p>
          <h2 className="text-3xl font-bold text-[#171717]">
            A prompt isn&apos;t a workflow.
          </h2>
          <p className="text-[#666] mt-3 max-w-lg mx-auto">
            ChatGPT can read a deck. It can&apos;t remember your last 200 deals, score against your fund&apos;s thesis, or hand a memo to the next analyst.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-[#EAEAEA] overflow-hidden"
        >
          <div className="grid grid-cols-[1fr_auto_auto] bg-[#FAFAFA] border-b border-[#EAEAEA]">
            <div className="p-4 text-xs font-medium text-[#999] uppercase tracking-wide">Capability</div>
            <div className="p-4 text-center text-sm font-semibold text-[#171717] w-28">Thesis</div>
            <div className="p-4 text-center text-sm font-medium text-[#999] w-28">ChatGPT</div>
          </div>
          {comparison.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className={`grid grid-cols-[1fr_auto_auto] ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]/50"} border-b border-[#EAEAEA] last:border-b-0`}
            >
              <div className="p-4 text-sm text-[#171717]">{row.label}</div>
              <div className="p-4 flex items-center justify-center w-28">
                {row.thesis ? (
                  <CheckIcon className="h-4 w-4 text-[#D4A017]" />
                ) : (
                  <XIcon className="h-4 w-4 text-[#ccc]" />
                )}
              </div>
              <div className="p-4 flex items-center justify-center w-28">
                {row.chatgpt ? (
                  <CheckIcon className="h-4 w-4 text-[#999]" />
                ) : (
                  <XIcon className="h-4 w-4 text-[#ccc]" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
