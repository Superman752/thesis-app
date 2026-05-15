'use client';

import { useState } from 'react';
import { Plus, X, Save } from 'lucide-react';
import { ThesisConfig as ThesisConfigType, ThesisCriterion, DealStage } from '@/lib/types';

interface ThesisConfigProps {
  config: ThesisConfigType;
  onChange: (config: ThesisConfigType) => void;
  onSave: () => void;
  saving?: boolean;
}

const STAGES: DealStage[] = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series B+'];
const SECTORS = ['B2B SaaS', 'Fintech', 'Healthtech', 'Consumer', 'Deep Tech', 'Marketplace', 'Infrastructure', 'Climate', 'Other'];
const GEOS = ['North America', 'Europe', 'LatAm', 'Asia', 'Global'];

function Chip({
  label,
  active,
  onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-100"
      style={
        active
          ? { background: 'var(--brand-dim)', color: 'var(--brand)', border: '1px solid var(--brand)' }
          : { background: 'var(--surface2)', color: 'var(--muted)', border: '1px solid var(--border)' }
      }
    >
      {label}
    </button>
  );
}

export default function ThesisConfigEditor({ config, onChange, onSave, saving }: ThesisConfigProps) {
  const totalWeight = config.criteria.reduce((s, c) => s + c.weight, 0);
  const weightOk = totalWeight === 100;

  const updateField = <K extends keyof ThesisConfigType>(key: K, value: ThesisConfigType[K]) => {
    onChange({ ...config, [key]: value });
  };

  const toggleArray = <T,>(arr: T[], item: T): T[] =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  const updateCriterion = (i: number, updates: Partial<ThesisCriterion>) => {
    const next = [...config.criteria];
    next[i] = { ...next[i], ...updates };
    onChange({ ...config, criteria: next });
  };

  const removeCriterion = (i: number) => {
    onChange({ ...config, criteria: config.criteria.filter((_, idx) => idx !== i) });
  };

  const addCriterion = () => {
    onChange({
      ...config,
      criteria: [
        ...config.criteria,
        { name: 'New Criterion', description: 'Describe what this criterion evaluates.', weight: 10 },
      ],
    });
  };

  return (
    <div className="space-y-8">
      {/* Firm Profile */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold" style={{ color: 'var(--text)' }}>Firm Profile</h2>
            <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>Basic information about your fund and investment focus.</p>
          </div>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-100 disabled:opacity-50"
            style={{ background: 'var(--brand)', color: 'var(--bg)' }}
          >
            <Save size={14} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <div className="rounded-xl p-5 space-y-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div>
            <label className="text-xs font-medium uppercase tracking-wide block mb-1.5" style={{ color: 'var(--muted)' }}>Firm Name</label>
            <input
              value={config.firmName}
              onChange={(e) => updateField('firmName', e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors"
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--brand)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
            />
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wide block mb-2" style={{ color: 'var(--muted)' }}>Focus Stages</label>
            <div className="flex flex-wrap gap-2">
              {STAGES.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  active={config.focusStages.includes(s)}
                  onClick={() => updateField('focusStages', toggleArray(config.focusStages, s) as DealStage[])}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wide block mb-2" style={{ color: 'var(--muted)' }}>Target Sectors</label>
            <div className="flex flex-wrap gap-2">
              {SECTORS.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  active={config.targetSectors.includes(s)}
                  onClick={() => updateField('targetSectors', toggleArray(config.targetSectors, s))}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wide block mb-1.5" style={{ color: 'var(--muted)' }}>Min Check Size</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-sm" style={{ color: 'var(--muted)' }}>$</span>
                <input
                  type="number"
                  value={config.checkSizeMin}
                  onChange={(e) => updateField('checkSizeMin', parseInt(e.target.value) || 0)}
                  className="w-full pl-6 pr-3 py-2 rounded-lg text-sm font-mono outline-none"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--brand)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wide block mb-1.5" style={{ color: 'var(--muted)' }}>Max Check Size</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-sm" style={{ color: 'var(--muted)' }}>$</span>
                <input
                  type="number"
                  value={config.checkSizeMax}
                  onChange={(e) => updateField('checkSizeMax', parseInt(e.target.value) || 0)}
                  className="w-full pl-6 pr-3 py-2 rounded-lg text-sm font-mono outline-none"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--brand)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wide block mb-2" style={{ color: 'var(--muted)' }}>Geographic Focus</label>
            <div className="flex flex-wrap gap-2">
              {GEOS.map((g) => (
                <Chip
                  key={g}
                  label={g}
                  active={config.geography.includes(g)}
                  onClick={() => updateField('geography', toggleArray(config.geography, g))}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scoring Criteria */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-semibold" style={{ color: 'var(--text)' }}>Scoring Criteria</h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
            These criteria are scored 1–10 for every deal. Customize labels and weights to match your thesis.
          </p>
        </div>

        {/* Weight indicator */}
        <div
          className="flex items-center justify-between px-4 py-2.5 rounded-lg mb-4 text-sm font-mono"
          style={{
            background: weightOk ? 'var(--green-dim)' : 'var(--red-dim)',
            border: `1px solid ${weightOk ? 'var(--green)' : 'var(--red)'}`,
            color: weightOk ? 'var(--green)' : 'var(--red)',
          }}
        >
          <span>Total weight</span>
          <span className="font-bold">{totalWeight}%{weightOk ? ' ✓' : ' , must equal 100%'}</span>
        </div>

        <div className="space-y-3">
          {config.criteria.map((criterion, i) => (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-3">
                  <input
                    value={criterion.name}
                    onChange={(e) => updateCriterion(i, { name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-sm font-semibold outline-none"
                    style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--brand)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                  />
                  <input
                    value={criterion.description}
                    onChange={(e) => updateCriterion(i, { description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                    style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--brand)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                  />
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>Weight</span>
                    <input
                      type="range"
                      min={5}
                      max={40}
                      value={criterion.weight}
                      onChange={(e) => updateCriterion(i, { weight: parseInt(e.target.value) })}
                      className="flex-1"
                      style={{ accentColor: 'var(--brand)' }}
                    />
                    <span className="font-mono text-sm w-10 text-right" style={{ color: 'var(--brand)' }}>
                      {criterion.weight}%
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeCriterion(i)}
                  className="p-1.5 rounded-lg transition-colors mt-1"
                  style={{ color: 'var(--muted2)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--red)'; (e.currentTarget as HTMLElement).style.background = 'var(--red-dim)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted2)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addCriterion}
          className="flex items-center gap-2 mt-3 px-4 py-2.5 rounded-lg text-sm font-medium w-full justify-center transition-colors"
          style={{ border: '1px dashed var(--border)', color: 'var(--muted)', background: 'transparent' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--brand)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--brand)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
        >
          <Plus size={15} />
          Add criterion
        </button>
      </section>

      {/* Auto-detection rules */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-semibold" style={{ color: 'var(--text)' }}>Auto-Detection Rules</h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>Automatically flag deals that match these patterns.</p>
        </div>
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {[
            { key: 'noRevenueModel' as const, label: 'Flag deals with no stated revenue model' },
            { key: 'soloFounder' as const, label: 'Flag deals with solo founder (no co-founder)' },
            { key: 'noTractionMetrics' as const, label: 'Flag deals with no stated traction metrics' },
            { key: 'unsubstantiatedMarket' as const, label: 'Flag market size claims without a cited source' },
            { key: 'outsideStage' as const, label: 'Flag deals outside target stage' },
          ].map(({ key, label }, i, arr) => (
            <div
              key={key}
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: i % 2 === 0 ? 'var(--surface)' : 'var(--surface2)',
                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : undefined,
              }}
            >
              <span className="text-sm" style={{ color: 'var(--text)' }}>{label}</span>
              <button
                onClick={() =>
                  onChange({
                    ...config,
                    autoFlags: { ...config.autoFlags, [key]: !config.autoFlags[key] },
                  })
                }
                className="relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0"
                style={{ background: config.autoFlags[key] ? 'var(--brand)' : 'var(--surface2)', border: '1px solid var(--border)' }}
              >
                <span
                  className="absolute top-0.5 w-4 h-4 rounded-full transition-transform duration-200"
                  style={{
                    background: config.autoFlags[key] ? 'var(--bg)' : 'var(--muted2)',
                    transform: config.autoFlags[key] ? 'translateX(21px)' : 'translateX(1px)',
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
