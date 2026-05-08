'use client';

import { useState } from 'react';

interface Props {
  references: string[];
}

/**
 * Common SBL/standard book abbreviations → full book names that bible-api.com
 * accepts. Source data uses editorial forms like `Phil. 2:5–8` (with a dot
 * and en-dash); without normalization, every fetch returned no verses and
 * the chip rendered "Verse text unavailable."
 *
 * Keys are lowercase, no trailing period.
 */
const BOOK_ABBREVS: Record<string, string> = {
  // Old Testament
  gen: 'Genesis', ex: 'Exodus', exod: 'Exodus', exo: 'Exodus',
  lev: 'Leviticus', num: 'Numbers', deut: 'Deuteronomy',
  josh: 'Joshua', judg: 'Judges', ru: 'Ruth',
  '1 sam': '1 Samuel', '2 sam': '2 Samuel',
  '1 kgs': '1 Kings', '1 ki': '1 Kings',
  '2 kgs': '2 Kings', '2 ki': '2 Kings',
  '1 chr': '1 Chronicles', '2 chr': '2 Chronicles',
  neh: 'Nehemiah', esth: 'Esther',
  ps: 'Psalms', psa: 'Psalms', pss: 'Psalms', psalm: 'Psalms',
  prov: 'Proverbs', eccles: 'Ecclesiastes', eccl: 'Ecclesiastes',
  song: 'Song of Solomon', 'song of s': 'Song of Solomon', sos: 'Song of Solomon',
  isa: 'Isaiah', jer: 'Jeremiah',
  lament: 'Lamentations', lam: 'Lamentations',
  ezek: 'Ezekiel', eze: 'Ezekiel', dan: 'Daniel',
  hos: 'Hosea', obad: 'Obadiah', mic: 'Micah',
  nah: 'Nahum', hab: 'Habakkuk', zeph: 'Zephaniah',
  hag: 'Haggai', zech: 'Zechariah', mal: 'Malachi',
  // New Testament
  matt: 'Matthew', mt: 'Matthew', mk: 'Mark', lk: 'Luke', jn: 'John',
  rom: 'Romans',
  '1 cor': '1 Corinthians', '2 cor': '2 Corinthians',
  gal: 'Galatians', eph: 'Ephesians', phil: 'Philippians', col: 'Colossians',
  '1 thess': '1 Thessalonians', '1 th': '1 Thessalonians',
  '2 thess': '2 Thessalonians', '2 th': '2 Thessalonians',
  '1 tim': '1 Timothy', '2 tim': '2 Timothy',
  tit: 'Titus', philem: 'Philemon',
  heb: 'Hebrews', jas: 'James',
  '1 pet': '1 Peter', '2 pet': '2 Peter',
  '1 jn': '1 John', '2 jn': '2 John', '3 jn': '3 John',
  rev: 'Revelation',
};

/** Normalize a Scripture reference so bible-api.com can resolve it. */
function normalizeRef(ref: string): string {
  // en-dash / em-dash → ASCII hyphen so verse ranges parse
  const cleaned = ref.replace(/[–—]/g, '-').trim();
  // Split off the trailing chapter:verse(s) portion (e.g. "2:5-8", "13:32")
  const m = cleaned.match(/^(.+?)\s+(\d+(?::\d+(?:-\d+)?)?)$/);
  if (!m) return cleaned;
  const [, bookRaw, locator] = m;
  const key = bookRaw.replace(/\.$/, '').trim().toLowerCase();
  const full = BOOK_ABBREVS[key] || bookRaw.replace(/\.$/, '').trim();
  return `${full} ${locator}`;
}

/**
 * Public-domain KJV fallback for the references currently shipped in
 * lib/discussion-data/*.ts. Used when bible-api.com is unreachable or
 * returns no verse data — keeps the chips functional in either case.
 *
 * When adding a new discussion: add the references here too so the chip
 * keeps working even when the API is offline.
 *
 * Keys match the *original* reference string (after dash normalization),
 * so e.g. "Phil. 2:5-8" not "Philippians 2:5-8".
 */
