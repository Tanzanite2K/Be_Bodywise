export type ProductId = "body-wash" | "sa-face-wash" | "urea-lotion" | "biotin";

export interface Profile {
  name: string;
  concern: string;
  extraConcerns: string[];
  skinType: string;
  goal: string;
  experience: string;
  sensitivity: string;
  currentProducts: string[];
  customProducts: string;
  productId: ProductId;
  startDate: string; // ISO yyyy-mm-dd
  durationDays: number;
  isDemo: boolean;
}

export interface DayLog {
  am?: boolean;
  pm?: boolean;
  condition?: boolean; // recorded skin condition
  checkin?: boolean;
}

export interface ProgressEntry {
  id: string;
  date: string; // ISO
  rating: number; // 1-5
  changes: "none" | "slight" | "noticeable";
  dryness: boolean;
  irritation: "none" | "mild" | "severe";
  consistent: "yes" | "mostly" | "no";
  notes: string;
  photoId?: string;
}

export interface Photo {
  id: string;
  date: string;
  dataUrl: string;
  label: string;
}

export type CheckInOutcomeKind = "great" | "steady" | "review" | "support" | "stop";

export interface CheckIn {
  id: string;
  date: string;
  day: number;
  consistency: "yes" | "mostly" | "no";
  changes: "none" | "slight" | "noticeable";
  dryness: boolean;
  irritation: "none" | "mild" | "severe";
  satisfaction: number; // 1-5
  outcome: CheckInOutcomeKind;
}

export interface Consultation {
  id: string;
  date: string;
  concern: string;
  routine: string;
  notes: string;
  status: "Received" | "In review" | "Scheduled";
  isDemo: boolean;
}

export interface AppState {
  profile: Profile | null;
  logs: Record<string, DayLog>;
  entries: ProgressEntry[];
  photos: Photo[];
  checkins: CheckIn[];
  consults: Consultation[];
}
