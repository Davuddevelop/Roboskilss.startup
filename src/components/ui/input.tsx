import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line-strong bg-elevated px-3.5 text-sm text-foreground placeholder:text-faint transition-colors outline-none focus-visible:border-brand/70 focus-visible:ring-2 focus-visible:ring-brand/30 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "block text-sm font-medium text-foreground/90",
        className,
      )}
      {...props}
    />
  );
}
