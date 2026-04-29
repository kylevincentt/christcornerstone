'use client';
import { useRef } from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import type { Quote } from '@/types';

interface Props {
  quotes: Quote[];
  hideHeader?: boolean;
}

export default function QuotesSection({ quotes, hideHeader = false }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' });
  };

  return (
    <section
      id="quotes"
      className="py-20 overflow-hidden"
      style={{
        background: 'var(--deep-navy)',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
      }}
    >
      {!hideHeader && (
        <div className="max-w-6xl mx-auto mb-12 px-8 md:px-16">
          <AnimateOnScroll>
            <span className="section-label">Voices Through the Ages</span>
            <h2 className="section-title">Famous Christian Quotes</h2>
            <p className="text-text-light leading-relaxed mt-3" style={{ fontSize: '1.05rem', maxWidth: '560px' }}>
              Words of wisdom from saints, scholars, reformers, and seekers — across 2,000 years of Christian thought.
            </p>
          </AnimateOnScroll>
        </div>
      )}

      <div className="relative">
        <div
          className="hidden md:block absolute top-0 bottom-0 left-0 w-24 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, var(--deep-navy), transparent)' }}
          aria-hidden="true"
        />
        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 w-24 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, var(--deep-navy), transparent)' }}
          aria-hidden="true"
        />

        <div
          ref={trackRef}
          role="region"
          aria-label="Christian quotes carousel"
          className="flex overflow-x-auto gap-6 px-4 md:px-16 pb-2 cursor-grab active:cursor-grabbing snap-x"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {quotes.map((quote) => (
            <article
              key={quote.id}
              className="flex-none rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                width: 'min(360px, 85vw)',
                background: 'var(--navy)',
                border: '1px solid rgba(201,168,76,0.1)',
                padding: '2rem 2rem 1.6rem',
                scrollSnapAlign: 'start',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)')}
            >
              <span
                className="font-cormorant block"
                style={{ fontSize: '5rem', lineHeight: 0.8, color: 'rgba(201,168,76,0.18)', marginBottom: '0.8rem' }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="font-cormorant text-cream-dark leading-relaxed mb-6" style={{ fontSize: '1.15rem' }}>
                {quote.text}
              </p>
              <div
                className="flex items-center gap-3 pt-4"
                style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
              >
                <div
                  aria-hidden="true"
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-base"
                  style={{
                    background: 'rgba(201,168,76,0.12)',
                    border: '1px solid rgba(201,168,76,0.2)',
                  }}
                >
                  {quote.avatar_emoji}
                </div>
                <div>
                  <p className="font-cinzel text-gold tracking-[0.15em] uppercase" style={{ fontSize: '0.72rem' }}>
                    {quote.author}
                  </p>
                  <p className="text-text-muted mt-0.5" style={{ fontSize: '0.78rem' }}>
                    {quote.era}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-10">
        <button
          type="button"
          aria-label="Scroll to previous quotes"
          onClick={() => scroll('left')}
          className="flex items-center justify-center w-11 h-11 rounded-full cursor-pointer transition-all duration-300 text-lg"
          style={{
            background: 'none',
            border: '1px solid rgba(201,168,76,0.25)',
            color: 'var(--gold)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
            e.currentTarget.style.borderColor = 'var(--gold)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none';
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)';
          }}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          aria-label="Scroll to next quotes"
          onClick={() => scroll('right')}
          className="flex items-center justify-center w-11 h-11 rounded-full cursor-pointer transition-all duration-300 text-lg"
          style={{
            background: 'none',
            border: '1px solid rgba(201,168,76,0.25)',
            color: 'var(--gold)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
            e.currentTarget.style.borderColor = 'var(--gold)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none';
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)';
          }}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
