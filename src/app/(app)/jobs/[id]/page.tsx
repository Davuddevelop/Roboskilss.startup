import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getJob } from "@/lib/data/jobs";
import { BEHAVIORS } from "@/lib/robots/presets";
import { PageHeader } from "@/components/app/page-header";
import { JobStatusBadge } from "@/components/app/job-status-badge";

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

  return (
    <>
      <PageHeader
        title={behaviorName(job.behavior)}
        description={`Job ${job.id.slice(0, 8)} · ${job.params_json.commanded_speed} m/s · ${(job.params_json.timesteps / 1000).toLocaleString()}k steps`}
        action={<JobStatusBadge status={job.status} />}
      />
      <div className="px-6 py-8">
        <Link
          href="/jobs"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All jobs
        </Link>

        <div className="rounded-xl border border-dashed border-line-strong bg-surface/40 p-8 text-center text-sm text-muted">
          Live reward curve, result video, and policy download arrive in
          Phase&nbsp;4 — wired to the seeded demo run.
        </div>
      </div>
    </>
  );
}
