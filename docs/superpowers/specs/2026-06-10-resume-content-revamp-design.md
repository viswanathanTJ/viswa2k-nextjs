# Resume & Portfolio Content Revamp — Design

**Date:** 2026-06-10
**Status:** Approved copy, pending implementation

## Goal

Make the resume and portfolio content stronger for job applications: quantify every
experience bullet, correct stale/inaccurate claims, restructure the two older projects
to match the Academic Suite format, and unify the skills list (adding Git, Postman,
and security keywords) so the resume and portfolio stop drifting.

Positioning: **broad Software Engineer** (not backend-leaning). Experience stated as
**3+ years as SDE** (full-time only).

## Approach

Parallel rewrite with copy drafted once (Approach A): all final copy lives in this
spec, approved verbatim by the user. Implementation applies the same text to
`resume/resume-c.html` and the portfolio (`lib/data.ts`, `components/about.tsx`,
`components/intro.tsx`), then regenerates PDFs.

Constraints:
- **No fabricated metrics.** Every number below was supplied by the user. Notably, no
  invented requests/day figure for the API gateway — scope ("all Zoho Projects
  integrations") is used instead.
- `resume-a.html` is left untouched (unused layout, kept as-is by user choice).
- Web PDF (`resume-c-web.pdf`) must exclude the phone number (existing privacy policy
  in `generate.sh`).

## Final copy

### Resume Summary (2 lines)

> **Software Engineer** with **3+ years at Zoho**, building production systems in
> **Python and Java** — **REST APIs, microservices**, a shared **API gateway**, and
> **Kafka**-based cross-service data sync — with **React/Next.js** frontends. Ships
> software end to end: design, development, **Docker, CI/CD**, and self-hosted
> operations.

### Portfolio Intro headline

> Hello, I'm Viswanathan. I'm a **Software Engineer** with **3+ years at Zoho**.
> I build **REST APIs & microservices**, automate workflows with Python & Shell, and
> ship *reliable software* end to end.

(Only change: remove "backend systems —" narrowing; existing bold/italic spans kept.)

### Portfolio About — paragraph 1 (paragraphs 2–3 unchanged)

> I am a **Software Engineer at Zoho Corporation** with 3+ years of full-time
> experience (5+ including my internship) across the full software lifecycle — from
> **backend APIs and CLI automation tools** to large-scale **distributed systems**
> and **API gateways**.

### Skills (identical on resume and portfolio)

| Category | Skills |
|---|---|
| Programming | Python, Java, JavaScript, TypeScript, Shell Scripting |
| Backend | FastAPI, Flask, Django, Spring Boot, REST APIs, Microservices, Kafka, SQLAlchemy |
| Frontend | React, Next.js, HTML, CSS |
| Databases | PostgreSQL, MySQL, MongoDB, Redis, SQLite, Firebase |
| Cloud & DevOps | Docker, Kubernetes, Google Cloud, GitHub Actions, CI/CD, Linux |
| Tools & Security | Git, Postman, JWT, RBAC, Cryptography |

Decisions:
- **Data & Automation category dropped** (NumPy/Pandas/Automation Scripts) — weak
  chips for a broad SE resume; Pandas keeps context in the Marksheet project tags.
- TypeScript moved Frontend → Programming and now appears on the resume.
- "Cryptography" chosen over "Fernet" as the chip (broader ATS term); Fernet stays in
  the Password Manager bullet.
- Net row count on resume unchanged (6 rows).

### Experience — Software Development Engineer, Zoho Corporation · 06/2023 – Present

1. Built a CLI-based **server configuration and deployment automation** tool in
   **Python and Shell**, adopted by the **entire Zoho Projects engineering team** for
   setup and releases.
2. Cut developer cycle time by **~40%** by streamlining environment setup, code
   changes, and testing loops.
3. Developed backend components for a shared **API gateway** powering
   **install/uninstall for all Zoho Projects integrations** (10+ external systems) —
   new integrations are **config-driven**, eliminating **~40% of duplicated
   integration code**.
4. Consolidated **real-time data synchronization** from **5+ services** into a single
   **Kafka + scheduler**-based design, cutting cross-service sync latency **from
   minutes to seconds** — now the standard pattern for new services.

### Experience — SDE Intern, Zoho Corporation · 02/2021 – 06/2023

1. Independently built a full-stack **project management tool** — **backend APIs and
   UI** — adopted by **200+ internal users**.
2. Resolved **30+ production issues** in a live product and collaborated on
   **new-feature analysis** with the core team.
3. Drove the team's **Eclipse → IntelliJ migration** by reimplementing slow
   IDE-plugin workflows as **Python/Shell scripts** with fully automated
   configuration.

### Projects

**Academic Suite — Exam Controller (2026): unchanged** on both surfaces.

**Marksheet Management System · 07/2021 – 10/2021**
Stack line: *Flask · Bootstrap · MySQL · Pandas*

1. Built a **Flask** web app that reads student marks from **Excel sheets** and
   processes them with **Pandas** into print-ready **marksheets, hall tickets, and
   department copies**.
2. Delivered as a **fully offline, single-machine** system per the institution's
   requirement — a stable build still running in production today — later evolved
   into **Academic Suite**, a separate web app accessible from anywhere.

Removals: the "5 years in production" claim and all **email-delivery** mentions
(including portfolio modal points) — neither is accurate.

**Password Manager — Web & Desktop · 09/2020 – 12/2020**
Stack line: *Flask · Bootstrap · PyQt5 · SQLite · MongoDB · Firebase*

1. Built a password manager with **Flask + Bootstrap** (web) and **PyQt5** (desktop)
   clients, securing credentials with **Fernet symmetric encryption** (Python
   `cryptography`) and **hash-based login verification**.
2. First end-to-end project — implemented persistence across **SQLite, MongoDB, and
   Firebase**, learning **CRUD design, encryption, and cross-platform GUI**
   development.

Removals: the "200% safer encryption" claim (replaced with accurate Fernet wording).

### Portfolio-specific notes (`lib/data.ts`)

- `experiencesData`: SDE and Intern bullet arrays replaced with the copy above; other
  entries (courses, education, hackathon, RHCSA) unchanged.
- `projectsData`: descriptions, tags, and modal points updated to match the facts
  above. Portfolio keeps longer modal point lists, trimmed of fluff ("200% safer",
  "5 years", email delivery). Tags gain Bootstrap (both projects) and SQLite
  (Password Manager). The portfolio currently splits Password Manager into Web and
  Desktop cards — both stay, with corrected copy.
- `skillsData`: replaced with the 6-category table above.

## Files touched

1. `resume/resume-c.html` — summary, skills band, experience bullets, two project
   entries.
2. `resume/generate.sh` run — regenerates `resume-c.pdf` (with phone) and
   `resume-c-web.pdf` (phone-free).
3. `lib/data.ts` — `skillsData`, `experiencesData`, `projectsData`.
4. `components/about.tsx` — paragraph 1. `components/intro.tsx` — headline tweak.

## Verification

- `npm run build` and `npm run lint` pass.
- Regenerated PDF visually checked for **one-page fit**. The resume grows ~4 lines
  (projects gain stack lines + bullets). If it overflows, trim candidates are
  Academic Suite bullet 4 or Marksheet bullet 2 — flag to user before cutting.
- Grep check: no remaining instances of "200%", "5 years in production",
  "backend-leaning", "email delivery" (Marksheet context), or "Automation Scripts".
- Web PDF contains no phone number.
