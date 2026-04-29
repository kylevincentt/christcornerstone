'use client';
import { useState } from 'react';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { BIBLE_BOOKS } from '@/lib/data';

export default function ScriptureSection({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const [search, setSearch] = useState('');

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
    <section id="scripture" className="py-24 px-8 md:px-16">
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

          {/* Books grid */}
          <div
            className="grid gap-2 text-left mt-10"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))' }}
          >
            <h3
              className="font-cinzel tracking-[0.35em] uppercase text-gold-dim py-2 border-b mb-1 m-0"
              style={{
                gridColumn: '1 / -1',
                fontSize: '0.72rem',
                borderColor: 'rgba(201,168,76,0.1)',
                fontWeight: 400,
              }}
            >
              Old Testament
            </h3>
            {BIBLE_BOOKS.old.map((book) => (
              <button
                key={book}
                type="button"
                onClick={() => handleBookClick(book)}
                aria-label={`Open ${book} on BibleGateway`}
                className="rounded-full text-center cursor-pointer transition-all duration-200 font-cinzel tracking-[0.08em] uppercase"
                style={{
                  background: 'rgba(201,168,76,0.05)',
                  border: '1px solid rgba(201,168,76,0.08)',
                  padding: '0.55rem 0.9rem',
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = 'rgba(201,168,76,0.12)';
                  el.style.borderColor = 'rgba(201,168,76,0.3)';
                  el.style.color = 'var(--gold)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = 'rgba(201,168,76,0.05)';
                  el.style.borderColor = 'rgba(201,168,76,0.08)';
                  el.style.color = 'var(--text-muted)';
                }}
              >
                {book}
              </button>
            ))}
            <h3
              className="font-cinzel tracking-[0.35em] uppercase text-gold-dim py-2 border-b mt-3 mb-1 m-0"
              style={{
                gridColumn: '1 / -1',
                fontSize: '0.72rem',
                borderColor: 'rgba(201,168,76,0.1)',
                fontWeight: 400,
              }}
            >
              New Testament
            </h3>
            {BIBLE_BOOKS.new.map((book) => (
              <button
                key={book}
                type="button"
                onClick={() => handleBookClick(book)}
                aria-label={`Open ${book} on BibleGateway`}
                className="rounded-full text-center cursor-pointer transition-all duration-200 font-cinzel tracking-[0.08em] uppercase"
                style={{
                  background: 'rgba(201,168,76,0.05)',
                  border: '1px solid rgba(201,168,76,0.08)',
                  padding: '0.55rem 0.9rem',
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = 'rgba(201,168,76,0.12)';
                  el.style.borderColor = 'rgba(201,168,76,0.3)';
                  el.style.color = 'var(--gold)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = 'rgba(201,168,76,0.05)';
                  el.style.borderColor = 'rgba(201,168,76,0.08)';
                  el.style.color = 'var(--text-muted)';
                }}
              >
                {book}
              </button>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
