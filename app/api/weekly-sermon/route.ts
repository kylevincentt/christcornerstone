import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/supabase';
import { revalidateTag } from 'next/cache';

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

    await sql`
      INSERT INTO weekly_sermons (
        id, slug, youtube_id, title, sermon_date, summary,
        key_points, scripture_references, additional_context, sort_order
      ) VALUES (
        ${id}, ${slug}, ${youtube_id}, ${title}, ${sermon_date}, ${summary},
        ${JSON.stringify(key_points ?? [])}::jsonb,
        ${JSON.stringify(scripture_references ?? [])}::jsonb,
        ${additional_context ?? null},
        ${sort_order ?? 0}
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        summary = EXCLUDED.summary,
        key_points = EXCLUDED.key_points,
        scripture_references = EXCLUDED.scripture_references,
        additional_context = EXCLUDED.additional_context,
        updated_at = NOW()
    `;

    revalidateTag('weekly_sermons');
    return NextResponse.json({ success: true, slug });
  } catch (err) {
    console.error('[weekly-sermon] POST failed:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
