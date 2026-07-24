import type { Metadata } from 'next';
import RevelationStudy from '@/components/RevelationStudy';

export const metadata: Metadata = {
  title: 'Revelation Study',
  description:
    'An interactive, section-by-section study of the book of Revelation — summaries, symbols, themes, and the four classic interpretations (Preterist, Historicist, Futurist, Idealist) laid side by side for beginners and seasoned students alike.',
  alternates: { canonical: '/revelation-study' },
  openGraph: {
    title: 'Revelation Study — ChristCornerstone',
    description:
      'Walk through the book of Revelation section by section, with the four classic interpretations, a symbol glossary, and its major theological themes.',
    url: '/revelation-study',
    type: 'article',
  },
};

export default function RevelationStudyPage() {
  return (
    <div style={{ paddingTop: '6rem' }}>
      {/* Header */}
      <div
        className="text-center py-10 px-6 relative overflow-hidden"
        style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
          }}
        />
        <span className="section-label">A Guided Study Tool</span>
        <h1
          className="font-cormorant font-light text-cream mt-2 mb-4"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}
        >
          Revelation <em className="not-italic text-gold-light">Study</em>
        </h1>
        <p className="font-cormorant text-text-light max-w-2xl mx-auto leading-relaxed" style={{ fontSize: '1.3rem' }}>
          Walk through the Bible’s final book section by section — its summary, symbols, and themes, with
          the four classic interpretations set side by side. Built for the curious beginner and the
          seasoned student alike.
        </p>
      </div>

      <div className="pt-8">
        <RevelationStudy />
      </div>
    </div>
  );
}
