# Resume Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build two complete resume variants (Layout A: two-column sidebar; Layout C: hybrid skills band) as print-optimized HTML/CSS, render them to one-page A4 PDFs via headless Chrome, and ship the user-selected winner as `public/resume.pdf`.

**Architecture:** A standalone `resume/` directory at the repo root (outside the Next.js build) holds two HTML files sharing one stylesheet, plus a shell script that renders PDFs with locally installed Chrome and verifies page count + text extraction. No new npm dependencies.

**Tech Stack:** HTML/CSS (print media), Google Chrome headless (`--print-to-pdf`), `uv run --with pypdf` for PDF verification, Inter via Google Fonts.

**Spec:** `docs/superpowers/specs/2026-06-10-resume-redesign-design.md`

---

## Context for a zero-context engineer

- This repo is the user's portfolio site (Next.js). The resume PDF it serves lives at `public/resume.pdf` — that path must keep working.
- The resume content below is **final approved copy**. Do not rewrite, "improve", or expand it. Bold tags (`<strong>`) mark recruiter-skim keywords and are intentional (max ~3 per bullet).
- Everything must fit **exactly one A4 page** per variant. If a render overflows to 2 pages, shrink spacing variables in `resume.css` (margins/paddings/font-size) — do not cut content without asking.
- Chrome binary (verified to exist): `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- `uv` is installed and on PATH.

---

### Task 1: Shared stylesheet

**Files:**
- Create: `resume/resume.css`

- [ ] **Step 1: Create `resume/resume.css`** with exactly this content:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --indigo: #4f46e5;
  --indigo-deep: #312e81;
  --ink: #1f2430;
  --muted: #5b6472;
  --faint: #8a92a1;
  --rail-bg: #f4f5fb;
  --chip-bg: #e0e7ff;
  --chip-text: #3730a3;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

@page { size: A4; margin: 0; }

body {
  width: 210mm;
  font-family: 'Inter', -apple-system, 'Segoe UI', Arial, sans-serif;
  font-size: 9.3pt;
  line-height: 1.42;
  color: var(--ink);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.page { width: 210mm; height: 297mm; display: flex; flex-direction: column; overflow: hidden; }

/* ---------- Header ---------- */
.page > header {
  padding: 8mm 12mm 4mm;
  border-bottom: 1.2pt solid var(--indigo);
}
h1 { font-size: 21pt; font-weight: 800; letter-spacing: -0.4pt; color: var(--indigo-deep); }
.role { font-size: 10.5pt; font-weight: 600; color: var(--indigo); margin-top: 1pt; }
.contact { margin-top: 2.5pt; font-size: 8.2pt; color: var(--muted); }
.contact .sep { margin: 0 2.5pt; color: var(--faint); }

/* ---------- Shared elements ---------- */
h2 {
  font-size: 8.2pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.4pt;
  color: var(--indigo);
  margin: 0 0 4pt;
}
section { margin-bottom: 7pt; }

.entry { margin-bottom: 5.5pt; }
.entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 6pt; }
.entry-title { font-size: 9.8pt; font-weight: 700; }
.entry-sub { font-size: 8.6pt; color: var(--muted); font-weight: 500; }
.dates { font-size: 8pt; color: var(--faint); font-weight: 600; white-space: nowrap; }
.stack { font-size: 8pt; color: var(--indigo); font-weight: 600; margin-top: 0.5pt; }

ul.bullets { margin: 2.5pt 0 0; padding-left: 10.5pt; }
ul.bullets li { margin-bottom: 2.2pt; }
ul.bullets li::marker { color: var(--indigo); }
strong { font-weight: 700; color: #14161f; }

.summary { color: #2a3140; }

.chip {
  display: inline-block;
  background: var(--chip-bg);
  color: var(--chip-text);
  font-size: 7.8pt;
  font-weight: 500;
  padding: 1pt 5pt;
  border-radius: 3pt;
  margin: 0 2pt 2.5pt 0;
}
.skill-cat {
  font-size: 7.6pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6pt;
  color: var(--muted);
  margin: 4pt 0 2pt;
}

/* ---------- Layout A: two-column sidebar ---------- */
/* DOM order is main-then-rail (ATS reading order); flex `order` puts the rail on the left visually. */
.layout-a .columns { display: flex; flex: 1; min-height: 0; }
.layout-a .main { order: 2; flex: 1; padding: 5.5mm 12mm 8mm 7mm; }
.layout-a .rail { order: 1; width: 62mm; background: var(--rail-bg); padding: 5.5mm 6mm 8mm 12mm; }
.layout-a .rail section { margin-bottom: 9pt; }
.layout-a .rail .entry { margin-bottom: 4.5pt; }
.layout-a .rail .entry-title { font-size: 8.8pt; }
.layout-a .rail .entry-sub { font-size: 7.9pt; }
.layout-a .rail .dates { font-size: 7.6pt; }

/* ---------- Layout C: hybrid skills band ---------- */
.layout-c main { flex: 1; padding: 5.5mm 12mm 8mm; }
.layout-c .skills-band { background: var(--rail-bg); border-radius: 4pt; padding: 5pt 7pt 3.5pt; }
.layout-c .skills-band .row { display: flex; align-items: baseline; margin-bottom: 1.5pt; }
.layout-c .skills-band .skill-cat { width: 30mm; flex-shrink: 0; margin: 0; }
.layout-c .footer-cols { display: flex; gap: 8mm; }
.layout-c .footer-cols > section { flex: 1; margin-bottom: 0; }
```

