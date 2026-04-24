import type { Metadata } from 'next';
import LibrarySection from '@/components/sections/LibrarySection';
import { getLibraryItems } from '@/lib/content';

export const metadata: Metadata = {
  title: 'The Library',
  description: 'Trusted tools, theologians, Bibles, and media — carefully curated to deepen your walk with God.',
};

export default async function LibraryPage() {
  const items = await getLibraryItems();
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
        <span className="section-label">Curated Resources</span>
        <h1 className="font-cormorant font-light text-cream mt-2 mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}>
          The <em className="not-italic text-gold-light">Library</em>
        </h1>
        <p className="font-cormorant text-text-light max-w-xl mx-auto leading-relaxed" style={{ fontSize: '1.3rem' }}>
          Trusted tools, theologians, and materials — carefully selected to deepen your walk with God.
        </p>
      </div>
      <LibrarySection items={items} />
    </div>
  );
}
