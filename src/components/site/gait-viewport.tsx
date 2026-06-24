"use client";

import { motion } from "motion/react";

/**
 * Stylized simulation viewport for the hero. A trotting quadruped over a
 * scrolling floor with a live-climbing reward sparkline overlay.
 *
 * This is the Phase-1 placeholder "hero". In Phase 4 the real seeded MP4 of the
 * Bittle walking is dropped in alongside it; the chrome stays identical.
 */

const THIGH = 26;
const SHANK = 26;

// Trot gait: diagonal legs share a phase. [x position, phase offset]
const legs: { x: number; phase: number }[] = [
  { x: -42, phase: 0 }, // front-left
  { x: -30, phase: 0.5 }, // front-right (slightly behind for depth)
  { x: 30, phase: 0.5 }, // back-left
  { x: 42, phase: 0 }, // back-right
];

function Leg({ x, phase }: { x: number; phase: number }) {
  const duration = 0.9;
  const delay = -phase * duration;
  return (
    <g transform={`translate(${x}, 0)`}>
      <motion.g
        style={{ originX: 0, originY: 0 }}
        animate={{ rotate: [18, -20, 18] }}
        transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1={0} y1={0} x2={0} y2={THIGH} className="stroke-brand-soft" strokeWidth={3.5} strokeLinecap="round" />
        <g transform={`translate(0, ${THIGH})`}>
          <motion.g
            style={{ originX: 0, originY: 0 }}
            animate={{ rotate: [10, 36, 10] }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1={0} y1={0} x2={0} y2={SHANK} className="stroke-brand" strokeWidth={3.5} strokeLinecap="round" />
            <circle cx={0} cy={SHANK} r={2.6} className="fill-brand-soft" />
          </motion.g>
        </g>
      </motion.g>
    </g>
  );
}

export function GaitViewport() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <div className="ml-3 flex items-center gap-2 font-mono text-xs text-faint">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
          bittle · walk-forward · sim
        </div>
      </div>

      {/* viewport */}
      <div className="relative aspect-[16/10] w-full bg-[radial-gradient(ellipse_at_50%_-10%,rgba(79,125,255,0.16),transparent_60%)]">
        <svg viewBox="0 0 320 200" className="absolute inset-0 h-full w-full">
          {/* scrolling floor */}
          <motion.g
            animate={{ x: [0, -40] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1={i * 40}
                y1={168}
                x2={i * 40}
                y2={172}
                className="stroke-line-strong"
                strokeWidth={2}
              />
            ))}
          </motion.g>
          <line x1={0} y1={170} x2={320} y2={170} className="stroke-line" strokeWidth={1.5} />

          {/* robot — hips at (160,118) so feet reach the floor (y=170). Static
              translate on the parent so motion's y-animation can't override
              horizontal position. Torso sits just above the hips. */}
          <g transform="translate(160, 118)">
            <motion.g
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
            >
              {legs.map((l, i) => (
                <Leg key={i} {...l} />
              ))}
              {/* torso */}
              <rect x={-56} y={-19} width={112} height={22} rx={10} className="fill-elevated stroke-line-strong" strokeWidth={1.5} />
              <rect x={-56} y={-19} width={112} height={22} rx={10} className="fill-none stroke-brand/30" strokeWidth={1} />
              {/* head */}
              <rect x={-78} y={-17} width={24} height={18} rx={6} className="fill-elevated stroke-line-strong" strokeWidth={1.5} />
              <circle cx={-69} cy={-8} r={1.9} className="fill-brand" />
            </motion.g>
          </g>
        </svg>

        {/* live metric overlay */}
        <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-1 font-mono text-[11px]">
          <span className="text-faint">fwd velocity</span>
          <span className="text-foreground">0.42 m/s</span>
        </div>

        {/* reward sparkline */}
        <div className="absolute bottom-3 right-3 w-40 rounded-lg border border-line bg-background/70 p-2.5 backdrop-blur">
          <div className="mb-1 flex items-center justify-between font-mono text-[10px] text-faint">
            <span>reward</span>
            <span className="text-success">+1.0k</span>
          </div>
          <svg viewBox="0 0 120 36" className="h-9 w-full">
            <motion.path
              d="M0 34 C 20 30, 30 26, 45 20 S 75 6, 120 3"
              fill="none"
              className="stroke-brand"
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
