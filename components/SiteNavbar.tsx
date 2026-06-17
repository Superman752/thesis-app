'use client';

import { useState } from 'react';
import Link from 'next/link';
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

interface NavDropdownItem {
  title: string;
  description: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  items: NavDropdownItem[];
}

function NavDropdown({ label, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="text-sm text-[#666] hover:text-[#171717] transition-colors py-2 flex items-center gap-1"
        style={{ fontFamily: 'Geist, sans-serif', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        {label}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          style={{ transition: 'transform 150ms', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 pt-2 w-72 z-50">
          <div className="rounded-xl border border-[#EAEAEA] bg-white shadow-lg p-2">
            {items.map((item) => (
              <Link
                key={item.href + item.title}
                href={item.href}
                className="block rounded-lg px-3 py-2.5 hover:bg-[#FAFAFA] transition-colors"
                style={{ textDecoration: 'none' }}
              >
                <div className="text-sm font-medium text-[#171717]">{item.title}</div>
                <div className="text-xs text-[#666] mt-0.5">{item.description}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SiteNavbar() {
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
        <div className="flex items-center gap-8">
          <ThesisLogo />
          <nav className="hidden md:flex items-center gap-1">
            <NavDropdown
              label="Features"
              items={[
                { title: 'Deal Pipeline', description: 'Track every deal in one place', href: '/features' },
                { title: 'Thesis Fit Scoring', description: "Score deals against your fund's criteria", href: '/features' },
                { title: 'Investment Memos', description: 'One-page memos generated in seconds', href: '/features' },
                { title: 'AI Authorship Detection', description: 'Flag AI-generated decks before diligence', href: '/features' },
              ]}
            />
            <NavDropdown
              label="How it works"
              items={[
                { title: 'Upload the deck', description: 'Drag in any PDF, no formatting required', href: '/how-it-works' },
                { title: 'Review the analysis', description: 'Structured output in under 30 seconds', href: '/how-it-works' },
                { title: 'Share the memo', description: 'Partner-ready, exportable instantly', href: '/how-it-works' },
              ]}
            />
            <NavDropdown
              label="Pricing"
              items={[
                { title: 'Solo', description: 'Free forever, 10 decks a month', href: '/pricing' },
                { title: 'Pro', description: 'For active analysts, unlimited decks', href: '/pricing' },
                { title: 'Firm', description: '$99/month, up to 10 analysts', href: '/pricing' },
              ]}
            />
          </nav>
        </div>

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
