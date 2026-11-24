import type { ProductId } from "./types";

export const CONCERNS = [
  "Body acne", "Face acne", "Acne marks", "Pigmentation", "Dark spots",
  "Blackheads", "Uneven skin tone", "Dry skin", "Rough skin", "Other",
];
export const SKIN_TYPES = [
  { label: "Oily", hint: "Shiny by midday" },
  { label: "Dry", hint: "Tight or flaky" },
  { label: "Combination", hint: "Oily T-zone, drier cheeks" },
  { label: "Normal", hint: "Balanced, few issues" },
  { label: "Sensitive", hint: "Reacts easily" },
  { label: "Not sure", hint: "We'll keep it gentle" },
];
export const GOALS = [
  "Reduce breakouts", "Improve skin texture", "Reduce the appearance of dark spots",
  "Improve hydration", "Build a consistent skincare routine",
];
export const EXPERIENCE = [
  { label: "New to skincare", hint: "Starting from the basics" },
  { label: "Have used skincare products before", hint: "Know a few things" },
  { label: "Currently using multiple products", hint: "Already have a routine" },
];
export const SENSITIVITY = [
  { label: "Sensitive", hint: "Skin reacts easily" },
  { label: "Occasionally irritated", hint: "Sometimes stings or reddens" },
  { label: "Generally tolerant", hint: "Rarely a problem" },
  { label: "Not sure", hint: "We'll go slowly" },
];

