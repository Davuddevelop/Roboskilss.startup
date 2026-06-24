import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, isUiPreview } from "@/lib/supabase/env";
import type { User } from "@supabase/supabase-js";

/** Stand-in user for NEXT_PUBLIC_PREVIEW_UI mode (design review only). */
const PREVIEW_USER = {
  id: "preview-user",
  email: "founder@roboskills.ai",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: "",
} as unknown as User;

/**
 * Returns the current user in a Server Component, or null. When Supabase isn't
 * configured we return null so pages can render a "connect Supabase" state
 * instead of crashing.
 */
export async function getUser(): Promise<User | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** Require an authenticated user; redirect to /login otherwise. */
export async function requireUser(): Promise<User> {
  const user = await getUser();
  if (user) return user;
  if (isUiPreview) return PREVIEW_USER;
  redirect("/login");
}
