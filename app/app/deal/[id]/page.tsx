'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, ExternalLink, CheckCircle2, Bot, AlertCircle } from 'lucide-react';
import { Deal, PipelineStatus } from '@/lib/types';
import { mockDeals, mockThesisConfig } from '@/lib/mockData';

const STATUS_OPTIONS: { value: PipelineStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'meeting_scheduled', label: 'Meeting Scheduled' },
  { value: 'active_diligence', label: 'Active Diligence' },
  { value: 'passed', label: 'Passed' },
];

const SEVERITY_CONFIG = {
  high: { color: 'var(--red-text)', bg: 'var(--red-dim)', border: 'rgba(239,68,68,0.2)', label: 'High' },
  medium: { color: 'var(--amber-text)', bg: 'var(--amber-dim)', border: 'rgba(245,158,11,0.2)', label: 'Medium' },
  low: { color: 'var(--blue-text)', bg: 'var(--blue-dim)', border: 'rgba(59,130,246,0.2)', label: 'Low' },
};

// Section reveal: pure variants child, timing driven by staggerChildren parent.
// No whileInView: the parent column container animates all children with 0.08s stagger.
function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
      }}
    >
      {children}
    </motion.div>
  );
}

// Section header uses surface2 background for tonal shelf, no side-stripe accent.
// The .label-xs typography provides the hierarchy; the background step does the separation.
function SectionHeader({ label }: { label: string }) {
  return (
    <div
      className="px-5 py-3"
      style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}
    >
      <span className="label-xs">{label}</span>
    </div>
  );
}

function InfoRow({ label, value, last }: { label: string; value: string | null | undefined; last?: boolean }) {
  return (
    <div
      className="flex gap-4 py-2"
      style={last ? {} : { borderBottom: '1px solid var(--border)' }}
    >
      <span
        className="text-[11px] uppercase tracking-wide flex-shrink-0 pt-0.5 font-medium"
        style={{ color: 'var(--muted3)', width: 110 }}
      >
        {label}
      </span>
      <span className="text-sm leading-relaxed" style={{ color: value ? 'var(--text2)' : 'var(--muted3)' }}>
        {value || 'Not stated'}
      </span>
    </div>
  );
}

function MetricCard({ metric, value }: { metric: string; value: string }) {
  return (
    <div
      className="rounded-lg p-3 text-center"
      style={{ background: 'var(--surface3)', border: '1px solid var(--border)' }}
    >
      <div className="label-xs mb-1.5">{metric}</div>
      <div className="font-mono font-bold text-sm" style={{ color: 'var(--text)' }}>{value}</div>
    </div>
  );
}

