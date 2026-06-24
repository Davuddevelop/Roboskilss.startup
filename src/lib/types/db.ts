/** Row types mirroring `supabase/schema.sql`. */

export type JobStatus =
  | "queued"
  | "training"
  | "succeeded"
  | "failed"
  | "canceled";

export type PolicyFormat = "onnx" | "zip" | "pt" | "json";

export interface RobotConfig {
  /** Actuated leg DOF (Bittle = 8). */
  action_dim: number;
  /** Control loop frequency in Hz (sim and real must match). */
  control_hz: number;
  joints: string[];
  description?: string;
  [key: string]: unknown;
}

export interface Robot {
  id: string;
  user_id: string;
  name: string;
  type: string;
  config_json: RobotConfig;
  created_at: string;
}

export interface JobParams {
  /** Commanded forward velocity in m/s. */
  commanded_speed: number;
  /** Training budget in environment timesteps. */
  timesteps: number;
  /** Budget tier id, for display. */
  budget_tier: string;
  seed: number;
}

export interface RewardPoint {
  step: number;
  reward: number;
}

export interface JobMetrics {
  reward_curve: RewardPoint[];
  final_forward_velocity: number;
  episode_length: number;
  fall_rate: number;
}

export interface TrainingJob {
  id: string;
  user_id: string;
  robot_id: string;
  behavior: string;
  params_json: JobParams;
  status: JobStatus;
  is_demo: boolean;
  metrics_json: JobMetrics | null;
  policy_url: string | null;
  video_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Policy {
  id: string;
  job_id: string;
  file_url: string;
  format: PolicyFormat;
  created_at: string;
}
