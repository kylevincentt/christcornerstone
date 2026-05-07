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

/**
 * Estimate playback duration of a text spoken by SpeechSynthesis.
 * ~165 words/minute at rate=1; scale inversely with playbackRate.
 * (Used only when ElevenLabs is unavailable and we fall back to the browser
 * speech engine, which exposes neither duration nor precise time.)
 */
function estimateDuration(text: string, rate: number): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return (words / 165) * 60 / Math.max(0.1, rate);
}

type Mode = 'native' | 'browser';

export default function DiscussionAudioPlayer({ text, label = 'Listen to Summary' }: Props) {
  const [phase, setPhase] = useState<'idle' | 'loading' | 'playing' | 'paused' | 'done'>('idle');
  const [mode, setMode] = useState<Mode>('native');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(1);

  // Native (ElevenLabs MP3) state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  // Browser SpeechSynthesis state
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const browserCharOffsetRef = useRef(0); // chars already consumed (for skip)
  const browserStartTimeRef = useRef(0);  // ms since epoch when current utterance started
  const browserAccumRef = useRef(0);      // seconds accumulated from finished sub-utterances
  const browserTickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const browserDurationRef = useRef(0);

  const speedIdxRef = useRef(1);
  useEffect(() => { speedIdxRef.current = speedIdx; }, [speedIdx]);

  // ── Cleanup on unmount ────────────────────────────────────────────────
  useEffect(() => () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ''; }
    if (blobUrlRef.current) { URL.revokeObjectURL(blobUrlRef.current); }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (browserTickRef.current) clearInterval(browserTickRef.current);
  }, []);

  const speed = SPEEDS[speedIdx];
  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  // ── Native (ElevenLabs) playback ──────────────────────────────────────
  const teardownNative = useCallback(() => {
    const a = audioRef.current;
    if (a) { a.pause(); a.src = ''; audioRef.current = null; }
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const playBlobUrl = useCallback((url: string) => {
    teardownNative();
    const a = new Audio(url);
    a.playbackRate = SPEEDS[speedIdxRef.current];
    audioRef.current = a;
    a.addEventListener('loadedmetadata', () => setDuration(a.duration));
    a.addEventListener('timeupdate', () => setCurrentTime(a.currentTime));
    a.addEventListener('canplay', () => setPhase('playing'));
    a.addEventListener('ended', () => {
      setPhase('done'); setCurrentTime(0); setDuration(0); audioRef.current = null;
    });
    a.addEventListener('error', () => { teardownNative(); setPhase('idle'); });
    a.play().catch(() => { teardownNative(); setPhase('idle'); });
  }, [teardownNative]);

  // ── Browser SpeechSynthesis playback (fallback) ──────────────────────
  const teardownBrowser = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (browserTickRef.current) {
      clearInterval(browserTickRef.current);
      browserTickRef.current = null;
    }
    utteranceRef.current = null;
    browserCharOffsetRef.current = 0;
    browserStartTimeRef.current = 0;
    browserAccumRef.current = 0;
    browserDurationRef.current = 0;
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const startBrowserUtterance = useCallback((from: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    synth.cancel();

    const remainingText = text.slice(from);
    if (!remainingText.trim()) {
      teardownBrowser();
      setPhase('done');
      return;
    }

    const utt = new SpeechSynthesisUtterance(remainingText);
    utt.rate = SPEEDS[speedIdxRef.current];
    // Pick a slightly more natural English voice if available
    try {
      const voices = synth.getVoices();
      const preferred =
        voices.find((v) => /en[-_]US/i.test(v.lang) && /Samantha|Google US English|Microsoft Aria/i.test(v.name)) ||
        voices.find((v) => /en[-_]US/i.test(v.lang)) ||
        voices.find((v) => /^en/i.test(v.lang));
      if (preferred) utt.voice = preferred;
    } catch { /* getVoices not ready — fine, default voice still works */ }

    utt.onend = () => {
      // Either finished naturally, or cancel() was called for skip/teardown.
      // Distinguish by whether utteranceRef is still us.
      if (utteranceRef.current !== utt) return;
      teardownBrowser();
      setPhase('done');
    };
    utt.onerror = () => {
      if (utteranceRef.current !== utt) return;
      teardownBrowser();
      setPhase('idle');
    };

    utteranceRef.current = utt;
    browserCharOffsetRef.current = from;
    browserStartTimeRef.current = Date.now();

    setPhase('playing');
    synth.speak(utt);

    // Estimate total duration relative to FULL text and update display via tick.
    if (browserTickRef.current) clearInterval(browserTickRef.current);
    browserDurationRef.current = estimateDuration(text, SPEEDS[speedIdxRef.current]);
    setDuration(browserDurationRef.current);

    browserTickRef.current = setInterval(() => {
      const elapsedSinceStart = (Date.now() - browserStartTimeRef.current) / 1000;
      const total = browserAccumRef.current + elapsedSinceStart;
      setCurrentTime(Math.min(total, browserDurationRef.current));
    }, 250);
  }, [text, teardownBrowser]);

  const startBrowserFromBeginning = useCallback(() => {
    browserAccumRef.current = 0;
    setMode('browser');
    startBrowserUtterance(0);
  }, [startBrowserUtterance]);

  // ── Top-level start (try ElevenLabs, fall back to browser TTS) ────────
  const startAudio = useCallback(async () => {
    if (blobUrlRef.current) {
      setPhase('loading');
      setMode('native');
      playBlobUrl(blobUrlRef.current);
      return;
    }
    setPhase('loading');
    setMode('native');
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error('TTS HTTP ' + res.status);
      const ct = res.headers.get('content-type') || '';
      if (!ct.startsWith('audio/')) throw new Error('TTS returned non-audio: ' + ct);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;
      playBlobUrl(url);
      return;
    } catch (err) {
      // ElevenLabs unavailable (quota exceeded, network error, missing config).
      // Fall back to the browser's built-in speech engine so the button still
      // does something useful.
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        startBrowserFromBeginning();
        return;
      }
      console.warn('[DiscussionAudioPlayer] no audio backend available', err);
      setPhase('idle');
    }
  }, [text, playBlobUrl, startBrowserFromBeginning]);

  // ── Play / Pause ──────────────────────────────────────────────────────
  const handlePlayPause = useCallback(() => {
    if (phase === 'playing') {
      if (mode === 'native') {
        audioRef.current?.pause();
      } else {
        if (browserTickRef.current) clearInterval(browserTickRef.current);
        // Snapshot accumulated time before pausing
        browserAccumRef.current += (Date.now() - browserStartTimeRef.current) / 1000;
        window.speechSynthesis?.pause();
      }
      setPhase('paused');
      return;
    }
    if (phase === 'paused') {
      if (mode === 'native') {
        audioRef.current?.play();
      } else if (window.speechSynthesis) {
        window.speechSynthesis.resume();
        browserStartTimeRef.current = Date.now();
        if (browserTickRef.current) clearInterval(browserTickRef.current);
        browserTickRef.current = setInterval(() => {
          const elapsedSinceStart = (Date.now() - browserStartTimeRef.current) / 1000;
          const total = browserAccumRef.current + elapsedSinceStart;
          setCurrentTime(Math.min(total, browserDurationRef.current));
        }, 250);
      }
      setPhase('playing');
      return;
    }
    startAudio();
  }, [phase, mode, startAudio]);

  // ── Skip ──────────────────────────────────────────────────────────────
  const handleSkip = useCallback((secs: number) => {
    if (mode === 'native') {
      const a = audioRef.current;
      if (!a || !duration) return;
      a.currentTime = Math.max(0, Math.min(duration, a.currentTime + secs));
      return;
    }
    // Browser TTS: re-start from a new char offset proportional to seek
    if (browserDurationRef.current <= 0) return;
    const targetSecs = Math.max(0, Math.min(browserDurationRef.current, currentTime + secs));
    const fraction = targetSecs / browserDurationRef.current;
    const targetChar = Math.max(0, Math.min(text.length - 1, Math.floor(fraction * text.length)));
    // Snap to nearest space so we don't restart mid-word
    let snap = targetChar;
    while (snap > 0 && /\S/.test(text[snap - 1])) snap--;
    browserAccumRef.current = targetSecs;
    startBrowserUtterance(snap);
  }, [mode, duration, currentTime, text, startBrowserUtterance]);

  // ── Seek (progress bar click) ────────────────────────────────────────
  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - left) / width));
    if (mode === 'native') {
      const a = audioRef.current;
      if (!a) return;
      a.currentTime = fraction * duration;
      return;
    }
    const targetSecs = fraction * browserDurationRef.current;
    const targetChar = Math.max(0, Math.min(text.length - 1, Math.floor(fraction * text.length)));
    let snap = targetChar;
    while (snap > 0 && /\S/.test(text[snap - 1])) snap--;
    browserAccumRef.current = targetSecs;
    startBrowserUtterance(snap);
  }, [duration, mode, text, startBrowserUtterance]);

  // ── Speed cycle ──────────────────────────────────────────────────────
  const cycleSpeed = useCallback(() => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    speedIdxRef.current = next;
    if (mode === 'native') {
      if (audioRef.current) audioRef.current.playbackRate = SPEEDS[next];
    } else {
      // SpeechSynthesisUtterance.rate is read at speak() time. Restart from current position.
      if (phase === 'playing' || phase === 'paused') {
        // Snapshot current time before restart so we resume in place
        const elapsedSinceStart = phase === 'playing' ? (Date.now() - browserStartTimeRef.current) / 1000 : 0;
        const totalSecs = browserAccumRef.current + elapsedSinceStart;
        const fraction = browserDurationRef.current > 0 ? totalSecs / browserDurationRef.current : 0;
        const targetChar = Math.max(0, Math.min(text.length - 1, Math.floor(fraction * text.length)));
        let snap = targetChar;
        while (snap > 0 && /\S/.test(text[snap - 1])) snap--;
        browserAccumRef.current = totalSecs;
        startBrowserUtterance(snap);
      }
    }
  }, [speedIdx, mode, phase, text, startBrowserUtterance]);

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
            {mode === 'browser' && (
              <span style={{ opacity: 0.55, marginLeft: 8, fontSize: '0.62rem', letterSpacing: '0.05em' }}>
                ~ browser voice
              </span>
            )}
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
