'use client';

import { useState, useMemo } from 'react';
import {
  BOOK_OVERVIEW,
  SCHOOLS,
  SECTIONS,
  SYMBOLS,
  THEMES,
  type SchoolId,
  type StudySection,
} from '@/lib/revelation-study';

/* ── Tabs ─────────────────────────────────────────────────────────────── */
type TabId = 'overview' | 'walkthrough' | 'views' | 'symbols' | 'themes';
const TABS: { id: TabId; label: string; hint: string }[] = [
  { id: 'overview', label: 'Overview', hint: 'Author, date, genre & how to read' },
  { id: 'walkthrough', label: 'Walkthrough', hint: 'Section-by-section study' },
  { id: 'views', label: 'The Four Views', hint: 'Interpretive schools compared' },
  { id: 'symbols', label: 'Symbols', hint: 'Glossary of imagery' },
  { id: 'themes', label: 'Themes', hint: 'Theological threads' },
];

/* ── Accent colors for the four interpretive schools ──────────────────── */
const SCHOOL_ACCENT: Record<SchoolId, string> = {
  preterist: '#6ea8c9',
  historicist: '#7fb98a',
  futurist: '#b38ad1',
  idealist: '#d8b06a',
};

const goldBorder = (a: number) => `1px solid rgba(var(--gold-rgb), ${a})`;

/* ── Small building blocks ────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="section-label">{children}</span>;
}

function Panel({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{ background: 'var(--deep-navy)', border: goldBorder(0.1), ...style }}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * Overview tab
 * ──────────────────────────────────────────────────────────────────── */
