'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  ArrowRight, CheckCircle2, BarChart2, Target, FileText,
  AlertTriangle, Bot, Shield,
} from 'lucide-react';

// ─── Utility components ────────────────────────────────────────────────────

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
      className="w-full"
      style={{
        height: 1,
        background:
          'radial-gradient(ellipse 60% 1px at 50% 50%, rgba(255,255,255,0.09) 0%, transparent 100%)',
      }}
    />
  );
}

// ─── Logo (unchanged) ──────────────────────────────────────────────────────

function ThesisLogo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        style={{
          width: size,
          height: size,
          background: 'var(--brand)',
          borderRadius: 7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="12" height="2.5" rx="1" fill="#09090B" />
          <rect x="2" y="6.75" width="8" height="2.5" rx="1" fill="#09090B" />
          <rect x="2" y="11.5" width="5" height="2.5" rx="1" fill="#09090B" />
        </svg>
      </div>
      <span
        style={{
          fontFamily: 'Geist Mono, monospace',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          fontSize: size * 0.6,
          color: 'var(--brand)',
          lineHeight: 1,
        }}
      >
        thesis
      </span>
    </div>
  );
}

// ─── Hero card mockups ─────────────────────────────────────────────────────

function PipelineMockup() {
  const deals = [
    { name: 'Conduit', score: 9.1, stage: 'Series A', sector: 'Fintech', status: 'Active Diligence', scoreColor: 'var(--green)' },
    { name: 'Flux', score: 8.2, stage: 'Seed', sector: 'B2B SaaS', status: 'Under Review', scoreColor: 'var(--green)' },
    { name: 'Harbr', score: 7.6, stage: 'Series A', sector: 'Climate Tech', status: 'Meeting Scheduled', scoreColor: 'var(--green)' },
    { name: 'Tempo', score: 6.1, stage: 'Pre-seed', sector: 'Healthtech', status: 'New', scoreColor: 'var(--amber)' },
  ];
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: 'var(--surface)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 8,
      }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ background: 'var(--surface2)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <span className="text-xs font-semibold" style={{ color: 'var(--text)', fontFamily: 'Geist, sans-serif' }}>
          Deal Pipeline
        </span>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 10, fontFamily: 'Geist Mono, monospace', color: 'var(--muted)' }}>5 deals</span>
          <div
            className="px-2.5 py-1 text-[10px] font-semibold"
            style={{ background: 'var(--brand)', color: 'var(--bg)', borderRadius: 4, fontFamily: 'Geist, sans-serif' }}
          >
            + Analyze
          </div>
        </div>
      </div>
      <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
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
                background: 'var(--surface2)',
                color: 'var(--brand)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 6,
                fontFamily: 'Geist, sans-serif',
              }}
            >
              {d.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold" style={{ color: 'var(--text)', fontFamily: 'Geist, sans-serif' }}>
                {d.name}
              </div>
              <div className="text-[10px] mt-0.5" style={{ color: 'var(--muted)', fontFamily: 'Geist, sans-serif' }}>
                {d.stage} · {d.sector}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, fontWeight: 700, color: d.scoreColor }}>
                {d.score}
              </div>
              <div className="text-[10px] mt-0.5" style={{ color: 'var(--muted2)', fontFamily: 'Geist, sans-serif' }}>
                {d.status}
              </div>
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
      className="overflow-hidden flex flex-col"
      style={{
        background: 'var(--surface)',
        border: '1px solid rgba(244,197,66,0.2)',
        borderRadius: 8,
        backdropFilter: 'blur(8px)',
        minHeight: 420,
      }}
    >
      <div
        className="px-4 py-3"
        style={{ background: 'var(--surface2)', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}
      >
        <div className="flex gap-1.5 mb-2">
          {[{ l: 'Series A', c: 'var(--green)' }, { l: 'Fintech', c: 'var(--blue)' }].map(b => (
            <span
              key={b.l}
              className="text-[10px] px-2 py-0.5"
              style={{
                color: b.c,
                background: `${b.c}18`,
                border: `1px solid ${b.c}30`,
                borderRadius: 4,
                fontFamily: 'Geist Mono, monospace',
              }}
            >
              {b.l}
            </span>
          ))}
        </div>
        <div style={{ fontFamily: 'Geist, sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>
          Conduit
        </div>
        <div className="text-[11px]" style={{ color: 'var(--muted)', fontFamily: 'Geist, sans-serif' }}>
          API infrastructure for real-time cross-border B2B payments
        </div>
      </div>

      <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
        <div className="flex items-center justify-between mb-2.5">
          <span
            style={{
              fontSize: 10,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--muted)',
              fontFamily: 'Geist, sans-serif',
            }}
          >
            Thesis Fit
          </span>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontWeight: 700, fontSize: 16, color: 'var(--brand)' }}>
            9.1 / 10
          </span>
        </div>
        {scores.map((c, i) => (
          <div key={c.n} className="flex items-center gap-2 mb-1.5">
            <span style={{ fontSize: 10, color: 'var(--muted)', width: 88, flexShrink: 0, fontFamily: 'Geist, sans-serif' }}>
              {c.n}
            </span>
            <div className="flex-1 h-1.5" style={{ background: 'var(--surface2)', borderRadius: 99 }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${c.s * 10}%` }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease: 'easeOut' }}
                style={{ height: '100%', borderRadius: 99, background: 'var(--green)' }}
              />
            </div>
            <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, fontWeight: 600, width: 16, textAlign: 'right', color: 'var(--green)' }}>
              {c.s}
            </span>
          </div>
        ))}
      </div>

      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}
      >
        <span
          style={{
            fontFamily: 'Geist Mono, monospace',
            fontSize: 10,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--muted2)',
          }}
        >
          Recommendation
        </span>
        <span
          className="px-3 py-1"
          style={{
            background: 'var(--green)',
            color: '#09090B',
            fontFamily: 'Geist, sans-serif',
            fontWeight: 600,
            fontSize: 12,
            borderRadius: 4,
            letterSpacing: '0.05em',
          }}
        >
          PURSUE
        </span>
      </div>

      <div className="px-4 py-2.5 flex items-center gap-2 flex-1" style={{ color: 'var(--green)' }}>
        <CheckCircle2 size={12} />
        <span style={{ fontSize: 11, fontFamily: 'Geist, sans-serif' }}>No significant red flags detected</span>
      </div>
    </div>
  );
}

function AIDetectionMockup() {
  return (
    <div
      className="overflow-hidden"
      style={{
        background: 'var(--surface)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 8,
      }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ background: 'var(--surface2)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-2">
          <Bot size={12} style={{ color: 'var(--muted)' }} />
          <span
            style={{
              fontSize: 10,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--muted)',
              fontFamily: 'Geist, sans-serif',
            }}
          >
            AI Authorship
          </span>
        </div>
        <span
          className="px-2 py-0.5 text-[10px] font-semibold"
          style={{
            color: 'var(--green)',
            background: 'var(--green-dim)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 4,
            fontFamily: 'Geist Mono, monospace',
          }}
        >
          8% Human
        </span>
      </div>
      <div className="px-4 py-3 space-y-2">
        {[
          { n: 'Executive Summary', s: 6, c: 'var(--green)' },
          { n: 'Problem / Solution', s: 9, c: 'var(--green)' },
          { n: 'Market Sizing', s: 14, c: 'var(--green)' },
          { n: 'Traction', s: 5, c: 'var(--green)' },
        ].map((s, i) => (
          <div key={s.n}>
            <div className="flex items-center justify-between mb-0.5">
              <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'Geist, sans-serif' }}>{s.n}</span>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, color: s.c }}>{s.s}%</span>
            </div>
            <div className="h-1.5" style={{ background: 'var(--surface2)', borderRadius: 99 }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.s}%` }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
                style={{ height: '100%', borderRadius: 99, background: s.c }}
              />
            </div>
          </div>
        ))}
        <p
          className="text-[10px] leading-relaxed"
          style={{
            color: 'var(--muted)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            paddingTop: 8,
            marginTop: 4,
            fontFamily: 'Geist, sans-serif',
          }}
        >
          No meaningful AI generation markers. Deck reads as hand-authored by operators who know this space deeply.
        </p>
      </div>
    </div>
  );
}

