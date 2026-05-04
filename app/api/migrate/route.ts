/**
 * One-time migration endpoint.
 * 1. Adds audio_url column to weekly_sermons (idempotent).
 * 2. Backfills audio for any sermon that doesn't have it yet.
 *
 * Call with:  POST /api/migrate   x-api-key: <WEEKLY_SERMON_SECRET>
 */
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/supabase';
import { generateAndStoreAudio } from '@/lib/tts';

export const maxDuration = 60;
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key');
  const secret = process.env.WEEKLY_SERMON_SECRET;

  if (!secret || apiKey !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!sql) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  // 1. Add column if it doesn't exist
  await sql`ALTER TABLE weekly_sermons ADD COLUMN IF NOT EXISTS audio_url TEXT`;

  // 2. Fetch sermons without audio
  const rows = await sql`
    SELECT id, slug, summary, additional_context
    FROM weekly_sermons
    WHERE audio_url IS NULL
    ORDER BY sermon_date DESC
  `;

  const results: Array<{ slug: string; status: string; url?: string; error?: string }> = [];

  for (const row of rows) {
    try {
      const url = await generateAndStoreAudio(
        row.slug as string,
        row.summary as string,
        row.additional_context as string | null
      );
      await sql`UPDATE weekly_sermons SET audio_url = ${url} WHERE id = ${row.id}`;
      results.push({ slug: row.slug as string, status: 'ok', url });
    } catch (err) {
      console.error(`[migrate] audio failed for ${row.slug}:`, err);
      results.push({ slug: row.slug as string, status: 'error', error: String(err) });
    }
  }

  return NextResponse.json({
    column_added: true,
    backfilled: results.length,
    results,
  });
}
