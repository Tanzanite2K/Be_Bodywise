"use client";
import { Sun, Moon, AlertCircle, CheckCircle2, Circle, Leaf } from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader, Card, Ring, DemoBadge, Chip } from "@/components/ui/primitives";
import { useStore } from "@/lib/store";
import { PRODUCTS, getProduct, COMBINATION_GUIDANCE } from "@/lib/data";
import { todayISO } from "@/lib/dates";
import { dayCompletion } from "@/lib/logic";
import { useToast } from "@/components/ui/toast";
import type { DayLog } from "@/lib/types";

function Inner() {
  const { state, toggleTask } = useStore();
  const toast = useToast();
  const p = state.profile!;
  const today = todayISO();
  const log = state.logs[today];
  const pct = dayCompletion(log);
  const main = getProduct(p.productId);
  const others = PRODUCTS.filter((x) => p.currentProducts.includes(x.id) && x.id !== main.id);
  const all = [main, ...others];
  const am = all.filter((x) => x.slot === "am" || x.slot === "both");
  const pm = all.filter((x) => x.slot === "pm" || x.slot === "both");

  const tasks: { k: keyof DayLog; label: string; sub: string }[] = [
    { k: "am", label: "Follow the morning routine", sub: "Cleanse and protect" },
    { k: "pm", label: "Follow the evening routine", sub: "Cleanse and nourish" },
    { k: "condition", label: "Record skin condition", sub: "A quick 1–5 rating in Progress" },
    { k: "checkin", label: "Complete progress check-in", sub: "Weekly check-ins are enough" },
  ];
  const tap = (k: keyof DayLog, label: string) => { const was = !!log?.[k]; toggleTask(k); if (!was) toast(`${label} — done`); };

  const Block = ({ title, icon: Icon, items, tone }: { title: string; icon: typeof Sun; items: typeof all; tone: string }) => (
    <Card className={clsx("relative overflow-hidden", tone)}>
      <div className="mb-5 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-ink"><Icon size={20} /></span><h2 className="font-serif text-3xl text-ink">{title}</h2></div>
      <div className="space-y-4">
        {items.map((x, n) => (
          <div key={x.id} className="rounded-3xl bg-white/80 p-5 backdrop-blur">
            <div className="flex items-center justify-between gap-2"><div className="text-xs uppercase tracking-widest text-muted">Step {n + 1}</div><Chip tone="blush">{x.frequency.split("(")[0].trim()}</Chip></div>
            <div className="mt-1 text-lg font-medium text-ink">{x.name}</div>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-ink/80">{x.howToUse.map((h) => <li key={h}>{h}</li>)}</ol>
            <div className="mt-4 flex gap-2 rounded-2xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-900"><AlertCircle size={14} className="mt-0.5 shrink-0" /><span>{x.precautions[0]}</span></div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-muted">Nothing scheduled.</p>}
      </div>
    </Card>
  );

  return (
    <>
      <PageHeader eyebrow="My routine" title={<>Simple steps, <em>every day</em></>} sub="Frequencies below are demo placeholders. Always follow the instructions on your product's pack." right={<DemoBadge />} />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6"><Block title="Morning" icon={Sun} items={am} tone="bg-gradient-to-br from-[#FFF5F7] to-white" /><Block title="Evening" icon={Moon} items={pm} tone="bg-gradient-to-br from-blush to-white" /></div>
        <div className="space-y-6">
          <Card className="lg:sticky lg:top-8">
            <div className="flex items-center justify-between"><div><div className="eyebrow">Today&apos;s checklist</div><div className="font-serif mt-1 text-3xl text-ink">{pct === 100 ? "All done 🌿" : "Let's go"}</div></div><Ring value={pct} size={88} stroke={8} /></div>
            <div className="mt-6 space-y-2">
              {tasks.map((t) => { const on = !!log?.[t.k]; return (
                <button key={t.k} onClick={() => tap(t.k, t.label)} aria-pressed={on} className={clsx("flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all", on ? "bg-rose-cta text-white" : "bg-petal hover:bg-blush/60")}>
                  <motion.span key={String(on)} initial={{ scale: 0.6 }} animate={{ scale: 1 }}>{on ? <CheckCircle2 size={22} className="text-white" /> : <Circle size={22} className="text-ink/30" />}</motion.span>
                  <span><span className="block text-sm font-medium">{t.label}</span><span className={clsx("text-xs", on ? "text-white/90" : "text-muted")}>{t.sub}</span></span>
                </button>); })}
            </div>
          </Card>
        </div>
      </div>
      <section className="mt-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="font-serif text-3xl text-ink">Product combination guidance</h2><DemoBadge /></div>
        <div className="grid gap-4 md:grid-cols-3">
          {COMBINATION_GUIDANCE.map((g) => (<Card key={g.title} className="!p-6"><Leaf size={18} className="text-rose-ink" /><h3 className="mt-4 font-medium text-ink">{g.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{g.note}</p><div className="mt-4"><DemoBadge>{g.status}</DemoBadge></div></Card>))}
        </div>
        <p className="mt-4 text-xs text-muted">We never present unverified combinations as medical advice. Ask a professional before mixing active ingredients.</p>
      </section>
    </>
  );
}
export default function Page() { return <AppShell><Inner /></AppShell>; }
