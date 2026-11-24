"use client";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { DemoButton } from "@/components/demo-button";
import { useStore } from "@/lib/store";

export default function SignIn() {
  const { state, ready } = useStore();
  return (
    <div className="grid min-h-screen place-items-center bg-petal px-5">
      <main id="main" className="w-full max-w-md rounded-[32px] bg-white p-9 text-center shadow-lift">
        <Logo className="mb-8 justify-center" />
        <h1 className="font-serif text-4xl text-ink">Welcome back</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">This prototype uses guest access: no passwords, no accounts. Your journey is saved privately in this browser only.</p>
        <div className="mt-8 flex flex-col gap-3">
          {ready && state.profile && <ButtonLink href="/dashboard">Continue my journey</ButtonLink>}
          <ButtonLink href="/onboarding" variant={ready && state.profile ? "outline" : "primary"}>Start a new journey</ButtonLink>
          <DemoButton variant="pink">Try Interactive Demo</DemoButton>
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted"><ShieldCheck size={14} /> Real authentication would be added before launch.</p>
        <Link href="/" className="mt-4 inline-block text-xs text-ink underline">Back to home</Link>
      </main>
    </div>
  );
}
