import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { DOCTRINES } from '@/lib/data';

export default function DoctrineSection() {
  const featured = DOCTRINES.slice(0, 8);

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
            {featured.map((doctrine) => (
              <Link
                key={doctrine.id}
                href={`/doctrine/${doctrine.slug}`}
                className="block no-underline group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'var(--deep-navy)',
                  border: '1px solid rgba(201,168,76,0.08)',
                  padding: '1.8rem',
                }}
              >
                {/* Gold left bar on hover */}
                <div
                  className="absolute top-0 left-0 w-0.5 h-0 bg-gold transition-all duration-300 group-hover:h-full"
                  style={{ transformOrigin: 'bottom' }}
                />

                <span
                  className="font-cinzel tracking-[0.25em] uppercase text-gold-dim block mb-3"
                  style={{ fontSize: '0.7rem' }}
                >
                  {doctrine.tag}
                </span>
                <h3 className="font-cormorant text-cream mb-2" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                  {doctrine.name}
                </h3>
                <p className="font-cormorant text-text-muted leading-relaxed mb-4" style={{ fontSize: '1rem' }}>
                  {doctrine.verse}
                </p>
                <p className="text-text-light leading-relaxed" style={{ fontSize: '0.95rem' }}>
                  {doctrine.description}
                </p>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(10,14,26,0.96)' }}
                >
                  <blockquote className="font-cormorant text-cream-dark leading-relaxed mb-3" style={{ fontSize: '1.1rem' }}>
                    {doctrine.hover_verse_text}
                  </blockquote>
                  <cite className="font-cinzel text-gold tracking-[0.25em] uppercase not-italic" style={{ fontSize: '0.72rem' }}>
                    {doctrine.hover_verse_citation}
                  </cite>
                  <span className="font-cinzel text-gold-dim tracking-[0.15em] uppercase mt-4 block text-xs">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}