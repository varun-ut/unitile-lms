# United Learn — Deploy Runbook (Route 2)

Production architecture:

```
Browser ───► Vercel static (HTML + JS + CSS)
              │
              └─► Supabase (Postgres + Auth + Storage)
```

You'll follow five stages. Total time: ~30–60 minutes first time.

---

## 1. Prerequisites (one-time)

- Install Node.js LTS from https://nodejs.org (for seeding / uploads).
- Create a **Supabase** account at https://supabase.com (free tier is fine).
- Create a **Vercel** account at https://vercel.com (free tier).
- A GitHub account if you want CI-deploys (optional).

---

## 2. Supabase: create project & run schema

1. In Supabase, click **New project**. Choose a region near India (e.g. `ap-south-1 / Mumbai`). Set a strong database password and save it.
2. Wait ~2 minutes for the project to boot.
3. Go to **Project Settings → API**. Copy:
   - `Project URL`           → `SUPABASE_URL`
   - `anon public`           → `SUPABASE_ANON_KEY`
   - `service_role`          → `SUPABASE_SERVICE_ROLE` (keep secret, never commit)
4. Open **SQL Editor → New query**. Paste the contents of [`supabase/schema.sql`](supabase/schema.sql). Click **Run**. You should see "Success. No rows returned".
5. Go to **Authentication → Providers → Email**. Decide:
   - **Confirm email = OFF** (easy internal use) — users can sign in immediately after signup.
   - **Confirm email = ON** (recommended for external rollout) — users must click a link.
6. Go to **Authentication → URL Configuration**. Add your future Vercel URL to the **Site URL** and **Redirect URLs** lists, e.g. `https://united-learn.vercel.app`.

---

## 3. Seed catalog data into Postgres

From your local machine (`unitile-lms/` folder):

```bash
npm install

# Replace the two env values with those from step 2
export SUPABASE_URL="https://xxxxxxxx.supabase.co"
export SUPABASE_SERVICE_ROLE="eyJhbGciOi...your.service.role.key..."

# Windows PowerShell:
# $env:SUPABASE_URL="..."; $env:SUPABASE_SERVICE_ROLE="..."

npm run seed
```

This inserts 12 courses, ~70 lessons, 200+ quiz questions, 2 capstones, trainers, and all the reference resource rows. Idempotent — rerun any time.

---

## 4. Upload PDFs / PPTs to Supabase Storage

Your `training-data/` folder is ~500 MB. Free Supabase Storage is **1 GB**, so it fits — but note the 5 GB/month egress cap on free tier.

```bash
# Uploads every file under training-data/ to the 'training-materials' bucket.
npm run upload:pdfs

# Then re-seed with Storage URLs instead of local paths:
npm run seed:supabase
```

After this, resource links in the app point to `https://xxxx.supabase.co/storage/v1/object/public/training-materials/...` — served from Supabase's CDN.

> **Alternative:** use **Cloudflare R2** (10 GB free, no egress fees) for PDFs. Swap the `file_url` column in the `resources` table to R2 public URLs.

---

## 5. Create your admin account

A fresh Supabase has zero users. Do this once:

1. Open the deployed app (or run it locally with `npm run dev`).
2. Sign up with your personal `@united-group.in` email.
3. In Supabase **Table Editor → profiles**, find your row and change `role` from `learner` to `admin`. Save.
4. Refresh the app. You'll land on the admin console.

From that admin account you can now create any other admins directly from **Learners → edit role**.

---

## 6. Configure the frontend

Open `config.js` in the project and paste your Supabase URL and **anon** (public) key:

```js
window.UNITED_LEARN_CONFIG = {
  SUPABASE_URL:      'https://xxxxxxxx.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOi...your.anon.key...'
};
```

`config.js` is `.gitignore`-d by default so you don't leak keys. For Vercel deploys you'll set it via build-time envs (step 7).

Test locally:

```bash
npm run dev
# open http://localhost:5173
```

