'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface Props {
  text: string;
  label?: string;
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

function fmt(s: number) {
  if (!s || !isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

const gold = 'rgba(201,168,76,';
const G = (a: number) => `${gold}${a})`;

export default function DiscussionAudioPlayer({ text, label = 'Listen to Summary' }: Props) {
  const [phase, setPhase] = useState<'idle' | 'loading' | 'playing' | 'paused' | 'done'>('idle');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  const speedIdxRef = useRef(1);

  // Keep speedIdxRef in sync so teardown/playBlobUrl always sees current speed
  useEffect(() => { speedIdxRef.current = speedIdx; }, [speedIdx]);

  useEffect(() => () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ''; }
    if (blobUrlRef.current) { URL.revokeObjectURL(blobUrlRef.current); }
  }, []);

  const speed = SPEEDS[speedIdx];
  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const teardown = useCallback(() => {
    const a = audioRef.current;
    if (a) { a.pause(); a.src = ''; audioRef.current = null; }
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const playBlobUrl = useCallback((url: string, startAt = 0) => {
    teardown();
    const a = new Audio(url);
    a.playbackRate = SPEEDS[speedIdxRef.current];
    if (startAt > 0) a.currentTime = startAt;
    audioRef.current = a;
    a.addEventListener('loadedmetadata', () => setDuration(a.duration));
    a.addEventListener('timeupdate', () => setCurrentTime(a.currentTime));
    a.addEventListener('canplay', () => setPhase('playing'));
    a.addEventListener('ended', () => { setPhase('done'); setCurrentTime(0); setDuration(0); audioRef.current = null; });
    a.addEventListener('error', () => { teardown(); setPhase('idle'); });
    a.play().catch(() => { teardown(); setPhase('idle'); });
  }, [teardown]);

  const startAudio = useCallback(async () => {
    if (blobUrlRef.current) {
      setPhase('loading');
      playBlobUrl(blobUrlRef.current);
      return;
    }
    setPhase('loading');
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error('TTS failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;
      playBlobUrl(url);
    } catch {
      setPhase('idle');
    }
  }, [text, playBlobUrl]);

  const handlePlayPause = useCallback(() => {
    if (phase === 'playing') { audioRef.current?.pause(); setPhase('paused'); return; }
    if (phase === 'paused') { audioRef.current?.play(); setPhase('playing'); return; }
    startAudio();
  }, [phase, startAudio]);

  const handleSkip = useCallback((secs: number) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    a.currentTime = Math.max(0, Math.min(duration, a.currentTime + secs));
  }, [duration]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    a.currentTime = Math.max(0, Math.min(duration, ((e.clientX - left) / width) * duration));
  }, [duration]);

  const cycleSpeed = useCallback(() => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    speedIdxRef.current = next;
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[next];
  }, [speedIdx]);

  const isPlaying = phase === 'playing';
  const isLoading = phase === 'loading';
  const isActive = phase === 'playing' || phase === 'paused';

  // ── EXPANDED PLAYER (playing / paused) ──────────────────────────────
  if (isActive) {
    return (
      <div
        style={{
          flexBasis: '100%',
          background: G(0.06),
          border: `1px solid ${G(0.28)}`,
          borderRadius: '14px',
          padding: '14px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Controls row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Skip -15 */}
          <button onClick={() => handleSkip(-15)} title="Back 15 seconds" style={iconBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
              <text x="12" y="15" textAnchor="middle" fontSize="7" fill="currentColor" stroke="none" fontFamily="sans-serif" fontWeight="600">15</text>
            </svg>
          </button>

          {/* Play / Pause */}
          <button onClick={handlePlayPause} style={playBtn}>
            {isPlaying ? (
              <svg width="13" height="15" viewBox="0 0 12 14" fill="currentColor">
                <rect x="0" y="0" width="4" height="14" rx="1.5" />
                <rect x="8" y="0" width="4" height="14" rx="1.5" />
              </svg>
            ) : (
              <svg width="13" height="15" viewBox="0 0 12 14" fill="currentColor">
                <path d="M1 1.5v11l10-5.5L1 1.5z" />
              </svg>
            )}
          </button>

          {/* Skip +30 */}
          <button onClick={() => handleSkip(30)} title="Forward 30 seconds" style={iconBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-.49-4.5" />
              <text x="12" y="15" textAnchor="middle" fontSize="7" fill="currentColor" stroke="none" fontFamily="sans-serif" fontWeight="600">30</text>
            </svg>
          </button>

          {/* Time */}
          <span style={{
            fontSize: '0.7rem',
            fontFamily: 'monospace',
            color: G(0.65),
            marginLeft: '4px',
            flex: 1,
            letterSpacing: '0.03em',
          }}>
            {fmt(currentTime)}
            <span style={{ opacity: 0.45 }}> / {fmt(duration)}</span>
          </span>

          {/* Playing animation bars */}
          {isPlaying && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              {[0, 0.15, 0.3].map((d) => (
                <span key={d} style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '13px',
                  background: G(0.6),
                  borderRadius: '2px',
                  animation: `tts-bar 0.9s ease-in-out ${d}s infinite alternate`,
                }} />
              ))}
            </span>
          )}

          {/* Speed */}
          <button onClick={cycleSpeed} style={speedBtn} title="Change playback speed">
            {speed === 1 ? '1×' : `${speed}×`}
          </button>
        </div>

        {/* Progress bar */}
        <div
          onClick={handleSeek}
          role="slider"
          aria-label="Seek audio"
          aria-valuenow={Math.round(pct)}
          style={{
            position: 'relative',
            height: '5px',
            background: G(0.12),
            borderRadius: '3px',
            cursor: 'pointer',
          }}
        >
          <div style={{
            position: 'absolute',
            inset: '0 auto 0 0',
            width: `${pct}%`,
            background: G(0.75),
            borderRadius: '3px',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: `${pct}%`,
            transform: 'translate(-50%, -50%)',
            width: '11px',
            height: '11px',
            borderRadius: '50%',
            background: 'var(--gold)',
            boxShadow: `0 0 0 2px ${G(0.25)}`,
          }} />
        </div>

        <style>{`
          @keyframes tts-bar {
            from { transform: scaleY(0.3); opacity: 0.5; }
            to   { transform: scaleY(1);   opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // ── COMPACT BUTTON (idle / loading / done) ───────────────────────────
  return (
    <button
      onClick={handlePlayPause}
      disabled={isLoading}
      aria-label={
        isLoading ? 'Loading audio…'
        : phase === 'done' ? 'Listen again'
        : label
      }
      className="flex items-center gap-3 rounded-xl px-5 py-3 transition-all duration-200"
      style={{
        background: G(0.06),
        border: `1px solid ${G(0.2)}`,
        cursor: isLoading ? 'wait' : 'pointer',
        outline: 'none',
        opacity: isLoading ? 0.7 : 1,
      }}
    >
      <span
        className="flex items-center justify-center rounded-full flex-shrink-0"
        style={{
          width: '34px',
          height: '34px',
          background: G(0.1),
          border: `1px solid ${G(0.35)}`,
          color: 'var(--gold)',
          transition: 'all 0.2s',
        }}
      >
        {isLoading ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: 'tts-spin 0.8s linear infinite' }}>
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
            <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : phase === 'done' ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
          </svg>
        ) : (
          <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
            <path d="M1 1.5v11l10-5.5L1 1.5z" />
          </svg>
        )}
      </span>
      <span
        className="font-cinzel tracking-[0.18em] uppercase"
        style={{ fontSize: '0.68rem', color: 'var(--gold)', opacity: 0.9 }}
      >
        {isLoading ? 'Loading…' : phase === 'done' ? 'Listen Again' : label}
      </span>
      <style>{`
        @keyframes tts-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}

// ── Shared button styles ─────────────────────────────────────────────
const iconBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'rgba(201,168,76,0.75)',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'color 0.15s',
};

const playBtn: React.CSSProperties = {
  width: '38px',
  height: '38px',
  borderRadius: '50%',
  background: 'rgba(201,168,76,0.15)',
  border: '1px solid rgba(201,168,76,0.4)',
  color: 'var(--gold)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: 'background 0.15s',
};

const speedBtn: React.CSSProperties = {
  background: 'rgba(201,168,76,0.08)',
  border: '1px solid rgba(201,168,76,0.22)',
  borderRadius: '6px',
  color: 'rgba(201,168,76,0.8)',
  cursor: 'pointer',
  fontFamily: 'var(--font-cinzel), serif',
  fontSize: '0.65rem',
  letterSpacing: '0.08em',
  padding: '3px 7px',
  transition: 'background 0.15s',
  whiteSpace: 'nowrap',
};
