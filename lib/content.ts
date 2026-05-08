/**
 * Server-side content fetchers.
 *
 * - Each function reads from Neon and is wrapped in `unstable_cache` with a tag.
 * - Mutations from /api/admin/content call `revalidateTag(...)` to invalidate.
 * - If the DB is unavailable (no STORAGE_URL configured) or a query returns no
 *   rows, we fall back to the hardcoded values in lib/data.ts so the site
 *   never goes blank during initial setup.
 */
import { unstable_cache } from 'next/cache';
import { sql } from '@/lib/supabase';
import {
  DOCTRINES as FALLBACK_DOCTRINES,
  APOLOGETICS_QUESTIONS as FALLBACK_APOLO_QS,
  APOLOGETICS_CATEGORIES as FALLBACK_APOLO_CATS,
  RELIGIONS as FALLBACK_RELIGIONS,
  QUOTES as FALLBACK_QUOTES,
  LIBRARY_ITEMS as FALLBACK_LIBRARY,
  DAILY_VERSES as FALLBACK_VERSES,
} from '@/lib/data';
import type {
  Doctrine,
  ApologeticsQuestion,
  ApologeticsCategory,
  Religion,
  Quote,
  LibraryItem,
  DailyVerse,
  WeeklySermon,
} from '@/types';

// ──────────────────────────────────────────────────────────────────────────
// Cache tag names — keep in sync with /api/admin/content/route.ts
// ──────────────────────────────────────────────────────────────────────────

export const TAGS = {
  doctrines: 'doctrines',
  apologetics_questions: 'apologetics_questions',
  apologetics_categories: 'apologetics_categories',
  religions: 'religions',
  quotes: 'quotes',
  library_items: 'library_items',
  daily_verses: 'daily_verses',
  site_settings: 'site_settings',
  weekly_sermons: 'weekly_sermons',
} as const;

// ──────────────────────────────────────────────────────────────────────────
// Icon overrides (audit refs: H3 Mormonism, H4 Atheism, H5 apologetics)
//
// lib/data.ts has shipped clubs-suit / prohibition / color-emoji icons that
// don't fit the monochrome gold-on-navy aesthetic or, in two cases, are
// outright wrong for the subject (clubs-suit shamrock for Mormonism;
// red "no entry" sign for Atheism). Applied post-fetch so DB rows are
// also corrected without an admin-side migration.
// ──────────────────────────────────────────────────────────────────────────
const RELIGION_ICON_OVERRIDES: Record<string, string> = {
  // Was '♧' (clubs/shamrock — reads as a card-suit shape).
  // Replaced with a 4-pointed star — neutral, monoline, doesn't claim
  // an LDS-specific symbol the source data didn't actually pick.
  mormonism: '✦',
  // Was '🚫' (red prohibition / "no entry" — tonally aggressive).
  // Replaced with a neutral large circle — reads as "open question",
  // matching the section's "respectfully, clearly, and honestly" framing.
  atheism: '◯',
};

const APOLO_CAT_ICON_OVERRIDES: Record<string, string> = {
  // Color emoji → monoline gold-friendly glyphs that match the rest of
  // the site's aesthetic. Each glyph is mnemonic for the category.
  philosophical: '⚖',  // scales — weighing arguments
  historical: '⌛',     // hourglass — time / history
  scientific: '⚛',     // atom — science
  comparative: '⊕',    // circle with cross — multi-perspective
  personal: '❡',       // pilcrow-with-bullet — personal reflections
  quick: '➤',          // arrow — quick / move fast
};

