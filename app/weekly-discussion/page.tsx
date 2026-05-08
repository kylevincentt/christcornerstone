import type { Metadata } from 'next';
import Link from 'next/link';
import { DISCUSSIONS } from '@/lib/discussions';

export const metadata: Metadata = {
  title: 'Weekly Discussion',
  description:
    'Curated teachings and discussions to deepen your understanding of Christian doctrine and apologetics.',
};

export default function WeeklyDiscussionIndexPage() {
  // Newest first
  const sorted = [...DISCUSSIONS].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  return (
    <main className="min-h-screen" style={{ background: 'var(--midnight)', paddingTop: '7rem' }}>
      <div className="max-w-5xl mx-auto px-6 pb-24">
        {/* Header */}
        <div className="mb-12">
          <span className="section-label block mb-3">Faith &amp; Reason</span>
          <h1 className="section-title mb-4">Weekly Discussion</h1>
          <p
            className="font-lato text-text-light leading-relaxed max-w-2xl"
            style={{ fontSize: '1.05rem' }}
          >
            Every entry is a curated teaching — full video, written summary, key points,
            scripture references, and detailed outline. Listen in the browser or read along.
          </p>
        </div>

        {/* List */}
        <ul className="space-y-4 list-none p-0">
          {sorted.map((d) => {
            const formattedDate = new Date(d.date + 'T00:00:00').toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            const refsCount = d.scripture_references?.length ?? 0;
            const excerpt =
              d.summary.length > 220 ? d.summary.slice(0, 220).trim() + '…' : d.summary;
            return (
              <li key={d.id}>
                <Link
                  href={`/weekly-discussion/${d.slug}`}
                  className="flex flex-col sm:flex-row items-stretch gap-5 rounded-2xl p-4 sm:p-5 no-underline group transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: 'var(--deep-navy)',
                    border: '1px solid rgba(201,168,76,0.1)',
                  }}
                >
                  {/* Thumb */}
                  <div
                    className="flex-shrink-0 rounded-xl overflow-hidden"
                    style={{ width: '100%', maxWidth: '240px', aspectRatio: '16/9' }}
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${d.youtube_id}/mqdefault.jpg`}
                      alt={d.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span
                        className="font-cinzel text-gold tracking-[0.2em] uppercase"
                        style={{ fontSize: '0.62rem', opacity: 0.85 }}
                      >
                        {formattedDate}
                      </span>
                      <span style={{ color: 'rgba(201,168,76,0.3)' }}>&mdash;</span>
                      <span
                        className="font-cinzel text-gold-dim tracking-[0.2em] uppercase"
                        style={{ fontSize: '0.62rem' }}
                      >
                        {d.series}
                      </span>
                    </div>

                    <h2
                      className="font-cormorant text-cream group-hover:text-gold transition-colors duration-200 mb-2"
                      style={{ fontSize: '1.35rem', fontWeight: 600, lineHeight: 1.3 }}
                    >
                      {d.title}
                    </h2>

                    <p
                      className="font-lato text-text-light leading-relaxed mb-3"
                      style={{ fontSize: '0.92rem', lineHeight: 1.6 }}
                    >
                      {excerpt}
                    </p>

                    <div className="flex items-center gap-4 mt-auto">
                      <span
                        className="font-cinzel text-gold-dim tracking-[0.15em] uppercase"
                        style={{ fontSize: '0.6rem' }}
                      >
                        {refsCount} Scripture {refsCount === 1 ? 'ref' : 'refs'}
                      </span>
                      <span
                        className="font-cinzel text-gold-dim group-hover:text-gold transition-colors duration-200"
                        style={{ fontSize: '0.7rem' }}
                      >
                        Read &amp; Listen &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
