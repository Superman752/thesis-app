'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function ThesisLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div
        style={{
          width: 28,
          height: 28,
          background: 'var(--brand)',
          borderRadius: 7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
          fontSize: 16,
          color: 'var(--brand)',
          lineHeight: 1,
        }}
      >
        thesis
      </span>
    </Link>
  );
}

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
] as const;

export default function SiteNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar — in document flow, not fixed, pushes navbar down */}
      <div
        className="w-full flex items-center justify-center gap-3 flex-wrap px-4"
        style={{
          height: 40,
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          fontFamily: 'Geist, sans-serif',
        }}
      >
        <span
          style={{
            background: 'var(--brand)',
            color: '#09090B',
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 700,
            padding: '2px 8px',
          }}
        >
          NEW
        </span>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
          AI authorship detection now available for all plans
        </span>
        <Link
          href="/features"
          style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.75')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
        >
          Learn more →
        </Link>
      </div>

      {/* Navbar — sticky, becomes opaque on scroll */}
      <header
        className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-8"
        style={{
          height: 56,
          background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'background 200ms ease, border-color 200ms ease, backdrop-filter 200ms ease',
          fontFamily: 'Geist, sans-serif',
        }}
      >
        <ThesisLogo />

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: 14,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                  transition: 'color 150ms',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                onMouseLeave={e => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)';
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.55)',
              textDecoration: 'none',
              transition: 'color 150ms',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#fff')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)')}
          >
            Log in
          </Link>
          <motion.span whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex' }}>
            <Link
              href="/login"
              style={{
                fontSize: 14,
                fontWeight: 600,
                background: 'var(--brand)',
                color: '#09090B',
                borderRadius: 6,
                padding: '8px 16px',
                textDecoration: 'none',
              }}
            >
              Start for free
            </Link>
          </motion.span>
        </div>
      </header>
    </>
  );
}
