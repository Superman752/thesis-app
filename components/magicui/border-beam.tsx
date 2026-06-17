'use client';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}

export function BorderBeam({
  size = 300,
  duration = 8,
  colorFrom = '#FFD700',
  colorTo = '#FFA500',
  borderWidth = 1,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Spinning conic gradient, larger than container so beam travels the perimeter */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${size * 2}px`,
          height: `${size * 2}px`,
          marginTop: `-${size}px`,
          marginLeft: `-${size}px`,
          background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 20deg, ${colorTo} 40deg, transparent 60deg)`,
          animation: `border-beam-spin ${duration}s linear infinite`,
        }}
      />
      {/* Inner mask: covers the card body, leaving only a thin beam on the border */}
      <div
        style={{
          position: 'absolute',
          inset: borderWidth,
          borderRadius: 'inherit',
          background: 'rgb(10, 10, 12)',
        }}
      />
    </div>
  );
}
