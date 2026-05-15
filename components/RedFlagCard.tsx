'use client';

import { AlertTriangle } from 'lucide-react';
import { RedFlag } from '@/lib/types';

interface RedFlagCardProps {
  flag: RedFlag;
}

const severityColors = {
  high: { border: 'var(--red)', bg: 'var(--red-dim)', text: 'var(--red)' },
  medium: { border: 'var(--amber)', bg: 'var(--amber-dim)', text: 'var(--amber)' },
  low: { border: 'var(--blue)', bg: 'var(--blue-dim)', text: 'var(--blue)' },
};

export default function RedFlagCard({ flag }: RedFlagCardProps) {
  const colors = severityColors[flag.severity];

  return (
    <div
      className="flex gap-3 p-3 rounded-lg"
      style={{
        borderLeft: `3px solid ${colors.border}`,
        background: colors.bg,
      }}
    >
      <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" style={{ color: colors.text }} />
      <div className="min-w-0">
        <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
          {flag.headline}
        </div>
        <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
          {flag.detail}
        </div>
        <span
          className="inline-block mt-1.5 text-[10px] font-mono font-medium px-1.5 py-0.5 rounded uppercase tracking-wide"
          style={{ color: colors.text, background: `${colors.border}22` }}
        >
          {flag.severity}
        </span>
      </div>
    </div>
  );
}
