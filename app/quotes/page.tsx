import type { Metadata } from 'next';
import QuotesSection from '@/components/sections/QuotesSection';
import { getQuotes } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Christian Quotes',
  description: 'Words of wisdom from saints, scholars, reformers, and seekers — across 2,000 years of Christian thought.',
};

export default async function QuotesPage() {
  const quotes = await getQuotes();
  return (
    <div style={{ paddingTop: '6rem' }}>
      <div
        className="text-center py-20 px-8 relative overflow-hidden"
        style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '600px', height: '600px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
          }}
        />
        <span className="section-label">Voices Through the Ages</span>
        <h1 className="font-cormorant font-light text-cream mt-2 mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}>
          Famous Christian <em className="not-italic text-gold-light">Quotes</em>
        </h1>
        <p className="font-cormorant text-text-light max-w-xl mx-auto leading-relaxed" style={{ fontSize: '1.3rem' }}>
          Words of wisdom from saints, scholars, reformers, and seekers — across 2,000 years of Christian thought.
        </p>
      </div>
      <QuotesSection quotes={quotes} hideHeader />
    </div>
  );
}
