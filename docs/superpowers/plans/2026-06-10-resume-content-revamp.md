# Resume & Portfolio Content Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved copy from `docs/superpowers/specs/2026-06-10-resume-content-revamp-design.md` to the resume (`resume/resume-c.html` + regenerated PDFs) and the portfolio (`lib/data.ts`, `components/about.tsx`, `components/intro.tsx`).

**Architecture:** Pure content changes — no structural/code refactoring. The spec contains the approved copy verbatim; this plan translates it into exact HTML/TSX edits. Resume PDFs are regenerated and auto-verified by `resume/generate.sh` (one-page budget, text layer, phone-free web copy).

**Tech Stack:** Static HTML/CSS resume rendered via headless Chrome; Next.js 16 / React 19 / TypeScript portfolio.

**Constraints:**
- `resume/resume-a.html` must NOT be touched (user decision). `generate.sh` re-rendering `resume-a.pdf` from it is fine — content unchanged.
- No metrics beyond those in the spec — every number is user-supplied.
- All forbidden phrases must be gone afterward: "200%", "5 years in production", "backend-leaning", email-delivery claims for Marksheet, "Automation Scripts".

---

### Task 1: Resume summary (`resume/resume-c.html`)

**Files:**
- Modify: `resume/resume-c.html:33`

- [ ] **Step 1: Replace the summary paragraph**

Old:

```html
      <p class="summary">Backend-leaning full-stack engineer with <strong>3+ years at Zoho</strong>, building Python and Java services — <strong>REST APIs, microservices</strong>, and a shared API gateway — with React/Next.js frontends. Ships and operates production systems end to end with <strong>Docker, CI/CD</strong>, and self-hosted infrastructure.</p>
```

New:

```html
      <p class="summary"><strong>Software Engineer</strong> with <strong>3+ years at Zoho</strong>, building production systems in Python and Java — <strong>REST APIs, microservices</strong>, a shared <strong>API gateway</strong>, and <strong>Kafka</strong>-based cross-service data sync — with React/Next.js frontends. Ships software end to end: design, development, <strong>Docker, CI/CD</strong>, and self-hosted operations.</p>
```

- [ ] **Step 2: Commit**

```bash
git add resume/resume-c.html
git commit -m "feat(resume): rewrite summary — broad SE positioning, Kafka sync"
```

---

### Task 2: Resume skills band (`resume/resume-c.html`)

**Files:**
- Modify: `resume/resume-c.html:38-45` (the six `.row` divs inside `.skills-band`)

- [ ] **Step 1: Replace all six skill rows**

Old (entire block inside `<div class="skills-band">`):

```html
        <div class="row"><div class="skill-cat">Programming</div><div><span class="chip">Python</span><span class="chip">Java</span><span class="chip">JavaScript</span><span class="chip">Shell Scripting</span></div></div>
        <div class="row"><div class="skill-cat">Backend</div><div><span class="chip">FastAPI</span><span class="chip">Flask</span><span class="chip">Django</span><span class="chip">Spring Boot</span><span class="chip">REST APIs</span><span class="chip">Microservices</span></div></div>
        <div class="row"><div class="skill-cat">Frontend</div><div><span class="chip">React</span><span class="chip">Next.js</span><span class="chip">HTML</span><span class="chip">CSS</span></div></div>
        <div class="row"><div class="skill-cat">Data &amp; Automation</div><div><span class="chip">NumPy</span><span class="chip">Pandas</span><span class="chip">Automation Scripts</span></div></div>
        <div class="row"><div class="skill-cat">Cloud &amp; DevOps</div><div><span class="chip">Docker</span><span class="chip">Kubernetes</span><span class="chip">Google Cloud</span><span class="chip">GitHub Actions</span><span class="chip">Linux</span></div></div>
        <div class="row"><div class="skill-cat">Databases</div><div><span class="chip">PostgreSQL</span><span class="chip">MySQL</span><span class="chip">MongoDB</span><span class="chip">Redis</span></div></div>
```

