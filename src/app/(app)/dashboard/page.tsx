import type { Metadata } from "next";
import { Bot, ListChecks, Package, Sparkles } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { PageHeader } from "@/components/app/page-header";
import { EmptyState } from "@/components/app/empty-state";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Dashboard" };

const stats = [
  { label: "Robots", value: 0, icon: Bot },
  { label: "Training jobs", value: 0, icon: ListChecks },
  { label: "Policies", value: 0, icon: Package },
];

export default async function DashboardPage() {
  const user = await requireUser();
  const name = user.email?.split("@")[0] ?? "there";

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
        {/* stat cards */}
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
          <h2 className="mb-4 text-sm font-medium text-muted">
            Recent training jobs
          </h2>
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
        </section>

        {/* robots */}
        <section>
          <h2 className="mb-4 text-sm font-medium text-muted">Your robots</h2>
          <EmptyState
            icon={Bot}
            title="No robots added"
            description="Add the Petoi Bittle preset to start training, or register your own robot."
            action={
              <ButtonLink href="/robots" variant="secondary">
                <Bot className="h-4 w-4" />
                Add a robot
              </ButtonLink>
            }
          />
        </section>
      </div>
    </>
  );
}
