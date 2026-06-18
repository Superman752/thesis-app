'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import { RippleButton } from '@/registry/magicui/ripple-button';
import SiteFooter from '@/components/SiteFooter';
import DisplayCards from '@/registry/magicui/display-cards';

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

function UnderHoodVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 36,
            height: 44,
            border: '1px solid #EAEAEA',
            borderRadius: 6,
            background: '#FAFAFA',
            padding: '6px 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            flexShrink: 0,
          }}
        >
          <div style={{ height: 2, background: '#D4A017', borderRadius: 1 }} />
          <div style={{ height: 2, background: '#EAEAEA', borderRadius: 1, width: '75%' }} />
          <div style={{ height: 2, background: '#EAEAEA', borderRadius: 1, width: '90%' }} />
          <div style={{ height: 2, background: '#EAEAEA', borderRadius: 1, width: '65%' }} />
          <div style={{ height: 2, background: '#EAEAEA', borderRadius: 1, width: '80%' }} />
        </div>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M1 6h10M7 2l4 4-4 4"
            stroke="#D4A017"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: '#FFFDF5',
            border: '1px solid rgba(212,160,23,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="#D4A017"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (index === 1) {
    const heights = [70, 90, 60, 85, 75, 80];
    return (
      <div
        style={{
          marginBottom: 16,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 3,
          height: 32,
        }}
      >
        {heights.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              background: '#D4A017',
              borderRadius: 2,
              opacity: 0.12 + i * 0.13,
            }}
          />
        ))}
      </div>
    );
  }

  if (index === 2) {
    const labels = ['M', 'T', 'Tr', 'SF', 'BM', 'S'];
    return (
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4 }}>
        {labels.map((label, i) => (
          <div
            key={i}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                border: i < 4 ? '1px solid rgba(212,160,23,0.3)' : '1px solid #EAEAEA',
                background: i < 4 ? '#FFFDF5' : '#FAFAFA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 8,
                fontFamily: 'Geist Mono, monospace',
                color: i < 4 ? '#D4A017' : '#CCCCCC',
                fontWeight: 600,
              }}
            >
              {i < 4 ? '8' : '5'}
            </div>
            <span
              style={{
                fontSize: 7,
                color: '#CCCCCC',
                fontFamily: 'Geist Mono, monospace',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#FFFDF5',
          border: '1px solid rgba(212,160,23,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="2.5" y="6.5" width="9" height="6" rx="1.5" stroke="#D4A017" strokeWidth="1" />
          <path
            d="M4.5 6.5 V5 a2.5 2.5 0 0 1 5 0 v1.5"
            stroke="#D4A017"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="7" cy="9.5" r="1" fill="#D4A017" />
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ height: 4, width: 56, borderRadius: 2, background: '#EAEAEA' }} />
        <div style={{ height: 4, width: 40, borderRadius: 2, background: '#EAEAEA' }} />
        <div style={{ height: 4, width: 48, borderRadius: 2, background: '#EAEAEA' }} />
      </div>
    </div>
  );
}

const STEPS = [
  {
    title: 'Upload the deck',
    desc: 'Drag in any pitch deck PDF. Thesis reads the full document natively. No copying, no formatting, no manual extraction.',
    detail: 'Supports any PDF up to 50MB. Thesis sends the document directly to Claude as a document content block. No OCR, no text extraction, no parsing library in the middle.',
  },
  {
    title: 'Review the analysis',
    desc: 'Deal data structured. Thesis criteria scored. Red flags surfaced. AI authorship checked. All in about 30 seconds.',
    detail: 'Six scoring dimensions run in parallel: market size, team, traction, stage fit, business model, and sector match. Each dimension has its own prompt and falls back gracefully if the deck is missing information.',
  },
  {
    title: 'Share the memo',
    desc: 'One-page investment memo ready for your partner meeting. Export it, share it with the team, or move the deal to the next stage.',
    detail: 'The memo is structured like an analyst wrote it: company overview, thesis alignment, key risks, and a recommendation. Ready to paste into a partner deck or send to the team.',
  },
];