New:

```html
        <div class="row"><div class="skill-cat">Programming</div><div><span class="chip">Python</span><span class="chip">Java</span><span class="chip">JavaScript</span><span class="chip">TypeScript</span><span class="chip">Shell Scripting</span></div></div>
        <div class="row"><div class="skill-cat">Backend</div><div><span class="chip">FastAPI</span><span class="chip">Flask</span><span class="chip">Django</span><span class="chip">Spring Boot</span><span class="chip">REST APIs</span><span class="chip">Microservices</span><span class="chip">Kafka</span><span class="chip">SQLAlchemy</span></div></div>
        <div class="row"><div class="skill-cat">Frontend</div><div><span class="chip">React</span><span class="chip">Next.js</span><span class="chip">HTML</span><span class="chip">CSS</span></div></div>
        <div class="row"><div class="skill-cat">Databases</div><div><span class="chip">PostgreSQL</span><span class="chip">MySQL</span><span class="chip">MongoDB</span><span class="chip">Redis</span><span class="chip">SQLite</span><span class="chip">Firebase</span></div></div>
        <div class="row"><div class="skill-cat">Cloud &amp; DevOps</div><div><span class="chip">Docker</span><span class="chip">Kubernetes</span><span class="chip">Google Cloud</span><span class="chip">GitHub Actions</span><span class="chip">CI/CD</span><span class="chip">Linux</span></div></div>
        <div class="row"><div class="skill-cat">Tools &amp; Security</div><div><span class="chip">Git</span><span class="chip">Postman</span><span class="chip">JWT</span><span class="chip">RBAC</span><span class="chip">Cryptography</span></div></div>
```

Notes: Data & Automation row removed; Databases moved up to keep related rows adjacent; row count stays 6.

- [ ] **Step 2: Commit**

```bash
git add resume/resume-c.html
git commit -m "feat(resume): unify skills — add Git/Postman/security row, drop Data & Automation"
```

---

### Task 3: Resume experience bullets (`resume/resume-c.html`)

**Files:**
- Modify: `resume/resume-c.html:59-64` (SDE bullets), `resume/resume-c.html:75-79` (intern bullets)

- [ ] **Step 1: Replace the SDE bullet list**

Old:

```html
        <ul class="bullets">
          <li>Built a CLI-based <strong>server configuration and deployment automation</strong> tool in Python and Shell, simplifying setup and releases for the whole team.</li>
          <li>Cut developer cycle time by <strong>~40%</strong> by streamlining environment setup, code changes, and testing loops.</li>
          <li>Developed backend components for a shared <strong>API gateway</strong> integrating <strong>10+ external systems</strong>, standardizing CRUD operations and reducing maintenance complexity.</li>
          <li>Implemented <strong>real-time data synchronization</strong> across interconnected services, improving data accuracy and eliminating manual intervention.</li>
        </ul>
```

New:

```html
        <ul class="bullets">
          <li>Built a CLI-based <strong>server configuration and deployment automation</strong> tool in <strong>Python and Shell</strong>, adopted by the <strong>entire Zoho Projects engineering team</strong> for setup and releases.</li>
          <li>Cut developer cycle time by <strong>~40%</strong> by streamlining environment setup, code changes, and testing loops.</li>
          <li>Developed backend components for a shared <strong>API gateway</strong> powering <strong>install/uninstall for all Zoho Projects integrations</strong> (10+ external systems) — new integrations are <strong>config-driven</strong>, eliminating <strong>~40% of duplicated integration code</strong>.</li>
          <li>Consolidated <strong>real-time data synchronization</strong> from <strong>5+ services</strong> into a single <strong>Kafka + scheduler</strong>-based design, cutting cross-service sync latency <strong>from minutes to seconds</strong> — now the standard pattern for new services.</li>
        </ul>
```

- [ ] **Step 2: Replace the intern bullet list**

Old:

```html
        <ul class="bullets">
          <li>Co-built a full-stack <strong>project management tool</strong> adopted by <strong>200+ internal users</strong>, developing backend APIs and UI components.</li>
          <li>Diagnosed and fixed <strong>30+ production issues</strong>, strengthening debugging and root-cause analysis skills.</li>
          <li>Automated repetitive integration steps, significantly reducing service <strong>integration time</strong>.</li>
        </ul>
```

New:

```html
        <ul class="bullets">
          <li>Independently built a full-stack <strong>project management tool</strong> — <strong>backend APIs and UI</strong> — adopted by <strong>200+ internal users</strong>.</li>
          <li>Resolved <strong>30+ production issues</strong> in a live product and collaborated on <strong>new-feature analysis</strong> with the core team.</li>
          <li>Drove the team's <strong>Eclipse → IntelliJ migration</strong> by reimplementing slow IDE-plugin workflows as <strong>Python/Shell scripts</strong> with fully automated configuration.</li>
        </ul>
```

- [ ] **Step 3: Commit**

```bash
git add resume/resume-c.html
git commit -m "feat(resume): quantified experience bullets — gateway scope, sync latency, IDE migration"
```

---

### Task 4: Resume project entries (`resume/resume-c.html`)

**Files:**
- Modify: `resume/resume-c.html:100-118` (Marksheet + Password Manager entries)

- [ ] **Step 1: Replace the Marksheet Management System entry**

Old:

```html
      <div class="entry">
        <div class="entry-head">
          <div class="entry-title">Marksheet Management System</div>
          <div class="dates">07/2021 – 10/2021</div>
        </div>
        <ul class="bullets">
          <li><strong>Flask</strong> + Bootstrap web app generating student marksheets — in <strong>production use for 5 years</strong> at the institution before being rebuilt as Academic Suite.</li>
        </ul>
      </div>
```

New:

```html
      <div class="entry">
        <div class="entry-head">
          <div class="entry-title">Marksheet Management System</div>
          <div class="dates">07/2021 – 10/2021</div>
        </div>
        <div class="stack">Flask · Bootstrap · MySQL · Pandas</div>
        <ul class="bullets">
          <li>Built a <strong>Flask</strong> web app that reads student marks from <strong>Excel sheets</strong> and processes them with <strong>Pandas</strong> into print-ready <strong>marksheets, hall tickets, and department copies</strong>.</li>
          <li>Delivered as a <strong>fully offline, single-machine</strong> system per the institution's requirement — a stable build still running in production today — later evolved into <strong>Academic Suite</strong>, a separate web app accessible from anywhere.</li>
        </ul>
      </div>
```

- [ ] **Step 2: Replace the Password Manager entry**

Old:

```html
      <div class="entry">
        <div class="entry-head">
          <div class="entry-title">Password Manager — Web &amp; Desktop</div>
          <div class="dates">09/2020 – 12/2020</div>
        </div>
        <ul class="bullets">
          <li>Python password manager with <strong>PyQt5</strong> desktop and <strong>Flask</strong> web clients, backed by MongoDB/Firebase.</li>
        </ul>
      </div>
```

New:

```html
      <div class="entry">
        <div class="entry-head">
          <div class="entry-title">Password Manager — Web &amp; Desktop</div>
          <div class="dates">09/2020 – 12/2020</div>
        </div>
        <div class="stack">Flask · Bootstrap · PyQt5 · SQLite · MongoDB · Firebase</div>
        <ul class="bullets">
          <li>Built a password manager with <strong>Flask + Bootstrap</strong> (web) and <strong>PyQt5</strong> (desktop) clients, securing credentials with <strong>Fernet symmetric encryption</strong> (Python cryptography) and <strong>hash-based login verification</strong>.</li>
          <li>First end-to-end project — implemented persistence across <strong>SQLite, MongoDB, and Firebase</strong>, learning <strong>CRUD design, encryption, and cross-platform GUI</strong> development.</li>
        </ul>
      </div>
```

- [ ] **Step 3: Commit**

