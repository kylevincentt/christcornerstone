-- ChristCornerstone content schema
-- Run via: npm run db:setup (preferred) or paste each statement into the Neon SQL editor.
-- All tables use TEXT primary keys to match the existing string IDs in lib/data.ts.

CREATE TABLE IF NOT EXISTS doctrines (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  tag TEXT NOT NULL,
  name TEXT NOT NULL,
  verse TEXT NOT NULL,
  description TEXT NOT NULL,
  hover_verse_text TEXT NOT NULL,
  hover_verse_citation TEXT NOT NULL,
  full_content TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_doctrines_slug ON doctrines(slug);
CREATE INDEX IF NOT EXISTS idx_doctrines_sort ON doctrines(sort_order);

CREATE TABLE IF NOT EXISTS apologetics_categories (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_apolo_cats_slug ON apologetics_categories(slug);

CREATE TABLE IF NOT EXISTS apologetics_questions (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  objection TEXT NOT NULL,
  response TEXT NOT NULL,
  go_deeper TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_apolo_q_category ON apologetics_questions(category);

CREATE TABLE IF NOT EXISTS religions (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT NOT NULL,
  name TEXT NOT NULL,
  adherents TEXT NOT NULL,
  description TEXT NOT NULL,
  comparison_points JSONB NOT NULL DEFAULT '[]'::jsonb,
  full_content TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_religions_slug ON religions(slug);

CREATE TABLE IF NOT EXISTS quotes (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  era TEXT NOT NULL,
  avatar_emoji TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS library_items (
  id TEXT PRIMARY KEY,
  tab TEXT NOT NULL,
  icon TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  link_text TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_library_tab ON library_items(tab);

CREATE TABLE IF NOT EXISTS daily_verses (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  reference TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS media_embeds (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  embed_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  section TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
