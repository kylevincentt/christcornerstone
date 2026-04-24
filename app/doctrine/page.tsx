import type { Metadata } from 'next';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { getDoctrines } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Core Doctrines',
  description: 'The great pillars of Christian belief, clearly explained with Scripture and historical depth.',
};

export default async function DoctrinePage() {
  const doctrines = await getDoctrines();

  return (
    <div style={{ paddingTop: '6rem' }}>
      {/* Header */}
      <div
        className="text-center py-20 px-8 relative overflow-hidden"
        style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '600px', height: '600px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
          }}
        />
        <span className="section-label">Foundations of the Faith</span>
        <h1 className="font-cormorant font-light text-cream mt-2 mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}>
          Core <em className="not-italic text-gold-light">Doctrines</em>
        </h1>
        <p className="font-cormorant text-text-light max-w-xl mx-auto leading-relaxed" style={{ fontSize: '1.3rem' }}>
          The great pillars of Christian belief, clearly explained with Scripture and historical depth.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-8 py-20">
        <AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctrines.map((doctrine, i) => (
              <AnimateOnScroll key={doctrine.id} delay={i * 80}>
                <Link
                  href={`/doctrine/${doctrine.slug}`}
                  className="hover-gold-border-soft block no-underline rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 group"
                  style={{
                    background: 'var(--deep-navy)',
                    border: '1px solid rgba(201,168,76,0.08)',
                  }}
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="font-cinzel tracking-[0.25em] uppercase text-gold-dim block mb-2" style={{ fontSize: '0.7rem' }}>
                          {doctrine.tag}
                        </span>
                        <h2 className="font-cormorant text-cream" style={{ fontSize: '1.8rem', fontWeight: 600 }}>
                          {doctrine.name}
                        </h2>
                      </div>
                      <span
                        className="font-cinzel text-gold-dim transition-colors group-hover:text-gold flex-shrink-0 mt-1"
                        style={{ fontSize: '0.75rem' }}
                      >
                        Read →
                      </span>
                    </div>
                    <p className="font-cormorant text-text-muted italic leading-relaxed mb-3" style={{ fontSize: '1.05rem' }}>
                      {doctrine.verse}
                    </p>
                    <p className="text-text-light leading-relaxed" style={{ fontSize: '0.95rem' }}>
                      {doctrine.description}
                    </p>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
