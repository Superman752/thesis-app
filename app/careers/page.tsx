"use client"

import SiteNavbar from "@/components/SiteNavbar"
import SiteFooter from "@/components/SiteFooter"

export default function CareersPage() {
  return (
    <div
      style={{ background: "#FFFFFF", color: "#171717", fontFamily: "Geist, sans-serif" }}
      className="min-h-screen"
    >
      <SiteNavbar />

      <section className="pt-24 pb-16 px-6 max-w-3xl mx-auto text-center">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#666] mb-4">Careers</p>
        <h1 className="text-5xl font-bold text-[#171717] mb-6">
          Nothing open right now.
        </h1>
        <p className="text-lg text-[#666]">
          Thesis is small today. When that changes, roles will be posted here first.
        </p>
      </section>

      <section className="pb-24 px-6 max-w-2xl mx-auto text-center">
        <div className="rounded-xl border border-[#EAEAEA] bg-[#FAFAFA] p-10">
          <p className="text-[#666] leading-relaxed">
            If you think you could help and do not want to wait for a formal posting, reach out through the contact options on the pricing page and explain what you would want to work on.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}