'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const profile = localStorage.getItem('thesis_profile');
    if (!profile) router.push('/login');
  }, [router]);

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navigation />
      {/* Main content , offset for sidebar on desktop, bottom nav on mobile */}
      <main className="flex-1 min-w-0 md:ml-64 pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
}
