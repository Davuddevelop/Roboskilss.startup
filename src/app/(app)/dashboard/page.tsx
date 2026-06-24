import type { Metadata } from "next";
import Link from "next/link";
import { Bot, ListChecks, Package, Sparkles, ChevronRight, PlayCircle } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { listRobots } from "@/lib/data/robots";
import { listJobs } from "@/lib/data/jobs";
import { BEHAVIORS } from "@/lib/robots/presets";
import { DEMO_JOB_ID } from "@/lib/demo/seed-data";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/app/empty-state";
import { JobStatusBadge } from "@/components/app/job-status-badge";
import { AddBittleButton } from "@/components/app/add-robot-button";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Dashboard" };

function behaviorName(id: string) {
  return BEHAVIORS.find((b) => b.id === id)?.name ?? id;
}

export default async function DashboardPage() {
  const user = await requireUser();
  const name = user.email?.split("@")[0] ?? "there";

  const [robots, jobs] = await Promise.all([listRobots(), listJobs()]);
  const policyCount = jobs.filter((j) => j.policy_url).length;

  const stats = [
    { label: "Robots", value: robots.length, icon: Bot },
    { label: "Training jobs", value: jobs.length, icon: ListChecks },
    { label: "Policies", value: policyCount, icon: Package },
  ];

  return (
    <>
      <PageHeader
        title={`Welcome, ${name}`}
        description="Train a new robot skill or pick up where you left off."
        action={
          <ButtonLink href="/train">
            <Sparkles className="h-4 w-4" />
            New training
          </ButtonLink>
        }
      />

      <div className="space-y-10 px-6 py-8">
        {/* featured seeded demo run — always available */}
        <Link
          href={`/jobs/${DEMO_JOB_ID}`}
          className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-xl border border-brand/40 bg-surface p-5 transition-colors hover:border-brand/70"
        >
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-80 rounded-full bg-brand/15 blur-[90px]" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-brand/40 bg-elevated text-brand-soft">
              <PlayCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">
                See a finished run — Bittle walking forward
              </p>
              <p className="mt-0.5 text-xs text-muted">
                Real reward curve, evaluation video, and a downloadable policy.
              </p>
            </div>
          </div>
          <span className="relative inline-flex items-center gap-1 text-sm text-brand-soft">
            Open demo
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-line bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">{s.label}</span>
                <s.icon className="h-4 w-4 text-faint" />
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* recent jobs */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted">
              Recent training jobs
            </h2>
            {jobs.length > 0 && (
              <Link
                href="/jobs"
                className="text-sm text-brand-soft hover:text-brand"
              >
                View all
              </Link>
            )}
          </div>
          {jobs.length === 0 ? (
            <EmptyState
              icon={ListChecks}
              title="No training jobs yet"
              description="Kick off your first run — pick the Bittle, choose “walk forward”, and watch it learn."
              action={
                <ButtonLink href="/train">
                  <Sparkles className="h-4 w-4" />
                  Train your first skill
                </ButtonLink>
              }
            />
          ) : (
            <div className="overflow-hidden rounded-xl border border-line">
              {jobs.slice(0, 5).map((job, i) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className={`flex items-center justify-between gap-4 bg-surface px-5 py-4 transition-colors hover:bg-elevated ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <span className="text-sm font-medium">
                    {behaviorName(job.behavior)}
                    <span className="ml-2 font-mono text-xs text-faint">
                      {job.params_json.commanded_speed} m/s
                    </span>
                  </span>
                  <div className="flex items-center gap-4">
                    <JobStatusBadge status={job.status} />
                    <ChevronRight className="h-4 w-4 text-faint" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* robots */}
        <section>
          <h2 className="mb-4 text-sm font-medium text-muted">Your robots</h2>
          {robots.length === 0 ? (
            <EmptyState
              icon={Bot}
              title="No robots added"
              description="Add the Petoi Bittle preset to start training, or register your own robot."
              action={<AddBittleButton />}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {robots.map((r) => (
                <Link
                  key={r.id}
                  href="/train"
                  className="rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line-strong bg-elevated text-brand-soft">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{r.name}</p>
                      <p className="font-mono text-xs text-faint">
                        {r.config_json.action_dim} DOF · {r.config_json.control_hz} Hz
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