export default function DealPage() {
  const { id } = useParams();
  const router = useRouter();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [notesSaved, setNotesSaved] = useState(false);
  const [status, setStatus] = useState<PipelineStatus>('new');
  const [generatingMemo, setGeneratingMemo] = useState(false);

  useEffect(() => {
    const mock = mockDeals.find((d) => d.id === id);
    if (mock) {
      setDeal(mock); setNotes(mock.analystNotes || ''); setStatus(mock.pipelineStatus); setLoading(false); return;
    }
    const stored = JSON.parse(localStorage.getItem('thesis_deals') || '[]') as Deal[];
    const found = stored.find((d) => d.id === id);
    if (found) { setDeal(found); setNotes(found.analystNotes || ''); setStatus(found.pipelineStatus); }
    setLoading(false);
  }, [id]);

  const saveNotes = () => {
    if (!deal) return;
    const stored = JSON.parse(localStorage.getItem('thesis_deals') || '[]') as Deal[];
    const idx = stored.findIndex((d) => d.id === id);
    if (idx >= 0) {
      stored[idx] = { ...stored[idx], analystNotes: notes, updatedAt: new Date().toISOString() };
      localStorage.setItem('thesis_deals', JSON.stringify(stored));
    }
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const updateStatus = (newStatus: PipelineStatus) => {
    setStatus(newStatus);
    if (!deal) return;
    const stored = JSON.parse(localStorage.getItem('thesis_deals') || '[]') as Deal[];
    const idx = stored.findIndex((d) => d.id === id);
    if (idx >= 0) {
      stored[idx] = { ...stored[idx], pipelineStatus: newStatus, updatedAt: new Date().toISOString() };
      localStorage.setItem('thesis_deals', JSON.stringify(stored));
    }
  };

  const generateMemo = async () => {
    if (!deal) return;
    setGeneratingMemo(true);
    try {
      const response = await fetch('/api/memo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dealId: deal.id, analysis: deal.analysis, thesisScores: deal.thesisScores, overallThesisScore: deal.overallThesisScore, thesisConfig: mockThesisConfig }),
      });
      const data = await response.json();
      if (data.memoContent) {
        const stored = JSON.parse(localStorage.getItem('thesis_deals') || '[]') as Deal[];
        const idx = stored.findIndex((d) => d.id === id);
        if (idx >= 0) { stored[idx] = { ...stored[idx], memoContent: data.memoContent }; localStorage.setItem('thesis_deals', JSON.stringify(stored)); }
        router.push(`/app/memo/${deal.id}`);
      }
    } catch {
      // Handle silently, user can retry
    } finally {
      setGeneratingMemo(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 space-y-4 max-w-5xl">
        <div className="h-6 w-40 rounded skeleton" />
        <div className="h-8 w-64 rounded skeleton" />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[...Array(3)].map((_, i) => <div key={i} className="h-28 rounded-xl skeleton" />)}
        </div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-base font-semibold mb-1.5" style={{ color: 'var(--text)' }}>Deal not found</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>This deal may have been removed.</p>
          <Link href="/app" className="text-sm font-medium" style={{ color: 'var(--brand)' }}>Back to pipeline</Link>
        </div>
      </div>
    );
  }

  // Semantic color tokens, never concatenate CSS vars with opacity suffixes
  const sColor = deal.overallThesisScore >= 7.5 ? 'var(--green-text)' : deal.overallThesisScore >= 5 ? 'var(--amber-text)' : 'var(--red-text)';
  const sBg    = deal.overallThesisScore >= 7.5 ? 'var(--green-dim)' : deal.overallThesisScore >= 5 ? 'var(--amber-dim)' : 'var(--red-dim)';
  const sBorder = deal.overallThesisScore >= 7.5 ? 'rgba(34,197,94,0.2)' : deal.overallThesisScore >= 5 ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)';
  const scoreLabel = deal.overallThesisScore >= 7.5 ? 'Strong Fit' : deal.overallThesisScore >= 5 ? 'Conditional Fit' : 'Weak Fit';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }} className="min-h-screen">
      {/* Deal banner header */}
      <div
        className="px-6 md:px-8 py-5"
        style={{
          background: 'linear-gradient(to bottom, var(--surface2), var(--surface))',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <Link
          href="/app"
          className="inline-flex items-center gap-1.5 text-xs mb-4 transition-colors"
          style={{ color: 'var(--muted2)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted2)'; }}
        >
          <ArrowLeft size={12} /> Pipeline
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold flex-shrink-0"
              style={{ background: 'var(--brand-dim)', border: '1px solid rgba(244,197,66,0.25)', color: 'var(--brand)' }}
            >
              {deal.companyName[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--text)', letterSpacing: '-0.01em' }}>
                  {deal.companyName}
                </h1>
                <span
                  className="font-mono text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0"
                  style={{ background: sBg, color: sColor, border: `1px solid ${sBorder}` }}
                >
                  {deal.overallThesisScore.toFixed(1)}: {scoreLabel}
                </span>
              </div>
              <p className="text-sm mt-0.5 truncate" style={{ color: 'var(--muted)' }}>{deal.oneLiner}</p>
              <div className="flex gap-1.5 flex-wrap mt-2">
                {[deal.stage, deal.sector, deal.geography].filter(Boolean).map((badge) => (
                  <span key={badge} className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                    style={{ background: 'var(--surface3)', color: 'var(--muted2)', border: '1px solid var(--border)' }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            <select
              value={status}
              onChange={(e) => updateStatus(e.target.value as PipelineStatus)}
              className="px-3 py-2 rounded-lg text-xs font-medium outline-none cursor-pointer"
              style={{ background: 'var(--surface3)', border: '1px solid var(--border2)', color: 'var(--text)' }}
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <motion.button
              onClick={generateMemo}
              disabled={generatingMemo}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-100 disabled:opacity-50"
              style={{ background: 'var(--brand)', color: 'var(--bg)' }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { if (!(e.currentTarget as HTMLButtonElement).disabled) { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              <FileText size={13} />
              {generatingMemo ? 'Generating...' : 'Generate Memo'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Two-column body */}
      <div className="px-6 md:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 max-w-6xl">
          {/* LEFT: 3/5 */}
          <motion.div
            className="lg:col-span-3 space-y-4"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            animate="visible"
          >
            {/* Company Overview */}
            <Reveal>
            <div className="rounded-xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <SectionHeader label="Company Overview" />
              <div className="px-5 py-3">
                <InfoRow label="Problem" value={deal.analysis.problem} />
                <InfoRow label="Solution" value={deal.analysis.solution} />
                <InfoRow label="Business Model" value={deal.analysis.businessModel} />
                <InfoRow label="Stage" value={deal.stage} />
                <InfoRow label="Headquarters" value={deal.geography} />
                <InfoRow label="Founded" value={deal.analysis.founded} />
                {deal.analysis.website && (
                  <div className="flex gap-4 py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                    <span className="text-[11px] uppercase tracking-wide flex-shrink-0 pt-0.5 font-medium" style={{ color: 'var(--muted3)', width: 110 }}>Website</span>
                    <a
                      href={`https://${deal.analysis.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm flex items-center gap-1.5 transition-colors"
                      style={{ color: 'var(--blue-text)' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--blue)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--blue-text)'; }}
                    >
                      {deal.analysis.website} <ExternalLink size={10} />
                    </a>
                  </div>
                )}
                {deal.analysis.askingAmount && (
                  <InfoRow last label="Ask" value={`${deal.analysis.askingAmount}${deal.analysis.valuation ? ` at ${deal.analysis.valuation}` : ''}`} />
                )}
              </div>
            </div>

            </Reveal>

            {/* Market */}
            <Reveal>
            <div className="rounded-xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <SectionHeader label="Market" />
              <div className="px-5 py-4">
                {deal.analysis.market.tam || deal.analysis.market.sam ? (
                  <>
                    <div className="grid grid-cols-3 gap-2.5 mb-4">
                      {[
                        { label: 'TAM', value: deal.analysis.market.tam },
                        { label: 'SAM', value: deal.analysis.market.sam },
                        { label: 'SOM', value: deal.analysis.market.som },
                      ].map((m) => (
                        <MetricCard key={m.label} metric={m.label} value={m.value || 'N/A'} />
                      ))}
                    </div>
                    {deal.analysis.market.framing && (
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{deal.analysis.market.framing}</p>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2 p-3 rounded-lg text-sm"
                    style={{ background: 'var(--amber-dim)', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <span style={{ color: 'var(--amber-text)' }}>Market sizing not provided in deck</span>
                  </div>
                )}
              </div>
            </div>

            </Reveal>

            {/* Traction */}
            <Reveal>
            <div className="rounded-xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <SectionHeader label="Traction" />
              <div className="px-5 py-4">
                {deal.analysis.traction.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                    {deal.analysis.traction.map((t) => (
                      <MetricCard key={t.metric} metric={t.metric} value={t.value} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm" style={{ color: 'var(--muted2)' }}>No traction metrics stated in deck</p>
                )}
              </div>
            </div>

            </Reveal>

            {/* Team */}
            <Reveal>
            <div className="rounded-xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <SectionHeader label="Team" />
              <div className="px-5 py-4 space-y-4">
                {deal.analysis.team.map((member, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                    className="flex gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                      style={{ background: 'var(--brand-dim)', border: '1px solid rgba(244,197,66,0.2)', color: 'var(--brand)' }}
                    >
                      {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                        {member.name}
                        <span className="font-normal ml-2 text-xs" style={{ color: 'var(--muted2)' }}>{member.role}</span>
                      </div>
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--muted)' }}>{member.background}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            </Reveal>
          </motion.div>

          {/* RIGHT: 2/5 */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            animate="visible"
          >
            {/* Thesis Fit */}
            <Reveal>
            <div className="rounded-xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <SectionHeader label="Thesis Fit Analysis" />
              <div className="px-5 py-4">
                {/* Score display */}
                <div className="flex items-center justify-between mb-5 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div className="font-mono font-bold text-4xl leading-none" style={{ color: sColor }}>
                      {deal.overallThesisScore.toFixed(1)}
                    </div>
                    <div className="text-xs mt-1" style={{ color: 'var(--muted2)' }}>out of 10</div>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: sBg, color: sColor, border: `1px solid ${sBorder}` }}
                  >
                    {scoreLabel}
                  </div>
                </div>

                {/* Criteria bars */}
                <div className="space-y-3.5">
                  {deal.thesisScores.map((ts, i) => {
                    const c = ts.score >= 7 ? 'var(--green-text)' : ts.score >= 4 ? 'var(--amber-text)' : 'var(--red-text)';
                    return (
                      <motion.div key={ts.criterion} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-medium" style={{ color: 'var(--text2)' }}>{ts.criterion}</span>
                          <span className="font-mono text-xs font-bold" style={{ color: c }}>{ts.score}/10</span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ background: 'var(--surface3)' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${ts.score * 10}%` }}
                            transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{ background: c }}
                          />
                        </div>
                        <p className="text-[11px] italic mt-1 leading-relaxed" style={{ color: 'var(--muted3)' }}>{ts.reason}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            </Reveal>

            {/* Red Flags */}
            <Reveal>
            <div className="rounded-xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <SectionHeader label="Red Flags" />
              <div className="px-5 py-4">
                {deal.redFlags.length === 0 ? (
                  // Positive signal gets the same visual weight as amber/red, decisive, not invisible
                  <div className="flex items-center gap-2 p-3 rounded-lg text-sm"
                    style={{ background: 'var(--green-dim)', border: '1px solid rgba(34,197,94,0.2)', color: 'var(--green-text)' }}>
                    <CheckCircle2 size={14} /> No significant red flags detected
                  </div>
                ) : (
                  <div className="space-y-2">
                    {deal.redFlags.map((flag, i) => {
                      const cfg = SEVERITY_CONFIG[flag.severity as keyof typeof SEVERITY_CONFIG] || SEVERITY_CONFIG.low;
                      return (
                        <div
                          key={i}
                          className="rounded-lg p-3"
                          style={{
                            background: cfg.bg,
                            border: `1px solid ${cfg.border}`,
                            // Functional severity accent: the left-border color IS the severity signal
                            borderLeft: `3px solid ${cfg.color}`,
                          }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                              style={{ background: cfg.bg, color: cfg.color }}
                            >
                              {cfg.label}
                            </span>
                            <span className="text-xs font-semibold" style={{ color: 'var(--text2)' }}>{flag.headline}</span>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{flag.detail}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            </Reveal>

            {/* Analyst Notes */}
            <Reveal>
            <div className="rounded-xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}
              >
                <span className="label-xs">Your Notes</span>
                {notesSaved && (
                  <span className="text-xs flex items-center gap-1" style={{ color: 'var(--green-text)' }}>
                    <CheckCircle2 size={11} /> Saved
                  </span>
                )}
              </div>
              <div className="px-5 py-4">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Initial reaction, questions for founders, follow-up items..."
                  className="input-base resize-none"
                  style={{ background: 'var(--surface3)', border: '1px solid var(--border2)', color: 'var(--text)' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--brand)'; }}
                  onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border2)'; saveNotes(); }}
                />
                <p className="text-[11px] mt-1" style={{ color: 'var(--muted3)' }}>Auto-saves on blur</p>
              </div>
            </div>

            </Reveal>

            {/* AI Detection */}
            {deal.aiDetection && (
              <Reveal>
              <div className="rounded-xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div
                  className="px-5 py-3 flex items-center justify-between"
                  style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}
                >
                  <div className="flex items-center gap-2">
                    <Bot size={12} style={{ color: 'var(--muted2)' }} />
                    <span className="label-xs">AI Authorship</span>
                  </div>
                  {(() => {
                    const s = deal.aiDetection!.overallScore;
                    const c      = s >= 60 ? 'var(--red-text)'   : s >= 35 ? 'var(--amber-text)' : 'var(--green-text)';
                    const bg     = s >= 60 ? 'var(--red-dim)'    : s >= 35 ? 'var(--amber-dim)'  : 'var(--green-dim)';
                    const border = s >= 60 ? 'rgba(239,68,68,0.2)' : s >= 35 ? 'rgba(245,158,11,0.2)' : 'rgba(34,197,94,0.2)';
                    const label  = s >= 60 ? 'High AI' : s >= 35 ? 'Moderate AI' : 'Likely Human';
                    return (
                      <span
                        className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: c, background: bg, border: `1px solid ${border}` }}
                      >
                        {s}% · {label}
                      </span>
                    );
                  })()}
                </div>
                <div className="px-5 py-4 space-y-3">
                  {deal.aiDetection.sections.map((sec, i) => {
                    const c = sec.score >= 60 ? 'var(--red-text)' : sec.score >= 35 ? 'var(--amber-text)' : 'var(--green-text)';
                    return (
                      <div key={sec.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px]" style={{ color: 'var(--muted)' }}>{sec.name}</span>
                          <span className="font-mono text-[11px] font-medium" style={{ color: c }}>{sec.score}%</span>
                        </div>
                        <div className="h-1 rounded-full" style={{ background: 'var(--surface3)' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${sec.score}%` }}
                            transition={{ duration: 0.4, delay: 0.1 + i * 0.04, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{ background: c }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {deal.aiDetection.flaggedExcerpts.length > 0 && (
                    <div className="space-y-2 pt-1">
                      {deal.aiDetection.flaggedExcerpts.map((ex, i) => (
                        <div key={i} className="rounded-lg p-2.5" style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}>
                          <div className="flex items-start gap-1.5">
                            <AlertCircle size={10} style={{ color: 'var(--amber-text)', flexShrink: 0, marginTop: 2 }} />
                            <p className="text-[11px] italic leading-relaxed" style={{ color: 'var(--muted)' }}>"{ex.text}"</p>
                          </div>
                          <p className="text-[10px] ml-4 mt-0.5" style={{ color: 'var(--muted3)' }}>{ex.reason}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--muted2)', borderTop: '1px solid var(--border)', paddingTop: 10 }}>
                    {deal.aiDetection.analystNote}
                  </p>
                </div>
              </div>
              </Reveal>
            )}

            {/* View Memo CTA */}
            {deal.memoContent && (
              <Link
                href={`/app/memo/${deal.id}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-100"
                style={{ background: 'var(--brand-dim)', color: 'var(--brand)', border: '1px solid rgba(244,197,66,0.25)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--brand-glow)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--brand-dim)'; }}
              >
                <FileText size={13} /> View Investment Memo
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
