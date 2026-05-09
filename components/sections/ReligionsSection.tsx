'use client';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import type { Religion } from '@/types';

interface Props {
  religions: Religion[];
}

export default function ReligionsSection({ religions }: Props) {
  return (
    <section
      id="religions"
      className="py-6 md:py-10 px-8 md:px-16"
      style={{ background: 'var(--midnight)', borderTop: '1px solid rgba(201,168,76,0.1)' }}
    >
      <AnimateOnScroll>
        <div className="max-w-6xl mx-auto">
          {/* Header — audit R2 M3: ship a "View All Religions →" pill so the
              mobile-collapsed list (3 of N) has a clear path to the full
              index, mirroring the Sunday Sermons / Weekly Discussion
              header pattern. */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="section-label">Understanding Other Worldviews</span>
              <h2 className="section-title">
                Other Religions{' '}
                <span className="text-gold-light">&amp; Christianity</span>
              </h2>
              <p className="text-text-light leading-relaxed mt-3 max-w-lg" style={{ fontSize: '1.05rem' }}>
                Every major religion asks the same deep questions. See how Christianity&apos;s answers compare — respectfully, clearly, and honestly.
              </p>
            </div>
            <Link
              href="/religions"
              className="font-cinzel font-bold tracking-[0.12em] uppercase text-gold bg-transparent px-6 py-3 rounded-full no-underline transition-all hover:bg-[rgba(201,168,76,0.08)] whitespace-nowrap self-start md:self-end"
              style={{ fontSize: '0.65rem', border: '1px solid rgba(201,168,76,0.4)' }}
            >
              View All Religions &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {religions.map((religion, i) => {
              /* Audit R2 M3: hide religions past index 2 on mobile so the
                 home page renders ≤3 cards on phone widths. Desktop
                 (md:block) still shows the full grid. */
              const mobileHidden = i >= 3 ? 'hidden md:block' : 'block';
              return (
              <Link
                key={religion.id}
                href={`/religions/${religion.slug}`}
                className={`${mobileHidden} no-underline rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 group`}
                style={{
                  background: 'var(--deep-navy)',
                  border: '1px solid rgba(201,168,76,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="flex items-center gap-4 px-7 py-5"
                  style={{ borderBottom: '1px solid rgba(201,168,76,0.07)' }}
                >
                  <span className="text-4xl flex-shrink-0">{religion.icon}</span>
                  <div>
                    <p className="font-cinzel text-cream tracking-[0.1em]" style={{ fontSize: '1rem' }}>
                      {religion.name}
                    </p>
                    <p className="font-cinzel text-gold-dim tracking-[0.2em] uppercase mt-0.5" style={{ fontSize: '0.68rem' }}>
                      {religion.adherents}
                    </p>
                  </div>
                </div>

                <div className="px-7 py-5">
                  <p className="text-text-light leading-relaxed mb-4" style={{ fontSize: '0.95rem' }}>
                    {religion.description}
                  </p>
                  <ul className="list-none space-y-2 mb-5">
                    {religion.comparison_points.map((point, i) => (
                      <li
                        key={i}
                        className="text-text-muted leading-relaxed pl-5 relative"
                        style={{ fontSize: '0.88rem' }}
                      >
                        <span className="absolute left-0 top-0.5 text-gold-dim" style={{ fontSize: '0.75rem' }}>→</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <span
                    className="font-cinzel tracking-[0.15em] uppercase transition-colors duration-300 group-hover:text-gold"
                    style={{ fontSize: '0.75rem', color: 'var(--gold-dim)' }}
                  >
                    Explore the Comparison →
                  </span>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
