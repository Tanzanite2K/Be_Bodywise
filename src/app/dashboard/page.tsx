"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ArrowUpRight, CheckCheck, LineChart as LC, Route, MessageCircleHeart, Stethoscope, Flag, RotateCcw, Play } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, Ring, Chip, EmptyState, PageHeader } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { MILESTONES, currentMilestoneIndex, getProduct, PRODUCTS } from "@/lib/data";
import { journeyDay, todayISO, fmtDate, addDays } from "@/lib/dates";
import { consistencyPct, dayCompletion, nextCheckInDay } from "@/lib/logic";

function Inner() {
  const { state, reset, loadDemo } = useStore();
  const router = useRouter();
  const toast = useToast();
  const p = state.profile!;
  const day = journeyDay(p.startDate);
  const cur = currentMilestoneIndex(day);
  const nextM = MILESTONES[Math.min(cur + 1, MILESTONES.length - 1)];
  const cons = consistencyPct(state.logs, p.startDate, 7);
  const today = dayCompletion(state.logs[todayISO()]);
  const last = [...state.checkins].reverse()[0];
  const main = getProduct(p.productId);
  const prods = [main, ...PRODUCTS.filter((x) => p.currentProducts.includes(x.id) && x.id !== main.id)];
  const chart = state.entries.map((e) => ({ d: fmtDate(e.date), rating: e.rating }));
  const nd = nextCheckInDay(day, state.checkins);
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const actions = [
    { href: "/routine", icon: CheckCheck, label: "Complete today's routine", sub: `${today}% done` },
    { href: "/progress", icon: LC, label: "Update my progress", sub: "Rate your skin" },
    { href: "/journey", icon: Route, label: "View my timeline", sub: MILESTONES[cur].title },
    { href: "/guidance", icon: Stethoscope, label: "Ask for guidance", sub: "Talk to a professional" },
  ];
  return (
    <>
      <PageHeader eyebrow={p.isDemo ? "Demo journey · synthetic data" : "My journey"} title={<>{greet}, <em>{p.name}</em></>} sub={`You're ${day} days into your ${p.concern.toLowerCase()} journey with ${main.short}. Steady beats speedy.`}
        right={<div className="flex gap-2"><Button variant="outline" className="!px-4 !py-2 !text-xs" onClick={() => { if (confirm("Clear your journey and data from this browser?")) { reset(); toast("Your data was cleared", "info"); router.push("/"); } }}><RotateCcw size={13} />Start over</Button>{!p.isDemo && <Button variant="ghost" className="!px-4 !py-2 !text-xs" onClick={() => { loadDemo(); toast("Demo journey loaded", "info"); }}><Play size={12} />Load demo</Button>}</div>} />

      <div className="grid gap-5 md:grid-cols-6">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blush to-pink/70 p-8 text-ink shadow-soft md:col-span-4">
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div><div className="text-[11px] uppercase tracking-[0.18em] text-rose-ink">Current journey</div><div className="font-serif mt-2 text-5xl">Day {day}</div><div className="mt-2 text-sm text-muted">{p.concern} · {p.skinType} skin</div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs"><Flag size={13} className="text-rose-ink" />Next: {nextM.label.toLowerCase()} · {nextM.title}</div></div>
            <Ring value={cons} size={140} stroke={11} tone="pink" sub="7-day routine" />
          </div>
        </div>
        <Card className="md:col-span-2 !p-7"><div className="eyebrow">Days completed</div><div className="font-serif mt-3 text-6xl text-ink">{Math.min(day, 90)}</div><div className="mt-1 text-sm text-muted">of ~90 in your journey</div><div className="mt-5 h-2 rounded-full bg-blush"><div className="h-full rounded-full bg-rose-cta" style={{ width: `${Math.min(100, (day / 90) * 100)}%` }} /></div></Card>

        <Card className="md:col-span-3 !p-7"><div className="flex items-center justify-between"><div className="eyebrow">Progress chart</div><Link href="/progress" className="text-xs text-ink underline">Details</Link></div>
          {chart.length < 2 ? <div className="mt-4"><EmptyState icon={<LC size={18} />} title="Needs two entries" body="Add progress entries to see your trend." action={<Link href="/progress" className="text-sm font-medium text-ink underline">Add entry</Link>} /></div> : (
            <div className="mt-4 h-44"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chart} margin={{ left: 0, right: 0, top: 6 }}><defs><linearGradient id="dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F4C6D4" stopOpacity={0.9} /><stop offset="1" stopColor="#F4C6D4" stopOpacity={0} /></linearGradient></defs><XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#766570" }} /><Tooltip contentStyle={{ borderRadius: 14, border: "none" }} /><Area type="monotone" dataKey="rating" stroke="#C87996" strokeWidth={2.5} fill="url(#dg)" /></AreaChart></ResponsiveContainer></div>)}
        </Card>
        <Card className="md:col-span-3 !p-7"><div className="eyebrow">Latest check-in</div>
          {last ? <><div className="mt-3 flex items-center gap-3"><div className="font-serif text-4xl text-ink">Day {last.day}</div><Chip tone={last.outcome === "stop" ? "amber" : "pink"}>{last.outcome === "great" ? "Momentum" : last.outcome === "steady" ? "Staying the course" : last.outcome === "stop" ? "Seek advice" : "Review routine"}</Chip></div><p className="mt-2 text-sm text-muted">{fmtDate(last.date)} · satisfaction {last.satisfaction}/5</p></> : <p className="mt-3 text-sm text-muted">No check-ins yet.</p>}
          <div className="mt-5 rounded-2xl bg-petal p-4 text-sm text-ink">Next check-in: <strong className="font-medium">Day {nd}</strong> · {fmtDate(addDays(p.startDate, nd - 1))}</div>
          <Link href="/check-in" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-ink underline underline-offset-4"><MessageCircleHeart size={14} />Start check-in</Link>
        </Card>

        <Card className="md:col-span-6 !p-7"><div className="eyebrow">Current products</div><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{prods.map((x) => <Link key={x.id} href="/products" className="group rounded-3xl bg-petal p-4 transition-all hover:-translate-y-0.5 hover:bg-blush/60"><div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${x.tone}`} /><div className="mt-3 text-sm font-medium text-ink">{x.short}</div><div className="text-xs text-muted">{x.category}</div></Link>)}</div></Card>
      </div>

      <h2 className="font-serif mb-4 mt-12 text-3xl text-ink">Quick actions</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{actions.map((a) => <Link key={a.label} href={a.href} className="group flex flex-col justify-between rounded-[28px] bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:bg-rose-cta hover:text-white hover:shadow-lift"><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-blush text-ink transition-colors group-hover:bg-white/90"><a.icon size={18} /></span><ArrowUpRight size={18} className="text-muted transition-colors group-hover:text-white" /></div><div className="mt-8"><div className="font-medium">{a.label}</div><div className="mt-1 text-xs text-muted group-hover:text-white">{a.sub}</div></div></Link>)}</div>
    </>
  );
}
export default function Page() { return <AppShell wide><Inner /></AppShell>; }
