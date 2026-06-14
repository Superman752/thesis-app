'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, BarChart2, Target, AlertTriangle, Cpu,
  CheckCircle2, Upload, X, Zap, ChevronDown, ChevronUp,
} from 'lucide-react';
import { mockDeals } from '@/lib/mockData';
import { Deal } from '@/lib/types';

type AnalysisStep = {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
};

const STEPS: AnalysisStep[] = [
  { label: 'Reading document',       icon: FileText   },
  { label: 'Identifying key metrics', icon: BarChart2  },
  { label: 'Scoring thesis fit',      icon: Target     },
  { label: 'Detecting red flags',     icon: AlertTriangle },
  { label: 'Building analysis',       icon: Cpu        },
];

// ─── Horizontal step track shown below the drop zone (idle + staged) ────────
function HorizontalSteps() {
  return (
    <div className="flex items-start mt-8 select-none" aria-hidden="true">
      {STEPS.map((step, i) => (
        <div key={step.label} className="flex-1 flex flex-col items-center relative">
          {/* Connecting line — spans from center of previous node to center of this one */}
          {i > 0 && (
            <div
              className="absolute"
              style={{
                top: 15,
                right: '50%',
                left: '-50%',
                height: 1,
                background: 'var(--border)',
              }}
            />
          )}

          {/* Icon node */}
          <div
            className="relative z-10 w-[30px] h-[30px] rounded-full flex items-center justify-center"
            style={{
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              color: 'var(--muted3)',
            }}
          >
            <step.icon size={13} />
          </div>

          {/* Label */}
          <p
            className="text-center mt-2 leading-snug px-1"
            style={{ fontSize: 10, color: 'var(--muted3)' }}
          >
            {step.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging]         = useState(false);
  const [file, setFile]                     = useState<File | null>(null);
  const [stagedFile, setStagedFile]         = useState<File | null>(null);
  const [phase, setPhase]                   = useState<'idle' | 'staged' | 'analyzing' | 'done' | 'error'>('idle');
  const [currentStep, setCurrentStep]       = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [progress, setProgress]             = useState(0);
  const [errorMessage, setErrorMessage]     = useState('');
  const [showNotes, setShowNotes]           = useState(false);
  const [initialNotes, setInitialNotes]     = useState('');
  const [recentDeals, setRecentDeals]       = useState<Deal[]>([]);

  useEffect(() => {
    try {
      const stored  = JSON.parse(localStorage.getItem('thesis_deals') || '[]') as Deal[];
      const storedIds = new Set(stored.map((d) => d.id));
      const combined = [...stored, ...mockDeals.filter((d) => !storedIds.has(d.id))];
      setRecentDeals(combined.slice(0, 3));
    } catch { /* ignore */ }
  }, []);

  const stageFile = useCallback((selectedFile: File) => {
    setStagedFile(selectedFile);
    setPhase('staged');
  }, []);

  const processFile = useCallback(async (selectedFile: File) => {
    setFile(selectedFile);
    setPhase('analyzing');
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setProgress(0);

    try {
      const stepDuration = 1200;
      for (let i = 0; i < STEPS.length; i++) {
        setCurrentStep(i);
        setProgress(Math.round((i / STEPS.length) * 85));
        await new Promise((resolve) => setTimeout(resolve, stepDuration));
        setCompletedSteps((prev) => new Set([...prev, i]));
      }
      setProgress(90);

      const arrayBuffer = await selectedFile.arrayBuffer();
      const bytes       = new Uint8Array(arrayBuffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
      const base64 = btoa(binary);

      const response = await fetch('/api/analyze', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ pdf: base64, filename: selectedFile.name }),
      });

      const data = await response.json();
      if (!response.ok || data.error) throw new Error(data.error || 'Analysis failed.');

      setProgress(100);
      setPhase('done');

      const deals: Deal[] = JSON.parse(localStorage.getItem('thesis_deals') || '[]');
      const newDeal = { ...data.deal, analystNotes: initialNotes };
      deals.unshift(newDeal);
      localStorage.setItem('thesis_deals', JSON.stringify(deals));

      setTimeout(() => router.push(`/app/deal/${data.dealId}`), 600);
    } catch (err) {
      setPhase('error');
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    }
  }, [router, initialNotes]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === 'application/pdf') stageFile(dropped);
  }, [stageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) stageFile(selected);
  };

  const handleDemoAnalysis = () => {
    // Navigate directly to the existing Conduit mock deal — no API call needed
    router.push('/app/deal/deal-conduit-004');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div
        className="px-6 md:px-8 py-5"
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
      >
        <h1 className="text-lg font-bold" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
          Analyze a Deck
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
          Upload a PDF. Get thesis fit score, deal data, and investment memo in seconds.
        </p>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="px-6 md:px-8 py-8">
        <AnimatePresence mode="wait">

          {/* ── IDLE ─────────────────────────────────────────────────────── */}
          {phase === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className={`flex gap-6 items-start ${recentDeals.length > 0 ? 'flex-col lg:flex-row' : ''}`}>

                {/* Left: drop zone + sample link + step indicator */}
                <div className="flex-1 min-w-0">

                  {/* Drop zone */}
                  <div
                    className="w-full rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-150"
                    style={{
                      minHeight: 300,
                      border: `1.5px dashed ${isDragging ? 'var(--brand)' : 'var(--border2)'}`,
                      background: isDragging ? 'var(--brand-dim)' : 'var(--surface)',
                      outline: isDragging ? '2px solid var(--brand)' : 'none',
                    }}
                    onDragOver={(e)  => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: isDragging ? 'var(--brand)' : 'var(--surface3)',
                        border: '1px solid var(--border2)',
                      }}
                    >
                      <Upload size={20} style={{ color: isDragging ? '#09090B' : 'var(--muted)' }} />
                    </div>
                    <p className="text-base font-semibold mb-1.5" style={{ color: 'var(--text)' }}>
                      {isDragging ? 'Release to stage' : 'Drop pitch deck here'}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>or click to browse</p>
                    <p className="text-xs font-mono mt-3" style={{ color: 'var(--muted3)' }}>PDF · max 50 MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* Sample deck link */}
                  <div className="text-center py-3">
                    <span className="text-xs" style={{ color: 'var(--muted3)' }}>No deck ready? </span>
                    <button
                      onClick={handleDemoAnalysis}
                      className="text-xs font-medium transition-colors"
                      style={{ color: 'var(--brand)' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.75'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                    >
                      Try a sample deck
                    </button>
                  </div>

                  {/* Horizontal 5-step indicator */}
                  <HorizontalSteps />
                </div>

                {/* Right: Recent Analyses panel */}
                {recentDeals.length > 0 && (
                  <div
                    className="w-full lg:w-72 flex-shrink-0 rounded-xl overflow-hidden"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  >
                    {/* Panel header */}
                    <div
                      className="flex items-center justify-between px-4 py-3"
                      style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}
                    >
                      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted2)' }}>
                        Recent Analyses
                      </span>
                      <Link
                        href="/app"
                        className="text-[10px] transition-colors"
                        style={{ color: 'var(--muted3)' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted3)'; }}
                      >
                        View all →
                      </Link>
                    </div>

                    {/* Deal rows */}
                    <div>
                      {recentDeals.map((deal, i) => {
                        const sColor =
                          deal.overallThesisScore >= 7.5 ? 'var(--green-text)' :
                          deal.overallThesisScore >= 5   ? 'var(--amber-text)' :
                          'var(--red-text)';
                        return (
                          <Link
                            key={deal.id}
                            href={`/app/deal/${deal.id}`}
                            className="flex items-center gap-3 px-4 py-3 transition-colors"
                            style={{
                              borderBottom: i < recentDeals.length - 1 ? '1px solid var(--border)' : 'none',
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--surface2)'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                          >
                            {/* Avatar */}
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                              style={{ background: 'var(--surface3)', color: 'var(--brand)', border: '1px solid var(--border2)' }}
                            >
                              {deal.companyName[0]}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>
                                {deal.companyName}
                              </div>
                              <div className="text-[10px] truncate mt-0.5" style={{ color: 'var(--muted3)' }}>
                                {deal.stage} · {deal.sector}
                              </div>
                            </div>

                            {/* Score */}
                            <span className="font-mono text-sm font-bold flex-shrink-0" style={{ color: sColor }}>
                              {deal.overallThesisScore.toFixed(1)}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── STAGED ───────────────────────────────────────────────────── */}
          {phase === 'staged' && stagedFile && (
            <motion.div key="staged" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

              <div
                className="rounded-xl overflow-hidden"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                {/* File info row */}
                <div className="flex items-center gap-3.5 px-5 py-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--brand-dim)', border: '1px solid rgba(244,197,66,0.25)' }}
                  >
                    <FileText size={18} style={{ color: 'var(--brand)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>
                      {stagedFile.name}
                    </div>
                    <div className="text-xs mt-0.5 font-mono" style={{ color: 'var(--muted2)' }}>
                      {formatFileSize(stagedFile.size)} · PDF
                    </div>
                  </div>
                  <button
                    onClick={() => { setStagedFile(null); setPhase('idle'); }}
                    className="w-7 h-7 rounded-md flex items-center justify-center transition-colors flex-shrink-0"
                    style={{ background: 'var(--surface3)', color: 'var(--muted)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; }}
                  >
                    <X size={13} />
                  </button>
                </div>

                {/* Notes toggle */}
                <div style={{ borderTop: '1px solid var(--border)' }}>
                  <button
                    className="w-full flex items-center justify-between px-5 py-3 text-xs transition-colors"
                    style={{ color: 'var(--muted)' }}
                    onClick={() => setShowNotes(!showNotes)}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text2)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; }}
                  >
                    <span className="font-medium">Add analyst notes before running</span>
                    {showNotes ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                  {showNotes && (
                    <div className="px-5 pb-4" style={{ borderTop: '1px solid var(--border)' }}>
                      <div className="relative mt-3">
                        <textarea
                          value={initialNotes}
                          onChange={(e) => setInitialNotes(e.target.value)}
                          rows={3}
                          maxLength={500}
                          placeholder="Initial reaction, source, or context..."
                          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
                          style={{
                            background: 'var(--surface3)',
                            border: '1px solid var(--border2)',
                            color: 'var(--text)',
                          }}
                          onFocus={(e) => { e.target.style.borderColor = 'var(--brand)'; }}
                          onBlur={(e)  => { e.target.style.borderColor = 'var(--border2)'; }}
                        />
                        <span
                          className="absolute bottom-2 right-3 text-[10px] font-mono"
                          style={{ color: 'var(--muted3)' }}
                        >
                          {initialNotes.length}/500
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Run button */}
                <div className="px-5 py-4" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface2)' }}>
                  <button
                    onClick={() => processFile(stagedFile)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-100"
                    style={{ background: 'var(--brand)', color: '#09090B' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    <Zap size={15} />
                    Run Analysis
                  </button>
                </div>
              </div>

              {/* Horizontal step indicator (all muted while staged) */}
              <HorizontalSteps />
            </motion.div>
          )}

          {/* ── ANALYZING / DONE ─────────────────────────────────────────── */}
          {(phase === 'analyzing' || phase === 'done') && (
            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div
                className="max-w-2xl rounded-xl overflow-hidden"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                {/* File header */}
                <div
                  className="flex items-center gap-3 px-5 py-4"
                  style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface2)' }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--brand-dim)', border: '1px solid rgba(244,197,66,0.2)' }}
                  >
                    <FileText size={16} style={{ color: 'var(--brand)' }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{file?.name}</div>
                    <div className="text-xs" style={{ color: 'var(--muted2)' }}>
                      {phase === 'done' ? 'Analysis complete' : 'Analyzing...'}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="px-5 pt-5 pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="label-xs">Progress</span>
                    <span className="font-mono text-xs" style={{ color: 'var(--brand)' }}>{progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'var(--surface3)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'var(--brand)' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Vertical step list */}
                <div className="px-5 pb-5 space-y-0">
                  {STEPS.map((step, i) => {
                    const isCompleted = completedSteps.has(i);
                    const isActive    = i === currentStep && !isCompleted;
                    const isPending   = i > currentStep && !isCompleted;

                    return (
                      <div
                        key={step.label}
                        className="flex items-center gap-3 py-2.5"
                        style={{
                          borderBottom: i < STEPS.length - 1 ? '1px solid var(--border)' : 'none',
                          opacity: isPending ? 0.3 : 1,
                        }}
                      >
                        {/* Step indicator */}
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold font-mono"
                          style={{
                            background: isCompleted ? 'var(--green-dim)' : isActive ? 'var(--brand-dim)' : 'var(--surface3)',
                            border: `1px solid ${isCompleted ? 'rgba(34,197,94,0.3)' : isActive ? 'rgba(244,197,66,0.3)' : 'var(--border)'}`,
                            color: isCompleted ? 'var(--green-text)' : isActive ? 'var(--brand)' : 'var(--muted3)',
                          }}
                        >
                          {isCompleted ? (
                            <CheckCircle2 size={12} />
                          ) : isActive ? (
                            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                              <step.icon size={11} />
                            </motion.div>
                          ) : (
                            i + 1
                          )}
                        </div>

                        <span
                          className="text-sm"
                          style={{ color: isCompleted ? 'var(--text2)' : isActive ? 'var(--text)' : 'var(--muted2)' }}
                        >
                          {step.label}
                        </span>

                        {isCompleted && (
                          <span className="ml-auto text-[10px] font-mono" style={{ color: 'var(--green-text)' }}>Done</span>
                        )}
                        {isActive && (
                          <span className="ml-auto text-[10px] font-mono" style={{ color: 'var(--brand)' }}>Running</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {phase === 'done' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 px-5 py-3.5 text-sm"
                    style={{ borderTop: '1px solid var(--border)', background: 'var(--green-dim)', color: 'var(--green-text)' }}
                  >
                    <CheckCircle2 size={14} />
                    Analysis complete. Redirecting...
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── ERROR ────────────────────────────────────────────────────── */}
          {phase === 'error' && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div
                className="max-w-xl rounded-xl p-6"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--red)' }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <AlertTriangle size={16} style={{ color: 'var(--red-text)' }} />
                  <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Analysis failed</h3>
                </div>
                <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>{errorMessage}</p>
                <button
                  onClick={() => { setPhase('idle'); setFile(null); setStagedFile(null); setErrorMessage(''); }}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-100"
                  style={{ background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border2)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--muted)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)'; }}
                >
                  Try again
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
