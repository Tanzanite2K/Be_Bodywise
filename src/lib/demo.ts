import type { AppState, DayLog, ProgressEntry, CheckIn, Consultation } from "./types";
import { addDays, todayISO } from "./dates";

export const emptyState = (): AppState => ({
  profile: null, logs: {}, entries: [], photos: [], checkins: [], consults: [],
});

// Deterministic synthetic data for "Alex" — no real personal information.
export function buildDemoState(): AppState {
  const today = todayISO();
  const start = addDays(today, -20); // today = Day 21
  const logs: Record<string, DayLog> = {};
  const missed = new Set([4, 9, 15]);
  for (let i = 0; i < 20; i++) {
    const d = addDays(start, i);
    const miss = missed.has(i);
    logs[d] = { am: !miss, pm: i !== 9, condition: i % 2 === 0 || i > 13, checkin: i === 6 || i === 13 };
  }
  logs[today] = { am: true };

  const entries: ProgressEntry[] = [
    { id: "e1", date: addDays(start, 0), rating: 2, changes: "none", dryness: false, irritation: "none", consistent: "yes", notes: "Day 1 baseline. Back and shoulders have several breakouts and some marks." },
    { id: "e2", date: addDays(start, 6), rating: 3, changes: "none", dryness: false, irritation: "none", consistent: "yes", notes: "Getting used to it. Skin feels a bit smoother after showers." },
    { id: "e3", date: addDays(start, 13), rating: 3, changes: "slight", dryness: true, irritation: "none", consistent: "mostly", notes: "Slightly dry on the shoulders. Added moisturiser after washing." },
    { id: "e4", date: addDays(start, 19), rating: 4, changes: "slight", dryness: false, irritation: "none", consistent: "mostly", notes: "Fewer new spots this week, I think. Marks look about the same." },
  ];
  const checkins: CheckIn[] = [
    { id: "c1", date: addDays(start, 6), day: 7, consistency: "yes", changes: "none", dryness: false, irritation: "none", satisfaction: 3, outcome: "steady" },
    { id: "c2", date: addDays(start, 13), day: 14, consistency: "mostly", changes: "slight", dryness: true, irritation: "none", satisfaction: 3, outcome: "review" },
  ];
  const consults: Consultation[] = [];
  return {
    profile: {
      name: "Alex", concern: "Body acne", extraConcerns: ["Acne marks"], skinType: "Combination",
      goal: "Reduce breakouts", experience: "Have used skincare products before", sensitivity: "Occasionally irritated",
      currentProducts: [], customProducts: "", productId: "body-wash", startDate: start, durationDays: 21, isDemo: true,
    },
    logs, entries, photos: [], checkins, consults,
  };
}