```bash
git add resume/resume-c.html
git commit -m "feat(resume): restructure Marksheet & Password Manager — stack lines, accurate claims"
```

---

### Task 5: Regenerate and verify PDFs

**Files:**
- Modify (generated): `resume/resume-a.pdf`, `resume/resume-c.pdf`, `resume/resume-c-web.pdf`

- [ ] **Step 1: Run the generator**

```bash
cd resume && ./generate.sh
```

Expected output (script self-verifies):

```
resume-a.pdf: 1 page(s) — OK
resume-a.pdf: text layer OK
resume-c.pdf: 1 page(s) — OK
resume-c.pdf: text layer OK
resume-c-web.pdf: 1 page(s) — OK
resume-c-web.pdf: text layer OK
```

- [ ] **Step 2: Handle a possible one-page overflow**

If `resume-c.pdf` reports 2 pages — **STOP, do not trim content unilaterally.** The agreed trim candidates are Academic Suite bullet 4 or Marksheet bullet 2, but the user must be asked first. Report back and wait.

- [ ] **Step 3: Confirm no stale claims remain in the resume**

```bash
grep -niE "200%|5 years|backend-leaning|NumPy|Automation Scripts" resume/resume-c.html ; echo "exit: $?"
```

Expected: no matches, `exit: 1`.

- [ ] **Step 4: Commit the PDFs**

```bash
git add resume/resume-a.pdf resume/resume-c.pdf resume/resume-c-web.pdf
git commit -m "chore(resume): regenerate PDFs from updated layout C"
```

---

### Task 6: Portfolio skills (`lib/data.ts`)

**Files:**
- Modify: `lib/data.ts:193-218` (`skillsData`)

- [ ] **Step 1: Replace `skillsData`**

Old:

```ts
export const skillsData = [
  {
    category: "Programming",
    skills: ["Python", "Java", "JavaScript", "Shell Scripting"],
  },
  {
    category: "Frontend",
    skills: ["HTML", "CSS", "React", "Next.js", "TypeScript"],
  },
  {
    category: "Backend",
    skills: ["FastAPI", "Flask", "Django", "Spring Boot", "Kafka", "REST APIs", "Microservices"],
  },
  {
    category: "Data & Automation",
    skills: ["NumPy", "Pandas", "Automation Scripts"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["Docker", "Kubernetes", "Google Cloud", "GitHub Actions", "Linux", "CI/CD"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
] as const;
```

New:

```ts
export const skillsData = [
  {
    category: "Programming",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "Shell Scripting"],
  },
  {
    category: "Backend",
    skills: [
      "FastAPI",
      "Flask",
      "Django",
      "Spring Boot",
      "REST APIs",
      "Microservices",
      "Kafka",
      "SQLAlchemy",
    ],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "HTML", "CSS"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Firebase"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["Docker", "Kubernetes", "Google Cloud", "GitHub Actions", "CI/CD", "Linux"],
  },
  {
    category: "Tools & Security",
    skills: ["Git", "Postman", "JWT", "RBAC", "Cryptography"],
  },
] as const;
```

- [ ] **Step 2: Commit**

```bash
git add lib/data.ts
git commit -m "feat(portfolio): unify skillsData with resume — Tools & Security category"
```

---

### Task 7: Portfolio experience (`lib/data.ts`)

**Files:**
- Modify: `lib/data.ts:56-77` (the two Zoho entries in `experiencesData`; all other entries unchanged)

- [ ] **Step 1: Replace the SDE entry's `description` array**

Old:

```ts
    description: [
      "Built a CLI-based server configuration and deployment automation tool in Python and Shell, simplifying setup and releases for the whole team.",
      "Cut developer cycle time by ~40% by streamlining environment setup, code changes, and testing loops.",
      "Developed backend components for a shared API gateway integrating 10+ external systems, standardising CRUD operations and reducing maintenance complexity.",
      "Implemented real-time data synchronisation across interconnected services, improving data accuracy and eliminating manual intervention.",
    ],
```