function OverviewTab({ onJump }: { onJump: (sectionId: string) => void }) {
  const facts: { label: string; body: string }[] = [
    { label: 'Author', body: BOOK_OVERVIEW.author },
    { label: 'Date', body: BOOK_OVERVIEW.date },
    { label: 'Genre', body: BOOK_OVERVIEW.genre },
    { label: 'Purpose', body: BOOK_OVERVIEW.purpose },
    { label: 'How to read it', body: BOOK_OVERVIEW.howToRead },
    { label: 'Structure', body: BOOK_OVERVIEW.structureNote },
  ];

  // Group sections by act for the structure map.
  const acts = useMemo(() => {
    const order: string[] = [];
    const byAct: Record<string, StudySection[]> = {};
    SECTIONS.forEach((s) => {
      if (!byAct[s.act]) {
        byAct[s.act] = [];
        order.push(s.act);
      }
      byAct[s.act].push(s);
    });
    return order.map((act) => ({ act, sections: byAct[act] }));
  }, []);

  return (
    <div className="space-y-8">
      <Panel className="p-6 sm:p-8">
        <SectionLabel>{BOOK_OVERVIEW.greekName}</SectionLabel>
        <h2
          className="font-cormorant text-cream mt-2 mb-3"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.1 }}
        >
          {BOOK_OVERVIEW.title}
        </h2>
        <p className="text-text-light leading-relaxed" style={{ fontSize: '1.02rem' }}>
          Revelation is the Bible’s final book and its most debated — a vision given to John on Patmos,
          written to seven real churches, and read across the centuries in strikingly different ways.
          This study walks through the book section by section, laying the four classic interpretations
          side by side so you can weigh them for yourself.
        </p>
      </Panel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {facts.map((f) => (
          <Panel key={f.label} className="p-6">
            <span className="font-cinzel tracking-[0.22em] uppercase text-gold-dim block mb-3" style={{ fontSize: '0.68rem' }}>
              {f.label}
            </span>
            <p className="text-text-light leading-relaxed" style={{ fontSize: '0.96rem' }}>
              {f.body}
            </p>
          </Panel>
        ))}
      </div>

      {/* Structure map */}
      <Panel className="p-6 sm:p-8">
        <SectionLabel>The Shape of the Book</SectionLabel>
        <h3 className="font-cormorant text-cream mt-2 mb-5" style={{ fontSize: '1.6rem' }}>
          A Map in Six Movements
        </h3>
        <div className="space-y-5">
          {acts.map(({ act, sections }) => (
            <div key={act}>
              <p className="font-cinzel text-gold tracking-[0.12em] uppercase mb-2" style={{ fontSize: '0.72rem' }}>
                {act}
              </p>
              <div className="flex flex-wrap gap-2">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onJump(s.id)}
                    className="hover-gold-bg text-left rounded-lg px-3 py-2 transition-colors"
                    style={{ background: 'var(--navy)', border: goldBorder(0.1) }}
                  >
                    <span className="block text-cream" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                      {s.title}
                    </span>
                    <span className="block text-text-muted" style={{ fontSize: '0.72rem' }}>
                      {s.reference}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * Walkthrough tab
 * ──────────────────────────────────────────────────────────────────── */
function InterpretationBlock({ section }: { section: StudySection }) {
  const [active, setActive] = useState<SchoolId>('preterist');
  const [compareAll, setCompareAll] = useState(false);

  const shown = compareAll
    ? section.interpretations
    : section.interpretations.filter((i) => i.school === active);

  const schoolName = (id: SchoolId) => SCHOOLS.find((s) => s.id === id)!.name;
  const schoolTagline = (id: SchoolId) => SCHOOLS.find((s) => s.id === id)!.tagline;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h4 className="font-cormorant text-gold-light" style={{ fontSize: '1.4rem' }}>
          The Four Interpretations
        </h4>
        <button
          onClick={() => setCompareAll((v) => !v)}
          className="font-cinzel tracking-[0.12em] uppercase transition-colors hover:text-gold"
          style={{
            fontSize: '0.66rem',
            color: compareAll ? 'var(--gold)' : 'var(--text-muted)',
            border: goldBorder(0.2),
            borderRadius: '999px',
            padding: '0.4rem 0.9rem',
          }}
        >
          {compareAll ? '● Comparing all four' : 'Compare all four'}
        </button>
      </div>

      {!compareAll && (
        <div className="flex flex-wrap gap-2 mb-4">
          {SCHOOLS.map((s) => {
            const on = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className="font-cinzel tracking-[0.1em] uppercase transition-all rounded-full"
                style={{
                  fontSize: '0.66rem',
                  padding: '0.45rem 0.95rem',
                  color: on ? '#0a0e1a' : 'var(--text-light)',
                  background: on ? SCHOOL_ACCENT[s.id] : 'transparent',
                  border: `1px solid ${on ? SCHOOL_ACCENT[s.id] : 'rgba(var(--gold-rgb), 0.2)'}`,
                  fontWeight: on ? 700 : 400,
                }}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      )}

      <div className={compareAll ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}>
        {shown.map((interp) => (
          <div
            key={interp.school}
            className="rounded-xl p-5"
            style={{
              background: 'var(--navy)',
              borderLeft: `3px solid ${SCHOOL_ACCENT[interp.school]}`,
              border: goldBorder(0.08),
              borderLeftWidth: '3px',
              borderLeftColor: SCHOOL_ACCENT[interp.school],
            }}
          >
            <div className="flex items-baseline gap-2 mb-2">
              <span
                className="font-cinzel tracking-[0.12em] uppercase"
                style={{ fontSize: '0.7rem', color: SCHOOL_ACCENT[interp.school], fontWeight: 700 }}
              >
                {schoolName(interp.school)}
              </span>
              <span className="text-text-muted" style={{ fontSize: '0.72rem' }}>
                — {schoolTagline(interp.school)}
              </span>
            </div>
            <p className="text-text-light leading-relaxed" style={{ fontSize: '0.95rem' }}>
              {interp.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WalkthroughTab({
  activeId,
  setActiveId,
}: {
  activeId: string;
  setActiveId: (id: string) => void;
}) {
  const section = SECTIONS.find((s) => s.id === activeId) || SECTIONS[0];
  const idx = SECTIONS.findIndex((s) => s.id === section.id);
  const prev = idx > 0 ? SECTIONS[idx - 1] : null;
  const next = idx < SECTIONS.length - 1 ? SECTIONS[idx + 1] : null;

  // Rail grouped by act.
  const acts = useMemo(() => {
    const order: string[] = [];
    const byAct: Record<string, StudySection[]> = {};
    SECTIONS.forEach((s) => {
      if (!byAct[s.act]) {
        byAct[s.act] = [];
        order.push(s.act);
      }
      byAct[s.act].push(s);
    });
    return order.map((act) => ({ act, sections: byAct[act] }));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* Rail (desktop) */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
          {acts.map(({ act, sections }) => (
            <div key={act}>
              <p className="font-cinzel text-gold-dim tracking-[0.1em] uppercase mb-2" style={{ fontSize: '0.6rem' }}>
                {act}
              </p>
              <ul className="space-y-1 list-none m-0 p-0">
                {sections.map((s) => {
                  const on = s.id === section.id;
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => setActiveId(s.id)}
                        className="w-full text-left rounded-lg px-3 py-2 transition-colors"
                        style={{
                          background: on ? 'rgba(var(--gold-rgb), 0.1)' : 'transparent',
                          borderLeft: on ? '2px solid var(--gold)' : '2px solid transparent',
                        }}
                      >
                        <span
                          className="block"
                          style={{
                            fontSize: '0.86rem',
                            fontWeight: on ? 600 : 400,
                            color: on ? 'var(--gold-light)' : 'var(--text-light)',
                          }}
                        >
                          {s.order}. {s.title}
                        </span>
                        <span className="block text-text-muted" style={{ fontSize: '0.68rem' }}>
                          {s.reference}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Section selector (mobile) */}
      <div className="lg:hidden">
        <label className="sr-only" htmlFor="section-select">Choose a passage</label>
        <select
          id="section-select"
          value={section.id}
          onChange={(e) => setActiveId(e.target.value)}
          className="w-full rounded-lg px-4 py-3 font-cinzel tracking-[0.05em]"
          style={{
            background: 'var(--navy)',
            color: 'var(--cream)',
            border: goldBorder(0.25),
            fontSize: '0.85rem',
          }}
        >
          {SECTIONS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.order}. {s.title} ({s.reference})
            </option>
          ))}
        </select>
      </div>

      {/* Main panel */}
      <div className="min-w-0">
        <Panel className="p-6 sm:p-8">
          <SectionLabel>{section.act}</SectionLabel>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mt-2 mb-1">
            <h3 className="font-cormorant text-cream" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)', lineHeight: 1.1 }}>
              {section.title}
            </h3>
            <span className="font-cinzel text-gold tracking-[0.1em]" style={{ fontSize: '0.9rem' }}>
              {section.reference}
            </span>
          </div>

          {/* Big idea */}
          <div
            className="rounded-xl px-5 py-4 my-5"
            style={{ background: 'rgba(var(--gold-rgb), 0.07)', border: goldBorder(0.18) }}
          >
            <span className="font-cinzel text-gold-dim tracking-[0.18em] uppercase block mb-1" style={{ fontSize: '0.62rem' }}>
              Big Idea
            </span>
            <p className="font-cormorant text-gold-light italic leading-snug" style={{ fontSize: '1.2rem' }}>
              {section.bigIdea}
            </p>
          </div>

          <p className="text-text-light leading-relaxed mb-7" style={{ fontSize: '1rem' }}>
            {section.summary}
          </p>

          <InterpretationBlock section={section} />

          {/* Symbols */}
          <div className="mt-8">
            <h4 className="font-cormorant text-gold-light mb-3" style={{ fontSize: '1.4rem' }}>
              Key Symbols
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.symbols.map((sym) => (
                <div
                  key={sym.name}
                  className="rounded-xl p-4"
                  style={{ background: 'var(--navy)', border: goldBorder(0.08) }}
                >
                  <span className="text-gold block mb-1" style={{ fontSize: '0.92rem', fontWeight: 600 }}>
                    {sym.name}
                  </span>
                  <span className="text-text-light leading-relaxed block" style={{ fontSize: '0.88rem' }}>
                    {sym.meaning}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Themes + cross refs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div>
              <h4 className="font-cormorant text-gold-light mb-3" style={{ fontSize: '1.25rem' }}>
                Themes
              </h4>
              <div className="flex flex-wrap gap-2">
                {section.themes.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-3 py-1 text-text-light"
                    style={{ background: 'var(--navy)', border: goldBorder(0.15), fontSize: '0.8rem' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-cormorant text-gold-light mb-3" style={{ fontSize: '1.25rem' }}>
                Old Testament Roots
              </h4>
              <div className="flex flex-wrap gap-2">
                {section.crossRefs.map((r) => (
                  <span
                    key={r}
                    className="font-cinzel rounded-full px-3 py-1 text-text-muted tracking-[0.03em]"
                    style={{ background: 'transparent', border: goldBorder(0.15), fontSize: '0.75rem' }}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Reflection */}
          <div className="mt-8">
            <h4 className="font-cormorant text-gold-light mb-3" style={{ fontSize: '1.25rem' }}>
              For Reflection
            </h4>
            <ul className="space-y-2 list-none m-0 p-0">
              {section.questions.map((q, i) => (
                <li key={i} className="flex gap-3 text-text-light" style={{ fontSize: '0.95rem' }}>
                  <span className="text-gold flex-shrink-0" style={{ fontWeight: 700 }}>{i + 1}.</span>
                  <span className="leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        {/* Prev / next */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => prev && setActiveId(prev.id)}
            disabled={!prev}
            className="hover-gold-bg flex-1 text-left rounded-xl px-5 py-4 transition-colors disabled:opacity-30"
            style={{ background: 'var(--deep-navy)', border: goldBorder(0.1) }}
          >
            <span className="font-cinzel text-gold-dim tracking-[0.15em] uppercase block" style={{ fontSize: '0.6rem' }}>
              ← Previous
            </span>
            <span className="text-cream" style={{ fontSize: '0.92rem' }}>{prev ? prev.title : '—'}</span>
          </button>
          <button
            onClick={() => next && setActiveId(next.id)}
            disabled={!next}
            className="hover-gold-bg flex-1 text-right rounded-xl px-5 py-4 transition-colors disabled:opacity-30"
            style={{ background: 'var(--deep-navy)', border: goldBorder(0.1) }}
          >
            <span className="font-cinzel text-gold-dim tracking-[0.15em] uppercase block" style={{ fontSize: '0.6rem' }}>
              Next →
            </span>
            <span className="text-cream" style={{ fontSize: '0.92rem' }}>{next ? next.title : '—'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * The Four Views tab
 * ──────────────────────────────────────────────────────────────────── */
function ViewsTab() {
  return (
    <div className="space-y-8">
      <Panel className="p-6 sm:p-8">
        <SectionLabel>Four Ways to Read the Apocalypse</SectionLabel>
        <p className="text-text-light leading-relaxed mt-3" style={{ fontSize: '1rem' }}>
          For most of church history, faithful readers have interpreted Revelation along four broad
          lines. They differ mainly on <em className="text-gold-light not-italic">when</em> the book’s
          visions are fulfilled — in the past, across history, in the future, or in every age. Knowing
          the four schools turns confusing debates into a clear map. Each has real strengths; each faces
          real challenges.
        </p>
      </Panel>

      {/* Comparison table */}
      <Panel className="p-4 sm:p-6 overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: '640px' }}>
          <thead>
            <tr>
              <th className="text-left p-3 font-cinzel text-gold-dim tracking-[0.1em] uppercase" style={{ fontSize: '0.62rem' }}>
                School
              </th>
              <th className="text-left p-3 font-cinzel text-gold-dim tracking-[0.1em] uppercase" style={{ fontSize: '0.62rem' }}>
                Time Focus
              </th>
              <th className="text-left p-3 font-cinzel text-gold-dim tracking-[0.1em] uppercase" style={{ fontSize: '0.62rem' }}>
                The Millennium (ch. 20)
              </th>
            </tr>
          </thead>
          <tbody>
            {SCHOOLS.map((s) => (
              <tr key={s.id} style={{ borderTop: goldBorder(0.1) }}>
                <td className="p-3 align-top">
                  <span className="font-cinzel tracking-[0.08em] uppercase" style={{ fontSize: '0.8rem', color: SCHOOL_ACCENT[s.id], fontWeight: 700 }}>
                    {s.name}
                  </span>
                </td>
                <td className="p-3 align-top text-text-light" style={{ fontSize: '0.86rem' }}>{s.timeFocus}</td>
                <td className="p-3 align-top text-text-light" style={{ fontSize: '0.86rem' }}>{s.millennium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      {/* Detailed cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SCHOOLS.map((s) => (
          <Panel
            key={s.id}
            className="p-6"
            style={{ borderTop: `3px solid ${SCHOOL_ACCENT[s.id]}` }}
          >
            <div className="flex items-baseline gap-2 mb-1">
              <h3 className="font-cormorant text-cream" style={{ fontSize: '1.6rem' }}>{s.name}</h3>
            </div>
            <p className="font-cinzel tracking-[0.12em] uppercase mb-4" style={{ fontSize: '0.66rem', color: SCHOOL_ACCENT[s.id] }}>
              {s.tagline}
            </p>
            <p className="text-text-light leading-relaxed mb-4" style={{ fontSize: '0.94rem' }}>
              {s.coreClaim}
            </p>
            <div className="space-y-3">
              <div>
                <span className="font-cinzel text-gold-dim tracking-[0.15em] uppercase block mb-1" style={{ fontSize: '0.58rem' }}>Strengths</span>
                <p className="text-text-light leading-relaxed" style={{ fontSize: '0.87rem' }}>{s.strengths}</p>
              </div>
              <div>
                <span className="font-cinzel text-gold-dim tracking-[0.15em] uppercase block mb-1" style={{ fontSize: '0.58rem' }}>Challenges</span>
                <p className="text-text-light leading-relaxed" style={{ fontSize: '0.87rem' }}>{s.challenges}</p>
              </div>
              <div>
                <span className="font-cinzel text-gold-dim tracking-[0.15em] uppercase block mb-1" style={{ fontSize: '0.58rem' }}>Notable Voices</span>
                <p className="text-text-muted leading-relaxed" style={{ fontSize: '0.83rem' }}>{s.proponents}</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * Symbols tab
 * ──────────────────────────────────────────────────────────────────── */
const SYMBOL_CATEGORIES = ['All', 'Numbers', 'Colors', 'Creatures & Figures', 'Places', 'Objects'] as const;

function SymbolsTab() {
  const [cat, setCat] = useState<(typeof SYMBOL_CATEGORIES)[number]>('All');
  const list = cat === 'All' ? SYMBOLS : SYMBOLS.filter((s) => s.category === cat);

  return (
    <div className="space-y-6">
      <Panel className="p-6 sm:p-8">
        <SectionLabel>Reading the Imagery</SectionLabel>
        <p className="text-text-light leading-relaxed mt-3" style={{ fontSize: '1rem' }}>
          Revelation thinks in pictures drawn almost entirely from the Old Testament. Its symbols are
          meant to be interpreted before they are taken literally — and the book often explains its own
          images. This glossary gathers the recurring symbols and what they most commonly signify.
        </p>
      </Panel>

      <div className="flex flex-wrap gap-2">
        {SYMBOL_CATEGORIES.map((c) => {
          const on = c === cat;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="font-cinzel tracking-[0.1em] uppercase transition-all rounded-full"
              style={{
                fontSize: '0.66rem',
                padding: '0.45rem 0.95rem',
                color: on ? '#0a0e1a' : 'var(--text-light)',
                background: on ? 'var(--gold)' : 'transparent',
                border: `1px solid ${on ? 'var(--gold)' : 'rgba(var(--gold-rgb), 0.2)'}`,
                fontWeight: on ? 700 : 400,
              }}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((s) => (
          <Panel key={s.id} className="p-5">
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <h3 className="font-cormorant text-gold-light" style={{ fontSize: '1.35rem' }}>{s.symbol}</h3>
              <span className="font-cinzel text-gold-dim tracking-[0.1em] uppercase flex-shrink-0" style={{ fontSize: '0.58rem' }}>
                {s.category}
              </span>
            </div>
            <p className="text-text-light leading-relaxed mb-2" style={{ fontSize: '0.92rem' }}>{s.meaning}</p>
            <p className="font-cinzel text-text-muted tracking-[0.05em]" style={{ fontSize: '0.72rem' }}>
              Appears: {s.appears}
            </p>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * Themes tab
 * ──────────────────────────────────────────────────────────────────── */
function ThemesTab() {
  return (
    <div className="space-y-6">
      <Panel className="p-6 sm:p-8">
        <SectionLabel>The Threads That Hold It Together</SectionLabel>
        <p className="text-text-light leading-relaxed mt-3" style={{ fontSize: '1rem' }}>
          Beneath the visions run a handful of theological themes that unify the whole book. Whatever
          your interpretive school, these are the truths Revelation was written to press home to a
          pressured church.
        </p>
      </Panel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {THEMES.map((t) => (
          <Panel key={t.id} className="p-6">
            <h3 className="font-cormorant text-cream mb-3" style={{ fontSize: '1.5rem' }}>{t.title}</h3>
            <blockquote
              className="font-cormorant text-gold-light italic leading-snug mb-1 pl-4"
              style={{ fontSize: '1.05rem', borderLeft: '2px solid rgba(var(--gold-rgb), 0.4)' }}
            >
              {t.verse}
            </blockquote>
            <p className="font-cinzel text-gold-dim tracking-[0.1em] uppercase mb-4 pl-4" style={{ fontSize: '0.62rem' }}>
              {t.reference}
            </p>
            <p className="text-text-light leading-relaxed" style={{ fontSize: '0.94rem' }}>{t.body}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
 * Root
 * ──────────────────────────────────────────────────────────────────── */
export default function RevelationStudy() {
  const [tab, setTab] = useState<TabId>('overview');
  const [activeSectionId, setActiveSectionId] = useState<string>(SECTIONS[0].id);

  const jumpToSection = (id: string) => {
    setActiveSectionId(id);
    setTab('walkthrough');
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-16">
      {/* Tab bar */}
      <div
        className="sticky top-[68px] z-40 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3 mb-8"
        style={{ background: 'rgba(var(--page-bg), 0.96)', backdropFilter: 'blur(8px)', borderBottom: goldBorder(0.1) }}
      >
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {TABS.map((t) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                title={t.hint}
                className="font-cinzel tracking-[0.1em] uppercase whitespace-nowrap transition-all rounded-full flex-shrink-0"
                style={{
                  fontSize: '0.7rem',
                  padding: '0.55rem 1.1rem',
                  color: on ? '#0a0e1a' : 'var(--text-light)',
                  background: on ? 'var(--gold)' : 'transparent',
                  border: `1px solid ${on ? 'var(--gold)' : 'rgba(var(--gold-rgb), 0.2)'}`,
                  fontWeight: on ? 700 : 400,
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {tab === 'overview' && <OverviewTab onJump={jumpToSection} />}
      {tab === 'walkthrough' && <WalkthroughTab activeId={activeSectionId} setActiveId={setActiveSectionId} />}
      {tab === 'views' && <ViewsTab />}
      {tab === 'symbols' && <SymbolsTab />}
      {tab === 'themes' && <ThemesTab />}
    </div>
  );
}
