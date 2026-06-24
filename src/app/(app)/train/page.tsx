import type { Metadata } from "next";
import { Bot } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { listRobots } from "@/lib/data/robots";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/app/empty-state";
import { TrainForm } from "@/components/app/train-form";
import { AddBittleButton } from "@/components/app/add-robot-button";

export const metadata: Metadata = { title: "Train" };

export default async function TrainPage() {
  await requireUser();
  const robots = await listRobots();

  return (
    <>
      <PageHeader
        title="Train a skill"
        description="Choose a robot and a behavior, set a budget, and start a run."
      />
      <div className="px-6 py-8">
        {robots.length === 0 ? (
          <EmptyState
            icon={Bot}
            title="Add a robot first"
            description="You need a robot before you can train it. Add the Bittle preset to get going."
            action={<AddBittleButton />}
          />
        ) : (
          <TrainForm robots={robots} />
        )}
      </div>
    </>
  );
}
