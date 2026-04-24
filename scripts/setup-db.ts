/**
 * Database setup + seed script.
 *
 * Usage:
 *   npm run db:setup           — create tables and seed from lib/data.ts (idempotent)
 *   npm run db:setup -- --reset — drop and recreate everything (DANGEROUS)
 *
 * Reads DATABASE_URL / POSTGRES_URL / STORAGE_URL from .env.local.
 */
import { neon } from '@neondatabase/serverless';
import {
  DOCTRINES,
  APOLOGETICS_QUESTIONS,
  APOLOGETICS_CATEGORIES,
  RELIGIONS,
  QUOTES,
  LIBRARY_ITEMS,
  DAILY_VERSES,
} from '../lib/data';

// Load .env.local if running locally
import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });

const url =
  process.env.STORAGE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  '';

if (!url) {
  console.error(
    '\u2717 No DATABASE_URL / POSTGRES_URL / STORAGE_URL found in env.'
  );
  console.error('  Set one in .env.local before running this script.');
  process.exit(1);
}

const sql = neon(url);
const reset = process.argv.includes('--reset');

const TABLES = [
  'doctrines',
  'apologetics_categories',
  'apologetics_questions',
  'religions',
  'quotes',
  'library_items',
  'daily_verses',
  'media_embeds',
  'site_settings',
];

const SCHEMA_STATEMENTS: string[] = [
  `CREATE TABLE IF NOT EXISTS doctrines (
     id TEXT PRIMARY KEY, slug TEXT UNIQUE NOT NULL, tag TEXT NOT NULL,
     name TEXT NOT NULL, verse TEXT NOT NULL, description TEXT NOT NULL,
     hover_verse_text TEXT NOT NULL, hover_verse_citation TEXT NOT NULL,
     full_content TEXT, sort_order INTEGER NOT NULL DEFAULT 0,
     updated_at TIMESTAMPTZ DEFAULT NOW()
   )`,
  `CREATE INDEX IF NOT EXISTS idx_doctrines_slug ON doctrines(slug)`,
  `CREATE INDEX IF NOT EXISTS idx_doctrines_sort ON doctrines(sort_order)`,

  `CREATE TABLE IF NOT EXISTS apologetics_categories (
     id TEXT PRIMARY KEY, slug TEXT UNIQUE NOT NULL, icon TEXT NOT NULL,
     title TEXT NOT NULL, description TEXT NOT NULL,
     sort_order INTEGER NOT NULL DEFAULT 0, updated_at TIMESTAMPTZ DEFAULT NOW()
   )`,
  `CREATE INDEX IF NOT EXISTS idx_apolo_cats_slug ON apologetics_categories(slug)`,

  `CREATE TABLE IF NOT EXISTS apologetics_questions (
     id TEXT PRIMARY KEY, category TEXT NOT NULL, question TEXT NOT NULL,
     objection TEXT NOT NULL, response TEXT NOT NULL, go_deeper TEXT NOT NULL,
     sort_order INTEGER NOT NULL DEFAULT 0, updated_at TIMESTAMPTZ DEFAULT NOW()
   )`,
  `CREATE INDEX IF NOT EXISTS idx_apolo_q_category ON apologetics_questions(category)`,

  `CREATE TABLE IF NOT EXISTS religions (
     id TEXT PRIMARY KEY, slug TEXT UNIQUE NOT NULL, icon TEXT NOT NULL,
     name TEXT NOT NULL, adherents TEXT NOT NULL, description TEXT NOT NULL,
     comparison_points JSONB NOT NULL DEFAULT '[]'::jsonb, full_content TEXT,
     sort_order INTEGER NOT NULL DEFAULT 0, updated_at TIMESTAMPTZ DEFAULT NOW()
   )`,
  `CREATE INDEX IF NOT EXISTS idx_religions_slug ON religions(slug)`,

  `CREATE TABLE IF NOT EXISTS quotes (
     id TEXT PRIMARY KEY, text TEXT NOT NULL, author TEXT NOT NULL,
     era TEXT NOT NULL, avatar_emoji TEXT NOT NULL,
     sort_order INTEGER NOT NULL DEFAULT 0, updated_at TIMESTAMPTZ DEFAULT NOW()
   )`,

  `CREATE TABLE IF NOT EXISTS library_items (
     id TEXT PRIMARY KEY, tab TEXT NOT NULL, icon TEXT NOT NULL,
     name TEXT NOT NULL, description TEXT NOT NULL, url TEXT NOT NULL,
     link_text TEXT NOT NULL, sort_order INTEGER NOT NULL DEFAULT 0,
     updated_at TIMESTAMPTZ DEFAULT NOW()
   )`,
  `CREATE INDEX IF NOT EXISTS idx_library_tab ON library_items(tab)`,

  `CREATE TABLE IF NOT EXISTS daily_verses (
     id TEXT PRIMARY KEY, text TEXT NOT NULL, reference TEXT NOT NULL,
     sort_order INTEGER NOT NULL DEFAULT 0, updated_at TIMESTAMPTZ DEFAULT NOW()
   )`,

  `CREATE TABLE IF NOT EXISTS media_embeds (
     id TEXT PRIMARY KEY, type TEXT NOT NULL, embed_id TEXT NOT NULL,
     title TEXT NOT NULL, description TEXT, section TEXT NOT NULL,
     sort_order INTEGER NOT NULL DEFAULT 0, updated_at TIMESTAMPTZ DEFAULT NOW()
   )`,

  `CREATE TABLE IF NOT EXISTS site_settings (
     key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TIMESTAMPTZ DEFAULT NOW()
   )`,
];

