'use client';

import { useState, useEffect, useRef } from 'react';

interface Props {
  summary: string;
  additionalContext?: string;
}

export default function SermonAudioPlayer({ summary, additionalContext }: Props) {
  const [supported, setSupported] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    return () => {
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
    };
  }, []);

  const buildText = () => {
    const parts: string[] = [];
    parts.push('Sermon Summary. ' + summary.replace(/\n\n/g, '. '));
    if (additionalContext) {
      parts.push('Going Deeper. ' + additionalContext.replace(/\n\n/g, '. '));
    }
    return parts.join('. ');
  };

  const handleToggle = () => {
    if (!supported) return;

    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    setDone(false);
    const utterance = new SpeechSynthesisUtterance(buildText());
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.onend = () => { setPlaying(false); setDone(true); };
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  };

  if (!supported) return null;

  return (
    <button
      onClick={handleToggle}
      aria-label={playing ? 'Pause audio' : 'Listen to sermon summary'}
      className="flex items-center gap-3 rounded-xl px-5 py-3 transition-all duration-200 group"
      style={{
        background: playing ? 'rgba(201,168,76,0.12)' : 'rgba(201,168,76,0.06)',
        border: `1px solid ${playing ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.2)'}`,
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      {/* Icon */}
      <span
        className="flex items-center justify-center rounded-full flex-shrink-0"
        style={{
          width: '34px',
          height: '34px',
          background: playing ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.1)',
          border: '1px solid rgba(201,168,76,0.35)',
          color: 'var(--gold)',
          fontSize: '0.75rem',
          transition: 'all 0.2s',
        }}
      >
        {playing ? (
          // Pause icon
          <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
            <rect x="0" y="0" width="4" height="14" rx="1.5" />
            <rect x="8" y="0" width="4" height="14" rx="1.5" />
          </svg>
        ) : (
          // Play icon
          <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
            <path d="M1 1.5v11l10-5.5L1 1.5z" />
          </svg>
        )}
      </span>

      {/* Label */}
      <span className="font-cinzel tracking-[0.18em] uppercase" style={{ fontSize: '0.68rem', color: 'var(--gold)', opacity: 0.9 }}>
        {playing ? 'Pause'
          : done ? 'Listen Again'
          : 'Listen to Summary'}
      </span>

      {/* Playing pulse */}
      {playing && (
        <span className="flex items-center gap-0.5 ml-1">
          {[0, 0.15, 0.3].map((delay) => (
            <span
              key={delay}
              style={{
                display: 'inline-block',
                width: '3px',
                height: '14px',
                background: 'rgba(201,168,76,0.7)',
                borderRadius: '2px',
                animation: `tts-bar 0.9s ease-in-out ${delay}s infinite alternate`,
              }}
            />
          ))}
          <style>{`
            @keyframes tts-bar {
              from { transform: scaleY(0.3); opacity: 0.5; }
              to   { transform: scaleY(1);   opacity: 1; }
            }
          `}</style>
        </span>
      )}
    </button>
  );
}
