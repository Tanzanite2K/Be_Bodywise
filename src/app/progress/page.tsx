"use client";
import { useRef, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Camera, ImagePlus, LineChart as LC, Lock, Trash2, TriangleAlert, NotebookPen } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader, Card, EmptyState, Chip } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { compressImage } from "@/lib/image";
import { addDays, diffDays, fmtDate, todayISO, journeyDay } from "@/lib/dates";
import type { ProgressEntry } from "@/lib/types";

const faces = ["Rough", "Meh", "Okay", "Good", "Great"];
function Seg<T extends string>({ value, onChange, options, label }: { value: T; onChange: (v: T) => void; options: { v: T; l: string }[]; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => <button type="button" key={o.v} role="radio" aria-checked={value === o.v} onClick={() => onChange(o.v)} className={clsx("rounded-full px-4 py-2 text-sm transition-all", value === o.v ? "bg-rose-cta text-white" : "bg-petal text-ink hover:bg-blush")}>{o.l}</button>)}
    </div>
  );
}

function Inner() {
  const { state, addEntry, addPhoto, deletePhoto, storageError } = useStore();
  const toast = useToast();
  const p = state.profile!;
  const fileRef = useRef<HTMLInputElement>(null);
  const [rating, setRating] = useState(0);
  const [changes, setChanges] = useState<ProgressEntry["changes"]>("none");
  const [dryness, setDryness] = useState<"yes" | "no">("no");
  const [irritation, setIrritation] = useState<ProgressEntry["irritation"]>("none");
  const [consistent, setConsistent] = useState<ProgressEntry["consistent"]>("yes");
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [cmpA, setCmpA] = useState<string>("");
  const [cmpB, setCmpB] = useState<string>("");

  const chart = state.entries.map((e) => ({ d: fmtDate(e.date), rating: e.rating }));
  const week = Array.from({ length: 7 }, (_, i) => { const d = addDays(todayISO(), i - 6); const l = state.logs[d]; return { d: fmtDate(d, { weekday: "short" }), done: ((l?.am ? 1 : 0) + (l?.pm ? 1 : 0)) * 50 }; });
  const photos = [...state.photos].sort((a, b) => a.date.localeCompare(b.date));
  const pa = photos.find((x) => x.id === cmpA) ?? photos[0];
  const pb = photos.find((x) => x.id === cmpB) ?? photos[photos.length - 1];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) { setErr("Please rate how your skin feels today (1–5)."); return; }
    if (notes.length > 500) { setErr("Notes are limited to 500 characters."); return; }
    setErr("");
    addEntry({ date: todayISO(), rating, changes, dryness: dryness === "yes", irritation, consistent, notes: notes.trim() });
    toast("Progress entry saved");
    setRating(0); setNotes(""); setChanges("none"); setDryness("no"); setIrritation("none"); setConsistent("yes");
  };

  const onFile = async (f?: File) => {
    if (!f) return;
    setBusy(true);
    try {
      const dataUrl = await compressImage(f);
      addPhoto({ date: todayISO(), dataUrl, label: `Day ${journeyDay(p.startDate)}` });
      toast("Photo added — stored privately on this device");
    } catch (x) { toast(x instanceof Error ? x.message : "Couldn't add photo", "error"); }
    finally { setBusy(false); if (fileRef.current) fileRef.current.value = ""; }
  };

  return (
    <>
      <PageHeader eyebrow="Progress tracker" title={<>See the <em>slow</em> change</>} sub="Small weekly notes add up. Your ratings and photos are for you — they're never used to claim improvement." />
      {storageError && <div role="alert" className="mb-6 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">{storageError}</div>}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="eyebrow">Skin rating over time</div>
          {chart.length < 2 ? <div className="mt-6"><EmptyState icon={<LC size={20} />} title="Your trend starts here" body="Add two or more entries to see your skin rating trend." /></div> : (
            <div className="mt-4 h-60"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chart} margin={{ left: -20, right: 8, top: 10 }}><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E8A5BA" stopOpacity={0.35} /><stop offset="1" stopColor="#E8A5BA" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#F0DCE3" /><XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#766570" }} /><YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#766570" }} /><Tooltip contentStyle={{ borderRadius: 16, border: "none", boxShadow: "0 12px 40px -12px rgba(200,121,150,.3)" }} /><Area type="monotone" dataKey="rating" stroke="#C87996" strokeWidth={3} fill="url(#g)" dot={{ r: 4, fill: "#F4C6D4", stroke: "#C87996", strokeWidth: 2 }} /></AreaChart></ResponsiveContainer></div>
          )}
          <p className="mt-3 text-xs text-muted">Self-rated 1–5. A rating reflects how you feel, not a clinical measure.</p>
        </Card>
        <Card>
          <div className="eyebrow">Routine consistency · last 7 days</div>
          <div className="mt-4 h-60"><ResponsiveContainer width="100%" height="100%"><BarChart data={week} margin={{ left: -20, right: 8, top: 10 }}><CartesianGrid vertical={false} stroke="#F0DCE3" /><XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#766570" }} /><YAxis domain={[0, 100]} ticks={[0, 50, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#766570" }} unit="%" /><Tooltip cursor={{ fill: "#FFF5F7" }} contentStyle={{ borderRadius: 16, border: "none" }} formatter={(v) => `${v}%`} /><Bar dataKey="done" fill="#C87996" radius={[8, 8, 8, 8]} barSize={22} /></BarChart></ResponsiveContainer></div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card>
          <h2 className="font-serif text-3xl text-ink">Today&apos;s entry</h2>
          <form onSubmit={submit} className="mt-6 space-y-6" noValidate>
            <fieldset><legend className="mb-3 text-sm font-medium text-ink">How does your skin feel today?</legend>
              <div className="grid grid-cols-5 gap-2" role="radiogroup">{[1, 2, 3, 4, 5].map((n) => <button type="button" key={n} role="radio" aria-checked={rating === n} onClick={() => setRating(n)} className={clsx("rounded-2xl py-3 text-center transition-all", rating === n ? "bg-rose-cta text-white shadow-lift" : "bg-petal hover:bg-blush")}><div className="font-serif text-2xl">{n}</div><div className={clsx("text-[10px]", rating === n ? "text-white" : "text-muted")}>{faces[n - 1]}</div></button>)}</div></fieldset>
            <div><div className="mb-3 text-sm font-medium text-ink">Have you noticed any changes?</div><Seg label="Changes" value={changes} onChange={setChanges} options={[{ v: "none", l: "Not yet" }, { v: "slight", l: "A little" }, { v: "noticeable", l: "Noticeable" }]} /></div>
            <div><div className="mb-3 text-sm font-medium text-ink">Did you experience dryness?</div><Seg label="Dryness" value={dryness} onChange={setDryness} options={[{ v: "no", l: "No" }, { v: "yes", l: "Yes" }]} /></div>
            <div><div className="mb-3 text-sm font-medium text-ink">Did you experience irritation?</div><Seg label="Irritation" value={irritation} onChange={setIrritation} options={[{ v: "none", l: "None" }, { v: "mild", l: "Mild" }, { v: "severe", l: "Severe" }]} />
              {irritation === "severe" && <div role="alert" className="mt-3 flex gap-3 rounded-2xl bg-red-50 p-4 text-sm text-red-900"><TriangleAlert size={18} className="mt-0.5 shrink-0" /><span>Please stop using the suspected product and seek professional medical advice. <Link href="/guidance" className="font-medium underline">Request a consultation</Link></span></div>}</div>
            <div><div className="mb-3 text-sm font-medium text-ink">Were you consistent with your routine?</div><Seg label="Consistency" value={consistent} onChange={setConsistent} options={[{ v: "yes", l: "Yes" }, { v: "mostly", l: "Mostly" }, { v: "no", l: "Not really" }]} /></div>
            <label className="block text-sm font-medium text-ink"><span className="flex items-center gap-2"><NotebookPen size={14} />Personal notes</span><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={500} placeholder="Anything worth remembering…" className="mt-3 w-full resize-none rounded-2xl border-0 bg-petal p-4 text-sm font-normal outline-none ring-rose/50 focus:ring-2" /></label>
            {err && <p role="alert" className="text-sm text-red-700">{err}</p>}
            <Button type="submit" className="w-full">Save today&apos;s entry</Button>
          </form>
        </Card>

        <Card>
          <div className="flex items-center justify-between"><h2 className="font-serif text-3xl text-ink">Photos</h2><Chip tone="blush"><Lock size={12} />Private</Chip></div>
          <p className="mt-2 text-xs leading-relaxed text-muted">Photos are compressed and stored only in this browser. In production they would live in private, encrypted storage. We never judge improvement from a picture.</p>
          <input ref={fileRef} type="file" accept="image/*" className="sr-only" id="photo" onChange={(e) => onFile(e.target.files?.[0])} />
          <label htmlFor="photo" className={clsx("mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-rose/40 bg-petal py-8 text-sm text-ink transition-colors hover:bg-blush/50", busy && "opacity-50")}>{busy ? "Processing…" : <><ImagePlus size={22} />Add a progress photo</>}</label>
          {photos.length === 0 ? <p className="mt-5 text-center text-sm text-muted"><Camera size={16} className="mr-1 inline" />Add photos on different dates to compare them.</p> : (
            <>
              <div className="mt-5 grid grid-cols-3 gap-2">{photos.map((ph) => (<div key={ph.id} className="group relative aspect-square overflow-hidden rounded-2xl bg-blush">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={ph.dataUrl} alt={`Progress photo ${ph.label}`} className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 p-1.5 text-[10px] text-white">{ph.label}</div><button aria-label="Delete photo" onClick={() => { deletePhoto(ph.id); toast("Photo deleted", "info"); }} className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-red-700 opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100"><Trash2 size={13} /></button></div>))}</div>
              {photos.length >= 2 && pa && pb && (
                <div className="mt-6"><div className="mb-3 text-sm font-medium text-ink">Compare across dates</div>
                  <div className="grid grid-cols-2 gap-3">{[[pa, setCmpA], [pb, setCmpB]].map(([ph, set], n) => { const x = ph as typeof pa; return (<div key={n}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={x.dataUrl} alt={`Comparison ${n ? "after" : "before"}`} className="aspect-[3/4] w-full rounded-2xl object-cover" /><select aria-label={n ? "After photo" : "Before photo"} value={x.id} onChange={(e) => (set as (v: string) => void)(e.target.value)} className="mt-2 w-full rounded-xl border-0 bg-petal px-3 py-2 text-xs">{photos.map((o) => <option key={o.id} value={o.id}>{o.label} · {fmtDate(o.date)}</option>)}</select></div>); })}</div>
                  <p className="mt-3 text-xs text-muted">Lighting and angle change how skin looks. Compare for your own reference only.</p></div>
              )}
            </>
          )}
        </Card>
      </div>

      <section className="mt-10">
        <h2 className="font-serif mb-5 text-3xl text-ink">Progress history</h2>
        {state.entries.length === 0 ? <EmptyState icon={<NotebookPen size={20} />} title="No entries yet" body="Your first entry becomes your baseline — you'll thank yourself in a few weeks." /> : (
          <ol className="space-y-3">{[...state.entries].reverse().map((e) => (
            <li key={e.id} className="flex gap-4 rounded-3xl bg-white p-5 shadow-soft"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-blush font-serif text-2xl text-ink">{e.rating}</div>
              <div className="min-w-0"><div className="flex flex-wrap items-center gap-2 text-sm"><span className="font-medium text-ink">{fmtDate(e.date, { day: "numeric", month: "short", year: "numeric" })}</span><span className="text-xs text-muted">Day {diffDays(e.date, p.startDate) + 1}</span>{e.dryness && <Chip tone="amber">Dryness</Chip>}{e.irritation !== "none" && <Chip tone="amber">{e.irritation} irritation</Chip>}<Chip>{e.changes === "none" ? "No change yet" : e.changes === "slight" ? "Slight change" : "Noticeable change"}</Chip></div>{e.notes && <p className="mt-2 text-sm leading-relaxed text-muted">{e.notes}</p>}</div></li>))}</ol>
        )}
      </section>
    </>
  );
}
export default function Page() { return <AppShell wide><Inner /></AppShell>; }
