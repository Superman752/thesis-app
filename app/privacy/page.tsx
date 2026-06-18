"use client"

import { motion } from "framer-motion"
import SiteNavbar from "@/components/SiteNavbar"
import SiteFooter from "@/components/SiteFooter"

export default function PrivacyPage() {
  return (
    <div
      style={{ background: "#FFFFFF", color: "#171717", fontFamily: "Geist, sans-serif" }}
      className="min-h-screen"
    >
      <SiteNavbar />

      <section className="pt-24 pb-12 px-6 max-w-3xl mx-auto">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#666] mb-4">Legal</p>
        <h1 className="text-4xl font-bold text-[#171717] mb-3">Privacy Policy</h1>
        <p className="text-sm text-[#999]">Last updated June 2026</p>
      </section>

      <section className="pb-24 px-6 max-w-3xl mx-auto space-y-10 text-[#666] leading-relaxed">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">What we collect</h2>
          <p>When you create a Thesis account, we collect your firm name, your name, and an optional work email address. We do not require payment information to use the free tier.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">What happens to your pitch decks</h2>
          <p>Decks you upload are sent directly to the Claude API for analysis and are not retained on Thesis servers after the analysis completes. We do not read, review, or manually inspect the content of any deck you upload.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">How we use your information</h2>
          <p>Account information is used solely to operate your Thesis account: authenticating you, displaying your pipeline, and billing if you are on a paid plan. We do not sell your information to third parties.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">Third party services</h2>
          <p>Thesis uses Anthropic's Claude API to perform deck analysis. Data sent to Claude is governed by Anthropic's own data handling terms. We use standard infrastructure providers for hosting, which may process data as part of normal operation.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">Your rights</h2>
          <p>You can request deletion of your account and associated data at any time by contacting us. We will remove your account information within a reasonable timeframe.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">Changes to this policy</h2>
          <p>If this policy changes in a material way, we will update this page and note the new effective date above.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">Contact</h2>
          <p>Questions about this policy can be directed through the contact options available on our pricing page.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">Cookies and analytics</h2>
          <p>Thesis may use minimal, privacy-respecting analytics to understand how the product is used in aggregate, such as which pages are visited. This is not used to build individual profiles for advertising purposes, and Thesis does not sell or share this data with advertisers.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-lg font-semibold text-[#171717] mb-2">Data retention</h2>
          <p>Account information is retained for as long as your account is active. If you request account deletion, we will remove your account information within a reasonable timeframe, generally within 30 days.</p>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  )
}