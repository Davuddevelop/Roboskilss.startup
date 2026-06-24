"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { addRobotFromPreset } from "@/lib/data/robots";
import { BITTLE_PRESET } from "@/lib/robots/presets";

export type RobotActionState = { error?: string };

/** Add the Bittle preset to the current user's robots. */
export async function addBittle(): Promise<RobotActionState> {
  if (!isSupabaseConfigured) {
    return { error: "Connect Supabase to add robots." };
  }
  const user = await requireUser();
  try {
    await addRobotFromPreset(user.id, BITTLE_PRESET);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to add robot." };
  }
  revalidatePath("/robots");
  revalidatePath("/dashboard");
  return {};
}
