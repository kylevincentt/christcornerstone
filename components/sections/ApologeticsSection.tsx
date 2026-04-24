'use client';
import { useState } from 'react';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { APOLOGETICS_QUESTIONS, APOLOGETICS_CATEGORIES } from '@/lib/data';

export default function ApologeticsSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const featured = APOLOGETICS_QUESTIONS.slice(0, 4);

  return (
    <section
      id="apologetics"
      className="py-24 px-4 sm:px-8 md:px-16 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--deep-navy) 0%, var(--midnight) 100%)',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
      }}
    >
      {/* Decorative glow */}
      <div
        className="absolute right-[-100px] top-[-100px] pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto flex flex-col gap-16">
        <AnimateOnScroll>
          <span className="section-label">Defend the Faith</span>
          <h2 className="section-title mb-3">Answers to the Hardest Questions</h2>
          <p className="text-text-light leading-relaxed" style={{ fontSize: '1.05rem', maxWidth: '560px' }}>
            Every objection to Christianity has been answered. Explore structured defenses — from philosophy to history to science.
          </p>
          <div className="ornament">
            <div className="ornament-line" />
            <div className="ornament-diamond" />
          </div>

          {/* Accordion */}
          <ul className="list-none" role="list">
            {featured.map((q) => {
              const isOpen = openId === q.id;
              const panelId = `apolo-panel-${q.id}`;
              const buttonId = `apolo-button-${q.id}`;
              return (
                <li
                  key={q.id}
                  style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full bg-transparent border-none py-5 flex items-center justify-between cursor-pointer text-left gap-4 transition-colors duration-300"
                    style={{ color: isOpen ? 'var(--cream)' : 'var(--text-light)' }}
                    onClick={() => setOpenId(isOpen ? null : q.id)}
                  >
                    <span className="font-cormorant" style={{ fontSize: '1.3rem' }}>{q.question}</span>
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 transition-transform duration-300"
                      style={{
                        color: isOpen ? 'var(--gold)' : 'var(--gold-dim)',
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        fontSize: '1.4rem',
                        fontFamily: 'Lato, sans-serif',
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    style={{
                      maxHeight: isOpen ? '600px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.4s ease',
                    }}
                  >
                    <div className="pb-6">
                      <p className="text-text-muted leading-relaxed mb-3" style={{ fontSize: '1rem' }}>
                        <strong className="text-gold-light font-semibold">The Objection:</strong> {q.objection}
                      </p>
                      <p className="text-text-muted leading-relaxed mb-3" style={{ fontSize: '1rem' }}>
                        <strong className="text-gold-light font-semibold">The Response:</strong> {q.response}
                      </p>
                      <p className="text-text-muted leading-relaxed" style={{ fontSize: '1rem' }}>
                        <strong className="text-gold-light font-semibold">Go Deeper:</strong> {q.go_deeper}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6">
            <Link
              href="/apologetics"
              className="font-cinzel font-bold tracking-[0.15em] uppercase text-midnight bg-gold px-8 py-3 rounded-full no-underline transition-all hover:bg-gold-light inline-block"
              style={{ fontSize: '0.8rem' }}
            >
              View All Questions →
            </Link>
          </div>
        </AnimateOnScroll>

        {/* Category cards */}
        <AnimateOnScroll delay={200}>
          <span className="section-label">Browse by Category</span>
          <h3 className="font-cormorant font-light text-cream mb-2" style={{ fontSize: '2rem' }}>
            All Objections Answered
          </h3>
          <p className="text-text-muted mb-8" style={{ fontSize: '1rem' }}>
            Choose a category to explore structured defenses of the Christian faith.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {APOLOGETICS_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/apologetics/${cat.slug}`}
                className="hover-gold-bg-sm block no-underline rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: cat.slug === 'quick'
                    ? 'rgba(201,168,76,0.08)'
                    : 'rgba(201,168,76,0.04)',
                  border: cat.slug === 'quick'
                    ? '1px solid rgba(201,168,76,0.2)'
                    : '1px solid rgba(201,168,76,0.1)',
                }}
              >
                <span className="block text-2xl mb-2" aria-hidden="true">{cat.icon}</span>
                <p className="font-cinzel text-gold tracking-[0.12em] uppercase mb-1" style={{ fontSize: '0.82rem' }}>
                  {cat.title}
                </p>
                <p className="text-text-muted leading-relaxed" style={{ fontSize: '0.9rem' }}>
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
