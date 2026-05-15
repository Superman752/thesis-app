'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Printer, RefreshCw, Loader2 } from 'lucide-react';
import { Deal } from '@/lib/types';
import { mockDeals, mockThesisConfig } from '@/lib/mockData';
import MemoDocument from '@/components/MemoDocument';

export default function MemoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const loadDeal = () => {
    const mock = mockDeals.find((d) => d.id === id);
    if (mock) { setDeal(mock); setLoading(false); return; }
    const stored = JSON.parse(localStorage.getItem('thesis_deals') || '[]') as Deal[];
    const found = stored.find((d) => d.id === id);
    if (found) setDeal(found);
    setLoading(false);
  };

  useEffect(() => { loadDeal(); }, [id]);

  const generateMemo = async (currentDeal: Deal) => {
    setGenerating(true);
    setError('');
    try {
      const response = await fetch('/api/memo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dealId: currentDeal.id,
          analysis: currentDeal.analysis,
          thesisScores: currentDeal.thesisScores,
          overallThesisScore: currentDeal.overallThesisScore,
          thesisConfig: mockThesisConfig,
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      if (data.memoContent) {
        const stored = JSON.parse(localStorage.getItem('thesis_deals') || '[]') as Deal[];
        const idx = stored.findIndex((d) => d.id === id);
        if (idx >= 0) {
          stored[idx] = { ...stored[idx], memoContent: data.memoContent };
          localStorage.setItem('thesis_deals', JSON.stringify(stored));
        }
        setDeal((prev) => prev ? { ...prev, memoContent: data.memoContent } : prev);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Memo generation failed.');
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (deal && !deal.memoContent && !generating) {
      generateMemo(deal);
    }
  }, [deal]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--light-bg)' }}>
        {/* Use a dark ink value — var(--muted) is a dark-shell token that fails contrast on light-bg */}
        <Loader2 size={24} className="animate-spin" style={{ color: '#71717A' }} />
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--light-bg)' }}>
        <div className="text-center">
          <p className="text-base mb-4" style={{ color: 'var(--light-text)' }}>Deal not found.</p>
          <Link href="/app" className="text-sm" style={{ color: 'var(--blue)' }}>← Back to pipeline</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--light-bg)', minHeight: '100vh' }}>
      {/* Top controls bar , dark */}
      <div
        className="no-print sticky top-0 z-30 flex items-center justify-between px-6 h-14 gap-4"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
      >
        <Link
          href={`/app/deal/${deal.id}`}
          className="flex items-center gap-2 text-sm transition-colors"
          style={{ color: 'var(--muted)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; }}
        >
          <ArrowLeft size={14} />
          Back to Deal Analysis
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => deal && generateMemo(deal)}
            disabled={generating}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-100 disabled:opacity-50"
            style={{ background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border)' }}
            onMouseEnter={(e) => { if (!(e.currentTarget as HTMLButtonElement).disabled) { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)'; (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
          >
            {generating ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
            {generating ? 'Generating...' : 'Regenerate Memo'}
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-100"
            style={{ background: 'var(--brand)', color: 'var(--bg)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(244,197,66,0.25)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            <Printer size={12} />
            Print / Export PDF
          </button>
        </div>
      </div>

      {/* Document */}
      <div className="px-8 py-12">
        {generating && !deal.memoContent ? (
          <div className="max-w-2xl mx-auto text-center py-24">
            <Loader2 size={28} className="animate-spin mx-auto mb-4" style={{ color: '#71717A' }} />
            <p className="text-sm" style={{ color: '#374151' }}>Generating investment memo...</p>
            <p className="text-xs mt-1" style={{ color: '#6b7280' }}>
              Drafting sections based on extracted deal data.
            </p>
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto">
            <div
              className="rounded-xl p-6"
              style={{ background: '#fee2e2', border: '1px solid #fca5a5' }}
            >
              <h3 className="text-sm font-semibold mb-2" style={{ color: '#dc2626' }}>Memo generation failed</h3>
              <p className="text-sm mb-4" style={{ color: '#374151' }}>{error}</p>
              <button
                onClick={() => deal && generateMemo(deal)}
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{ background: '#dc2626', color: 'white' }}
              >
                Retry
              </button>
            </div>
          </div>
        ) : deal.memoContent ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <MemoDocument deal={deal} />
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