New:

```ts
    description: [
      "Built a CLI-based server configuration and deployment automation tool in Python and Shell, adopted by the entire Zoho Projects engineering team for setup and releases.",
      "Cut developer cycle time by ~40% by streamlining environment setup, code changes, and testing loops.",
      "Developed backend components for a shared API gateway powering install/uninstall for all Zoho Projects integrations (10+ external systems) — new integrations are config-driven, eliminating ~40% of duplicated integration code.",
      "Consolidated real-time data synchronisation from 5+ services into a single Kafka + scheduler-based design, cutting cross-service sync latency from minutes to seconds — now the standard pattern for new services.",
    ],
```

- [ ] **Step 2: Replace the intern entry's `description` array**

Old:

```ts
    description: [
      "Co-built a full-stack project management tool adopted by 200+ internal users, developing backend APIs and UI components.",
      "Diagnosed and fixed 30+ production issues, strengthening debugging and root-cause analysis skills.",
      "Automated repetitive integration steps, significantly reducing service integration time.",
    ],
```

New:

```ts
    description: [
      "Independently built a full-stack project management tool — backend APIs and UI — adopted by 200+ internal users.",
      "Resolved 30+ production issues in a live product and collaborated on new-feature analysis with the core team.",
      "Drove the team's Eclipse → IntelliJ migration by reimplementing slow IDE-plugin workflows as Python/Shell scripts with fully automated configuration.",
    ],
```

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "feat(portfolio): quantified Zoho experience bullets"
```

---

### Task 8: Portfolio projects (`lib/data.ts`)

**Files:**
- Modify: `lib/data.ts:130-190` (Password Manager Web, Password Manager Desktop, Marksheet entries in `projectsData`; Academic Suite entry unchanged)

- [ ] **Step 1: Replace the Password Manager — Web entry**

Old (the object titled `"Password Manager — Web"`):

```ts
  {
    title: "Password Manager — Web",
    description:
      "A secure, web-based password manager with advanced encryption. Store all credentials in one place, accessible from any device, anytime.",
    tags: ["Python", "Flask", "MongoDB", "HTML", "CSS", "JS"],
    imageUrl: passwordmanager,
    modalType: "image",
    modalTitle: "Password Manager — Web App",
    modalPoints: [
      "A secure, web-based solution designed for efficient password management with advanced encryption techniques.",
      "Fully supports CRUD operations with robust encryption and decryption mechanisms.",
      "Implements hash-based verification for secure logins and strong password storage.",
      "Provides a responsive and user-friendly GUI, ensuring seamless interaction across multiple users.",
      "Offers compatibility for cloud-based and offline modes to cater to diverse user needs.",
      "Supports cross-platform functionality on Windows, Linux, and Mac for wide accessibility.",
      "This project highlights expertise in web application development, encryption methodologies, and secure multi-user systems.",
    ],
    modalSrc: "/pwdm.png",
  },
```

New:

```ts
  {
    title: "Password Manager — Web",
    description:
      "Web-based password manager securing credentials with Fernet symmetric encryption. Store everything in one place, accessible from any device.",
    tags: ["Python", "Flask", "Bootstrap", "SQLite", "MongoDB", "Firebase"],
    imageUrl: passwordmanager,
    modalType: "image",
    modalTitle: "Password Manager — Web App",
    modalPoints: [
      "Web-based password manager built with Flask and Bootstrap — my first end-to-end project.",
      "Secures credentials with Fernet symmetric encryption (Python cryptography) and hash-based login verification.",
      "Full CRUD support for managing stored credentials behind authenticated sessions.",
      "Persistence implemented across SQLite, MongoDB, and Firebase — supporting both cloud-based and offline modes.",
      "Responsive, multi-user UI built with Bootstrap.",
    ],
    modalSrc: "/pwdm.png",
  },
