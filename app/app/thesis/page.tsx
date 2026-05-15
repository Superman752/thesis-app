'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThesisConfig } from '@/lib/types';
import { mockThesisConfig } from '@/lib/mockData';
import ThesisConfigEditor from '@/components/ThesisConfig';

export default function ThesisPage() {
  const [config, setConfig] = useState<ThesisConfig>(mockThesisConfig);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('thesis_config');
      if (stored) setConfig(JSON.parse(stored));
    } catch {}
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem('thesis_config', JSON.stringify(config));
      await new Promise((r) => setTimeout(r, 400)); // simulate save
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="min-h-screen"
    >
      {/* Page header */}
      <div
        className="px-6 md:px-8 py-5 flex items-center justify-between gap-4"
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
      >
        <div>
          <h1 className="text-lg font-bold" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Investment Thesis
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
            Define the criteria Thesis scores every deal against.
          </p>
        </div>
        {saved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0"
            style={{ background: 'var(--green-dim)', color: 'var(--green-text)', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            ✓ Changes saved
          </motion.div>
        )}
      </div>

      <div className="px-6 md:px-8 py-6">
        <ThesisConfigEditor
          config={config}
          onChange={setConfig}
          onSave={handleSave}
          saving={saving}
        />
      </div>
    </motion.div>
  );
}
