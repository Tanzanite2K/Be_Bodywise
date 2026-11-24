import Link from "next/link";
import clsx from "clsx";
export function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={clsx("flex items-center gap-2", className)} aria-label="BODYWISE home">
      <span className={clsx("grid h-8 w-8 place-items-center rounded-full", light ? "bg-pink text-ink" : "bg-rose-deep text-white")}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 21c-4-3-7-6-7-10a7 7 0 0 1 14 0c0 4-3 7-7 10Z" /><path d="M12 8v6M9 11h6" /></svg>
      </span>
      <span className={clsx("text-[15px] font-semibold tracking-[0.2em]", light ? "text-white" : "text-ink")}>BODYWISE</span>
    </Link>
  );
}
