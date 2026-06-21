"use client";

import { motion, useReducedMotion } from "motion/react";
import { TrendUp } from "@phosphor-icons/react";
import { CountUp } from "@/components/motion/count-up";

/* Plot geometry (SVG user units). */
const W = 640;
const H = 340;
const L = 48;
const R = 24;
const T = 40;
const B = 286;
const PLOT_W = W - L - R;
const PLOT_H = B - T;

/* A clean upward trajectory — illustrative, not a specific client claim. */
const SERIES = [14, 22, 19, 33, 41, 38, 56, 72, 88];

const x = (i: number) => L + (i / (SERIES.length - 1)) * PLOT_W;
const y = (v: number) => B - (v / 100) * PLOT_H;

const linePath = SERIES.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(
  " "
);
const areaPath = `${linePath} L ${x(SERIES.length - 1)} ${B} L ${x(0)} ${B} Z`;

const ease = [0.16, 1, 0.3, 1] as const;

export function GrowthChart() {
  const reduce = useReducedMotion();
  const gridLines = [0, 25, 50, 75, 100];
  const last = SERIES.length - 1;

  return (
    <div className="ring-gradient relative overflow-hidden rounded-card p-5 shadow-glow sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
      />

      {/* Header */}
      <div className="relative mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Qualified leads
          </p>
          <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            <CountUp to={312} prefix="+" suffix="%" />
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
          <TrendUp weight="bold" className="h-4 w-4" />
          Trending up
        </span>
      </div>

      {/* Chart */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="relative w-full"
        role="img"
        aria-label="Line chart showing qualified leads climbing steadily upward over time"
      >
        <defs>
          <linearGradient id="gc-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-brand-cyan)" />
            <stop offset="55%" stopColor="var(--color-brand-violet)" />
            <stop offset="100%" stopColor="var(--color-brand-blue)" />
          </linearGradient>
          <linearGradient id="gc-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-violet)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--color-brand-violet)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gc-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-violet)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-brand-violet)" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Gridlines */}
        {gridLines.map((g) => (
          <line
            key={g}
            x1={L}
            x2={W - R}
            y1={y(g)}
            y2={y(g)}
            stroke="var(--color-border)"
            strokeWidth={1}
            strokeDasharray="2 6"
          />
        ))}

        {/* Bars */}
        {SERIES.map((v, i) => {
          const bw = 14;
          return (
            <motion.rect
              key={i}
              x={x(i) - bw / 2}
              y={y(v)}
              width={bw}
              height={B - y(v)}
              rx={4}
              fill="url(#gc-bar)"
              style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.06, ease }}
            />
          );
        })}

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill="url(#gc-area)"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.6, ease }}
        />

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#gc-line)"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, ease }}
        />

        {/* End marker */}
        <motion.circle
          cx={x(last)}
          cy={y(SERIES[last])}
          r={6.5}
          fill="var(--color-brand-cyan)"
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 1.5, ease }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        {!reduce && (
          <motion.circle
            cx={x(last)}
            cy={y(SERIES[last])}
            r={6.5}
            fill="none"
            stroke="var(--color-brand-cyan)"
            strokeWidth={2}
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 1.6 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        )}
      </svg>
    </div>
  );
}
