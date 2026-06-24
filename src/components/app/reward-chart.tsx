"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import type { RewardPoint } from "@/lib/types/db";

/**
 * Animated reward curve. Pure SVG (no chart lib) so it stays light and matches
 * the design tokens exactly. `progress` (0..1) clips how much of the curve is
 * revealed, which the job page drives during a simulated training run.
 */
export function RewardChart({
  data,
  progress = 1,
  height = 280,
}: {
  data: RewardPoint[];
  progress?: number;
  height?: number;
}) {
  const W = 720;
  const H = height;
  const padX = 44;
  const padY = 24;

  const { line, area, ticks, maxR, minR, lastShown } = useMemo(() => {
    const xs = data.map((d) => d.step);
    const ys = data.map((d) => d.reward);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minR = Math.min(...ys);
    const maxR = Math.max(...ys);
    const sx = (x: number) =>
      padX + ((x - minX) / (maxX - minX || 1)) * (W - padX - 12);
    const sy = (y: number) =>
      H - padY - ((y - minR) / (maxR - minR || 1)) * (H - padY * 2);

    const shownCount = Math.max(2, Math.round(data.length * progress));
    const shown = data.slice(0, shownCount);

    const line = shown.map((d) => `${sx(d.step)},${sy(d.reward)}`).join(" ");
    const area =
      `${sx(shown[0].step)},${H - padY} ` +
      line +
      ` ${sx(shown[shown.length - 1].step)},${H - padY}`;

    const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
      y: padY + t * (H - padY * 2),
      val: Math.round(maxR - t * (maxR - minR)),
    }));

    return { line, area, ticks, maxR, minR, lastShown: shown[shown.length - 1] };
  }, [data, progress, H]);

  const sx = (x: number) => {
    const xs = data.map((d) => d.step);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    return padX + ((x - minX) / (maxX - minX || 1)) * (W - padX - 12);
  };
  const sy = (y: number) =>
    H - padY - ((y - minR) / (maxR - minR || 1)) * (H - padY * 2);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label="Training reward over time"
    >
      <defs>
        <linearGradient id="rewardFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4f7dff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#4f7dff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* gridlines + y labels */}
      {ticks.map((t, i) => (
        <g key={i}>
          <line
            x1={padX}
            y1={t.y}
            x2={W - 12}
            y2={t.y}
            stroke="#1c1f29"
            strokeWidth={1}
          />
          <text x={8} y={t.y + 4} fill="#5b6273" fontSize="11" fontFamily="monospace">
            {t.val}
          </text>
        </g>
      ))}

      <motion.polygon
        points={area}
        fill="url(#rewardFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.polyline
        points={line}
        fill="none"
        stroke="#4f7dff"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {lastShown && (
        <circle cx={sx(lastShown.step)} cy={sy(lastShown.reward)} r={4} fill="#8aa6ff" />
      )}
    </svg>
  );
}
