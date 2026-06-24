import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Get started with Roboskills: train a skill in the cloud and flash the policy onto a real Petoi Bittle.",
};

const toc = [
  { id: "quickstart", label: "Quickstart" },
  { id: "training", label: "Training a skill" },
  { id: "deploy", label: "Flash to a Bittle" },
  { id: "engine", label: "Engine contract" },
];

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-lg border border-line bg-elevated p-4 font-mono text-[13px] leading-relaxed text-foreground/90">
      <code>{children}</code>
    </pre>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line pt-10 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

export default function DocsPage() {
  return (
    <Container className="py-20">
      <div className="max-w-2xl">
        <Badge>Documentation</Badge>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight">
          Get a robot walking
        </h1>
        <p className="mt-4 text-lg text-muted">
          Train a skill in the cloud, then flash the policy onto a real Petoi
          Bittle. No reinforcement-learning background required.
        </p>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[200px_1fr]">
        {/* TOC */}
        <nav className="hidden lg:block">
          <div className="sticky top-24 space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-faint">
              On this page
            </p>
            {toc.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="block text-sm text-muted transition-colors hover:text-foreground"
              >
                {t.label}
              </a>
            ))}
          </div>
        </nav>

        {/* content */}
        <div className="max-w-2xl space-y-10">
          <Section id="quickstart" title="Quickstart">
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                <Link href="/signup" className="text-brand-soft hover:text-brand">
                  Create an account
                </Link>{" "}
                — it&apos;s free.
              </li>
              <li>Add the Petoi Bittle preset from the Robots page.</li>
              <li>
                Open <span className="font-mono text-foreground/90">Train</span>,
                pick “Walk forward”, set a commanded speed and budget, and start.
              </li>
              <li>
                Watch the reward curve climb on the job page, then download the
                policy when it finishes.
              </li>
            </ol>
            <p>
              Want to see the end state first? Open the{" "}
              <Link href="/dashboard" className="text-brand-soft hover:text-brand">
                seeded demo run
              </Link>{" "}
              — a finished Bittle walk-forward policy with a real reward curve,
              video, and download.
            </p>
          </Section>

          <Section id="training" title="Training a skill">
            <p>
              A training job is defined by three things you control, plus a seed:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground/90">Behavior</strong> — what to
                learn. “Walk forward” tracks a commanded forward velocity while
                staying upright.
              </li>
              <li>
                <strong className="text-foreground/90">Commanded speed</strong> —
                the target forward velocity, 0.1–0.6 m/s.
              </li>
              <li>
                <strong className="text-foreground/90">Budget</strong> — how long
                to train, in environment timesteps. More steps → smoother, more
                robust gaits.
              </li>
            </ul>
            <p>
              Under the hood we run PPO in massively-parallel MuJoCo simulation
              with domain randomization (masses, friction, motor strength,
              latency, sensor noise, pushes) so the policy survives the reality
              gap.
            </p>
          </Section>

          <Section id="deploy" title="Flash to a Bittle">
            <p>
              The downloaded policy bundle contains the trained actor and the
              observation-normalization statistics. A laptop tethered to the
              Bittle runs inference and streams joint commands over serial
              (OpenCat protocol) at the same control frequency used in
              simulation — <span className="font-mono text-foreground/90">50 Hz</span>.
            </p>
            <Code>{`# 1. Connect the Bittle over USB and note the serial port
# 2. Run the deploy bridge (from the engine repo)
python run_on_robot.py \\
  --policy bittle-walk-forward.policy.json \\
  --port /dev/ttyUSB0 \\
  --control-hz 50

# Dry-run first (no hardware) to print the command stream:
python run_on_robot.py --policy bittle-walk-forward.policy.json --mock`}</Code>
            <p>
              The observation vector built on-robot must match simulation exactly:
              projected gravity + gyro (IMU), joint positions &amp; velocities,
              previous action, a gait clock, and the commanded velocity.
            </p>
          </Section>

          <Section id="engine" title="Engine contract">
            <p>
              The platform talks to the RL engine through a small JSON contract,
              so the worker can be swapped or scaled independently. A job spec
              goes out; a result comes back.
            </p>
            <Code>{`// Job spec (platform → engine)
{
  "job_id": "…",
  "robot_type": "petoi_bittle",
  "robot_config": { "action_dim": 8, "control_hz": 50, "joints": ["…"] },
  "behavior": "walk_forward",
  "params": { "commanded_speed": 0.4, "timesteps": 1000000, "seed": 42 }
}

// Result (engine → platform)
{
  "job_id": "…",
  "metrics": { "final_forward_velocity": 0.41, "fall_rate": 0.03, "reward_curve": [...] },
  "policy_url": "…",
  "video_url": "…"
}`}</Code>
          </Section>
        </div>
      </div>
    </Container>
  );
}