async function main() {
  console.log(`\u2713 Connected to Neon database`);

  if (reset) {
    console.log('\n\u26a0  --reset flag set: dropping all content tables...');
    for (const t of TABLES) {
      await sql(`DROP TABLE IF EXISTS ${t} CASCADE`);
    }
    console.log(`  Dropped ${TABLES.length} tables.`);
  }

  console.log('\n\u2192 Creating tables (IF NOT EXISTS)...');
  for (const stmt of SCHEMA_STATEMENTS) {
    await sql(stmt);
  }
  console.log(`  Ran ${SCHEMA_STATEMENTS.length} schema statements.`);

  console.log('\n\u2192 Seeding content (ON CONFLICT DO NOTHING)...');

  let count = 0;
  for (const d of DOCTRINES) {
    await sql(
      `INSERT INTO doctrines (id, slug, tag, name, verse, description, hover_verse_text, hover_verse_citation, full_content, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT (id) DO NOTHING`,
      [d.id, d.slug, d.tag, d.name, d.verse, d.description, d.hover_verse_text, d.hover_verse_citation, d.full_content || null, d.sort_order]
    );
    count++;
  }
  console.log(`  Seeded ${count} doctrines`);

  count = 0;
  for (const c of APOLOGETICS_CATEGORIES) {
    await sql(
      `INSERT INTO apologetics_categories (id, slug, icon, title, description, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO NOTHING`,
      [c.id, c.slug, c.icon, c.title, c.description, Number(c.id)]
    );
    count++;
  }
  console.log(`  Seeded ${count} apologetics categories`);

  count = 0;
  for (const q of APOLOGETICS_QUESTIONS) {
    await sql(
      `INSERT INTO apologetics_questions (id, category, question, objection, response, go_deeper, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (id) DO NOTHING`,
      [q.id, q.category, q.question, q.objection, q.response, q.go_deeper, q.sort_order]
    );
    count++;
  }
  console.log(`  Seeded ${count} apologetics questions`);

  count = 0;
  for (const r of RELIGIONS) {
    await sql(
      `INSERT INTO religions (id, slug, icon, name, adherents, description, comparison_points, full_content, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT (id) DO NOTHING`,
      [r.id, r.slug, r.icon, r.name, r.adherents, r.description, JSON.stringify(r.comparison_points), r.full_content || null, r.sort_order]
    );
    count++;
  }
  console.log(`  Seeded ${count} religions`);

  count = 0;
  for (const q of QUOTES) {
    await sql(
      `INSERT INTO quotes (id, text, author, era, avatar_emoji, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (id) DO NOTHING`,
      [q.id, q.text, q.author, q.era, q.avatar_emoji, q.sort_order]
    );
    count++;
  }
  console.log(`  Seeded ${count} quotes`);

  count = 0;
  for (const l of LIBRARY_ITEMS) {
    await sql(
      `INSERT INTO library_items (id, tab, icon, name, description, url, link_text, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT (id) DO NOTHING`,
      [l.id, l.tab, l.icon, l.name, l.description, l.url, l.link_text, l.sort_order]
    );
    count++;
  }
  console.log(`  Seeded ${count} library items`);

  count = 0;
  for (let i = 0; i < DAILY_VERSES.length; i++) {
    const v = DAILY_VERSES[i];
    await sql(
      `INSERT INTO daily_verses (id, text, reference, sort_order)
       VALUES ($1,$2,$3,$4) ON CONFLICT (id) DO NOTHING`,
      [v.id, v.text, v.reference, i]
    );
    count++;
  }
  console.log(`  Seeded ${count} daily verses`);

  // Print final counts so the operator can confirm
  console.log('\n\u2713 Setup complete. Final row counts:');
  for (const t of TABLES) {
    const rows = (await sql(`SELECT COUNT(*) AS c FROM ${t}`)) as { c: string }[];
    console.log(`  ${t.padEnd(28)} ${rows[0].c}`);
  }
}

main().catch((err) => {
  console.error('\n\u2717 Setup failed:', err);
  process.exit(1);
});
