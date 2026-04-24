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
} as const;

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
  async (): Promise<ApologeticsCategory[]> =>
    safeQuery<ApologeticsCategory>(
      async () =>
        (await sql!`SELECT id, slug, icon, title, description
                     FROM apologetics_categories ORDER BY sort_order ASC NULLS LAST`) as unknown as ApologeticsCategory[],
      FALLBACK_APOLO_CATS
    ),
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
  async (): Promise<Religion[]> =>
    safeQuery<Religion>(
      async () => {
        const rows = (await sql!`SELECT id, slug, icon, name, adherents, description,
                                         comparison_points, full_content, sort_order
                                  FROM religions ORDER BY sort_order ASC NULLS LAST`) as unknown as Array<
          Omit<Religion, 'comparison_points'> & { comparison_points: string[] | string }
        >;
        // Neon returns JSONB columns as already-parsed JS arrays; defensively re-parse if string.
        return rows.map((r) => ({
          ...r,
          comparison_points:
            typeof r.comparison_points === 'string'
              ? JSON.parse(r.comparison_points)
              : (r.comparison_points || []),
        })) as Religion[];
      },
      FALLBACK_RELIGIONS
    ),
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

