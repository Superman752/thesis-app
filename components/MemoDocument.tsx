'use client';

import { motion } from 'framer-motion';
import { Deal } from '@/lib/types';

interface MemoDocumentProps {
  deal: Deal;
}

// Light-surface semantic colors for the memo document.
// These are intentionally separate from the dark-shell design tokens —
// the memo renders on --light-bg (#F4F4F5) as a print document.
const RECOMMENDATION_STYLES = {
  PURSUE: { word: '#15803d', bg: '#f0fdf4', border: '#86efac' },
  WATCH:  { word: '#b45309', bg: '#fffbeb', border: '#fcd34d' },
  PASS:   { word: '#b91c1c', bg: '#fef2f2', border: '#fca5a5' },
};

// Memo section label — consistent across all sections.
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-3"
      style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af' }}
    >
      {children}
    </div>
  );
}

// Subtle reveal — opacity + minimal lift, ease-out.
// No bounce. No elastic. Documents don't fly in.
function Appear({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function MemoDocument({ deal }: MemoDocumentProps) {
  const memo = deal.memoContent;
  if (!memo) return null;

  const rec = RECOMMENDATION_STYLES[memo.recommendation];
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let analystName = 'Analyst';
  try {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('thesis_profile') : null;
    const profile = stored ? JSON.parse(stored) : null;
    if (profile?.analystName) analystName = profile.analystName;
  } catch {
    // use default
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8" style={{ color: '#18181B' }}>

      {/* 1. Header */}
      <Appear delay={0}>
        <div className="pb-6" style={{ borderBottom: '2px solid #e5e7eb' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 12 }}>
            Investment Memo · Confidential
          </div>
          <h1 className="font-bold mb-1.5" style={{ fontSize: '1.875rem', color: '#18181B', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {deal.companyName}
          </h1>
          <p className="text-base mb-4" style={{ color: '#374151', lineHeight: 1.55 }}>
            {deal.oneLiner}
          </p>
          <div className="flex gap-6 text-sm" style={{ color: '#6b7280' }}>
            <span>{today}</span>
            <span>Prepared by {analystName}</span>
          </div>
        </div>
      </Appear>

      {/* 2. Recommendation — appears FIRST per PRODUCT.md:
           "The GP reads the recommendation section first."
           "The recommendation should be the biggest text on the memo page." */}
      <Appear delay={0.06}>
        <div
          className="rounded-xl p-6"
          style={{ background: rec.bg, border: `1px solid ${rec.border}` }}
        >
          <div
            className="font-serif leading-none mb-2"
            style={{ fontSize: '3.75rem', color: rec.word, letterSpacing: '-0.01em' }}
          >
            {memo.recommendation}
          </div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: rec.word, opacity: 0.65, marginBottom: 12 }}>
            Recommendation
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#374151', maxWidth: '52ch' }}>
            {memo.recommendationRationale}
          </p>
        </div>
      </Appear>

      {/* 3. Deal overview table */}
      <Appear delay={0.12}>
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                {['Stage', 'Sector', 'Geography', 'Asking', 'Valuation'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-2.5"
                    style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af', borderBottom: '1px solid #e5e7eb' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {[
                  deal.stage,
                  deal.sector,
                  deal.geography,
                  deal.analysis.askingAmount || 'Not stated',
                  deal.analysis.valuation || 'Not stated',
                ].map((val, i) => (
                  <td key={i} className="px-4 py-3 font-mono text-xs" style={{ color: '#18181B' }}>
                    {val}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Appear>

      {/* 4. Executive Summary */}
      <Appear delay={0.18}>
        <SectionLabel>Executive Summary</SectionLabel>
        <p className="text-sm leading-relaxed" style={{ color: '#1f2937' }}>
          {memo.executiveSummary}
        </p>
      </Appear>

      {/* 5. Problem & Solution */}
      <Appear delay={0.24}>
        <SectionLabel>Problem & Solution</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Problem',  text: memo.problemSolution.problem },
            { label: 'Solution', text: memo.problemSolution.solution },
          ].map(({ label, text }) => (
            <div key={label} className="rounded-lg p-4" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 8 }}>
                {label}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#1f2937' }}>{text}</p>
            </div>
          ))}
        </div>
      </Appear>

      {/* 6. Market Opportunity */}
      <Appear delay={0.30}>
        <SectionLabel>Market Opportunity</SectionLabel>
        {(deal.analysis.market.tam || deal.analysis.market.sam) && (
          <div className="flex gap-3 mb-3">
            {[
              { label: 'TAM', value: deal.analysis.market.tam },
              { label: 'SAM', value: deal.analysis.market.sam },
              { label: 'SOM', value: deal.analysis.market.som },
            ].filter((m) => m.value).map((m) => (
              <div key={m.label} className="rounded-lg px-4 py-3 text-center flex-1" style={{ background: '#f3f4f6', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', marginBottom: 4 }}>{m.label}</div>
                <div className="font-mono font-semibold text-sm" style={{ color: '#18181B' }}>{m.value}</div>
              </div>
            ))}
          </div>
        )}
        <p className="text-sm leading-relaxed" style={{ color: '#1f2937' }}>
          {memo.marketCommentary}
        </p>
      </Appear>

      {/* 7. Traction */}
      <Appear delay={0.36}>
        <SectionLabel>Traction</SectionLabel>
        {deal.analysis.traction.length > 0 && (
          <div className="rounded-lg overflow-hidden mb-3" style={{ border: '1px solid #e5e7eb' }}>
            <table className="w-full text-sm">
              <tbody>
                {deal.analysis.traction.map((t, i) => (
                  <tr
                    key={i}
                    style={{ borderBottom: i < deal.analysis.traction.length - 1 ? '1px solid #f3f4f6' : undefined }}
                  >
                    <td className="px-4 py-2.5 text-xs" style={{ color: '#6b7280' }}>{t.metric}</td>
                    <td className="px-4 py-2.5 font-mono font-medium text-xs" style={{ color: '#18181B' }}>{t.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-sm leading-relaxed" style={{ color: '#1f2937' }}>
          {memo.tractionCommentary}
        </p>
      </Appear>

      {/* 8. Team */}
      <Appear delay={0.42}>
        <SectionLabel>Team</SectionLabel>
        <div className="space-y-2 mb-3">
          {deal.analysis.team.map((member, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-lg" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{ background: '#e5e7eb', color: '#374151' }}
              >
                {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: '#18181B' }}>
                  {member.name}
                  <span className="font-normal text-xs ml-2" style={{ color: '#6b7280' }}>{member.role}</span>
                </div>
                <div className="text-xs mt-0.5 leading-relaxed" style={{ color: '#4b5563' }}>{member.background}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: '#1f2937' }}>
          {memo.teamAssessment}
        </p>
      </Appear>

      {/* 9. Thesis Alignment */}
      <Appear delay={0.48}>
        <SectionLabel>Thesis Alignment</SectionLabel>
        <div className="rounded-lg p-5 mb-3" style={{ background: '#fffbeb', border: '1px solid #fcd34d' }}>
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-xs font-medium" style={{ color: '#92400e' }}>Overall Thesis Score</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono font-bold" style={{ fontSize: '1.875rem', lineHeight: 1, color: '#b45309' }}>
                {deal.overallThesisScore.toFixed(1)}
              </span>
              <span className="font-mono text-sm" style={{ color: '#d97706' }}>/&thinsp;10</span>
            </div>
          </div>
          <div className="space-y-2">
            {deal.thesisScores.map((s) => (
              <div key={s.criterion} className="flex items-center gap-3">
                <span className="text-xs w-28 flex-shrink-0" style={{ color: '#78350f' }}>{s.criterion}</span>
                <div className="flex-1 h-1.5 rounded-full" style={{ background: '#fde68a' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${s.score * 10}%`, background: '#d97706' }}
                  />
                </div>
                <span className="font-mono text-xs font-semibold w-8 text-right" style={{ color: '#b45309' }}>
                  {s.score}/10
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: '#1f2937' }}>
          {memo.thesisAlignment}
        </p>
      </Appear>

      {/* 10. Key Risks */}
      <Appear delay={0.54}>
        <SectionLabel>Key Risks</SectionLabel>
        {memo.keyRisks.length === 0 ? (
          <p className="text-sm" style={{ color: '#6b7280' }}>No material risks identified.</p>
        ) : (
          <ol className="space-y-2">
            {memo.keyRisks.map((risk, i) => (
              <li key={i} className="flex gap-3 text-sm" style={{ color: '#1f2937' }}>
                <span className="font-mono text-xs mt-0.5 w-4 flex-shrink-0 text-right" style={{ color: '#9ca3af' }}>
                  {i + 1}.
                </span>
                <span className="leading-relaxed">{risk}</span>
              </li>
            ))}
          </ol>
        )}
      </Appear>

      {/* 11. Footer */}
      <Appear delay={0.60}>
        <p
          className="text-xs text-center py-4"
          style={{ color: '#9ca3af', borderTop: '1px solid #e5e7eb' }}
        >
          This memo was generated by Thesis based on the submitted pitch deck. Human review recommended before partner presentation.
        </p>
      </Appear>

    </div>
  );
}
