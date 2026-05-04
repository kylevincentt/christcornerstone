'use client';
import { useState } from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { BIBLE_BOOKS } from '@/lib/data';

// Abbreviations for book names that overflow their pill buttons
const ABBR: Record<string, string> = {
  'Song of Solomon':  'Song of Sol.',
  '1 Thessalonians':  '1 Thess.',
  '2 Thessalonians':  '2 Thess.',
  '1 Corinthians':    '1 Cor.',
  '2 Corinthians':    '2 Cor.',
  'Lamentations':     'Lament.',
  'Ecclesiastes':     'Eccles.',
  'Deuteronomy':      'Deut.',
  'Philippians':      'Phil.',
  '1 Chronicles':     '1 Chr.',
  '2 Chronicles':     '2 Chr.',
  'Nehemiah':         'Neh.',
  'Zechariah':        'Zech.',
  'Zephaniah':        'Zeph.',
  'Habakkuk':         'Hab.',
  'Numbers':          'Num.',
  'Revelation':       'Rev.',
};

function abbr(book: string): string {
  return ABBR[book] ?? book;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
        flexShrink: 0,
        opacity: 0.7,
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function BookGrid({ books, onSelect }: { books: string[]; onSelect: (book: string) => void }) {
  return (
    <div
      className="grid gap-2 pt-1"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}
    >
      {books.map((book) => (
        <button
          key={book}
          type="button"
          onClick={() => onSelect(book)}
          aria-label={`Open ${book} on BibleGateway`}
          title={book}
          className="rounded-full text-center cursor-pointer transition-all duration-200 font-cinzel tracking-[0.07em] uppercase"
          style={{
            background: 'rgba(201,168,76,0.05)',
            border: '1px solid rgba(201,168,76,0.12)',
            padding: '0.5rem 0.6rem',
            fontSize: '0.74rem',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = 'rgba(201,168,76,0.12)';
            el.style.borderColor = 'rgba(201,168,76,0.35)';
            el.style.color = 'var(--gold)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = 'rgba(201,168,76,0.05)';
            el.style.borderColor = 'rgba(201,168,76,0.12)';
            el.style.color = 'var(--text-muted)';
          }}
        >
          {abbr(book)}
        </button>
      ))}
    </div>
  );
}

function TestamentDropdown({
  label,
  books,
  open,
  onToggle,
  onSelect,
}: {
  label: string;
  books: string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (book: string) => void;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: '1px solid rgba(201,168,76,0.15)',
        background: 'var(--deep-navy)',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-6 py-4 cursor-pointer font-cinzel uppercase tracking-[0.2em] text-gold"
        style={{ fontSize: '0.8rem', background: 'transparent', border: 'none', fontWeight: 600 }}
      >
        <span>{label}</span>
        <Chevron open={open} />
      </button>

      {open && (
        <div className="px-5 pb-5">
          <BookGrid books={books} onSelect={onSelect} />
        </div>
      )}
    </div>
  );
}

export default function ScriptureSection({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const [search, setSearch] = useState('');
  const [openOT, setOpenOT] = useState(false);
  const [openNT, setOpenNT] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    const query = encodeURIComponent(search);
    window.open(`https://www.biblegateway.com/quicksearch/?search=${query}&version=ESV`, '_blank', 'noopener,noreferrer');
  };

  const handleBookClick = (book: string) => {
    window.open(
      `https://www.biblegateway.com/passage/?search=${encodeURIComponent(book)}&version=ESV`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="scripture" className="py-10 px-8 md:px-16">
      <AnimateOnScroll>
        <div className="max-w-6xl mx-auto text-center">
          {!hideHeader && (
            <>
              <span className="section-label">The Living Word</span>
              <h2 className="section-title">Scripture Explorer</h2>
              <p className="text-text-light leading-relaxed mt-3 mb-8 mx-auto" style={{ fontSize: '1.05rem', maxWidth: '560px' }}>
                Search by topic, or browse the Bible book by book. Every book linked to trusted study resources.
              </p>
            </>
          )}

          {/* Search */}
          <form onSubmit={handleSearch} className="relative max-w-lg mx-auto mb-8" role="search">
            <label htmlFor="scripture-search" className="sr-only">
              Search the Bible
            </label>
            <input
              id="scripture-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What does the Bible say about… love, suffering, prayer…"
              className="w-full rounded-full text-cream font-cormorant outline-none transition-colors duration-300"
              style={{
                background: 'var(--deep-navy)',
                border: '1px solid rgba(201,168,76,0.2)',
                fontSize: '1.2rem',
                padding: '1rem 3.5rem 1rem 1.8rem',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
            />
            <button
              type="submit"
              aria-label="Search the Bible on BibleGateway"
              className="absolute right-1 top-1 bottom-1 w-12 bg-gold rounded-full border-none cursor-pointer transition-colors hover:bg-gold-light flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="18"
                height="18"
                aria-hidden="true"
                style={{ color: 'var(--midnight)' }}
              >
                <circle cx="9" cy="9" r="6" />
                <path d="m14 14 4 4" />
              </svg>
            </button>
          </form>

          {/* Testament dropdowns */}
          <div className="space-y-3 text-left mt-8">
            <TestamentDropdown
              label="Old Testament"
              books={BIBLE_BOOKS.old}
              open={openOT}
              onToggle={() => setOpenOT((v) => !v)}
              onSelect={handleBookClick}
            />
            <TestamentDropdown
              label="New Testament"
              books={BIBLE_BOOKS.new}
              open={openNT}
              onToggle={() => setOpenNT((v) => !v)}
              onSelect={handleBookClick}
            />
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
