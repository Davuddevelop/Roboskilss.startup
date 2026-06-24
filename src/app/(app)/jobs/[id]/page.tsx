import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getJob } from "@/lib/data/jobs";
import { getRobot } from "@/lib/data/robots";
import { BEHAVIORS, BITTLE_PRESET } from "@/lib/robots/presets";
import {
  DEMO_METRICS,
  DEMO_POLICY_URL,
  DEMO_REWARD_CSV_URL,
  DEMO_VIDEO_URL,
} from "@/lib/demo/seed-data";
import { PageHeader } from "@/components/app/page-header";
import { JobStatusBadge } from "@/components/app/job-status-badge";
import { DemoJobView } from "@/components/app/demo-job-view";

export const metadata: Metadata = { title: "Job" };

function behaviorName(id: string) {
  return BEHAVIORS.find((b) => b.id === id)?.name ?? id;
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireUser();
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();

  const robot = await getRobot(job.robot_id);
  const controlHz =
    robot?.config_json.control_hz ?? BITTLE_PRESET.config.control_hz;

  return (
    <>
      <PageHeader
        title={behaviorName(job.behavior)}
        description={`Job ${job.id.slice(0, 8)} · ${job.params_json.commanded_speed} m/s · ${(job.params_json.timesteps / 1000).toLocaleString()}k steps`}
        action={job.is_demo ? undefined : <JobStatusBadge status={job.status} />}
      />

      <div className="px-6 py-8">
        <Link
          href="/jobs"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All jobs
        </Link>

        {job.is_demo ? (
          <DemoJobView
            metrics={job.metrics_json ?? DEMO_METRICS}
            params={job.params_json}
            videoUrl={job.video_url ?? DEMO_VIDEO_URL}
            policyUrl={job.policy_url ?? DEMO_POLICY_URL}
            rewardCsvUrl={DEMO_REWARD_CSV_URL}
            controlHz={controlHz}
          />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line-strong bg-surface/40 px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line-strong bg-elevated text-brand-soft">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-base font-medium">
              Waiting for the training worker
            </h3>
            <p className="mt-1.5 max-w-sm text-sm text-muted">
              This is a live job (status: {job.status}). Results stream in once
              the engine finishes. Live training is enabled via
              <code className="mx-1 font-mono text-xs">NEXT_PUBLIC_LIVE_TRAINING</code>.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
