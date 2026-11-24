"use client";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Sparkles, BookOpen, ListChecks, LineChart, Stethoscope, Clock, CheckCircle2, Camera, ShieldCheck, Quote } from "lucide-react";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { Fade, Ring, Chip } from "@/components/ui/primitives";
import { LeafBlob, Sprig } from "@/components/ui/illustrations";
import { DemoButton } from "@/components/demo-button";
import Link from "next/link";

const stages = [
  { n: "01", icon: Compass, t: "Discover", d: "Tell us your concern, skin type and goal in a short, conversational flow." },
  { n: "02", icon: Sparkles, t: "Match", d: "See which product is a sensible starting point — and why." },
  { n: "03", icon: BookOpen, t: "Understand", d: "How to use it, what to expect, and what we can't promise." },
  { n: "04", icon: ListChecks, t: "Follow", d: "A simple morning and evening routine with a daily checklist." },
  { n: "05", icon: LineChart, t: "Track", d: "Rate your skin, add private photos, and watch the trend build." },
  { n: "06", icon: Stethoscope, t: "Improve", d: "Smart check-ins point to next steps — or a professional when needed." },
];

const findings = [
  { big: "5/5", t: "waited longer than expected for results" },
  { big: "4/5", t: "felt price and results didn't fully match" },
  { big: "3/5", t: "noticed a gap between the ad and the result" },
  { big: "3/5", t: "were left with marks, blackheads or pigmentation" },
];

