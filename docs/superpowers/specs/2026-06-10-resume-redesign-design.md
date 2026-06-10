# Resume Redesign — Design Spec

**Date**: 2026-06-10
**Goal**: Replace `public/resume.pdf` with a completely new resume — new content, new design — built as maintainable HTML/CSS in this repo and exported to PDF.

## Purpose & Positioning

- Primary purpose: **job switch** — applying to SDE roles at product companies. Must be ATS-parseable and recruiter-scannable.
- Positioning: **backend-leaning full-stack** — Python/Java backend depth (FastAPI, Spring Boot, REST APIs, microservices) leads; React/Next.js frontend is a secondary strength; DevOps (Docker, CI/CD, VPS operations) supports the story.
- One A4 page, English, no photo.

## Content

Source of truth: `lib/data.ts` (portfolio content, corrected Feb 2026) + Academic Suite project details from `/Users/viswa-17217/WorkSpace/GitHub/exam_controller` + old `public/resume.pdf` for the Marksheet project entry. All awkward phrasing from the old PDF ("with your help", "Dived into") is rewritten as crisp action bullets.

### Header
- Name: Viswanathan T J
- Title: Software Engineer
- Contact: +91 95970 10099 · viswanathantj@gmail.com · viswa2k.in · github.com/viswanathanTJ · linkedin.com/in/viswanathanTJ · Chennai, India

### Summary (2–3 lines)
Backend-leaning full-stack engineer, ~3 years at Zoho. Python/Java, FastAPI/Spring Boot, REST APIs and microservices, React/Next.js. Ships and operates production systems end to end (Docker, CI/CD, self-hosted VPS).

### Experience (main column)
1. **Software Development Engineer — Zoho Corporation, Chennai** (06/2023 – Present), 4 bullets:
   - CLI-based automated server configuration/deployment tool (Python + Shell)
   - ~40% faster developer cycles by streamlining environment setup, code changes, and testing loops
   - Backend components for a shared API gateway integrating 10+ external systems, standardizing CRUD operations
   - Real-time data synchronization across interconnected services, improving data accuracy and removing manual intervention
2. **Software Development Engineer — Intern, Zoho Corporation** (02/2021 – 06/2023), 2–3 bullets:
   - Full-stack project management tool used by 200+ internal users (backend APIs + UI components)
   - 30+ production issues identified and fixed
   - Integration workflow automation cutting integration time

### Projects (main column)
1. **Academic Suite — Exam Controller** (featured, 4 bullets) — FastAPI · React/TypeScript · PostgreSQL · Redis · Docker:
   - Full-stack platform automating marksheet, hall-ticket, and department-report generation for PG/UG/Diploma programs; pixel-accurate PDFs from Jinja2 templates via wkhtmltopdf (A4/Legal/A5, up to 6 semesters)
   - Unified grading engine for three academic systems using Strategy + Factory pattern
   - Two role-aware React frontends on one FastAPI backend: staff portal (cookie sessions, granular RBAC, department/subject-level access, time-windowed marks entry) and student self-service portal (tab-scoped JWT, AES-GCM-encrypted session storage)
   - Typed SQLAlchemy 2.0 ORM + repository pattern on PostgreSQL; Dockerized; self-deployed and operated on a VPS (backups, monitoring)
2. **Marksheet Management System** (07/2021 – 10/2021) — compact 1–2 lines: Flask + Bootstrap web app for marksheet generation; the original version Academic Suite later grew out of (worded as evolution, not duplication)
3. **Password Manager — Web & Desktop** (09/2020 – 12/2020) — compact 1–2 lines: Python; PyQt5 desktop + Flask web; MongoDB/Firebase

### Sidebar
- **Skills** — 6 categories from portfolio `skillsData`: Programming, Backend, Frontend, Data & Automation, Cloud & DevOps, Databases
- **Education** — MCA, Kongu Engineering College (10/2021 – 04/2023); B.Sc Computer Science, Thiagarajar College (04/2018 – 05/2021)
- **Certificates** — RHCSA EX200 (ID: 210-048-773, 2021); AI Agents Intensive Course, Google (2024)
- **Languages** — Tamil, English
- **Dropped**: hackathon/IOT/chess participation entries (dilute a 3-year-experience SDE resume)

## Visual Design

Two layout variants are built in parallel; the user picks the winner from rendered PDFs.

- **Layout A — two-column sidebar**: left rail (~32%) with indigo-tinted background holding Skills/Education/Certificates/Languages; main column with Experience and Projects. Underlying DOM order stays logical (header → experience → projects → skills → education) for ATS parsers; columns are arranged with CSS.
- **Layout C — hybrid skills band**: single column; summary → compact categorized skills band → experience → projects → two-column education/certificates footer.

**Style (both variants)**: indigo accent matched to viswa2k.in branding — indigo-600 (#4f46e5) section headings and header rule, light indigo-tinted sidebar/band (#f4f5fb), indigo-100 skill chips, Inter typeface (Google Fonts, system-sans fallback), ~9.5–10pt body, white background.

## Technical Build

```
resume/
  resume-a.html     # Layout A — two-column sidebar
  resume-c.html     # Layout C — hybrid skills band
  resume.css        # shared: indigo theme, print rules, typography
  generate.sh       # renders both PDFs via headless Chrome
```

- `resume/` sits at repo root, outside the Next.js build.
- `generate.sh` uses locally installed Chrome (`--headless --print-to-pdf`); no new npm dependencies.
- Outputs `resume/resume-a.pdf` and `resume/resume-c.pdf`; the chosen winner is copied to `public/resume.pdf` so the portfolio download link is unchanged.
- Print rules: `@page { size: A4; margin: 0 }`, internal padding, sidebar tint bleeds edge-to-edge, strict one-page budget; script warns if output exceeds 1 page.

## ATS Safety

- Semantic HTML (`h1`/`h2`/`ul`), real selectable text, no text rendered as images
- Standard section titles: Experience, Projects, Skills, Education, Certificates
- Logical DOM reading order independent of visual columns

## Verification

1. `generate.sh` runs without error; both PDFs are exactly 1 page
2. `pdftotext` extraction contains: name, phone (+91 95970 10099), email, and all section headings
3. Visual check of both PDFs in the visual companion; user selects winner
4. Winner copied to `public/resume.pdf`; old files (`resume-old.pdf`, `resume.pdf.org`) left untouched

## Out of Scope

- Changes to portfolio pages/components (`lib/data.ts` stays as-is)
- Multiple resume tailorings per job application (single general-purpose version)
- Automated CI regeneration of the PDF
