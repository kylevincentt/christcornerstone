'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route error boundary caught:', error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-8"
      style={{ paddingTop: '8rem', paddingBottom: '4rem' }}
    >
      <span className="section-label">Something went wrong</span>
      <h1
        className="font-cormorant font-light text-cream mt-4 mb-6"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}
      >
        An unexpected error <em className="not-italic text-gold-light">occurred.</em>
      </h1>
      <p className="font-cormorant text-text-light max-w-xl mx-auto leading-relaxed mb-8" style={{ fontSize: '1.15rem' }}>
        We&apos;re sorry — something broke on our end. You can try again, or return home.
      </p>
      {error?.digest && (
        <p className="font-cinzel text-gold-dim tracking-[0.2em] uppercase mb-8" style={{ fontSize: '0.7rem' }}>
          Ref: {error.digest}
        </p>
      )}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          type="button"
          onClick={reset}
          className="font-cinzel font-bold tracking-[0.15em] uppercase text-midnight bg-gold px-8 py-3 rounded-full transition-all hover:bg-gold-light cursor-pointer border-none"
          style={{ fontSize: '0.8rem' }}
        >
          Try Again
        </button>
        <Link
          href="/"
          className="font-cinzel font-bold tracking-[0.15em] uppercase text-gold bg-transparent px-8 py-3 rounded-full no-underline transition-all hover:bg-[rgba(201,168,76,0.08)]"
          style={{ fontSize: '0.8rem', border: '1px solid rgba(201,168,76,0.4)' }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

