'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  BarChart2, Target, FileText, AlertTriangle, Bot, Shield, CheckCircle2,
} from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import { MagicCard } from '@/components/magicui/magic-card';

function ScrollReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionDivider() {
  return (
    <div
      style={{
        width: '100%',
        height: 1,
        background:
          'radial-gradient(ellipse 60% 1px at 50% 50%, rgba(0,0,0,0.08) 0%, transparent 100%)',
      }}
    />
  );
}

function PipelineMockup() {
  const deals = [
    { name: 'Conduit', score: 9.1, stage: 'Series A', sector: 'Fintech', status: 'Active Diligence', scoreColor: '#16A34A' },
    { name: 'Flux', score: 8.2, stage: 'Seed', sector: 'B2B SaaS', status: 'Under Review', scoreColor: '#16A34A' },
    { name: 'Harbr', score: 7.6, stage: 'Series A', sector: 'Climate Tech', status: 'Meeting Scheduled', scoreColor: '#16A34A' },
    { name: 'Tempo', score: 6.1, stage: 'Pre-seed', sector: 'Healthtech', status: 'New', scoreColor: '#D97706' },
  ];
  return (
    <div
      className="w-full overflow-hidden shadow-sm"
      style={{
        background: '#FFFFFF',
        border: '1px solid #EAEAEA',
        borderRadius: 8,
      }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ background: '#FAFAFA', borderBottom: '1px solid #EAEAEA' }}
      >
        <span className="text-xs font-semibold" style={{ color: '#171717', fontFamily: 'Geist, sans-serif' }}>
          Deal Pipeline
        </span>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 10, fontFamily: 'Geist Mono, monospace', color: '#666666' }}>5 deals</span>
          <div
            className="px-2.5 py-1 text-[10px] font-semibold"
            style={{ background: '#D4A017', color: '#FFFFFF', borderRadius: 4, fontFamily: 'Geist, sans-serif' }}
          >
            + Analyze
          </div>
        </div>
      </div>
      <div className="divide-y" style={{ borderColor: '#EAEAEA' }}>
        {deals.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.07 }}
            className="px-4 py-3 flex items-center gap-3"
          >
            <div
              className="w-7 h-7 flex items-center justify-center text-[10px] font-bold flex-shrink-0"
              style={{
                background: '#FAFAFA',
                color: '#D4A017',
                border: '1px solid #EAEAEA',
                borderRadius: 6,
                fontFamily: 'Geist, sans-serif',
              }}
            >
              {d.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold" style={{ color: '#171717', fontFamily: 'Geist, sans-serif' }}>{d.name}</div>
              <div className="text-[10px] mt-0.5" style={{ color: '#666666', fontFamily: 'Geist, sans-serif' }}>
                {d.stage} · {d.sector}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, fontWeight: 700, color: d.scoreColor }}>{d.score}</div>
              <div className="text-[10px] mt-0.5" style={{ color: '#999999', fontFamily: 'Geist, sans-serif' }}>{d.status}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AIDetectionMockup() {
  return (
    <div
      className="overflow-hidden shadow-sm"
      style={{
        background: '#FFFFFF',
        border: '1px solid #EAEAEA',
        borderRadius: 8,
      }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ background: '#FAFAFA', borderBottom: '1px solid #EAEAEA' }}
      >
        <div className="flex items-center gap-2">
          <Bot size={12} style={{ color: '#666666' }} />
          <span style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666666', fontFamily: 'Geist, sans-serif' }}>
            AI Authorship
          </span>
        </div>
        <span
          className="px-2 py-0.5 text-[10px] font-semibold"
          style={{ color: '#16A34A', background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.3)', borderRadius: 4, fontFamily: 'Geist Mono, monospace' }}
        >
          8% Human
        </span>
      </div>
      <div className="px-4 py-3 space-y-2">
        {[
          { n: 'Executive Summary', s: 6 },
          { n: 'Problem / Solution', s: 9 },
          { n: 'Market Sizing', s: 14 },
          { n: 'Traction', s: 5 },
        ].map((s, i) => (
          <div key={s.n}>
            <div className="flex items-center justify-between mb-0.5">
              <span style={{ fontSize: 10, color: '#666666', fontFamily: 'Geist, sans-serif' }}>{s.n}</span>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, color: '#16A34A' }}>{s.s}%</span>
            </div>
            <div className="h-1.5" style={{ background: '#F0F0F0', borderRadius: 99 }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.s}%` }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
                style={{ height: '100%', borderRadius: 99, background: '#16A34A' }}
              />
            </div>
          </div>
        ))}
        <p
          className="text-[10px] leading-relaxed"
          style={{ color: '#666666', borderTop: '1px solid #EAEAEA', paddingTop: 8, marginTop: 4, fontFamily: 'Geist, sans-serif' }}
        >
          No meaningful AI generation markers. Deck reads as hand-authored by operators who know this space deeply.
        </p>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: BarChart2,
    title: 'Structured deal analysis',
    desc: 'Company, market, traction, team, and ask extracted from any PDF into a consistent format. Every deal looks the same so you can actually compare them.',
  },
  {
    icon: Target,
    title: 'Thesis fit scoring',
    desc: "Deals scored against your firm's investment criteria, weighted by what matters to you. Configurable per fund, per analyst.",
  },
  {
    icon: FileText,
    title: 'Investment memo generation',
    desc: 'One-page internal memo written to sound like a human analyst. Structured for partner meetings, ready in seconds.',
  },
  {
    icon: Bot,
    title: 'AI authorship detection',
    desc: 'Flag AI-generated decks before you spend diligence time on them. Section-level scoring with flagged excerpts.',
  },
  {
    icon: AlertTriangle,
    title: 'Automated red flags',
    desc: 'Solo founder, missing revenue model, unsourced market claims, unrealistic projections. Surfaced automatically every time.',
  },
  {
    icon: Shield,
    title: 'Team pipeline and sharing',
    desc: "Share deals with your team, message colleagues inside the app, and track who's looking at what. No more forwarding PDFs. (Firm)",
  },
];

export default function FeaturesPage() {
  const geist = { fontFamily: 'Geist, sans-serif' } as const;
  const mono = { fontFamily: 'Geist Mono, monospace' } as const;

  return (
    <div style={{ background: '#FFFFFF', color: '#171717', ...geist }} className="min-h-screen">
      <SiteNavbar />

      {/* Page header */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666666', fontWeight: 500, marginBottom: 16 }}
          >
            WHAT YOU GET
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#171717', marginBottom: 16 }}
          >
            The complete analyst stack.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontSize: 16, color: '#666666', maxWidth: 520 }}
          >
            Everything a VC analyst needs, minus the four hours of prep work.
          </motion.p>
        </div>
      </section>

      <SectionDivider />

      {/* Problem section */}
      <section className="py-24 px-8" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2
              className="font-bold text-center mb-4"
              style={{ fontSize: 36, color: '#171717', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              Every analyst does this manually.<br />Nobody should have to.
            </h2>
            <p className="text-center text-base mb-14" style={{ color: '#666666', maxWidth: 500, margin: '0 auto 56px' }}>
              Read the deck. Extract market size. Google the founders. Write the notes. Score against thesis. Put it in the spreadsheet. Repeat 50 times a week.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { stat: '50+', label: 'decks per week', detail: 'at a typical early-stage VC firm' },
              { stat: '45 min', label: 'per deck', detail: 'spent on extraction, notes, and write-ups before any real thinking' },
              { stat: '0 tools', label: 'built for this', detail: 'built specifically for analyst-level deal triage, until now' },
            ].map((item, i) => (
              <ScrollReveal key={item.stat} delay={i * 0.07}>
                <div
                  className="p-6 h-full shadow-sm"
                  style={{ background: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: 12 }}
                >
                  <div style={{ ...mono, fontWeight: 700, fontSize: 30, color: '#D4A017', marginBottom: 4 }}>{item.stat}</div>
                  <div className="text-sm font-semibold mb-2" style={{ color: '#171717' }}>{item.label}</div>
                  <div className="text-sm leading-relaxed" style={{ color: '#666666' }}>{item.detail}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Pipeline section */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <ScrollReveal className="flex-1 max-w-[480px]">
              <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666666', fontWeight: 500, marginBottom: 16 }}>
                Pipeline
              </p>
              <h2 className="font-bold mb-4" style={{ fontSize: 36, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#171717' }}>
                Every deal, tracked in one place.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#666666' }}>
                Kanban board and table view for your full deal pipeline. Drag deals between stages, sort by score, and see red flag counts at a glance.
              </p>
              <ul className="space-y-3 mb-8">
                {['Kanban and table views for your pipeline', 'Score-sorted deal ranking', 'One-click status updates', 'Export to CSV for LP reporting'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm" style={{ color: '#666666' }}>
                    <CheckCircle2 size={14} style={{ color: '#16A34A', flexShrink: 0 }} /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ background: 'rgba(212,160,23,0.08)', color: '#D4A017', border: '1px solid rgba(212,160,23,0.3)', borderRadius: 8, padding: '10px 20px', textDecoration: 'none' }}
              >
                View your pipeline →
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="flex-1 w-full max-w-[420px]">
              <PipelineMockup />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* AI Detection section */}
      <section className="py-24 px-8" style={{ background: '#FAFAFA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <ScrollReveal className="flex-1 max-w-[480px]">
              <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666666', fontWeight: 500, marginBottom: 16 }}>
                New Feature
              </p>
              <h2 className="font-bold mb-4" style={{ fontSize: 36, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#171717' }}>
                Know if a deck<br />was written by AI.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: '#666666' }}>
                AI-generated pitch decks are showing up in inboxes at scale. Thesis checks each deck for AI authorship markers and flags the specific sections and excerpts that triggered it.
              </p>
              <ul className="space-y-3 mb-8">
                {['Section-by-section AI score breakdown', 'Flagged excerpts with plain-English reason', 'Analyst-facing summary note', 'Calibrated to common pitch deck patterns'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm" style={{ color: '#666666' }}>
                    <CheckCircle2 size={14} style={{ color: '#16A34A', flexShrink: 0 }} /> {f}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="flex-1 w-full max-w-[360px]">
              <AIDetectionMockup />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Full feature list — 2-col alternating */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-20">
            {FEATURES.map((feat, i) => (
              <ScrollReveal key={feat.title}>
                <div className={`flex flex-col lg:flex-row items-start gap-16 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="flex-1 max-w-md">
                    <feat.icon size={18} style={{ color: '#D4A017', marginBottom: 20 }} />
                    <h3 className="font-bold mb-4" style={{ fontSize: 28, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#171717' }}>
                      {feat.title}
                    </h3>
                    <p className="leading-relaxed mb-6" style={{ fontSize: 15, color: '#666666' }}>
                      {feat.desc}
                    </p>
                    <div style={{ width: 36, height: 2, background: '#D4A017' }} />
                  </div>
                  <div className="flex-1 flex items-center">
                    <MagicCard
                      className="w-full"
                      gradientColor="rgba(212,160,23,0.08)"
                      gradientSize={250}
                    >
                      <div
                        className="w-full flex items-center justify-center"
                        style={{ height: 140, background: '#FAFAFA', border: '1px solid #EAEAEA', borderRadius: 8 }}
                      >
                        <feat.icon size={36} style={{ color: 'rgba(0,0,0,0.08)' }} />
                      </div>
                    </MagicCard>
                  </div>
                </div>
                {i < FEATURES.length - 1 && <div style={{ marginTop: 80, height: 1, background: '#EAEAEA' }} />}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* CTA */}
      <section className="py-20 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-bold mb-5" style={{ fontSize: 36, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#171717' }}>
              Ready to cut your prep time?
            </h2>
            <p className="mb-8" style={{ fontSize: 16, color: '#666666' }}>
              Free to try. No credit card. No onboarding call.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 font-semibold"
              style={{ background: '#D4A017', color: '#FFFFFF', borderRadius: 8, padding: '12px 28px', fontSize: 15, textDecoration: 'none', transition: 'background 150ms' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#B8860B')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#D4A017')}
            >
              Start for free →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
