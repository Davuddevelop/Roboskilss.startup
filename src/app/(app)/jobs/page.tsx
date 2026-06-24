import type { Metadata } from "next";
import Link from "next/link";
import { ListChecks, ChevronRight } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { listJobs } from "@/lib/data/jobs";
import { BEHAVIORS } from "@/lib/robots/presets";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/app/empty-state";
import { JobStatusBadge } from "@/components/app/job-status-badge";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Jobs" };

function behaviorName(id: string) {
  return BEHAVIORS.find((b) => b.id === id)?.name ?? id;
}

export default async function JobsPage() {
  await requireUser();
  const jobs = await listJobs();

  return (
    <>
      <PageHeader
        title="Training jobs"
        description="Every run you've started, with live status and results."
        action={<ButtonLink href="/train">New training</ButtonLink>}
      />
      <div className="px-6 py-8">
        {jobs.length === 0 ? (
          <EmptyState
            icon={ListChecks}
            title="No training jobs yet"
            description="Start a run and it'll show up here with live status and downloadable results."
            action={
              <ButtonLink href="/train" variant="secondary">
                Start a run
              </ButtonLink>
            }
          />
        ) : (
          <div className="overflow-hidden rounded-xl border border-line">
            {jobs.map((job, i) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className={`flex items-center justify-between gap-4 bg-surface px-5 py-4 transition-colors hover:bg-elevated ${
                  i > 0 ? "border-t border-line" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {behaviorName(job.behavior)}
                    {job.is_demo && (
                      <span className="ml-2 rounded border border-line-strong px-1.5 py-0.5 align-middle font-mono text-[10px] text-faint">
                        demo
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-faint">
                    {job.params_json.commanded_speed} m/s ·{" "}
                    {(job.params_json.timesteps / 1000).toLocaleString()}k steps
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <JobStatusBadge status={job.status} />
                  <ChevronRight className="h-4 w-4 text-faint" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
