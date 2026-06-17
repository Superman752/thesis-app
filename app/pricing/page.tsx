'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { RippleButton } from '@/registry/magicui/ripple-button';
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button';
import confetti from 'canvas-confetti';
import NumberFlow from '@number-flow/react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
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

interface Plan {
  name: string;
  price: number;
  yearlyPrice: number;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

const PLANS: Plan[] = [
  {
    name: 'Solo Analyst',
    price: 0,
    yearlyPrice: 0,
    period: 'month',
    description: 'Get started at no cost',
    buttonText: 'Start for free',
    href: '/login',
    isPopular: false,
    features: [
      '10 pitch decks per month',
      'Full deal analysis and extraction',
      'Investment memo generation',
      'Thesis scoring',
      'Basic pipeline tracking',
    ],
  },
  {
    name: 'Pro',
    price: 19,
    yearlyPrice: 15,
    period: 'month',
    description: 'For the serious analyst',
    buttonText: 'Start Pro',
    href: '/login',
    isPopular: true,
    features: [
      'Unlimited pitch decks',
      'AI authorship detection',
      'Full pipeline tracking',
      'CSV export for LPs',
      'Priority processing',
      'Everything in Solo',
    ],
  },
  {
    name: 'Firm',
    price: 99,
    yearlyPrice: 79,
    period: 'month',
    description: 'For the entire fund',
    buttonText: 'Talk to us',
    href: '/login',
    isPopular: false,
    features: [
      'Up to 10 analysts',
      'Shared investment thesis config',
      'Team pipeline and collaboration',
      'In-app deal sharing and messaging',
      'Slack digest and notifications',
      'Everything in Pro',
    ],
  },
];

export default function PricingPage() {
  const geist = { fontFamily: 'Geist, sans-serif' } as const;
  const mono = { fontFamily: 'Geist Mono, monospace' } as const;

  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 768px)');
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
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-24 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {PLANS.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ y: 40, opacity: 0 }}
                whileInView={
                  isDesktop
                    ? {
                        y: plan.isPopular ? -16 : 0,
                        opacity: 1,
                        scale: plan.isPopular ? 1.0 : 0.97,
                      }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                viewport={{ once: true }}
                transition={{ duration: 1.2, type: 'spring', stiffness: 100, damping: 30, delay: 0.15 + index * 0.06 }}
                className={cn('relative flex flex-col shadow-sm')}
                style={{
                  borderRadius: 12,
                  padding: 24,
                  background: plan.isPopular ? '#FFFDF5' : '#FFFFFF',
                  border: plan.isPopular ? '1px solid #D4A017' : '1px solid #EAEAEA',
                  marginTop: !plan.isPopular && isDesktop ? 20 : 0,
                }}
              >
                {plan.isPopular && (
                  <div
                    className="absolute top-0 right-0 flex items-center gap-1"
                    style={{ background: '#D4A017', padding: '3px 9px', borderRadius: '0 12px 0 8px' }}
                  >
                    <Star size={11} style={{ fill: '#FFFFFF', color: '#FFFFFF' }} />
                    <span style={{ color: '#FFFFFF', fontSize: 11, fontWeight: 600 }}>Most popular</span>
                  </div>
                )}

                <div className="flex-1 flex flex-col">
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666666' }}>
                    {plan.name}
                  </p>

                  <div className="flex items-end gap-1" style={{ marginTop: 16 }}>
                    <span style={{ ...mono, fontSize: 48, fontWeight: 700, color: '#171717', lineHeight: 1 }}>
                      {plan.price === 0 ? (
                        'Free'
                      ) : (
                        <NumberFlow
                          value={isMonthly ? plan.price : plan.yearlyPrice}
                          format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
                          willChange
                        />
                      )}
                    </span>
                    {plan.price !== 0 && (
                      <span style={{ fontSize: 14, color: '#666666', marginBottom: 4 }}>/{plan.period}</span>
                    )}
                  </div>

                  <p style={{ fontSize: 12, color: '#999999', marginTop: 6 }}>
                    {plan.price === 0 ? 'Free forever' : isMonthly ? 'billed monthly' : 'billed annually'}
                  </p>

                  <ul className="flex flex-col flex-1" style={{ marginTop: 24, gap: 10 }}>
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check size={15} style={{ color: '#16A34A', flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 13, color: '#404040' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <hr style={{ width: '100%', margin: '20px 0', border: 0, borderTop: '1px solid #EAEAEA' }} />

                  {plan.isPopular ? (
                    <RippleButton href={plan.href} className="w-full">
                      {plan.buttonText}
                    </RippleButton>
                  ) : (
                    <InteractiveHoverButton href={plan.href} className="w-full">
                      {plan.buttonText}
                    </InteractiveHoverButton>
                  )}

                  <p style={{ fontSize: 11, color: '#999999', textAlign: 'center', marginTop: 14 }}>
                    {plan.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
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