```

- [ ] **Step 2: Replace the Password Manager — Desktop entry**

Old (the object titled `"Password Manager — Desktop"`):

```ts
  {
    title: "Password Manager — Desktop",
    description:
      "Multi-platform desktop app with locally encrypted password storage. Provides 200% safer encryption accessible only on the user's machine.",
    tags: ["Python", "PyQt5", "SQL", "Firebase", "MongoDB"],
    imageUrl: passwordmanagergui,
    modalSrc: "/pwdm.mp4",
    modalType: "video",
    modalTitle: "Password Manager — Desktop App",
    modalPoints: [
      "A secure and user-friendly application designed to simplify password management while ensuring data protection across multiple platforms.",
      "Full support for CRUD operations to manage passwords efficiently.",
      "Implements robust encryption and decryption algorithms to safeguard user data.",
      "Hash-based login verification for enhanced security.",
      "Strong encryption for securely storing sensitive information.",
      "Responsive GUI, ensuring an intuitive user experience.",
      "Available for both cloud-based and offline usage, offering flexibility to users.",
      "Supports multi-user functionality for collaborative environments.",
      "Compatible with Windows, Linux, and Mac, ensuring cross-platform accessibility.",
      "This project demonstrates expertise in secure coding practices, encryption methodologies, and cross-platform application development.",
    ],
  },
```

New:

```ts
  {
    title: "Password Manager — Desktop",
    description:
      "Cross-platform PyQt5 desktop app with locally encrypted password storage — credentials secured with Fernet symmetric encryption on the user's machine.",
    tags: ["Python", "PyQt5", "SQLite", "Firebase", "MongoDB"],
    imageUrl: passwordmanagergui,
    modalSrc: "/pwdm.mp4",
    modalType: "video",
    modalTitle: "Password Manager — Desktop App",
    modalPoints: [
      "Cross-platform PyQt5 desktop client for secure password management on Windows, Linux, and Mac.",
      "Secures credentials with Fernet symmetric encryption (Python cryptography) and hash-based login verification.",
      "Full CRUD operations with persistence across SQLite, MongoDB, and Firebase.",
      "Works in both cloud-backed and fully offline modes, with multi-user support.",
      "Built alongside the web client as my first end-to-end project — learning CRUD design, encryption, and cross-platform GUI development.",
    ],
  },
```

- [ ] **Step 3: Replace the Marksheet Management System entry**

Old (the object titled `"Marksheet Management System"`):

```ts
  {
    title: "Marksheet Management System",
    description:
      "Automated system that generates marksheets, hall tickets, and department reports from student data. In production use for 5 years before being rebuilt as Academic Suite.",
    tags: ["Python", "Flask", "pymysql", "pandas", "HTML", "CSS", "JS"],
    imageUrl: marksheetmanager,
    modalSrc: "/mm.mp4",
    modalType: "video",
    modalTitle: "Marksheet Management System",
    modalPoints: [
      "A comprehensive and automated solution for managing student records, designed to streamline academic operations efficiently.",
      "Generates individual marksheets and detailed student reports effortlessly.",
      "Provides department-wise reports for a comprehensive performance overview.",
      "Automates hall ticket generation for seamless examination processes.",
      "Includes automated features to send marksheets and hall tickets directly to students via email.",
      "Simplifies data handling, improving accuracy and reducing manual effort.",
      "Served the institution in production for 5 years before being rebuilt as the Academic Suite platform.",
      "This project showcases expertise in automation, report generation, and building efficient academic management systems.",
    ],
  },
```

New:

```ts
  {
    title: "Marksheet Management System",
    description:
      "Flask web app that reads student marks from Excel sheets and generates marksheets, hall tickets, and department copies. Still running in production; later evolved into Academic Suite.",
    tags: ["Python", "Flask", "Bootstrap", "MySQL", "Pandas"],
    imageUrl: marksheetmanager,
    modalSrc: "/mm.mp4",
    modalType: "video",
    modalTitle: "Marksheet Management System",
    modalPoints: [
      "Reads student marks from Excel sheets and processes them with Pandas into print-ready marksheets, hall tickets, and department copies.",
      "Generates department-wise reports for a complete performance overview.",
      "Delivered as a fully offline, single-machine system per the institution's requirement — a stable build still running in production today.",
      "Later evolved into Academic Suite, a separate web app accessible from anywhere.",
    ],
  },
