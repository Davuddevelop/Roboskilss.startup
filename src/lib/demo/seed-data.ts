/**
 * Seed data for DEMO MODE — the investor-demo backbone.
 *
 * A canonical "Bittle — walk forward" run with a realistic PPO reward curve,
 * final metrics, a result video and a downloadable policy. Everything here is
 * pre-computed and self-contained, so the full product flow works end-to-end
 * even when Supabase and the live RL worker aren't wired up.
 */

import type {
  JobMetrics,
  JobParams,
  RewardPoint,
  Robot,
  TrainingJob,
} from "@/lib/types/db";
import { BITTLE_PRESET } from "@/lib/robots/presets";

/** Stable id for the seeded demo job (also usable as a route param). */
export const DEMO_JOB_ID = "demo-bittle-walk-forward";
export const DEMO_ROBOT_ID = "demo-bittle";

export const DEMO_VIDEO_URL = "/seed/bittle-walk.webm";
export const DEMO_POLICY_URL = "/seed/bittle-walk-forward.policy.json";
export const DEMO_REWARD_CSV_URL = "/seed/bittle-walk-forward.reward.csv";

/**
 * Deterministic PPO-style learning curve: fast early gains, a plateau dip as
 * the gait destabilizes, then convergence. Pure function of `step` so it's
 * identical on server and client (no RNG).
 */
export function demoRewardCurve(points = 120): RewardPoint[] {
  const total = 1_000_000; // standard budget
  const out: RewardPoint[] = [];
  for (let i = 0; i < points; i++) {
    const t = i / (points - 1);
    const step = Math.round(t * total);
    // Saturating climb to ~1050, minus an early instability dip, plus a small
    // deterministic ripple so it reads like real training noise.
    const climb = 1080 * (1 - Math.exp(-3.2 * t));
    const dip = -180 * Math.exp(-Math.pow((t - 0.18) / 0.07, 2));
    const ripple = 14 * Math.sin(t * 38) * (1 - t) + 8 * Math.sin(t * 13);
    const reward = Math.max(-40, climb + dip + ripple - 60);
    out.push({ step, reward: Math.round(reward * 10) / 10 });
  }
  return out;
}

export const DEMO_METRICS: JobMetrics = {
  reward_curve: demoRewardCurve(),
  final_forward_velocity: 0.41,
  episode_length: 1000,
  fall_rate: 0.03,
};

export const DEMO_PARAMS: JobParams = {
  commanded_speed: 0.4,
  timesteps: 1_000_000,
  budget_tier: "standard",
  seed: 42,
};

export const DEMO_ROBOT: Robot = {
  id: DEMO_ROBOT_ID,
  user_id: "demo",
  name: BITTLE_PRESET.name,
  type: BITTLE_PRESET.type,
  config_json: BITTLE_PRESET.config,
  created_at: "2026-06-01T00:00:00.000Z",
};

export const DEMO_JOB: TrainingJob = {
  id: DEMO_JOB_ID,
  user_id: "demo",
  robot_id: DEMO_ROBOT_ID,
  behavior: "walk_forward",
  params_json: DEMO_PARAMS,
  status: "succeeded",
  is_demo: true,
  metrics_json: DEMO_METRICS,
  policy_url: DEMO_POLICY_URL,
  video_url: DEMO_VIDEO_URL,
  created_at: "2026-06-01T00:00:00.000Z",
  updated_at: "2026-06-01T00:11:00.000Z",
};

export function isDemoJobId(id: string): boolean {
  return id === DEMO_JOB_ID;
}
