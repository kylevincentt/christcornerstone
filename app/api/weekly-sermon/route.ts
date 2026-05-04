import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/supabase';
import { revalidateTag } from 'next/cache';
import { generateAndStoreAudio } from '@/lib/tts';

export const maxDuration = 30;
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');
  const secret = process.env.WEEKLY_SERMON_SECRET;

  if (!secret || apiKey !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!sql) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const {
      id,
      slug,
      youtube_id,
      title,
      sermon_date,
      summary,
      key_points,
      scripture_references,
      additional_context,
      sort_order,
    } = body;

    if (!id || !slug || !youtube_id || !title || !sermon_date || !summary) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if this sermon already has audio (don't regenerate on re-POST)
    const existing = await sql`SELECT audio_url FROM weekly_sermons WHERE slug = ${slug}`;
    const existingAudioUrl = (existing[0]?.audio_url as string | null) ?? null;

    // Generate audio if it doesn't exist yet
    let audioUrl: string | null = existingAudioUrl;
    if (!audioUrl) {
      try {
        audioUrl = await generateAndStoreAudio(slug, summary, additional_context ?? null);
      } catch (err) {
        // Audio generation is non-blocking — sermon still saves without it
        console.error('[weekly-sermon] audio generation failed:', err);
      }
    }

    await sql`
      INSERT INTO weekly_sermons (
        id, slug, youtube_id, title, sermon_date, summary,
        key_points, scripture_references, additional_context, sort_order, audio_url
      ) VALUES (
        ${id}, ${slug}, ${youtube_id}, ${title}, ${sermon_date}, ${summary},
        ${JSON.stringify(key_points ?? [])}::jsonb,
        ${JSON.stringify(scripture_references ?? [])}::jsonb,
        ${additional_context ?? null},
        ${sort_order ?? 0},
        ${audioUrl}
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        summary = EXCLUDED.summary,
        key_points = EXCLUDED.key_points,
        scripture_references = EXCLUDED.scripture_references,
        additional_context = EXCLUDED.additional_context,
        audio_url = COALESCE(weekly_sermons.audio_url, EXCLUDED.audio_url),
        updated_at = NOW()
    `;

    revalidateTag('weekly_sermons');
    return NextResponse.json({ success: true, slug, audio_url: audioUrl });
  } catch (err) {
    console.error('[weekly-sermon] POST failed:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
