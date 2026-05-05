'use client';
import { useState, useRef, useCallback, useEffect } from 'react';

interface Props {
  text: string;
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];
const gold = 'rgba(201,168,76,';
const G = (a: number) => `${gold}${a})`;

export default function DiscussionAudioPlayer({ text }: Props) {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'paused' | 'done'>('idle');
  const [progress, setProgress] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(1);
  const textRef = useRef(text);
  const charStartRef = useRef(0);

  useEffect(() => { textRef.current = text; }, [text]);
  useEffect(() => () => { if (typeof window !== 'undefined') window.speechSynthesis?.cancel(); }, []);

  const startFrom = useCallback((charOffset: number, siOverride?: number) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const slice = textRef.current.slice(charOffset);
    if (!slice.trim()) { setPhase('done'); setProgress(100); return; }

    charStartRef.current = charOffset;
    const utt = new SpeechSynthesisUtterance(slice);
    utt.rate = SPEEDS[siOverride ?? speedIdx];

    utt.onboundary = (e) => {
      const absChar = charOffset + (e.charIndex || 0);
      setProgress(Math.min(99, (absChar / textRef.current.length) * 100));
    };
    utt.onend = () => { setPhase('done'); setProgress(100); };
    utt.onerror = (e) => { if ((e as SpeechSynthesisErrorEvent).error !== 'interrupted') setPhase('idle'); };

    window.speechSynthesis.speak(utt);
    setPhase('playing');
  }, [speedIdx]);

  const handlePlayPause = useCallback(() => {
    if (phase === 'playing') {
      window.speechSynthesis.pause();
      setPhase('paused');
    } else if (phase === 'paused') {
      window.speechSynthesis.resume();
      setPhase('playing');
    } else {
      setProgress(0);
      startFrom(0);
    }
  }, [phase, startFrom]);

  const handleSkip = useCallback((chars: number) => {
    const current = Math.floor((progress / 100) * textRef.current.length);
    startFrom(Math.max(0, Math.min(textRef.current.length - 1, current + chars)));
  }, [progress, startFrom]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - left) / width));
    setProgress(pct * 100);
    startFrom(Math.floor(pct * textRef.current.length));
  }, [startFrom]);

  const cycleSpeed = useCallback(() => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    if (phase === 'playing') {
      const current = Math.floor((progress / 100) * textRef.current.length);
      startFrom(current, next);
    }
  }, [speedIdx, phase, progress, startFrom]);

  const isPlaying = phase === 'playing';
  const isActive = phase === 'playing' || phase === 'paused';
  const speed = SPEEDS[speedIdx];
  const pct = Math.round(progress);

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Skip back */}
          <button onClick={() => handleSkip(-500)} title="Back" style={iconBtn}>
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

          {/* Skip forward */}
          <button onClick={() => handleSkip(500)} title="Forward" style={iconBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-.49-4.5" />
              <text x="12" y="15" textAnchor="middle" fontSize="7" fill="currentColor" stroke="none" fontFamily="sans-serif" fontWeight="600">30</text>
            </svg>
          </button>

          <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: G(0.65), marginLeft: '4px', flex: 1, letterSpacing: '0.03em' }}>
            {pct}%
            <span style={{ opacity: 0.45 }}> read</span>
          </span>

          {isPlaying && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              {[0, 0.15, 0.3].map((d) => (
                <span key={d} style={{ display: 'inline-block', width: '3px', height: '13px', background: G(0.6), borderRadius: '2px', animation: `tts-bar 0.9s ease-in-out ${d}s infinite alternate` }} />
              ))}
            </span>
          )}

          <button onClick={cycleSpeed} style={speedBtn} title="Change speed">
            {speed === 1 ? '1×' : `${speed}×`}
          </button>
        </div>

        {/* Progress bar */}
        <div
          onClick={handleSeek}
          role="slider"
          aria-label="Seek"
          aria-valuenow={pct}
          style={{ position: 'relative', height: '5px', background: G(0.12), borderRadius: '3px', cursor: 'pointer' }}
        >
          <div style={{ position: 'absolute', inset: '0 auto 0 0', width: `${pct}%`, background: G(0.75), borderRadius: '3px' }} />
          <div style={{ position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%, -50%)', width: '11px', height: '11px', borderRadius: '50%', background: 'var(--gold)', boxShadow: `0 0 0 2px ${G(0.25)}` }} />
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

  return (
    <button
      onClick={handlePlayPause}
      aria-label={phase === 'done' ? 'Listen again' : 'Listen to summary and outline'}
      className="flex items-center gap-3 rounded-xl px-5 py-3 transition-all duration-200"
      style={{ background: G(0.06), border: `1px solid ${G(0.2)}`, cursor: 'pointer', outline: 'none' }}
    >
      <span
        className="flex items-center justify-center rounded-full flex-shrink-0"
        style={{ width: '34px', height: '34px', background: G(0.1), border: `1px solid ${G(0.35)}`, color: 'var(--gold)' }}
      >
        {phase === 'done' ? (
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
      <span className="font-cinzel tracking-[0.18em] uppercase" style={{ fontSize: '0.68rem', color: 'var(--gold)', opacity: 0.9 }}>
        {phase === 'done' ? 'Listen Again' : 'Listen to Summary'}
      </span>
    </button>
  );
}

const iconBtn: React.CSSProperties = {
  background: 'none', border: 'none', color: 'rgba(201,168,76,0.75)',
  cursor: 'pointer', padding: '4px', borderRadius: '6px',
  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.15s',
};
const playBtn: React.CSSProperties = {
  width: '38px', height: '38px', borderRadius: '50%',
  background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)',
  color: 'var(--gold)', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0, transition: 'background 0.15s',
};
const speedBtn: React.CSSProperties = {
  background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.22)',
  borderRadius: '6px', color: 'rgba(201,168,76,0.8)', cursor: 'pointer',
  fontFamily: 'var(--font-cinzel), serif', fontSize: '0.65rem',
  letterSpacing: '0.08em', padding: '3px 7px',
  transition: 'background 0.15s', whiteSpace: 'nowrap',
};
