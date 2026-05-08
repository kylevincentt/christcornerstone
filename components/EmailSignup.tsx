'use client';
import { useState } from 'react';

// RFC 5322-ish simplified email regex — good enough for UX gating.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, name: name.trim() || undefined }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; error?: string };

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || "You're subscribed! Your first verse arrives tomorrow morning.");
        setEmail('');
        setName('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Unable to connect. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-4" role="status" aria-live="polite">
        <div className="text-3xl mb-3" aria-hidden="true">✦</div>
        <p className="font-cormorant text-xl text-cream mb-1">{message}</p>
        <p className="text-text-muted text-sm">Check your inbox for a confirmation email.</p>
      </div>
    );
  }

  // Common input class — picks up theme-aware background, border, text,
  // and placeholder colors from .subscribe-input in app/globals.css.
  // (Audit C4: previously these were hardcoded for dark mode only.)
  const inputClass =
    'subscribe-input w-full rounded-full px-6 py-3 font-cormorant text-lg outline-none';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={compact ? 'flex gap-2' : 'flex flex-col items-center gap-4 max-w-md mx-auto'}
    >
      {!compact && (
        <>
          <label htmlFor="signup-name" className="sr-only">Your first name (optional)</label>
          <input
            id="signup-name"
            type="text"
            placeholder="Your first name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="given-name"
            className={inputClass}
          />
        </>
      )}
      <div className={compact ? 'flex flex-1 gap-2' : 'flex w-full gap-2'}>
        <label htmlFor="signup-email" className="sr-only">Your email address</label>
        <input
          id="signup-email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={status === 'error' ? 'signup-error' : undefined}
          className={`${inputClass} flex-1 min-w-0`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="font-cinzel text-[0.8rem] font-bold tracking-[0.15em] uppercase text-midnight bg-gold px-6 py-3 rounded-full transition-all hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? '…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p id="signup-error" role="alert" className="subscribe-error text-sm text-center">
          {message}
        </p>
      )}
      {!compact && (
        <p className="text-text-muted text-xs text-center">
          No spam. Unsubscribe anytime. Just one verse, delivered quietly.
        </p>
      )}
    </form>
  );
}
