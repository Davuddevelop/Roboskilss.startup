import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start free. Scale to unlimited training runs and every supported robot.",
};

type Tier = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "Train your first robot skills and deploy them.",
    features: [
      "3 training jobs / month",
      "Petoi Bittle preset",
      "Downloadable policies",
      "Community support",
    ],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "$49",
    cadence: "per month",
    blurb: "For builders shipping real behaviors on real hardware.",
    features: [
      "Unlimited training jobs",
      "Priority GPU training queue",
      "Every robot as it ships",
      "Domain-randomized robustness",
      "Email support",
    ],
    cta: "Start Pro trial",
    featured: true,
  },
  {
    name: "Team",
    price: "$199",
    cadence: "per month",
    blurb: "Shared robots and runs for a whole team.",
    features: [
      "Everything in Pro",
      "5 seats included",
      "Shared robots & policies",
      "Usage analytics",
      "SLA & onboarding",
    ],
    cta: "Talk to us",
  },
];

export default function PricingPage() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-[700px] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge>Pricing</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Start free. Scale when it walks.
          </h1>
          <p className="mt-4 text-lg text-muted">
            Every plan includes the full sim-to-real pipeline and deployable
            policies. No GPUs to manage.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-2xl border bg-surface p-7",
                  t.featured
                    ? "border-brand/50 shadow-[0_0_0_1px_rgba(79,125,255,0.2),0_30px_70px_-30px_rgba(79,125,255,0.5)]"
                    : "border-line",
                )}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">{t.name}</h2>
                  {t.featured && (
                    <span className="rounded-full border border-brand/40 bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand-soft">
                      Most popular
                    </span>
                  )}
                </div>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight">
                    {t.price}
                  </span>
                  <span className="text-sm text-faint">/ {t.cadence}</span>
                </div>
                <p className="mt-3 text-sm text-muted">{t.blurb}</p>

                <ul className="mt-7 flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          t.featured ? "text-brand-soft" : "text-faint",
                        )}
                      />
                      <span className="text-muted">{f}</span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href="/signup"
                  variant={t.featured ? "primary" : "secondary"}
                  className="mt-8 w-full"
                >
                  {t.cta}
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-faint">
          Billing is stubbed in this MVP — checkout connects to Stripe before
          launch. No card required to start.
        </p>
      </Container>
    </section>
  );
}
