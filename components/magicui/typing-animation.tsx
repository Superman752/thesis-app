'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export function TypingAnimation({
  children,
  className,
  duration = 40,
  delay = 0,
}: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;

    const startTyping = () => {
      interval = setInterval(() => {
        if (i < children.length) {
          setDisplayed(children.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, duration);
    };

    const timeout = setTimeout(startTyping, delay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [children, duration, delay]);

  return (
    <span className={cn(className)}>
      {displayed}
      {!done && (
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '0.85em',
            background: 'currentColor',
            marginLeft: 2,
            verticalAlign: 'text-bottom',
            animation: 'cursor-blink 0.7s step-end infinite',
          }}
        />
      )}
    </span>
  );
}
