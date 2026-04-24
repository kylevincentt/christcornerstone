'use client';
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

/**
 * Theme toggle — reads/writes localStorage('cc-theme') and sets
 * data-theme on <html>. A matching inline script in app/layout.tsx
 * sets the attribute before first paint so there is no flash.
 */
export default function ThemeToggle({ variant = 'nav' }: { variant?: 'nav' | 'mobile' }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current =
      (document.documentElement.dataset.theme as Theme | undefined) ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('cc-theme', next);
    } catch {
      /* localStorage may be blocked */
    }
  };

  const isLight = theme === 'light';
  const label = !theme
    ? 'Toggle theme'
    : isLight
      ? 'Switch to dark theme'
      : 'Switch to light theme';

  const baseClass =
    variant === 'mobile'
      ? 'flex items-center justify-center gap-2 font-cinzel text-[0.72rem] tracking-[0.15em] uppercase text-text-light hover:text-gold transition-colors py-2 px-3 rounded-full border'
      : 'flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-110';

  const styles =
    variant === 'mobile'
      ? { border: '1px solid rgba(var(--gold-rgb), 0.2)' }
      : {
          background: 'rgba(var(--gold-rgb), 0.06)',
          border: '1px solid rgba(var(--gold-rgb), 0.2)',
          color: 'var(--gold)',
        };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={baseClass}
      style={styles}
      suppressHydrationWarning
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true" style={{ display: isLight ? 'none' : 'block' }}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" /><path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" /><path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true" style={{ display: isLight ? 'block' : 'none' }}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      {variant === 'mobile' && (
        <span className="ml-1">{isLight ? 'Dark mode' : 'Light mode'}</span>
      )}
    </button>
  );
      }
