import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DISCUSSIONS, getDiscussionBySlug } from '@/lib/discussions';
import ScriptureRefsSection from '@/components/ScriptureRefsSection';
import DiscussionAudioPlayer from '@/components/DiscussionAudioPlayer';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return DISCUSSIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const discussion = getDiscussionBySlug(params.slug);
  if (!discussion) return { title: 'Discussion Not Found | ChristCornerstone' };
  return {
    title: `${discussion.title} | ChristCornerstone`,
    description: discussion.summary.slice(0, 160),
  };
}

export default function DiscussionPage({ params }: Props) {
  const discussion = getDiscussionBySlug(params.slug);
  if (!discussion) notFound();

  const otherDiscussions = DISCUSSIONS.filter((d) => d.slug !== params.slug);

  const formattedDate = new Date(discussion.date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Build the full text for the TTS player: summary + outline
  const ttsText = [
    discussion.summary,
    ...(discussion.outline?.flatMap((s) => [s.heading + '.', ...s.points]) ?? []),
  ].join(' ');

  return (
    <main className="min-h-screen" style={{ background: 'var(--midnight)', paddingTop: '7rem' }}>
      <div className="max-w-3xl mx-auto px-6 pb-24">
        {/* Back link */}
        <Link
          href="/#weekly-discussion"
          className="font-cinzel text-gold-dim tracking-[0.15em] uppercase no-underline hover:text-gold transition-colors duration-200 flex items-center gap-2 mb-10"
          style={{ fontSize: '0.7rem' }}
        >
          &larr; Back
        </Link>

        {/* Date & label */}
        <div className="flex items-center gap-3 mb-5">
          <span className="font-cinzel text-gold tracking-[0.2em] uppercase" style={{ fontSize: '0.72rem', opacity: 0.85 }}>
            {formattedDate}
          </span>
          <span style={{ color: 'rgba(201,168,76,0.3)' }}>&mdash;</span>
          <span className="font-cinzel text-gold-dim tracking-[0.2em] uppercase" style={{ fontSize: '0.72rem' }}>
            {discussion.series}
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-cormorant text-cream mb-10"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.2 }}
        >
          {discussion.title}
        </h1>

        {/* Key points */}
        {discussion.key_points && discussion.key_points.length > 0 && (
          <div
            className="rounded-xl px-7 py-6 mb-8"
            style={{ background: 'var(--deep-navy)', borderLeft: '3px solid rgba(201,168,76,0.5)' }}
          >
            <h2 className="font-cinzel tracking-[0.25em] uppercase mb-5" style={{ fontSize: '0.72rem', color: 'var(--cream)' }}>
              Key Points
            </h2>
            <ul className="space-y-3">
              {discussion.key_points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-cinzel text-gold mt-0.5 flex-shrink-0" style={{ fontSize: '0.65rem', opacity: 0.7 }}>
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

        {/* YouTube embed */}
        <div className="mb-10">
          <h2 className="font-cinzel tracking-[0.25em] uppercase mb-5" style={{ fontSize: '0.72rem', color: 'var(--cream)' }}>
            Watch the Full Discussion
          </h2>
          <div
            className="relative w-full rounded-xl overflow-hidden shadow-2xl"
            style={{ paddingBottom: '56.25%', background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.14)' }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${discussion.youtube_id}`}
              title={discussion.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
            />
          </div>
        </div>

        {/* Summary with TTS player */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
            <h2 className="font-cinzel tracking-[0.25em] uppercase" style={{ fontSize: '0.72rem', color: 'var(--cream)' }}>
              Summary
            </h2>
            <DiscussionAudioPlayer text={ttsText} />
          </div>
          {discussion.summary.split('\n\n').map((para, i) => (
            <p key={i} className="font-lato text-text-light leading-relaxed mb-4" style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
              {para.trim()}
            </p>
          ))}
        </div>

        {/* Scripture references */}
        {discussion.scripture_references.length > 0 && (
          <div className="mb-10">
            <h2 className="font-cinzel tracking-[0.25em] uppercase mb-4" style={{ fontSize: '0.72rem', color: 'var(--cream)' }}>
              Scripture References
            </h2>
            <ScriptureRefsSection references={discussion.scripture_references} />
          </div>
        )}

        {/* Detailed Outline */}
        {discussion.outline && discussion.outline.length > 0 && (
          <div className="mb-14">
            <h2 className="font-cinzel tracking-[0.25em] uppercase mb-6" style={{ fontSize: '0.72rem', color: 'var(--cream)' }}>
              Detailed Outline
            </h2>
            <div className="space-y-6">
              {discussion.outline.map((section, si) => (
                <div
                  key={si}
                  className="rounded-xl px-7 py-6"
                  style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.08)' }}
                >
                  <h3 className="font-cinzel text-gold mb-4" style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}>
                    {section.heading}
                  </h3>
                  <ul className="space-y-3">
                    {section.points.map((point, pi) => (
                      <li key={pi} className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-2 rounded-full bg-gold" style={{ width: '4px', height: '4px', opacity: 0.5 }} />
                        <span className="font-lato text-text-light leading-relaxed" style={{ fontSize: '0.97rem', lineHeight: 1.75 }}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* More discussions */}
        {otherDiscussions.length > 0 && (
          <div className="pt-10" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
            <h2 className="font-cinzel tracking-[0.25em] uppercase mb-6" style={{ fontSize: '0.72rem', color: 'var(--cream)' }}>
              More Weekly Discussions
            </h2>
            <div className="space-y-3">
              {otherDiscussions.map((d) => {
                const date = new Date(d.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                return (
                  <Link
                    key={d.id}
                    href={`/weekly-discussion/${d.slug}`}
                    className="flex items-center gap-4 rounded-xl p-4 no-underline group transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'var(--deep-navy)', border: '1px solid rgba(201,168,76,0.08)' }}
                  >
                    <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: '80px', height: '52px' }}>
                      <img src={`https://i.ytimg.com/vi/${d.youtube_id}/mqdefault.jpg`} alt={d.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-cinzel text-gold-dim tracking-[0.15em] uppercase block mb-1" style={{ fontSize: '0.6rem' }}>{date}</span>
                      <h3 className="font-cormorant text-cream transition-colors duration-200 group-hover:text-gold truncate" style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.3 }}>
                        {d.title}
                      </h3>
                    </div>
                    <span className="font-cinzel text-gold-dim group-hover:text-gold transition-colors duration-200 flex-shrink-0" style={{ fontSize: '0.75rem' }}>&rarr;</span>
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
