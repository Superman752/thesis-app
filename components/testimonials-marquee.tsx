"use client"

import { Marquee } from "@/registry/magicui/marquee"
import { AvatarCircles } from "@/registry/magicui/avatar-circles"
import { motion } from "framer-motion"

const avatars = [
  { imageUrl: "https://avatars.githubusercontent.com/u/16860528", profileUrl: "#" },
  { imageUrl: "https://avatars.githubusercontent.com/u/20110627", profileUrl: "#" },
  { imageUrl: "https://avatars.githubusercontent.com/u/106103625", profileUrl: "#" },
  { imageUrl: "https://avatars.githubusercontent.com/u/59228569", profileUrl: "#" },
  { imageUrl: "https://avatars.githubusercontent.com/u/59442788", profileUrl: "#" },
  { imageUrl: "https://avatars.githubusercontent.com/u/89768406", profileUrl: "#" },
]

const reviews = [
  {
    name: "Jordan K.", username: "@jordank",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    body: "Cut my deck review time from 45 minutes to under a minute. The thesis fit scoring is eerily accurate.",
  },
  {
    name: "Priya S.", username: "@priyas",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face",
    body: "I was skeptical. Then it flagged a red flag in a deck I'd already bookmarked to pursue. Now I run it on everything.",
  },
  {
    name: "Marcus W.", username: "@marcusw",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    body: "The memo output is clean enough to paste directly into our Notion. That alone saves 20 minutes per deal.",
  },
  {
    name: "Aisha T.", username: "@aishat",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=64&h=64&fit=crop&crop=face",
    body: "Finally stopped living in spreadsheets. The pipeline view actually shows where each deal stands.",
  },
  {
    name: "Devon R.", username: "@devonr",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    body: "We process 80+ inbound decks a month. Thesis handles first-pass on all of them now.",
  },
  {
    name: "Lena M.", username: "@lenam",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    body: "The AI authorship detection flagged something in week one that I would have missed. Genuinely useful.",
  },
  {
    name: "Chris B.", username: "@chrisb",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=64&h=64&fit=crop&crop=face",
    body: "Stage fit scoring alone changed how I filter pre-seed decks. Stops me wasting time on obvious mismatches.",
  },
  {
    name: "Yuki N.", username: "@yukin",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face",
    body: "Setup took 3 minutes. First deck I uploaded had a memo ready before I finished my coffee.",
  },
]

const firstRow = reviews.slice(0, 4)
const secondRow = reviews.slice(4)

const ReviewCard = ({ name, username, body, img }: { name: string; username: string; body: string; img: string }) => (
  <figure
    className="shadow-sm"
    style={{
      width: "280px",
      borderRadius: "12px",
      border: "1px solid #EAEAEA",
      background: "#FFFFFF",
      padding: "16px",
      flexShrink: 0,
    }}
  >
    <div className="flex flex-row items-center gap-2">
      <img
        src={img}
        width={32}
        height={32}
        className="rounded-full object-cover"
        alt={name}
      />
      <div className="flex flex-col">
        <figcaption style={{ color: "#171717", fontSize: "14px", fontWeight: 500 }}>{name}</figcaption>
        <p style={{ color: "#666666", fontSize: "12px" }}>{username}</p>
      </div>
    </div>
    <blockquote style={{ marginTop: "12px", color: "#666666", fontSize: "13px", lineHeight: 1.6 }}>
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
      <div className="flex flex-col items-center gap-4 mb-12">
        <AvatarCircles numPeople={99} avatarUrls={avatars} />
        <p className="text-center text-xs font-medium tracking-[0.2em] uppercase" style={{ color: "#666666" }}>
          What analysts say
        </p>
      </div>
      <div className="relative flex w-full flex-col gap-4 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:38s]">
          {firstRow.map((r) => <ReviewCard key={r.username} {...r} />)}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:38s]">
          {secondRow.map((r) => <ReviewCard key={r.username} {...r} />)}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white" />
      </div>
    </motion.section>
  )
}
