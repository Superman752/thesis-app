'use client';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function ScoreBadge({ score, size = 'md' }: ScoreBadgeProps) {
  const color = score >= 7 ? 'var(--green)' : score >= 4 ? 'var(--amber)' : 'var(--red)';
  const bg = score >= 7 ? 'var(--green-dim)' : score >= 4 ? 'var(--amber-dim)' : 'var(--red-dim)';

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={`font-mono font-medium rounded ${sizeClasses[size]}`}
      style={{ color, background: bg, border: `1px solid ${color}22` }}
    >
      {score.toFixed(1)}
    </span>
  );
}
