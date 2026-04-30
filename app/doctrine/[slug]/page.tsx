import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDoctrines, getDoctrineBySlug } from '@/lib/content';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const doctrines = await getDoctrines();
  return doctrines.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctrine = await getDoctrineBySlug(slug);
  if (!doctrine) return { title: 'Doctrine Not Found' };
  return {
    title: doctrine.name,
    description: doctrine.description,
    alternates: { canonical: `/doctrine/${doctrine.slug}` },
  };
}

function renderContent(text: string) {
  return text.split('\n\n').map((para, i) => {
    if (para.startsWith('**') && para.split('\n')[0].endsWith('**')) {
      const [heading, ...rest] = para.split('\n');
      const headingText = heading.replace(/\*\*/g, '');
      return (
        <div key={i}>
          <h2 className="font-cormorant text-cream mb-3" style={{ fontSize: '1.7rem', fontWeight: 600, marginTop: '2rem' }}>
            {headingText}
          </h2>
          {rest.join('\n').split('\n').map((line, j) => (
            <p key={j} className="text-text-light leading-relaxed mb-3" style={{ fontSize: '1.125rem' }}
              dangerouslySetInnerHTML={{
                __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e2c47a;font-weight:600">$1</strong>')
              }}
            />
          ))}
        </div>
      );
    }
    if (para.startsWith('*') && para.endsWith('*')) {
      return (
        <p key={i} className="font-cormorant italic text-text-muted leading-relaxed mb-3" style={{ fontSize: '1.3rem' }}>
          {para.replace(/\*/g, '')}
        </p>
      );
    }
    return (
      <p key={i} className="text-text-light leading-relaxed mb-4" style={{ fontSize: '1.125rem' }}
        dangerouslySetInnerHTML={{
          __html: para.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e2c47a;font-weight:600">$1</strong>')
        }}
      />
    );
  });
}

export default async function DoctrineDetailPage({ params }: Props) {
  const { slug } = await params;
  const doctrines = await getDoctrines();
  const doctrine = doctrines.find((d) => d.slug === slug);
  if (!doctrine) notFound();

  const currentIndex = doctrines.findIndex((d) => d.slug === slug);
  const prev = doctrines[currentIndex - 1];
  const next = doctrines[currentIndex + 1];

  return (
    <div style={{ paddingTop: '6rem' }}>
      {/* Hero */}
      <div
        className="py-10 px-8 text-center relative overflow-hidden"
        style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '500px', height: '500px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)',
          }}
        />
        <Link
          href="/doctrine"
          className="font-cinzel tracking-[0.2em] uppercase text-gold-dim no-underline hover:text-gold transition-colors inline-block mb-6"
          style={{ fontSize: '0.72rem' }}
        >
          ← All Doctrines
        </Link>
        <span className="font-cinzel tracking-[0.25em] uppercase text-gold block mb-3" style={{ fontSize: '0.78rem' }}>
          {doctrine.tag}
        </span>
        <h1 className="font-cormorant font-light text-cream mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}>
          {doctrine.name}
        </h1>
        <p className="font-cormorant text-text-muted italic max-w-xl mx-auto leading-relaxed" style={{ fontSize: '1.4rem' }}>
          {doctrine.verse}
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-8 py-8">
        {/* Key verse callout */}
        <div
          className="rounded-2xl p-8 mb-8 text-center"
          style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}
        >
          <blockquote className="font-cormorant text-cream-dark leading-relaxed mb-3" style={{ fontSize: '1.4rem' }}>
            {doctrine.hover_verse_text}
          </blockquote>
          <cite className="font-cinzel text-gold tracking-[0.25em] uppercase not-italic" style={{ fontSize: '0.72rem' }}>
            {doctrine.hover_verse_citation}
          </cite>
        </div>

        {/* Body */}
        <div className="prose-faith">
          {doctrine.full_content
            ? renderContent(doctrine.full_content)
            : <p className="text-text-light leading-relaxed" style={{ fontSize: '1.125rem' }}>{doctrine.description}</p>
          }
        </div>

        {/* Navigation */}
        <div
          className="flex justify-between gap-6 mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
        >
          {prev ? (
            <Link href={`/doctrine/${prev.slug}`} className="no-underline group">
              <span className="font-cinzel text-gold-dim text-xs tracking-widest uppercase block mb-2 transition-colors group-hover:text-gold">
                ← Previous
              </span>
              <span className="font-cormorant text-cream text-xl">{prev.name}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/doctrine/${next.slug}`} className="no-underline group text-right">
              <span className="font-cinzel text-gold-dim text-xs tracking-widest uppercase block mb-2 transition-colors group-hover:text-gold">
                Next →
              </span>
              <span className="font-cormorant text-cream text-xl">{next.name}</span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
