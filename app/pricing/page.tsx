'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import { BorderBeam } from '@/components/magicui/border-beam';

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

const PRICING = [
  {
    name: 'Solo Analyst',
    price: 'Free',
    period: '',
    tagline: 'Get started at no cost',
    features: [
      '10 pitch decks per month',
      'Full deal analysis and extraction',
      'Investment memo generation',
      'Thesis scoring',
      'Basic pipeline tracking',
    ],
    cta: 'Start for free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    tagline: 'For the serious analyst',
    features: [
      'Unlimited pitch decks',
      'AI authorship detection',
      'Full pipeline tracking',
      'CSV export for LPs',
      'Priority processing',
      'Everything in Solo',
    ],
    cta: 'Start Pro',
    highlight: true,
  },
  {
    name: 'Firm',
    price: '$99',
    period: '/month',
    tagline: 'For the entire fund',
    features: [
      'Up to 10 analysts',
      'Shared investment thesis config',
      'Team pipeline and collaboration',
      'In-app deal sharing and messaging',
      'Slack digest and notifications',
      'Everything in Pro',
    ],
    cta: 'Talk to us',
    highlight: false,
  },
];

const FAQ = [
  {
    q: 'What counts as a pitch deck?',
    a: 'Any PDF you upload. One upload = one deck, regardless of page count.',
  },
  {
    q: 'Can I change plans later?',
    a: "Yes. Upgrade or downgrade anytime. You're billed monthly with no lock-in.",
  },
  {
    q: 'Is there a trial for Pro?',
    a: "The Solo plan is free forever with 10 decks/month. That's the trial. No time limit.",
  },
  {
    q: 'How does Firm billing work?',
    a: "Flat $99/month for up to 10 analysts. Unlimited decks across the team. Contact us for larger teams.",
  },
];

export default function PricingPage() {
  const geist = { fontFamily: 'Geist, sans-serif' } as const;
  const mono = { fontFamily: 'Geist Mono, monospace' } as const;

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', ...geist }} className="min-h-screen">
      <SiteNavbar />

      {/* Page header */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#fff', marginBottom: 16 }}
          >
            Simple, honest pricing.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)' }}
          >
            No per-deck fees, no surprise charges, no enterprise pricing theater.
          </motion.p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-24 px-8">
        <div className="max-w-5xl mx-auto">
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
                    overflow: plan.highlight ? 'hidden' : 'visible',
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
                          ? { background: 'var(--brand)', color: '#09090B', borderRadius: 6, padding: '10px', fontSize: 14, textDecoration: 'none' }
                          : { background: 'var(--surface)', color: 'var(--text)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, padding: '10px', fontSize: 14, textDecoration: 'none' }
                      }
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                    >
                      {plan.cta}
                    </Link>
                  </motion.div>
                  {plan.highlight && <BorderBeam duration={8} colorFrom="#FFD700" colorTo="#FFA500" />}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* FAQ */}
      <section className="py-24 px-8" style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="font-bold mb-10" style={{ fontSize: 32, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Common questions.
            </h2>
          </ScrollReveal>
          <div className="space-y-0">
            {FAQ.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div
                  style={{
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}
                >
                  <h3 className="font-semibold mb-2" style={{ fontSize: 15, color: '#fff' }}>{item.q}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: 0 }}>{item.a}</p>
                </div>
              </ScrollReveal>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* CTA */}
      <section className="py-20 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-bold mb-5" style={{ fontSize: 36, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              The next deck you open<br />shouldn't take 45 minutes.
            </h2>
            <p className="mb-8" style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)' }}>
              Free to try. No credit card. No onboarding call.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 font-semibold"
              style={{ background: 'var(--brand)', color: '#09090B', borderRadius: 6, padding: '12px 28px', fontSize: 15, textDecoration: 'none' }}
            >
              Open Thesis, it's free <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