export default function Landing() {
  return (
    <div className="overflow-x-hidden">
      <MarketingNav />

      {/* HERO */}
      <div className="relative bg-gradient-to-b from-petal via-blush/70 to-petal">
      <div className="pointer-events-none absolute -right-24 top-24 h-96 w-96 rounded-full bg-pink/50 blur-3xl" />
      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-32 md:grid-cols-[1.05fr_1fr] md:px-10 md:pb-28 md:pt-40">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><Chip tone="pink"><Sparkles size={12} /> Results Journey · built from customer interviews</Chip></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="font-serif mt-6 text-[44px] leading-[1.02] text-ink sm:text-6xl lg:text-[76px]">
            Good skin takes time.<br /><em className="text-rose-ink">We&apos;ll help you understand every step.</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted">
            Your skincare journey shouldn&apos;t feel like guesswork. Discover the right routine, understand what to expect, and see your progress with personalized guidance.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/onboarding">Start My Skin Journey <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></ButtonLink>
            <ButtonLink href="/#how" variant="outline">Explore How It Works</ButtonLink>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-5">
            <DemoButton variant="outline">Try Interactive Demo — no sign-up</DemoButton>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.9 }} className="relative mx-auto aspect-[4/4.6] w-full max-w-[520px]">
          <LeafBlob className="absolute inset-0 h-full w-full" />
          <Sprig className="absolute -left-4 bottom-4 h-40 text-rose-ink/70" />
          <div className="floaty absolute -left-2 top-10 w-52 rounded-3xl bg-white/95 p-4 shadow-lift backdrop-blur md:-left-10">
            <div className="eyebrow">Day 21</div>
            <div className="mt-2 flex items-center gap-3"><Ring value={86} size={64} stroke={7} /><div className="text-xs leading-snug text-muted">Routine consistency this week</div></div>
          </div>
          <div className="floaty absolute -right-2 top-1/2 w-56 rounded-3xl bg-rose-cta p-4 text-white shadow-lift md:-right-8" style={{ animationDelay: "-2s" }}>
            <div className="text-[10px] uppercase tracking-widest text-white">Next milestone</div>
            <div className="mt-1 font-serif text-xl">Week 6–8 · Progress review</div>
            <div className="mt-3 h-1.5 rounded-full bg-white/30"><div className="h-full w-1/3 rounded-full bg-white" /></div>
          </div>
          <div className="floaty absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-xs font-medium text-ink shadow-lift" style={{ animationDelay: "-4s" }}>
            <CheckCircle2 size={14} className="text-rose-ink" /> Check-in complete
          </div>
        </motion.div>
      </section>

      </div>
      {/* PROBLEM */}
      <section className="relative bg-gradient-to-b from-blush to-pink/40 py-24 text-ink md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Fade><div className="eyebrow">The problem with skincare guesswork</div></Fade>
          <Fade delay={0.05}><h2 className="font-serif mt-5 max-w-3xl text-4xl leading-[1.08] md:text-6xl">You bought the product. Then came the waiting — and the doubt.</h2></Fade>
          <Fade delay={0.1}><p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">We spoke with five Be Bodywise customers. They liked what they bought. But nobody told them how long it would take, whether they were using it right, or what to do if nothing seemed to change.</p></Fade>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {findings.map((f, i) => (
              <Fade key={f.t} delay={i * 0.08}>
                <div className="h-full rounded-[28px] bg-white p-7 shadow-soft"><div className="font-serif text-6xl text-rose-deep">{f.big}</div><p className="mt-3 text-sm leading-relaxed text-muted">{f.t}</p></div>
              </Fade>
            ))}
          </div>
          <Fade delay={0.1}>
            <figure className="mt-10 flex max-w-2xl gap-4 rounded-[28px] bg-white/80 p-7 shadow-soft backdrop-blur">
              <Quote className="mt-1 shrink-0 text-rose-deep" size={22} />
              <div><blockquote className="font-serif text-xl leading-snug">Ads create expectations of quick results, whereas actual improvement takes consistent use and considerable time.</blockquote><figcaption className="mt-3 text-xs uppercase tracking-widest text-muted">Customer interview · paraphrased</figcaption></div>
            </figure>
          </Fade>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 md:px-10 md:py-32">
        <Fade><div className="eyebrow">How Results Journey works</div></Fade>
        <Fade delay={0.05}><h2 className="font-serif mt-5 max-w-3xl text-4xl leading-[1.08] text-ink md:text-6xl">One guided journey, from first wash to three-month review.</h2></Fade>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stages.map((s, i) => (
            <Fade key={s.n} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-[28px] bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-blush text-ink transition-colors group-hover:bg-pink"><s.icon size={20} /></span><span className="font-serif text-4xl text-ink/15">{s.n}</span></div>
                <h3 className="font-serif mt-6 text-2xl text-ink">{s.t}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* ROUTINES + EXPECTATIONS */}
      <section className="bg-blush/50 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-2 md:px-10">
          <Fade>
            <div className="eyebrow">Personalized routines</div>
            <h2 className="font-serif mt-5 text-4xl leading-[1.08] text-ink md:text-5xl">No more wondering what goes with what.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted">A simple morning and evening routine built around your concern, skin type and sensitivity — with plain-language precautions and honest labels wherever guidance is still awaiting expert review.</p>
            <ul className="mt-6 space-y-3 text-sm text-ink">{["Daily checklist with a completion score", "Precautions beside every step", "Combination guidance clearly labelled when unverified"].map((t) => <li key={t} className="flex items-center gap-3"><CheckCircle2 size={18} className="text-rose-ink" />{t}</li>)}</ul>
          </Fade>
          <Fade delay={0.1}>
            <div className="rounded-[32px] bg-white p-7 shadow-lift">
              <div className="flex items-center justify-between"><div className="font-serif text-2xl text-ink">Today</div><Chip tone="pink">75% done</Chip></div>
              {["Morning routine", "Evening routine", "Record skin condition", "Progress check-in"].map((t, i) => (
                <div key={t} className="mt-3 flex items-center gap-4 rounded-2xl bg-petal p-4"><span className={`grid h-7 w-7 place-items-center rounded-full ${i < 3 ? "bg-rose-deep text-white" : "border-2 border-rose/40"}`}>{i < 3 && <CheckCircle2 size={15} />}</span><span className={`text-sm ${i < 3 ? "text-muted line-through" : "text-ink"}`}>{t}</span></div>
              ))}
            </div>
          </Fade>
        </div>

        <div className="mx-auto mt-28 grid max-w-7xl items-center gap-14 px-5 md:grid-cols-2 md:px-10">
          <Fade className="order-2 md:order-1">
            <div className="rounded-[32px] bg-white p-8 shadow-lift">
              <div className="eyebrow mb-6">Your timeline · illustrative</div>
              {[["Day 01", "Start", true], ["Week 1", "Build your routine", true], ["Week 3–4", "Early observations", false], ["Week 6–8", "Progress review", false], ["~3 months", "Journey review", false]].map(([a, b, done], i, arr) => (
                <div key={String(a)} className="flex gap-4"><div className="flex flex-col items-center"><span className={`grid h-6 w-6 place-items-center rounded-full ${done ? "bg-rose-deep text-white" : i === 2 ? "bg-pink ring-4 ring-rose/40" : "bg-blush"}`}>{done && <CheckCircle2 size={13} />}</span>{i < arr.length - 1 && <span className="h-9 w-px bg-rose-deep/15" />}</div><div className="-mt-0.5 pb-5"><div className="text-[11px] font-semibold uppercase tracking-widest text-rose-ink">{String(a)}</div><div className="text-sm text-ink">{String(b)}</div></div></div>
              ))}
            </div>
          </Fade>
          <Fade delay={0.1} className="order-1 md:order-2">
            <div className="eyebrow">Realistic expectations</div>
            <h2 className="font-serif mt-5 text-4xl leading-[1.08] text-ink md:text-5xl">Know what&apos;s normal — and when.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted">Customers told us they waited from three weeks to over a year. Results Journey sets honest, illustrative checkpoints so waiting feels like progress, not failure.</p>
            <p className="mt-4 flex max-w-md items-start gap-3 rounded-2xl bg-white/70 p-4 text-xs leading-relaxed text-muted"><Clock size={16} className="mt-0.5 shrink-0 text-rose-ink" />Checkpoints are illustrative, drawn from interviews — not clinical guarantees. Product-specific timelines will be set by the brand&apos;s qualified experts.</p>
          </Fade>
        </div>
      </section>

      {/* TRACK + PRO */}
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32">
        <Fade>
          <div className="relative h-full overflow-hidden rounded-[32px] bg-gradient-to-br from-pink to-rose p-9 text-ink md:p-12">
            <LineChart className="text-rose-ink" size={28} />
            <h3 className="font-serif mt-6 text-4xl leading-tight">Track your progress, privately.</h3>
            <p className="mt-4 max-w-sm text-ink/80">Weekly 1–5 ratings, notes and your own photos side by side. Photos stay on your device — and we never claim your skin improved from a picture alone.</p>
            <div className="mt-8 flex items-end gap-2">{[2, 3, 3, 4, 4].map((v, i) => <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: v * 22 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }} className="w-9 rounded-t-xl bg-white/90" />)}<Camera className="mb-1 ml-4 text-ink/40" /></div>
          </div>
        </Fade>
        <Fade delay={0.1}>
          <div className="h-full rounded-[32px] bg-white p-9 shadow-soft md:p-12">
            <Stethoscope className="text-rose-ink" size={28} />
            <h3 className="font-serif mt-6 text-4xl leading-tight text-ink">Professional guidance when it matters.</h3>
            <p className="mt-4 max-w-sm text-muted">If results stall or irritation appears, request a consultation and share your progress notes. Automated suggestions never replace a dermatologist, and we don&apos;t diagnose.</p>
            <p className="mt-6 flex items-center gap-2 text-sm text-ink"><ShieldCheck size={16} /> Severe irritation? We&apos;ll tell you to stop and seek medical advice.</p>
          </div>
        </Fade>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-20 md:px-10">
        <Fade>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-gradient-to-br from-petal via-blush to-pink px-8 py-20 text-center text-ink shadow-soft md:py-28">
            <div className="absolute -left-10 bottom-0 text-rose-deep/20"><Sprig className="h-72" /></div>
            <div className="absolute -right-10 top-0 rotate-180 text-rose-deep/20"><Sprig className="h-72" /></div>
            <h2 className="font-serif relative mx-auto max-w-3xl text-4xl leading-[1.08] md:text-6xl">Stop waiting in the dark. Start a journey you can see.</h2>
            <div className="relative mt-10 flex flex-wrap justify-center gap-3"><ButtonLink href="/onboarding">Start My Skin Journey</ButtonLink><DemoButton variant="dark">Try Interactive Demo</DemoButton></div>
          </div>
        </Fade>
      </section>

      <footer className="mx-auto max-w-7xl px-5 pb-12 text-xs text-muted md:px-10">
        <div className="flex flex-col justify-between gap-4 border-t border-rose/40 pt-8 md:flex-row"><Logo /><p className="max-w-xl leading-relaxed">Concept prototype built for the Mosaic Wellness Fellowship from five anonymised customer interviews. All journey data is synthetic and stored only in your browser. Content marked “demo” is pending medical review and is not medical advice. <Link href="/guidance" className="underline">Professional guidance</Link></p></div>
      </footer>
    </div>
  );
}
