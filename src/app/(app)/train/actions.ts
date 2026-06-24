"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { isLiveTraining, isSupabaseConfigured } from "@/lib/supabase/env";
import { createJob } from "@/lib/data/jobs";
import { BEHAVIORS, BUDGET_TIERS, SPEED_RANGE } from "@/lib/robots/presets";
import type { JobParams } from "@/lib/types/db";

export type TrainState = { error?: string };

export async function createTrainingJob(
  _prev: TrainState,
  formData: FormData,
): Promise<TrainState> {
  if (!isSupabaseConfigured) {
    return { error: "Connect Supabase to create a training job." };
  }
  const user = await requireUser();

  const robotId = String(formData.get("robot_id") ?? "");
  const behavior = String(formData.get("behavior") ?? "walk_forward");
  const budgetTier = String(formData.get("budget_tier") ?? "standard");
  const speed = Number(formData.get("commanded_speed") ?? SPEED_RANGE.default);

  if (!robotId) return { error: "Choose a robot to train." };
  if (!BEHAVIORS.some((b) => b.id === behavior && b.available))
    return { error: "That behavior isn't available yet." };

  const tier = BUDGET_TIERS.find((t) => t.id === budgetTier) ?? BUDGET_TIERS[1];
  const commanded =
    Number.isFinite(speed) && speed >= SPEED_RANGE.min && speed <= SPEED_RANGE.max
      ? speed
      : SPEED_RANGE.default;

  const params: JobParams = {
    commanded_speed: Math.round(commanded * 100) / 100,
    timesteps: tier.timesteps,
    budget_tier: tier.id,
    // Seed derived from clock; deterministic enough for a job identifier.
    seed: Math.floor(Date.now() % 100000),
  };

  let jobId: string;
  try {
    jobId = await createJob({
      userId: user.id,
      robotId,
      behavior,
      params,
      // Demo mode (default) resolves to seeded data on the job page; live mode
      // leaves the job queued for the Python worker.
      isDemo: !isLiveTraining,
      status: isLiveTraining ? "queued" : "training",
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to start job." };
  }

  revalidatePath("/jobs");
  revalidatePath("/dashboard");
  redirect(`/jobs/${jobId}`);
}
