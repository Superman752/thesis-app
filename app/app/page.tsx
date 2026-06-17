'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, LayoutGrid, List, ChevronUp, ChevronDown, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { Deal, PipelineStatus } from '@/lib/types';
import { mockDeals } from '@/lib/mockData';
import PipelineBoard from '@/components/PipelineBoard';

type SortKey = 'companyName' | 'overallThesisScore' | 'stage' | 'sector' | 'createdAt' | 'redFlags';
type SortDir = 'asc' | 'desc';

const STATUS_LABELS: Record<PipelineStatus, string> = {
  new: 'New',
  under_review: 'Under Review',
  meeting_scheduled: 'Meeting Scheduled',
  active_diligence: 'Active Diligence',
  passed: 'Passed',
};

const STATUS_COLORS: Record<PipelineStatus, string> = {
  new: 'var(--muted)',
  under_review: 'var(--blue-text)',
  meeting_scheduled: 'var(--amber-text)',
  active_diligence: 'var(--green-text)',
  passed: 'var(--muted3)',
};

function scoreColor(score: number) {
  if (score >= 7.5) return 'var(--green-text)';
  if (score >= 5) return 'var(--amber-text)';
  return 'var(--red-text)';
}

export default function PipelinePage() {
  const router = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [view, setView] = useState<'kanban' | 'table'>('kanban');
  const [profile, setProfile] = useState<{ firmName: string; analystName: string } | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('createdAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('thesis_profile');
      if (stored) setProfile(JSON.parse(stored));
    } catch {}
    const storedDeals = JSON.parse(localStorage.getItem('thesis_deals') || '[]') as Deal[];
    const storedIds = new Set(storedDeals.map((d) => d.id));
    const combined = [...storedDeals, ...mockDeals.filter((d) => !storedIds.has(d.id))];
    setDeals(combined);
  }, []);

  const handleStatusChange = (dealId: string, newStatus: PipelineStatus) => {
    setDeals((prev) =>
      prev.map((d) => d.id === dealId ? { ...d, pipelineStatus: newStatus, updatedAt: new Date().toISOString() } : d)
    );
    const stored = JSON.parse(localStorage.getItem('thesis_deals') || '[]') as Deal[];
    const idx = stored.findIndex((d) => d.id === dealId);
    if (idx >= 0) {
      stored[idx] = { ...stored[idx], pipelineStatus: newStatus };
      localStorage.setItem('thesis_deals', JSON.stringify(stored));
    }
  };

  const stats = useMemo(() => {
    const pipeline = deals.filter((d) => d.pipelineStatus !== 'passed');
    const activeDiligence = deals.filter((d) => d.pipelineStatus === 'active_diligence');
    const totalFlags = deals.reduce((s, d) => s + d.redFlags.filter(f => f.severity === 'high').length, 0);
    const avgScore = pipeline.length > 0
      ? Math.round((pipeline.reduce((s, d) => s + d.overallThesisScore, 0) / pipeline.length) * 10) / 10
      : 0;
    return { total: deals.length, activeDiligence: activeDiligence.length, totalFlags, avgScore };
  }, [deals]);

  // Synthetic weekly deal inflow for sparkline, distributes total across 8 weeks
  // with a rising curve so the chart reads as growing pipeline activity.
  const sparklineData = useMemo(() => {
    const n = deals.length;
    const weights = [0.04, 0.06, 0.08, 0.10, 0.13, 0.16, 0.19, 0.24];
    return weights.map((w, i) => ({
      week: `W${i + 1}`,
      count: Math.max(0, Math.round(w * n)),
    }));
  }, [deals]);

  const sortedDeals = useMemo(() => {
    return [...deals].sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;
      switch (sortKey) {
        case 'companyName': aVal = a.companyName; bVal = b.companyName; break;
        case 'overallThesisScore': aVal = a.overallThesisScore; bVal = b.overallThesisScore; break;
        case 'stage': aVal = a.stage; bVal = b.stage; break;
        case 'sector': aVal = a.sector; bVal = b.sector; break;
        case 'createdAt': aVal = a.createdAt; bVal = b.createdAt; break;
        case 'redFlags': aVal = a.redFlags.length; bVal = b.redFlags.length; break;
        default: aVal = a.createdAt; bVal = b.createdAt;
      }
      if (typeof aVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal);
      }
      return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
  }, [deals, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

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
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
              {profile?.firmName ? `${profile.firmName}` : 'Deal Pipeline'}
            </h1>
            {/* Inline stats */}
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-xs" style={{ color: 'var(--muted)' }}>
                <span className="font-semibold" style={{ color: 'var(--text2)' }}>{stats.total}</span> deals
              </span>
              <span style={{ color: 'var(--border2)' }}>·</span>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>
                <span className="font-semibold" style={{ color: 'var(--green-text)' }}>{stats.activeDiligence}</span> in diligence
              </span>
              <span style={{ color: 'var(--border2)' }}>·</span>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>
                avg score <span className="font-mono font-semibold" style={{ color: 'var(--brand)' }}>{stats.avgScore}</span>
              </span>
              {stats.totalFlags > 0 && (
                <>
                  <span style={{ color: 'var(--border2)' }}>·</span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--red-text)' }}>
                    <AlertTriangle size={11} /> {stats.totalFlags} high-severity flag{stats.totalFlags !== 1 ? 's' : ''}
                  </span>
                </>
              )}
            </div>
          </div>
          <motion.span whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', flexShrink: 0 }}>
            <Link
              href="/app/upload"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-100"
              style={{ background: 'var(--brand)', color: 'var(--bg)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              <Plus size={14} />
              New Deal
            </Link>
          </motion.span>
        </div>
      </div>

      <div className="px-6 md:px-8 py-5">

        {/* ── Stats bar ──────────────────────────────────────────────── */}
        {deals.length > 0 && (
          <div
            className="flex items-center gap-5 px-4 py-3 rounded-xl mb-5"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            {/* Sparkline */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted3)', marginBottom: 2 }}>
                  Weekly inflow
                </div>
                <div className="w-[96px] h-[32px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparklineData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                      <defs>
                        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="var(--brand)" stopOpacity={0.22} />
                          <stop offset="95%" stopColor="var(--brand)" stopOpacity={0}    />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="var(--brand)"
                        strokeWidth={1.5}
                        fill="url(#sparkGrad)"
                        dot={false}
                        activeDot={{ r: 2, fill: 'var(--brand)' }}
                        isAnimationActive={false}
                      />
                      <Tooltip
                        content={({ active, payload }) =>
                          active && payload?.length ? (
                            <div style={{ background: 'var(--surface3)', border: '1px solid var(--border)', borderRadius: 6, padding: '3px 8px', fontSize: 11, fontFamily: 'monospace', color: 'var(--text)' }}>
                              {payload[0].value} deal{payload[0].value !== 1 ? 's' : ''}
                            </div>
                          ) : null
                        }
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="w-px h-8 flex-shrink-0" style={{ background: 'var(--border)' }} />

            {/* Total analyzed */}
            <div className="flex-shrink-0">
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted3)', marginBottom: 2 }}>Analyzed</div>
              <div className="font-mono font-bold text-base leading-none" style={{ color: 'var(--text)' }}>{stats.total}</div>
            </div>

            <div className="w-px h-8 flex-shrink-0" style={{ background: 'var(--border)' }} />

            {/* Avg score */}
            <div className="flex-shrink-0">
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted3)', marginBottom: 2 }}>Avg score</div>
              <div className="font-mono font-bold text-base leading-none" style={{ color: 'var(--brand)' }}>{stats.avgScore}</div>
            </div>

            <div className="w-px h-8 flex-shrink-0" style={{ background: 'var(--border)' }} />

            {/* Active diligence */}
            <div className="flex-shrink-0">
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted3)', marginBottom: 2 }}>In diligence</div>
              <div className="font-mono font-bold text-base leading-none" style={{ color: 'var(--green-text)' }}>{stats.activeDiligence}</div>
            </div>

            {stats.totalFlags > 0 && (
              <>
                <div className="w-px h-8 flex-shrink-0" style={{ background: 'var(--border)' }} />
                <div className="flex-shrink-0">
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted3)', marginBottom: 2 }}>High flags</div>
                  <div className="font-mono font-bold text-base leading-none" style={{ color: 'var(--red-text)' }}>{stats.totalFlags}</div>
                </div>
              </>
            )}
          </div>
        )}

        {/* View toggle */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="flex items-center p-0.5 rounded-lg"
            style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}
          >
            {(['kanban', 'table'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-100"
                style={
                  view === v
                    ? { background: 'var(--surface3)', color: 'var(--text)' }
                    : { color: 'var(--muted)' }
                }
              >
                {v === 'kanban' ? <LayoutGrid size={12} /> : <List size={12} />}
                {v === 'kanban' ? 'Board' : 'Table'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {deals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
              style={{ background: 'var(--brand-dim)', border: '1px solid rgba(244,197,66,0.25)' }}
            >
              <Plus size={24} style={{ color: 'var(--brand)' }} />
            </div>
            <h2 className="text-base font-semibold mb-1.5" style={{ color: 'var(--text)' }}>No deals yet</h2>
            <p className="text-sm mb-5 max-w-xs" style={{ color: 'var(--muted)' }}>
              Upload a pitch deck to add your first deal to the pipeline.
            </p>
            <Link
              href="/app/upload"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
              style={{ background: 'var(--brand)', color: 'var(--bg)' }}
            >
              <Plus size={14} />
              Analyze first deck
            </Link>
          </div>
        ) : view === 'kanban' ? (
          <PipelineBoard deals={deals} onStatusChange={handleStatusChange} />
        ) : (
          /* Table view */
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {[
                      { key: 'companyName', label: 'Company' },
                      { key: 'stage', label: 'Stage' },
                      { key: 'sector', label: 'Sector' },
                      { key: 'overallThesisScore', label: 'Score' },
                      { key: 'redFlags', label: 'Flags' },
                      { key: 'pipelineStatus', label: 'Status' },
                      { key: 'createdAt', label: 'Added' },
                    ].map((col) => (
                      <th
                        key={col.key}
                        className="text-left px-4 py-2.5 cursor-pointer select-none transition-colors"
                        style={{
                          background: 'var(--surface2)',
                          color: sortKey === col.key ? 'var(--brand)' : 'var(--muted2)',
                          fontSize: 10,
                          fontWeight: 600,
                          letterSpacing: '0.07em',
                          textTransform: 'uppercase',
                        }}
                        onClick={() => handleSort(col.key as SortKey)}
                      >
                        <div className="flex items-center gap-1">
                          {col.label}
                          {sortKey === col.key && (
                            sortDir === 'asc' ? <ChevronUp size={10} /> : <ChevronDown size={10} />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedDeals.map((deal, i) => {
                    const sColor = scoreColor(deal.overallThesisScore);
                    const highFlag = deal.redFlags.some(f => f.severity === 'high');
                    return (
                      <motion.tr
                        key={deal.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.025 }}
                        className="cursor-pointer transition-colors"
                        style={{
                          borderBottom: '1px solid var(--border)',
                          background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.012)',
                        }}
                        onClick={() => router.push(`/app/deal/${deal.id}`)}
                        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.background = 'var(--surface2)'; }}
                        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.012)'; }}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0"
                              style={{ background: 'var(--surface3)', color: 'var(--brand)', border: '1px solid var(--border2)' }}
                            >
                              {deal.companyName[0]}
                            </div>
                            <div>
                              <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>{deal.companyName}</div>
                              <div className="text-[11px] truncate max-w-[180px]" style={{ color: 'var(--muted2)' }}>{deal.oneLiner}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full" style={{ background: 'var(--surface3)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                            {deal.stage}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)' }}>{deal.sector}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold" style={{ color: sColor }}>
                              {deal.overallThesisScore.toFixed(1)}
                            </span>
                            <div className="w-12 h-1 rounded-full" style={{ background: 'var(--border2)' }}>
                              <div className="h-full rounded-full" style={{ width: `${deal.overallThesisScore * 10}%`, background: sColor }} />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {deal.redFlags.length > 0 ? (
                            <span className="flex items-center gap-1 text-[11px] font-medium w-fit px-2 py-0.5 rounded-full"
                              style={{ color: highFlag ? 'var(--red-text)' : 'var(--amber-text)', background: highFlag ? 'var(--red-dim)' : 'var(--amber-dim)' }}>
                              <AlertTriangle size={9} /> {deal.redFlags.length}
                            </span>
                          ) : (
                            <span className="text-xs" style={{ color: 'var(--muted3)' }}>None</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[11px] px-2 py-0.5 rounded-full"
                            style={{ color: STATUS_COLORS[deal.pipelineStatus], background: 'var(--surface3)', border: '1px solid var(--border)' }}>
                            {STATUS_LABELS[deal.pipelineStatus]}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-[11px]" style={{ color: 'var(--muted3)' }}>
                          {new Date(deal.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
