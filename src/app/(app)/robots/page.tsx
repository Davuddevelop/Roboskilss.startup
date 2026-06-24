import type { Metadata } from "next";
import { Bot, Cpu, Gauge, Plus } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { listRobots } from "@/lib/data/robots";
import { BITTLE_PRESET } from "@/lib/robots/presets";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/app/empty-state";
import { AddBittleButton } from "@/components/app/add-robot-button";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Robots" };

export default async function RobotsPage() {
  await requireUser();
  const robots = await listRobots();

  return (
    <>
      <PageHeader
        title="Robots"
        description="The robots you can train. The Bittle preset ships ready to go."
        action={robots.length > 0 ? <AddBittleButton label="Add another Bittle" variant="secondary" /> : undefined}
      />

      <div className="px-6 py-8">
        {robots.length === 0 ? (
          <EmptyState
            icon={Bot}
            title="No robots yet"
            description="Add the Petoi Bittle preset — 8-DOF quadruped, 50 Hz control, ready to train “walk forward”."
            action={<AddBittleButton />}
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {robots.map((r) => (
              <div
                key={r.id}
                className="rounded-xl border border-line bg-surface p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-line-strong bg-elevated text-brand-soft">
                    <Bot className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-xs text-faint">
                    {r.type}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-medium">{r.name}</h3>
                <div className="mt-4 space-y-2 text-sm text-muted">
                  <p className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-faint" />
                    {r.config_json.action_dim} actuated DOF
                  </p>
                  <p className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-faint" />
                    {r.config_json.control_hz} Hz control loop
                  </p>
                </div>
                <ButtonLink
                  href="/train"
                  variant="secondary"
                  size="sm"
                  className="mt-6 w-full"
                >
                  <Plus className="h-4 w-4" />
                  Train a skill
                </ButtonLink>
              </div>
            ))}
          </div>
        )}

        {/* preset reference */}
        <div className="mt-10 rounded-xl border border-line bg-surface/40 p-6">
          <h2 className="text-sm font-medium text-muted">Available preset</h2>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="font-medium">{BITTLE_PRESET.name}</span>
            <span className="text-faint">{BITTLE_PRESET.tagline}</span>
            <span className="font-mono text-xs text-faint">
              {BITTLE_PRESET.config.joints.length} joints · {BITTLE_PRESET.config.control_hz} Hz
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
