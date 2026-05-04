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
  const cardRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const updateProminent = useCallback(() => {
    const viewportMid = window.scrollY + window.innerHeight / 2;
    let closestSlug: string | null = null;
    let closestDist = Infinity;

    cardRefs.current.forEach((el, slug) => {
      const rect = el.getBoundingClientRect();
      const cardMid = window.scrollY + rect.top + rect.height / 2;
      const dist = Math.abs(cardMid - viewportMid);
      if (dist < closestDist) {
        closestDist = dist;
        closestSlug = slug;
      }
    });

    setProminentSlug(closestSlug);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateProminent, { passive: true });
    updateProminent();
    return () => window.removeEventListener('scroll', updateProminent);
  }, [updateProminent]);

  return (
    <section id="doctrine" className="py-10 px-4 sm:px-8 md:px-16">
      <AnimateOnScroll>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
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
              View All Doctrines →
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
                  className="block no-underline relative overflow-hidden rounded-2xl"
                  style={{
                    background: 'var(--deep-navy)',
                    border: isProminent
                      ? '1px solid rgba(201,168,76,0.32)'
                      : '1px solid rgba(201,168,76,0.08)',
                    padding: '1.8rem',
                    transform: isProminent ? 'translateY(-5px) scale(1.025)' : 'translateY(0) scale(1)',
                    transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), border-color 0.35s ease, box-shadow 0.35s ease',
                    boxShadow: isProminent
                      ? '0 18px 52px rgba(0,0,0,0.45), 0 0 24px rgba(201,168,76,0.07)'
                      : '0 0 0 rgba(0,0,0,0)',
                    zIndex: isProminent ? 2 : 1,
                    position: 'relative',
                  }}
                >
                  {/* Gold left accent — reveals on prominence */}
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
                  <h3 className="font-cormorant text-cream mb-3" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                    {doctrine.name}
                  </h3>
                  {/* Description first */}
                  <p className="text-text-light leading-relaxed mb-4" style={{ fontSize: '0.95rem' }}>
                    {doctrine.description}
                  </p>
                  {/* Verse second */}
                  <p className="font-cormorant text-text-muted leading-relaxed" style={{ fontSize: '1rem', fontStyle: 'italic' }}>
                    {doctrine.verse}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
