import type { Metadata } from "next";
import { ListChecks } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/app/empty-state";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Jobs" };

export default async function JobsPage() {
  await requireUser();
  return (
    <>
      <PageHeader
        title="Training jobs"
        description="Every run you've started, with live status and results."
      />
      <div className="px-6 py-8">
        <EmptyState
          icon={ListChecks}
          title="No training jobs yet"
          description="Job history and live monitoring arrive in Phase 4, alongside the seeded demo run."
          action={
            <ButtonLink href="/train" variant="secondary">
              Start a run
            </ButtonLink>
          }
        />
      </div>
    </>
  );
}
