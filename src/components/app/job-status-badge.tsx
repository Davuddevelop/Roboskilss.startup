import { cn } from "@/lib/utils";
import type { JobStatus } from "@/lib/types/db";

const styles: Record<JobStatus, { label: string; className: string; dot: string }> = {
  queued: {
    label: "Queued",
    className: "border-line-strong text-muted",
    dot: "bg-faint",
  },
  training: {
    label: "Training",
    className: "border-brand/40 text-brand-soft",
    dot: "bg-brand animate-pulse",
  },
  succeeded: {
    label: "Succeeded",
    className: "border-success/30 text-success",
    dot: "bg-success",
  },
  failed: {
    label: "Failed",
    className: "border-danger/30 text-danger",
    dot: "bg-danger",
  },
  canceled: {
    label: "Canceled",
    className: "border-line-strong text-faint",
    dot: "bg-faint",
  },
};

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const s = styles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        s.className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}
