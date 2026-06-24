"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addBittle } from "@/app/(app)/robots/actions";

export function AddBittleButton({
  variant = "primary",
  label = "Add Bittle",
}: {
  variant?: "primary" | "secondary";
  label?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onClick = () =>
    startTransition(async () => {
      setError(null);
      const res = await addBittle();
      if (res.error) setError(res.error);
      else router.refresh();
    });

  return (
    <div className="flex flex-col items-start gap-2">
      <Button variant={variant} onClick={onClick} disabled={pending}>
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
        {label}
      </Button>
      {error && (
        <p className="flex items-center gap-1.5 text-sm text-danger">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}
