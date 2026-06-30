'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Save, CheckCircle2, ChevronDown, ChevronUp, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

interface Profile {
  firmName: string;
  analystName: string;
  email: string;
}

function ThemeToggleSection() {
  const { theme, setTheme } = useTheme();

  return (
    <section
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div
        className="px-5 py-3.5"
        style={{ borderBottom: '1px solid var(--border)', borderLeft: '2px solid var(--muted3)' }}
      >
        <h2 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Appearance</h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--muted2)' }}>Choose how the app looks to you.</p>
      </div>
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>Theme</div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--muted2)' }}>Preference is saved locally in your browser.</div>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: 'var(--surface2)', border: '1px solid var(--border2)' }}>
          <button
            onClick={() => setTheme('light')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150"
            style={
              theme === 'light'
                ? { background: 'var(--bg)', color: 'var(--text)', boxShadow: '0 1px 2px rgba(0,0,0,0.12)', border: '1px solid var(--border)' }
                : { color: 'var(--muted)', border: '1px solid transparent' }
            }
          >
            <Sun size={12} />
            Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150"
            style={
              theme === 'dark'
                ? { background: 'var(--bg)', color: 'var(--text)', boxShadow: '0 1px 2px rgba(0,0,0,0.12)', border: '1px solid var(--border)' }
                : { color: 'var(--muted)', border: '1px solid transparent' }
            }
          >
            <Moon size={12} />
            Dark
          </button>
        </div>
      </div>
    </section>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>({ firmName: '', analystName: '', email: '' });
  const [saved, setSaved] = useState(false);
  const [dangerOpen, setDangerOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('thesis_profile');
      if (stored) setProfile(JSON.parse(stored));
    } catch {}
  }, []);

  const handleSave = () => {
    localStorage.setItem('thesis_profile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSignOut = () => {
    localStorage.removeItem('thesis_profile');
    router.push('/login');
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
        className="px-6 md:px-8 py-5 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
      >
        <div>
          <h1 className="text-lg font-bold" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>Settings</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>Manage your workspace preferences.</p>
        </div>
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: 'var(--green-dim)', color: 'var(--green-text)', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <CheckCircle2 size={12} /> Saved
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-6 md:px-8 py-6 max-w-2xl space-y-4">
        {/* Appearance */}
        <ThemeToggleSection />

        {/* Analyst Profile */}
        <section
          className="rounded-xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div
            className="px-5 py-3.5"
            style={{ borderBottom: '1px solid var(--border)', borderLeft: '2px solid var(--brand)' }}
          >
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Analyst Profile</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted2)' }}>Your name and firm appear in memos and the sidebar.</p>
          </div>
          <div className="px-5 py-5 space-y-4">
            {[
              { label: 'Firm Name', key: 'firmName', placeholder: 'Meridian Capital', type: 'text' },
              { label: 'Your Name', key: 'analystName', placeholder: 'Alex Chen', type: 'text' },
              { label: 'Email', key: 'email', placeholder: 'alex@meridiancap.com', type: 'email' },
            ].map(({ label, key, placeholder, type }) => (
              <div key={key}>
                <label className="label-xs block mb-2">{label}</label>
                <input
                  type={type}
                  value={profile[key as keyof Profile]}
                  onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="input-base"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--text)' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--brand)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border2)'; }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Data & Pipeline */}
        <section
          className="rounded-xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div
            className="px-5 py-3.5"
            style={{ borderBottom: '1px solid var(--border)', borderLeft: '2px solid var(--blue)' }}
          >
            <h2 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Data & Pipeline</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted2)' }}>Manage your local deal data.</p>
          </div>
          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>Export pipeline to CSV</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--muted2)' }}>Download all deals with scores and metadata</div>
              </div>
              <button
                onClick={() => {
                  const deals = JSON.parse(localStorage.getItem('thesis_deals') || '[]');
                  const csv = [
                    ['Company', 'Stage', 'Sector', 'Score', 'Status', 'Red Flags', 'Date Added'].join(','),
                    ...deals.map((d: { companyName: string; stage: string; sector: string; overallThesisScore: number; pipelineStatus: string; redFlags: unknown[]; createdAt: string }) =>
                      [d.companyName, d.stage, d.sector, d.overallThesisScore, d.pipelineStatus, d.redFlags.length, d.createdAt].join(',')
                    ),
                  ].join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a'); a.href = url; a.download = 'thesis-pipeline.csv'; a.click();
                }}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-100 flex-shrink-0"
                style={{ background: 'var(--surface2)', color: 'var(--text2)', border: '1px solid var(--border2)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--muted)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border2)'; }}
              >
                Export CSV
              </button>
            </div>

            <div>
              <button
                className="w-full flex items-center justify-between px-5 py-3.5 text-sm transition-colors text-left"
                style={{ color: dangerOpen ? 'var(--red-text)' : 'var(--muted)' }}
                onClick={() => setDangerOpen(!dangerOpen)}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--red-text)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = dangerOpen ? 'var(--red-text)' : 'var(--muted)'; }}
              >
                <span className="font-medium">Danger zone</span>
                {dangerOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              <AnimatePresence>
                {dangerOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden', borderTop: '1px solid var(--border)' }}
                  >
                    <div className="flex items-center justify-between px-5 py-4">
                      <div>
                        <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>Clear local deal data</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--muted2)' }}>Removes all deals stored in this browser</div>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm('Clear all local deal data? This cannot be undone.')) {
                            localStorage.removeItem('thesis_deals');
                            window.location.reload();
                          }
                        }}
                        className="px-3.5 py-2 rounded-lg text-xs font-semibold flex-shrink-0"
                        style={{ background: 'var(--red-dim)', color: 'var(--red-text)', border: '1px solid rgba(239,68,68,0.2)' }}
                      >
                        Clear data
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Version */}
        <section
          className="rounded-xl"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <div className="px-5 py-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>Thesis</div>
              <div className="text-xs mt-0.5 font-mono" style={{ color: 'var(--muted3)' }}>v1.0.0 · Next.js + Claude API</div>
            </div>
            <span
              className="text-xs font-mono px-2.5 py-1 rounded-full"
              style={{ background: 'var(--brand-dim)', color: 'var(--brand)', border: '1px solid rgba(244,197,66,0.2)' }}
            >
              Demo
            </span>
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-100"
            style={{ color: 'var(--muted)', border: '1px solid var(--border)', background: 'transparent' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--red-text)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.35)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
          >
            <LogOut size={13} />
            Sign out
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-100"
            style={{ background: 'var(--brand)', color: 'var(--bg)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            <Save size={13} />
            Save changes
          </button>
        </div>
      </div>
    </motion.div>
  );
}
