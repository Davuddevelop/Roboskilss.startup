"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, Loader2, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BEHAVIORS,
  BUDGET_TIERS,
  SPEED_RANGE,
} from "@/lib/robots/presets";
import { createTrainingJob, type TrainState } from "@/app/(app)/train/actions";
import type { Robot } from "@/lib/types/db";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-medium text-foreground">{label}</h2>
        {hint && <span className="text-xs text-faint">{hint}</span>}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="h-4 w-4" />
      )}
      Start training
    </Button>
  );
}

export function TrainForm({ robots }: { robots: Robot[] }) {
  const [state, formAction] = useActionState<TrainState, FormData>(
    createTrainingJob,
    {},
  );
  const [robotId, setRobotId] = useState(robots[0]?.id ?? "");
  const [behavior, setBehavior] = useState("walk_forward");
  const [tier, setTier] = useState("standard");
  const [speed, setSpeed] = useState(SPEED_RANGE.default);

  return (
    <form action={formAction} className="max-w-2xl space-y-9">
      {/* robot */}
      <Field label="Robot">
        <div className="grid gap-3 sm:grid-cols-2">
          {robots.map((r) => (
            <label
              key={r.id}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-lg border bg-surface px-4 py-3 transition-colors",
                robotId === r.id
                  ? "border-brand/60 ring-1 ring-brand/30"
                  : "border-line hover:border-line-strong",
              )}
            >
              <span>
                <span className="block text-sm font-medium">{r.name}</span>
                <span className="font-mono text-xs text-faint">
                  {r.config_json.action_dim} DOF · {r.config_json.control_hz} Hz
                </span>
              </span>
              <input
                type="radio"
                name="robot_id"
                value={r.id}
                checked={robotId === r.id}
                onChange={() => setRobotId(r.id)}
                className="sr-only"
              />
              {robotId === r.id && <Check className="h-4 w-4 text-brand-soft" />}
            </label>
          ))}
        </div>
      </Field>

      {/* behavior */}
      <Field label="Behavior">
        <div className="grid gap-3 sm:grid-cols-3">
          {BEHAVIORS.map((b) => (
            <label
              key={b.id}
              className={cn(
                "rounded-lg border bg-surface p-4 transition-colors",
                !b.available
                  ? "cursor-not-allowed border-line opacity-50"
                  : behavior === b.id
                    ? "cursor-pointer border-brand/60 ring-1 ring-brand/30"
                    : "cursor-pointer border-line hover:border-line-strong",
              )}
            >
              <input
                type="radio"
                name="behavior"
                value={b.id}
                disabled={!b.available}
                checked={behavior === b.id}
                onChange={() => setBehavior(b.id)}
                className="sr-only"
              />
              <span className="flex items-center justify-between">
                <span className="text-sm font-medium">{b.name}</span>
                {!b.available && (
                  <span className="text-[10px] uppercase tracking-wide text-faint">
                    Soon
                  </span>
                )}
              </span>
              <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                {b.description}
              </span>
            </label>
          ))}
        </div>
      </Field>

      {/* commanded speed */}
      <Field label="Commanded forward speed" hint={`${speed.toFixed(2)} m/s`}>
        <input
          type="range"
          name="commanded_speed"
          min={SPEED_RANGE.min}
          max={SPEED_RANGE.max}
          step={SPEED_RANGE.step}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full accent-brand"
        />
        <div className="mt-1 flex justify-between font-mono text-[11px] text-faint">
          <span>{SPEED_RANGE.min} m/s</span>
          <span>{SPEED_RANGE.max} m/s</span>
        </div>
      </Field>

      {/* budget */}
      <Field label="Training budget">
        <div className="grid gap-3 sm:grid-cols-3">
          {BUDGET_TIERS.map((t) => (
            <label
              key={t.id}
              className={cn(
                "cursor-pointer rounded-lg border bg-surface p-4 transition-colors",
                tier === t.id
                  ? "border-brand/60 ring-1 ring-brand/30"
                  : "border-line hover:border-line-strong",
              )}
            >
              <input
                type="radio"
                name="budget_tier"
                value={t.id}
                checked={tier === t.id}
                onChange={() => setTier(t.id)}
                className="sr-only"
              />
              <span className="flex items-center justify-between">
                <span className="text-sm font-medium">{t.name}</span>
                {tier === t.id && <Check className="h-4 w-4 text-brand-soft" />}
              </span>
              <span className="mt-1 block font-mono text-[11px] text-faint">
                {(t.timesteps / 1000).toLocaleString()}k steps
              </span>
              <span className="mt-1 block text-xs text-muted">{t.blurb}</span>
            </label>
          ))}
        </div>
      </Field>

      {state.error && (
        <div className="flex items-start gap-2 rounded-md border border-danger/30 bg-danger/10 px-3 py-2.5 text-sm text-danger">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="flex items-center gap-3 border-t border-line pt-6">
        <Submit />
        <p className="text-xs text-muted">
          Creates a training job and opens its live page.
        </p>
      </div>
    </form>
  );
}
