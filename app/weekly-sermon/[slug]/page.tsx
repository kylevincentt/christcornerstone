import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSermonBySlug, getWeeklySermons } from '@/lib/content';
import SermonAudioPlayer from '@/components/SermonAudioPlayer';

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
  const [sermon, allSermons] = await Promise.all([
    getSermonBySlug(params.slug),
    getWeeklySermons(),
  ]);
  if (!sermon) notFound();

  const otherSermons = allSermons.filter((s) => s.slug !== params.slug);

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

        {/* YouTube embed — directly under Key Points */}
        <div className="mb-10">
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

        {/* Summary — with TTS player */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
            <h2
              className="font-cinzel text-gold tracking-[0.25em] uppercase"
              style={{ fontSize: '0.72rem' }}
            >
              Sermon Summary
            </h2>
            <SermonAudioPlayer
              summary={sermon.summary}
              additionalContext={sermon.additional_context ?? undefined}
            />
          </div>
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

        {/* Going Deeper / additional context */}
        {sermon.additional_context && (
          <div
            className="rounded-xl px-7 py-6 mb-14"
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

        {/* Previous Sermons */}
        {otherSermons.length > 0 && (
          <div
            className="pt-10"
            style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
          >
            <h2
              className="font-cinzel text-gold tracking-[0.25em] uppercase mb-6"
              style={{ fontSize: '0.72rem' }}
            >
              More Sunday Sermons
            </h2>
            <div className="space-y-3">
              {otherSermons.map((s) => {
                const d = new Date(s.sermon_date + 'T00:00:00').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });
                return (
                  <Link
                    key={s.id}
                    href={`/weekly-sermon/${s.slug}`}
                    className="flex items-center gap-4 rounded-xl p-4 no-underline group transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: 'var(--deep-navy)',
                      border: '1px solid rgba(201,168,76,0.08)',
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      className="flex-shrink-0 rounded-lg overflow-hidden"
                      style={{ width: '80px', height: '52px' }}
                    >
                      <img
                        src={`https://i.ytimg.com/vi/${s.youtube_id}/mqdefault.jpg`}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <span
                        className="font-cinzel text-gold-dim tracking-[0.15em] uppercase block mb-1"
                        style={{ fontSize: '0.6rem' }}
                      >
                        {d}
                      </span>
                      <h3
                        className="font-cormorant text-cream transition-colors duration-200 group-hover:text-gold truncate"
                        style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.3 }}
                      >
                        {s.title}
                      </h3>
                    </div>
                    <span className="font-cinzel text-gold-dim group-hover:text-gold transition-colors duration-200 flex-shrink-0" style={{ fontSize: '0.75rem' }}>
                      &rarr;
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