function applyIconOverride<T extends { slug: string; icon: string }>(
  rows: T[],
  overrides: Record<string, string>
): T[] {
  return rows.map((row) =>
    overrides[row.slug] ? { ...row, icon: overrides[row.slug] } : row
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────

async function safeQuery<T>(fn: () => Promise<T[]>, fallback: T[]): Promise<T[]> {
  if (!sql) return fallback;
  try {
    const rows = await fn();
    return rows && rows.length > 0 ? rows : fallback;
  } catch (err) {
    console.error('[content] DB query failed, using fallback:', err);
    return fallback;
  }
}

// ──────────────────────────────────────────────────────────────────────────
// Doctrines
// ──────────────────────────────────────────────────────────────────────────

export const getDoctrines = unstable_cache(
  async (): Promise<Doctrine[]> =>
    safeQuery<Doctrine>(
      async () =>
        (await sql!`SELECT id, slug, tag, name, verse, description,
                            hover_verse_text, hover_verse_citation,
                            full_content, sort_order
                     FROM doctrines ORDER BY sort_order ASC NULLS LAST`) as unknown as Doctrine[],
      FALLBACK_DOCTRINES
    ),
  ['doctrines:all'],
  { tags: [TAGS.doctrines] }
);

export async function getDoctrineBySlug(slug: string): Promise<Doctrine | null> {
  const all = await getDoctrines();
  return all.find((d) => d.slug === slug) || null;
}

// ──────────────────────────────────────────────────────────────────────────
// Apologetics
// ──────────────────────────────────────────────────────────────────────────

export const getApologeticsQuestions = unstable_cache(
  async (): Promise<ApologeticsQuestion[]> =>
    safeQuery<ApologeticsQuestion>(
      async () =>
        (await sql!`SELECT id, category, question, objection, response,
                            go_deeper, sort_order
                     FROM apologetics_questions ORDER BY sort_order ASC NULLS LAST`) as unknown as ApologeticsQuestion[],
      FALLBACK_APOLO_QS
    ),
  ['apologetics_questions:all'],
  { tags: [TAGS.apologetics_questions] }
);

export const getApologeticsCategories = unstable_cache(
  async (): Promise<ApologeticsCategory[]> => {
    const rows = await safeQuery<ApologeticsCategory>(
      async () =>
        (await sql!`SELECT id, slug, icon, title, description
                     FROM apologetics_categories ORDER BY sort_order ASC NULLS LAST`) as unknown as ApologeticsCategory[],
      FALLBACK_APOLO_CATS
    );
    return applyIconOverride(rows, APOLO_CAT_ICON_OVERRIDES);
  },
  ['apologetics_categories:all'],
  { tags: [TAGS.apologetics_categories] }
);

export async function getApologeticsCategoryBySlug(
  slug: string
): Promise<ApologeticsCategory | null> {
  const all = await getApologeticsCategories();
  return all.find((c) => c.slug === slug) || null;
}

// ──────────────────────────────────────────────────────────────────────────
// Religions
// ──────────────────────────────────────────────────────────────────────────

export const getReligions = unstable_cache(
  async (): Promise<Religion[]> => {
    const rows = await safeQuery<Religion>(
      async () => {
        const dbRows = (await sql!`SELECT id, slug, icon, name, adherents, description,
                                         comparison_points, full_content, sort_order
                                  FROM religions ORDER BY sort_order ASC NULLS LAST`) as unknown as Array<
          Omit<Religion, 'comparison_points'> & { comparison_points: string[] | string }
        >;
        return dbRows.map((r) => ({
          ...r,
          comparison_points:
            typeof r.comparison_points === 'string'
              ? JSON.parse(r.comparison_points)
              : (r.comparison_points || []),
        })) as Religion[];
      },
      FALLBACK_RELIGIONS
    );
    return applyIconOverride(rows, RELIGION_ICON_OVERRIDES);
  },
  ['religions:all'],
  { tags: [TAGS.religions] }
);

export async function getReligionBySlug(slug: string): Promise<Religion | null> {
  const all = await getReligions();
  return all.find((r) => r.slug === slug) || null;
}

// ──────────────────────────────────────────────────────────────────────────
// Quotes
// ──────────────────────────────────────────────────────────────────────────

export const getQuotes = unstable_cache(
  async (): Promise<Quote[]> =>
    safeQuery<Quote>(
      async () =>
        (await sql!`SELECT id, text, author, era, avatar_emoji, sort_order
                     FROM quotes ORDER BY sort_order ASC NULLS LAST`) as unknown as Quote[],
      FALLBACK_QUOTES
    ),
  ['quotes:all'],
  { tags: [TAGS.quotes] }
);

// ──────────────────────────────────────────────────────────────────────────
// Library items
// ──────────────────────────────────────────────────────────────────────────

export const getLibraryItems = unstable_cache(
  async (): Promise<LibraryItem[]> =>
    safeQuery<LibraryItem>(
      async () =>
        (await sql!`SELECT id, tab, icon, name, description, url, link_text, sort_order
                     FROM library_items ORDER BY sort_order ASC NULLS LAST`) as unknown as LibraryItem[],
      FALLBACK_LIBRARY
    ),
  ['library_items:all'],
  { tags: [TAGS.library_items] }
);

// ──────────────────────────────────────────────────────────────────────────
// Daily verses
// ──────────────────────────────────────────────────────────────────────────

export const getDailyVerses = unstable_cache(
  async (): Promise<DailyVerse[]> =>
    safeQuery<DailyVerse>(
      async () =>
        (await sql!`SELECT id, text, reference, sort_order
                     FROM daily_verses ORDER BY sort_order ASC NULLS LAST`) as unknown as DailyVerse[],
      FALLBACK_VERSES
    ),
  ['daily_verses:all'],
  { tags: [TAGS.daily_verses] }
);

export async function getDailyVerse(): Promise<DailyVerse> {
  const verses = await getDailyVerses();
  if (verses.length === 0) return FALLBACK_VERSES[0];
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return verses[dayOfYear % verses.length];
}

// ──────────────────────────────────────────────────────────────────────────
// Weekly Sermons
// ──────────────────────────────────────────────────────────────────────────

export const getWeeklySermons = unstable_cache(
  async (): Promise<WeeklySermon[]> => {
    if (!sql) return [];
    try {
      const rows = (await sql`
        SELECT id, slug, youtube_id, title, sermon_date, summary,
               key_points, scripture_references, additional_context,
               audio_url, sort_order, created_at
        FROM weekly_sermons
        ORDER BY sermon_date DESC
      `) as unknown as Array<
        Omit<WeeklySermon, 'key_points' | 'scripture_references'> & {
          key_points: string[] | string;
          scripture_references: string[] | string;
        }
      >;
      return rows.map((r) => ({
        ...r,
        sermon_date:
          typeof r.sermon_date === 'object'
            ? (r.sermon_date as unknown as Date).toISOString().split('T')[0]
            : String(r.sermon_date),
        key_points:
          typeof r.key_points === 'string'
            ? JSON.parse(r.key_points)
            : (r.key_points ?? []),
        scripture_references:
          typeof r.scripture_references === 'string'
            ? JSON.parse(r.scripture_references)
            : (r.scripture_references ?? []),
      })) as WeeklySermon[];
    } catch (err) {
      console.error('[content] weekly_sermons query failed:', err);
      return [];
    }
  },
  ['weekly_sermons:all'],
  { tags: [TAGS.weekly_sermons] }
);

export async function getLatestSermon(): Promise<WeeklySermon | null> {
  const sermons = await getWeeklySermons();
  return sermons.length > 0 ? sermons[0] : null;
}

export async function getSermonBySlug(slug: string): Promise<WeeklySermon | null> {
  const sermons = await getWeeklySermons();
  return sermons.find((s) => s.slug === slug) || null;
}
