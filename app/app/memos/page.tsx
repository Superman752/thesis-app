'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, ArrowRight, CheckCircle2, Eye } from 'lucide-react';
import { Deal } from '@/lib/types';
import { mockDeals } from '@/lib/mockData';

function scoreColor(score: number) {
  if (score >= 7.5) return 'var(--green-text)';
  if (score >= 5)   return 'var(--amber-text)';
  return 'var(--red-text)';
}

const RECOMMENDATION_CONFIG: Record<string, { color: string; bg: string; border: string; label: string }> = {
  PURSUE: { color: 'var(--green-text)', bg: 'var(--green-dim)', border: 'rgba(34,197,94,0.2)',  label: 'Pursue' },
  WATCH:  { color: 'var(--amber-text)', bg: 'var(--amber-dim)', border: 'rgba(245,158,11,0.2)', label: 'Watch'  },
  PASS:   { color: 'var(--red-text)',   bg: 'var(--red-dim)',   border: 'rgba(239,68,68,0.2)',  label: 'Pass'   },
};

export default function MemosPage() {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('thesis_deals') || '[]') as Deal[];
    const storedIds = new Set(stored.map((d) => d.id));
    const combined = [...stored, ...mockDeals.filter((d) => !storedIds.has(d.id))];
    // Sort: deals with memos first, then by score descending
    combined.sort((a, b) => {
      if (!!a.memoContent !== !!b.memoContent) return a.memoContent ? -1 : 1;
      return b.overallThesisScore - a.overallThesisScore;
    });
    setDeals(combined);
  }, []);

  const { withMemo, withoutMemo } = useMemo(() => ({
    withMemo:    deals.filter((d) => d.memoContent !== null),
    withoutMemo: deals.filter((d) => d.memoContent === null),
  }), [deals]);

  if (!deals.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="min-h-screen"
      >
        <div
          className="px-6 md:px-8 py-5"
          style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
        >
          <h1 className="text-lg font-bold" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>Memos</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>Generated investment memos for analyzed deals.</p>
        </div>
        <div className="flex flex-col items-center justify-center py-32 text-center px-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}
          >
            <FileText size={22} style={{ color: 'var(--muted3)' }} />
          </div>
          <h2 className="text-base font-semibold mb-1.5" style={{ color: 'var(--text)' }}>No memos yet</h2>
          <p className="text-sm max-w-xs" style={{ color: 'var(--muted)' }}>
            Analyze a pitch deck, then generate a memo from the deal detail page.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="min-h-screen"
    >
      {/* Header */}
      <div
        className="px-6 md:px-8 py-5"
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
      >
        <h1 className="text-lg font-bold" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>Memos</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
          {withMemo.length > 0
            ? `${withMemo.length} memo${withMemo.length !== 1 ? 's' : ''} generated across ${deals.length} analyzed deal${deals.length !== 1 ? 's' : ''}.`
            : `${deals.length} analyzed deal${deals.length !== 1 ? 's' : ''} — open any to generate a memo.`}
        </p>
      </div>

      <div className="px-6 md:px-8 py-6 max-w-3xl space-y-3">

        {/* Deals with generated memos */}
        {withMemo.map((deal, i) => {
          const sColor = scoreColor(deal.overallThesisScore);
          const rec = deal.memoContent ? RECOMMENDATION_CONFIG[deal.memoContent.recommendation] : null;
          const highFlags = deal.redFlags.filter((f) => f.severity === 'high').length;

          return (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: i * 0.05 }}
              className="rounded-xl overflow-hidden"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
            >
              {/* Card header */}
              <div className="px-5 py-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: 'var(--brand-dim)', border: '1px solid rgba(244,197,66,0.25)', color: 'var(--brand)' }}
                  >
                    {deal.companyName[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{deal.companyName}</span>
                      {rec && (
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ color: rec.color, background: rec.bg, border: `1px solid ${rec.border}` }}
                        >
                          {rec.label}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{ color: 'var(--muted2)', background: 'var(--surface3)', border: '1px solid var(--border)' }}
                      >
                        {deal.stage}
                      </span>
                      <span className="text-[10px]" style={{ color: 'var(--muted3)' }}>{deal.sector}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Score */}
                  <div className="text-right">
                    <div className="font-mono font-bold text-xl leading-none" style={{ color: sColor }}>
                      {deal.overallThesisScore.toFixed(1)}
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: 'var(--muted3)' }}>/ 10</div>
                  </div>
                </div>
              </div>

              {/* Memo excerpt */}
              {deal.memoContent && (
                <div className="px-5 pb-3">
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--muted)' }}>
                    {deal.memoContent.executiveSummary}
                  </p>
                </div>
              )}

              {/* Footer */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{ borderTop: '1px solid var(--border)', background: 'var(--surface2)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--green-text)' }}>
                    <CheckCircle2 size={10} /> Memo ready
                  </span>
                  {deal.redFlags.length > 0 && (
                    <span
                      className="flex items-center gap-1 text-[10px]"
                      style={{ color: highFlags > 0 ? 'var(--red-text)' : 'var(--amber-text)' }}
                    >
                      <AlertTriangle size={10} />
                      {deal.redFlags.length} flag{deal.redFlags.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/app/memo/${deal.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-100"
                    style={{ background: 'var(--brand)', color: 'var(--bg)' }}
                  >
                    <Eye size={11} /> View Memo
                  </Link>
                  <Link
                    href={`/app/deal/${deal.id}`}
                    className="flex items-center gap-1 text-xs transition-colors"
                    style={{ color: 'var(--muted2)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted2)'; }}
                  >
                    Deal <ArrowRight size={10} />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Deals without memos — secondary list */}
        {withoutMemo.length > 0 && (
          <>
            {withMemo.length > 0 && (
              <div className="pt-2 pb-1">
                <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted3)' }}>
                  No memo yet
                </p>
              </div>
            )}
            {withoutMemo.map((deal, i) => {
              const sColor = scoreColor(deal.overallThesisScore);
              const highFlags = deal.redFlags.filter((f) => f.severity === 'high').length;

              return (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 0.82, y: 0 }}
                  transition={{ duration: 0.2, delay: (withMemo.length + i) * 0.04 }}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div className="px-5 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--muted2)' }}
                      >
                        {deal.companyName[0]}
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{deal.companyName}</span>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span
                            className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                            style={{ color: 'var(--muted2)', background: 'var(--surface3)', border: '1px solid var(--border)' }}
                          >
                            {deal.stage}
                          </span>
                          <span className="text-[10px]" style={{ color: 'var(--muted3)' }}>{deal.sector}</span>
                          {deal.redFlags.length > 0 && (
                            <span
                              className="flex items-center gap-1 text-[10px]"
                              style={{ color: highFlags > 0 ? 'var(--red-text)' : 'var(--amber-text)' }}
                            >
                              <AlertTriangle size={9} />
                              {deal.redFlags.length}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="font-mono font-bold text-base" style={{ color: sColor }}>
                        {deal.overallThesisScore.toFixed(1)}
                      </div>
                      <Link
                        href={`/app/deal/${deal.id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-100"
                        style={{ background: 'var(--surface2)', color: 'var(--text2)', border: '1px solid var(--border2)' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--muted)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)'; }}
                      >
                        <FileText size={11} /> Generate
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </>
        )}
      </div>
    </motion.div>
  );
}
