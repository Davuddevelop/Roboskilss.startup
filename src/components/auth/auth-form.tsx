"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { type AuthState } from "@/app/(auth)/actions";

type Mode = "login" | "signup";

const copy: Record<
  Mode,
  { title: string; sub: string; cta: string; altText: string; altHref: string; altLink: string }
> = {
  login: {
    title: "Welcome back",
    sub: "Log in to run training jobs and download policies.",
    cta: "Log in",
    altText: "New here?",
    altHref: "/signup",
    altLink: "Create an account",
  },
  signup: {
    title: "Create your account",
    sub: "Start training your first robot skill — free.",
    cta: "Create account",
    altText: "Already have an account?",
    altHref: "/login",
    altLink: "Log in",
  },
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : label}
    </Button>
  );
}

export function AuthForm({
  mode,
  action,
}: {
  mode: Mode;
  action: (prev: AuthState, formData: FormData) => Promise<AuthState>;
}) {
  const [state, formAction] = useActionState<AuthState, FormData>(action, {});
  const c = copy[mode];

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-semibold tracking-tight">{c.title}</h1>
      <p className="mt-2 text-sm text-muted">{c.sub}</p>

      <form action={formAction} className="mt-8 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            placeholder="••••••••"
            required
            minLength={mode === "signup" ? 8 : undefined}
          />
        </div>

        {state.error && (
          <div className="flex items-start gap-2 rounded-md border border-danger/30 bg-danger/10 px-3 py-2.5 text-sm text-danger">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}
        {state.message && (
          <div className="flex items-start gap-2 rounded-md border border-success/30 bg-success/10 px-3 py-2.5 text-sm text-success">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}

        <SubmitButton label={c.cta} />
      </form>

      <p className="mt-6 text-sm text-muted">
        {c.altText}{" "}
        <Link href={c.altHref} className="font-medium text-brand-soft hover:text-brand">
          {c.altLink}
        </Link>
      </p>
    </div>
  );
}
