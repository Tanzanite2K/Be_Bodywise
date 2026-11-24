"use client";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";
import { Button } from "./ui/button";
import { useStore } from "@/lib/store";
import { useToast } from "./ui/toast";

export function DemoButton({ variant = "pink", className, children }: { variant?: "pink" | "primary" | "outline" | "dark"; className?: string; children?: React.ReactNode }) {
  const { loadDemo } = useStore();
  const router = useRouter();
  const toast = useToast();
  return (
    <Button variant={variant} className={className} onClick={() => { loadDemo(); toast("Demo journey loaded — meet Alex, Day 21", "info"); router.push("/dashboard"); }}>
      <Play size={15} className="fill-current" />{children ?? "Try Interactive Demo"}
    </Button>
  );
}
