import type { Metadata } from 'next';
import Link from 'next/link';
import { getWeeklySermons } from '@/lib/content';
import type { WeeklySermon } from '@/types';

export const metadata: Metadata = {
  title: 'Sunday Sermons | ChristCornerstone',
  description:
    "Sunday sermon summaries from Grace Life Community Church — capturing the heart of each Sunday's message.",
};

function SermonCard({ sermon }: { sermon: WeeklySermon }) {
  const formattedDate = new Date(sermon.sermon_date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const excerpt =
    sermon.summary.length > 200 ? sermon.summary.slice(0, 200).trim() + '…' : sermon.summary;

  return (
    <Link href={`/weekly-sermon/${sermon.slug}`} className="block no-underline group">
      <article
        className="flex gap-6 rounded-2xl overflow-hidden p-6 transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: 'var(--deep-navy)',
          border: '1px solid rgba(201,168,76,0.08)',
        }}
      >
        {/* Thumbnail */}
        <div
          className="flex-shrink-0 rounded-xl overflow-hidden relative"
          style={{ width: '140px', height: '90px' }}
        >
          <img
            src={`https://i.ytimg.com/vi/${sermon.youtube_id}/mqdefault.jpg`}
            alt={sermon.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(8,12,22,0.3)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(201,168,76,0.85)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--midnight)" style={{ marginLeft: '2px' }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <span
            className="font-cinzel text-gold-dim tracking-[0.2em] uppercase block mb-2"
            style={{ fontSize: '0.65rem' }}
          >
            {formattedDate}
          </span>
          <h3
            className="font-cormorant text-cream mb-2 transition-colors duration-300 group-hover:text-gold"
            style={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: 1.3 }}
          >
            {sermon.title}
          </h3>
          <p className="text-text-muted leading-relaxed" style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>
            {excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default async function WeeklySermonPage() {
  const sermons = await getWeeklySermons();

  return (
    <main className="min-h-screen" style={{ background: 'var(--midnight)', paddingTop: '7rem' }}>
      {/* Page header */}
      <div className="text-center px-8 pb-16">
        <p className="font-cinzel text-[0.75rem] tracking-[0.35em] uppercase text-gold mb-4 opacity-80">
          Grace Life Community Church
        </p>
        <h1
          className="font-cormorant font-light text-cream mb-4"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.15 }}
        >
          Sunday Sermons
        </h1>
        <p className="font-lato text-text-muted max-w-xl mx-auto" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
          Each Sunday&apos;s message, summarized to capture the heart of the teaching.
        </p>
        <div className="w-16 h-px bg-gold mx-auto mt-8" style={{ opacity: 0.4 }} />
      </div>

      {/* Sermon list */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        {sermons.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-cormorant text-text-muted" style={{ fontSize: '1.3rem' }}>
              Sermon summaries will appear here each Sunday.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {sermons.map((sermon) => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
