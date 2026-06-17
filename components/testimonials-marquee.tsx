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
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    body: "Cut my deck review time from 45 minutes to under a minute. The thesis fit scoring is eerily accurate.",
  },
  {
    name: "Priya S.", username: "@priyas",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    body: "I was skeptical. Then it flagged a red flag in a deck I'd already bookmarked to pursue. Now I run it on everything.",
  },
  {
    name: "Marcus W.", username: "@marcusw",
    img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    body: "The memo output is clean enough to paste directly into our Notion. That alone saves 20 minutes per deal.",
  },
  {
    name: "Aisha T.", username: "@aishat",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    body: "Finally stopped living in spreadsheets. The pipeline view actually shows where each deal stands.",
  },
  {
    name: "Devon R.", username: "@devonr",
    img: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    body: "We process 80+ inbound decks a month. Thesis handles first-pass on all of them now.",
  },
  {
    name: "Lena M.", username: "@lenam",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    body: "The AI authorship detection flagged something in week one that I would have missed. Genuinely useful.",
  },
  {
    name: "Chris B.", username: "@chrisb",
    img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    body: "Stage fit scoring alone changed how I filter pre-seed decks. Stops me wasting time on obvious mismatches.",
  },
  {
    name: "Yuki N.", username: "@yukin",
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    body: "Setup took 3 minutes. First deck I uploaded had a memo ready before I finished my coffee.",
  },
  {
    name: "Sam O.", username: "@samo",
    img: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    body: "Partner meetings used to start with 10 minutes of deck recap. Now everyone's already read the memo.",
  },
  {
    name: "Mia P.", username: "@miap",
    img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    body: "Red flag detection on solo founders alone has saved us from at least three time-wasting diligence processes.",
  },
  {
    name: "Tyler H.", username: "@tylerh",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    body: "I pulled up a structured memo in front of a founder mid-call. They were more impressed than I was.",
  },
  {
    name: "Nadia C.", username: "@nadiac",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=faces&auto=format&q=80",
    body: "Thesis fit scoring gave us a shared vocabulary across the team. Easier to debate a number than argue gut feelings.",
  },
]

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2))
const secondRow = reviews.slice(Math.ceil(reviews.length / 2))

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
