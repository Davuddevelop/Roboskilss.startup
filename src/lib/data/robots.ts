import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, isUiPreview } from "@/lib/supabase/env";
import { BITTLE_PRESET, type RobotPreset } from "@/lib/robots/presets";
import type { Robot } from "@/lib/types/db";

/** Fixture shown in NEXT_PUBLIC_PREVIEW_UI mode so the UI is reviewable. */
const PREVIEW_ROBOT: Robot = {
  id: "preview-bittle",
  user_id: "preview-user",
  name: BITTLE_PRESET.name,
  type: BITTLE_PRESET.type,
  config_json: BITTLE_PRESET.config,
  created_at: "",
};

/** All robots owned by the current user (newest first). */
export async function listRobots(): Promise<Robot[]> {
  if (!isSupabaseConfigured) return isUiPreview ? [PREVIEW_ROBOT] : [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("robots")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Robot[];
}

export async function getRobot(id: string): Promise<Robot | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase.from("robots").select("*").eq("id", id).single();
  return (data as Robot) ?? null;
}

/** Insert a robot from a preset for the current user. Returns the new id. */
export async function addRobotFromPreset(
  userId: string,
  preset: RobotPreset,
): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("robots")
    .insert({
      user_id: userId,
      name: preset.name,
      type: preset.type,
      config_json: preset.config,
    })
    .select("id")
    .single();
  if (error) throw error;
  return (data as { id: string }).id;
}
