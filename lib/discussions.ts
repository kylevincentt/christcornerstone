/**
 * Hardcoded weekly discussion videos.
 *
 * Each entry lives in its own file under `lib/discussion-data/partN.ts`.
 * To add a new discussion, create `lib/discussion-data/partN.ts` exporting
 * a `PARTN: Discussion`, then import and append it here.
 *
 * The per-part split exists because the combined file was too large for
 * single-shot tooling round-trips; keeping each entry under ~15 KB lets
 * individual edits route cleanly.
 */

export type { Discussion, OutlineSection } from './discussion-data/types';
import type { Discussion } from './discussion-data/types';
import { PART1 } from './discussion-data/part1';
import { PART2 } from './discussion-data/part2';
import { PART3 } from './discussion-data/part3';

export const DISCUSSIONS: Discussion[] = [PART1, PART2, PART3];

export function getDiscussionBySlug(slug: string): Discussion | undefined {
  return DISCUSSIONS.find((d) => d.slug === slug);
}

/**
 * Series-aware ordering for the home card row and the index page (audit M2).
 *
 * Sequential teaching content reads naturally Part 1 → Part N. The previous
 * `date DESC` sort surfaced "Part 3" first, which is confusing for a new
 * visitor learning the material. This helper:
 *   - groups entries by `series`;
 *   - within each series, sorts by part number extracted from the slug
 *     (e.g. `doctrine-of-christ-1-incarnation` → 1) ascending so Part 1
 *     leads. Entries without a part number fall back to date ascending;
 *   - orders series groups by their most-recent entry — newest series first,
 *     so a freshly added series surfaces above older ones.
 */
export function sortDiscussions(items: Discussion[]): Discussion[] {
  const partNum = (slug: string): number | null => {
    const m = slug.match(/-(\d+)-/);
    return m ? parseInt(m[1], 10) : null;
  };
  const groups = new Map<string, Discussion[]>();
  for (const d of items) {
    const list = groups.get(d.series) ?? [];
    list.push(d);
    groups.set(d.series, list);
  }
  for (const [, list] of groups) {
    list.sort((a, b) => {
      const pa = partNum(a.slug);
      const pb = partNum(b.slug);
      if (pa !== null && pb !== null) return pa - pb;
      if (pa !== null) return -1;
      if (pb !== null) return 1;
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
  }
  const seriesEntries = Array.from(groups.entries()).map(([series, list]) => {
    const maxDate = list.reduce((m, x) => (x.date > m ? x.date : m), '0000-00-00');
    return { series, list, maxDate };
  });
  seriesEntries.sort((a, b) =>
    a.maxDate < b.maxDate ? 1 : a.maxDate > b.maxDate ? -1 : 0,
  );
  return seriesEntries.flatMap((e) => e.list);
}
