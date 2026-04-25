import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Videos | ChristCornerstone',
  description:
    'Watch curated apologetics and theology videos with commentary — equipping you to know and defend the Christian faith.',
};

const VIDEOS = [
  {
    id: 'G1XJ7DeR5fc',
    title: 'Why I Choose to Believe the Bible — Voddie Baucham',
    commentary: `Voddie Baucham famously summarizes his reason for believing the Bible with a specific, concise definition: "I choose to believe the Bible because it is a reliable collection of historical documents written by eyewitnesses during the lifetime of other eyewitnesses. They report supernatural events that took place in fulfillment of specific prophecies and claim that their writings are divine rather than human in origin."`,
  },
];

export default function VideosPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--midnight)', paddingTop: '7rem' }}>
      {/* Page header */}
      <div className="text-center px-8 pb-16">
        <p className="font-cinzel text-[0.75rem] tracking-[0.35em] uppercase text-gold mb-4 opacity-80">
          ChristCornerstone
        </p>
        <h1
          className="font-cormorant font-light text-cream mb-4"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.15 }}
        >
          Videos
        </h1>
        <p className="font-lato text-text-muted max-w-xl mx-auto" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
          Apologetics, theology, and faith — watch, learn, and be equipped.
        </p>
        <div className="w-16 h-px bg-gold mx-auto mt-8" style={{ opacity: 0.4 }} />
      </div>

      {/* Video list */}
      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-20">
        {VIDEOS.map((video) => (
          <article key={video.id}>
            {/* 16:9 responsive YouTube embed */}
            <div
              className="relative w-full rounded-xl overflow-hidden shadow-2xl mb-8"
              style={{
                paddingBottom: '56.25%',
                background: 'var(--deep-navy)',
                border: '1px solid rgba(201,168,76,0.14)',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
              />
            </div>

            {/* Video title */}
            <h2
              className="font-cormorant font-semibold text-cream mb-6"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: 1.3 }}
            >
              {video.title}
            </h2>

            {/* Commentary */}
            <div
              className="rounded-lg px-7 py-6"
              style={{
                background: 'var(--deep-navy)',
                borderLeft: '3px solid rgba(201,168,76,0.45)',
              }}
            >
              <p className="font-lato text-text-light leading-relaxed" style={{ fontSize: '1.05rem' }}>
                {video.commentary}
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
