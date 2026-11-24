"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { AppState, CheckIn, Consultation, DayLog, Photo, ProgressEntry, Profile } from "./types";
import { buildDemoState, emptyState } from "./demo";
import { todayISO } from "./dates";

const KEY = "bodywise.v1";

interface Ctx {
  state: AppState;
  ready: boolean;
  setProfile: (p: Profile) => void;
  loadDemo: () => void;
  reset: () => void;
  toggleTask: (task: keyof DayLog, date?: string) => void;
  addEntry: (e: Omit<ProgressEntry, "id">) => string;
  addPhoto: (p: Omit<Photo, "id">) => string | null;
  deletePhoto: (id: string) => void;
  addCheckIn: (c: Omit<CheckIn, "id">) => void;
  addConsult: (c: Omit<Consultation, "id" | "status" | "isDemo">) => void;
  storageError: string | null;
}

const StoreCtx = createContext<Ctx | null>(null);
const uid = () => Math.random().toString(36).slice(2, 10);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(emptyState());
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) setState({ ...emptyState(), ...JSON.parse(raw) });
      } catch {
        /* corrupted storage — start fresh */
      }
      setReady(true);
    }, 350);
    const ts = timers.current;
    return () => { clearTimeout(t); ts.forEach(clearTimeout); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      setStorageError(null);
    } catch {
      setStorageError("Your browser storage is full. Delete some photos to keep saving.");
    }
  }, [state, ready]);

  const setProfile = useCallback((profile: Profile) => setState({ ...emptyState(), profile }), []);
  const loadDemo = useCallback(() => setState(buildDemoState()), []);
  const reset = useCallback(() => { setState(emptyState()); try { localStorage.removeItem(KEY); } catch {} }, []);
  const toggleTask = useCallback((task: keyof DayLog, date = todayISO()) =>
    setState((s) => ({ ...s, logs: { ...s.logs, [date]: { ...s.logs[date], [task]: !s.logs[date]?.[task] } } })), []);
  const addEntry = useCallback((e: Omit<ProgressEntry, "id">) => {
    const id = uid();
    setState((s) => ({
      ...s,
      entries: [...s.entries, { ...e, id }].sort((a, b) => a.date.localeCompare(b.date)),
      logs: { ...s.logs, [e.date]: { ...s.logs[e.date], condition: true } },
    }));
    return id;
  }, []);
  const addPhoto = useCallback((p: Omit<Photo, "id">) => {
    const id = uid();
    setState((s) => ({ ...s, photos: [...s.photos, { ...p, id }] }));
    return id;
  }, []);
  const deletePhoto = useCallback((id: string) => setState((s) => ({ ...s, photos: s.photos.filter((p) => p.id !== id) })), []);
  const addCheckIn = useCallback((c: Omit<CheckIn, "id">) =>
    setState((s) => ({
      ...s,
      checkins: [...s.checkins, { ...c, id: uid() }],
      logs: { ...s.logs, [c.date]: { ...s.logs[c.date], checkin: true } },
    })), []);
  const addConsult = useCallback((c: Omit<Consultation, "id" | "status" | "isDemo">) =>
    setState((s) => ({ ...s, consults: [{ ...c, id: uid(), status: "Received", isDemo: true }, ...s.consults] })), []);

  const value = useMemo(
    () => ({ state, ready, setProfile, loadDemo, reset, toggleTask, addEntry, addPhoto, deletePhoto, addCheckIn, addConsult, storageError }),
    [state, ready, setProfile, loadDemo, reset, toggleTask, addEntry, addPhoto, deletePhoto, addCheckIn, addConsult, storageError]
  );
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore must be used inside StoreProvider");
  return c;
}
