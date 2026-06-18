import Link from "next/link";
import { Logo } from "./logo";
import { Container } from "@/components/ui/container";

const groups: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/#robots", label: "Robots" },
      { href: "/pricing", label: "Pricing" },
      { href: "/train", label: "Train a skill" },
    ],
  },
  {
    title: "Developers",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/docs#deploy", label: "Flash to a Bittle" },
      { href: "/docs#engine", label: "Engine contract" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#how", label: "About" },
      { href: "/login", label: "Log in" },
      { href: "/signup", label: "Get started" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface/40">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Teach any robot a new skill. Reinforcement learning in the cloud,
              a deployable policy in minutes.
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-sm font-medium text-foreground">{g.title}</h4>
              <ul className="mt-4 space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-sm text-faint sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Roboskills. All rights reserved.</p>
          <p className="font-mono text-xs">Physical AI, made trainable.</p>
        </div>
      </Container>
    </footer>
  );
}
