'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import type { Doctrine } from '@/types';

interface Props {
  doctrines: Doctrine[];
}

/**
 * Core Doctrines section.
 *
 * The cards are intentionally NOT links — touching a card on mobile must only
 * scroll the page, never swap content or navigate. Routing happens through the
 * per-card "See more →" link.
 *
 * As the user scrolls, the card whose centre is closest to the viewport
 * centre gets a subtle "in focus" prominence (slight scale + softer
 * gold-tinted shadow). Implemented with a single shared IntersectionObserver
 * watching a 20%-tall band in the middle of the viewport.
 */
export default function DoctrineSection({ doctrines }: Props) {
  const featured = doctrines.slice(0, 8);
  const [activeId, setActiveId] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    // Honour reduced-motion: skip the in-focus prominence entirely.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    // The "focus zone" is the middle 20% of the viewport. A card is considered
    // in focus when any part of it falls inside that band.
    const observer = new IntersectionObserver(
      (entries) => {
        setActiveId((current) => {
          let next = current;
          entries.forEach((entry) => {
            const id = (entry.target as HTMLElement).dataset.doctrineId;
            if (!id) return;
            if (entry.isIntersecting) {
              next = id;
            } else if (id === next) {
              next = null;
            }
          });
          return next;
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [featured.length]);

  const setCardRef = (id: string) => (el: HTMLElement | null) => {
    const map = cardRefs.current;
    if (el) {
      map.set(id, el);
    } else {
      map.delete(id);
    }
  };

  return (
    <section id="doctrine" className="py-24 px-4 sm:px-8 md:px-16">
      <AnimateOnScroll>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="section-label">Foundations of the Faith</span>
              <h2 className="section-title">Core Doctrines</h2>
              <p className="text-text-light leading-relaxed max-w-lg mt-3" style={{ fontSize: '1.05rem' }}>
                The great pillars of Christian belief, clearly explained with Scripture and historical depth.
              </p>
            </div>
            <Link
              href="/doctrine"
              className="font-cinzel font-bold tracking-[0.12em] uppercase text-gold bg-transparent px-6 py-3 rounded-full no-underline transition-all hover:bg-[rgba(201,168,76,0.08)] whitespace-nowrap self-start md:self-end"
              style={{ fontSize: '0.65rem', border: '1px solid rgba(201,168,76,0.4)' }}
            >
              View All Doctrines →
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((doctrine) => {
              const isActive = activeId === doctrine.id;
              return (
                <article
                  key={doctrine.id}
                  ref={setCardRef(doctrine.id)}
                  data-doctrine-id={doctrine.id}
                  data-active={isActive ? 'true' : 'false'}
                  className="relative overflow-hidden rounded-2xl flex flex-col"
                  style={{
                    background: 'var(--deep-navy)',
                    border: isActive
                      ? '1px solid rgba(201,168,76,0.22)'
                      : '1px solid rgba(201,168,76,0.08)',
                    padding: '1.8rem',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: isActive
                      ? '0 14px 36px rgba(0,0,0,0.32), 0 6px 18px rgba(201,168,76,0.10)'
                      : '0 1px 2px rgba(0,0,0,0.18)',
                    transition:
                      'transform 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease',
                    willChange: 'transform',
                  }}
                >
                  {/* Gold left bar — fills when card is in focus */}
                  <div
                    className="absolute top-0 left-0 w-0.5 bg-gold transition-all duration-500"
                    style={{
                      height: isActive ? '100%' : '0%',
                      transformOrigin: 'top',
                    }}
                    aria-hidden="true"
                  />

                  {/* 1. Eyebrow */}
                  <span
                    className="font-cinzel tracking-[0.25em] uppercase text-gold-dim block mb-3"
                    style={{ fontSize: '0.7rem' }}
                  >
                    {doctrine.tag}
                  </span>

                  {/* 2. Title */}
                  <h3
                    className="font-cormorant text-cream mb-3"
                    style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.2 }}
                  >
                    {doctrine.name}
                  </h3>

                  {/* 3. Explanation (moved up) */}
                  <p
                    className="text-text-light leading-relaxed mb-5"
                    style={{ fontSize: '0.95rem' }}
                  >
                    {doctrine.description}
                  </p>

                  {/* 4. Related verse + citation (moved down) */}
                  <blockquote
                    className="font-cormorant text-cream-dark leading-relaxed pl-4 mb-5"
                    style={{
                      fontSize: '1rem',
                      borderLeft: '2px solid rgba(201,168,76,0.35)',
                    }}
                  >
                    &ldquo;{doctrine.hover_verse_text}&rdquo;
                    <cite
                      className="font-cinzel text-gold tracking-[0.25em] uppercase not-italic block mt-2"
                      style={{ fontSize: '0.7rem', fontStyle: 'normal' }}
                    >
                      {doctrine.hover_verse_citation}
                    </cite>
                  </blockquote>

                  {/* 5. See more link */}
                  <div className="mt-auto pt-1">
                    <Link
                      href={`/doctrine/${doctrine.slug}`}
                      className="font-cinzel font-bold tracking-[0.15em] uppercase text-gold no-underline inline-flex items-center gap-1.5 transition-colors hover:text-gold-light"
                      style={{
                        fontSize: '0.7rem',
                        borderBottom: '1px solid rgba(201,168,76,0.4)',
                        paddingBottom: '2px',
                      }}
                      aria-label={`See more about ${doctrine.name}`}
                    >
                      See more <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
