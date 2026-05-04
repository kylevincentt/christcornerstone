'use client';

import { useState } from 'react';

interface Props {
  references: string[];
}

export default function ScriptureRefsSection({ references }: Props) {
  const [activeRef, setActiveRef] = useState<string | null>(null);
  const [verseCache, setVerseCache] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleClick(ref: string) {
    if (activeRef === ref) {
      setActiveRef(null);
      return;
    }
    setActiveRef(ref);
    if (verseCache[ref]) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://bible-api.com/${encodeURIComponent(ref)}?translation=kjv`
      );
      const data = await res.json();
      let text = '';
      if (data.verses && data.verses.length > 0) {
        text = data.verses
          .map((v: { verse: number; text: string }) => `[${v.verse}] ${v.text.trim()}`)
          .join(' ');
      } else if (data.text) {
        text = data.text.trim();
      } else {
        text = 'Verse text unavailable.';
      }
      setVerseCache((prev) => ({ ...prev, [ref]: text }));
    } catch {
      setVerseCache((prev) => ({ ...prev, [ref]: 'Could not load verse.' }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {references.map((ref) => (
          <button
            key={ref}
            onClick={() => handleClick(ref)}
            className="font-cinzel tracking-[0.15em] uppercase rounded-full px-4 py-2 transition-all duration-200"
            style={{
              fontSize: '0.67rem',
              border: `1px solid rgba(var(--gold-rgb), ${activeRef === ref ? '0.55' : '0.25'})`,
              background:
                activeRef === ref
                  ? 'rgba(var(--gold-rgb), 0.12)'
                  : 'rgba(var(--gold-rgb), 0.05)',
              color: 'var(--cream)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            {ref}
            <svg
              width="8"
              height="8"
              viewBox="0 0 10 10"
              fill="currentColor"
              style={{
                opacity: 0.5,
                transform: activeRef === ref ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s ease',
                flexShrink: 0,
              }}
            >
              <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>

      {activeRef && (
        <div
          className="rounded-xl px-6 py-5 mt-3"
          style={{
            background: 'rgba(var(--gold-rgb), 0.04)',
            border: '1px solid rgba(var(--gold-rgb), 0.15)',
          }}
        >
          <p
            className="font-cinzel mb-3"
            style={{
              fontSize: '0.65rem',
              color: 'var(--gold)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            {activeRef}
          </p>
          {loading && !verseCache[activeRef] ? (
            <p
              className="font-lato"
              style={{ fontSize: '0.9rem', color: 'var(--text-light)', opacity: 0.6 }}
            >
              Loading…
            </p>
          ) : (
            <p
              className="font-lato leading-relaxed"
              style={{ fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: 1.8 }}
            >
              {verseCache[activeRef]}
            </p>
          )}
        </div>
      )}
    </>
  );
}
