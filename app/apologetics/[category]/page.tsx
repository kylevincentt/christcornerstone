import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getApologeticsQuestions,
  getApologeticsCategories,
  getApologeticsCategoryBySlug,
} from '@/lib/content';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const cats = await getApologeticsCategories();
  return cats.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = await getApologeticsCategoryBySlug(category);
  if (!cat) return { title: 'Category Not Found' };
  return {
    title: `${cat.title} Apologetics`,
    description: cat.description,
    alternates: { canonical: `/apologetics/${cat.slug}` },
  };
}

export default async function ApologeticsCategoryPage({ params }: Props) {
  const { category } = await params;
  const [cat, allQuestions, allCats] = await Promise.all([
    getApologeticsCategoryBySlug(category),
    getApologeticsQuestions(),
    getApologeticsCategories(),
  ]);
  if (!cat) notFound();

  const questions = allQuestions.filter((q) => q.category === category);

  return (
    <div style={{ paddingTop: '6rem' }}>
      <div
        className="text-center py-10 px-8 relative overflow-hidden"
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
        <span className="text-5xl block mb-4" aria-hidden="true">{cat.icon}</span>
        <span className="section-label">{cat.title}</span>
        <h1
          className="font-cormorant font-light text-cream mt-2 mb-4"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}
        >
          {cat.title} <em className="not-italic text-gold-light">Apologetics</em>
        </h1>
        <p
          className="font-cormorant text-text-light max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: '1.2rem' }}
        >
          {cat.description}
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-10">
        {questions.length === 0 ? (
          <div className="text-center py-10">
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
              <article
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
              </article>
            ))}
          </div>
        )}

        {/* Other categories */}
        <div className="mt-10">
          <p className="font-cinzel text-gold-dim tracking-[0.2em] uppercase mb-6" style={{ fontSize: '0.72rem' }}>
            Other Categories
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {allCats.filter((c) => c.slug !== category).map((c) => (
              <Link
                key={c.id}
                href={`/apologetics/${c.slug}`}
                className="hover-gold-bg-sm flex items-center gap-3 rounded-xl p-4 no-underline transition-all"
                style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.08)' }}
              >
                <span className="text-xl" aria-hidden="true">{c.icon}</span>
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
