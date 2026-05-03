'use client';

import { useState, useRef, useCallback } from 'react';

interface Props {
  summary: string;
  additionalContext?: string;
}

export default function SermonAudioPlayer({ summary, additionalContext }: Props) {
  const [state, setState] = useState<'idle' | 'loading' | 'playing' | 'paused' | 'done'>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const buildText = useCallback(() => {
    const parts: string[] = [];
    parts.push('Sermon Summary. ' + summary.replace(/\n\n/g, '. '));
    if (additionalContext) {
      parts.push('Going Deeper. ' + additionalContext.replace(/\n\n/g, '. '));
    }
    return parts.join('. ');
  }, [summary, additionalContext]);

  const cleanupAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  const handleToggle = async () => {
    // Pause if currently playing
    if (state === 'playing' && audioRef.current) {
      audioRef.current.pause();
      setState('paused');
      return;
    }

    // Resume if paused
    if (state === 'paused' && audioRef.current) {
      audioRef.current.play();
      setState('playing');
      return;
    }

    // Fresh fetch (idle or done)
    cleanupAudio();
    setState('loading');

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: buildText() }),
      });

      if (!res.ok) {
        console.error('TTS fetch failed:', res.status);
        setState('idle');
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setState('done');
        cleanupAudio();
      };
      audio.onerror = () => {
        setState('idle');
        cleanupAudio();
      };

      await audio.play();
      setState('playing');
    } catch (err) {
      console.error('TTS error:', err);
      setState('idle');
      cleanupAudio();
    }
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
          fontSize: '0.75rem',
          transition: 'all 0.2s',
        }}
      >
        {isLoading ? (
          // Spinner
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: 'tts-spin 0.8s linear infinite' }}>
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
            <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : isPlaying ? (
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
