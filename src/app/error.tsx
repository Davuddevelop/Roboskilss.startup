"use client";

import { useEffect } from "react";
import { RotateCw } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { Button, ButtonLink } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to your error tracker here.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Logo />
      <p className="mt-10 font-mono text-sm text-danger">Something broke</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        An unexpected error occurred
      </h1>
      <p className="mt-3 max-w-sm text-muted">
        We&apos;ve logged it. You can retry, or head back home.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>
          <RotateCw className="h-4 w-4" />
          Try again
        </Button>
        <ButtonLink href="/" variant="secondary">
          Back home
        </ButtonLink>
      </div>
    </div>
  );
}
