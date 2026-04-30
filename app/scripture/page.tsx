import type { Metadata } from 'next';
import ScriptureSection from '@/components/sections/ScriptureSection';

export const metadata: Metadata = {
  title: 'Scripture Explorer — ChristCornerstone',
  description: 'Search the Bible by topic or browse every book. Every book linked to trusted study resources.',
};

export default function ScripturePage() {
  return (
    <div style={{ paddingTop: '6rem' }}>
      <div
        className="text-center py-10 px-8 relative overflow-hidden"
        style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '600px', height: '600px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
          }}
        />
        <span className="section-label">The Living Word</span>
        <h1 className="font-cormorant font-light text-cream mt-2 mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}>
          Scripture <em className="not-italic text-gold-light">Explorer</em>
        </h1>
        <p className="font-cormorant text-text-light max-w-xl mx-auto leading-relaxed" style={{ fontSize: '1.3rem' }}>
          Search by topic, or browse the Bible book by book. Every book linked to trusted ESV study resources.
        </p>
      </div>
      <div style={{ borderTop: 'none' }}>
        <ScriptureSection hideHeader />
      </div>
    </div>
  );
}
