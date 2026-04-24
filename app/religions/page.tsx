import type { Metadata } from 'next';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { getReligions } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Other Religions & Christianity',
  description: 'See how Christianity compares to Islam, Judaism, Hinduism, Buddhism, Mormonism, and Atheism — respectfully, clearly, and honestly.',
};

export default async function ReligionsPage() {
  const religions = await getReligions();

  return (
    <div style={{ paddingTop: '6rem' }}>
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
        <span className="section-label">Understanding Other Worldviews</span>
        <h1 className="font-cormorant font-light text-cream mt-2 mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}>
          Other Religions &amp; <em className="not-italic text-gold-light">Christianity</em>
        </h1>
        <p className="font-cormorant text-text-light max-w-xl mx-auto leading-relaxed" style={{ fontSize: '1.3rem' }}>
          Every major religion asks the same deep questions. See how Christianity&apos;s answers compare — respectfully, clearly, and honestly.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16">
        <AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {religions.map((religion, i) => (
              <AnimateOnScroll key={religion.id} delay={i * 80}>
                <Link
                  href={`/religions/${religion.slug}`}
                  className="hover-gold-border block no-underline rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 group"
                  style={{
                    background: 'var(--deep-navy)',
                    border: '1px solid rgba(201,168,76,0.08)',
                  }}
                >
                  <div className="flex items-center gap-4 px-7 py-5" style={{ borderBottom: '1px solid rgba(201,168,76,0.07)' }}>
                    <span className="text-4xl">{religion.icon}</span>
                    <div>
                      <p className="font-cinzel text-cream tracking-[0.1em]">{religion.name}</p>
                      <p className="font-cinzel text-gold-dim tracking-[0.2em] uppercase mt-0.5" style={{ fontSize: '0.68rem' }}>
                        {religion.adherents}
                      </p>
                    </div>
                    <span className="ml-auto font-cinzel text-gold-dim text-xs tracking-widest uppercase transition-colors group-hover:text-gold">
                      Read →
                    </span>
                  </div>
                  <div className="px-7 py-5">
                    <p className="text-text-light leading-relaxed mb-4" style={{ fontSize: '0.95rem' }}>
                      {religion.description}
                    </p>
                    <ul className="list-none space-y-2">
                      {religion.comparison_points.slice(0, 3).map((point, j) => (
                        <li key={j} className="text-text-muted pl-5 relative leading-relaxed" style={{ fontSize: '0.88rem' }}>
                          <span className="absolute left-0 top-0.5 text-gold-dim" style={{ fontSize: '0.75rem' }}>→</span>
                          {point}
                        </li>
                      ))}
                    </ul>
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