export interface Product {
  id: ProductId;
  name: string;
  short: string;
  category: string;
  purpose: string;
  /** Ingredient info is only listed when it appears in the customer interviews or the product's own name. */
  ingredients: { text: string; source: string }[];
  howToUse: string[];
  precautions: string[];
  expect: string;
  checkpoints: { when: string; what: string }[];
  faqs: { q: string; a: string }[];
  matches: string[]; // concerns it is a sensible starting point for
  slot: "am" | "pm" | "both";
  frequency: string;
  tone: string; // tailwind-ish gradient class key
  interviewNote: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "body-wash",
    name: "Be Bodywise Body Wash",
    short: "Body Wash",
    category: "Body cleanser",
    purpose: "A skincare-focused body wash for body acne, rough skin and uneven tone.",
    ingredients: [
      { text: "Salicylic Acid", source: "Named by Customer 2 in interview — verify on pack" },
      { text: "AHA", source: "Named by Customer 2 in interview — verify on pack" },
      { text: "Niacinamide", source: "Named by Customer 2 in interview — verify on pack" },
    ],
    howToUse: [
      "Wet skin and lather a small amount on the areas of concern.",
      "Leave on for the time stated on the pack, then rinse well.",
      "Follow with a moisturiser if skin feels tight.",
    ],
    precautions: [
      "Avoid contact with eyes and broken skin.",
      "Patch-test first if your skin is sensitive.",
      "If stinging or redness persists, stop and speak to a doctor.",
    ],
    expect:
      "One interviewed customer noticed fewer pimples and smoother skin after around 3 months of regular use. Another interviewee reported waiting even longer. Illustrative only — individual timelines vary.",
    checkpoints: [
      { when: "Week 1", what: "Settle into the routine; note how skin tolerates it." },
      { when: "Week 3–4", what: "Look for early changes in oiliness and texture." },
      { when: "Week 6–8", what: "Review consistency and any change in new breakouts." },
      { when: "~3 months", what: "Journey review: continue, adjust or consult a professional." },
    ],
    faqs: [
      { q: "Why don't I see results yet?", a: "Skin changes gradually. Interviewed customers described waiting weeks to months. Keep tracking so you can spot slow change." },
      { q: "Can I use it every day?", a: "Frequency is a demo placeholder pending medical review. Start slowly and follow the pack instructions." },
      { q: "What if my skin feels dry?", a: "Mild dryness is worth recording. If it persists, reduce use and consider a consultation." },
    ],
    matches: ["Body acne", "Acne marks", "Rough skin", "Uneven skin tone", "Dark spots"],
    slot: "both",
    frequency: "Once daily to start (demo placeholder)",
    tone: "from-[#F4C6D4] to-[#E8A5BA]",
    interviewNote: "Used by Customers 1, 2 and 5",
  },
  {
    id: "sa-face-wash",
    name: "Be Bodywise 1% Salicylic Acid Face Wash",
    short: "1% Salicylic Face Wash",
    category: "Face cleanser",
    purpose: "A face wash with 1% salicylic acid aimed at excess oil, breakouts and blackheads.",
    ingredients: [{ text: "1% Salicylic Acid", source: "Stated in the product name" }],
    howToUse: [
      "Wet your face and massage a small amount gently for about 30 seconds.",
      "Rinse with lukewarm water and pat dry.",
      "Follow with a moisturiser and, in the morning, sunscreen.",
    ],
    precautions: [
      "Avoid the eye area.",
      "Can feel drying — one interviewee reported mild dryness and slight irritation.",
      "Do not stack with other strong actives until a professional confirms it's suitable.",
    ],
    expect:
      "One interviewee saw less oil and fewer breakouts in 3–4 weeks, while pigmentation and dark spots took longer and were not fully resolved. Illustrative only.",
    checkpoints: [
      { when: "Week 1", what: "Check tolerance; keep to once a day." },
      { when: "Week 3–4", what: "Look for changes in oil and breakouts." },
      { when: "Week 6–8", what: "Review marks and dryness." },
      { when: "~3 months", what: "Decide next step; consider a consultation for stubborn marks." },
    ],
    faqs: [
      { q: "Will it fade my dark spots?", a: "It's designed for oil and breakouts. Marks often need longer; we can't promise fading. Consider asking a professional." },
      { q: "Can I use it with other actives?", a: "Combinations need expert approval. See the demo guidance and consult before mixing." },
      { q: "It feels tight — is that normal?", a: "Some tightness can happen. Record it, and if it becomes irritation, stop and seek advice." },
    ],
    matches: ["Face acne", "Blackheads", "Pigmentation", "Dark spots", "Acne marks", "Uneven skin tone"],
    slot: "both",
    frequency: "Once daily to start (demo placeholder)",
    tone: "from-[#F9E3EA] to-[#E8A5BA]",
    interviewNote: "Used by Customer 3",
  },
  {
    id: "urea-lotion",
    name: "Be Bodywise 10% Urea Lotion",
    short: "10% Urea Lotion",
    category: "Body moisturiser",
    purpose: "A body lotion with 10% urea (as described by a customer) for dry, rough skin.",
    ingredients: [{ text: "10% Urea", source: "Stated in the product name / by Customer 4" }],
    howToUse: [
      "Apply to clean, slightly damp skin.",
      "Massage in until absorbed; reapply to very dry areas as needed.",
      "Use after your cleanser in the evening.",
    ],
    precautions: [
      "Avoid broken or very irritated skin.",
      "Patch-test if your skin is sensitive.",
    ],
    expect:
      "Customer 4 bought it for dry skin and said it worked well. It was not designed for acne — if acne is your main concern, a different product may suit you better.",
    checkpoints: [
      { when: "Week 1", what: "Notice how soft skin feels after applying." },
      { when: "Week 3–4", what: "Track dryness and roughness." },
      { when: "Week 6–8", what: "Review hydration consistency." },
      { when: "~3 months", what: "Decide whether to continue or add support." },
    ],
    faqs: [
      { q: "Will it clear my acne?", a: "It's a moisturiser for dry skin. Customer 4 listed acne as her concern but bought this for dryness — worth checking the product matches your goal." },
      { q: "How often should I apply?", a: "Follow the pack. Frequency here is a demo placeholder." },
      { q: "Can I use it with my body wash?", a: "Generally a cleanser then moisturiser is a common pattern, but confirm with an expert." },
    ],
    matches: ["Dry skin", "Rough skin"],
    slot: "pm",
    frequency: "Evening, after cleansing (demo placeholder)",
    tone: "from-[#FFF5F7] to-[#F4C6D4]",
    interviewNote: "Used by Customer 4",
  },
  {
    id: "biotin",
    name: "Biotin Gummies",
    short: "Biotin Gummies",
    category: "Supplement",
    purpose: "A daily gummy supplement positioned for hair, skin and nails wellness.",
    ingredients: [{ text: "Biotin", source: "Stated in the product name" }],
    howToUse: [
      "Take as directed on the pack.",
      "Take consistently at a time you'll remember.",
    ],
    precautions: [
      "Supplements are not a treatment for medical conditions.",
      "If you have hair thinning or acne linked to internal causes, speak to a doctor.",
    ],
    expect:
      "Customer 1 reported no noticeable results after months and linked hair thinning to internal causes. Supplements may take a long time or may not suit every concern.",
    checkpoints: [
      { when: "Week 1", what: "Build the daily habit." },
      { when: "Week 3–4", what: "Note any changes — don't expect much yet." },
      { when: "Week 6–8", what: "Review consistency." },
      { when: "~3 months", what: "Talk to a professional if little has changed." },
    ],
    faqs: [
      { q: "How long until I see a difference?", a: "There is no verified timeline here. Customer 1 saw nothing noticeable after months. A doctor can advise." },
      { q: "Could my concern have an internal cause?", a: "Possibly — we can't diagnose. A doctor consultation is the right route." },
      { q: "Can I take it with other products?", a: "Ask a professional if you're unsure." },
    ],
    matches: ["Other"],
    slot: "am",
    frequency: "Daily, as per pack (demo placeholder)",
    tone: "from-[#F4C6D4] to-[#C87996]",
    interviewNote: "Mentioned by Customer 1",
  },
];