```

- [ ] **Step 4: Commit**

```bash
git add lib/data.ts
git commit -m "feat(portfolio): accurate project copy — Fernet encryption, offline Marksheet story"
```

---

### Task 9: Portfolio About & Intro (`components/about.tsx`, `components/intro.tsx`)

**Files:**
- Modify: `components/about.tsx:20-27` (paragraph 1 only)
- Modify: `components/intro.tsx:64-70` (headline only)

- [ ] **Step 1: Replace About paragraph 1**

Old:

```tsx
      <p className="mb-3">
        I am a backend-leaning full-stack{" "}
        <span className="font-medium">Software Engineer at Zoho Corporation</span> with 3+ years
        of full-time experience (5+ including my internship) across the full software lifecycle —
        from building <span className="font-medium">backend APIs and CLI automation tools</span> to
        contributing to large-scale <span className="font-medium">distributed systems</span> and{" "}
        <span className="font-medium">API gateways</span>.
      </p>
```

New:

```tsx
      <p className="mb-3">
        I am a <span className="font-medium">Software Engineer at Zoho Corporation</span> with 3+
        years of full-time experience (5+ including my internship) across the full software
        lifecycle — from <span className="font-medium">backend APIs and CLI automation tools</span>{" "}
        to large-scale <span className="font-medium">distributed systems</span> and{" "}
        <span className="font-medium">API gateways</span>.
      </p>
```

(Paragraphs 2 and 3 stay untouched.)

- [ ] **Step 2: Replace the Intro headline body**

Old:

```tsx
        <span className="font-bold">Hello, I&apos;m Viswanathan.</span> I&apos;m a{" "}
        <span className="font-bold">Software Engineer</span> with{" "}
        <span className="font-bold">3+ years at Zoho</span>. I build backend
        systems — <span className="font-bold">REST APIs & microservices</span> —
        automate workflows with{" "}
        <span className="underline">Python & Shell</span>, and ship{" "}
        <span className="italic">reliable software</span> end to end.
```

New:

```tsx
        <span className="font-bold">Hello, I&apos;m Viswanathan.</span> I&apos;m a{" "}
        <span className="font-bold">Software Engineer</span> with{" "}
        <span className="font-bold">3+ years at Zoho</span>. I build{" "}
        <span className="font-bold">REST APIs & microservices</span>,
        automate workflows with{" "}
        <span className="underline">Python & Shell</span>, and ship{" "}
        <span className="italic">reliable software</span> end to end.
```

- [ ] **Step 3: Commit**

```bash
git add components/about.tsx components/intro.tsx
git commit -m "feat(portfolio): broad SE positioning in intro and about"
```

---

### Task 10: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Build and lint**

```bash
npm run build && npm run lint
```

Expected: build succeeds, lint reports no errors.

- [ ] **Step 2: Stale-claim grep across both surfaces**

```bash
grep -rniE "200%|5 years|backend-leaning|Automation Scripts|NumPy" lib/data.ts components/about.tsx components/intro.tsx resume/resume-c.html ; echo "exit: $?"
```

Expected: no matches, `exit: 1`.

Also confirm Marksheet has no email claim left:

```bash
grep -ni "email" lib/data.ts resume/resume-c.html ; echo "exit: $?"
```

Expected: no matches in Marksheet context (the contact `mailto:` link in `resume-c.html` is fine and expected).

- [ ] **Step 3: Verify working tree is clean and history is sane**

```bash
git status --short && git log --oneline -9
```

Expected: clean tree; the commits from Tasks 1–9 present.

- [ ] **Step 4: Report completion to user**

Do NOT push or open a PR — the user decides distribution (previous sessions pushed via HTTPS `gh` credential helper when asked).
