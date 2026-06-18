"use client"

import SiteNavbar from "@/components/SiteNavbar"
import SiteFooter from "@/components/SiteFooter"

export default function BlogPage() {
  return (
    <div
      style={{ background: "#FFFFFF", color: "#171717", fontFamily: "Geist, sans-serif" }}
      className="min-h-screen"
    >
      <SiteNavbar />

      <section className="pt-24 pb-16 px-6 max-w-3xl mx-auto text-center">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#666] mb-4">Blog</p>
        <h1 className="text-5xl font-bold text-[#171717] mb-6">
          Nothing published yet.
        </h1>
        <p className="text-lg text-[#666]">
          When there is something worth writing about deal flow, thesis scoring, or how Thesis is built, it will go here.
        </p>
      </section>

      <section className="pb-24 px-6 max-w-2xl mx-auto text-center">
        <div className="rounded-xl border border-[#EAEAEA] bg-[#FAFAFA] p-10">
          <p className="text-[#666] leading-relaxed">
            Check back later, or follow updates through the changelog for now.
          </p>
          <a href="/changelog" className="inline-block mt-4 text-sm font-medium text-[#D4A017] hover:text-[#B8860B] transition-colors">
            View the changelog
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}