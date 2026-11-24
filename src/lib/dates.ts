export const iso = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
export const todayISO = () => iso(new Date());
export const parseISO = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
export const addDays = (s: string, n: number) => {
  const d = parseISO(s);
  d.setDate(d.getDate() + n);
  return iso(d);
};
export const diffDays = (a: string, b: string) =>
  Math.round((parseISO(a).getTime() - parseISO(b).getTime()) / 86400000);
export const journeyDay = (start: string) => Math.max(1, diffDays(todayISO(), start) + 1);
export const fmtDate = (s: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }) =>
  parseISO(s).toLocaleDateString("en-IN", opts);
