#!/usr/bin/env node
/**
 * Seed the demo data into a Supabase project: a Bittle robot, a finished
 * "walk forward" training job (with metrics + asset URLs), and its policy row.
 *
 * Usage:
 *   node scripts/seed.mjs <user-email>
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the
 * environment (e.g. `set -a; . .env.local; set +a`). The service role key
 * bypasses RLS — never expose it to the browser.
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.argv[2];

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}
if (!email) {
  console.error("Usage: node scripts/seed.mjs <user-email>");
  process.exit(1);
}

function rewardCurve(points = 120) {
  const total = 1_000_000;
  const out = [];
  for (let i = 0; i < points; i++) {
    const t = i / (points - 1);
    const climb = 1080 * (1 - Math.exp(-3.2 * t));
    const dip = -180 * Math.exp(-Math.pow((t - 0.18) / 0.07, 2));
    const ripple = 14 * Math.sin(t * 38) * (1 - t) + 8 * Math.sin(t * 13);
    out.push({
      step: Math.round(t * total),
      reward: Math.round(Math.max(-40, climb + dip + ripple - 60) * 10) / 10,
    });
  }
  return out;
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

// Resolve the user id from email via the admin API.
const { data: list, error: listErr } = await supabase.auth.admin.listUsers();
if (listErr) {
  console.error("Failed to list users:", listErr.message);
  process.exit(1);
}
const user = list.users.find((u) => u.email === email);
if (!user) {
  console.error(`No user found with email ${email}. Sign up first.`);
  process.exit(1);
}

// 1. Robot
const { data: robot, error: robotErr } = await supabase
  .from("robots")
  .insert({
    user_id: user.id,
    name: "Petoi Bittle",
    type: "petoi_bittle",
    config_json: {
      action_dim: 8,
      control_hz: 50,
      joints: [
        "left-front-shoulder", "left-front-knee", "right-front-shoulder",
        "right-front-knee", "left-back-shoulder", "left-back-knee",
        "right-back-shoulder", "right-back-knee",
      ],
    },
  })
  .select("id")
  .single();
if (robotErr) {
  console.error("Robot insert failed:", robotErr.message);
  process.exit(1);
}

// 2. Training job (finished demo run)
const { data: job, error: jobErr } = await supabase
  .from("training_jobs")
  .insert({
    user_id: user.id,
    robot_id: robot.id,
    behavior: "walk_forward",
    params_json: { commanded_speed: 0.4, timesteps: 1_000_000, budget_tier: "standard", seed: 42 },
    status: "succeeded",
    is_demo: true,
    metrics_json: {
      reward_curve: rewardCurve(),
      final_forward_velocity: 0.41,
      episode_length: 1000,
      fall_rate: 0.03,
    },
    policy_url: "/seed/bittle-walk-forward.policy.json",
    video_url: "/seed/bittle-walk.webm",
  })
  .select("id")
  .single();
if (jobErr) {
  console.error("Job insert failed:", jobErr.message);
  process.exit(1);
}

// 3. Policy row
const { error: polErr } = await supabase.from("policies").insert({
  job_id: job.id,
  file_url: "/seed/bittle-walk-forward.policy.json",
  format: "json",
});
if (polErr) {
  console.error("Policy insert failed:", polErr.message);
  process.exit(1);
}

console.log(`Seeded demo run for ${email}: robot ${robot.id}, job ${job.id}`);
