import Link from "next/link";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "pink" | "ghost" | "outline" | "dark";
const styles: Record<Variant, string> = {
  primary: "bg-rose-cta text-white shadow-[0_8px_24px_-10px_rgba(173,88,120,.7)] hover:-translate-y-0.5 hover:bg-[#9A4A69] hover:shadow-[0_14px_30px_-12px_rgba(173,88,120,.8)]",
  pink: "bg-pink text-ink hover:-translate-y-0.5 hover:bg-rose/70",
  ghost: "bg-transparent text-ink hover:bg-blush",
  outline: "border border-rose/50 bg-white/60 text-ink hover:border-rose hover:bg-blush",
  dark: "bg-white/80 text-ink ring-1 ring-line backdrop-blur hover:bg-white",
};
const base = "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none";

export function Button({ variant = "primary", className, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button {...p} className={clsx(base, styles[variant], className)} />;
}
export function ButtonLink({ href, variant = "primary", className, children }: { href: string; variant?: Variant; className?: string; children: ReactNode }) {
  return <Link href={href} className={clsx(base, styles[variant], className)}>{children}</Link>;
}
