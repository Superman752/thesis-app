/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './registry/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#D4A017', hover: '#B8860B' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'DM Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        marquee: 'marquee var(--duration, 40s) infinite linear',
        'marquee-vertical': 'marquee-vertical var(--duration, 40s) linear infinite',
        ripple: 'ripple 3.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        ripple: {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { transform: 'translate(-50%, -50%) scale(0.9)' },
        },
      },
    },
  },
  plugins: [],
};
