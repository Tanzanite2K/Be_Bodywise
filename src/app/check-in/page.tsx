"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, TriangleAlert, ArrowRight, RotateCcw, Stethoscope, Check } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader, Card, Chip } from "@/components/ui/primitives";
import { Button, ButtonLink } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { evaluateCheckIn } from "@/lib/logic";
import { journeyDay, todayISO, fmtDate } from "@/lib/dates";
import type { CheckIn } from "@/lib/types";

const qs = [
  { k: "consistency", q: "Have you followed your routine consistently?", opts: [["yes", "Yes, most days"], ["mostly", "Mostly"], ["no", "Not really"]] },
  { k: "changes", q: "Have you noticed any changes?", opts: [["none", "Not yet"], ["slight", "A little"], ["noticeable", "Yes, noticeable"]] },
  { k: "issues", q: "Are you experiencing dryness or irritation?", opts: [["none", "Neither"], ["dry", "Some dryness"], ["mild", "Mild irritation"], ["severe", "Severe irritation"]] },
  { k: "satisfaction", q: "How satisfied are you with your current routine?", opts: [["1", "1 · Not at all"], ["2", "2"], ["3", "3 · Neutral"], ["4", "4"], ["5", "5 · Very"]] },
] as const;

function Inner() {
  const { state, addCheckIn } = useStore();
  const toast = useToast();
  const p = state.profile!;
  const day = journeyDay(p.startDate);
  const [i, setI] = useState(0);
  const [ans, setAns] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ReturnType<typeof evaluateCheckIn> | null>(null);
  const [err, setErr] = useState("");
  const last = [...state.checkins].reverse()[0];

  const choose = (k: string, v: string) => { setAns((a) => ({ ...a, [k]: v })); setErr(""); };
  const next = () => {
    const q = qs[i];
    if (!ans[q.k]) { setErr("Please choose an answer."); return; }
    if (i < qs.length - 1) { setI(i + 1); return; }
    const issues = ans.issues;
    const input = {
      consistency: ans.consistency as CheckIn["consistency"], changes: ans.changes as CheckIn["changes"],
      dryness: issues === "dry", irritation: (issues === "mild" || issues === "severe" ? issues : "none") as CheckIn["irritation"],
      satisfaction: Number(ans.satisfaction), day,
    };
    const r = evaluateCheckIn(input);
    addCheckIn({ date: todayISO(), ...input, outcome: r.kind });
    setResult(r);
    toast(r.stop ? "Check-in saved — please seek advice" : "Check-in saved. Timeline updated", r.stop ? "error" : "success");
  };
  const reset = () => { setResult(null); setI(0); setAns({}); };

  return (
    <>
      <PageHeader eyebrow="Smart check-in" title={<>You&apos;re on <em>Day {day}</em> of your journey!</>} sub="Four quick questions. Your answers shape the guidance you see — never a guarantee." />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="min-h-[420px] !p-8 md:!p-10">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <div className="mb-6 flex gap-1.5">{qs.map((_, n) => <span key={n} className={clsx("h-1.5 flex-1 rounded-full", n <= i ? "bg-rose-cta" : "bg-blush")} />)}</div>
                <div className="eyebrow">Question {i + 1} of {qs.length}</div>
                <h2 className="font-serif mt-3 text-3xl leading-tight text-ink">{qs[i].q}</h2>
                <div className="mt-7 grid gap-2.5" role="radiogroup">{qs[i].opts.map(([v, l]) => { const on = ans[qs[i].k] === v; return (
                  <button key={v} role="radio" aria-checked={on} onClick={() => choose(qs[i].k, v)} className={clsx("flex items-center justify-between rounded-2xl px-5 py-4 text-left text-[15px] transition-all", on ? "bg-rose-cta text-white" : "bg-petal text-ink hover:bg-blush/70")}>{l}{on && <Check size={16} className="text-white" />}</button>); })}</div>
                {err && <p role="alert" className="mt-4 text-sm text-red-700">{err}</p>}
                <div className="mt-8 flex justify-between"><Button variant="ghost" onClick={() => setI(Math.max(0, i - 1))} className={i === 0 ? "invisible" : ""}>Back</Button><Button onClick={next}>{i === qs.length - 1 ? "Get my guidance" : "Next"}<ArrowRight size={16} /></Button></div>
              </motion.div>
            ) : (
              <motion.div key="r" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className={clsx("mb-5 grid h-14 w-14 place-items-center rounded-full", result.stop ? "bg-red-100 text-red-800" : "bg-pink text-ink")}>{result.stop ? <TriangleAlert size={24} /> : <Heart size={24} />}</div>
                <h2 className="font-serif text-4xl leading-tight text-ink">{result.title}</h2>
                <p className={clsx("mt-4 text-[15px] leading-relaxed", result.stop ? "rounded-2xl bg-red-50 p-4 text-red-900 ring-1 ring-red-200" : "text-muted")} role={result.stop ? "alert" : undefined}>{result.message}</p>
                <ul className="mt-6 space-y-2">{result.actions.map((a) => <li key={a} className="flex items-center gap-3 rounded-2xl bg-petal px-4 py-3 text-sm text-ink"><Check size={15} className="text-rose-ink" />{a}</li>)}</ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  {result.seeConsult && <ButtonLink href="/guidance" variant={result.stop ? "primary" : "outline"}><Stethoscope size={16} />Get professional guidance</ButtonLink>}
                  {!result.stop && <ButtonLink href="/journey" variant="outline">View my timeline</ButtonLink>}
                  {!result.stop && <ButtonLink href="/routine" variant="ghost">Review routine</ButtonLink>}
                  <Button variant="ghost" onClick={reset}><RotateCcw size={14} />Redo</Button>
                </div>
                <p className="mt-6 text-xs text-muted">Automated suggestions aren&apos;t a replacement for a dermatologist and don&apos;t diagnose any condition.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
        <div className="space-y-4">
          <Card className="!p-6"><div className="eyebrow">Latest check-in</div>{last ? <><div className="font-serif mt-2 text-2xl text-ink">Day {last.day}</div><div className="mt-1 text-xs text-muted">{fmtDate(last.date)} · satisfaction {last.satisfaction}/5</div><div className="mt-3"><Chip tone={last.outcome === "stop" ? "amber" : "blush"}>{last.outcome === "great" ? "Momentum" : last.outcome === "steady" ? "Staying the course" : last.outcome === "stop" ? "Seek advice" : "Review routine"}</Chip></div></> : <p className="mt-2 text-sm text-muted">Nothing yet. Your first one is the baseline.</p>}</Card>
          <Card className="!p-6"><div className="eyebrow">History</div><div className="mt-3 space-y-2">{state.checkins.length === 0 && <p className="text-sm text-muted">No check-ins yet.</p>}{[...state.checkins].reverse().slice(0, 5).map((c) => <div key={c.id} className="flex items-center justify-between rounded-2xl bg-petal px-4 py-3 text-sm"><span className="text-ink">Day {c.day}</span><span className="text-xs text-muted">{fmtDate(c.date)}</span></div>)}</div></Card>
          <Link href="/guidance" className="block rounded-3xl bg-rose-cta p-6 text-white transition-transform hover:-translate-y-0.5"><Stethoscope className="text-white" /><div className="font-serif mt-3 text-xl">Not sure? Ask a professional.</div><div className="mt-1 text-xs text-white/90">Request a demo consultation →</div></Link>
        </div>
      </div>
    </>
  );
}
export default function Page() { return <AppShell wide><Inner /></AppShell>; }