export const getProduct = (id: ProductId) => PRODUCTS.find((p) => p.id === id)!;

export function recommendProduct(concern: string, skinType: string): { product: Product; reasons: string[] } {
  let id: ProductId = "body-wash";
  const reasons: string[] = [];
  if (["Face acne", "Blackheads"].includes(concern)) id = "sa-face-wash";
  else if (["Pigmentation", "Dark spots", "Uneven skin tone"].includes(concern)) id = "sa-face-wash";
  else if (["Dry skin"].includes(concern)) id = "urea-lotion";
  else if (concern === "Other") { id = "body-wash"; }
  const product = getProduct(id);
  reasons.push(concern === "Other" ? "We've picked a general starting point — you can choose a different product below." : `Your main concern (${concern.toLowerCase()}) is a common reason customers choose it.`);
  if (skinType === "Sensitive") reasons.push("You noted sensitive skin, so we'll start slowly and watch tolerance closely.");
  else reasons.push(`We've set a gentle start for ${skinType.toLowerCase()} skin.`);
  return { product, reasons };
}

export interface Milestone {
  id: string;
  label: string;
  title: string;
  startDay: number;
  endDay: number;
  body: string;
  action: string;
}
export const MILESTONES: Milestone[] = [
  { id: "m0", label: "DAY 01", title: "Start", startDay: 1, endDay: 1, body: "Understand your product and establish a consistent routine.", action: "Read your product guide" },
  { id: "m1", label: "WEEK 1", title: "Build your routine", startDay: 2, endDay: 10, body: "Learn how to use your products correctly.", action: "Complete your daily checklist" },
  { id: "m2", label: "WEEK 3–4", title: "Early observations", startDay: 11, endDay: 31, body: "Record changes in skin condition and tolerance.", action: "Do your Day-21 check-in" },
  { id: "m3", label: "WEEK 6–8", title: "Progress review", startDay: 32, endDay: 60, body: "Review consistency and any changes noticed.", action: "Compare your photos" },
  { id: "m4", label: "AROUND 3 MONTHS", title: "Journey review", startDay: 61, endDay: 100, body: "Evaluate the journey and decide the next appropriate step.", action: "Review with a professional" },
];

export function currentMilestoneIndex(day: number) {
  const i = MILESTONES.findIndex((m) => day >= m.startDay && day <= m.endDay);
  return i === -1 ? MILESTONES.length - 1 : i;
}

export const COMBINATION_GUIDANCE = [
  { title: "Cleanser + moisturiser", note: "A cleanser followed by a moisturiser is a common, gentle pairing.", status: "Demo — pending medical review" },
  { title: "Two actives together", note: "We do not offer a verified answer on stacking strong actives. Please ask a professional before combining.", status: "Needs expert input" },
  { title: "Sunscreen in the morning", note: "Daytime sun protection is generally advised when using exfoliating ingredients. Confirm with your doctor.", status: "Demo — pending medical review" },
];
