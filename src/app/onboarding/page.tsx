"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import clsx from "clsx";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Chip, DemoBadge } from "@/components/ui/primitives";
import { CONCERNS, SKIN_TYPES, GOALS, EXPERIENCE, SENSITIVITY, PRODUCTS, recommendProduct } from "@/lib/data";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast";
import { todayISO } from "@/lib/dates";
import type { ProductId } from "@/lib/types";
import { DemoButton } from "@/components/demo-button";

const steps = [
  { q: "What's your main concern right now?", sub: "Pick the one that bothers you most. We'll keep the rest in mind." },
  { q: "How would you describe your skin type?", sub: "No wrong answers — “not sure” is perfectly fine." },
  { q: "What's your primary goal?", sub: "What would feel like a win to you?" },
  { q: "How much skincare experience do you have?", sub: "So we can pitch the guidance at the right level." },
  { q: "How sensitive is your skin?", sub: "This helps us start gently and flag irritation early." },
  { q: "What are you using right now?", sub: "Optional — pick any you use, or add your own." },
];

export default function Onboarding() {
  const router = useRouter();
  const toast = useToast();
  const { setProfile } = useStore();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [a, setA] = useState({ concern: "", skinType: "", goal: "", experience: "", sensitivity: "", current: [] as string[], custom: "", name: "" });
  const [choice, setChoice] = useState<ProductId | null>(null);
  const [error, setError] = useState("");
  const final = i === steps.length;
  const rec = useMemo(() => (a.concern ? recommendProduct(a.concern, a.skinType || "Not sure") : null), [a.concern, a.skinType]);

  const value = [a.concern, a.skinType, a.goal, a.experience, a.sensitivity, "ok"][i];
  const go = (n: number) => { setDir(n > i ? 1 : -1); setI(n); setError(""); };
  const next = () => { if (!value) { setError("Please choose an option to continue."); return; } go(i + 1); };
  const pick = (k: "concern" | "skinType" | "goal" | "experience" | "sensitivity", v: string) => { setA((s) => ({ ...s, [k]: v })); setError(""); };

  const begin = () => {
    if (!rec) return;
    const productId = choice ?? rec.product.id;
    if (a.name.length > 30) { setError("Please keep the name under 30 characters."); return; }
    setProfile({
      name: a.name.trim() || "there", concern: a.concern, extraConcerns: [], skinType: a.skinType, goal: a.goal, experience: a.experience,
      sensitivity: a.sensitivity, currentProducts: a.current, customProducts: a.custom.trim(), productId, startDate: todayISO(), durationDays: 90, isDemo: false,
    });
    toast("Your Results Journey has begun");
    router.push("/journey");
  };

  const OptionGrid = ({ items, k, cols = "sm:grid-cols-2" }: { items: (string | { label: string; hint: string })[]; k: "concern" | "skinType" | "goal" | "experience" | "sensitivity"; cols?: string }) => (
    <div className={clsx("grid gap-3", cols)} role="radiogroup">
      {items.map((it) => {
        const label = typeof it === "string" ? it : it.label;
        const hint = typeof it === "string" ? undefined : it.hint;
        const on = a[k] === label;
        return (
          <button key={label} role="radio" aria-checked={on} onClick={() => pick(k, label)}
            className={clsx("flex items-center justify-between rounded-3xl px-5 py-4 text-left transition-all duration-300", on ? "bg-rose-cta text-white shadow-lift" : "bg-white text-ink shadow-soft hover:-translate-y-0.5 hover:shadow-lift")}>
            <span><span className="block text-[15px] font-medium">{label}</span>{hint && <span className={clsx("mt-0.5 block text-xs", on ? "text-white/90" : "text-muted")}>{hint}</span>}</span>
            <span className={clsx("grid h-6 w-6 shrink-0 place-items-center rounded-full transition-all", on ? "bg-pink text-ink" : "border border-rose/40")}>{on && <Check size={14} />}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-petal">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-6"><Logo /><DemoButton variant="outline" className="!py-2 !text-xs">Skip — try demo</DemoButton></header>
      <main id="main" className="mx-auto max-w-3xl px-5 pb-20">
        <div className="mb-10" aria-label={`Step ${Math.min(i + 1, 6)} of 6`}>
          <div className="flex gap-1.5">{steps.map((_, n) => <div key={n} className="h-1.5 flex-1 overflow-hidden rounded-full bg-blush"><motion.div className="h-full bg-rose-cta" initial={false} animate={{ width: n < i || final ? "100%" : n === i ? "45%" : "0%" }} transition={{ duration: 0.5 }} /></div>)}</div>
          <div className="mt-3 text-xs uppercase tracking-widest text-muted">{final ? "Your match" : `Step ${i + 1} of ${steps.length}`}</div>
        </div>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={i} custom={dir} initial={{ opacity: 0, x: 40 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 * dir }} transition={{ duration: 0.35 }}>
            {!final ? (
              <>
                <h1 className="font-serif text-4xl leading-[1.08] text-ink md:text-5xl">{steps[i].q}</h1>
                <p className="mb-8 mt-3 text-muted">{steps[i].sub}</p>
                {i === 0 && <OptionGrid items={CONCERNS} k="concern" />}
                {i === 1 && <OptionGrid items={SKIN_TYPES} k="skinType" />}
                {i === 2 && <OptionGrid items={GOALS} k="goal" cols="" />}
                {i === 3 && <OptionGrid items={EXPERIENCE} k="experience" cols="" />}
                {i === 4 && <OptionGrid items={SENSITIVITY} k="sensitivity" />}
                {i === 5 && (
                  <div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {PRODUCTS.map((p) => {
                        const on = a.current.includes(p.id);
                        return (
                          <button key={p.id} aria-pressed={on} onClick={() => setA((s) => ({ ...s, current: on ? s.current.filter((x) => x !== p.id) : [...s.current, p.id] }))}
                            className={clsx("rounded-3xl p-5 text-left transition-all duration-300", on ? "bg-rose-cta text-white shadow-lift" : "bg-white shadow-soft hover:-translate-y-0.5")}>
                            <div className={clsx("mb-4 h-10 w-10 rounded-2xl bg-gradient-to-br", p.tone)} /><div className="text-sm font-medium">{p.name}</div><div className={clsx("mt-1 text-xs", on ? "text-white/90" : "text-muted")}>{p.category}</div>
                          </button>
                        );
                      })}
                    </div>
                    <label className="mt-5 block text-sm text-ink">Anything else you use? <span className="text-muted">(optional)</span>
                      <input value={a.custom} maxLength={120} onChange={(e) => setA((s) => ({ ...s, custom: e.target.value }))} placeholder="e.g. a moisturiser, sunscreen…" className="mt-2 w-full rounded-2xl border-0 bg-white px-5 py-4 text-[15px] shadow-soft outline-none ring-rose/50 placeholder:text-muted/60 focus:ring-2" />
                    </label>
                  </div>
                )}
                {error && <p role="alert" className="mt-5 text-sm text-red-700">{error}</p>}
                <div className="mt-10 flex items-center justify-between">
                  <Button variant="ghost" onClick={() => go(i - 1)} className={i === 0 ? "invisible" : ""}><ArrowLeft size={16} />Back</Button>
                  <Button onClick={next}>{i === steps.length - 1 ? "See my match" : "Continue"}<ArrowRight size={16} /></Button>
                </div>
              </>
            ) : rec && (
              <>
                <Chip tone="pink"><Sparkles size={12} />Your personalised starting point</Chip>
                <h1 className="font-serif mt-5 text-4xl leading-[1.08] text-ink md:text-5xl">We&apos;d begin with {(PRODUCTS.find((p) => p.id === (choice ?? rec.product.id)) ?? rec.product).short}.</h1>
                <div className="mt-8 overflow-hidden rounded-[32px] bg-white shadow-lift">
                  <div className={clsx("h-28 bg-gradient-to-br", (PRODUCTS.find((p) => p.id === (choice ?? rec.product.id)) ?? rec.product).tone)} />
                  <div className="p-7">
                    <div className="text-sm text-muted">{(PRODUCTS.find((p) => p.id === (choice ?? rec.product.id)) ?? rec.product).purpose}</div>
                    <ul className="mt-4 space-y-2 text-sm text-ink">{rec.reasons.map((r) => <li key={r} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-rose-ink" />{r}</li>)}</ul>
                    <div className="mt-5"><DemoBadge>Matching logic is a demo — brand experts to validate</DemoBadge></div>
                  </div>
                </div>
                <div className="mt-6"><div className="mb-3 text-sm text-muted">Prefer a different product?</div>
                  <div className="flex flex-wrap gap-2">{PRODUCTS.map((p) => { const on = (choice ?? rec.product.id) === p.id; return <button key={p.id} onClick={() => setChoice(p.id)} aria-pressed={on} className={clsx("rounded-full px-4 py-2 text-xs font-medium transition-colors", on ? "bg-rose-cta text-white" : "bg-white text-ink shadow-soft")}>{p.short}</button>; })}</div></div>
                <label className="mt-8 block text-sm text-ink">What should we call you? <span className="text-muted">(optional — kept only on this device)</span>
                  <input value={a.name} maxLength={30} onChange={(e) => setA((s) => ({ ...s, name: e.target.value }))} placeholder="First name or nickname" className="mt-2 w-full rounded-2xl border-0 bg-white px-5 py-4 shadow-soft outline-none ring-rose/50 focus:ring-2" />
                </label>
                {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
                <div className="mt-10 flex items-center justify-between"><Button variant="ghost" onClick={() => go(steps.length - 1)}><ArrowLeft size={16} />Back</Button><Button onClick={begin}>Begin my journey<ArrowRight size={16} /></Button></div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
