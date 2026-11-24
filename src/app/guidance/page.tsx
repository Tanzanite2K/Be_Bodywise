"use client";
import { useState } from "react";
import { CheckCircle2, Clock, ShieldAlert, Stethoscope, CalendarCheck } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader, Card, Chip, EmptyState, DemoBadge } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { fmtDate, todayISO } from "@/lib/dates";

function Inner() {
  const { state, addConsult } = useStore();
  const toast = useToast();
  const p = state.profile!;
  const latest = state.entries[state.entries.length - 1];
  const [concern, setConcern] = useState("");
  const [routine, setRoutine] = useState("");
  const [notes, setNotes] = useState("");
  const [attach, setAttach] = useState(true);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (concern.trim().length < 10) er.concern = "Please describe your concern in at least a sentence (10+ characters).";
    if (routine.trim().length < 5) er.routine = "Tell us briefly what your routine looks like.";
    setErrs(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    setTimeout(() => {
      const prog = attach ? `\n\nProgress notes shared: ${state.entries.slice(-3).map((x) => `${x.date}: ${x.rating}/5 ${x.notes}`).join(" | ")}` : "";
      addConsult({ date: todayISO(), concern: concern.trim(), routine: routine.trim(), notes: (notes.trim() + prog).trim() });
      setConcern(""); setRoutine(""); setNotes(""); setBusy(false);
      toast("Demo consultation request received");
    }, 900);
  };
  const Err = ({ k }: { k: string }) => (errs[k] ? <p role="alert" className="mt-2 text-xs text-red-700">{errs[k]}</p> : null);
  const field = "mt-2 w-full resize-none rounded-2xl border-0 bg-petal p-4 text-sm font-normal outline-none ring-rose/50 focus:ring-2";

  return (
    <>
      <PageHeader eyebrow="Professional guidance" title={<>When you need a <em>human</em> expert</>} sub="Share your concern, routine and progress notes with a qualified professional." right={<DemoBadge>Demo flow · no real consultation is sent</DemoBadge>} />
      <div className="mb-6 flex gap-4 rounded-3xl bg-white p-6 text-ink shadow-soft ring-1 ring-rose/40"><ShieldAlert className="mt-0.5 shrink-0 text-rose-ink" /><p className="text-sm leading-relaxed text-muted">Automated suggestions in this app are <strong className="font-medium text-ink">not a replacement for a dermatologist</strong>. We don&apos;t diagnose PCOS, hormonal conditions or skin diseases. If you have severe irritation or worrying symptoms, stop using the suspected product and seek medical advice promptly.</p></div>
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <h2 className="font-serif text-3xl text-ink">Request a consultation</h2>
          <form onSubmit={submit} className="mt-6 space-y-5" noValidate>
            <label className="block text-sm font-medium text-ink">Explain your skin concern<textarea value={concern} onChange={(e) => setConcern(e.target.value)} rows={3} maxLength={600} placeholder={`e.g. ${p.concern.toLowerCase()} that hasn't changed after several weeks`} className={field} /><Err k="concern" /></label>
            <label className="block text-sm font-medium text-ink">Describe your current routine<textarea value={routine} onChange={(e) => setRoutine(e.target.value)} rows={3} maxLength={600} placeholder="Products, how often, morning / evening" className={field} /><Err k="routine" /></label>
            <label className="block text-sm font-medium text-ink">Anything else? <span className="text-muted">(optional)</span><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} maxLength={600} className={field} /></label>
            <label className="flex items-start gap-3 rounded-2xl bg-petal p-4 text-sm text-ink"><input type="checkbox" checked={attach} onChange={(e) => setAttach(e.target.checked)} className="mt-1 h-4 w-4 accent-[#AD5878]" /><span>Submit my progress notes{latest ? ` (${state.entries.length} entries, latest ${fmtDate(latest.date)})` : " (none recorded yet)"}<span className="block text-xs text-muted">Photos are never shared in this demo.</span></span></label>
            <Button type="submit" disabled={busy} className="w-full">{busy ? "Sending…" : "Request consultation"}</Button>
          </form>
        </Card>
        <div className="space-y-6">
          <Card><div className="eyebrow">Consultation status</div>
            {state.consults.length === 0 ? <div className="mt-4"><EmptyState icon={<CalendarCheck size={20} />} title="No requests yet" body="Requests you submit will appear here." /></div> : (
              <ul className="mt-4 space-y-3">{state.consults.map((c) => (
                <li key={c.id} className="rounded-3xl bg-petal p-5"><div className="flex items-center justify-between"><Chip tone="pink"><CheckCircle2 size={12} />{c.status}</Chip><span className="text-xs text-muted">{fmtDate(c.date)}</span></div><p className="mt-3 line-clamp-2 text-sm text-ink">{c.concern}</p><p className="mt-3 flex items-center gap-2 text-xs text-muted"><Clock size={12} />Demo only — in production, a clinician replies within a set window.</p></li>))}</ul>)}
          </Card>
          <Card className="!bg-blush/60"><Stethoscope className="text-rose-ink" /><h3 className="font-serif mt-3 text-2xl text-ink">Good reasons to book</h3><ul className="mt-3 space-y-2 text-sm text-ink/90"><li>• Little change after consistent use for ~3 months</li><li>• Dryness or irritation that doesn&apos;t settle</li><li>• Marks, blackheads or pigmentation that persist</li><li>• Concerns you suspect have an internal cause</li></ul></Card>
        </div>
      </div>
    </>
  );
}
export default function Page() { return <AppShell wide><Inner /></AppShell>; }
