'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import type { Doctrine } from '@/types';

interface Props {
  doctrines: Doctrine[];
}

export default function DoctrineSection({ doctrines }: Props) {
  const featured = doctrines.slice(0, 8);
  const [prominentSlug, setProminentSlug] = useState<string | null>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const updateProminent = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestSlug: string | null = null;
    let closestDist = Infinity;

    cardRefs.current.forEach((el, slug) => {
      const cardRect = el.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const dist = Math.abs(cardCenter - containerCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestSlug = slug;
      }
    });

    setProminentSlug(closestSlug);
  }, []);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 16);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateProminent();
    checkScroll();
    el.addEventListener('scroll', updateProminent, { passive: true });
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', updateProminent);
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', updateProminent);
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', updateProminent);
      window.removeEventListener('resize', checkScroll);
    };
  }, [updateProminent, checkScroll]);

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  }

  return (
    <section
      id="doctrine"
      className="py-10"
      style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}
    >
      <AnimateOnScroll>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 px-4 sm:px-8 md:px-16">
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
            style={{ fontSize: '0.7rem', border: '1px solid rgba(201,168,76,0.4)' }}
          >
            View All Doctrines &rarr;
          </Link>
        </div>

        {/* Horizontal scroller */}
        <div className="relative">
          {/*
            overflow-x:auto forces overflow-y to auto as well (CSS spec).
            That clips the prominent card's translateY(-5px) at the top.
            Fix: wrap in an outer div that absorbs the top clip via paddingTop/
            negative marginTop, giving the transform room to breathe.
          */}
          <div style={{ paddingTop: '10px', marginTop: '-10px', overflow: 'hidden' }}>
            <div
              ref={scrollRef}
              className="overflow-x-auto"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                paddingTop: '4px',
                paddingBottom: '4px',
              } as React.CSSProperties}
            >
              <div
                className="flex gap-5 pb-4"
                style={{
                  paddingLeft: 'clamp(1rem, 4vw, 4rem)',
                  paddingRight: 'clamp(1rem, 4vw, 4rem)',
                }}
              >
                {featured.map((doctrine) => {
                  const isProminent = prominentSlug === doctrine.slug;
                  return (
                    <Link
                      key={doctrine.id}
                      ref={(el) => {
                        if (el) cardRefs.current.set(doctrine.slug, el);
                        else cardRefs.current.delete(doctrine.slug);
                      }}
                      href={`/doctrine/${doctrine.slug}`}
                      className="block no-underline relative overflow-hidden rounded-2xl flex-shrink-0"
                      style={{
                        width: '300px',
                        scrollSnapAlign: 'start',
                        background: 'var(--deep-navy)',
                        border: isProminent
                          ? '1px solid rgba(201,168,76,0.32)'
                          : '1px solid rgba(201,168,76,0.08)',
                        padding: '1.8rem',
                        transform: isProminent ? 'translateY(-5px) scale(1.025)' : 'translateY(0) scale(1)',
                        transition:
                          'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), border-color 0.35s ease, box-shadow 0.35s ease',
                        boxShadow: isProminent
                          ? '0 18px 52px rgba(0,0,0,0.45), 0 0 24px rgba(201,168,76,0.07)'
                          : '0 0 0 rgba(0,0,0,0)',
                      }}
                    >
                      {/* Gold left accent */}
                      <div
                        className="absolute top-0 left-0 w-0.5 bg-gold"
                        style={{
                          height: isProminent ? '100%' : '0%',
                          opacity: isProminent ? 1 : 0,
                          transition: 'height 0.4s ease, opacity 0.4s ease',
                        }}
                      />

                      <span
                        className="font-cinzel tracking-[0.2em] uppercase text-gold-dim block mb-3"
                        style={{ fontSize: '0.75rem' }}
                      >
                        {doctrine.tag}
                      </span>
                      <h3
                        className="font-cormorant text-cream mb-3"
                        style={{ fontSize: '1.5rem', fontWeight: 600 }}
                      >
                        {doctrine.name}
                      </h3>
                      <p className="text-text-light leading-relaxed mb-4" style={{ fontSize: '0.95rem' }}>
                        {doctrine.description}
                      </p>
                      <p
                        className="font-cormorant text-text-muted leading-relaxed"
                        style={{ fontSize: '1rem', fontStyle: 'italic' }}
                      >
                        {doctrine.verse}
                      </p>
                    </Link>
                  );
                })}
                {/* Trailing spacer so last card doesn't sit flush against edge */}
                <div className="flex-shrink-0" style={{ width: '1px' }} />
              </div>
            </div>
          </div>

          {/* Right-edge gradient + arrow hint */}
          {canScrollRight && (
            <div
              className="absolute top-0 right-0 h-full pointer-events-none"
              style={{
                width: '80px',
                background: 'linear-gradient(to right, transparent, var(--midnight))',
                zIndex: 10,
              }}
            >
              <button
                onClick={scrollRight}
                aria-label="Scroll right for more doctrines"
                className="pointer-events-auto absolute flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                style={{
                  width: '38px',
                  height: '38px',
                  top: '50%',
                  right: '12px',
                  transform: 'translateY(-50%)',
                  background: 'rgba(201,168,76,0.14)',
                  border: '1px solid rgba(201,168,76,0.4)',
                  color: 'var(--gold)',
                  cursor: 'pointer',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </AnimateOnScroll>
    </section>
  );
}
