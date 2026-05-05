import AnimateOnScroll from '@/components/AnimateOnScroll';
import SermonCardScroller from '@/components/SermonCardScroller';

interface Discussion {
  id: string;
  youtube_id: string;
  title: string;
  date: string;
  summary: string;
  scripture_references: string[];
  series: string;
}

// Add new discussion videos here as they are curated.
const DISCUSSIONS: Discussion[] = [
  {
    id: '1',
    youtube_id: 'wvb7IoEv5oc',
    title: 'Doctrine of Christ Part 1: The Incarnation',
    date: '2026-05-04',
    series: 'Defenders · Reasonable Faith',
    summary:
      'Dr. William Lane Craig opens his Defenders series on the Doctrine of Christ by examining the Incarnation — the eternal Son of God taking on human flesh. Craig explores the philosophical and theological depth of Jesus being fully God and fully man, drawing on the Chalcedonian definition and key New Testament texts to ground this central mystery of the Christian faith.',
    scripture_references: ['John 1:14', 'Phil. 2:6–8', 'Col. 2:9'],
  },
];

function DiscussionCard({ discussion }: { discussion: Discussion }) {
  const formattedDate = new Date(discussion.date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const excerpt =
    discussion.summary.length > 260
      ? discussion.summary.slice(0, 260).trim() + '…'
      : discussion.summary;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${discussion.youtube_id}`}
      target="_blank"
      rel="noopener noreferrer"
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
        {/* Thumbnail */}
        <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height: '200px' }}>
          <img
            src={`https://i.ytimg.com/vi/${discussion.youtube_id}/maxresdefault.jpg`}
            alt={discussion.title}
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
              Weekly Discussion
            </span>
          </div>

          <h3
            className="font-cormorant text-cream mb-2 transition-colors duration-300 group-hover:text-gold"
            style={{ fontSize: '1.45rem', fontWeight: 600, lineHeight: 1.3 }}
          >
            {discussion.title}
          </h3>

          <p
            className="font-cinzel text-gold-dim mb-3"
            style={{ fontSize: '0.62rem', letterSpacing: '0.15em', opacity: 0.7 }}
          >
            {discussion.series}
          </p>

          <p className="text-text-light leading-relaxed mb-5 flex-1" style={{ fontSize: '0.95rem', lineHeight: 1.75 }}>
            {excerpt}
          </p>

          {discussion.scripture_references.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {discussion.scripture_references.map((ref) => (
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
    </a>
  );
}

export default function WeeklyDiscussionSection() {
  return (
    <section
      id="weekly-discussion"
      className="py-10"
      style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}
    >
      <AnimateOnScroll>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 px-4 sm:px-8 md:px-16">
          <div>
            <span className="section-label">Faith &amp; Reason</span>
            <h2 className="section-title">Weekly Discussion</h2>
            <p className="text-text-light leading-relaxed max-w-lg mt-3" style={{ fontSize: '1.05rem' }}>
              Curated teachings and discussions to deepen your understanding of Christian doctrine and apologetics.
            </p>
          </div>
        </div>

        {/* Horizontal scroll */}
        <SermonCardScroller>
          <div
            className="flex gap-5 pb-4"
            style={{ paddingLeft: 'clamp(1rem, 4vw, 4rem)', paddingRight: 'clamp(1rem, 4vw, 4rem)' }}
          >
            {DISCUSSIONS.map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
            <div className="flex-shrink-0" style={{ width: '1px' }} />
          </div>
        </SermonCardScroller>
      </AnimateOnScroll>
    </section>
  );
}
