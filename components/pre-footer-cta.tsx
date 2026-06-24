"use client"

import { motion } from "framer-motion"
import { RippleButton } from "@/registry/magicui/ripple-button"

export function PreFooterCTA() {
  return (
    <section className="py-24 px-6 bg-[#FAFAFA] border-y border-[#EAEAEA]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto text-center"
      >
        <div className="flex items-center justify-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="h-5 w-5" viewBox="0 0 20 20" fill="#D4A017">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <h2 className="text-3xl font-bold text-[#171717] mb-3">
          Ready to cut your deck review time?
        </h2>
        <p className="text-[#666] mb-8">
          Join analysts at 50+ funds who have eliminated the 45-minute deck-to-memo process.
          Upload your first deck free, no credit card, no setup call.
        </p>
        <RippleButton href="/login">
          Start for free, it&apos;s on us
        </RippleButton>
        <p className="text-xs text-[#999] mt-4">Free forever plan available. Upgrade only when you need to.</p>
      </motion.div>
    </section>
  )
}
