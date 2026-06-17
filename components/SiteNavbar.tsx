'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { RippleButton } from '@/registry/magicui/ripple-button';

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
          <rect x="2" y="2" width="12" height="2.5" rx="1" fill="#FFFFFF" />
          <rect x="2" y="6.75" width="8" height="2.5" rx="1" fill="#FFFFFF" />
          <rect x="2" y="11.5" width="5" height="2.5" rx="1" fill="#FFFFFF" />
        </svg>
      </div>
      <span
        style={{
          fontFamily: 'Geist Mono, monospace',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          fontSize: 16,
          color: '#171717',
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

  return (
    <>
      {/* Announcement bar — in document flow, not fixed, pushes navbar down */}
      <div
        className="w-full flex items-center justify-center gap-3 flex-wrap px-4"
        style={{
          height: 40,
          background: '#FAFAFA',
          borderBottom: '1px solid #EAEAEA',
          fontFamily: 'Geist, sans-serif',
        }}
      >
        <span
          style={{
            background: 'var(--brand)',
            color: '#FFFFFF',
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 700,
            padding: '2px 8px',
          }}
        >
          NEW
        </span>
        <span style={{ fontSize: 13, color: '#666666' }}>
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

      {/* Navbar — sticky, white */}
      <header
        className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-8"
        style={{
          height: 56,
          background: '#FFFFFF',
          borderBottom: '1px solid #EAEAEA',
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
                  color: isActive ? '#171717' : '#666666',
                  textDecoration: 'none',
                  transition: 'color 150ms',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#171717')}
                onMouseLeave={e => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.color = '#666666';
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
              color: '#666666',
              textDecoration: 'none',
              transition: 'color 150ms',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#171717')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#666666')}
          >
            Log in
          </Link>
          <RippleButton href="/login" className="px-4 py-2">
            Start for free
          </RippleButton>
        </div>
      </header>
    </>
  );
}
