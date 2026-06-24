import { LogOut } from "lucide-react";
import { signOut } from "@/app/(auth)/actions";
import { ButtonLink } from "@/components/ui/button";

export function Topbar({ email }: { email: string }) {
  const initial = (email[0] ?? "u").toUpperCase();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-line px-6">
      <div className="flex items-center gap-2 md:hidden">
        <span className="font-semibold tracking-tight">Roboskills</span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <ButtonLink href="/train" size="sm">
          New training
        </ButtonLink>
        <div className="flex items-center gap-2.5 border-l border-line pl-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong bg-elevated text-xs font-medium text-brand-soft">
            {initial}
          </div>
          <span className="hidden text-sm text-muted sm:block">{email}</span>
          <form action={signOut}>
            <button
              type="submit"
              aria-label="Sign out"
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-elevated hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
