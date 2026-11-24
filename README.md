# BODYWISE — Results Journey

A personalised skincare companion built for the **Mosaic Wellness Fellowship** from five Be Bodywise customer interviews.

## The problem (from the interviews)
5/5 customers waited longer than expected for results; 4/5 felt price and results didn't fully match; 3/5 saw a gap between ads and reality; 3/5 were left with marks, blackheads or pigmentation. After purchase, nobody told them how to use the product, what to expect, how long it takes, what can be combined, or what to do if nothing changes.

## The solution
**Results Journey** walks the customer through six stages — Discover → Match → Understand → Follow → Track → Improve — across 9 screens:
Landing, Onboarding, Journey timeline, Routine + daily checklist, Progress tracker (ratings, charts, private photos), Product insights, Smart check-ins, Professional guidance, Dashboard.

## Try it
Open the app and click **Try Interactive Demo** (no sign-up). It loads "Alex" (Day 21, combination skin, body acne + marks, Be Bodywise Body Wash) with synthetic history. Or run the 6-step onboarding for your own journey.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```
Node 20+ required. **No environment variables are needed.**

## Design
Baby-pink + white luxury skincare theme. Palette lives in `src/app/globals.css` (`@theme`): pink `#F4C6D4`, blush `#F9E3EA`, petal `#FFF5F7`, rose `#E8A5BA`, deep rose `#C87996`, ink `#33272C`. Two AA-tuned shades are used for small text/buttons: `rose-cta #AD5878` (white text) and `muted #766570`. Warning (amber) and safety (red) states are deliberately not pink.

## Stack
Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Recharts · Lucide · self-hosted DM Sans + Playfair Display (`@fontsource`).

## Architecture
```
src/app/            routes (/, /onboarding, /journey, /routine, /progress, /products, /check-in, /guidance, /dashboard, /signin)
src/components/     ui/ (Button, Card, Ring, Toast, Skeleton…), layout/ (AppShell, MarketingNav)
src/lib/data.ts     products, concerns, milestones — configurable content
src/lib/logic.ts    check-in rules engine, consistency maths
src/lib/store.tsx   React context + localStorage persistence
src/lib/demo.ts     synthetic "Alex" journey
```
Milestone timings and check-in rules live in `data.ts` / `logic.ts` so the brand's medical team can configure and validate them.

## Safety & honesty guardrails
- Timeline checkpoints are **illustrative**, taken from interviews — not clinical timelines.
- Only ingredient info found in the interviews or product names is shown, each with its source. Everything else is labelled "Demo content · pending medical review".
- No diagnosis (PCOS, hormonal, skin disease). Severe irritation → "stop and seek professional advice"; no further automated suggestions.
- Photos are never used to claim improvement.
- No real interviewee names or contact details appear anywhere.

## Data & privacy
Everything is stored in the browser's `localStorage` (key `bodywise.v1`). Photos are compressed to ~720px and stored there too, so they never leave the device — but browser storage is limited (~5 MB) and clears with site data. Production would use authenticated accounts, PostgreSQL + Prisma, and private encrypted object storage (e.g. signed-URL S3) for photos, plus a real clinician consultation integration.

## Deploy (Vercel)
1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project → Import** the repo. Framework preset: Next.js. No env vars. Deploy.
   Or from the CLI: `npx vercel --prod`.
