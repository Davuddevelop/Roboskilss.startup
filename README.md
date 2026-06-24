# Roboskills

**Teach any robot a new skill.** Roboskills is the web platform for a physical-AI
startup: pick a robot, choose a behavior, click train, and get back a deployable
reinforcement-learning policy. The heavy RL (MuJoCo + Stable-Baselines3 PPO) runs
in a separate engine; this repo is the **platform** — marketing site, accounts,
dashboard, job creation/monitoring, results, downloads, and billing.

First supported robot: the **Petoi Bittle** quadruped.

## Demo mode (the important part)

The platform ships **demo mode first**. A seeded "Bittle — walk forward" job
serves a real reward curve, a real walking video, and a downloadable policy from
pre-computed data — independent of whether live cloud training is wired up. The
whole flow is clickable end-to-end. Live training is added later behind the same
`submitJob()` interface, gated by `NEXT_PUBLIC_LIVE_TRAINING`.

## Tech stack

- **Next.js (App Router)** + **TypeScript (strict)**
- **Tailwind CSS v4** + a token-driven design system (`src/app/globals.css`, `src/lib/design-tokens.ts`)
- **Supabase** — Postgres, Auth, Storage (policy files + videos)
- **Stripe** — billing (stubbed in MVP)
- **Vercel** — deploy target

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in values as phases require them
npm run dev                  # http://localhost:3000
```

Phase 1 (landing) runs with no external services. Supabase keys are needed from
Phase 2 (auth/dashboard) onward.

### Database

Run `supabase/schema.sql` in the Supabase SQL editor (tables `robots`,
`training_jobs`, `policies`, all with row-level security so users only see their
own rows). Without keys, set `NEXT_PUBLIC_PREVIEW_UI=true` to review the
authenticated UI with fixture data.

### Demo seed data

Demo mode is self-contained. The seeded "Bittle — walk forward" run lives at
`/jobs/demo-bittle-walk-forward` and is always resolvable (no DB needed). Its
assets are in `public/seed/` (reward curve, evaluation video + poster, policy
file). To also insert a per-user demo row into Supabase:

```bash
set -a; . .env.local; set +a      # load Supabase env
npm run seed -- you@company.com   # user must have signed up first
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, **New Project → import the repo** (framework auto-detected as Next.js).
3. Add the environment variables from `.env.example` in **Project → Settings → Environment Variables**.
4. Deploy. Set `NEXT_PUBLIC_SITE_URL` to the production URL.

## Project structure

```
src/
  app/                 # routes (App Router)
  components/
    site/              # marketing + layout (nav, footer, hero, sections)
    ui/                # design-system primitives (button, container, badge)
  lib/                 # utils, design tokens
```

## Build status by phase

- [x] **Phase 1** — Scaffold, design tokens, landing page
- [x] **Phase 2** — Auth + dashboard shell
- [x] **Phase 3** — Data model + Bittle preset + create-a-job flow
- [x] **Phase 4** — Demo mode + `/jobs/[id]` (reward curve, video, download)
- [ ] **Phase 5** — Polish (pricing, docs, states, OG image)
- [ ] **Phase 6** — Live worker path (queue + Python engine), feature-flagged
