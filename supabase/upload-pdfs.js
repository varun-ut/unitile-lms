#!/usr/bin/env node
/**
 * United Learn — bulk-upload all training-data/ files to Supabase Storage.
 *
 *   SUPABASE_URL=https://xxxxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE=eyJ... node supabase/upload-pdfs.js
 *
 * Uploads every file under training-data/ to the 'training-materials' bucket,
 * preserving directory structure. Safe to re-run — uses upsert.
 *
 * IMPORTANT: Supabase free tier is 1 GB storage + 5 GB egress per project.
 * Current training-data is ~500 MB so free tier fits, but heavy download
 * traffic can blow egress. Consider Cloudflare R2 if you expect > 5 GB/month.
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE;
if (!URL || !KEY) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE');
  process.exit(1);
}
const BUCKET = process.env.STORAGE_BUCKET || 'training-materials';
const ROOT   = path.join(__dirname, '..', 'training-data');

const supa = createClient(URL, KEY, { auth: { persistSession: false } });

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory())       yield* walk(full);
    else if (entry.isFile() && /\.(pdf|ppt|pptx|doc|docx|xls|xlsx)$/i.test(entry.name)) yield full;
  }
}

const mime = (ext) => ({
  '.pdf': 'application/pdf',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}[ext.toLowerCase()] || 'application/octet-stream');

(async () => {
  const files = Array.from(walk(ROOT));
  console.log(`Found ${files.length} files to upload.`);
  let done = 0, failed = 0;
  for (const abs of files) {
    const rel = path.relative(path.join(__dirname, '..'), abs).replace(/\\/g, '/');
    // `rel` looks like: training-data/Training material/Chapter 1 - Introduction to RAF/...pdf
    // Strip the "training-data/" prefix — bucket path starts after that.
    const objectPath = rel.replace(/^training-data\//, '');
    const body = fs.readFileSync(abs);
    const { error } = await supa.storage.from(BUCKET).upload(objectPath, body, {
      contentType: mime(path.extname(abs)),
      upsert: true
    });
    if (error) {
      failed++;
      console.error(`✗ ${objectPath}: ${error.message}`);
    } else {
      done++;
      if (done % 10 === 0) console.log(`  ${done}/${files.length} uploaded`);
    }
  }
  console.log(`\n✓ Uploaded ${done}/${files.length}. Failed: ${failed}.`);
  if (done) {
    console.log('\nPublic URL pattern:');
    console.log(`  ${URL}/storage/v1/object/public/${BUCKET}/<objectPath>`);
    console.log('\nNow run:  STORAGE_MODE=supabase node supabase/seed.js');
    console.log('  …to re-seed resources with Storage URLs.');
  }
})().catch(e => { console.error(e); process.exit(1); });
