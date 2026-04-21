# United Learn — LMS for Unitile & UniVicoustic

A first-cut Learning Management System for the United Group, covering both the **Unitile** (Raised Access Flooring) and **UniVicoustic** (Acoustic Systems) divisions. Runs entirely in the browser — no backend, no install.

---

## Run it

**Simplest:** double-click `index.html` (or right-click → Open with → any modern browser). Everything loads from CDN and persists in `localStorage`.

**Via the Launch preview panel:** the panel is already pointed at `index.html` — just open it.

**Via a static server (optional, if you have one):**

```bash
# Python 3
python -m http.server 8080

# Node (npx)
npx serve .
```

Then open http://localhost:8080.

---

## Demo credentials

| Role     | Email                           | Password    | Division      |
|----------|---------------------------------|-------------|---------------|
| Admin    | admin@unitedgroup.com           | admin123    | —             |
| Learner  | rahul.sharma@unitedgroup.com    | learner123  | Unitile       |
| Learner  | neha.gupta@unitedgroup.com      | learner123  | UniVicoustic  |
| Learner  | priya.iyer@unitedgroup.com      | learner123  | Unitile       |
| Learner  | suresh.nair@unitedgroup.com     | learner123  | UniVicoustic  |

Any new sign-up requires an email ending in `@unitedgroup.com`.

> **Reset the app:** open DevTools Console and run `localStorage.clear()` → reload.

---

## What's included (first cut)

### Learner experience

- Sign-up with email/designation/business division/unit — divisional dashboard.
- Course catalog filtered to their division, with search.
- **Interactive lessons** per course:
  - **Reading** — rich HTML with callouts and tables.
  - **Flashcards** — flip cards for terminology.
  - **Drag & match** — pair items with their correct answer.
  - **Hotspot** — click numbered markers to identify parts / features.
  - **Quiz** — MCQ + True/False with instant feedback and explanations.
- Per-course pass threshold, progress bars, and lesson completion ticks.
- **Capstone assessment** per division — ≥ 75% earns a **certificate**.
- Confetti celebration on passing. (Because we earned it.)
- Announcements feed filtered by audience.

### Admin console

- **Overview:** active learners, certificates issued, division split, top performers.
- **Courses:** create/edit/delete courses, edit lessons (reading, flashcards, match, hotspot, quiz), edit quiz questions (MCQ / TF).
- **Trainers:** add/edit trainers, bio, expertise, division, link to courses.
- **Learners:** search & filter learners, view per-learner progress, delete accounts.
- **Access control:**
  - Designation-level rules per course (e.g. “only Sales Executives + Application Engineers see this”).
  - Per-learner explicit assignment (overrides designation rule).
- **Announcements:** post targeted messages to all / Unitile / UniVicoustic.
- **AI Quiz Builder:** paste any training text or upload a `.txt` / `.md` file → draft MCQs are generated (10 max). Review, remove, assign to target course. (Local heuristic — swap in an LLM endpoint for production.)

---

## Seeded content (from your training material)

### Unitile — 5 chapters, fully built out
1. **Chapter 1** — Introduction to Raised Access Flooring (definition, benefits, anatomy, flashcards, 8-Q quiz).
2. **Chapter 2** — Business Segments (buyer matrix, drag-match exercise, 5-Q quiz).
3. **Chapter 3** — Product Range (RAF panels, UFlex ceiling, all accessories, drag-match, 12-Q quiz).
4. **Chapter 4** — Testing Standards (load / fire / ESD / green, 8-Q quiz).
5. **Chapter 5** — Installation (open office + DC + manual essentials, hotspot exercise, 10-Q quiz).
6. **Unitile Capstone** — 15-question final assessment → certificate.

### UniVicoustic — 7 modules, fully built out
1. **Module 1** — Sound Science (waves, dB, reflection/absorption, reverberation, flashcards, 10-Q quiz).
2. **Module 2** — Acoustic Material & Analysis (NRC, STC, αw, test methods, hotspot exercise, 12-Q quiz).
3. **Module 3** — Market Insights (India sizing, trends, personas, 8-Q quiz).
4. **Module 4** — Product Range (every panel type, drag-match, 12-Q quiz).
5. **Module 5** — Certifications (NRC, STL, fire, green, ISO — 10-Q quiz).
6. **Module 6** — SOPs (install, CNC, shade/thickness, storage, maintenance, dealer onboarding, 15-Q quiz).
7. **Module 7** — Digital Product Catalog (Bespoke Graphics, Woodscape, Fabric, Ombre, Uni-VicStrip, drag-match, 10-Q quiz based on catalog.univicoustic.com).
8. **UniVicoustic Capstone** — 15-question final assessment → certificate.

Totals: **12 courses · ~70 lessons · 200+ assessment items · 2 capstones**.

---

## Files

```
unitile-lms/
├─ index.html        # loads React + Tailwind + Babel from CDN
├─ styles.css        # custom styles (flashcard flip, hotspot pulse, etc.)
├─ content.js        # seeded courses, lessons, quizzes, trainers, employees
├─ app.js            # React app (~1500 lines — all components + state)
├─ training-data/    # the PDFs you uploaded (source material reference)
└─ README.md
```

No build step. No dependencies to install. Just refresh.

---

## How the LMS is configurable

Everything the admin does — creating courses, adding lessons, generating quizzes, assigning learners — is persisted to `localStorage`. The admin can:

1. **Add a new course** — any division, any lesson types, any passing score.
2. **Add any lesson type:** reading (HTML body), flashcards, match, hotspot, quiz reference.
3. **Upload a text document** → AI Quiz Builder → get draft MCQs → assign.
4. **Control visibility** — by designation allowlist, or by explicit per-learner assignment.
5. **Add trainers** — name, expertise, bio, division, link to courses.
6. **Post announcements** to all / one division.

---

## Upgrade path

For a production deployment, swap these client-only pieces for proper services:

| Concern              | Current                  | Production                |
|---------------------|--------------------------|----------------------------|
| Auth                 | localStorage user list   | SSO / OAuth / JWT          |
| Data storage         | localStorage (per-device)| PostgreSQL + REST/GraphQL  |
| AI quiz gen          | Client-side heuristic    | Anthropic Claude / OpenAI  |
| File upload (PDF)    | Text-only input           | S3 + PDF parser + LLM      |
| Video lessons        | Not included             | Mux / Cloudflare Stream    |
| Emails               | None                     | SES / Postmark             |
| Certificate PDFs     | CSS card on page         | PDFKit / headless Chrome   |

---

## Known limitations of this first cut

- Everything is **per-browser** — clear your cache and you lose local edits (the admin's learner table stays because it's re-seeded from `content.js` on first visit, but admin-created courses/quizzes are local).
- The **AI quiz generator is heuristic**, not an LLM — it blanks a keyword and generates plausible distractors. Good as a UX demo; replace with a real LLM for quality.
- PDF **upload** is placeholder: today the admin can only paste text or upload `.txt`/`.md`. Wiring PDF parsing is trivial once we have a backend.
- No real-time **video** lessons yet — easy to add per lesson type.

All of this is intentional for a first cut. Say the word and I'll wire any of these up properly.

---

## Next things to refine (in order of bang-for-buck)

1. **Real LLM integration** for the AI Quiz Builder (+ PDF ingestion).
2. **Persistent backend** so admin changes sync across devices.
3. **Video lessons** + **trainer-led live sessions** scheduling.
4. **Dashboards for trainers** (who's stuck, who's ready for follow-up).
5. **Gamification** — streaks, badges, leaderboards.
6. **SSO** with Azure AD / Google Workspace.
