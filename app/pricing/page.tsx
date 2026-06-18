'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { RippleButton } from '@/registry/magicui/ripple-button';
import confetti from 'canvas-confetti';
import NumberFlow from '@number-flow/react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import { FAQSection } from '@/components/ui/faq-section';

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

export default function PricingPage() {
  const geist = { fontFamily: 'Geist, sans-serif' } as const;

  const [isMonthly, setIsMonthly] = useState(true);
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (nextChecked: boolean) => {
    setIsMonthly(!nextChecked);
    if (nextChecked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ['#D4A017', '#171717', '#16A34A'],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['circle'],
      });
    }
  };

  return (
    <div style={{ background: '#FFFFFF', color: '#171717', ...geist }} className="min-h-screen">
      <SiteNavbar />

      {/* Page header */}
      <section className="pt-20 pb-10 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#171717', marginBottom: 16 }}
          >
            Simple, honest pricing.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontSize: 16, color: '#666666' }}
          >
            No per-deck fees, no surprise charges, no enterprise pricing theater.
          </motion.p>

          {/* Monthly / Annual toggle */}
          <div className="flex items-center justify-center gap-3" style={{ marginTop: 28 }}>
            <span style={{ fontSize: 13, color: isMonthly ? '#171717' : '#666666', transition: 'color 200ms' }}>
              Monthly
            </span>
            <button
              ref={switchRef}
              type="button"
              role="switch"
              aria-checked={!isMonthly}
              aria-label="Toggle annual billing"
              onClick={() => handleToggle(isMonthly)}
              style={{
                position: 'relative',
                width: 44,
                height: 24,
                borderRadius: 99,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                background: isMonthly ? '#E5E5E5' : '#D4A017',
                transition: 'background 200ms ease',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 2,
                  left: isMonthly ? 2 : 22,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  transition: 'left 200ms cubic-bezier(0.23,1,0.32,1)',
                }}
              />
            </button>
            <span style={{ fontSize: 13, color: !isMonthly ? '#171717' : '#666666', fontWeight: 500, transition: 'color 200ms' }}>
              Annual <span style={{ color: '#D4A017' }}>(Save 20%)</span>
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center text-sm text-[#999] mt-8"
          >
            Used by analysts at early-stage funds. No enterprise sales process.
          </motion.p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
          {/* Solo card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-[#EAEAEA] bg-white p-8 flex flex-col"
          >
            <div className="mb-6">
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#999] mb-2">Solo Analyst</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[#171717]">Free</span>
              </div>
              <p className="text-sm text-[#666] mt-2">Free forever</p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {[
                "10 pitch decks per month",
                "Full deal analysis and extraction",
                "Investment memo generation",
                "Thesis fit scoring",
                "Basic pipeline tracking",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[#444]">
                  <Check className="h-4 w-4 text-[#D4A017] flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="/login" className="block w-full text-center border border-[#EAEAEA] text-[#171717] hover:border-[#D4A017] rounded-lg py-3 text-sm font-medium transition-colors">
              Get started
            </a>
            <p className="text-xs text-center text-[#999] mt-3">No credit card needed</p>
          </motion.div>

          {/* Pro card — featured */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="rounded-2xl border-2 border-[#D4A017] bg-white p-8 flex flex-col relative"
            style={{ boxShadow: "0 8px 32px rgba(212,160,23,0.12)" }}
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4A017] text-white text-xs font-semibold px-4 py-1 rounded-full">
              Most popular
            </div>
            <div className="mb-6">
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#999] mb-2">Pro</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[#171717]">
                  <NumberFlow
                    value={isMonthly ? 19 : 15}
                    format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
                    willChange
                  />
                </span>
                <span className="text-[#666] text-sm">/month</span>
              </div>
              <p className="text-sm text-[#666] mt-2">{isMonthly ? 'Billed monthly' : 'Billed annually'}</p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {[
                "Unlimited pitch decks",
                "AI authorship detection",
                "Full pipeline tracking",
                "CSV export for LPs",
                "Priority processing",
                "Everything in Solo",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[#444]">
                  <Check className="h-4 w-4 text-[#D4A017] flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="/login" className="block w-full text-center bg-[#D4A017] hover:bg-[#B8860B] text-white rounded-lg py-3 text-sm font-semibold transition-colors">
              Start Pro
            </a>
            <p className="text-xs text-center text-[#999] mt-3">For the serious analyst</p>
          </motion.div>

          {/* Firm card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="rounded-2xl border border-[#EAEAEA] bg-[#FAFAFA] p-8 flex flex-col"
          >
            <div className="mb-6">
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#999] mb-2">Firm</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-[#171717]">
                  <NumberFlow
                    value={isMonthly ? 99 : 79}
                    format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
                    willChange
                  />
                </span>
                <span className="text-[#666] text-sm">/month</span>
              </div>
              <p className="text-sm text-[#666] mt-2">Up to 10 analysts</p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {[
                "Up to 10 analysts",
                "Shared investment thesis config",
                "Team pipeline and collaboration",
                "In-app deal sharing and messaging",
                "Slack digest and notifications",
                "Everything in Pro",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[#444]">
                  <Check className="h-4 w-4 text-[#D4A017] flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="/login" className="block w-full text-center border border-[#EAEAEA] text-[#171717] hover:border-[#D4A017] rounded-lg py-3 text-sm font-medium transition-colors">
              Talk to us
            </a>
            <p className="text-xs text-center text-[#999] mt-3">For the entire fund</p>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* FAQ */}
      <FAQSection />

      <SectionDivider />

      {/* CTA */}
      <section className="py-20 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-bold mb-5" style={{ fontSize: 36, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#171717' }}>
              The next deck you open<br />shouldn&apos;t take 45 minutes.
            </h2>
            <p className="mb-8" style={{ fontSize: 16, color: '#666666' }}>
              Free to try. No credit card. No onboarding call.
            </p>
            <RippleButton href="/login">
              Open Thesis, it&apos;s free <ArrowRight size={15} />
            </RippleButton>
          </ScrollReveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
