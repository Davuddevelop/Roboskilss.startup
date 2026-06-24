"use client";

import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./env";

/** Browser-side Supabase client (uses the public anon key). */
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
