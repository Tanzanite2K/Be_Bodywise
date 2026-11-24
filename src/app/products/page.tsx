"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ChevronDown, Clock, FlaskConical, Info, Users } from "lucide-react";
import clsx from "clsx";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader, Card, Chip, DemoBadge } from "@/components/ui/primitives";
import { useStore } from "@/lib/store";
import { PRODUCTS } from "@/lib/data";

function Inner() {
  const { state } = useStore();
  const p = state.profile!;
  const [id, setId] = useState<string>(p.productId);
  const [faq, setFaq] = useState<number | null>(0);
  const pr = PRODUCTS.find((x) => x.id === id)!;
  return (
    <>
      <PageHeader eyebrow="Skin guide · product insights" title={<>Know your product <em>before</em> you wait on it</>} sub="How to use it, what to expect, and what we can't say yet. Anything unverified is labelled." />
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2" role="tablist">{PRODUCTS.map((x) => <button key={x.id} role="tab" aria-selected={x.id === id} onClick={() => { setId(x.id); setFaq(0); }} className={clsx("shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all", x.id === id ? "bg-rose-cta text-white" : "bg-white text-ink shadow-soft hover:bg-blush/60")}>{x.short}{x.id === p.productId && <span className="ml-2 text-white">●</span>}</button>)}</div>
      <motion.div key={pr.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className={clsx("relative overflow-hidden rounded-[32px] bg-gradient-to-br p-8 text-ink md:p-12", pr.tone)}>
          <FlaskConical className="absolute -right-6 -top-6 h-48 w-48 text-white/90" />
          <div className="relative"><Chip tone="dark">{pr.category}</Chip><h2 className="font-serif mt-5 max-w-xl text-4xl leading-tight md:text-5xl">{pr.name}</h2><p className="mt-4 max-w-lg text-ink/80">{pr.purpose}</p><p className="mt-5 flex items-center gap-2 text-xs text-ink/70"><Users size={14} />{pr.interviewNote} in our customer interviews</p></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card><div className="eyebrow">Key ingredients</div><ul className="mt-4 space-y-3">{pr.ingredients.map((g) => <li key={g.text}><div className="font-medium text-ink">{g.text}</div><div className="text-xs text-muted">{g.source}</div></li>)}</ul><p className="mt-4 text-xs text-muted">We list only what appears in interviews or the product name. No concentrations or formulations are assumed.</p></Card>
          <Card><div className="eyebrow">How to use</div><ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed">{pr.howToUse.map((h) => <li key={h}>{h}</li>)}</ol><div className="mt-4"><DemoBadge /></div></Card>
          <Card className="bg-amber-50/70"><div className="eyebrow !text-amber-900">Precautions</div><ul className="mt-4 space-y-3 text-sm text-amber-950">{pr.precautions.map((h) => <li key={h} className="flex gap-3"><AlertCircle size={16} className="mt-0.5 shrink-0" />{h}</li>)}</ul></Card>
          <Card><div className="eyebrow">What to expect</div><p className="mt-4 text-sm leading-relaxed">{pr.expect}</p><p className="mt-4 flex gap-2 text-xs text-muted"><Info size={14} className="mt-0.5 shrink-0" />Not a guarantee. Timelines vary and need expert validation.</p></Card>
        </div>
        <Card><div className="eyebrow">Progress checkpoints</div><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{pr.checkpoints.map((c) => <div key={c.when} className="rounded-3xl bg-petal p-5"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-ink"><Clock size={13} />{c.when}</div><p className="mt-2 text-sm leading-relaxed">{c.what}</p></div>)}</div></Card>
        <Card><div className="eyebrow">Frequently asked questions</div><div className="mt-4 divide-y divide-line">{pr.faqs.map((f, n) => (<div key={f.q}><button onClick={() => setFaq(faq === n ? null : n)} aria-expanded={faq === n} className="flex w-full items-center justify-between py-4 text-left font-medium text-ink">{f.q}<ChevronDown size={18} className={clsx("transition-transform", faq === n && "rotate-180")} /></button>{faq === n && <p className="pb-4 text-sm leading-relaxed text-muted">{f.a}</p>}</div>))}</div></Card>
      </motion.div>
    </>
  );
}
export default function Page() { return <AppShell wide><Inner /></AppShell>; }
