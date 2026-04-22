import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { APOLOGETICS_QUESTIONS, APOLOGETICS_CATEGORIES } from '@/lib/data';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return APOLOGETICS_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = APOLOGETICS_CATEGORIES.find((c) => c.slug === category);
  if (!cat) return { title: 'Category Not Found' };
  return {
    title: `${cat.title} Apologetics — ChristCornerstone`,
    description: cat.description,
  };
}

export default async function ApologeticsCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = APOLOGETICS_CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const questions = APOLOGETICS_QUESTIONS.filter((q) => q.category === category);

  return (
    <div style={{ paddingTop: '6rem' }}>
      <div
        className="text-center py-20 px-8 relative overflow-hidden"
        style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '500px', height: '500px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
          }}
        />
        <Link
          href="/apologetics"
          className="font-cinzel tracking-[0.2em] uppercase text-gold-dim no-underline hover:text-gold transition-colors inline-block mb-6"
          style={{ fontSize: '0.72rem' }}
        >
          ← All Apologetics
        </Link>
        <span className="text-5xl block mb-4">{cat.icon}</span>
        <span className="section-label">{cat.title}</span>
        <h1 className="font-cormorant font-light text-cream mt-2 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: 1.1 }}>
          {cat.description}
        </h1>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        {questions.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-cormorant text-text-muted italic" style={{ fontSize: '1.3rem' }}>
              More questions coming soon for this category.
            </p>
            <Link href="/apologetics" className="font-cinzel text-gold-dim no-underline hover:text-gold transition-colors mt-6 inline-block" style={{ fontSize: '0.8rem', letterSpacing: '0.15em' }}>
              ← View All Questions
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((q) => (
              <div
                key={q.id}
                className="rounded-2xl p-7"
                style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.1)' }}
              >
                <h2 className="font-cormorant text-cream mb-5" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                  {q.question}
                </h2>
                <div className="space-y-4">
                  <div className="rounded-xl p-4" style={{ background: 'rgba(201,168,76,0.04)' }}>
                    <p className="font-cinzel text-gold-dim tracking-[0.15em] uppercase mb-2" style={{ fontSize: '0.68rem' }}>The Objection</p>
                    <p className="text-text-light leading-relaxed" style={{ fontSize: '1rem' }}>{q.objection}</p>
                  </div>
                  <div className="rounded-xl p-4" style={{ background: 'rgba(201,168,76,0.07)' }}>
                    <p className="font-cinzel text-gold tracking-[0.15em] uppercase mb-2" style={{ fontSize: '0.68rem' }}>The Response</p>
                    <p className="text-text-light leading-relaxed" style={{ fontSize: '1rem' }}>{q.response}</p>
                  </div>
                  <p className="text-text-muted leading-relaxed" style={{ fontSize: '0.9rem' }}>
                    <span className="text-gold-dim font-cinzel tracking-widest uppercase text-[0.65rem]">Go Deeper: </span>
                    {q.go_deeper}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other categories */}
        <div className="mt-16">
          <p className="font-cinzel text-gold-dim tracking-[0.2em] uppercase mb-6" style={{ fontSize: '0.72rem' }}>
            Other Categories
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {APOLOGETICS_CATEGORIES.filter((c) => c.slug !== category).map((c) => (
              <Link
                key={c.id}
                href={`/apologetics/${c.slug}`}
                className="flex items-center gap-3 rounded-xl p-4 no-underline transition-all"
                style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.08)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(201,168,76,0.09)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(201,168,76,0.04)')}
              >
                <span className="text-xl">{c.icon}</span>
                <span className="font-cinzel text-gold tracking-[0.1em] uppercase" style={{ fontSize: '0.75rem' }}>
                  {c.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}