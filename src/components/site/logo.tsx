import Link from "next/link";
import { cn } from "@/lib/utils";

/** Roboskills mark — an abstract quadruped gait glyph in the brand accent. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={cn("h-7 w-7", className)}
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="26"
        height="26"
        rx="8"
        className="fill-elevated stroke-line-strong"
        strokeWidth="1.5"
      />
      <path
        d="M8 18.5V12a2 2 0 0 1 2-2h2.2M20 9.5V16a2 2 0 0 1-2 2h-2.2"
        className="stroke-brand"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="8" cy="18.5" r="1.6" className="fill-brand-soft" />
      <circle cx="20" cy="9.5" r="1.6" className="fill-brand-soft" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 font-semibold tracking-tight",
        className,
      )}
    >
      <LogoMark className="transition-transform duration-300 group-hover:scale-105" />
      <span className="text-[1.05rem] text-foreground">
        Robo<span className="text-muted">skills</span>
      </span>
    </Link>
  );
}
