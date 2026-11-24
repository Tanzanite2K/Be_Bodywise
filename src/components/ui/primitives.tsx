"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("rounded-[28px] bg-white p-6 shadow-soft md:p-8", className)}>{children}</div>;
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx("skeleton", className)} aria-hidden />;
}

export function Ring({ value, size = 120, stroke = 10, label, sub, tone = "rose" }: { value: number; size?: number; stroke?: number; label?: string; sub?: string; tone?: "rose" | "pink" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const track = tone === "pink" ? "rgba(255,255,255,.7)" : "#F9E3EA";
  const bar = "#C87996";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }} role="img" aria-label={`${label ?? "Progress"} ${value}%`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bar} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - value / 100) }} transition={{ duration: 1.2, ease: "easeOut" }} />
      </svg>
      <div className="absolute text-center">
        <div className={clsx("font-serif text-3xl leading-none", "text-ink")}>{value}<span className="text-base">%</span></div>
        {sub && <div className={clsx("mt-1 text-[10px] uppercase tracking-widest", "text-muted")}>{sub}</div>}
      </div>
    </div>
  );
}

export function Bar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={clsx("h-2 w-full overflow-hidden rounded-full bg-blush", className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <motion.div className="h-full rounded-full bg-gradient-to-r from-rose to-rose-deep" initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.9, ease: "easeOut" }} />
    </div>
  );
}

export function Chip({ children, tone = "blush" }: { children: ReactNode; tone?: "blush" | "pink" | "amber" | "dark" }) {
  const t = { blush: "bg-blush text-rose-ink", pink: "bg-pink text-ink", amber: "bg-amber-100 text-amber-900", dark: "bg-rose-cta text-white" }[tone];
  return <span className={clsx("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium", t)}>{children}</span>;
}

export function DemoBadge({ children = "Demo content · pending medical review" }: { children?: ReactNode }) {
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-900">{children}</span>;
}

export function PageHeader({ eyebrow, title, sub, right }: { eyebrow: string; title: ReactNode; sub?: string; right?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="eyebrow mb-3">{eyebrow}</div>
        <h1 className="font-serif text-4xl leading-[1.05] text-ink md:text-5xl">{title}</h1>
        {sub && <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function EmptyState({ icon, title, body, action }: { icon: ReactNode; title: string; body: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-[28px] border border-dashed border-rose/50 bg-white/70 px-6 py-14 text-center">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-blush text-rose-ink">{icon}</div>
      <h3 className="font-serif text-2xl text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{body}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function Fade({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
