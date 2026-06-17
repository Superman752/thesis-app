'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Deal } from '@/lib/types';

interface DealCardProps {
  deal: Deal;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent, dealId: string) => void;
}

const stageColors: Record<string, string> = {
  'Pre-seed': 'var(--blue)',
  'Seed': 'var(--brand)',
  'Series A': 'var(--green)',
  'Series B': 'var(--amber)',
  'Series B+': 'var(--amber)',
  'Unknown': 'var(--muted)',
};

function scoreColor(score: number) {
  if (score >= 7.5) return 'var(--green-text)';
  if (score >= 5) return 'var(--amber-text)';
  return 'var(--red-text)';
}

export default function DealCard({ deal, draggable = false, onDragStart }: DealCardProps) {
  const stageColor = stageColors[deal.stage] || 'var(--muted)';
  const highFlags = deal.redFlags.filter((f) => f.severity === 'high').length;
  const sColor = scoreColor(deal.overallThesisScore);

  return (
    <Link
      href={`/app/deal/${deal.id}`}
      draggable={draggable}
      onDragStart={draggable && onDragStart ? (e) => onDragStart(e, deal.id) : undefined}
      className="block rounded-xl border transition-all duration-150 cursor-pointer"
      style={{
        background: 'var(--surface2)',
        borderColor: 'var(--border)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Card top */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start gap-2.5 mb-2">
          {/* Company initial avatar */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: 'var(--surface3)', color: 'var(--brand)', border: '1px solid var(--border2)', fontSize: 13 }}
          >
            {deal.companyName[0]}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold leading-tight truncate" style={{ color: 'var(--text)' }}>
              {deal.companyName}
            </h3>
            <p className="text-[11px] mt-0.5 line-clamp-1 leading-relaxed" style={{ color: 'var(--muted)' }}>
              {deal.oneLiner}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{ color: stageColor, background: `${stageColor}15`, border: `1px solid ${stageColor}28` }}
          >
            {deal.stage}
          </span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{ color: 'var(--muted2)', background: 'var(--surface3)', border: '1px solid var(--border)' }}
          >
            {deal.sector}
          </span>
        </div>
      </div>

      {/* Card bottom: score + flags */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        {/* Score bar */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold" style={{ color: sColor }}>
            {deal.overallThesisScore.toFixed(1)}
          </span>
          <div className="w-16 h-1 rounded-full overflow-hidden" style={{ background: 'var(--border2)' }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${deal.overallThesisScore * 10}%`, background: sColor }}
            />
          </div>
          <span className="text-[10px]" style={{ color: 'var(--muted3)' }}>/ 10</span>
        </div>

        {/* Flag count */}
        {deal.redFlags.length > 0 ? (
          <span
            className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{
              color: highFlags > 0 ? 'var(--red-text)' : 'var(--amber-text)',
              background: highFlags > 0 ? 'var(--red-dim)' : 'var(--amber-dim)',
            }}
          >
            <AlertTriangle size={9} />
            {deal.redFlags.length} flag{deal.redFlags.length !== 1 ? 's' : ''}
          </span>
        ) : (
          <span className="text-[10px]" style={{ color: 'var(--muted3)' }}>No flags</span>
        )}
      </div>
    </Link>
  );
}
