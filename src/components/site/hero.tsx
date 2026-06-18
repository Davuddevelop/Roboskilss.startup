"use client";

import { motion } from "motion/react";
import { ArrowRight, Cpu } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { GaitViewport } from "./gait-viewport";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute left-1/2 top-[-10%] -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]" />

      <Container className="grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_1fr] lg:py-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Badge>
              <Cpu className="h-3.5 w-3.5 text-brand-soft" />
              Now training the Petoi Bittle
            </Badge>
          </motion.div>

          <motion.h1
            className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
          >
            Teach any robot
            <br />
            <span className="bg-gradient-to-r from-brand-soft to-brand bg-clip-text text-transparent">
              a new skill.
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            Pick your robot, choose a behavior, click train. We run the
            reinforcement learning in simulation and hand you a policy that
            deploys to the real hardware. No RL expertise required.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.19, ease }}
          >
            <ButtonLink href="/signup" size="lg">
              Train a skill
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/#how" variant="outline" size="lg">
              See how it works
            </ButtonLink>
          </motion.div>

          <motion.div
            className="mt-10 flex items-center gap-5 text-xs font-medium text-faint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            <span className="font-mono">Built on</span>
            <span className="text-muted">MuJoCo</span>
            <span className="h-1 w-1 rounded-full bg-line-strong" />
            <span className="text-muted">Stable-Baselines3</span>
            <span className="h-1 w-1 rounded-full bg-line-strong" />
            <span className="text-muted">PPO</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          <GaitViewport />
        </motion.div>
      </Container>
    </section>
  );
}
