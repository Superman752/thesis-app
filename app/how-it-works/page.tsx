'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Upload, ScanSearch, Share2, ArrowRight } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';

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

const STEPS = [
  {
    step: '1',
    icon: Upload,
    title: 'Upload the deck',
    desc: 'Drag in any pitch deck PDF. Thesis reads the full document natively. No copying, no formatting, no manual extraction.',
    detail: 'Supports any PDF up to 50MB. Thesis sends the document directly to Claude as a document content block — no OCR, no text extraction, no parsing library in the middle.',
  },
  {
    step: '2',
    icon: ScanSearch,
    title: 'Review the analysis',
    desc: 'Deal data structured. Thesis criteria scored. Red flags surfaced. AI authorship checked. All in about 30 seconds.',
    detail: 'Six scoring dimensions run in parallel: market size, team, traction, stage fit, business model, and sector match. Each dimension has its own prompt and falls back gracefully if the deck is missing information.',
  },
  {
    step: '3',
    icon: Share2,
    title: 'Share the memo',
    desc: 'One-page investment memo ready for your partner meeting. Export it, share it with the team, or move the deal to the next stage.',
    detail: 'The memo is structured like an analyst wrote it: company overview, thesis alignment, key risks, and a recommendation. Ready to paste into a partner deck or send to the team.',
  },
];

export default function HowItWorksPage() {
  const geist = { fontFamily: 'Geist, sans-serif' } as const;
  const mono = { fontFamily: 'Geist Mono, monospace' } as const;

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', ...geist }} className="min-h-screen">
      <SiteNavbar />

      {/* Page header */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginBottom: 16 }}
          >
            PROCESS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#fff', marginBottom: 16 }}
          >
            Three steps. Thirty seconds.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', maxWidth: 480 }}
          >
            From PDF to investment memo without leaving your browser.
          </motion.p>
        </div>
      </section>

      <SectionDivider />

      {/* Steps — vertical detailed layout */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-0">
            {STEPS.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex gap-10 pb-16">
                  {/* Step number + connector */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-12 h-12 flex items-center justify-center"
                      style={{ background: 'var(--brand-dim)', border: '1px solid rgba(244,197,66,0.3)', borderRadius: 8, flexShrink: 0 }}
                    >
                      <span style={{ ...mono, fontWeight: 700, fontSize: 20, color: 'var(--brand)' }}>{s.step}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.06)', marginTop: 12 }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2 pb-16">
                    <div className="flex items-center gap-3 mb-4">
                      <s.icon size={16} style={{ color: 'var(--brand)' }} />
                      <h2 className="font-bold" style={{ fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.2, color: '#fff' }}>
                        {s.title}
                      </h2>
                    </div>
                    <p className="mb-4" style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65 }}>
                      {s.desc}
                    </p>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, maxWidth: 520 }}>
                      {s.detail}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Under the hood */}
      <section className="py-24 px-8" style={{ background: 'var(--surface)' }}>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginBottom: 16 }}>
              UNDER THE HOOD
            </p>
            <h2 className="font-bold mb-8" style={{ fontSize: 32, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
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
                body: "Each thesis criterion — market size, team, traction, stage fit, business model, sector match — runs as its own API call in parallel. Results arrive in about the same time as a single call.",
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
              <ScrollReveal key={i} delay={i * 0.06}>
                <div
                  className="p-6 h-full"
                  style={{ background: 'var(--surface2)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8 }}
                >
                  <h3 className="font-semibold mb-2" style={{ fontSize: 15, color: '#fff' }}>{card.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{card.body}</p>
                </div>
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
            <h2 className="font-bold mb-5" style={{ fontSize: 36, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              See it on your next deck.
            </h2>
            <p className="mb-8" style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)' }}>
              Free to try. No credit card. No onboarding call.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 font-semibold"
              style={{ background: 'var(--brand)', color: '#09090B', borderRadius: 6, padding: '12px 28px', fontSize: 15, textDecoration: 'none' }}
            >
              Upload a deck <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
