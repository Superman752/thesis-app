'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import { TestimonialsMarquee } from '@/components/testimonials-marquee';
import { WhyThesis } from '@/components/why-thesis';
import { MemoPreview } from '@/components/memo-preview';
import { PreFooterCTA } from '@/components/pre-footer-cta';
import { RippleButton } from '@/registry/magicui/ripple-button';
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button';
import { TypingAnimation } from '@/registry/magicui/typing-animation';
import { NumberTicker } from '@/registry/magicui/number-ticker';
import { Ripple } from '@/registry/magicui/ripple';
import { ScrollVelocityContainer, ScrollVelocityRow } from '@/registry/magicui/scroll-based-velocity';

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
      style={{
        width: '100%',
        height: 1,
        background:
          'radial-gradient(ellipse 60% 1px at 50% 50%, rgba(0,0,0,0.08) 0%, transparent 100%)',
      }}
    />
  );
}

// ─── Hero card mockup ──────────────────────────────────────────────────────

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
      className="overflow-hidden flex flex-col shadow-sm"
      style={{
        background: '#FFFFFF',
        border: '1px solid #EAEAEA',
        borderRadius: 8,
        minHeight: 420,
      }}
    >
      <div
        className="px-4 py-3"
        style={{ background: '#FAFAFA', borderBottom: '1px solid #EAEAEA', flexShrink: 0 }}
      >
        <div className="flex gap-1.5 mb-2">
          {[{ l: 'Series A', c: '#16A34A' }, { l: 'Fintech', c: '#2563EB' }].map(b => (
            <span
              key={b.l}
              className="text-[10px] px-2 py-0.5"
              style={{ color: b.c, background: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: 4, fontFamily: 'Geist Mono, monospace' }}
            >
              {b.l}
            </span>
          ))}
        </div>
        <div style={{ fontFamily: 'Geist, sans-serif', fontSize: 14, fontWeight: 600, color: '#171717', marginBottom: 2 }}>
          Conduit
        </div>
        <div className="text-[11px]" style={{ color: '#666666', fontFamily: 'Geist, sans-serif' }}>
          API infrastructure for real-time cross-border B2B payments
        </div>
      </div>

      <div className="px-4 py-3" style={{ borderBottom: '1px solid #EAEAEA', flexShrink: 0 }}>
        <div className="flex items-center justify-between mb-2.5">
          <span style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666666', fontFamily: 'Geist, sans-serif' }}>
            Thesis Fit
          </span>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontWeight: 700, fontSize: 16, color: '#D4A017' }}>
            9.1 / 10
          </span>
        </div>
        {scores.map((c, i) => (
          <div key={c.n} className="flex items-center gap-2 mb-1.5">
            <span style={{ fontSize: 10, color: '#666666', width: 88, flexShrink: 0, fontFamily: 'Geist, sans-serif' }}>
              {c.n}
            </span>
            <div className="flex-1 h-1.5" style={{ background: '#F0F0F0', borderRadius: 99 }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${c.s * 10}%` }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease: 'easeOut' }}
                style={{ height: '100%', borderRadius: 99, background: '#D4A017' }}
              />
            </div>
            <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, fontWeight: 600, width: 16, textAlign: 'right', color: '#171717' }}>
              {c.s}
            </span>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #EAEAEA', flexShrink: 0 }}>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999999' }}>
          Recommendation
        </span>
        <span
          className="px-3 py-1"
          style={{ background: '#D4A017', color: '#FFFFFF', fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 12, borderRadius: 4, letterSpacing: '0.05em' }}
        >
          PURSUE
        </span>
      </div>

      <div className="px-4 py-2.5 flex items-center gap-2 flex-1" style={{ color: '#16A34A' }}>
        <CheckCircle2 size={12} />
        <span style={{ fontSize: 11, fontFamily: 'Geist, sans-serif' }}>No significant red flags detected</span>
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
          <stop offset="0%" stopColor="#D4A017" stopOpacity="0.05" />
          <stop offset="55%" stopColor="#D4A017" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
        </radialGradient>
        <mask id="topo-mask">
          <rect width="100%" height="100%" fill="url(#topo-fade)" />
        </mask>
      </defs>
      <g mask="url(#topo-mask)" stroke="#D4A017" strokeWidth="0.75" fill="none">
        {[15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125].map((r, i) => (
          <ellipse key={i} cx="50%" cy="-5%" rx={`${r}%`} ry={`${r * 0.72}%`} />
        ))}
      </g>
    </svg>
  );
}

// ─── Stat strip with NumberTicker ──────────────────────────────────────────

function StatStrip() {
  const numStyle = {
    fontFamily: 'Geist, sans-serif',
    color: '#171717',
    fontSize: 30,
    fontWeight: 700,
  } as const;
  return (
    <div className="py-10 px-8" style={{ background: '#FAFAFA', borderTop: '1px solid #EAEAEA', borderBottom: '1px solid #EAEAEA' }}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0">
        {[
          {
            label: 'decks / analyst / week',
            node: (
              <span style={numStyle}>
                <NumberTicker value={50} />+
              </span>
            ),
          },
          {
            label: 'average analysis time',
            node: (
              <span style={numStyle}>
                <NumberTicker value={30} delay={200} /> sec
              </span>
            ),
          },
          {
            label: 'coverage',
            node: (
              <span style={numStyle}>
                Pre-seed → A
              </span>
            ),
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center py-4 text-center"
            style={{ borderRight: i < 2 ? '1px solid #EAEAEA' : 'none' }}
          >
            {stat.node}
            <div style={{ fontSize: 14, color: '#666666', fontFamily: 'Geist, sans-serif', marginTop: 6 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const geist = { fontFamily: 'Geist, sans-serif' } as const;

  return (
    <div style={{ background: '#FFFFFF', color: '#171717', ...geist }} className="min-h-screen">

      <SiteNavbar />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: 88, paddingBottom: 96, paddingLeft: 32, paddingRight: 32 }}
      >
        <TopoBackground />

        {/* Column grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', height: '100%', maxWidth: 1280, margin: '0 auto' }}>
            {[...Array(7)].map((_, i) => (
              <div key={i} style={{ borderLeft: '1px solid rgba(0,0,0,0.04)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: -5, width: 10, height: 10, borderLeft: '1px solid rgba(0,0,0,0.10)', borderTop: '1px solid rgba(0,0,0,0.10)' }} />
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
                className="text-xs"
                style={{ letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666666', fontWeight: 500, marginBottom: 20 }}
              >
                DEAL FLOW INTELLIGENCE
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="font-bold"
                style={{ fontSize: 'clamp(42px, 5vw, 68px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.03em', color: '#171717', marginBottom: 24 }}
              >
                <TypingAnimation duration={35}>
                  Your deal pipeline shouldn&apos;t live in a spreadsheet.
                </TypingAnimation>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                style={{ fontSize: 18, lineHeight: 1.65, color: '#666666', maxWidth: 500, marginBottom: 32 }}
              >
                Thesis is your firm&apos;s deal flow workspace. Upload a pitch deck and get a structured analysis, thesis fit score, and investment memo in under 30 seconds.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-3 flex-wrap"
                style={{ marginBottom: 24 }}
              >
                <RippleButton href="/login">Start for free →</RippleButton>
                <InteractiveHoverButton href="/how-it-works">See how it works</InteractiveHoverButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.28 }}
                className="flex items-center gap-6 flex-wrap"
              >
                {['Free to start', 'No credit card needed', 'Processes decks in 30s'].map(t => (
                  <div key={t} className="flex items-center gap-1.5 text-xs" style={{ color: '#666666' }}>
                    <CheckCircle2 size={12} style={{ color: '#16A34A' }} /> {t}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Floating product card */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              {/* Glow behind the card */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(212,160,23,0.06) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
              {/* The existing DealAnalysisMockup, unchanged */}
              <DealAnalysisMockup />
            </motion.div>

          </div>
        </div>
      </section>

      <SectionDivider />
      <StatStrip />
      <SectionDivider />

      {/* ── Scroll velocity band ──────────────────────────────────────── */}
      <div className="w-full border-y border-[#EAEAEA] bg-[#FAFAFA] py-10 overflow-hidden">
        <ScrollVelocityContainer className="text-2xl md:text-3xl font-semibold tracking-tight text-[#171717]">
          <ScrollVelocityRow baseVelocity={2.5} direction={1}>
            Pre-seed&nbsp;&nbsp;·&nbsp;&nbsp;Seed&nbsp;&nbsp;·&nbsp;&nbsp;Series A&nbsp;&nbsp;·&nbsp;&nbsp;30 Second Analysis&nbsp;&nbsp;·&nbsp;&nbsp;No Spreadsheets&nbsp;&nbsp;·&nbsp;&nbsp;Built for Analysts&nbsp;&nbsp;·&nbsp;&nbsp;
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>

      {/* ── Brief product section ─────────────────────────────────────── */}
      <section className="py-24 px-8" style={{ background: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-bold mb-5" style={{ fontSize: 36, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#171717' }}>
              Upload a deck. Get a memo.<br />Move on to the next one.
            </h2>
            <p style={{ fontSize: 16, color: '#666666', lineHeight: 1.65, marginBottom: 32 }}>
              Thesis reads any pitch deck PDF natively and returns a structured deal analysis, thesis fit score, red flag summary, and investment memo in under 30 seconds. No setup, no integrations, no training required.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/features"
                style={{ fontSize: 14, color: '#D4A017', textDecoration: 'none', transition: 'color 150ms' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#B8860B')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#D4A017')}
              >
                See all features →
              </Link>
              <Link
                href="/how-it-works"
                style={{ fontSize: 14, color: '#D4A017', textDecoration: 'none', transition: 'color 150ms' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#B8860B')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#D4A017')}
              >
                How it works →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <TestimonialsMarquee />

      <SectionDivider />
      <WhyThesis />
      <MemoPreview />
      <PreFooterCTA />

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="py-24 px-8 relative overflow-hidden" style={{ background: '#FFFFFF' }}>
        <Ripple />
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-bold mb-5" style={{ fontSize: 48, letterSpacing: '-0.025em', lineHeight: 1.1, color: '#171717' }}>
              The next deck you open<br />shouldn&apos;t take 45 minutes.
            </h2>
            <p className="mb-10" style={{ fontSize: 18, color: '#666666' }}>
              Free to try. No credit card. No onboarding call. Just upload a deck and see what comes back.
            </p>
            <RippleButton href="/login" className="px-8 py-4 text-base">
              Open Thesis, it&apos;s free <ArrowRight size={16} />
            </RippleButton>
          </div>
        </ScrollReveal>
      </section>

      <SiteFooter />

    </div>
  );
}