- [ ] **Step 2: Commit**

```bash
git add resume/resume.css
git commit -m "feat(resume): shared print stylesheet for resume variants"
```

---

### Task 2: Layout A — two-column sidebar

**Files:**
- Create: `resume/resume-a.html`

- [ ] **Step 1: Create `resume/resume-a.html`** with exactly this content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Viswanathan T J — Software Engineer</title>
<link rel="stylesheet" href="resume.css">
</head>
<body class="layout-a">
<div class="page">

  <header>
    <h1>Viswanathan T J</h1>
    <div class="role">Software Engineer</div>
    <div class="contact">
      +91 95970 10099 <span class="sep">·</span>
      viswanathantj@gmail.com <span class="sep">·</span>
      viswa2k.in <span class="sep">·</span>
      github.com/viswanathanTJ <span class="sep">·</span>
      linkedin.com/in/viswanathanTJ <span class="sep">·</span>
      Chennai, India
    </div>
  </header>

  <div class="columns">

    <main class="main">

      <section>
        <h2>Summary</h2>
        <p class="summary">Backend-leaning full-stack engineer with <strong>3+ years at Zoho</strong>, building Python and Java services — <strong>REST APIs, microservices</strong>, and a shared API gateway — with React/Next.js frontends. Ships and operates production systems end to end with <strong>Docker, CI/CD</strong>, and self-hosted infrastructure.</p>
      </section>

      <section>
        <h2>Experience</h2>

        <div class="entry">
          <div class="entry-head">
            <div>
              <div class="entry-title">Software Development Engineer</div>
              <div class="entry-sub">Zoho Corporation · Chennai</div>
            </div>
            <div class="dates">06/2023 – Present</div>
          </div>
          <ul class="bullets">
            <li>Built a CLI-based <strong>server configuration and deployment automation</strong> tool in Python and Shell, simplifying setup and releases for the whole team.</li>
            <li>Cut developer cycle time by <strong>~40%</strong> by streamlining environment setup, code changes, and testing loops.</li>
            <li>Developed backend components for a shared <strong>API gateway</strong> integrating <strong>10+ external systems</strong>, standardizing CRUD operations and reducing maintenance complexity.</li>
            <li>Implemented <strong>real-time data synchronization</strong> across interconnected services, improving data accuracy and eliminating manual intervention.</li>
          </ul>
        </div>

        <div class="entry">
          <div class="entry-head">
            <div>
              <div class="entry-title">Software Development Engineer — Intern</div>
              <div class="entry-sub">Zoho Corporation · Chennai</div>
            </div>
            <div class="dates">02/2021 – 06/2023</div>
          </div>
          <ul class="bullets">
            <li>Co-built a full-stack <strong>project management tool</strong> adopted by <strong>200+ internal users</strong>, developing backend APIs and UI components.</li>
            <li>Diagnosed and fixed <strong>30+ production issues</strong>, strengthening debugging and root-cause analysis skills.</li>
            <li>Automated repetitive integration steps, significantly reducing service <strong>integration time</strong>.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Projects</h2>

        <div class="entry">
          <div class="entry-head">
            <div class="entry-title">Academic Suite — Exam Controller</div>
            <div class="dates">2026</div>
          </div>
          <div class="stack">FastAPI · React/TypeScript · PostgreSQL · Redis · Docker</div>
          <ul class="bullets">
            <li>Built a full-stack platform automating <strong>marksheet, hall-ticket, and report generation</strong> for PG/UG/Diploma programs — pixel-accurate PDFs (A4/Legal/A5) rendered from Jinja2 templates.</li>
            <li>Designed a unified <strong>grading engine</strong> covering three academic systems with <strong>Strategy + Factory</strong> patterns, keeping program rules isolated and extensible.</li>
            <li>Served two role-aware React frontends from one <strong>FastAPI</strong> backend: staff portal with granular <strong>RBAC</strong> and time-windowed marks entry; student portal with tab-scoped <strong>JWT</strong> and AES-GCM-encrypted sessions.</li>
            <li>Modeled the data layer on <strong>PostgreSQL</strong> with typed SQLAlchemy 2.0 and a repository pattern; <strong>Dockerized</strong> and self-deployed on a VPS with backups and monitoring.</li>
          </ul>
        </div>

        <div class="entry">
          <div class="entry-head">
            <div class="entry-title">Marksheet Management System</div>
            <div class="dates">07/2021 – 10/2021</div>
          </div>
          <ul class="bullets">
            <li><strong>Flask</strong> + Bootstrap web app generating student marksheets — the original prototype that later evolved into Academic Suite.</li>
          </ul>
        </div>

        <div class="entry">
          <div class="entry-head">
            <div class="entry-title">Password Manager — Web &amp; Desktop</div>
            <div class="dates">09/2020 – 12/2020</div>
          </div>
          <ul class="bullets">
            <li>Python password manager with <strong>PyQt5</strong> desktop and <strong>Flask</strong> web clients, backed by MongoDB/Firebase.</li>
          </ul>
        </div>
      </section>

    </main>

    <aside class="rail">

      <section>
        <h2>Skills</h2>
        <div class="skill-cat">Programming</div>
        <div><span class="chip">Python</span><span class="chip">Java</span><span class="chip">JavaScript</span><span class="chip">Shell Scripting</span></div>
        <div class="skill-cat">Backend</div>
        <div><span class="chip">FastAPI</span><span class="chip">Flask</span><span class="chip">Django</span><span class="chip">Spring Boot</span><span class="chip">REST APIs</span><span class="chip">Microservices</span></div>
        <div class="skill-cat">Frontend</div>
        <div><span class="chip">React</span><span class="chip">Next.js</span><span class="chip">HTML</span><span class="chip">CSS</span></div>
        <div class="skill-cat">Data &amp; Automation</div>
        <div><span class="chip">NumPy</span><span class="chip">Pandas</span><span class="chip">Automation Scripts</span></div>
        <div class="skill-cat">Cloud &amp; DevOps</div>
        <div><span class="chip">Docker</span><span class="chip">Kubernetes</span><span class="chip">Google Cloud</span><span class="chip">GitHub Actions</span><span class="chip">Linux</span></div>
        <div class="skill-cat">Databases</div>
        <div><span class="chip">PostgreSQL</span><span class="chip">MySQL</span><span class="chip">MongoDB</span><span class="chip">Redis</span></div>
      </section>

      <section>
        <h2>Education</h2>
        <div class="entry">
          <div class="entry-title">MCA — Master of Computer Applications</div>
          <div class="entry-sub">Kongu Engineering College, Erode</div>
          <div class="dates">10/2021 – 04/2023</div>
        </div>
        <div class="entry">
          <div class="entry-title">B.Sc Computer Science</div>
          <div class="entry-sub">Thiagarajar College, Madurai</div>
          <div class="dates">04/2018 – 05/2021</div>
        </div>
      </section>

      <section>
        <h2>Certificates</h2>
        <div class="entry">
          <div class="entry-title">RHCSA — Red Hat Certified System Administrator (EX200)</div>
          <div class="entry-sub">ID: 210-048-773 · 2021</div>
        </div>
        <div class="entry">
          <div class="entry-title">AI Agents Intensive Course</div>
          <div class="entry-sub">Google · 2024</div>
        </div>
      </section>

      <section>
        <h2>Languages</h2>
        <div><span class="chip">Tamil</span><span class="chip">English</span></div>
      </section>

    </aside>

  </div>
