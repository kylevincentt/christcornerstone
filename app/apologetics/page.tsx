import type { Metadata } from 'next';
import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { getApologeticsQuestions, getApologeticsCategories } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Apologetics',
  description: 'Structured answers to the hardest questions about Christianity — from philosophy to history to science.',
};

export default async function ApologeticsPage() {
  const [questions, categories] = await Promise.all([
    getApologeticsQuestions(),
    getApologeticsCategories(),
  ]);

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
        <span className="section-label">Defend the Faith</span>
        <h1 className="font-cormorant font-light text-cream mt-2 mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}>
          Every Objection <em className="not-italic text-gold-light">Answered</em>
        </h1>
        <p className="font-cormorant text-text-light max-w-xl mx-auto leading-relaxed" style={{ fontSize: '1.3rem' }}>
          Structured defenses of the Christian faith — from philosophy to history to science.
        </p>
      </div>

      {/* Categories */}
      <div
        className="py-16 px-8 md:px-16"
        style={{ background: 'var(--deep-navy)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}
      >
        <AnimateOnScroll>
          <div className="max-w-5xl mx-auto">
            <span className="section-label">Browse by Category</span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/apologetics/${cat.slug}`}
                  className="hover-gold-card block no-underline rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(201,168,76,0.04)',
                    border: '1px solid rgba(201,168,76,0.1)',
                  }}
                >
                  <span className="block text-3xl mb-3" aria-hidden="true">{cat.icon}</span>
                  <p className="font-cinzel text-gold tracking-[0.12em] uppercase mb-2" style={{ fontSize: '0.82rem' }}>
                    {cat.title}
                  </p>
                  <p className="text-text-muted leading-relaxed" style={{ fontSize: '0.9rem' }}>
                    {cat.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      {/* All Questions */}
      <div className="max-w-3xl mx-auto px-8 py-16">
        <AnimateOnScroll>
          <span className="section-label">All Questions</span>
          <h2 className="section-title mb-10">The Hard Questions</h2>
          <div className="space-y-4">
            {questions.map((q) => (
              <article
                key={q.id}
                className="rounded-2xl overflow-hidden"
                style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.08)' }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span
                        className="font-cinzel tracking-[0.2em] uppercase text-gold-dim block mb-2"
                        style={{ fontSize: '0.68rem' }}
                      >
                        {categories.find((c) => c.slug === q.category)?.title || q.category}
                      </span>
                      <h3 className="font-cormorant text-cream" style={{ fontSize: '1.3rem', fontWeight: 600 }}>
                        {q.question}
                      </h3>
                    </div>
                  </div>
                  <p className="text-text-muted leading-relaxed mb-3" style={{ fontSize: '0.95rem' }}>
                    <strong className="text-gold-light">Objection:</strong> {q.objection}
                  </p>
                  <p className="text-text-light leading-relaxed mb-3" style={{ fontSize: '0.95rem' }}>
                    <strong className="text-gold-light">Response:</strong> {q.response}
                  </p>
                  <p className="text-text-muted" style={{ fontSize: '0.9rem' }}>
                    <strong className="text-gold-dim">Go Deeper:</strong> {q.go_deeper}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
