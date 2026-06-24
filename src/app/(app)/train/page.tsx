import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/app/empty-state";

export const metadata: Metadata = { title: "Train" };

export default async function TrainPage() {
  await requireUser();
  return (
    <>
      <PageHeader
        title="Train a skill"
        description="Choose a robot and a behavior, set a budget, and start a run."
      />
      <div className="px-6 py-8">
        <EmptyState
          icon={Sparkles}
          title="The training form lands in Phase 3"
          description="Submitting here will create a training job and take you to its live page."
        />
      </div>
    </>
  );
}
