'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [firmName, setFirmName]       = useState('');
  const [analystName, setAnalystName] = useState('');
  const [email, setEmail]             = useState('');
  const [loading, setLoading]         = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!firmName.trim() || !analystName.trim()) return;
    setLoading(true);
    localStorage.setItem('thesis_profile', JSON.stringify({ firmName, analystName, email }));
    setTimeout(() => router.push('/app'), 500);
  };

  const inputStyle = {
    background: 'var(--surface3)',
    border: '1px solid var(--border2)',
    color: 'var(--text)',
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: '#09090B' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full"
        style={{ maxWidth: 480 }}
      >
        {/* Card */}
        <div
          className="rounded-xl"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: 32,
          }}
        >

          {/* Logo + wordmark */}
          <Link href="/" className="flex items-center gap-2.5 mb-8 w-fit">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--brand)' }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2"    width="12" height="2.5" rx="1" fill="#09090B"/>
                <rect x="2" y="6.75" width="8"  height="2.5" rx="1" fill="#09090B"/>
                <rect x="2" y="11.5" width="5"  height="2.5" rx="1" fill="#09090B"/>
              </svg>
            </div>
            <span
              className="font-mono font-bold text-base tracking-tight"
              style={{ color: 'var(--brand)' }}
            >
              thesis
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-7">
            <h1
              className="text-2xl font-bold mb-1.5"
              style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
            >
              Set up your workspace
            </h1>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Analyze pitch decks against your thesis in seconds.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-xs block mb-2">Firm Name</label>
              <input
                type="text"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                placeholder="Meridian Capital"
                required
                className="input-base"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--brand)'; }}
                onBlur={(e)  => { e.target.style.borderColor = 'var(--border2)'; }}
              />
            </div>

            <div>
              <label className="label-xs block mb-2">Your Name</label>
              <input
                type="text"
                value={analystName}
                onChange={(e) => setAnalystName(e.target.value)}
                placeholder="Alex Chen"
                required
                className="input-base"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--brand)'; }}
                onBlur={(e)  => { e.target.style.borderColor = 'var(--border2)'; }}
              />
            </div>

            <div>
              <label className="label-xs block mb-2">
                Work Email{' '}
                <span style={{ color: 'var(--muted3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                  (optional)
                </span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@meridiancap.com"
                className="input-base"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'var(--brand)'; }}
                onBlur={(e)  => { e.target.style.borderColor = 'var(--border2)'; }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading || !firmName.trim() || !analystName.trim()}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-150 mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'var(--brand)', color: '#09090B' }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (!(e.currentTarget as HTMLButtonElement).disabled) {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {loading ? 'Opening...' : (<>Open Thesis <ArrowRight size={15} /></>)}
            </motion.button>
          </form>

          {/* Disclaimer */}
          <p className="text-xs text-center mt-6" style={{ color: 'var(--muted3)' }}>
            No account needed. Data stays in your browser.
          </p>
        </div>

        {/* Back link below card */}
        <p className="text-center mt-5 text-xs">
          <Link
            href="/"
            style={{ color: 'var(--muted3)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted3)'; }}
          >
            ← Back to overview
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
