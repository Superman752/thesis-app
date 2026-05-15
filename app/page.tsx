'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ArrowRight, CheckCircle2, BarChart2, Target, FileText,
  AlertTriangle, Bot, Users, TrendingUp, Search, Zap,
  Shield, Star,
} from 'lucide-react';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
}

function ThesisLogo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <div style={{ width: size, height: size, background: 'var(--brand)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 14px rgba(244,197,66,0.35)', flexShrink: 0 }}>
        <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="12" height="2.5" rx="1" fill="#09090B"/>
          <rect x="2" y="6.75" width="8" height="2.5" rx="1" fill="#09090B"/>
          <rect x="2" y="11.5" width="5" height="2.5" rx="1" fill="#09090B"/>
        </svg>
      </div>
      <span className="font-mono font-bold tracking-tight" style={{ fontSize: size * 0.6, color: 'var(--brand)', lineHeight: 1 }}>thesis</span>
    </div>
  );
}

function PipelineMockup() {
  const deals = [
    { name: 'Conduit', score: 9.1, stage: 'Series A', sector: 'Fintech', status: 'Active Diligence', scoreColor: 'var(--green)' },
    { name: 'Flux', score: 8.2, stage: 'Seed', sector: 'B2B SaaS', status: 'Under Review', scoreColor: 'var(--green)' },
    { name: 'Harbr', score: 7.6, stage: 'Series A', sector: 'Climate Tech', status: 'Meeting Scheduled', scoreColor: 'var(--green)' },
    { name: 'Tempo', score: 6.1, stage: 'Pre-seed', sector: 'Healthtech', status: 'New', scoreColor: 'var(--amber)' },
  ];
  return (
    <div className="rounded-2xl overflow-hidden w-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
        <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>Deal Pipeline</span>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono" style={{ color: 'var(--muted)' }}>5 deals</span>
          <div className="px-2.5 py-1 rounded-lg text-[10px] font-semibold" style={{ background: 'var(--brand)', color: 'var(--bg)' }}>+ Analyze</div>
        </div>
      </div>
      <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
        {deals.map((d, i) => (
          <motion.div key={d.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.07 }} className="px-4 py-3 flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0"
              style={{ background: 'var(--surface2)', color: 'var(--brand)', border: '1px solid var(--border)' }}>
              {d.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{d.name}</div>
              <div className="text-[10px] mt-0.5" style={{ color: 'var(--muted)' }}>{d.stage} · {d.sector}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-mono text-xs font-bold" style={{ color: d.scoreColor }}>{d.score}</div>
              <div className="text-[10px] mt-0.5" style={{ color: 'var(--muted2)' }}>{d.status}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DealAnalysisMockup() {
  const scores = [
    { n: 'Market Size',    s: 10 },
    { n: 'Team',           s: 10 },
    { n: 'Traction',       s: 9  },
    { n: 'Stage Fit',      s: 8  },
    { n: 'Business Model', s: 8  },
    { n: 'Sector Match',   s: 9  },
  ];
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        height: '100%',
        minHeight: 420,
      }}
    >
      {/* Card header */}
      <div className="px-4 py-3" style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div className="flex gap-1.5 mb-2">
          {[{ l: 'Series A', c: 'var(--green)' }, { l: 'Fintech', c: 'var(--blue)' }].map(b => (
            <span key={b.l} className="text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{ color: b.c, background: `${b.c}18`, border: `1px solid ${b.c}30` }}>{b.l}</span>
          ))}
        </div>
        <div className="font-serif text-base mb-0.5" style={{ color: 'var(--text)' }}>Conduit</div>
        <div className="text-[11px]" style={{ color: 'var(--muted)' }}>API infrastructure for real-time cross-border B2B payments</div>
      </div>

      {/* Thesis score bars */}
      <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: 'var(--muted)' }}>Thesis Fit</span>
          <span className="font-mono font-bold text-base" style={{ color: 'var(--brand)' }}>9.1 / 10</span>
        </div>
        {scores.map((c, i) => (
          <div key={c.n} className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] flex-shrink-0" style={{ color: 'var(--muted)', width: 88 }}>{c.n}</span>
            <div className="flex-1 h-1 rounded-full" style={{ background: 'var(--surface2)' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${c.s * 10}%` }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease: 'easeOut' }}
                className="h-full rounded-full" style={{ background: 'var(--green)' }} />
            </div>
            <span className="font-mono text-[10px] font-semibold w-4 text-right" style={{ color: 'var(--green)' }}>{c.s}</span>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--muted2)' }}>
          Recommendation
        </span>
        <span
          className="font-serif text-sm px-3 py-1 rounded-full"
          style={{ background: 'var(--green)', color: '#09090B', letterSpacing: '0.02em' }}
        >
          PURSUE
        </span>
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 flex items-center gap-2 text-[11px] flex-1" style={{ color: 'var(--green)', alignItems: 'center' }}>
        <CheckCircle2 size={12} />
        No significant red flags detected
      </div>
    </div>
  );
}

function AIDetectionMockup() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <Bot size={12} style={{ color: 'var(--muted)' }} />
          <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: 'var(--muted)' }}>AI Authorship</span>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded" style={{ color: 'var(--green)', background: 'var(--green-dim)', border: '1px solid rgba(34,197,94,0.3)' }}>8% Human</span>
      </div>
      <div className="px-4 py-3 space-y-2">
        {[{ n: 'Executive Summary', s: 6, c: 'var(--green)' }, { n: 'Problem / Solution', s: 9, c: 'var(--green)' }, { n: 'Market Sizing', s: 14, c: 'var(--green)' }, { n: 'Traction', s: 5, c: 'var(--green)' }].map((s, i) => (
          <div key={s.n}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{s.n}</span>
              <span className="font-mono text-[10px]" style={{ color: s.c }}>{s.s}%</span>
            </div>
            <div className="h-1 rounded-full" style={{ background: 'var(--surface2)' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${s.s}%` }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
                className="h-full rounded-full" style={{ background: s.c }} />
            </div>
          </div>
        ))}
        <p className="text-[10px] leading-relaxed pt-1" style={{ color: 'var(--muted)', borderTop: '1px solid var(--border)', paddingTop: 8 }}>
          No meaningful AI generation markers. Deck reads as hand-authored by operators who know this space deeply.
        </p>
      </div>
    </div>
  );
}

