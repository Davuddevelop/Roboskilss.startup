import type { RobotConfig } from "@/lib/types/db";

export interface RobotPreset {
  type: string;
  name: string;
  tagline: string;
  /** Quadruped, biped, arm… shown as a chip. */
  category: string;
  config: RobotConfig;
}

/**
 * Petoi Bittle — first supported robot. 4 legs × (shoulder + knee) = 8 actuated
 * leg DOF; the head/neck servo is excluded from the walking action space.
 * Control loop is 50 Hz (sim and real must match).
 */
export const BITTLE_PRESET: RobotPreset = {
  type: "petoi_bittle",
  name: "Petoi Bittle",
  tagline: "9-DOF palm-sized quadruped",
  category: "Quadruped",
  config: {
    action_dim: 8,
    control_hz: 50,
    joints: [
      "left-front-shoulder",
      "left-front-knee",
      "right-front-shoulder",
      "right-front-knee",
      "left-back-shoulder",
      "left-back-knee",
      "right-back-shoulder",
      "right-back-knee",
    ],
    description:
      "Petoi Bittle quadruped. 8 actuated leg joints under a 50 Hz PD position controller; IMU-only deployable observations for sim-to-real transfer.",
  },
};

export const ROBOT_PRESETS: Record<string, RobotPreset> = {
  [BITTLE_PRESET.type]: BITTLE_PRESET,
};

export interface Behavior {
  id: string;
  name: string;
  description: string;
  available: boolean;
}

export const BEHAVIORS: Behavior[] = [
  {
    id: "walk_forward",
    name: "Walk forward",
    description:
      "Track a commanded forward velocity while staying upright and stable.",
    available: true,
  },
  {
    id: "turn_in_place",
    name: "Turn in place",
    description: "Rotate to a target heading without drifting.",
    available: false,
  },
  {
    id: "trot",
    name: "Trot gait",
    description: "A faster diagonal gait at higher commanded speeds.",
    available: false,
  },
];

export interface BudgetTier {
  id: string;
  name: string;
  timesteps: number;
  blurb: string;
}

/** Training budgets, expressed in environment timesteps. */
export const BUDGET_TIERS: BudgetTier[] = [
  { id: "quick", name: "Quick", timesteps: 250_000, blurb: "~2 min · a first look" },
  { id: "standard", name: "Standard", timesteps: 1_000_000, blurb: "~10 min · stable walking" },
  { id: "thorough", name: "Thorough", timesteps: 3_000_000, blurb: "~30 min · robust + smooth" },
];

export const SPEED_RANGE = { min: 0.1, max: 0.6, step: 0.05, default: 0.3 };
