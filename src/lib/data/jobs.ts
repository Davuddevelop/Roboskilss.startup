import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { JobParams, TrainingJob } from "@/lib/types/db";

export async function listJobs(): Promise<TrainingJob[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("training_jobs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as TrainingJob[];
}

export async function getJob(id: string): Promise<TrainingJob | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("training_jobs")
    .select("*")
    .eq("id", id)
    .single();
  return (data as TrainingJob) ?? null;
}

export interface NewJobInput {
  userId: string;
  robotId: string;
  behavior: string;
  params: JobParams;
  isDemo: boolean;
  status: TrainingJob["status"];
}

/** Insert a training job and return its id. */
export async function createJob(input: NewJobInput): Promise<string> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("training_jobs")
    .insert({
      user_id: input.userId,
      robot_id: input.robotId,
      behavior: input.behavior,
      params_json: input.params,
      status: input.status,
      is_demo: input.isDemo,
    })
    .select("id")
    .single();
  if (error) throw error;
  return (data as { id: string }).id;
}