export default function HowItWorksPage() {
  const geist = { fontFamily: 'Geist, sans-serif' } as const;
  const mono = { fontFamily: 'Geist Mono, monospace' } as const;

  return (
    <div style={{ background: '#FFFFFF', color: '#171717', ...geist }} className="min-h-screen">
      <SiteNavbar />

      {/* Page header */}
      <section className="py-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666666', fontWeight: 500, marginBottom: 16 }}
          >
            PROCESS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#171717', marginBottom: 16 }}
          >
            Three steps. Thirty seconds.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontSize: 16, color: '#666666', maxWidth: 480 }}
          >
            From PDF to investment memo without leaving your browser.
          </motion.p>
        </div>
        </motion.div>
      </section>

      <SectionDivider />

      {/* Steps: display cards visual + stacked text cards */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <DisplayCards />
            </div>
          </ScrollReveal>
          <div>
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 }}
                style={{ marginBottom: 16 }}
              >
                <div
                  className="shadow-sm"
                  style={{
                    border: '1px solid #EAEAEA',
                    background: '#FFFFFF',
                    borderRadius: 12,
                    padding: 24,
                  }}
                >
                  <div style={{ ...mono, fontSize: 11, color: '#D4A017', letterSpacing: '0.15em', marginBottom: 14 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h2 style={{ ...geist, fontSize: 20, fontWeight: 600, color: '#171717', letterSpacing: '-0.01em', marginBottom: 10 }}>
                    {s.title}
                  </h2>
                  <p style={{ fontSize: 15, color: '#666666', lineHeight: 1.65, marginBottom: 12 }}>
                    {s.desc}
                  </p>
                  <p style={{ fontSize: 13, color: '#999999', lineHeight: 1.65, maxWidth: 560 }}>
                    {s.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Under the hood */}
      <section className="py-24 px-8" style={{ background: '#FAFAFA' }}>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666666', fontWeight: 500, marginBottom: 16 }}>
              UNDER THE HOOD
            </p>
            <h2 className="font-bold mb-8" style={{ fontSize: 32, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#171717' }}>
              How Thesis reads PDFs.
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: 'Native document reading',
                body: 'Thesis sends your PDF directly to Claude as a document content block. No OCR, no text extraction, no parsing library. Claude reads the actual document the same way a human would.',
              },
              {
                title: 'Six parallel scoring calls',
                body: "Each thesis criterion, market size, team, traction, stage fit, business model, sector match, runs as its own API call in parallel. Results arrive in about the same time as a single call.",
              },
              {
                title: 'Graceful fallbacks',
                body: "If a deck is missing information for a criterion, Thesis falls back to a score of 5 rather than crashing. You always get a complete analysis, even on sparse decks.",
              },
              {
                title: 'Privacy by default',
                body: 'Decks are sent directly from your browser to the Claude API. Nothing is stored on our servers. Your deal flow stays yours.',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              >
                <div
                  className="p-6 h-full shadow-sm"
                  style={{ background: '#FFFFFF', border: '1px solid #EAEAEA', borderRadius: 12 }}
                >
                  <UnderHoodVisual index={i} />
                  <h3 className="font-semibold mb-2" style={{ fontSize: 15, color: '#171717' }}>{card.title}</h3>
                  <p style={{ fontSize: 13, color: '#666666', lineHeight: 1.65 }}>{card.body}</p>
                </div>
              </motion.div>
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
              See it on your next deck.
            </h2>
            <p className="mb-8" style={{ fontSize: 16, color: '#666666' }}>
              Free to try. No credit card. No onboarding call.
            </p>
            <RippleButton href="/login">
              Upload a deck <ArrowRight size={15} />
            </RippleButton>
          </ScrollReveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}