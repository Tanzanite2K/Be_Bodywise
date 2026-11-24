"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Route, ListChecks, LineChart, FlaskConical, MessageCircleHeart, Stethoscope, Sparkles, type LucideIcon } from "lucide-react";
import clsx from "clsx";
import type { ReactNode } from "react";
import { Logo } from "./logo";
import { useStore } from "@/lib/store";
import { Skeleton, EmptyState } from "../ui/primitives";
import { Button, ButtonLink } from "../ui/button";
import { journeyDay } from "@/lib/dates";

const nav: { href: string; label: string; icon: LucideIcon; mobile?: boolean }[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, mobile: true },
  { href: "/journey", label: "Journey", icon: Route, mobile: true },
  { href: "/routine", label: "Routine", icon: ListChecks, mobile: true },
  { href: "/progress", label: "Progress", icon: LineChart, mobile: true },
  { href: "/check-in", label: "Check-in", icon: MessageCircleHeart, mobile: true },
  { href: "/products", label: "Skin Guide", icon: FlaskConical },
  { href: "/guidance", label: "Guidance", icon: Stethoscope },
];

export function AppShell({ children, wide }: { children: ReactNode; wide?: boolean }) {
  const path = usePathname();
  const { state, ready, loadDemo } = useStore();
  const p = state.profile;

  return (
    <div className="min-h-screen md:pl-72">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col justify-between border-r border-line bg-white/90 p-6 text-ink backdrop-blur-xl md:flex">
        <div>
          <Logo className="mb-10" />
          <nav className="space-y-1" aria-label="App">
            {nav.map((n) => {
              const active = path === n.href;
              return (
                <Link key={n.href} href={n.href} className={clsx("relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-colors", active ? "text-white" : "text-muted hover:bg-blush hover:text-ink")}>
                  {active && <motion.span layoutId="navpill" className="absolute inset-0 rounded-2xl bg-rose-cta shadow-[0_10px_24px_-12px_rgba(173,88,120,.8)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <n.icon size={18} className="relative" /><span className="relative font-medium">{n.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-petal to-blush p-5">
          {p ? (
            <>
              <div className="text-xs uppercase tracking-widest text-rose-ink">{p.isDemo ? "Demo journey" : "Your journey"}</div>
              <div className="mt-1 font-serif text-2xl">Day {journeyDay(p.startDate)}</div>
              <div className="mt-1 text-xs text-muted">{p.name} · {p.concern}</div>
            </>
          ) : (
            <div className="text-sm text-muted">No journey yet.</div>
          )}
          <Link href="/" className="mt-4 block text-xs text-rose-ink hover:underline">← Back to home</Link>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between bg-petal/85 px-5 py-3 backdrop-blur-xl md:hidden">
        <Logo />
        <Link href="/guidance" className="grid h-9 w-9 place-items-center rounded-full bg-rose-deep/5 text-ink" aria-label="Professional guidance"><Stethoscope size={16} /></Link>
      </header>

      <main id="main" className={clsx("mx-auto px-5 pb-32 pt-6 md:px-12 md:pb-16 md:pt-12", wide ? "max-w-6xl" : "max-w-5xl")}>
        {!ready ? (
          <div className="space-y-5"><Skeleton className="h-10 w-2/3" /><Skeleton className="h-40" /><div className="grid gap-5 md:grid-cols-2"><Skeleton className="h-56" /><Skeleton className="h-56" /></div></div>
        ) : !p ? (
          <EmptyState icon={<Sparkles size={22} />} title="Your journey starts here" body="Tell us about your skin in about a minute, or explore a ready-made demo journey with synthetic data."
            action={<div className="flex flex-wrap justify-center gap-3"><ButtonLink href="/onboarding">Start my journey</ButtonLink><Button variant="outline" onClick={loadDemo}>Try interactive demo</Button></div>} />
        ) : (
          <motion.div key={path} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
        )}
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-40 flex justify-around rounded-[28px] bg-white/90 p-2 shadow-lift ring-1 ring-line backdrop-blur-xl md:hidden" aria-label="App mobile">
        {nav.filter((n) => n.mobile).map((n) => {
          const active = path === n.href;
          return (
            <Link key={n.href} href={n.href} className={clsx("flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-[10px] font-medium", active ? "bg-rose-cta text-white" : "text-muted")}>
              <n.icon size={18} />{n.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
