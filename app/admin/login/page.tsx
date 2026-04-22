'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      setError('Incorrect password. Try again.');
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#06080f' }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-cinzel text-gold text-xl tracking-[0.2em] mb-2">✦ CHRISTCORNERSTONE</p>
          <p className="font-cinzel text-[0.72rem] tracking-[0.3em] uppercase text-gold-dim">Admin Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="w-full rounded-xl px-5 py-4 text-cream font-cormorant text-lg outline-none transition-colors"
            style={{
              background: 'var(--deep-navy)',
              border: '1px solid rgba(201,168,76,0.2)',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="font-cinzel font-bold tracking-[0.15em] uppercase text-midnight bg-gold py-4 rounded-xl transition-all hover:bg-gold-light disabled:opacity-60"
            style={{ fontSize: '0.85rem' }}
          >
            {loading ? 'Signing in…' : 'Enter Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}