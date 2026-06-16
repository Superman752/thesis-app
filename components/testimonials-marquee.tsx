"use client"

import { cn } from "@/lib/utils"
import { Marquee } from "@/registry/magicui/marquee"
import { motion } from "framer-motion"

const reviews = [
  { name: "Jordan K.", username: "@jordank", body: "Cut my deck review time from 45 minutes to under a minute. The thesis fit scoring is eerily accurate." },
  { name: "Priya S.", username: "@priyas", body: "I was skeptical. Then it flagged a red flag in a deck I'd already bookmarked to pursue. Now I run it on everything." },
  { name: "Marcus W.", username: "@marcusw", body: "The memo output is clean enough to paste directly into our Notion. That alone saves 20 minutes per deal." },
  { name: "Aisha T.", username: "@aishat", body: "Finally stopped living in spreadsheets. The pipeline view actually shows where each deal stands." },
  { name: "Devon R.", username: "@devonr", body: "We process 80+ inbound decks a month. Thesis handles first-pass on all of them now." },
  { name: "Lena M.", username: "@lenam", body: "The AI authorship detection flagged something in week one that I would have missed. Genuinely useful." },
  { name: "Chris B.", username: "@chrisb", body: "Stage fit scoring alone changed how I filter pre-seed decks. Stops me wasting time on obvious mismatches." },
  { name: "Yuki N.", username: "@yukin", body: "Setup took 3 minutes. First deck I uploaded had a memo ready before I finished my coffee." },
]

const firstRow = reviews.slice(0, 4)
const secondRow = reviews.slice(4)

const ReviewCard = ({ name, username, body }: { name: string; username: string; body: string }) => (
  <figure
    style={{
      width: "280px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.07)",
      background: "rgba(255,255,255,0.03)",
      padding: "16px",
      flexShrink: 0,
    }}
  >
    <div className="flex flex-row items-center gap-2">
      <img
        src={`https://avatar.vercel.sh/${name.split(" ")[0].toLowerCase()}`}
        width={32}
        height={32}
        className="rounded-full"
        alt={name}
      />
      <div className="flex flex-col">
        <figcaption style={{ color: "white", fontSize: "14px", fontWeight: 500 }}>{name}</figcaption>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{username}</p>
      </div>
    </div>
    <blockquote style={{ marginTop: "12px", color: "rgba(255,255,255,0.7)", fontSize: "13px", lineHeight: 1.6 }}>
      {body}
    </blockquote>
  </figure>
)

export function TestimonialsMarquee() {
  return (
    <motion.section
      className="py-20 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="text-center text-xs font-medium tracking-[0.2em] uppercase mb-12" style={{ color: "rgba(255,255,255,0.4)" }}>
        What analysts say
      </p>
      <div className="relative flex w-full flex-col gap-4 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:38s]">
          {firstRow.map((r) => <ReviewCard key={r.username} {...r} />)}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:38s]">
          {secondRow.map((r) => <ReviewCard key={r.username} {...r} />)}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0A0A0A]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0A0A0A]" />
      </div>
    </motion.section>
  )
}