const KJV_FALLBACK: Record<string, string> = {
  'Phil. 2:5-8':
    "[5] Let this mind be in you, which was also in Christ Jesus: [6] Who, being in the form of God, thought it not robbery to be equal with God: [7] But made himself of no reputation, and took upon him the form of a servant, and was made in the likeness of men: [8] And being found in fashion as a man, he humbled himself, and became obedient unto death, even the death of the cross.",
  'Mark 13:32':
    "[32] But of that day and that hour knoweth no man, no, not the angels which are in heaven, neither the Son, but the Father.",
  'Heb. 5:7-10':
    "[7] Who in the days of his flesh, when he had offered up prayers and supplications with strong crying and tears unto him that was able to save him from death, and was heard in that he feared; [8] Though he were a Son, yet learned he obedience by the things which he suffered; [9] And being made perfect, he became the author of eternal salvation unto all them that obey him; [10] Called of God an high priest after the order of Melchisedec.",
  '1 John 4:1-3':
    "[1] Beloved, believe not every spirit, but try the spirits whether they are of God: because many false prophets are gone out into the world. [2] Hereby know ye the Spirit of God: Every spirit that confesseth that Jesus Christ is come in the flesh is of God: [3] And every spirit that confesseth not that Jesus Christ is come in the flesh is not of God: and this is that spirit of antichrist, whereof ye have heard that it should come; and even now already is it in the world.",
  'Luke 23:33':
    "[33] And when they were come to the place, which is called Calvary, there they crucified him, and the malefactors, one on the right hand, and the other on the left.",
  'John 4:6':
    "[6] Now Jacob's well was there. Jesus therefore, being wearied with his journey, sat thus on the well: and it was about the sixth hour.",
  'Heb. 4:15':
    "[15] For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin.",
  'James 1:13':
    "[13] Let no man say when he is tempted, I am tempted of God: for God cannot be tempted with evil, neither tempteth he any man:",
  'Heb. 10:7':
    "[7] Then said I, Lo, I come (in the volume of the book it is written of me,) to do thy will, O God.",
  'Heb. 5:5':
    "[5] So also Christ glorified not himself to be made an high priest; but he that said unto him, Thou art my Son, to day have I begotten thee.",
  'Phil. 2:7':
    "[7] But made himself of no reputation, and took upon him the form of a servant, and was made in the likeness of men:",
  'Luke 2:52':
    "[52] And Jesus increased in wisdom and stature, and in favour with God and man.",
  'John 1:14':
    "[14] And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
  'Prov. 20:27':
    "[27] The spirit of man is the candle of the LORD, searching all the inward parts of the belly.",
};

function fallbackVerse(originalRef: string): string | null {
  const ascii = originalRef.replace(/[–—]/g, '-').trim();
  return KJV_FALLBACK[ascii] || null;
}

export default function ScriptureRefsSection({ references }: Props) {
  const [activeRef, setActiveRef] = useState<string | null>(null);
  const [verseCache, setVerseCache] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleClick(ref: string) {
    if (activeRef === ref) {
      setActiveRef(null);
      return;
    }
    setActiveRef(ref);
    if (verseCache[ref]) return;

    setLoading(true);
    const normalized = normalizeRef(ref);
    let text = '';
    try {
      const res = await fetch(
        `https://bible-api.com/${encodeURIComponent(normalized)}?translation=kjv`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.verses && data.verses.length > 0) {
          text = data.verses
            .map((v: { verse: number; text: string }) => `[${v.verse}] ${v.text.trim()}`)
            .join(' ');
        } else if (typeof data.text === 'string' && data.text.trim()) {
          text = data.text.trim();
        }
      }
    } catch {
      /* fall through to fallback below */
    }

    if (!text) {
      text = fallbackVerse(ref) || 'Verse text unavailable.';
    }
    setVerseCache((prev) => ({ ...prev, [ref]: text }));
    setLoading(false);
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {references.map((ref) => (
          <button
            key={ref}
            onClick={() => handleClick(ref)}
            className="font-cinzel tracking-[0.15em] uppercase rounded-full px-4 py-2 transition-all duration-200"
            style={{
              fontSize: '0.67rem',
              border: `1px solid rgba(var(--gold-rgb), ${activeRef === ref ? '0.55' : '0.25'})`,
              background:
                activeRef === ref
                  ? 'rgba(var(--gold-rgb), 0.12)'
                  : 'rgba(var(--gold-rgb), 0.05)',
              color: 'var(--cream)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            {ref}
            <svg
              width="8"
              height="8"
              viewBox="0 0 10 10"
              fill="currentColor"
              style={{
                opacity: 0.5,
                transform: activeRef === ref ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s ease',
                flexShrink: 0,
              }}
            >
              <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>

      {activeRef && (
        <div
          className="rounded-xl px-6 py-5 mt-3"
          style={{
            background: 'rgba(var(--gold-rgb), 0.04)',
            border: '1px solid rgba(var(--gold-rgb), 0.15)',
          }}
        >
          <p
            className="font-cinzel mb-3"
            style={{
              fontSize: '0.65rem',
              color: 'var(--gold)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            {activeRef}
          </p>
          {loading && !verseCache[activeRef] ? (
            <p
              className="font-lato"
              style={{ fontSize: '0.9rem', color: 'var(--text-light)', opacity: 0.6 }}
            >
              Loading…
            </p>
          ) : (
            <p
              className="font-lato leading-relaxed"
              style={{ fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: 1.8 }}
            >
              {verseCache[activeRef]}
            </p>
          )}
        </div>
      )}
    </>
  );
}
