import { neon } from '@neondatabase/serverless';

const connectionString =
  process.env.STORAGE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  '';

// sql is a tagged-template SQL executor: await sql`SELECT * FROM table`
export const sql = connectionString ? neon(connectionString) : null;

// Legacy aliases so existing import paths still work
export const supabaseAdmin = sql ? { sql } : null;

export function isSupabaseConfigured() {
  return Boolean(connectionString);
}
