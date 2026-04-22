import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0a0e1a',
        'deep-navy': '#0f1628',
        navy: '#141d35',
        gold: '#c9a84c',
        'gold-light': '#e2c47a',
        'gold-dim': '#8a6e2f',
        cream: '#f5efe0',
        'cream-dark': '#e8dfc8',
        'text-light': '#d4c9b0',
        'text-muted': '#7a7060',
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