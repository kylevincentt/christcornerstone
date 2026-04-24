import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for could not be found.',
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-8 relative overflow-hidden"
      style={{ paddingTop: '8rem', paddingBottom: '4rem' }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
      />
      <div className="relative">
        <span className="section-label">404 — Page Not Found</span>
        <h1
          className="font-cormorant font-light text-cream mt-4 mb-6"
          style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 1.1 }}
        >
          Lost, but not <em className="not-italic text-gold-light">forsaken.</em>
        </h1>
        <p className="font-cormorant text-text-light max-w-xl mx-auto leading-relaxed mb-10" style={{ fontSize: '1.2rem' }}>
          The page you were looking for isn&apos;t here. But every path can lead back home.
        </p>
        <blockquote
          className="font-cormorant italic text-text-muted max-w-lg mx-auto mb-10"
          style={{ fontSize: '1.1rem' }}
        >
          &ldquo;I am the way, and the truth, and the life.&rdquo;
          <footer className="font-cinzel text-gold-dim tracking-[0.25em] uppercase mt-2 not-italic" style={{ fontSize: '0.7rem' }}>
            — John 14:6
          </footer>
        </blockquote>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="font-cinzel font-bold tracking-[0.15em] uppercase text-midnight bg-gold px-8 py-3 rounded-full no-underline transition-all hover:bg-gold-light"
            style={{ fontSize: '0.8rem' }}
          >
            Return Home
          </Link>
          <Link
            href="/start-here"
            className="font-cinzel font-bold tracking-[0.15em] uppercase text-gold bg-transparent px-8 py-3 rounded-full no-underline transition-all hover:bg-[rgba(201,168,76,0.08)]"
            style={{ fontSize: '0.8rem', border: '1px solid rgba(201,168,76,0.4)' }}
          >
            Start Here
          </Link>
        </div>
      </div>
    </div>
  );
}

