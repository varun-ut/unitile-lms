#!/usr/bin/env node
// Bundles index.html + styles.css + content.js + app.js into ONE file
// so the app can be double-clicked from file:// without a web server.
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

const styles   = read('styles.css');
const content  = read('content.js');
const appjs    = read('app.js');

// A trivial config so the demo provider kicks in (no Supabase).
const config = `window.UNITED_LEARN_CONFIG = { SUPABASE_URL: '', SUPABASE_ANON_KEY: '' };`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>United Learn — LMS for Unitile & UniVicoustic</title>
<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = {
  theme: { extend: {
    colors: {
      brand: { 50:'#eef4ff',100:'#dce7ff',200:'#bccfff',300:'#8eaeff',400:'#5b82ff',500:'#3357ff',600:'#1f3bf5',700:'#1a2fd1',800:'#1a2aa7',900:'#1d2a82' },
      tile: { 500:'#e85a1a', 600:'#c9470c' },
      acoustic: { 500:'#0fa36b', 600:'#0a8355' }
    },
    fontFamily: { sans: ['Inter','system-ui','sans-serif'] }
  }}
};
</script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<style>
${styles}
</style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
<div id="root">
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto"></div>
      <p class="mt-4 text-slate-600">Loading United Learn…</p>
      <p class="mt-2 text-xs text-slate-400">First load compiles in-browser — may take 5–10 seconds.</p>
    </div>
  </div>
</div>
<script>
${config}
</script>
<script>
${content}
</script>
<script type="text/babel" data-presets="react">
${appjs}
</script>
</body>
</html>
`;

const out = path.join(ROOT, 'unitile-learn-standalone.html');
fs.writeFileSync(out, html);
const mb = (fs.statSync(out).size / 1024 / 1024).toFixed(2);
console.log('Wrote', out, '(' + mb + ' MB)');
