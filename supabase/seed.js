#!/usr/bin/env node
/**
 * United Learn — seed Supabase from local content.js
 *
 *   npm install @supabase/supabase-js
 *   SUPABASE_URL=https://xxxxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE=eyJ...  node supabase/seed.js
 *
 * You MUST use the service_role key (not the anon key) — it bypasses RLS.
 * Do NOT commit this key anywhere.
 *
 * The seed is idempotent: re-running it upserts by id.
 */

const path = require('path');
const fs = require('fs');
const vm = require('vm');
const { createClient } = require('@supabase/supabase-js');

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE;
if (!URL || !KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE env vars.');
  process.exit(1);
}

const BUCKET      = process.env.STORAGE_BUCKET || 'training-materials';
const STORAGE_URL = `${URL}/storage/v1/object/public/${BUCKET}`;

// ---------- Load the browser-side content.js ----------
// content.js assigns its data to `window.*`. We run it in a sandbox.
const contentJs = fs.readFileSync(path.join(__dirname, '..', 'content.js'), 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(contentJs, sandbox);
const { SEED_COURSES, SEED_CAPSTONES, SEED_TRAINERS, SEED_RESOURCES } = sandbox.window;

const supa = createClient(URL, KEY, { auth: { persistSession: false } });

const chunk = (arr, n) => arr.reduce((r, _, i) => (i % n ? r : [...r, arr.slice(i, i + n)]), []);

async function upsert(table, rows, onConflict) {
  if (!rows.length) return;
  for (const slice of chunk(rows, 500)) {
    const { error } = await supa.from(table).upsert(slice, { onConflict });
    if (error) throw new Error(`upsert ${table}: ${error.message}`);
  }
  console.log(`  upserted ${rows.length} into ${table}`);
}

(async () => {
  console.log('→ Trainers');
  await upsert('trainers',
    (SEED_TRAINERS || []).map(t => ({ id: t.id, name: t.name, expertise: t.expertise, division: t.division, bio: t.bio })),
    'id');

  console.log('→ Courses');
  const courseRows = SEED_COURSES.map(c => ({
    id: c.id, division: c.division, order: c.order, title: c.title, summary: c.summary,
    thumbnail: c.thumbnail, trainer_id: c.trainerId, passing_score: c.passingScore,
    estimated_minutes: c.estimatedMinutes, access_roles: c.accessRoles || ['all'],
    match_data: c.matchData || null, hotspot_data: c.hotspotData || null
  }));
  await upsert('courses', courseRows, 'id');

  console.log('→ Lessons');
  const lessonRows = SEED_COURSES.flatMap(c =>
    (c.lessons || []).map((l, i) => ({
      id: l.id, course_id: c.id, order: i + 1, title: l.title,
      type: l.type || 'reading', body: l.body || null, cards: l.cards || null
    })));
  await upsert('lessons', lessonRows, 'id');

  console.log('→ Quiz questions');
  // Wipe + reinsert quiz rows (they don't have stable ids).
  for (const c of SEED_COURSES) {
    await supa.from('quiz_questions').delete().eq('course_id', c.id);
    const rows = (c.quiz || []).map((q, i) => ({
      course_id: c.id, order: i + 1, q: q.q, type: q.type || 'mcq',
      options: q.options || (q.type === 'tf' ? ['True','False'] : null),
      correct: q.correct, explain: q.explain || null
    }));
    if (rows.length) {
      const { error } = await supa.from('quiz_questions').insert(rows);
      if (error) throw new Error('quiz insert: ' + error.message);
    }
  }
  console.log('  reset + inserted quiz questions for ' + SEED_COURSES.length + ' courses');

  console.log('→ Capstones');
  await upsert('capstones',
    SEED_CAPSTONES.map(c => ({ id: c.id, division: c.division, title: c.title, summary: c.summary, passing_score: c.passingScore })),
    'id');
  for (const c of SEED_CAPSTONES) {
    await supa.from('capstone_questions').delete().eq('capstone_id', c.id);
    const rows = (c.questions || []).map((q, i) => ({
      capstone_id: c.id, order: i + 1, q: q.q, type: q.type || 'mcq',
      options: q.options, correct: q.correct
    }));
    if (rows.length) {
      const { error } = await supa.from('capstone_questions').insert(rows);
      if (error) throw new Error('capstone_questions: ' + error.message);
    }
  }
  console.log('  inserted capstone questions');

  console.log('→ Resources');
  // Clear & reinsert. If STORAGE_MODE=public, rewrite file paths to the Supabase Storage URL.
  const useStorage = (process.env.STORAGE_MODE || 'local') === 'supabase';
  for (const [courseId, list] of Object.entries(SEED_RESOURCES || {})) {
    await supa.from('resources').delete().eq('course_id', courseId);
    const rows = list.map((r, i) => ({
      course_id: courseId, order: i + 1, title: r.title, kind: r.kind || 'pdf', group_name: r.group || null,
      file_url: r.kind === 'link'
        ? r.file
        : (useStorage ? `${STORAGE_URL}/${encodeURI(r.file)}` : r.file)
    }));
    if (rows.length) {
      const { error } = await supa.from('resources').insert(rows);
      if (error) throw new Error('resources: ' + error.message);
    }
  }
  console.log('  inserted resources');

  console.log('\n✓ Seed complete.');
})().catch(e => { console.error(e); process.exit(1); });
