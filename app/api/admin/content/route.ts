import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getAdminSession } from '@/lib/auth';
import { sql } from '@/lib/supabase';

// Whitelist of allowed table names — never interpolate user input as a table name
const TABLE_MAP: Record<string, { table: string; tag?: string }> = {
  doctrine: { table: 'doctrines', tag: 'doctrines' },
  doctrines: { table: 'doctrines', tag: 'doctrines' },
  apologetics: { table: 'apologetics_questions', tag: 'apologetics_questions' },
  apologetics_questions: { table: 'apologetics_questions', tag: 'apologetics_questions' },
  apologetics_categories: { table: 'apologetics_categories', tag: 'apologetics_categories' },
  quote: { table: 'quotes', tag: 'quotes' },
  quotes: { table: 'quotes', tag: 'quotes' },
  religion: { table: 'religions', tag: 'religions' },
  religions: { table: 'religions', tag: 'religions' },
  library: { table: 'library_items', tag: 'library_items' },
  library_items: { table: 'library_items', tag: 'library_items' },
  verse: { table: 'daily_verses', tag: 'daily_verses' },
  verses: { table: 'daily_verses', tag: 'daily_verses' },
  daily_verses: { table: 'daily_verses', tag: 'daily_verses' },
  media: { table: 'media_embeds' },
  media_embeds: { table: 'media_embeds' },
  settings: { table: 'site_settings', tag: 'site_settings' },
  site_settings: { table: 'site_settings', tag: 'site_settings' },
  subscribers: { table: 'email_subscribers' },
};

function resolveType(type: string | null) {
  if (!type) return null;
  return TABLE_MAP[type] || null;
}

export async function GET(request: NextRequest) {
  const isAuth = await getAdminSession();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const entry = resolveType(request.nextUrl.searchParams.get('type'));
  if (!entry) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

  if (!sql) return NextResponse.json({ items: [], message: 'Database not configured' });

  try {
    const orderClause =
      entry.table === 'site_settings' ? 'ORDER BY key ASC' : 'ORDER BY sort_order ASC NULLS LAST';
    const rows = await sql(`SELECT * FROM ${entry.table} ${orderClause}`);
    return NextResponse.json({ items: rows });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Query failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const isAuth = await getAdminSession();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { type, item } = await request.json();
  const entry = resolveType(type);
  if (!entry) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

  if (!sql) {
    return NextResponse.json({ message: 'Database not configured — changes are in-memory only' });
  }

  try {
    const cols = Object.keys(item);
    if (cols.length === 0) {
      return NextResponse.json({ error: 'Empty item' }, { status: 400 });
    }
    // JSON-stringify any object/array values so JSONB columns receive valid JSON.
    const vals = cols.map((c) => {
      const v = item[c];
      if (v !== null && typeof v === 'object') return JSON.stringify(v);
      return v;
    });

    const conflictKey = entry.table === 'site_settings' ? 'key' : 'id';
    const colList = cols.join(', ');
    const valPlaceholders = cols.map((_, i) => `$${i + 1}`).join(', ');
    const updateSet = cols
      .filter((c) => c !== conflictKey)
      .map((c) => `${c} = EXCLUDED.${c}`)
      .join(', ');

    const updateClause = updateSet
      ? `ON CONFLICT (${conflictKey}) DO UPDATE SET ${updateSet}, updated_at = NOW()`
      : `ON CONFLICT (${conflictKey}) DO NOTHING`;

    await sql(
      `INSERT INTO ${entry.table} (${colList}) VALUES (${valPlaceholders}) ${updateClause}`,
      vals
    );

    if (entry.tag) revalidateTag(entry.tag);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Query failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const isAuth = await getAdminSession();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { type, id } = await request.json();
  const entry = resolveType(type);
  if (!entry) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

  if (!sql) return NextResponse.json({ message: 'Database not configured' });

  try {
    const idCol = entry.table === 'site_settings' ? 'key' : 'id';
    await sql(`DELETE FROM ${entry.table} WHERE ${idCol} = $1`, [id]);

    if (entry.tag) revalidateTag(entry.tag);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Query failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
