'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsRef.current) return;
    const container = starsRef.current;
    container.innerHTML = '';
    for (let i = 0; i < 60; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.cssText = `
        position: absolute;
        width: 2px; height: 2px;
        background: #e2c47a;
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: twinkle ${3 + Math.random() * 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 4}s;
        opacity: 0;
        --o: ${0.3 + Math.random() * 0.7};
      `;
      container.appendChild(star);
    }
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-center relative px-8 overflow-hidden"
      style={{ paddingTop: '7rem', paddingBottom: '3rem' }}
    >
      {/* Stars */}
      <div ref={starsRef} className="absolute inset-0 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Light rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        {[-35, -20, -8, 0, 8, 20, 35].map((deg, i) => (
          <div
            key={i}
            className="absolute top-0 left-1/2"
            style={{
              width: i === 1 || i === 3 || i === 5 ? '2px' : '1px',
              height: '60vh',
              background: deg === 0
                ? 'linear-gradient(to bottom, rgba(201,168,76,0.2), transparent)'
                : 'linear-gradient(to bottom, rgba(201,168,76,0.12), transparent)',
              transform: `rotate(${deg}deg)`,
              transformOrigin: 'top center',
              animation: `rayPulse 6s ease-in-out infinite`,
              animationDelay: `${[0, 0.5, 1, 0.3, 1, 0.5, 0][i]}s`,
              opacity: i === 1 || i === 5 ? 0.6 : 1,
            }}
          />
        ))}
      </div>

      {/* Content */}
      {/* Audit M5: clamp letter-spacing so the eyebrow doesn't wrap mid-phrase
          on narrow viewports while keeping the wide tracking on desktop. */}
      <p
        className="font-cinzel text-gold uppercase mb-6"
        style={{
          fontSize: '0.85rem',
          letterSpacing: 'clamp(0.18em, 2.5vw, 0.35em)',
          animation: 'fadeUp 1s 0.3s both',
        }}
      >
        For the Curious &amp; the Convinced
      </p>

      <h1
        className="font-cormorant font-light text-cream mb-3"
        style={{
          fontSize: 'clamp(3.5rem, 8vw, 7rem)',
          lineHeight: 1.05,
          animation: 'fadeUp 1s 0.5s both',
        }}
      >
        The Case for Christ.<br />
        <em className="not-italic text-gold-light">The Life of Faith.</em>
      </h1>

      {/* Ornamental divider */}
      <div
        className="flex items-center gap-4 my-6 w-80"
        style={{ animation: 'fadeUp 1s 0.7s both' }}
      >
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--gold-dim))' }} />
        <span className="text-gold text-base">✦</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--gold-dim))' }} />
      </div>

      <p
        className="font-cormorant text-text-light max-w-xl leading-relaxed mb-6"
        style={{ fontSize: '1.4rem', animation: 'fadeUp 1s 0.9s both' }}
      >
        Where do I start?
      </p>

      <div
        className="mb-8"
        style={{ animation: 'fadeUp 1s 1.0s both' }}
      >
        <Link
          href="/start-here"
          className="font-cinzel font-bold text-midnight bg-gold rounded-full px-10 py-4 no-underline hover:bg-gold-light transition-all inline-block tracking-[0.15em] uppercase"
          style={{ fontSize: '0.85rem' }}
        >
          Start Here
        </Link>
      </div>

      <div
        className="flex gap-4 flex-wrap justify-center"
        style={{ animation: 'fadeUp 1s 1.1s both' }}
      >
        <Link
          href="/doctrine"
          className="font-cinzel font-bold tracking-[0.15em] uppercase text-midnight bg-gold px-10 py-4 rounded-full no-underline transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-lg"
          style={{ fontSize: '0.85rem', boxShadow: '0 0 0 transparent' }}
        >
          Explore Doctrine
        </Link>
        <Link
          href="/apologetics"
          className="font-cinzel font-bold tracking-[0.15em] uppercase text-gold bg-transparent px-10 py-4 rounded-full no-underline transition-all hover:bg-[rgba(201,168,76,0.08)] hover:-translate-y-0.5"
          style={{ fontSize: '0.85rem', border: '1px solid rgba(201,168,76,0.4)' }}
        >
          Defend the Faith
        </Link>
      </div>
    </section>
  );
}
