'use client';
import { useEffect, useState } from 'react';
import EmailSignup from './EmailSignup';

/**
 * Daily Verse signup card that lives in the Footer (so it appears on every
 * page). Audit L3 flagged the everywhere-presence as diluting urgency, so
 * this wrapper adds an × close button + sessionStorage flag for once-per-
 * session dismiss.
 *
 * Behavior:
 *   - First render of any new tab/window shows the card.
 *   - Clicking × sets sessionStorage('cc-dismiss-subscribe', '1') and hides
 *     the entire card immediately.
 *   - On subsequent page navigations within the same tab, the useEffect
 *     reads the flag on mount and the card stays hidden.
 *   - Closing/reopening the tab resets the flag (sessionStorage is
 *     per-tab/per-session by spec).
 *
 * SSR-safe: the server always renders the card (no access to sessionStorage),
 * the client checks the flag in useEffect. To avoid a flash on dismissed
 * tabs, we use opacity 0 + visibility hidden during the brief window between
 * mount and effect run, then reveal once we've decided.
 */
export default function DailyVerseSignup() {
  // 'unknown' = haven't checked sessionStorage yet (SSR or pre-effect)
  // 'show' = render the card visibly
  // 'hidden' = sessionStorage says dismissed; render nothing
  const [state, setState] = useState<'unknown' | 'show' | 'hidden'>('unknown');

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('cc-dismiss-subscribe') === '1';
      setState(dismissed ? 'hidden' : 'show');
    } catch {
      // sessionStorage blocked (privacy mode, etc.) — just show the card.
      setState('show');
    }
  }, []);

  if (state === 'hidden') return null;

  const handleDismiss = () => {
    try {
      sessionStorage.setItem('cc-dismiss-subscribe', '1');
    } catch {
      // ignore
    }
    setState('hidden');
  };

  return (
    <div
      className="relative rounded-2xl p-10 mb-12 text-center"
      style={{
        background: 'rgba(var(--gold-rgb), 0.04)',
        border: '1px solid rgba(var(--gold-rgb), 0.12)',
        // While we're still figuring out whether to show the card, render it
        // invisibly so the layout is correct but there's no flash.
        opacity: state === 'unknown' ? 0 : 1,
        transition: 'opacity 0.2s ease',
      }}
    >
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss subscribe card for this session"
        title="Dismiss"
        className="absolute top-3 right-3 flex items-center justify-center rounded-full transition-colors duration-200"
        style={{
          width: '36px',
          height: '36px',
          background: 'transparent',
          border: '1px solid rgba(var(--gold-rgb), 0.18)',
          color: 'var(--gold-dim)',
          cursor: 'pointer',
          fontSize: '1rem',
          lineHeight: 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--gold)';
          e.currentTarget.style.borderColor = 'rgba(var(--gold-rgb), 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--gold-dim)';
          e.currentTarget.style.borderColor = 'rgba(var(--gold-rgb), 0.18)';
        }}
      >
        <span aria-hidden="true">×</span>
      </button>

      <span className="section-label block mb-3">Daily Verse &amp; Study Material</span>
      <h3 className="font-cormorant text-3xl font-light text-cream mb-2">
        Begin each day with <em className="not-italic text-gold-light">Scripture</em>
      </h3>
      <p className="text-text-muted mb-8 max-w-md mx-auto leading-relaxed">
        Receive a daily verse and curated study material — delivered quietly to your inbox each morning.
      </p>
      <EmailSignup />
    </div>
  );
}
