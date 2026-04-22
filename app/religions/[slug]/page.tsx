import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { RELIGIONS } from '@/lib/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RELIGIONS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const religion = RELIGIONS.find((r) => r.slug === slug);
  if (!religion) return { title: 'Not Found' };
  return {
    title: `${religion.name} & Christianity — ChristCornerstone`,
    description: religion.description,
  };
}

function renderContent(text: string) {
  return text.split('\n\n').map((para, i) => {
    if (para.startsWith('**') && para.split('\n')[0].endsWith('**')) {
      const lines = para.split('\n');
      const headingText = lines[0].replace(/\*\*/g, '');
      const body = lines.slice(1).join('\n');
      return (
        <div key={i}>
          <h2 className="font-cormorant text-cream mb-3" style={{ fontSize: '1.6rem', fontWeight: 600, marginTop: '2rem' }}>
            {headingText}
          </h2>
          {body.split('\n').filter(Boolean).map((line, j) => (
            <p key={j} className="text-text-light leading-relaxed mb-3" style={{ fontSize: '1.05rem' }}
              dangerouslySetInnerHTML={{
                __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e2c47a;font-weight:600">$1</strong>')
              }}
            />
          ))}
        </div>
      );
    }
    return (
      <p key={i} className="text-text-light leading-relaxed mb-4" style={{ fontSize: '1.05rem' }}
        dangerouslySetInnerHTML={{
          __html: para.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e2c47a;font-weight:600">$1</strong>')
        }}
      />
    );
  });
}

export default async function ReligionDetailPage({ params }: Props) {
  const { slug } = await params;
  const religion = RELIGIONS.find((r) => r.slug === slug);
  if (!religion) notFound();

  const currentIndex = RELIGIONS.findIndex((r) => r.slug === slug);
  const prev = RELIGIONS[currentIndex - 1];
  const next = RELIGIONS[currentIndex + 1];

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
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)',
          }}
        />
        <Link
          href="/religions"
          className="font-cinzel tracking-[0.2em] uppercase text-gold-dim no-underline hover:text-gold transition-colors inline-block mb-6"
          style={{ fontSize: '0.72rem' }}
        >
          ← All Religions
        </Link>
        <div className="text-6xl mb-4">{religion.icon}</div>
        <span className="font-cinzel text-gold-dim tracking-[0.2em] uppercase block mb-2" style={{ fontSize: '0.72rem' }}>
          {religion.adherents}
        </span>
        <h1 className="font-cormorant font-light text-cream mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}>
          {religion.name} &amp; <em className="not-italic text-gold-light">Christianity</em>
        </h1>
        <p className="font-cormorant text-text-light max-w-xl mx-auto leading-relaxed" style={{ fontSize: '1.2rem' }}>
          {religion.description}
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        {/* Key comparison */}
        <div
          className="rounded-2xl p-7 mb-12"
          style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}
        >
          <p className="font-cinzel text-gold tracking-[0.2em] uppercase mb-4" style={{ fontSize: '0.72rem' }}>
            Key Differences
          </p>
          <ul className="list-none space-y-3">
            {religion.comparison_points.map((point, i) => (
              <li key={i} className="flex gap-3 text-text-light leading-relaxed" style={{ fontSize: '1rem' }}>
                <span className="text-gold flex-shrink-0">→</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Full content */}
        <div className="prose-faith">
          {religion.full_content
            ? renderContent(religion.full_content)
            : <p className="text-text-light leading-relaxed" style={{ fontSize: '1.05rem' }}>{religion.description}</p>
          }
        </div>

        {/* Navigation */}
        <div
          className="flex justify-between gap-6 mt-20 pt-10"
          style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
        >
          {prev ? (
            <Link href={`/religions/${prev.slug}`} className="no-underline group">
              <span className="font-cinzel text-gold-dim text-xs tracking-widest uppercase block mb-2 transition-colors group-hover:text-gold">← Previous</span>
              <span className="font-cormorant text-cream text-xl">{prev.name}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/religions/${next.slug}`} className="no-underline group text-right">
              <span className="font-cinzel text-gold-dim text-xs tracking-widest uppercase block mb-2 transition-colors group-hover:text-gold">Next →</span>
              <span className="font-cormorant text-cream text-xl">{next.name}</span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}