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

# context-mode — MANDATORY routing rules

You have context-mode MCP tools available. These rules are NOT optional — they protect your context window from flooding. A single unrouted command can dump 56 KB into context and waste the entire session.

## BLOCKED commands — do NOT attempt these

### curl / wget — BLOCKED
Any Bash command containing `curl` or `wget` is intercepted and replaced with an error message. Do NOT retry.
Instead use:
- `ctx_fetch_and_index(url, source)` to fetch and index web pages
- `ctx_execute(language: "javascript", code: "const r = await fetch(...)")` to run HTTP calls in sandbox

### Inline HTTP — BLOCKED
Any Bash command containing `fetch('http`, `requests.get(`, `requests.post(`, `http.get(`, or `http.request(` is intercepted and replaced with an error message. Do NOT retry with Bash.
Instead use:
- `ctx_execute(language, code)` to run HTTP calls in sandbox — only stdout enters context

### WebFetch — BLOCKED
WebFetch calls are denied entirely. The URL is extracted and you are told to use `ctx_fetch_and_index` instead.
Instead use:
- `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` to query the indexed content

## REDIRECTED tools — use sandbox equivalents

### Bash (>20 lines output)
Bash is ONLY for: `git`, `mkdir`, `rm`, `mv`, `cd`, `ls`, `npm install`, `pip install`, and other short-output commands.
For everything else, use:
- `ctx_batch_execute(commands, queries)` — run multiple commands + search in ONE call
- `ctx_execute(language: "shell", code: "...")` — run in sandbox, only stdout enters context

### Read (for analysis)
If you are reading a file to **Edit** it → Read is correct (Edit needs content in context).
If you are reading to **analyze, explore, or summarize** → use `ctx_execute_file(path, language, code)` instead. Only your printed summary enters context. The raw file content stays in the sandbox.

### Grep (large results)
Grep results can flood context. Use `ctx_execute(language: "shell", code: "grep ...")` to run searches in sandbox. Only your printed summary enters context.

## Tool selection hierarchy

1. **GATHER**: `ctx_batch_execute(commands, queries)` — Primary tool. Runs all commands, auto-indexes output, returns search results. ONE call replaces 30+ individual calls.
2. **FOLLOW-UP**: `ctx_search(queries: ["q1", "q2", ...])` — Query indexed content. Pass ALL questions as array in ONE call.
3. **PROCESSING**: `ctx_execute(language, code)` | `ctx_execute_file(path, language, code)` — Sandbox execution. Only stdout enters context.
4. **WEB**: `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` — Fetch, chunk, index, query. Raw HTML never enters context.
5. **INDEX**: `ctx_index(content, source)` — Store content in FTS5 knowledge base for later search.

## Subagent routing

When spawning subagents (Agent/Task tool), the routing block is automatically injected into their prompt. Bash-type subagents are upgraded to general-purpose so they have access to MCP tools. You do NOT need to manually instruct subagents about context-mode.

## Output constraints

- Keep responses under 500 words.
- Write artifacts (code, configs, PRDs) to FILES — never return them as inline text. Return only: file path + 1-line description.
- When indexing content, use descriptive source labels so others can `ctx_search(source: "label")` later.

## ctx commands

| Command | Action |
|---------|--------|
| `ctx stats` | Call the `ctx_stats` MCP tool and display the full output verbatim |
| `ctx doctor` | Call the `ctx_doctor` MCP tool, run the returned shell command, display as checklist |
| `ctx upgrade` | Call the `ctx_upgrade` MCP tool, run the returned shell command, display as checklist |
