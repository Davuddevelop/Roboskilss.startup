import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

type Robot = {
  name: string;
  kind: string;
  status: "available" | "soon";
  specs: string[];
};

const robots: Robot[] = [
  {
    name: "Petoi Bittle",
    kind: "Quadruped · 8 DOF",
    status: "available",
    specs: ["Walk forward", "Velocity tracking", "Serial deploy"],
  },
  {
    name: "Petoi Nybble",
    kind: "Quadruped · 8 DOF",
    status: "soon",
    specs: ["Walk forward", "Pose control"],
  },
  {
    name: "Bring your own",
    kind: "URDF / MJCF",
    status: "soon",
    specs: ["Config-driven", "Custom action space"],
  },
];

export function RobotsSection() {
  return (
    <section id="robots" className="scroll-mt-20 border-t border-line py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <Badge>Supported robots</Badge>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight">
            Start with the Bittle. Built for many more.
          </h2>
          <p className="mt-4 text-lg text-muted">
            The platform is robot-agnostic by design. Every robot is just a
            config the engine knows how to train.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {robots.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <div
                className={cn(
                  "h-full rounded-xl border bg-surface p-7 transition-colors",
                  r.status === "available"
                    ? "border-brand/40 shadow-[0_0_0_1px_rgba(79,125,255,0.15),0_24px_60px_-30px_rgba(79,125,255,0.5)]"
                    : "border-line",
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">
                    {r.name}
                  </h3>
                  {r.status === "available" ? (
                    <span className="rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                      Available
                    </span>
                  ) : (
                    <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-xs font-medium text-faint">
                      Soon
                    </span>
                  )}
                </div>
                <p className="mt-1 font-mono text-xs text-faint">{r.kind}</p>

                <ul className="mt-6 space-y-2.5">
                  {r.specs.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-2.5 text-sm text-muted"
                    >
                      <Check
                        className={cn(
                          "h-4 w-4",
                          r.status === "available"
                            ? "text-brand-soft"
                            : "text-faint",
                        )}
                      />
                      {s}
                    </li>
                  ))}
                </ul>

                {r.status === "available" && (
                  <ButtonLink
                    href="/signup"
                    variant="secondary"
                    size="sm"
                    className="mt-7 w-full"
                  >
                    Train this robot
                  </ButtonLink>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
