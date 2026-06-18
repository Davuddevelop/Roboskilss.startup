import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-brand-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset,0_8px_24px_-8px_rgba(79,125,255,0.55)] hover:bg-brand-strong hover:shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset,0_10px_30px_-6px_rgba(79,125,255,0.7)] active:translate-y-px",
        secondary:
          "bg-elevated text-foreground border border-line-strong hover:border-faint hover:bg-line/40",
        ghost: "text-muted hover:text-foreground hover:bg-elevated",
        outline:
          "border border-line-strong text-foreground hover:border-brand/60 hover:text-brand-soft",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[0.95rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonBaseProps {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export interface ButtonLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link>,
    ButtonBaseProps {}

/** Button styled as a Next.js Link — for navigation CTAs. */
export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
