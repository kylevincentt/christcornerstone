import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Colors reference CSS custom properties so they follow the active theme
      // (see app/globals.css :root for dark, [data-theme="light"] for light).
      colors: {
        midnight: 'var(--midnight)',
        'deep-navy': 'var(--deep-navy)',
        navy: 'var(--navy)',
        gold: 'var(--gold)',
        'gold-light': 'var(--gold-light)',
        'gold-dim': 'var(--gold-dim)',
        cream: 'var(--cream)',
        'cream-dark': 'var(--cream-dark)',
        'text-light': 'var(--text-light)',
        'text-muted': 'var(--text-muted)',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        lato: ['Lato', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-down': 'fadeDown 1s ease forwards',
        'ray-pulse': 'rayPulse 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          from: { opacity: '0', transform: 'translateY(-16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        rayPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
          '50%': { opacity: '0.7', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
