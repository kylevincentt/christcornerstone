'use client';

import { useState, useRef } from 'react';

interface Props {
  audioUrl?: string | null;
}

export default function SermonAudioPlayer({ audioUrl }: Props) {
  const [state, setState] = useState<'idle' | 'loading' | 'playing' | 'paused' | 'done'>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Don't render if there's no pre-generated audio
  if (!audioUrl) return null;

  const cleanup = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
  };

  const handleToggle = () => {
    if (state === 'playing' && audioRef.current) {
      audioRef.current.pause();
      setState('paused');
      return;
    }

    if (state === 'paused' && audioRef.current) {
      audioRef.current.play();
      setState('playing');
      return;
    }

    // idle or done — start fresh
    cleanup();
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.oncanplay = () => setState('playing');
    audio.onended = () => { setState('done'); cleanup(); };
    audio.onerror = () => { setState('idle'); cleanup(); };

    audio.play().catch(() => setState('idle'));
    setState('loading');
  };

  const isPlaying = state === 'playing';
  const isLoading = state === 'loading';

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      aria-label={
        isLoading ? 'Loading audio…'
        : isPlaying ? 'Pause audio'
        : state === 'paused' ? 'Resume audio'
        : 'Listen to sermon summary'
      }
      className="flex items-center gap-3 rounded-xl px-5 py-3 transition-all duration-200"
      style={{
        background: isPlaying ? 'rgba(201,168,76,0.12)' : 'rgba(201,168,76,0.06)',
        border: `1px solid ${
          isPlaying ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.2)'
        }`,
        cursor: isLoading ? 'wait' : 'pointer',
        outline: 'none',
        opacity: isLoading ? 0.7 : 1,
      }}
    >
      {/* Icon */}
      <span
        className="flex items-center justify-center rounded-full flex-shrink-0"
        style={{
          width: '34px',
          height: '34px',
          background: isPlaying ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.1)',
          border: '1px solid rgba(201,168,76,0.35)',
          color: 'var(--gold)',
          transition: 'all 0.2s',
        }}
      >
        {isLoading ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: 'tts-spin 0.8s linear infinite' }}>
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
            <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : isPlaying ? (
          <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
            <rect x="0" y="0" width="4" height="14" rx="1.5" />
            <rect x="8" y="0" width="4" height="14" rx="1.5" />
          </svg>
        ) : (
          <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
            <path d="M1 1.5v11l10-5.5L1 1.5z" />
          </svg>
        )}
      </span>

      {/* Label */}
      <span
        className="font-cinzel tracking-[0.18em] uppercase"
        style={{ fontSize: '0.68rem', color: 'var(--gold)', opacity: 0.9 }}
      >
        {isLoading ? 'Loading…'
          : isPlaying ? 'Pause'
          : state === 'paused' ? 'Resume'
          : state === 'done' ? 'Listen Again'
          : 'Listen to Summary'}
      </span>

      {/* Playing pulse bars */}
      {isPlaying && (
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
        </span>
      )}

      <style>{`
        @keyframes tts-bar {
          from { transform: scaleY(0.3); opacity: 0.5; }
          to   { transform: scaleY(1);   opacity: 1; }
        }
        @keyframes tts-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
