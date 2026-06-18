import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "./reveal";

export function CtaSection() {
  return (
    <section className="border-t border-line py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-surface px-8 py-16 text-center sm:px-16">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[640px] -translate-x-1/2 rounded-full bg-brand/20 blur-[110px]" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Your robot is one click from walking.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
                Spin up a training run on the Bittle in under a minute. Free to
                start — no GPU, no setup, no RL PhD.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href="/signup" size="lg">
                  Get started free
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/docs" variant="outline" size="lg">
                  Read the docs
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
