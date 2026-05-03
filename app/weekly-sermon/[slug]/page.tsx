import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSermonBySlug, getWeeklySermons } from '@/lib/content';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const sermons = await getWeeklySermons();
  return sermons.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sermon = await getSermonBySlug(params.slug);
  if (!sermon) return { title: 'Sermon Not Found | ChristCornerstone' };
  return {
    title: `${sermon.title} | ChristCornerstone`,
    description: sermon.summary.slice(0, 160),
  };
}

export default async function SermonPage({ params }: Props) {
  const sermon = await getSermonBySlug(params.slug);
  if (!sermon) notFound();

  const formattedDate = new Date(sermon.sermon_date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen" style={{ background: 'var(--midnight)', paddingTop: '7rem' }}>
      <div className="max-w-3xl mx-auto px-6 pb-24">
        {/* Back link */}
        <Link
          href="/weekly-sermon"
          className="font-cinzel text-gold-dim tracking-[0.15em] uppercase no-underline hover:text-gold transition-colors duration-200 flex items-center gap-2 mb-10"
          style={{ fontSize: '0.7rem' }}
        >
          &larr; All Sermons
        </Link>

        {/* Date & label */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className="font-cinzel text-gold tracking-[0.2em] uppercase"
            style={{ fontSize: '0.72rem', opacity: 0.85 }}
          >
            {formattedDate}
          </span>
          <span style={{ color: 'rgba(201,168,76,0.3)' }}>&mdash;</span>
          <span
            className="font-cinzel text-gold-dim tracking-[0.2em] uppercase"
            style={{ fontSize: '0.72rem' }}
          >
            Grace Life Community Church
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-cormorant text-cream mb-10"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.2 }}
        >
          {sermon.title}
        </h1>

        {/* Key points */}
        {sermon.key_points && sermon.key_points.length > 0 && (
          <div
            className="rounded-xl px-7 py-6 mb-8"
            style={{
              background: 'var(--deep-navy)',
              borderLeft: '3px solid rgba(201,168,76,0.5)',
            }}
          >
            <h2
              className="font-cinzel text-gold tracking-[0.25em] uppercase mb-5"
              style={{ fontSize: '0.72rem' }}
            >
              Key Points
            </h2>
            <ul className="space-y-3">
              {sermon.key_points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="font-cinzel text-gold mt-0.5 flex-shrink-0"
                    style={{ fontSize: '0.65rem', opacity: 0.7 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-lato text-text-light leading-relaxed" style={{ fontSize: '1rem' }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Summary */}
        <div className="mb-8">
          <h2
            className="font-cinzel text-gold tracking-[0.25em] uppercase mb-5"
            style={{ fontSize: '0.72rem' }}
          >
            Sermon Summary
          </h2>
          {sermon.summary.split('\n\n').map((para, i) => (
            <p
              key={i}
              className="font-lato text-text-light leading-relaxed mb-4"
              style={{ fontSize: '1.05rem', lineHeight: 1.8 }}
            >
              {para.trim()}
            </p>
          ))}
        </div>

        {/* Scripture references */}
        {sermon.scripture_references && sermon.scripture_references.length > 0 && (
          <div className="mb-10">
            <h2
              className="font-cinzel text-gold tracking-[0.25em] uppercase mb-4"
              style={{ fontSize: '0.72rem' }}
            >
              Scripture References
            </h2>
            <div className="flex flex-wrap gap-2">
              {sermon.scripture_references.map((ref) => (
                <span
                  key={ref}
                  className="font-cinzel text-gold-dim tracking-[0.15em] uppercase rounded-full px-4 py-2"
                  style={{
                    fontSize: '0.67rem',
                    border: '1px solid rgba(201,168,76,0.25)',
                    background: 'rgba(201,168,76,0.05)',
                  }}
                >
                  {ref}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Additional context */}
        {sermon.additional_context && (
          <div
            className="rounded-xl px-7 py-6 mb-12"
            style={{
              background: 'rgba(201,168,76,0.04)',
              border: '1px solid rgba(201,168,76,0.12)',
            }}
          >
            <h2
              className="font-cinzel text-gold tracking-[0.25em] uppercase mb-5"
              style={{ fontSize: '0.72rem' }}
            >
              Going Deeper
            </h2>
            {sermon.additional_context.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="font-lato text-text-light leading-relaxed mb-4 last:mb-0"
                style={{ fontSize: '1rem', lineHeight: 1.8, opacity: 0.9 }}
              >
                {para.trim()}
              </p>
            ))}
          </div>
        )}

        {/* YouTube embed — at the bottom */}
        <div>
          <h2
            className="font-cinzel text-gold tracking-[0.25em] uppercase mb-5"
            style={{ fontSize: '0.72rem' }}
          >
            Watch the Full Sermon
          </h2>
          <div
            className="relative w-full rounded-xl overflow-hidden shadow-2xl"
            style={{
              paddingBottom: '56.25%',
              background: 'var(--deep-navy)',
              border: '1px solid rgba(201,168,76,0.14)',
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${sermon.youtube_id}`}
              title={sermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
