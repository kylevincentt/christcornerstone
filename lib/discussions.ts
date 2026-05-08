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
