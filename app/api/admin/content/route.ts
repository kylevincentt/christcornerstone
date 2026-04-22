import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

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

  if (!supabaseAdmin) return NextResponse.json({ items: [], message: 'Supabase not configured' });

  const { data, error } = await supabaseAdmin.from(TABLE_MAP[type]).select('*').order('sort_order', { ascending: true, nullsFirst: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data });
}

export async function POST(request: NextRequest) {
  const isAuth = await getAdminSession();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { type, item } = await request.json();
  if (!type || !TABLE_MAP[type]) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

  if (!supabaseAdmin) return NextResponse.json({ message: 'Supabase not configured — changes are in-memory only' });

  const { error } = await supabaseAdmin.from(TABLE_MAP[type]).upsert(item);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const isAuth = await getAdminSession();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { type, id } = await request.json();
  if (!type || !TABLE_MAP[type]) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

  if (!supabaseAdmin) return NextResponse.json({ message: 'Supabase not configured' });

  const { error } = await supabaseAdmin.from(TABLE_MAP[type]).delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}