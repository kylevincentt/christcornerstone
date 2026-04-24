import HeroSection from '@/components/sections/Hero';
import DoctrineSection from '@/components/sections/DoctrineSection';
import ApologeticsSection from '@/components/sections/ApologeticsSection';
import ScriptureSection from '@/components/sections/ScriptureSection';
import LibrarySection from '@/components/sections/LibrarySection';
import ReligionsSection from '@/components/sections/ReligionsSection';
import QuotesSection from '@/components/sections/QuotesSection';
import {
  getDailyVerse,
  getDoctrines,
  getApologeticsQuestions,
  getApologeticsCategories,
  getReligions,
  getQuotes,
  getLibraryItems,
} from '@/lib/content';

export default async function HomePage() {
  // Fetch everything in parallel — they're independent.
  const [verse, doctrines, apoloQs, apoloCats, religions, quotes, library] = await Promise.all([
    getDailyVerse(),
    getDoctrines(),
    getApologeticsQuestions(),
    getApologeticsCategories(),
    getReligions(),
    getQuotes(),
    getLibraryItems(),
  ]);

  return (
    <>
      <HeroSection verse={verse} />

      {/* C.S. Lewis quote divider */}
      <div
        className="text-center py-20 px-8 relative overflow-hidden"
        style={{ background: 'var(--midnight)', borderTop: '1px solid rgba(201,168,76,0.08)' }}
      >
        <div
          className="absolute top-[-2rem] left-1/2 -translate-x-1/2 pointer-events-none font-cormorant leading-none"
          style={{ fontSize: '18rem', color: 'rgba(201,168,76,0.04)' }}
        >
          &ldquo;
        </div>
        <blockquote
          className="font-cormorant font-light text-cream max-w-3xl mx-auto mb-6 relative"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1.5 }}
        >
          I believe in Christianity as I believe that the sun has risen — not only because I see it, but because by it I see everything else.
        </blockquote>
        <p className="font-cinzel text-[0.8rem] tracking-[0.25em] uppercase text-gold-dim">— C.S. Lewis</p>
      </div>

      <DoctrineSection doctrines={doctrines} />
      <ApologeticsSection questions={apoloQs} categories={apoloCats} />
      <ScriptureSection />
      <LibrarySection items={library} />
      <ReligionsSection religions={religions} />
      <QuotesSection quotes={quotes} />
    </>
  );
}
