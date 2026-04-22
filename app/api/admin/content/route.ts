import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { sql } from '@/lib/supabase';

// Whitelist of allowed table names — never interpolate user input as a table name
const TABLE_MAP: Record<string, string> = {
  doctrine: 'doctrines',
  apologetics: 'apologetics_questions',
  quote: 'quotes',
  religion: 'religions',
  library: 'library_items',
  verse: 'daily_verses',
  media: 'media_embeds',
  settings: 'site_settings',
  subscribers: 'email_subscribers',
};

export async function GET(request: NextRequest) {
  const isAuth = await getAdminSession();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const type = request.nextUrl.searchParams.get('type');
  if (!type || !TABLE_MAP[type]) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

  if (!sql) return NextResponse.json({ items: [], message: 'Database not configured' });

  try {
    const tableName = TABLE_MAP[type];
    // Use dynamic query — table name is from a safe whitelist, not user input
    const rows = await sql(`SELECT * FROM ${tableName} ORDER BY sort_order ASC NULLS LAST`);
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
  if (!type || !TABLE_MAP[type]) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

  if (!sql) return NextResponse.json({ message: 'Database not configured — changes are in-memory only' });

  try {
    const tableName = TABLE_MAP[type];
    const cols = Object.keys(item);
    const vals = Object.values(item);
    const colList = cols.join(', ');
    const valPlaceholders = cols.map((_, i) => `$${i + 1}`).join(', ');
    const updateSet = cols.filter(c => c !== 'id').map((c, i) => `${c} = $${cols.indexOf(c) + 1}`).join(', ');

    await sql(
      `INSERT INTO ${tableName} (${colList}) VALUES (${valPlaceholders})
       ON CONFLICT (id) DO UPDATE SET ${updateSet}`,
      vals
    );
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
  if (!type || !TABLE_MAP[type]) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

  if (!sql) return NextResponse.json({ message: 'Database not configured' });

  try {
    const tableName = TABLE_MAP[type];
    await sql(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Query failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