---

## 7. Deploy to Vercel

Easiest path — **drag & drop**:

1. Zip the `unitile-lms/` folder (but exclude `training-data/`, `node_modules/`, `data/`).
2. Go to **Vercel → Add new → Project → Import** and upload the zip.
3. Framework preset: **Other**. Output directory: `.` (root).
4. After deploy, edit `config.js` in the Vercel project files with your prod Supabase URL + anon key. Redeploy.

Or — **GitHub → Vercel** (recommended for future updates):

1. Push the repo to GitHub (your `.gitignore` already skips `training-data/`, `config.js`, `node_modules/`).
2. Vercel → **Import Git repository** → pick the repo.
3. Build settings: no build command, output = `.`.
4. In **Project Settings → Environment Variables**, add `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
5. Replace the contents of `config.js` in the repo with a build-time generator (see **“Injecting env vars”** below) OR commit a production `config.js` with non-secret anon key (anon key is safe to commit; it's already scoped by RLS).

### Injecting env vars at build time (nicer)

Add a tiny `vercel-build.sh` that generates `config.js`:

```bash
#!/usr/bin/env bash
cat > config.js <<EOF
window.UNITED_LEARN_CONFIG = {
  SUPABASE_URL: "$SUPABASE_URL",
  SUPABASE_ANON_KEY: "$SUPABASE_ANON_KEY"
};
EOF
```

Then in `vercel.json`, add:

```json
{ "buildCommand": "bash vercel-build.sh" }
```

---

## 8. Verify the live system

- Visit the Vercel URL.
- Sign up with a fresh `@united-group.in` email — confirm you land on the learner dashboard.
- Log in as admin — see 12 courses, 2 capstones, and learner rows.
- Open a course → click a **Reference materials** PDF → it loads from Supabase Storage.
- Mark a lesson done → log in on a different browser as the same user → progress is there ✓ (this is the key "multi-device" proof of Route 2 working).

---

## 9. Ongoing operations

| Task | How |
|---|---|
| Add/edit a course | Admin UI → Courses → Edit |
| Generate AI quiz | Admin UI → AI Quiz Builder (client heuristic; swap in Claude API for quality — see below) |
| Announce to learners | Admin UI → Announcements |
| Restrict access | Admin UI → Access control (designation allowlist + per-learner assignment) |
| Add a new admin | Table editor → profiles → change row `role` = `admin` |
| Backups | Supabase → Database → Backups (auto daily, 7-day retention on free tier) |
| Upgrade storage/bandwidth | Supabase Pro ($25/mo) — 100 GB storage + 250 GB bandwidth |

---

## 10. Plugging in the real AI Quiz Builder

The current builder is a client-side heuristic. To use Anthropic Claude:

1. Add a Vercel serverless function `api/generate-quiz.js` that calls the Anthropic Messages API with your prompt. Store the `ANTHROPIC_API_KEY` as a Vercel env var.
2. Replace the `generate()` function in `AiQuizBuilder` (see `app.js`) with `fetch('/api/generate-quiz', { method: 'POST', body: JSON.stringify({ text }) })`.
3. Keep the review/save flow as-is.

I can scaffold this function on request — it's ~30 lines.

---

## Troubleshooting

**“Configuration error” screen** → `config.js` is empty or missing. Fill it in with your Supabase URL + anon key.

**“Only @united-group.in email addresses are allowed”** → the domain trigger rejected signup. Use the right domain or (temporarily) edit the trigger in schema.sql.

**Learners can't see PDFs** → confirm the `training-materials` bucket is public in Supabase → Storage → bucket settings.

**RLS policy errors on admin pages** → make sure your account has `role = 'admin'` in `profiles`. The `is_admin()` helper function checks this column.

**Email confirmation spinning forever** → in Supabase → Auth → Providers → Email, toggle "Confirm email" off (internal rollout) or configure the SMTP sender (external rollout).