</div>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add resume/resume-a.html
git commit -m "feat(resume): layout A — two-column sidebar variant"
```

---

### Task 3: Generation script + verify Layout A

**Files:**
- Create: `resume/generate.sh`
- Modify: `.gitignore` (append `resume/*.pdf`)

- [ ] **Step 1: Create `resume/generate.sh`** with exactly this content:

```bash
#!/usr/bin/env bash
# Renders resume-*.html to PDF via headless Chrome and verifies one-page budget + text layer.
set -euo pipefail
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

for v in a c; do
  src="resume-$v.html"
  out="resume-$v.pdf"
  [ -f "$src" ] || { echo "skip: $src (not found)"; continue; }

  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=10000 \
    --print-to-pdf="$out" "file://$PWD/$src" 2>/dev/null

  uv run --quiet --with pypdf python - "$out" <<'EOF'
import sys
from pypdf import PdfReader
path = sys.argv[1]
r = PdfReader(path)
pages = len(r.pages)
text = r.pages[0].extract_text() or ""
status = "OK" if pages == 1 else f"WARNING: {pages} pages (budget: 1)"
print(f"{path}: {pages} page(s) — {status}")
required = ["Viswanathan", "+91 95970 10099", "viswanathantj@gmail.com",
            "Experience", "Projects", "Skills", "Education", "Certificates"]
missing = [k for k in required if k.lower() not in text.lower()]
print(f"{path}: text layer {'OK' if not missing else 'MISSING: ' + ', '.join(missing)}")
EOF
done
```

- [ ] **Step 2: Make it executable and ignore PDF artifacts**

```bash
chmod +x resume/generate.sh
echo "resume/*.pdf" >> .gitignore
```

- [ ] **Step 3: Run it**

```bash
./resume/generate.sh
```

Expected output:
```
skip: resume-c.html (not found)   ← appears only while Task 4 is not done; A lines below
resume-a.pdf: 1 page(s) — OK
resume-a.pdf: text layer OK
```

If it reports 2 pages: reduce `body` font-size to 9.1pt and/or `.entry` margin-bottom to 4.5pt in `resume.css`, re-run. Do NOT delete content.

- [ ] **Step 4: Commit**

```bash
git add resume/generate.sh .gitignore
git commit -m "feat(resume): headless-Chrome PDF generation with 1-page and text-layer checks"
```

---

### Task 4: Layout C — hybrid skills band

**Files:**
- Create: `resume/resume-c.html`

- [ ] **Step 1: Create `resume/resume-c.html`** with exactly this content. Header, summary text, experience entries, and project entries are **identical copy** to Layout A — only the structure differs (skills band after summary; education/certificates/languages in a two-column footer):

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Viswanathan T J — Software Engineer</title>
<link rel="stylesheet" href="resume.css">
</head>
<body class="layout-c">
<div class="page">

  <header>
    <h1>Viswanathan T J</h1>
    <div class="role">Software Engineer</div>
    <div class="contact">
      +91 95970 10099 <span class="sep">·</span>
      viswanathantj@gmail.com <span class="sep">·</span>
      viswa2k.in <span class="sep">·</span>
      github.com/viswanathanTJ <span class="sep">·</span>
      linkedin.com/in/viswanathanTJ <span class="sep">·</span>
      Chennai, India
    </div>
  </header>

  <main>

    <section>
      <h2>Summary</h2>
      <p class="summary">Backend-leaning full-stack engineer with <strong>3+ years at Zoho</strong>, building Python and Java services — <strong>REST APIs, microservices</strong>, and a shared API gateway — with React/Next.js frontends. Ships and operates production systems end to end with <strong>Docker, CI/CD</strong>, and self-hosted infrastructure.</p>
    </section>

    <section>
      <h2>Skills</h2>
      <div class="skills-band">
        <div class="row"><div class="skill-cat">Programming</div><div><span class="chip">Python</span><span class="chip">Java</span><span class="chip">JavaScript</span><span class="chip">Shell Scripting</span></div></div>
        <div class="row"><div class="skill-cat">Backend</div><div><span class="chip">FastAPI</span><span class="chip">Flask</span><span class="chip">Django</span><span class="chip">Spring Boot</span><span class="chip">REST APIs</span><span class="chip">Microservices</span></div></div>
        <div class="row"><div class="skill-cat">Frontend</div><div><span class="chip">React</span><span class="chip">Next.js</span><span class="chip">HTML</span><span class="chip">CSS</span></div></div>
        <div class="row"><div class="skill-cat">Data &amp; Automation</div><div><span class="chip">NumPy</span><span class="chip">Pandas</span><span class="chip">Automation Scripts</span></div></div>
        <div class="row"><div class="skill-cat">Cloud &amp; DevOps</div><div><span class="chip">Docker</span><span class="chip">Kubernetes</span><span class="chip">Google Cloud</span><span class="chip">GitHub Actions</span><span class="chip">Linux</span></div></div>
        <div class="row"><div class="skill-cat">Databases</div><div><span class="chip">PostgreSQL</span><span class="chip">MySQL</span><span class="chip">MongoDB</span><span class="chip">Redis</span></div></div>
      </div>
    </section>

    <section>
      <h2>Experience</h2>

      <div class="entry">
        <div class="entry-head">
          <div>
            <div class="entry-title">Software Development Engineer</div>
            <div class="entry-sub">Zoho Corporation · Chennai</div>
          </div>
          <div class="dates">06/2023 – Present</div>
        </div>
        <ul class="bullets">
          <li>Built a CLI-based <strong>server configuration and deployment automation</strong> tool in Python and Shell, simplifying setup and releases for the whole team.</li>
          <li>Cut developer cycle time by <strong>~40%</strong> by streamlining environment setup, code changes, and testing loops.</li>
          <li>Developed backend components for a shared <strong>API gateway</strong> integrating <strong>10+ external systems</strong>, standardizing CRUD operations and reducing maintenance complexity.</li>
          <li>Implemented <strong>real-time data synchronization</strong> across interconnected services, improving data accuracy and eliminating manual intervention.</li>
        </ul>
      </div>

      <div class="entry">
        <div class="entry-head">
          <div>
            <div class="entry-title">Software Development Engineer — Intern</div>
            <div class="entry-sub">Zoho Corporation · Chennai</div>
          </div>
          <div class="dates">02/2021 – 06/2023</div>
        </div>
        <ul class="bullets">
          <li>Co-built a full-stack <strong>project management tool</strong> adopted by <strong>200+ internal users</strong>, developing backend APIs and UI components.</li>
          <li>Diagnosed and fixed <strong>30+ production issues</strong>, strengthening debugging and root-cause analysis skills.</li>
          <li>Automated repetitive integration steps, significantly reducing service <strong>integration time</strong>.</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>Projects</h2>

      <div class="entry">
        <div class="entry-head">
          <div class="entry-title">Academic Suite — Exam Controller</div>
          <div class="dates">2026</div>
        </div>
        <div class="stack">FastAPI · React/TypeScript · PostgreSQL · Redis · Docker</div>
        <ul class="bullets">
          <li>Built a full-stack platform automating <strong>marksheet, hall-ticket, and report generation</strong> for PG/UG/Diploma programs — pixel-accurate PDFs (A4/Legal/A5) rendered from Jinja2 templates.</li>
          <li>Designed a unified <strong>grading engine</strong> covering three academic systems with <strong>Strategy + Factory</strong> patterns, keeping program rules isolated and extensible.</li>
          <li>Served two role-aware React frontends from one <strong>FastAPI</strong> backend: staff portal with granular <strong>RBAC</strong> and time-windowed marks entry; student portal with tab-scoped <strong>JWT</strong> and AES-GCM-encrypted sessions.</li>
          <li>Modeled the data layer on <strong>PostgreSQL</strong> with typed SQLAlchemy 2.0 and a repository pattern; <strong>Dockerized</strong> and self-deployed on a VPS with backups and monitoring.</li>
        </ul>
      </div>

      <div class="entry">
        <div class="entry-head">
          <div class="entry-title">Marksheet Management System</div>
          <div class="dates">07/2021 – 10/2021</div>
        </div>
        <ul class="bullets">
          <li><strong>Flask</strong> + Bootstrap web app generating student marksheets — the original prototype that later evolved into Academic Suite.</li>
        </ul>
      </div>

      <div class="entry">
        <div class="entry-head">
          <div class="entry-title">Password Manager — Web &amp; Desktop</div>
          <div class="dates">09/2020 – 12/2020</div>
        </div>
        <ul class="bullets">
          <li>Python password manager with <strong>PyQt5</strong> desktop and <strong>Flask</strong> web clients, backed by MongoDB/Firebase.</li>
        </ul>
      </div>
    </section>

    <div class="footer-cols">
      <section>
        <h2>Education</h2>
        <div class="entry">
          <div class="entry-title">MCA — Master of Computer Applications</div>
          <div class="entry-sub">Kongu Engineering College, Erode · 10/2021 – 04/2023</div>
        </div>
        <div class="entry">
          <div class="entry-title">B.Sc Computer Science</div>
          <div class="entry-sub">Thiagarajar College, Madurai · 04/2018 – 05/2021</div>
        </div>
      </section>
      <section>
        <h2>Certificates &amp; Languages</h2>
        <div class="entry">
          <div class="entry-title">RHCSA — Red Hat Certified System Administrator (EX200)</div>
          <div class="entry-sub">ID: 210-048-773 · 2021</div>
        </div>
        <div class="entry">
          <div class="entry-title">AI Agents Intensive Course</div>
          <div class="entry-sub">Google · 2024</div>
        </div>
        <div><span class="chip">Tamil</span><span class="chip">English</span></div>
      </section>
    </div>

  </main>
</div>
</body>
</html>
```

- [ ] **Step 2: Generate and verify both variants**

```bash
./resume/generate.sh
```

Expected output:
```
resume-a.pdf: 1 page(s) — OK
resume-a.pdf: text layer OK
resume-c.pdf: 1 page(s) — OK
resume-c.pdf: text layer OK
```

Layout C is denser (skills band consumes main-column width). If it overflows to 2 pages, first try `.layout-c main { padding: 5mm 12mm 6mm; }` and `ul.bullets li { margin-bottom: 1.8pt; }` in `resume.css`, then re-run. Do NOT cut content.

- [ ] **Step 3: Commit**

```bash
git add resume/resume-c.html resume/resume.css
git commit -m "feat(resume): layout C — hybrid skills-band variant"
```

(`resume.css` is included in case the overflow fix in Step 2 modified it.)

---

### Task 5: Side-by-side review, pick winner, ship

**Files:**
- Modify: `public/resume.pdf` (replaced with the winning variant)

- [ ] **Step 1: Open both PDFs for the user**

```bash
open resume/resume-a.pdf resume/resume-c.pdf
```

- [ ] **Step 2: USER CHECKPOINT — wait for the user to pick A or C.** Also ask whether they want any tweaks (spacing, colors, wording) before shipping. Iterate on the chosen variant if requested (edit HTML/CSS → re-run `./resume/generate.sh` → reopen).

- [ ] **Step 3: Copy the winner to the portfolio**

```bash
cp resume/resume-<winner>.pdf public/resume.pdf
```

- [ ] **Step 4: Verify the shipped file**

```bash
uv run --quiet --with pypdf python -c "
from pypdf import PdfReader
r = PdfReader('public/resume.pdf')
t = r.pages[0].extract_text()
assert len(r.pages) == 1, 'not one page'
assert '+91 95970 10099' in t and 'Viswanathan' in t, 'text layer broken'
print('public/resume.pdf: 1 page, text layer OK')
"
```

Expected: `public/resume.pdf: 1 page, text layer OK`

- [ ] **Step 5: Commit**

```bash
git add public/resume.pdf
git commit -m "feat: ship redesigned resume PDF"
```

Old files `public/resume-old.pdf` and `public/resume.pdf.org` are intentionally left untouched (per spec).
