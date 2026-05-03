import Link from 'next/link';
import HeroSection from '@/components/sections/Hero';
import DoctrineSection from '@/components/sections/DoctrineSection';
import ApologeticsSection from '@/components/sections/ApologeticsSection';
import ScriptureSection from '@/components/sections/ScriptureSection';
import LibrarySection from '@/components/sections/LibrarySection';
import ReligionsSection from '@/components/sections/ReligionsSection';
import QuotesSection from '@/components/sections/QuotesSection';
import WeeklySermonSection from '@/components/sections/WeeklySermonSection';
import {
  getDailyVerse,
  getDoctrines,
  getApologeticsQuestions,
  getApologeticsCategories,
  getReligions,
  getQuotes,
  getLibraryItems,
  getWeeklySermons,
} from '@/lib/content';

export default async function HomePage() {
  const [verse, doctrines, apoloQs, apoloCats, religions, quotes, library, sermons] = await Promise.all([
    getDailyVerse(),
    getDoctrines(),
    getApologeticsQuestions(),
    getApologeticsCategories(),
    getReligions(),
    getQuotes(),
    getLibraryItems(),
    getWeeklySermons(),
  ]);

  return (
    <>
      <HeroSection />

      {/* Video promo card */}
      <Link href="/videos" className="block no-underline group" aria-label="Watch: Why Should I Believe the Bible?">
        <div
          className="text-center py-8 px-8 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--deep-navy) 0%, var(--midnight) 100%)',
            borderTop: '1px solid rgba(201,168,76,0.1)',
            borderBottom: '1px solid rgba(201,168,76,0.1)',
          }}
        >
          <div
            className="absolute right-[-80px] top-[-80px] pointer-events-none select-none"
            style={{
              width: '400px',
              height: '400px',
              background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <p className="font-cinzel text-[0.7rem] tracking-[0.3em] uppercase text-gold mb-4 relative" style={{ opacity: 0.7 }}>
            Featured Video
          </p>

          <h2
            className="font-cormorant font-semibold text-cream max-w-2xl mx-auto mb-4 relative transition-colors duration-300 group-hover:text-gold"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', lineHeight: 1.35 }}
          >
            Why Should I Believe the Bible?
          </h2>

          <p
            className="font-lato text-text-light max-w-2xl mx-auto mb-6 relative"
            style={{ fontSize: '1rem', lineHeight: 1.75 }}
          >
            &ldquo;I choose to believe the Bible because it is a reliable collection of historical documents written by
            eyewitnesses during the lifetime of other eyewitnesses.&rdquo;
          </p>

          <span className="relative inline-flex items-center gap-2 font-cinzel text-[0.75rem] tracking-[0.2em] uppercase text-gold rounded-full px-7 py-3 transition-all duration-300 group-hover:bg-gold group-hover:text-midnight"
            style={{ border: '1px solid rgba(201,168,76,0.35)' }}>
            See More <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </Link>

      <WeeklySermonSection sermons={sermons} />

      <DoctrineSection doctrines={doctrines} />
      <ApologeticsSection questions={apoloQs} categories={apoloCats} />
      <ScriptureSection />
      <LibrarySection items={library} />
      <ReligionsSection religions={religions} />
      <QuotesSection quotes={quotes} />

      <section
        id="todays-verse"
        className="py-8 px-6 text-center"
        style={{ background: 'var(--midnight)', borderTop: '1px solid rgba(201,168,76,0.1)' }}
      >
        <span className="font-cinzel text-gold-dim tracking-[0.25em] uppercase block mb-3" style={{ fontSize: '0.78rem' }}>
          Today&apos;s Verse
        </span>
        <p className="font-cormorant text-text-light max-w-2xl mx-auto leading-relaxed" style={{ fontSize: '1.4rem' }}>
          &ldquo;{verse.text}&rdquo;
        </p>
        <p className="font-cinzel text-gold tracking-[0.2em] uppercase mt-3" style={{ fontSize: '0.75rem' }}>
          {verse.reference}
        </p>
      </section>
    </>
  );
}
