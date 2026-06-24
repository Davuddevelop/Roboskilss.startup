import type { Metadata } from "next";
import { Bot } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/app/empty-state";

export const metadata: Metadata = { title: "Robots" };

export default async function RobotsPage() {
  await requireUser();
  return (
    <>
      <PageHeader
        title="Robots"
        description="The robots you can train. The Bittle preset ships ready to go."
      />
      <div className="px-6 py-8">
        <EmptyState
          icon={Bot}
          title="Robot management lands in Phase 3"
          description="Adding the Bittle preset and registering custom robots is wired up next."
        />
      </div>
    </>
  );
}
