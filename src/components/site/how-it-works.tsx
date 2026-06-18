import { MousePointerClick, Sparkles, Download } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "./reveal";

const steps = [
  {
    icon: MousePointerClick,
    step: "01",
    title: "Pick your robot",
    body: "Start from a preset like the Petoi Bittle, or register your own robot with a config. We handle the model, action space and observations.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Train the behavior",
    body: "Choose a skill and a budget, then click train. PPO runs in massively-parallel simulation with domain randomization to cross the reality gap.",
  },
  {
    icon: Download,
    step: "03",
    title: "Deploy the policy",
    body: "Download a deployable policy and observation stats. Flash it to the real hardware over serial and watch your robot walk.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-t border-line py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <Badge>How it works</Badge>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight">
            From idea to walking robot in three steps
          </h2>
          <p className="mt-4 text-lg text-muted">
            The hard reinforcement learning happens behind the scenes. You stay
            in a clean loop: pick, train, deploy.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-xl border border-line bg-surface p-7 transition-colors hover:border-line-strong">
                <div className="absolute right-5 top-5 font-mono text-sm text-faint">
                  {s.step}
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-line-strong bg-elevated text-brand-soft transition-colors group-hover:text-brand">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
