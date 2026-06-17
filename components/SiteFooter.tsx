'use client';

import Link from 'next/link';

function ThesisLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
      <div
        style={{
          width: 26,
          height: 26,
          background: 'var(--brand)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
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
          fontSize: 15,
          color: '#171717',
          lineHeight: 1,
        }}
      >
        thesis
      </span>
    </Link>
  );
}

const FOOTER_COLS = [
  {
    label: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid #EAEAEA',
        background: '#FFFFFF',
        paddingTop: 64,
        paddingBottom: 64,
        paddingLeft: 32,
        paddingRight: 32,
        fontFamily: 'Geist, sans-serif',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Col 1: Logo + tagline */}
          <div>
            <ThesisLogo />
            <p
              style={{
                marginTop: 16,
                fontSize: 13,
                lineHeight: 1.6,
                color: '#666666',
                maxWidth: 200,
              }}
            >
              Built for analysts who move fast. Not a replacement for your judgment.
            </p>
          </div>

          {/* Cols 2–4: Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.label}>
              <div
                style={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#999999',
                  fontWeight: 500,
                  marginBottom: 16,
                }}
              >
                {col.label}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: 13,
                        color: '#666666',
                        textDecoration: 'none',
                        transition: 'color 150ms',
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#171717')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#666666')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: '1px solid #EAEAEA',
            paddingTop: 24,
          }}
        >
          <p style={{ fontSize: 12, color: '#999999', margin: 0 }}>
            © 2025 Thesis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
