'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { Marquee } from '@/components/magicui/marquee';
import { TypingAnimation } from '@/components/magicui/typing-animation';

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
          'radial-gradient(ellipse 60% 1px at 50% 50%, rgba(255,255,255,0.09) 0%, transparent 100%)',
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
              style={{ color: b.c, background: `${b.c}18`, border: `1px solid ${b.c}30`, borderRadius: 4, fontFamily: 'Geist Mono, monospace' }}
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
          <span style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', fontFamily: 'Geist, sans-serif' }}>
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

      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted2)' }}>
          Recommendation
        </span>
        <span
          className="px-3 py-1"
          style={{ background: 'var(--green)', color: '#09090B', fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 12, borderRadius: 4, letterSpacing: '0.05em' }}
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

// ─── Stat strip with NumberTicker ──────────────────────────────────────────

function StatStrip() {
  return (
    <div className="py-8 px-8" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0">
        {[
          {
            label: 'decks / analyst / week',
            node: (
              <span style={{ fontFamily: 'Geist Mono, monospace', color: 'var(--brand)', fontSize: 28, fontWeight: 700 }}>
                <NumberTicker value={50} />+
              </span>
            ),
          },
          {
            label: 'average analysis time',
            node: (
              <span style={{ fontFamily: 'Geist Mono, monospace', color: 'var(--brand)', fontSize: 28, fontWeight: 700 }}>
                <NumberTicker value={30} delay={100} /> sec
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

// ─── VC firm marquee ───────────────────────────────────────────────────────

const VC_FIRMS = [
  'Sequoia Capital', 'Andreessen Horowitz', 'Lightspeed', 'Accel', 'Bessemer',
  'General Catalyst', 'Founders Fund', 'Kleiner Perkins', 'NEA', 'GV',
  'Insight Partners', 'Tiger Global', 'Coatue', 'Benchmark', 'Union Square Ventures',
];

function FirmMarquee() {
  return (
    <section className="py-14 px-8">
      <p style={{
        fontSize: 11,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
        textAlign: 'center',
        marginBottom: 24,
        fontFamily: 'Geist, sans-serif',
      }}>
        Used by analysts at
      </p>
      <Marquee pauseOnHover durationMs={35000}>
        {VC_FIRMS.map((firm, i) => (
          <span key={i} className="flex items-center gap-10 flex-shrink-0">
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontFamily: 'Geist, sans-serif', whiteSpace: 'nowrap' }}>
              {firm}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: 14 }}>|</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const geist = { fontFamily: 'Geist, sans-serif' } as const;

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', ...geist }} className="min-h-screen">

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
                <TypingAnimation duration={38} delay={320}>
                  Your deal pipeline
                </TypingAnimation>
                <br />
                <span>shouldn&apos;t live in</span>
                <br />
                <span>a spreadsheet.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                style={{ fontSize: 18, lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', maxWidth: 500, marginBottom: 32 }}
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
                <motion.span whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex' }}>
                  <Link
                    href="/login"
                    className="flex items-center gap-2"
                    style={{ background: 'var(--brand)', color: '#09090B', borderRadius: 6, padding: '12px 24px', fontSize: 16, fontWeight: 600, textDecoration: 'none', transition: 'opacity 150ms' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.88')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                  >
                    Start for free <ArrowRight size={15} />
                  </Link>
                </motion.span>
                <motion.a
                  href="/how-it-works"
                  whileTap={{ scale: 0.97 }}
                  style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.65)', borderRadius: 6, padding: '12px 24px', fontSize: 16, textDecoration: 'none', transition: 'color 150ms, border-color 150ms' }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)'; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; }}
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
      <FirmMarquee />
      <SectionDivider />

      {/* ── Brief product section ─────────────────────────────────────── */}
      <section className="py-24 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-bold mb-5" style={{ fontSize: 36, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Upload a deck. Get a memo.<br />Move on to the next one.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: 32 }}>
              Thesis reads any pitch deck PDF natively and returns a structured deal analysis, thesis fit score, red flag summary, and investment memo in under 30 seconds. No setup, no integrations, no training required.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/features"
                style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 150ms' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)')}
              >
                See all features →
              </Link>
              <Link
                href="/how-it-works"
                style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 150ms' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)')}
              >
                How it works →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="py-24 px-8" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginBottom: 16 }}>
              WHAT ANALYSTS SAY
            </p>
            <h2 className="font-bold mb-14" style={{ fontSize: 36, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
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
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 8,
                    transition: 'border-color 150ms, transform 150ms',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(255,255,255,0.14)';
                    el.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(255,255,255,0.07)';
                    el.style.transform = 'translateY(0)';
                  }}
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

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="py-24 px-8">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-bold mb-5" style={{ fontSize: 48, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              The next deck you open<br />shouldn&apos;t take 45 minutes.
            </h2>
            <p className="mb-10" style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)' }}>
              Free to try. No credit card. No onboarding call. Just upload a deck and see what comes back.
            </p>
            <motion.span whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex' }}>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 font-semibold"
                style={{ background: 'var(--brand)', color: '#09090B', borderRadius: 6, padding: '14px 32px', fontSize: 16, textDecoration: 'none', transition: 'opacity 150ms' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.88')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
              >
                Open Thesis, it&apos;s free <ArrowRight size={16} />
              </Link>
            </motion.span>
          </div>
        </ScrollReveal>
      </section>

      <SiteFooter />

    </div>
  );
}
