# IncentIQ

A premium enterprise SaaS marketing site for **IncentIQ** — an AI-First Sales
Incentive Compensation Management (ICM) platform built natively on ServiceNow.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion**.

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → http://localhost:3000

# 3. Production build
npm run build
npm start
```

Requires Node.js 18.17+ (Node 20+ recommended).

---

## Design system

| Token | Value | Usage |
|-------|-------|-------|
| `canvas` | `#F5F7F6` | Primary background |
| `surface` | `#EEF1F0` | Secondary background |
| `ink` | `#111827` | Primary text |
| `accent` | `#234B5A` | Primary accent (slate-teal) |
| `accent.light` | `#DDE7EA` | Accent wash |
| `accent.deep` | `#173640` | Dark accent sections |

- **Display type:** Plus Jakarta Sans
- **Body type:** Inter
- Both loaded via `next/font/google` (self-hosted, no layout shift).

All visuals — dashboard previews, the platform architecture diagram, the AI
assistant mockup, and the line-icon set — are hand-built in SVG/HTML. There are
no stock photos and no emoji anywhere in the project.

---

## Project structure

```
app/
  layout.tsx          Root layout, fonts, metadata
  page.tsx            Section composition
  globals.css         Tailwind layers + base styles
components/
  sections/           Navbar, Hero, Problem, Product, Capabilities,
                      WhyServiceNow, AIIntelligence, Benefits, FinalCTA, Footer
  visuals/            DashboardMockup, HeroVisual, ArchitectureDiagram,
                      AssistantMockup
  ui/                 icons.tsx, Reveal.tsx, Primitives.tsx
tailwind.config.ts    Design tokens, animations
```

---

## Page sections

1. **Hero** — headline, CTAs, live trust stats, animated dashboard visual
2. **Problem** — enterprise stat cards + key challenges
3. **Meet IncentIQ** — product pillars + dashboard preview
4. **Core capabilities** — 8-card grid
5. **Built on ServiceNow** — architecture diagram + 6 platform pillars
6. **AI-first intelligence** — 6 AI capabilities + assistant mockup
7. **Enterprise benefits** — 6 outcome-focused benefits
8. **Final CTA** — demo request

Accessibility: keyboard-visible focus states, `prefers-reduced-motion`
respected, semantic landmarks, and responsive down to mobile.
