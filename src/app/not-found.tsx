import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Logo />
      <p className="mt-10 font-mono text-sm text-brand-soft">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 max-w-sm text-muted">
        The link may be broken or the page may have moved. Let&apos;s get you
        back on track.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/dashboard" variant="secondary">
          Go to dashboard
        </ButtonLink>
      </div>
      <Link
        href="/docs"
        className="mt-6 text-sm text-muted transition-colors hover:text-foreground"
      >
        Read the docs
      </Link>
    </div>
  );
}
