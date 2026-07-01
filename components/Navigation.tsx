'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutGrid, Plus, Target, Settings, BarChart3, FileText } from 'lucide-react';
import { AnalystProfile } from '@/lib/types';

const navItems = [
  { icon: LayoutGrid, label: 'Pipeline',  href: '/app'           },
  { icon: BarChart3,  label: 'Analytics', href: '/app/analytics' },
  { icon: FileText,   label: 'Memos',     href: '/app/memos'     },
  { icon: Plus,       label: 'New Deal',  href: '/app/upload'    },
  { icon: Target,     label: 'Thesis',    href: '/app/thesis'    },
  { icon: Settings,   label: 'Settings',  href: '/app/settings'  },
];

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(' ');
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
  return (
    <div
      style={{ background: 'var(--brand-dim)', border: '1px solid rgba(244,197,66,0.22)', color: 'var(--brand)' }}
      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold font-mono flex-shrink-0"
    >
      {initials}
    </div>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<AnalystProfile | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('thesis_profile');
      if (stored) setProfile(JSON.parse(stored));
    } catch {}
  }, []);

  const isActive = (href: string) => {
    if (href === '/app') return pathname === '/app';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)' }}
        className="hidden md:flex flex-col w-64 min-h-screen fixed left-0 top-0 z-40"
      >
        {/* Logo */}
        <div
          style={{ borderBottom: '1px solid var(--border)' }}
          className="h-14 flex items-center px-5 gap-3"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--brand)' }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="2.5" rx="1" fill="#09090B"/>
              <rect x="2" y="6.75" width="8" height="2.5" rx="1" fill="#09090B"/>
              <rect x="2" y="11.5" width="5" height="2.5" rx="1" fill="#09090B"/>
            </svg>
          </div>
          <span className="font-serif text-base" style={{ color: 'var(--brand)', letterSpacing: '0.01em' }}>thesis</span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 pt-5 pb-2">
          <p className="px-2 mb-2" style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted3)' }}>Workspace</p>
          <div className="space-y-0.5">
            {navItems.map(({ icon: Icon, label, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  style={
                    active
                      ? { background: 'var(--nav-active-bg)', borderLeft: '2px solid var(--brand)', paddingLeft: '10px', color: 'var(--nav-active-color)' }
                      : { color: 'var(--muted)' }
                  }
                  className="flex px-3 py-2 rounded-lg text-sm font-medium transition-all duration-100 hover:bg-[var(--surface2)] hover:text-[var(--text2)]"
                >
                  <motion.span
                    className="flex items-center gap-3 w-full"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.12, ease: 'easeOut' }}
                  >
                    <Icon size={16} className="flex-shrink-0" strokeWidth={active ? 2.2 : 1.8} />
                    <span>{label}</span>
                  </motion.span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom user info */}
        <div
          style={{ borderTop: '1px solid var(--border)' }}
          className="px-4 py-4"
        >
          {profile ? (
            <div className="flex items-center gap-3 min-w-0">
              <Initials name={profile.analystName} />
              <div className="min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>
                  {profile.analystName}
                </div>
                <div className="text-xs truncate" style={{ color: 'var(--muted3)' }}>
                  {profile.firmName}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full skeleton" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 rounded skeleton" />
                <div className="h-2.5 rounded skeleton w-3/4" />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav
        style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-14 px-2"
      >
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors"
              style={active ? { color: 'var(--brand)' } : { color: 'var(--muted)' }}
            >
              <Icon size={19} strokeWidth={active ? 2.2 : 1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
