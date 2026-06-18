"use client"

import SiteNavbar from "@/components/SiteNavbar"
import SiteFooter from "@/components/SiteFooter"
import { RippleButton } from "@/registry/magicui/ripple-button"

export default function SecurityPage() {
  return (
    <div
      style={{ background: "#FFFFFF", color: "#171717", fontFamily: "Geist, sans-serif" }}
      className="min-h-screen"
    >
      <SiteNavbar />

      <section className="pt-24 pb-16 px-6 max-w-3xl mx-auto text-center">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#666] mb-4">Trust and security</p>
        <h1 className="text-5xl font-bold text-[#171717] mb-6">
          Your deal flow stays yours.
        </h1>
        <p className="text-lg text-[#666]">
          Pitch decks contain sensitive, often confidential information. Here is exactly how Thesis handles it.
        </p>
      </section>

      <section className="pb-24 px-6 max-w-3xl mx-auto space-y-12">
        {[
          {
            title: "No server-side storage of your decks",
            body: "When you upload a pitch deck, it is sent directly from your browser to the Claude API for analysis. Thesis does not retain a copy of the PDF on its own servers after the analysis completes.",
          },
          {
            title: "Your data is never used to train models",
            body: "Decks, memos, and scores you generate are not used to train Claude, Thesis's own systems, or any third-party model. What you upload stays yours.",
          },
          {
            title: "Encrypted in transit",
            body: "All traffic between your browser, Thesis, and the Claude API is encrypted using industry-standard TLS. Nothing is ever sent in plain text.",
          },
          {
            title: "Account data is minimal by design",
            body: "Thesis only stores what is needed to run your account: firm name, your name, and an optional work email. We do not require extensive personal information to use the product.",
          },
          {
            title: "Built on Anthropic's infrastructure",
            body: "Deck analysis runs on Claude, Anthropic's AI model, accessed through their API under their standard data handling terms. Thesis does not operate its own model or its own data center for this purpose.",
          },
          {
            title: "Questions about your firm's specific requirements",
            body: "If your firm has specific security or compliance requirements before adopting Thesis, including SOC 2 questionnaires or data processing agreements, contact us and we will work through it directly.",
          },
        ].map((section) => (
          <div key={section.title} className="border-t border-[#EAEAEA] pt-8">
            <h2 className="text-xl font-semibold text-[#171717] mb-2">{section.title}</h2>
            <p className="text-[#666] leading-relaxed">{section.body}</p>
          </div>
        ))}
      </section>

      <section className="py-24 px-6 text-center border-t border-[#EAEAEA]">
        <h2 className="text-3xl font-bold text-[#171717] mb-4">Still have questions?</h2>
        <p className="text-[#666] mb-8">Reach out and we will walk through it with you directly.</p>
        <RippleButton href="/login">
          Start for free
        </RippleButton>
      </section>

      <SiteFooter />
    </div>
  )
}