// ─── Topographic background ────────────────────────────────────────────────

function TopoBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="topo-fade" cx="50%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#F4C542" stopOpacity="0.05" />
          <stop offset="55%" stopColor="#F4C542" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#F4C542" stopOpacity="0" />
        </radialGradient>
        <mask id="topo-mask">
          <rect width="100%" height="100%" fill="url(#topo-fade)" />
        </mask>
      </defs>
      <g mask="url(#topo-mask)" stroke="#F4C542" strokeWidth="0.75" fill="none">
        {[15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125].map((r, i) => (
          <ellipse key={i} cx="50%" cy="-5%" rx={`${r}%`} ry={`${r * 0.72}%`} />
        ))}
      </g>
    </svg>
  );
}

// ─── Stat strip with count-up ──────────────────────────────────────────────

function CountUp({ to, suffix = '', duration = 800 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return (
    <span ref={ref} style={{ fontFamily: 'Geist Mono, monospace', color: 'var(--brand)', fontSize: 28, fontWeight: 700 }}>
      {count}{suffix}
    </span>
  );
}

function StatStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div
      ref={ref}
      className="py-8 px-8"
      style={{ background: 'rgba(255,255,255,0.01)' }}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0">
        {[
          { label: 'decks / analyst / week', node: <CountUp to={50} suffix="+" /> },
          {
            label: 'average analysis time',
            node: (
              <span style={{ fontFamily: 'Geist Mono, monospace', color: 'var(--brand)', fontSize: 28, fontWeight: 700 }}>
                {inView ? <CountUp to={30} suffix=" sec" /> : '0 sec'}
              </span>
            ),
          },
          {
            label: 'coverage',
            node: (
              <span style={{ fontFamily: 'Geist Mono, monospace', color: 'var(--brand)', fontSize: 28, fontWeight: 700 }}>
                Pre-seed → A
              </span>
            ),
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center py-4 text-center"
            style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
          >
            {stat.node}
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif', marginTop: 6 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pricing data ──────────────────────────────────────────────────────────

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

// ─── Page ──────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const geist = { fontFamily: 'Geist, sans-serif' } as const;
  const mono = { fontFamily: 'Geist Mono, monospace' } as const;

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', ...geist }} className="min-h-screen">

      {/* ── Announcement bar ─────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8"
        style={{ height: 40, borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(9,9,11,0.97)', ...geist }}
      >
        <div className="flex items-center gap-3" style={{ fontSize: 13 }}>
          <span
            className="font-semibold px-2 py-0.5"
            style={{ background: 'var(--brand)', color: '#09090B', borderRadius: 4, fontSize: 11 }}
          >
            NEW
          </span>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>AI authorship detection now available for all plans</span>
        </div>
        <a
          href="#features"
          style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
        >
          Learn more →
        </a>
      </div>

      {/* ── Navbar ───────────────────────────────────────────────────── */}
      <header
        className="fixed left-0 right-0 z-40 flex items-center justify-between px-8 transition-all duration-200"
        style={{
          top: 40,
          height: 56,
          background: scrolled ? 'rgba(9,9,11,0.88)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          ...geist,
        }}
      >
        <ThesisLogo size={28} />
        <nav className="hidden md:flex items-center gap-8">
          {[['Features', '#features'], ['How it works', '#how-it-works'], ['Pricing', '#pricing']].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm transition-colors duration-150"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.55)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
          >
            Log in
          </Link>
          <motion.span whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex' }}>
            <Link
              href="/login"
              className="px-4 py-1.5 text-sm font-semibold"
              style={{ background: 'var(--brand)', color: '#09090B', borderRadius: 6 }}
            >
              Sign up
            </Link>
          </motion.span>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: 'calc(40px + 56px + 88px)', paddingBottom: 96, paddingLeft: 32, paddingRight: 32 }}
      >
        <TopoBackground />

        {/* Column grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', height: '100%', maxWidth: 1280, margin: '0 auto' }}>
            {[...Array(7)].map((_, i) => (
              <div key={i} style={{ borderLeft: '1px solid rgba(255,255,255,0.03)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: -5, width: 10, height: 10, borderLeft: '1px solid rgba(255,255,255,0.12)', borderTop: '1px solid rgba(255,255,255,0.12)' }} />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-start gap-20">

            {/* Text */}
            <div className="flex-1 max-w-[600px]">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginBottom: 20 }}
              >
                DEAL FLOW INTELLIGENCE
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                style={{ fontSize: 'clamp(42px, 5vw, 68px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', marginBottom: 24 }}
              >
                Your deal pipeline<br />shouldn't live in<br />a spreadsheet.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                style={{ fontSize: 18, lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', maxWidth: 500, marginBottom: 32 }}
              >
                Thesis is your firm's deal flow workspace. Upload a pitch deck and get a structured analysis, thesis fit score, and investment memo in under 30 seconds.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-3 flex-wrap"
                style={{ marginBottom: 24 }}
              >
                <motion.span whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex' }}>
                  <Link
                    href="/login"
                    className="flex items-center gap-2"
                    style={{ background: 'var(--brand)', color: '#09090B', borderRadius: 6, padding: '12px 24px', fontSize: 16, fontWeight: 600 }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    Start for free <ArrowRight size={15} />
                  </Link>
                </motion.span>
                <motion.a
                  href="#how-it-works"
                  whileTap={{ scale: 0.97 }}
                  style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.65)', borderRadius: 6, padding: '12px 24px', fontSize: 16 }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
                >
                  See how it works
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.28 }}
                className="flex items-center gap-6 flex-wrap"
              >
                {['Free to start', 'No credit card needed', 'Processes decks in 30s'].map(t => (
                  <div key={t} className="flex items-center gap-1.5" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                    <CheckCircle2 size={12} style={{ color: 'var(--green)' }} /> {t}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Floating card */}
            <motion.div
              className="hidden lg:block flex-shrink-0 w-[360px]"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
              >
                <DealAnalysisMockup />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <SectionDivider />
      <StatStrip />
      <SectionDivider />

      {/* ── Problem section ───────────────────────────────────────────── */}
      <section className="py-24 px-8" style={{ background: 'var(--light-bg)' }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2
              className="font-bold text-center mb-4"
              style={{ fontSize: 40, color: 'var(--light-text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              Every analyst does this manually.<br />Nobody should have to.
            </h2>
            <p className="text-center text-base mb-14" style={{ color: 'rgba(24,24,27,0.55)', maxWidth: 500, margin: '0 auto 56px' }}>
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
                  className="p-6 h-full"
                  style={{ background: 'white', borderLeft: '3px solid var(--brand)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8 }}
                >
                  <div style={{ ...mono, fontWeight: 700, fontSize: 30, color: 'var(--brand)', marginBottom: 4 }}>{item.stat}</div>
                  <div className="text-sm font-semibold mb-2" style={{ color: 'var(--light-text)' }}>{item.label}</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'rgba(24,24,27,0.55)' }}>{item.detail}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Pipeline section ─────────────────────────────────────────── */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <ScrollReveal className="flex-1 max-w-[480px]">
              <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginBottom: 16 }}>
                Pipeline
              </p>
              <h2 className="font-bold mb-4" style={{ fontSize: 40, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Every deal, tracked in one place.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Kanban board and table view for your full deal pipeline. Drag deals between stages, sort by score, and see red flag counts at a glance.
              </p>
              <ul className="space-y-3 mb-8">
                {['Kanban and table views for your pipeline', 'Score-sorted deal ranking', 'One-click status updates', 'Export to CSV for LP reporting'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    <CheckCircle2 size={14} style={{ color: 'var(--green)', flexShrink: 0 }} /> {f}
                  </li>
                ))}
              </ul>
              <motion.span whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex' }}>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ background: 'var(--brand-dim)', color: 'var(--brand)', border: '1px solid rgba(244,197,66,0.3)', borderRadius: 6, padding: '10px 20px' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  View your pipeline <ArrowRight size={14} />
                </Link>
              </motion.span>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="flex-1 w-full max-w-[420px]">
              <PipelineMockup />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── AI Detection section ─────────────────────────────────────── */}
      <section className="py-24 px-8" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <ScrollReveal className="flex-1 max-w-[480px]">
              <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginBottom: 16 }}>
                New Feature
              </p>
              <h2 className="font-bold mb-4" style={{ fontSize: 40, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Know if a deck<br />was written by AI.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                AI-generated pitch decks are showing up in inboxes at scale. Thesis checks each deck for AI authorship markers and flags the specific sections and excerpts that triggered it.
              </p>
              <ul className="space-y-3 mb-8">
                {['Section-by-section AI score breakdown', 'Flagged excerpts with plain-English reason', 'Analyst-facing summary note', 'Calibrated to common pitch deck patterns'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    <CheckCircle2 size={14} style={{ color: 'var(--green)', flexShrink: 0 }} /> {f}
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

      {/* ── Features — 2-col alternating ─────────────────────────────── */}
      <section id="features" className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginBottom: 16 }}>
              WHAT YOU GET
            </p>
            <h2 className="font-bold mb-3" style={{ fontSize: 40, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              The complete analyst stack.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', marginBottom: 72 }}>
              Everything a VC analyst needs, minus the four hours of prep work.
            </p>
          </ScrollReveal>

          <div className="space-y-20">
            {[
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
                desc: 'Share deals with your team, message colleagues inside the app, and track who\'s looking at what. No more forwarding PDFs. (Firm)',
              },
            ].map((feat, i) => (
              <ScrollReveal key={feat.title}>
                <div className={`flex flex-col lg:flex-row items-start gap-16 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="flex-1 max-w-md">
                    <feat.icon size={18} style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 20 }} />
                    <h3 className="font-bold mb-4" style={{ fontSize: 32, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                      {feat.title}
                    </h3>
                    <p className="leading-relaxed mb-6" style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)' }}>
                      {feat.desc}
                    </p>
                    <div style={{ width: 36, height: 2, background: 'rgba(244,197,66,0.4)' }} />
                  </div>
                  <div className="flex-1 flex items-center">
                    <div
                      className="w-full flex items-center justify-center"
                      style={{ height: 140, background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}
                    >
                      <feat.icon size={36} style={{ color: 'rgba(255,255,255,0.06)' }} />
                    </div>
                  </div>
                </div>
                {i < 5 && <div style={{ marginTop: 80, height: 1, background: 'rgba(255,255,255,0.04)' }} />}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-8" style={{ background: 'var(--surface)' }}>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-bold mb-3" style={{ fontSize: 40, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Three steps. Thirty seconds.
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)' }}>From PDF to investment memo without leaving your browser.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Upload the deck', desc: 'Drag in any pitch deck PDF. Thesis reads the full document. No copying, no formatting, no manual extraction.' },
              { step: '2', title: 'Review the analysis', desc: 'Deal data structured. Thesis criteria scored. Red flags surfaced. AI authorship checked. All in about 30 seconds.' },
              { step: '3', title: 'Share the memo', desc: 'One-page investment memo ready for your partner meeting. Export it, share it with the team, or move the deal to the next stage.' },
            ].map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="text-center">
                  <div
                    className="w-12 h-12 flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'var(--brand-dim)', border: '1px solid rgba(244,197,66,0.3)', borderRadius: 8 }}
                  >
                    <span style={{ ...mono, fontWeight: 700, fontSize: 20, color: 'var(--brand)' }}>{s.step}</span>
                  </div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginBottom: 16 }}>
              WHAT ANALYSTS SAY
            </p>
            <h2 className="font-bold mb-14" style={{ fontSize: 40, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Used by analysts who move fast.
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                quote: "I've been running it on every inbound for six weeks. The red flag detection surfaces things I would have missed on page 12.",
                name: 'Sarah Chen',
                role: 'Principal, Meridian Ventures',
              },
              {
                quote: 'The thesis scoring is what sold me. Every deal gets evaluated against the same criteria, which means my instincts get better over time, not just my workflow.',
                name: 'Marcus Webb',
                role: 'Associate, Foundry Capital',
              },
              {
                quote: "Our Monday IC prep used to take half the day. Now it's two hours. The memos aren't perfect, but they're a better starting point than anything I could write in that time.",
                name: 'Priya Nair',
                role: 'Senior Analyst, Clearwater Partners',
              },
            ].map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <div
                  className="flex flex-col h-full p-6"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8 }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)')}
                >
                  <p className="flex-1 mb-6 leading-relaxed" style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)' }}>
                    {t.quote}
                  </p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#fff', marginBottom: 2 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{t.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Pricing ──────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-8" style={{ background: 'var(--surface)' }}>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-bold mb-3" style={{ fontSize: 40, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Simple, honest pricing.
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)' }}>
                No per-deck fees, no surprise charges, no enterprise pricing theater.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {PRICING.map((plan, i) => (
              <ScrollReveal key={plan.name} delay={i * 0.07}>
                <div
                  className="relative flex flex-col"
                  style={{
                    background: plan.highlight ? 'rgba(12,12,14,0.9)' : 'var(--surface2)',
                    border: plan.highlight ? '1px solid rgba(244,197,66,0.6)' : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 8,
                    padding: plan.highlight ? '28px 24px' : '24px',
                    marginTop: plan.highlight ? -6 : 0,
                    marginBottom: plan.highlight ? -6 : 0,
                  }}
                >
                  {plan.highlight && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ borderRadius: 8, background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(244,197,66,0.04) 0%, transparent 70%)' }}
                    />
                  )}
                  <div className="mb-5 relative">
                    <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 500, marginBottom: 8 }}>
                      {plan.name}
                    </div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span style={{ ...mono, fontWeight: 700, fontSize: 48, color: plan.highlight ? 'var(--brand)' : 'var(--text)', lineHeight: 1 }}>
                        {plan.price}
                      </span>
                      {plan.period && <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>{plan.period}</span>}
                    </div>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{plan.tagline}</p>
                  </div>
                  <ul className="flex-1" style={{ marginBottom: 24 }}>
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5" style={{ marginBottom: 10, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                        <CheckCircle2 size={13} style={{ color: plan.highlight ? 'var(--brand)' : 'var(--green)', flexShrink: 0, marginTop: 2 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/login"
                      className="block text-center font-semibold"
                      style={
                        plan.highlight
                          ? { background: 'var(--brand)', color: '#09090B', borderRadius: 6, padding: '10px', fontSize: 14 }
                          : { background: 'var(--surface)', color: 'var(--text)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, padding: '10px', fontSize: 14 }
                      }
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                      {plan.cta}
                    </Link>
                  </motion.div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="py-24 px-8">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-bold mb-5" style={{ fontSize: 48, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              The next deck you open<br />shouldn't take 45 minutes.
            </h2>
            <p className="mb-10" style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)' }}>
              Free to try. No credit card. No onboarding call. Just upload a deck and see what comes back.
            </p>
            <motion.span whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex' }}>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 font-semibold"
                style={{ background: 'var(--brand)', color: '#09090B', borderRadius: 6, padding: '14px 32px', fontSize: 16 }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Open Thesis, it's free <ArrowRight size={16} />
              </Link>
            </motion.span>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="px-8 py-10" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <ThesisLogo size={24} />
          <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.22)' }}>
            Built for analysts who move fast. Not a replacement for your judgment.
          </p>
          <div className="flex items-center gap-6">
            {[['Features', '#features'], ['How it works', '#how-it-works'], ['Pricing', '#pricing']].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-xs transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.25)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
