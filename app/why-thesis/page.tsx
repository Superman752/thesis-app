"use client"

import { motion } from "framer-motion"
import SiteNavbar from "@/components/SiteNavbar"
import SiteFooter from "@/components/SiteFooter"
import { RippleButton } from "@/registry/magicui/ripple-button"

const sections = [
  {
    title: "Institutional memory outlasts any one analyst",
    body: "Analysts leave. Notes get lost in old email threads. Thesis keeps every memo, score, and decision in one place, so the firm's judgment compounds instead of resetting every time someone moves on.",
  },
  {
    title: "Generic AI doesn't know your thesis",
    body: "A general-purpose model can summarize a pitch deck. It has no idea what your fund actually invests in, what stage you focus on, or what's killed deals for you before. Thesis fit scoring is calibrated to your firm specifically.",
  },
  {
    title: "Speed compounds across a full pipeline",
    body: "Saving 40 minutes on one deck is nice. Saving 40 minutes on 50 decks a week is the difference between triaging your pipeline properly and falling behind on it.",
  },
  {
    title: "Decisions need to be reviewable, not just made",
    body: "Six months after passing on a deal, can your team explain why? Thesis keeps the reasoning attached to the deal, so the firm can actually learn from outcomes instead of just moving on to the next one.",
  },
]

export default function WhyThesisPage() {
  return (
    <div style={{ background: "#FFFFFF", color: "#171717", fontFamily: "Geist, sans-serif" }} className="min-h-screen">
      <SiteNavbar />

      <section className="pt-24 pb-16 px-6 max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-medium tracking-[0.2em] uppercase text-[#666] mb-4"
        >
          The case for Thesis
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl font-bold text-[#171717] mb-6"
          style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
        >
          Every investment decision.<br />One workspace.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-[#666]"
        >
          General-purpose AI can read a document. It can&apos;t remember your firm&apos;s last 200 deals, score against your specific thesis, or hand context to the next analyst who picks up a deal. Thesis is built around how venture investing actually works, deal after deal, year after year.
        </motion.p>
      </section>

      <section className="pb-24 px-6 max-w-3xl mx-auto space-y-12">
        {sections.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="border-t border-[#EAEAEA] pt-8"
          >
            <h2 className="text-xl font-semibold text-[#171717] mb-2">{s.title}</h2>
            <p className="text-[#666] leading-relaxed">{s.body}</p>
          </motion.div>
        ))}
      </section>

      <section className="py-24 px-6 text-center border-t border-[#EAEAEA]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-[#171717] mb-4" style={{ letterSpacing: "-0.02em" }}>
            See it on your next deck.
          </h2>
          <p className="text-[#666] mb-8">Free to try. No credit card. No onboarding call.</p>
          <RippleButton href="/login">Start for free</RippleButton>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  )
}
