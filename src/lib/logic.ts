import type { CheckIn, CheckInOutcomeKind, DayLog } from "./types";
import { addDays, todayISO, diffDays } from "./dates";

export function evaluateCheckIn(a: {
  consistency: CheckIn["consistency"];
  changes: CheckIn["changes"];
  dryness: boolean;
  irritation: CheckIn["irritation"];
  satisfaction: number;
  day: number;
}): { kind: CheckInOutcomeKind; title: string; message: string; actions: string[]; seeConsult: boolean; stop: boolean } {
  if (a.irritation === "severe") {
    return {
      kind: "stop",
      title: "Please pause and get advice",
      message:
        "You reported severe irritation. Stop using the suspected product and speak to a doctor or dermatologist before continuing. We won't give further automated recommendations for this.",
      actions: ["Stop using the suspected product", "Seek professional medical advice", "Request a consultation"],
      seeConsult: true,
      stop: true,
    };
  }
  if (a.irritation === "mild" || a.dryness) {
    return {
      kind: "review",
      title: "Let's review your routine",
      message:
        "Mild dryness or irritation is worth taking seriously. Re-read your product's usage steps and precautions, and consider using it less often. If it continues or worsens, consult a professional.",
      actions: ["Review routine instructions", "Record dryness in your tracker", "Ask for professional guidance if it persists"],
      seeConsult: a.irritation === "mild",
      stop: false,
    };
  }
  if (a.consistency === "no" || a.consistency === "mostly") {
    return {
      kind: "review",
      title: "Consistency is the biggest lever",
      message:
        "Skin changes build slowly, and gaps make it harder to tell whether something is working. Try anchoring your routine to a daily habit, then check in again.",
      actions: ["Revisit your daily checklist", "Set a fixed time for your routine"],
      seeConsult: false,
      stop: false,
    };
  }
  if (a.changes === "none" && a.satisfaction <= 2 && a.day >= 56) {
    return {
      kind: "support",
      title: "Worth talking to a professional",
      message:
        "You've been consistent for a while without noticing change, and you're not satisfied. A professional can check whether your routine suits your concern. This isn't a diagnosis — just a sensible next step.",
      actions: ["Request a consultation", "Share your progress notes"],
      seeConsult: true,
      stop: false,
    };
  }
  if (a.changes === "none") {
    return {
      kind: "steady",
      title: "No change yet is common",
      message:
        "Customers we spoke to described waiting weeks to months for visible change. Keep going, keep tracking, and compare photos over time. This isn't a guarantee of results.",
      actions: ["Keep your routine going", "Add a progress photo"],
      seeConsult: false,
      stop: false,
    };
  }
  return {
    kind: "great",
    title: "You're building real momentum",
    message:
      "You're consistent and noticing something. Nice work. Keep recording so you can see the trend — and remember, results vary and nothing here is guaranteed.",
    actions: ["Keep tracking weekly", "Add a progress photo"],
    seeConsult: false,
    stop: false,
  };
}

export function consistencyPct(logs: Record<string, DayLog>, start: string, days = 7) {
  const today = todayISO();
  const span = Math.min(days, diffDays(today, start) + 1);
  if (span <= 0) return 0;
  let done = 0;
  for (let i = 0; i < span; i++) {
    const l = logs[addDays(today, -i)];
    if (l?.am) done++;
    if (l?.pm) done++;
  }
  return Math.round((done / (span * 2)) * 100);
}

export function dayCompletion(l: DayLog | undefined) {
  if (!l) return 0;
  return Math.round(([l.am, l.pm, l.condition, l.checkin].filter(Boolean).length / 4) * 100);
}

export const CHECKIN_DAYS = [7, 14, 21, 28, 42, 56, 90];
export function nextCheckInDay(day: number, done: CheckIn[]) {
  const doneDays = new Set(done.map((c) => c.day));
  return CHECKIN_DAYS.find((d) => d >= day && !doneDays.has(d)) ?? CHECKIN_DAYS.find((d) => !doneDays.has(d)) ?? 90;
}
