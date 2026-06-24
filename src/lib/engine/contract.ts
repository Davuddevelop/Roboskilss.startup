/**
 * Engine contract — the clean, documented boundary between the PLATFORM (this
 * app) and the ENGINE (the Python RL worker: MuJoCo + Stable-Baselines3 PPO).
 *
 * The engine is treated as an external worker. The platform writes a job spec
 * and reads back a result; it never imports engine code. This lets the engine
 * be swapped or scaled independently.
 *
 *   Job spec (out) → robot type, robot config, behavior, params, seed
 *   Result (in)    → policy file, metrics (reward curve, velocity, fall rate),
 *                    result video
 */

import type { JobMetrics, JobParams, RobotConfig } from "@/lib/types/db";

/** Written by the platform, consumed by the engine worker. */
export interface EngineJobSpec {
  job_id: string;
  robot_type: string;
  robot_config: RobotConfig;
  behavior: string;
  params: JobParams;
  seed: number;
}

/** Returned by the engine worker when a job finishes. */
export interface EngineResult {
  job_id: string;
  metrics: JobMetrics;
  /** Storage URL of the deployable policy artifact. */
  policy_url: string;
  policy_format: "onnx" | "zip" | "pt";
  /** Storage URL of the rendered evaluation video. */
  video_url: string;
}

/**
 * How a submitted job is fulfilled. Demo mode resolves immediately to seeded
 * data so the product is fully clickable without a live worker; live mode
 * enqueues a `queued` row for the Python worker to poll. The two share this
 * interface so the engine can be wired in later behind a feature flag.
 */
export type SubmitMode = "demo" | "live";
