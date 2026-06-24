/**
 * Environment access for Supabase. Reads are centralized here so the rest of
 * the app can check `isSupabaseConfigured` and degrade gracefully when keys
 * are absent (e.g. the marketing site deploys and runs before Supabase is
 * wired up in Phase 2).
 */

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True only when both public Supabase values are present. */
export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

/** Live training enqueues real jobs; otherwise demo/seed data is served. */
export const isLiveTraining =
  process.env.NEXT_PUBLIC_LIVE_TRAINING === "true";

/**
 * UI-preview mode: lets the authenticated app shell render without a real
 * Supabase session, so the dashboard can be reviewed before auth is wired up.
 * Off by default — never enable in production.
 */
export const isUiPreview = process.env.NEXT_PUBLIC_PREVIEW_UI === "true";
