'use client';
import { useState } from 'react';

export default function EmailSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'You\'re subscribed! Your first verse arrives tomorrow morning.');
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
      <div className="text-center py-4">
        <div className="text-3xl mb-3">✦</div>
        <p className="font-cormorant text-xl text-cream mb-1">{message}</p>
        <p className="text-text-muted text-sm">Check your inbox for a confirmation email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'flex gap-2' : 'flex flex-col items-center gap-4 max-w-md mx-auto'}>
      {!compact && (
        <input
          type="text"
          placeholder="Your first name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-6 py-3 text-cream font-cormorant text-lg outline-none transition-colors"
          style={{
            background: 'rgba(20,29,53,0.8)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
        />
      )}
      <div className={compact ? 'flex flex-1 gap-2' : 'flex w-full gap-2'}>
        <input
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-full px-6 py-3 text-cream font-cormorant text-lg outline-none transition-colors"
          style={{
            background: 'rgba(20,29,53,0.8)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="font-cinzel text-[0.8rem] font-bold tracking-[0.15em] uppercase text-midnight bg-gold px-6 py-3 rounded-full transition-all hover:bg-gold-light disabled:opacity-60 whitespace-nowrap"
        >
          {status === 'loading' ? '...' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-sm text-center">{message}</p>
      )}
      {!compact && (
        <p className="text-text-muted text-xs text-center">
          No spam. Unsubscribe anytime. Just one verse, delivered quietly.
        </p>
      )}
    </form>
  );
}