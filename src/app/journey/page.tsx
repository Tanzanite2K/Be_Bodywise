"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, Info, CalendarDays, Droplets, Target, Package, Flag } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader, Chip, Bar } from "@/components/ui/primitives";
import { useStore } from "@/lib/store";
import { MILESTONES, currentMilestoneIndex, getProduct } from "@/lib/data";
import { fmtDate, addDays, journeyDay } from "@/lib/dates";
import { nextCheckInDay } from "@/lib/logic";
import { ButtonLink } from "@/components/ui/button";

function Inner() {
  const { state } = useStore();
  const p = state.profile!;
  const day = journeyDay(p.startDate);
  const cur = currentMilestoneIndex(day);
  const product = getProduct(p.productId);
  const [open, setOpen] = useState<number | null>(cur);
  const nextDay = nextCheckInDay(day, state.checkins);
  const pct = Math.min(100, Math.round((day / 90) * 100));
  const facts = [
    { i: Target, l: "Main concern", v: p.concern },
    { i: Droplets, l: "Skin type", v: p.skinType },
    { i: Flag, l: "Goal", v: p.goal },
    { i: Package, l: "Product", v: product.short },
    { i: CalendarDays, l: "Started", v: fmtDate(p.startDate, { day: "numeric", month: "short", year: "numeric" }) },
  ];
  return (
    <>
      <PageHeader eyebrow="Your Results Journey" title={<>Day {day} of your <em>journey</em></>} sub={`Hi ${p.name}. Here's the road ahead — a gentle, honest map of what to look for and when.`} />
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blush to-pink/70 p-7 text-ink shadow-soft md:p-10">
        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
            {facts.map((f) => <div key={f.l}><div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted"><f.i size={13} />{f.l}</div><div className="mt-1 text-[15px]">{f.v}</div></div>)}
            <div><div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-rose-ink"><CalendarDays size={13} />Next check-in</div><div className="mt-1 text-[15px]">Day {nextDay} · {fmtDate(addDays(p.startDate, nextDay - 1))}</div></div>
          </div>
          <ButtonLink href="/check-in">Check in now</ButtonLink>
        </div>
        <div className="relative mt-8"><div className="mb-2 flex justify-between text-xs text-muted"><span>Journey progress (to ~3 months)</span><span>{pct}%</span></div><div className="h-2 rounded-full bg-white/70"><motion.div className="h-full rounded-full bg-rose-deep" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.2 }} /></div></div>
      </div>

      <div className="mt-10 flex items-start gap-3 rounded-2xl bg-blush/60 p-4 text-xs leading-relaxed text-ink"><Info size={16} className="mt-0.5 shrink-0" />These are illustrative checkpoints based on customer interviews, not guaranteed clinical result timelines. Product-specific timelines are configurable and must be validated by the brand&apos;s qualified experts before being presented as medical guidance.</div>

      <ol className="relative mt-10 space-y-4 pl-2">
        <div className="absolute bottom-4 left-[27px] top-4 w-px bg-rose-deep/10" />
        <motion.div className="absolute left-[27px] top-4 w-px origin-top bg-rose" initial={{ height: 0 }} animate={{ height: `${(cur / (MILESTONES.length - 1)) * 92}%` }} transition={{ duration: 1.2 }} />
        {MILESTONES.map((m, idx) => {
          const status = idx < cur ? "done" : idx === cur ? "current" : "upcoming";
          const isOpen = open === idx;
          const span = m.endDay - m.startDay + 1;
          const within = status === "current" ? Math.min(100, Math.round(((day - m.startDay + 1) / span) * 100)) : status === "done" ? 100 : 0;
          return (
            <li key={m.id} className="relative flex gap-5">
              <div className="relative z-10 pt-5">
                <span className={clsx("grid h-10 w-10 place-items-center rounded-full text-sm transition-all", status === "done" && "bg-rose text-ink", status === "current" && "bg-rose-deep text-white ring-8 ring-pink/60", status === "upcoming" && "bg-blush text-rose-ink ring-1 ring-line")}>
                  {status === "done" ? <Check size={16} /> : idx + 1}
                </span>
              </div>
              <button onClick={() => setOpen(isOpen ? null : idx)} aria-expanded={isOpen} className={clsx("flex-1 rounded-[28px] p-6 text-left transition-all duration-300", status === "current" ? "bg-white shadow-lift" : "bg-white/70 shadow-soft hover:bg-white")}>
                <div className="flex items-center justify-between gap-3">
                  <div><div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-ink">{m.label}</div><div className="font-serif mt-1 text-2xl text-ink">{m.title}</div></div>
                  <div className="flex items-center gap-3">{status === "current" && <Chip tone="pink">You are here</Chip>}{status === "done" && <Chip>Completed</Chip>}{status === "upcoming" && <Chip tone="blush">Upcoming</Chip>}<ChevronDown size={18} className={clsx("text-muted transition-transform", isOpen && "rotate-180")} /></div>
                </div>
                {isOpen && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">{m.body}</p>
                    <div className="mt-4 rounded-2xl bg-petal p-4 text-sm text-ink"><span className="text-xs uppercase tracking-widest text-muted">For {product.short}</span><p className="mt-1">{product.checkpoints[Math.min(idx > 0 ? idx - 1 : 0, product.checkpoints.length - 1)].what}</p></div>
                    {status !== "upcoming" ? <div className="mt-4"><Bar value={within} /><div className="mt-2 text-xs text-muted">{status === "done" ? "Completed" : `${within}% through this stage`}</div></div> : <div className="mt-4 text-xs text-muted">Starts around day {m.startDay}</div>}
                    <Link href={idx === 2 ? "/check-in" : idx === 3 ? "/progress" : idx === 4 ? "/guidance" : "/routine"} onClick={(e) => e.stopPropagation()} className="mt-4 inline-block text-sm font-medium text-ink underline underline-offset-4">{m.action} →</Link>
                  </motion.div>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </>
  );
}
export default function Page() { return <AppShell><Inner /></AppShell>; }
