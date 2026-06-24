"use client";

import { useEffect, useRef, useState } from "react";
import { Download, FileDown, Gauge, Timer, TrendingUp, RotateCw } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { JobStatusBadge } from "@/components/app/job-status-badge";
import { RewardChart } from "@/components/app/reward-chart";
import { cn } from "@/lib/utils";
import type { JobMetrics, JobParams } from "@/lib/types/db";

const TRAIN_MS = 5200;

export function DemoJobView({
  metrics,
  params,
  videoUrl,
  policyUrl,
  rewardCsvUrl,
  controlHz,
}: {
  metrics: JobMetrics;
  params: JobParams;
  videoUrl: string;
  policyUrl: string;
  rewardCsvUrl: string;
  controlHz: number;
}) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [runId, setRunId] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / TRAIN_MS);
      setProgress(p);
      if (p < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [runId]);

  const replay = () => {
    setDone(false);
    setProgress(0);
    setRunId((n) => n + 1);
  };

  const shownStep = Math.round(params.timesteps * progress);
  const curve = metrics.reward_curve;
  const shownReward =
    curve[Math.min(curve.length - 1, Math.floor((curve.length - 1) * progress))]
      ?.reward ?? 0;
  const stableSeconds = metrics.episode_length / controlHz;

  const stats = [
    {
      icon: TrendingUp,
      label: "Forward velocity",
      value: done ? `${metrics.final_forward_velocity.toFixed(2)} m/s` : "—",
      sub: `commanded ${params.commanded_speed} m/s`,
    },
    {
      icon: Timer,
      label: "Stable walking",
      value: done ? `${stableSeconds.toFixed(0)} s` : "—",
      sub: `${metrics.episode_length} steps @ ${controlHz} Hz`,
    },
    {
      icon: Gauge,
      label: "Fall rate",
      value: done ? `${Math.round(metrics.fall_rate * 100)}%` : "—",
      sub: "over 100 eval episodes",
    },
  ];

  return (
    <div className="space-y-6">
      {/* live status row */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface px-5 py-3.5">
        <div className="flex items-center gap-3">
          <JobStatusBadge status={done ? "succeeded" : "training"} />
          <span className="font-mono text-xs text-faint">
            {shownStep.toLocaleString()} / {params.timesteps.toLocaleString()} steps
          </span>
        </div>
        {done && (
          <button
            onClick={replay}
            className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
          >
            <RotateCw className="h-3.5 w-3.5" />
            Replay run
          </button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* video */}
        <div className="overflow-hidden rounded-xl border border-line-strong bg-surface">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
            <span className="ml-3 font-mono text-xs text-faint">
              evaluation rollout
            </span>
          </div>
          <div className="relative aspect-video bg-background">
            <video
              key={runId}
              className="h-full w-full object-cover"
              src={videoUrl}
              poster="/seed/bittle-walk.poster.png"
              autoPlay
              loop
              muted
              playsInline
            />
            {!done && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm">
                <div className="h-1 w-48 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full bg-brand transition-[width] duration-100"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
                <p className="mt-3 font-mono text-xs text-muted">
                  training policy · {Math.round(progress * 100)}%
                </p>
              </div>
            )}
          </div>
        </div>

        {/* metrics + downloads */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-line bg-surface p-4"
              >
                <div className="flex items-center gap-2 text-sm text-muted">
                  <s.icon className="h-4 w-4 text-faint" />
                  {s.label}
                </div>
                <p className="mt-1.5 text-2xl font-semibold tracking-tight">
                  {s.value}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-faint">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-line bg-surface p-4">
            <h3 className="text-sm font-medium">Deployable policy</h3>
            <p className="mt-1 text-xs text-muted">
              Trained actor + observation normalization stats. Flash to a real
              Bittle over serial.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={done ? policyUrl : undefined}
                download
                aria-disabled={!done}
                className={cn(
                  buttonVariants({ variant: "primary", size: "md" }),
                  "w-full",
                  !done && "pointer-events-none opacity-50",
                )}
              >
                <Download className="h-4 w-4" />
                Download policy
              </a>
              <a
                href={done ? rewardCsvUrl : undefined}
                download
                aria-disabled={!done}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "md" }),
                  "w-full",
                  !done && "pointer-events-none opacity-50",
                )}
              >
                <FileDown className="h-4 w-4" />
                Reward curve (CSV)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* reward chart */}
      <div className="rounded-xl border border-line bg-surface p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted">Training reward</h3>
          <span className="font-mono text-xs text-brand-soft">
            {shownReward.toFixed(0)}
          </span>
        </div>
        <RewardChart data={curve} progress={progress} />
      </div>
    </div>
  );
}
