import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { GaitViewport } from "@/components/site/gait-viewport";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* form side */}
      <div className="relative flex flex-col px-6 py-8 sm:px-10">
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-12">
          {children}
        </div>
      </div>

      {/* brand side */}
      <div className="relative hidden overflow-hidden border-l border-line bg-surface/40 lg:block">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[420px] w-[520px] rounded-full bg-brand/15 blur-[120px]" />
        <div className="relative flex h-full flex-col justify-center px-12">
          <p className="font-mono text-xs uppercase tracking-widest text-faint">
            Roboskills
          </p>
          <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-tight">
            Teach any robot a new skill — no RL expertise required.
          </h2>
          <div className="mt-10 max-w-md">
            <GaitViewport />
          </div>
        </div>
      </div>
    </div>
  );
}
