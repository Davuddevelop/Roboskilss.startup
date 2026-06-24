"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bot, Sparkles, ListChecks } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/robots", label: "Robots", icon: Bot },
  { href: "/train", label: "Train", icon: Sparkles },
  { href: "/jobs", label: "Jobs", icon: ListChecks },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-surface/40 md:flex">
      <div className="flex h-16 items-center px-5">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {nav.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-elevated text-foreground"
                  : "text-muted hover:bg-elevated/60 hover:text-foreground",
              )}
            >
              <item.icon
                className={cn("h-4 w-4", active && "text-brand-soft")}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 pb-4">
        <Link
          href="/docs"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-faint transition-colors hover:text-foreground"
        >
          Documentation
        </Link>
      </div>
    </aside>
  );
}
