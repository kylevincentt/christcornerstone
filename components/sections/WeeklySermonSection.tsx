import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import SermonCardScroller from '@/components/SermonCardScroller';
import type { WeeklySermon } from '@/types';

interface Props {
  sermons: WeeklySermon[];
}

function SermonCard({ sermon }: { sermon: WeeklySermon }) {
  const formattedDate = new Date(sermon.sermon_date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const excerpt =
    sermon.summary.length > 260
      ? sermon.summary.slice(0, 260).trim() + '…'
      : sermon.summary;

  return (
    <Link
      href={`/weekly-sermon/${sermon.slug}`}
      className="block no-underline group flex-shrink-0"
      style={{ width: '380px', scrollSnapAlign: 'start' } as React.CSSProperties}
    >
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: 'var(--deep-navy)',
          border: '1px solid rgba(201,168,76,0.1)',
          boxShadow: '0 4px 40px rgba(0,0,0,0.3)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Thumbnail banner */}
        <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height: '200px' }}>
          <img
            src={`https://i.ytimg.com/vi/${sermon.youtube_id}/maxresdefault.jpg`}
            alt={sermon.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ opacity: 0.75 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, transparent 30%, var(--deep-navy) 100%), linear-gradient(to right, rgba(8,12,22,0.5) 0%, transparent 60%)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{
                background: 'rgba(201,168,76,0.92)',
                boxShadow: '0 0 30px rgba(201,168,76,0.35)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--midnight)" style={{ marginLeft: '3px' }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="font-cinzel text-gold tracking-[0.2em] uppercase"
              style={{ fontSize: '0.65rem', opacity: 0.85 }}
            >
              {formattedDate}
            </span>
            <span style={{ color: 'rgba(201,168,76,0.3)' }}>&mdash;</span>
            <span
              className="font-cinzel text-gold-dim tracking-[0.2em] uppercase"
              style={{ fontSize: '0.65rem' }}
            >
              Sunday Sermon
            </span>
          </div>

          <h3
            className="font-cormorant text-cream mb-3 transition-colors duration-300 group-hover:text-gold"
            style={{ fontSize: '1.45rem', fontWeight: 600, lineHeight: 1.3 }}
          >
            {sermon.title}
          </h3>

          <p className="text-text-light leading-relaxed mb-5 flex-1" style={{ fontSize: '0.95rem', lineHeight: 1.75 }}>
            {excerpt}
          </p>

          {sermon.scripture_references && sermon.scripture_references.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {sermon.scripture_references.slice(0, 4).map((ref) => (
                <span
                  key={ref}
                  className="font-cinzel text-gold-dim tracking-[0.15em] uppercase rounded-full px-3 py-1"
                  style={{
                    fontSize: '0.6rem',
                    border: '1px solid rgba(201,168,76,0.2)',
                    background: 'rgba(201,168,76,0.04)',
                  }}
                >
                  {ref}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function WeeklySermonSection({ sermons }: Props) {
  if (!sermons || sermons.length === 0) return null;

  return (
    <section
      id="weekly-sermon"
      className="py-10"
      style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}
    >
      <AnimateOnScroll>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 px-4 sm:px-8 md:px-16">
          <div>
            <span className="section-label">Grace Life Community Church</span>
            <h2 className="section-title">Sunday Sermons</h2>
            <p className="text-text-light leading-relaxed max-w-lg mt-3" style={{ fontSize: '1.05rem' }}>
              Each Sunday&apos;s message, summarized to capture the heart of the teaching.
            </p>
          </div>
          <Link
            href="/weekly-sermon"
            className="font-cinzel font-bold tracking-[0.12em] uppercase text-gold bg-transparent px-6 py-3 rounded-full no-underline transition-all hover:bg-[rgba(201,168,76,0.08)] whitespace-nowrap self-start md:self-end"
            style={{ fontSize: '0.65rem', border: '1px solid rgba(201,168,76,0.4)' }}
          >
            All Sermons &rarr;
          </Link>
        </div>

        {/* Horizontal scroll with arrow */}
        <SermonCardScroller>
          <div
            className="flex gap-5 pb-4"
            style={{ paddingLeft: 'clamp(1rem, 4vw, 4rem)', paddingRight: 'clamp(1rem, 4vw, 4rem)' }}
          >
            {sermons.map((sermon) => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))}
            {/* Trailing spacer so last card doesn't sit flush against edge */}
            <div className="flex-shrink-0" style={{ width: '1px' }} />
          </div>
        </SermonCardScroller>
      </AnimateOnScroll>
    </section>
  );
}
