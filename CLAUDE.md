# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for viswa2k built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS. Single-page app with sections: Intro, About, Projects, Skills, Experience, Contact. Deployed on Vercel with Google Analytics and Tidio chat integration.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server (Next.js)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint (next lint)
```

Requires Node.js 22 (see `.nvmrc` and `engines` in package.json).

## Architecture

### App Structure (Next.js App Router)
- **`app/`** — Single route: `layout.tsx` (providers, analytics, theme) + `page.tsx` (composes all sections)
- **`components/`** — Section components (`intro.tsx`, `about.tsx`, `projects.tsx`, `skills.tsx`, `experience.tsx`, `contact.tsx`) and shared UI (`header.tsx`, `footer.tsx`, `theme-switch.tsx`, `ProjectModal.tsx`)
- **`lib/`** — Centralized data and utilities:
  - `data.ts` — All portfolio content (links, experiences, projects, skills) as `const` arrays
  - `types.ts` — `SectionName` type derived from `links` data
  - `hooks.ts` — `useSectionInView` hook (Intersection Observer for active nav highlighting)
  - `utils.ts` — Validation and error helpers
- **`context/`** — React Context providers:
  - `active-section-context.tsx` — Tracks which nav section is active (with click debounce)
  - `theme-context.tsx` — Light/dark theme with localStorage persistence
- **`actions/sendEmail.ts`** — Server Action using Resend API for contact form emails
- **`email/`** — React Email template for contact form notifications

### Key Patterns
- **Content is data-driven**: All portfolio content lives in `lib/data.ts`. To update projects, skills, or experience, edit the arrays there — components render from these arrays automatically.
- **Section tracking**: Each section component uses `useSectionInView()` hook which combines `react-intersection-observer` with `ActiveSectionContext` to highlight the current nav item. Click events set `timeOfLastClick` to temporarily suppress observer updates.
- **Animations**: Framer Motion is used throughout — entry animations, scroll-triggered scaling/opacity, header layout animations (`layoutId="activeSection"`).
- **Dark mode**: Class-based (`darkMode: "class"` in Tailwind config). Toggled via `ThemeContextProvider`, persisted in localStorage, respects `prefers-color-scheme` on first visit.
- **Path alias**: `@/*` maps to project root (e.g., `@/components/header`).
- **Contact form**: Uses Next.js Server Actions (`"use server"`) → Resend API → React Email template. Requires `RESEND_API_KEY` env var.

### External Services
- **Resend** — Email delivery for contact form (needs `RESEND_API_KEY` in `.env.local`)
- **Vercel Analytics** — `@vercel/analytics`
- **Google Analytics** — GA4 via `next/script`
- **Tidio** — Chat widget loaded via external script

## Linting

ESLint extends `next/core-web-vitals`. The `react/no-unescaped-entities` rule is disabled.
