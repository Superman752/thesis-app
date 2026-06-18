"use client"

import SiteNavbar from "@/components/SiteNavbar"
import SiteFooter from "@/components/SiteFooter"

export default function ChangelogPage() {
  return (
    <div
      style={{ background: "#FFFFFF", color: "#171717", fontFamily: "Geist, sans-serif" }}
      className="min-h-screen"
    >
      <SiteNavbar />

      <section className="pt-24 pb-16 px-6 max-w-3xl mx-auto text-center">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#666] mb-4">Changelog</p>
        <h1 className="text-5xl font-bold text-[#171717] mb-6">
          What has changed.
        </h1>
        <p className="text-lg text-[#666]">
          Thesis is updated frequently. Notable changes will be listed here as they ship.
        </p>
      </section>

      <section className="pb-24 px-6 max-w-2xl mx-auto">
        <div className="rounded-xl border border-[#EAEAEA] bg-[#FAFAFA] p-10 text-center">
          <p className="text-[#666] leading-relaxed">
            This page is new. The first entries will appear here as upcoming changes ship.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}