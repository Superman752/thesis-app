'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { Deal, DealStage } from '@/lib/types';
import { mockDeals } from '@/lib/mockData';

const STAGE_ORDER: DealStage[] = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series B+', 'Unknown'];

const SCORE_BUCKETS: { label: string; color: string }[] = [
  { label: '7.5 – 10   Strong Fit',       color: 'var(--green-text)'  },
  { label: '5.0 – 7.5  Conditional Fit',  color: 'var(--amber-text)'  },
  { label: '0 – 5.0    Weak Fit',          color: 'var(--red-text)'    },
];

function scoreColor(score: number) {
  if (score >= 7.5) return 'var(--green-text)';
  if (score >= 5)   return 'var(--amber-text)';
  return 'var(--red-text)';
}


export default function AnalyticsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('thesis_deals') || '[]') as Deal[];
    const storedIds = new Set(stored.map((d) => d.id));
    setDeals([...stored, ...mockDeals.filter((d) => !storedIds.has(d.id))]);
  }, []);

  const stats = useMemo(() => {
    if (!deals.length) return null;
    const avgScore =
      Math.round((deals.reduce((s, d) => s + d.overallThesisScore, 0) / deals.length) * 10) / 10;
    const activeDiligence = deals.filter((d) => d.pipelineStatus === 'active_diligence').length;
    const highFlags = deals.reduce(
      (s, d) => s + d.redFlags.filter((f) => f.severity === 'high').length, 0,
    );
    return { avgScore, activeDiligence, highFlags };
  }, [deals]);

  const stageBreakdown = useMemo(() => {
    const counts: Partial<Record<DealStage, number>> = {};
    for (const d of deals) counts[d.stage] = (counts[d.stage] ?? 0) + 1;
    return STAGE_ORDER.filter((s) => counts[s]).map((s) => ({ stage: s, count: counts[s]! }));
  }, [deals]);

  const scoreDist = useMemo(() => [
    { ...SCORE_BUCKETS[0], count: deals.filter((d) => d.overallThesisScore >= 7.5).length },
    { ...SCORE_BUCKETS[1], count: deals.filter((d) => d.overallThesisScore >= 5 && d.overallThesisScore < 7.5).length },
    { ...SCORE_BUCKETS[2], count: deals.filter((d) => d.overallThesisScore < 5).length },
  ], [deals]);

  const maxStage = Math.max(...stageBreakdown.map((s) => s.count), 1);
  const maxScore = Math.max(...scoreDist.map((b) => b.count), 1);

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
          <h1 className="text-lg font-bold" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Analytics
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
            Pipeline-wide trends across your deals.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-32 text-center px-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}
          >
            <BarChart3 size={22} style={{ color: 'var(--muted3)' }} />
          </div>
          <h2 className="text-base font-semibold mb-1.5" style={{ color: 'var(--text)' }}>No deals yet</h2>
          <p className="text-sm max-w-xs" style={{ color: 'var(--muted)' }}>
            Analytics will populate once you analyze your first pitch deck.
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
        <h1 className="text-lg font-bold" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
          Analytics
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
          Pipeline-wide trends across {deals.length} deal{deals.length !== 1 ? 's' : ''}.
        </p>
      </div>

      <div className="px-6 md:px-8 py-6 max-w-4xl">

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Deals',     value: String(deals.length),           color: 'var(--text)'      },
            { label: 'Avg Score',       value: String(stats?.avgScore ?? '—'), color: scoreColor(stats?.avgScore ?? 0) },
            { label: 'In Diligence',    value: String(stats?.activeDiligence ?? 0), color: 'var(--green-text)' },
            {
              label: 'High-Sev Flags',
              value: String(stats?.highFlags ?? 0),
              color: (stats?.highFlags ?? 0) > 0 ? 'var(--red-text)' : 'var(--muted3)',
            },
          ].map(({ label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              className="rounded-xl p-5"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div
                className="mb-2"
                style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted3)' }}
              >
                {label}
              </div>
              <div className="font-mono font-bold text-2xl leading-none" style={{ color }}>
                {value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stage breakdown */}
        <div
          className="rounded-xl p-6 mb-4"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
        >
          <h2 className="text-sm font-semibold mb-5" style={{ color: 'var(--text)' }}>Deals by stage</h2>
          <div className="space-y-4">
            {stageBreakdown.map(({ stage, count }, i) => (
              <div key={stage}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{stage}</span>
                  <span className="font-mono text-xs font-bold" style={{ color: 'var(--text2)' }}>{count}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface2)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / maxStage) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: 'var(--brand)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score distribution */}
        <div
          className="rounded-xl p-6"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
        >
          <h2 className="text-sm font-semibold mb-5" style={{ color: 'var(--text)' }}>Score distribution</h2>
          <div className="space-y-4">
            {scoreDist.map(({ label, count, color }, i) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{label}</span>
                  <span className="font-mono text-xs font-bold" style={{ color }}>{count}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface2)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / maxScore) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
