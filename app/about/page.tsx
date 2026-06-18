"use client"

import SiteNavbar from "@/components/SiteNavbar"
import SiteFooter from "@/components/SiteFooter"
import { RippleButton } from "@/registry/magicui/ripple-button"

export default function AboutPage() {
  return (
    <div
      style={{ background: "#FFFFFF", color: "#171717", fontFamily: "Geist, sans-serif" }}
      className="min-h-screen"
    >
      <SiteNavbar />

      <section className="pt-24 pb-16 px-6 max-w-3xl mx-auto text-center">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#666] mb-4">About</p>
        <h1 className="text-5xl font-bold text-[#171717] mb-6">
          Built by someone who was doing the work.
        </h1>
        <p className="text-lg text-[#666]">
          Thesis started as a way to get through a stack of pitch decks faster, not as a research project looking for a use case.
        </p>
      </section>

      <section className="pb-24 px-6 max-w-3xl mx-auto space-y-10 text-[#666] leading-relaxed">
        <div className="border-t border-[#EAEAEA] pt-8">
          <h2 className="text-xl font-semibold text-[#171717] mb-2">The problem</h2>
          <p>Reviewing a pitch deck properly takes time: reading it closely, checking the market sizing against what you already know, scoring it against your fund's actual thesis, and writing it up in a way a partner can act on. Multiply that by dozens of decks a week and most of an analyst's time goes to repetitive extraction work instead of judgment.</p>
        </div>
        <div className="border-t border-[#EAEAEA] pt-8">
          <h2 className="text-xl font-semibold text-[#171717] mb-2">What Thesis does differently</h2>
          <p>Thesis reads the deck the way an analyst would, structures what it finds, scores it against criteria that matter to your specific fund, and writes a memo that is ready to forward to a partner. The analysis happens in under 30 seconds, the same review used to take 45 minutes.</p>
        </div>
        <div className="border-t border-[#EAEAEA] pt-8">
          <h2 className="text-xl font-semibold text-[#171717] mb-2">Where it is headed</h2>
          <p>Thesis is actively used and actively built. The roadmap is shaped by what analysts and partners actually run into during diligence, not by a feature list decided in advance.</p>
        </div>
      </section>

      <section className="py-24 px-6 text-center border-t border-[#EAEAEA]">
        <h2 className="text-3xl font-bold text-[#171717] mb-4">Try it on your next deck.</h2>
        <RippleButton href="/login">
          Start for free
        </RippleButton>
      </section>

      <SiteFooter />
    </div>
  )
}