"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ButtonLink } from "../ui/button";

const links = [
  { href: "/#how", label: "How It Works" },
  { href: "/dashboard", label: "My Journey" },
  { href: "/products", label: "Skin Guide" },
  { href: "/signin", label: "Sign In" },
];

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "bg-petal/90 shadow-[0_1px_0_rgba(200,121,150,.08)] backdrop-blur-xl" : ""}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10" aria-label="Main">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => <Link key={l.label} href={l.href} className="text-sm text-ink/70 transition-colors hover:text-ink">{l.label}</Link>)}
          <ButtonLink href="/onboarding" className="!py-2.5">Start My Journey</ButtonLink>
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-full bg-rose-deep/5 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open && (
        <div className="flex flex-col gap-1 px-5 pb-6 md:hidden">
          {links.map((l) => <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-2xl px-3 py-3 text-lg text-ink">{l.label}</Link>)}
          <ButtonLink href="/onboarding" className="mt-2">Start My Journey</ButtonLink>
        </div>
      )}
    </header>
  );
}
