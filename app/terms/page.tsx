"use client"

import { motion } from "framer-motion"
import SiteNavbar from "@/components/SiteNavbar"
import SiteFooter from "@/components/SiteFooter"

export default function TermsPage() {
  return (
    <div
      style={{ background: "#FFFFFF", color: "#171717", fontFamily: "Geist, sans-serif" }}
      className="min-h-screen"
    >
      <SiteNavbar />

      <section className="pt-24 pb-12 px-6 max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#666] mb-4">Legal</p>
        <h1 className="text-4xl font-bold text-[#171717] mb-3">Terms of Service</h1>
        <p className="text-sm text-[#999]">Last updated June 2026</p>
      </section>

      <section className="pb-24 px-6 max-w-3xl mx-auto space-y-10 text-[#666] leading-relaxed">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">Using Thesis</h2>
          <p>Thesis is a tool to help analyze pitch decks and generate structured investment memos. It is a starting point for diligence, not a substitute for your own judgment or your firm's investment process.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">Your account</h2>
          <p>You are responsible for keeping your account credentials secure. Notify us promptly if you believe your account has been accessed without authorization.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">Acceptable use</h2>
          <p>Do not use Thesis to upload content you do not have the right to analyze, or to attempt to disrupt or reverse engineer the service.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">No investment advice</h2>
          <p>Thesis generates scores, summaries, and memos based on the content of uploaded decks. Nothing Thesis produces constitutes investment advice, and Thesis is not responsible for investment decisions made using its output.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">Subscription and billing</h2>
          <p>Paid plans are billed monthly. You may upgrade, downgrade, or cancel at any time through your account settings. Changes take effect according to the terms described on the pricing page.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">Limitation of liability</h2>
          <p>Thesis is provided as is, without warranties of any kind. We are not liable for indirect, incidental, or consequential damages arising from use of the service.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">Changes to these terms</h2>
          <p>We may update these terms from time to time. Continued use of Thesis after an update constitutes acceptance of the revised terms.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">Intellectual property</h2>
          <p>Thesis and its underlying technology, including the scoring methodology and memo structure, remain the property of Thesis. Output generated for your account, including memos and scores tied to decks you upload, is yours to use as you see fit.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">Service availability</h2>
          <p>We aim to keep Thesis available and reliable, but do not guarantee uninterrupted access. Planned maintenance or unexpected downtime may occur, and we will communicate significant outages when possible.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">Termination</h2>
          <p>You may stop using Thesis and cancel your subscription at any time. We may suspend or terminate access for accounts that violate these terms, including misuse of the acceptable use guidelines above.</p>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  )
}