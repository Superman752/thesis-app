'use client';

import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
  durationMs?: number;
}

export function Marquee({
  children,
  className,
  pauseOnHover = false,
  reverse = false,
  durationMs = 30000,
}: MarqueeProps) {
  const animationName = reverse ? 'marquee-reverse' : 'marquee';

  return (
    <div
      className={cn('relative flex overflow-hidden', className)}
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `${animationName} ${durationMs}ms linear infinite`,
          animationPlayState: 'running',
          gap: 48,
        }}
        className={cn(pauseOnHover && 'hover:[animation-play-state:paused]')}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
