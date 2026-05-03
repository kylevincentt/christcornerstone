import Link from 'next/link';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import type { WeeklySermon } from '@/types';

interface Props {
  sermon: WeeklySermon | null;
}

export default function WeeklySermonSection({ sermon }: Props) {
  if (!sermon) return null;

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
    <section
      id="weekly-sermon"
      className="py-10 px-4 sm:px-8 md:px-16"
      style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}
    >
      <AnimateOnScroll>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="section-label">Grace Life Community Church</span>
              <h2 className="section-title">Weekly Sermon</h2>
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

          {/* Card */}
          <Link href={`/weekly-sermon/${sermon.slug}`} className="block no-underline group">
            <div
              className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'var(--deep-navy)',
                border: '1px solid rgba(201,168,76,0.1)',
                boxShadow: '0 4px 40px rgba(0,0,0,0.3)',
              }}
            >
              {/* Thumbnail banner */}
              <div
                className="relative w-full overflow-hidden"
                style={{ height: '220px' }}
              >
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
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(201,168,76,0.92)',
                      boxShadow: '0 0 30px rgba(201,168,76,0.35)',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--midnight)" style={{ marginLeft: '3px' }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-7">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-cinzel text-gold tracking-[0.2em] uppercase"
                    style={{ fontSize: '0.7rem', opacity: 0.85 }}
                  >
                    {formattedDate}
                  </span>
                  <span style={{ color: 'rgba(201,168,76,0.3)' }}>&mdash;</span>
                  <span
                    className="font-cinzel text-gold-dim tracking-[0.2em] uppercase"
                    style={{ fontSize: '0.7rem' }}
                  >
                    Weekly Sermon
                  </span>
                </div>

                <h3
                  className="font-cormorant text-cream mb-4 transition-colors duration-300 group-hover:text-gold"
                  style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 600, lineHeight: 1.3 }}
                >
                  {sermon.title}
                </h3>

                <p className="text-text-light leading-relaxed mb-6" style={{ fontSize: '1rem', lineHeight: 1.75 }}>
                  {excerpt}
                </p>

                {sermon.scripture_references && sermon.scripture_references.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {sermon.scripture_references.slice(0, 5).map((ref) => (
                      <span
                        key={ref}
                        className="font-cinzel text-gold-dim tracking-[0.15em] uppercase rounded-full px-4 py-1"
                        style={{
                          fontSize: '0.65rem',
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
        </div>
      </AnimateOnScroll>
    </section>
  );
}