const PRICING = [
  {
    name: 'Solo Analyst',
    price: 'Free',
    period: '',
    tagline: 'Get started at no cost',
    features: ['10 pitch decks per month', 'Full deal analysis and extraction', 'Investment memo generation', 'Thesis scoring', 'Basic pipeline tracking'],
    cta: 'Start for free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    tagline: 'For the serious analyst',
    features: ['Unlimited pitch decks', 'AI authorship detection', 'Full pipeline tracking', 'CSV export for LPs', 'Priority processing', 'Everything in Solo'],
    cta: 'Start Pro',
    highlight: true,
    badge: 'Most popular',
  },
  {
    name: 'Firm',
    price: '$99',
    period: '/month',
    tagline: 'For the entire fund',
    features: ['Up to 10 analysts', 'Shared investment thesis config', 'Team pipeline and collaboration', 'In-app deal sharing and messaging', 'Slack digest and notifications', 'Everything in Pro'],
    cta: 'Talk to us',
    highlight: false,
  },
];

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)' }} className="min-h-screen">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16"
        style={{ background: 'rgba(9,9,11,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
        <ThesisLogo size={30} />
        <nav className="hidden md:flex items-center gap-8">
          {[['Features', '#features'], ['How it works', '#how-it-works'], ['Pricing', '#pricing']].map(([label, href]) => (
            <a key={label} href={href} className="text-sm transition-colors" style={{ color: 'var(--muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; }}>
              {label}
            </a>
          ))}
        </nav>
        <motion.span whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex' }}>
          <Link href="/login" className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-100"
            style={{ background: 'var(--brand)', color: 'var(--bg)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(244,197,66,0.3)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
            Open Thesis
          </Link>
        </motion.span>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-8">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(244,197,66,0.07) 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-16">
            <motion.div className="flex-1 max-w-[580px]"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-mono"
                style={{ background: 'var(--brand-dim)', border: '1px solid rgba(244,197,66,0.3)', color: 'var(--brand)' }}>
                <Zap size={11} /> Built for VC analysts
              </div>
              <h1 className="font-serif mb-6" style={{ fontSize: '3.5rem', letterSpacing: '-0.01em', lineHeight: 1.08 }}>
                Your deal pipeline<br />shouldn't live in<br />a spreadsheet.
              </h1>
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--muted)', maxWidth: 480 }}>
                Thesis is your firm's deal flow workspace. Upload a pitch deck and get a structured analysis, thesis fit score, and investment memo in under 30 seconds.
              </p>
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <motion.span whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex' }}>
                  <Link href="/login" className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-100"
                    style={{ background: 'var(--brand)', color: 'var(--bg)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(244,197,66,0.25)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                    Start for free <ArrowRight size={15} />
                  </Link>
                </motion.span>
                <motion.a href="#how-it-works" whileTap={{ scale: 0.97 }} className="px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--muted)'; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}>
                  See how it works
                </motion.a>
              </div>
              <div className="flex items-center gap-6 flex-wrap">
                {['Free to start', 'No credit card needed', 'Processes decks in 30s'].map(t => (
                  <div key={t} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted)' }}>
                    <CheckCircle2 size={12} style={{ color: 'var(--green)' }} /> {t}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className="hidden lg:block flex-shrink-0 w-[360px]"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}>
              <DealAnalysisMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <div className="py-5 px-8" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          {[
            { stat: '50+ decks/week', label: 'processed at a typical VC firm' },
            { stat: '45 min/deck', label: 'saved per analysis' },
            { stat: '30 seconds', label: 'from PDF to full memo' },
            { stat: '5 analysts', label: 'reviewable per deal in Firm plan' },
          ].map(item => (
            <div key={item.stat} className="flex items-center gap-3">
              <span className="font-mono font-bold text-base" style={{ color: 'var(--brand)' }}>{item.stat}</span>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Problem */}
      <section className="py-24 px-8" style={{ background: 'var(--light-bg)' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'var(--light-text)', letterSpacing: '-0.02em' }}>
              Every analyst does this manually.<br />Nobody should have to.
            </h2>
            <p className="text-center text-base mb-14" style={{ color: 'rgba(24,24,27,0.6)', maxWidth: 500, margin: '0 auto 56px' }}>
              Read the deck. Extract market size. Google the founders. Write the notes. Score against thesis. Put it in the spreadsheet. Repeat 50 times a week.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { stat: '50+', label: 'decks per week', detail: 'at a typical early-stage VC firm', color: 'var(--brand)' },
              { stat: '45 min', label: 'per deck', detail: 'spent on extraction, notes, and write-ups before any real thinking', color: 'var(--brand)' },
              { stat: '0 tools', label: 'built for this', detail: 'built specifically for analyst-level deal triage, until now', color: 'var(--brand)' },
            ].map((item, i) => (
              <FadeIn key={item.stat} delay={i * 0.07}>
                <div className="p-6 rounded-xl h-full" style={{ background: 'var(--surface)', borderLeft: '3px solid var(--brand)' }}>
                  <div className="font-mono font-bold text-3xl mb-1" style={{ color: 'var(--brand)' }}>{item.stat}</div>
                  <div className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>{item.label}</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.detail}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline screenshot section */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <FadeIn className="flex-1 max-w-[480px]">
              <span className="font-mono text-[11px] uppercase tracking-widest mb-4 block" style={{ color: 'var(--brand)' }}>Pipeline</span>
              <h2 className="text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
                Every deal, tracked in one place.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                Kanban board and table view for your full deal pipeline. Drag deals between stages, sort by score, and see red flag counts at a glance.
              </p>
              <ul className="space-y-3 mb-8">
                {['Kanban and table views for your pipeline', 'Score-sorted deal ranking', 'One-click status updates', 'Export to CSV for LP reporting'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'var(--muted)' }}>
                    <CheckCircle2 size={14} style={{ color: 'var(--green)', flexShrink: 0 }} /> {f}
                  </li>
                ))}
              </ul>
              <motion.span whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex' }}>
                <Link href="/login" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-100"
                  style={{ background: 'var(--brand-dim)', color: 'var(--brand)', border: '1px solid rgba(244,197,66,0.3)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                  View your pipeline <ArrowRight size={14} />
                </Link>
              </motion.span>
            </FadeIn>
            <FadeIn delay={0.1} className="flex-1 w-full max-w-[420px]">
              <PipelineMockup />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* AI Detection section */}
      <section className="py-24 px-8" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <FadeIn className="flex-1 max-w-[480px]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-mono"
                style={{ background: 'var(--brand-dim)', border: '1px solid rgba(244,197,66,0.3)', color: 'var(--brand)' }}>
                <Star size={10} /> New feature
              </div>
              <h2 className="text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
                Know if a deck<br />was written by AI.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                AI-generated pitch decks are showing up in inboxes at scale. Thesis checks each deck for AI authorship markers and flags the specific sections and excerpts that triggered it.
              </p>
              <ul className="space-y-3 mb-8">
                {['Section-by-section AI score breakdown', 'Flagged excerpts with plain-English reason', 'Analyst-facing summary note', 'Calibrated to common pitch deck patterns'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'var(--muted)' }}>
                    <CheckCircle2 size={14} style={{ color: 'var(--green)', flexShrink: 0 }} /> {f}
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.1} className="flex-1 w-full max-w-[360px]">
              <AIDetectionMockup />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="font-mono text-[11px] uppercase tracking-widest mb-3 block" style={{ color: 'var(--muted)' }}>What you get</span>
              <h2 className="text-4xl font-bold mb-3" style={{ letterSpacing: '-0.02em' }}>The complete analyst stack.</h2>
              <p className="text-base" style={{ color: 'var(--muted)' }}>Everything a VC analyst needs, minus the four hours of prep work.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: BarChart2, title: 'Structured deal analysis', desc: 'Company, market, traction, team, and ask extracted from any PDF into a consistent format. Every deal looks the same so you can actually compare them.' },
              { icon: Target, title: 'Thesis fit scoring', desc: 'Deals scored against your firm\'s investment criteria, weighted by what matters to you. Configurable per fund, per analyst.' },
              { icon: FileText, title: 'Investment memo generation', desc: 'One-page internal memo written to sound like a human analyst. Structured for partner meetings, ready in seconds.' },
              { icon: Bot, title: 'AI authorship detection', desc: 'Flag AI-generated decks before you spend diligence time on them. Section-level scoring with flagged excerpts.' },
              { icon: AlertTriangle, title: 'Automated red flags', desc: 'Solo founder, missing revenue model, unsourced market claims, unrealistic projections. Surfaced automatically every time.' },
              { icon: Search, title: 'Competitive landscape', desc: 'Auto-pull competing startups, sector funding trends, and valuation benchmarks so you know where this deal sits in the market. (Pro+)' },
              { icon: Users, title: 'Founder due diligence', desc: 'Employment history cross-check, background signal gathering, and claim verification against the pitch narrative. (Pro+)' },
              { icon: TrendingUp, title: 'Financial model validation', desc: 'Flag unrealistic revenue assumptions, compare unit economics to sector benchmarks, surface where the numbers don\'t add up. (Pro+)' },
              { icon: Shield, title: 'Team pipeline and sharing', desc: 'Share deals with your team, message colleagues inside the app, and track who\'s looking at what. No more forwarding PDFs. (Firm)' },
            ].map((feat, i) => (
              <FadeIn key={feat.title} delay={Math.floor(i / 3) * 0.06}>
                <div className="p-5 rounded-xl h-full transition-all duration-150"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244,197,66,0.3)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: 'var(--brand-dim)', border: '1px solid rgba(244,197,66,0.2)' }}>
                    <feat.icon size={17} style={{ color: 'var(--brand)' }} />
                  </div>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>{feat.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-8" style={{ background: 'var(--surface)' }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-3" style={{ letterSpacing: '-0.02em' }}>Three steps. Thirty seconds.</h2>
              <p className="text-base" style={{ color: 'var(--muted)' }}>From PDF to investment memo without leaving your browser.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Upload the deck', desc: 'Drag in any pitch deck PDF. Thesis reads the full document. No copying, no formatting, no manual extraction.' },
              { step: '2', title: 'Review the analysis', desc: 'Deal data structured. Thesis criteria scored. Red flags surfaced. AI authorship checked. All in about 30 seconds.' },
              { step: '3', title: 'Share the memo', desc: 'One-page investment memo ready for your partner meeting. Export it, share it with the team, or move the deal to the next stage.' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'var(--brand-dim)', border: '1px solid rgba(244,197,66,0.3)' }}>
                    <span className="font-mono font-bold text-xl" style={{ color: 'var(--brand)' }}>{s.step}</span>
                  </div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold mb-3" style={{ letterSpacing: '-0.02em' }}>Simple, honest pricing.</h2>
              <p className="text-base" style={{ color: 'var(--muted)' }}>No per-deck fees, no surprise charges, no enterprise pricing theater.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {PRICING.map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 0.07}>
                <div className="rounded-2xl p-6 flex flex-col relative"
                  style={{ background: plan.highlight ? 'var(--brand-dim)' : 'var(--surface)', border: `1px solid ${plan.highlight ? 'var(--brand)' : 'var(--border)'}` }}>
                  {plan.highlight && 'badge' in plan && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full" style={{ background: 'var(--brand)', color: 'var(--bg)' }}>
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <div className="mb-5">
                    <div className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color: 'var(--muted)' }}>{plan.name}</div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="font-mono font-bold" style={{ fontSize: '2rem', color: plan.highlight ? 'var(--brand)' : 'var(--text)' }}>{plan.price}</span>
                      {plan.period && <span className="text-sm" style={{ color: 'var(--muted)' }}>{plan.period}</span>}
                    </div>
                    <p className="text-xs" style={{ color: 'var(--muted2)' }}>{plan.tagline}</p>
                  </div>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text)' }}>
                        <CheckCircle2 size={13} style={{ color: plan.highlight ? 'var(--brand)' : 'var(--green)', flexShrink: 0, marginTop: 2 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Link href="/login" className="block text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-100"
                      style={plan.highlight ? { background: 'var(--brand)', color: 'var(--bg)' } : { background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border)' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                      {plan.cta}
                    </Link>
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-8" style={{ background: 'var(--surface)' }}>
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-5" style={{ letterSpacing: '-0.025em' }}>
              The next deck you open<br />shouldn't take 45 minutes.
            </h2>
            <p className="text-lg mb-10" style={{ color: 'var(--muted)' }}>
              Free to try. No credit card. No onboarding call. Just upload a deck and see what comes back.
            </p>
            <motion.span whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex' }}>
              <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-100"
                style={{ background: 'var(--brand)', color: 'var(--bg)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(244,197,66,0.3)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                Open Thesis, it's free <ArrowRight size={16} />
              </Link>
            </motion.span>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="px-8 py-10" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <ThesisLogo size={24} />
          <p className="text-xs text-center" style={{ color: 'var(--muted2)' }}>
            Built for analysts who move fast. Not a replacement for your judgment.
          </p>
          <div className="flex items-center gap-6">
            {[['Features', '#features'], ['How it works', '#how-it-works'], ['Pricing', '#pricing']].map(([label, href]) => (
              <a key={label} href={href} className="text-xs transition-colors" style={{ color: 'var(--muted2)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted2)'; }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
