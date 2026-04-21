// ============================================================
// United Learn — single-page React LMS backed by Supabase.
// All persistence is Postgres + Auth + Storage.  See deploy.md.
// ============================================================

const { useState, useEffect, useMemo, useRef, createContext, useContext, useCallback } = React;

// ---------- Utilities ----------
const uid = () => Math.random().toString(36).slice(2, 10);
const cx = (...a) => a.filter(Boolean).join(' ');

// ---------- Supabase client ----------
const CFG = window.UNITED_LEARN_CONFIG || {};
const supa = (window.supabase && CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY)
  ? window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY)
  : null;

// ---------- Hydration from Postgres → UI-shaped state ----------
// The UI components (written pre-Supabase) expect camelCase keys, so we
// map snake_case DB rows into the legacy shape here, in one place.
async function loadCatalog(myId, isAdmin) {
  const q = (t, order) => order ? supa.from(t).select('*').order(order) : supa.from(t).select('*');
  const [profiles, courses, lessons, quizzes, resources, capstones, capQ, trainers, assigns, pLessons, pQuiz, pCaps, anns] = await Promise.all([
    isAdmin ? q('profiles') : supa.from('profiles').select('*').eq('id', myId),
    q('courses', 'order'),
    q('lessons', 'order'),
    q('quiz_questions', 'order'),
    q('resources', 'order'),
    q('capstones'),
    q('capstone_questions', 'order'),
    q('trainers'),
    q('assignments'),
    q('progress_lessons'),
    q('progress_quiz_scores'),
    q('progress_capstones'),
    supa.from('announcements').select('*').order('posted_at', { ascending: false })
  ]);
  const err = [profiles, courses, lessons, quizzes, resources, capstones, capQ, trainers, assigns, pLessons, pQuiz, pCaps, anns].find(r => r.error);
  if (err && err.error) throw new Error('loadCatalog: ' + err.error.message);

  const rowsBy = (arr, key) => (arr || []).filter(r => r);
  const progressForUser = (userId) => ({
    lessonsDone: Object.fromEntries((pLessons.data || []).filter(p => p.user_id === userId).map(p => [`${p.course_id}::${p.lesson_id}`, p.done_at])),
    quizScores:  Object.fromEntries((pQuiz.data    || []).filter(p => p.user_id === userId).map(p => [p.course_id, p.score])),
    capstoneScores: Object.fromEntries((pCaps.data || []).filter(p => p.user_id === userId).map(p => [p.capstone_id, p.score])),
    certificates: (pCaps.data || []).filter(p => p.user_id === userId && p.certificate_issued)
      .map(p => ({ id: p.capstone_id, score: p.score, earnedAt: p.earned_at }))
  });

  const users = (profiles.data || []).map(u => ({ ...u, progress: progressForUser(u.id) }));

  const hydratedCourses = (courses.data || []).map(c => ({
    id: c.id, division: c.division, order: c.order, title: c.title, summary: c.summary,
    thumbnail: c.thumbnail, trainerId: c.trainer_id, passingScore: c.passing_score,
    estimatedMinutes: c.estimated_minutes, accessRoles: c.access_roles || ['all'],
    matchData: c.match_data, hotspotData: c.hotspot_data,
    lessons: (lessons.data || []).filter(l => l.course_id === c.id).map(l => ({
      id: l.id, title: l.title, type: l.type, body: l.body, cards: l.cards
    })),
    quiz: (quizzes.data || []).filter(q => q.course_id === c.id).map(q => ({
      _dbId: q.id, q: q.q, type: q.type, options: q.options, correct: q.correct, explain: q.explain
    })),
    resources: (resources.data || []).filter(r => r.course_id === c.id).map(r => ({
      title: r.title, file: r.file_url, kind: r.kind, group: r.group_name
    }))
  }));

  const hydratedCapstones = (capstones.data || []).map(c => ({
    id: c.id, division: c.division, title: c.title, summary: c.summary, passingScore: c.passing_score,
    questions: (capQ.data || []).filter(q => q.capstone_id === c.id).map(q => ({
      q: q.q, type: q.type, options: q.options, correct: q.correct
    }))
  }));

  return {
    users,
    trainers: trainers.data || [],
    courses: hydratedCourses,
    capstones: hydratedCapstones,
    assignments: (assigns.data || []).map(a => ({ id: a.id, courseId: a.course_id, userId: a.user_id, assignedAt: a.assigned_at })),
    announcements: (anns.data || []).map(a => ({ id: a.id, msg: a.message, audience: a.audience, postedAt: a.posted_at })),
    divisions: window.SEED_DIVISIONS,
    designations: window.SEED_DESIGNATIONS
  };
}

// ---------- App State Context ----------
const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);

function AppProvider({ children }) {
  const [state, setState] = useState({ loading: true, session: null, profile: null, catalog: null, error: null });

  const refresh = useCallback(async () => {
    const { data: sess } = await supa.auth.getSession();
    const session = sess.session;
    if (!session) { setState(s => ({ ...s, loading: false, session: null, profile: null, catalog: null })); return; }
    try {
      const { data: profile, error: pErr } = await supa.from('profiles').select('*').eq('id', session.user.id).single();
      if (pErr) throw pErr;
      const catalog = await loadCatalog(session.user.id, profile.role === 'admin');
      setState({ loading: false, session, profile, catalog, error: null });
    } catch (e) {
      setState(s => ({ ...s, loading: false, error: e.message }));
    }
  }, []);

  useEffect(() => {
    if (!supa) {
      setState({ loading: false, session: null, profile: null, catalog: null,
        error: 'Supabase is not configured. Edit config.js (see config.example.js) and reload.' });
      return;
    }
    refresh();
    const { data: sub } = supa.auth.onAuthStateChange(() => { refresh(); });
    return () => sub?.subscription?.unsubscribe?.();
  }, [refresh]);

  const currentUser = () => {
    if (!state.profile) return null;
    const me = state.catalog?.users?.find(u => u.id === state.profile.id);
    return me || { ...state.profile, progress: { lessonsDone: {}, quizScores: {}, capstoneScores: {}, certificates: [] } };
  };

  const catalog = state.catalog || { users: [], trainers: [], courses: [], capstones: [], assignments: [], announcements: [], divisions: window.SEED_DIVISIONS, designations: window.SEED_DESIGNATIONS };
  const exposedState = { ...catalog };

  const api = useMemo(() => ({
    state: exposedState,
    currentUser,
    async login(email, password) {
      const { data, error } = await supa.auth.signInWithPassword({ email, password });
      if (error) return { ok: false, msg: error.message };
      await refresh();
      return { ok: true, user: data.user };
    },
    async logout() { await supa.auth.signOut(); await refresh(); },
    async signup(data) {
      if (!/@united-group\.in$/i.test(data.email))
        return { ok: false, msg: 'Email must end with @united-group.in' };
      const { error } = await supa.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: {
          name: data.name, designation: data.designation,
          division: data.division, unit: data.unit, role: 'learner'
        }}
      });
      if (error) return { ok: false, msg: error.message };
      // Sign in immediately (works if email confirmation is off in Supabase).
      const r = await supa.auth.signInWithPassword({ email: data.email, password: data.password });
      if (r.error) return { ok: true, needsConfirmation: true };
      await refresh();
      return { ok: true };
    },
    async updateUser(userId, patch) {
      const map = { name:'name', designation:'designation', unit:'unit', division:'division', role:'role' };
      const row = {}; Object.keys(patch).forEach(k => { if (map[k]) row[map[k]] = patch[k]; });
      if (Object.keys(row).length) await supa.from('profiles').update(row).eq('id', userId);
      await refresh();
    },
    async deleteUser(userId) {
      // auth.users removal requires the service_role key. We just remove
      // the profile row here; a scheduled cleanup on the server can purge auth.
      await supa.from('profiles').delete().eq('id', userId);
      await refresh();
    },
    async recordLessonDone(courseId, lessonId) {
      const uid2 = state.session?.user?.id; if (!uid2) return;
      await supa.from('progress_lessons').upsert({ user_id: uid2, course_id: courseId, lesson_id: lessonId, done_at: new Date().toISOString() });
      await refresh();
    },
    async recordQuizScore(courseId, scorePct) {
      const uid2 = state.session?.user?.id; if (!uid2) return;
      const prev = catalog.users.find(u => u.id === uid2)?.progress?.quizScores?.[courseId] || 0;
      const max = Math.max(prev, scorePct);
      await supa.from('progress_quiz_scores').upsert({ user_id: uid2, course_id: courseId, score: max, updated_at: new Date().toISOString() });
      await refresh();
    },
    async recordCapstoneScore(capstoneId, scorePct) {
      const uid2 = state.session?.user?.id; if (!uid2) return;
      const prev = catalog.users.find(u => u.id === uid2)?.progress?.capstoneScores?.[capstoneId] || 0;
      const max = Math.max(prev, scorePct);
      await supa.from('progress_capstones').upsert({
        user_id: uid2, capstone_id: capstoneId, score: max,
        certificate_issued: max >= 75,
        earned_at: new Date().toISOString()
      });
      await refresh();
    },
    // ---- Admin course/module management ----
    async addCourse(course) {
      const nextOrder = (catalog.courses?.length || 0) + 1;
      await supa.from('courses').insert({
        id: course.id || uid(), division: course.division, order: course.order || nextOrder,
        title: course.title, summary: course.summary, thumbnail: course.thumbnail,
        passing_score: course.passingScore, estimated_minutes: course.estimatedMinutes,
        access_roles: course.accessRoles || ['all']
      });
      await refresh();
    },
    async updateCourse(courseId, patch) {
      const map = { title:'title', summary:'summary', division:'division', thumbnail:'thumbnail', trainerId:'trainer_id', passingScore:'passing_score', estimatedMinutes:'estimated_minutes', accessRoles:'access_roles', order:'order' };
      const row = {}; Object.keys(patch).forEach(k => { if (map[k]) row[map[k]] = patch[k]; });
      if (Object.keys(row).length) await supa.from('courses').update(row).eq('id', courseId);
      await refresh();
    },
    async deleteCourse(courseId) { await supa.from('courses').delete().eq('id', courseId); await refresh(); },
    async addLesson(courseId, lesson) {
      const order = (catalog.courses.find(c => c.id === courseId)?.lessons?.length || 0) + 1;
      await supa.from('lessons').insert({
        id: lesson.id || uid(), course_id: courseId, order, title: lesson.title,
        type: lesson.type || 'reading', body: lesson.body || null, cards: lesson.cards || null
      });
      await refresh();
    },
    async updateLesson(courseId, lessonId, patch) {
      const row = {};
      ['title','type','body','cards'].forEach(k => { if (patch[k] !== undefined) row[k] = patch[k]; });
      if (Object.keys(row).length) await supa.from('lessons').update(row).eq('id', lessonId);
      await refresh();
    },
    async deleteLesson(courseId, lessonId) { await supa.from('lessons').delete().eq('id', lessonId); await refresh(); },
    async addQuizQuestion(courseId, q) {
      const next = (catalog.courses.find(c => c.id === courseId)?.quiz?.length || 0) + 1;
      await supa.from('quiz_questions').insert({
        course_id: courseId, order: next, q: q.q, type: q.type || 'mcq',
        options: q.options, correct: q.correct, explain: q.explain || null
      });
      await refresh();
    },
    async deleteQuizQuestion(courseId, idx) {
      const q = catalog.courses.find(c => c.id === courseId)?.quiz?.[idx];
      if (q?._dbId) await supa.from('quiz_questions').delete().eq('id', q._dbId);
      await refresh();
    },
    // ---- Trainers ----
    async addTrainer(trainer)        { await supa.from('trainers').insert({ id: 't' + uid(), ...trainer }); await refresh(); },
    async updateTrainer(id, patch)   { await supa.from('trainers').update(patch).eq('id', id); await refresh(); },
    async deleteTrainer(id)          { await supa.from('trainers').delete().eq('id', id); await refresh(); },
    // ---- Assignments & Access control ----
    async assignCourseToUser(courseId, userIds) {
      await supa.from('assignments').delete().eq('course_id', courseId);
      if (userIds.length) await supa.from('assignments').insert(userIds.map(u => ({ course_id: courseId, user_id: u })));
      await refresh();
    },
    async unassignCourse(courseId, userId) {
      await supa.from('assignments').delete().eq('course_id', courseId).eq('user_id', userId);
      await refresh();
    },
    // ---- Announcements ----
    async postAnnouncement(msg, audience) {
      await supa.from('announcements').insert({ message: msg, audience });
      await refresh();
    },
    async deleteAnnouncement(id) { await supa.from('announcements').delete().eq('id', id); await refresh(); },
    // ---- Helpers ----
    isVisibleToUser(course, user) {
      if (!user) return false;
      if (user.role === 'admin') return true;
      if (course.division && user.division !== 'both' && course.division !== 'both' && course.division !== user.division) return false;
      if (course.accessRoles && course.accessRoles.length && !course.accessRoles.includes('all')) {
        if (!course.accessRoles.includes(user.designation)) return false;
      }
      const assigned = (catalog.assignments || []).some(a => a.userId === user.id && a.courseId === course.id);
      const open = !course.accessRoles || course.accessRoles.includes('all');
      return open || assigned;
    }
  }), [state, refresh]);

  if (state.loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto"></div>
        <p className="mt-4 text-slate-600">Loading United Learn…</p>
      </div>
    </div>;
  }
  if (state.error) {
    return <div className="flex items-center justify-center h-screen p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl border-2 border-red-300 p-6">
        <div className="text-3xl mb-2">⚠️</div>
        <div className="font-bold text-red-700">Configuration error</div>
        <p className="text-slate-700 mt-2 text-sm">{state.error}</p>
        <p className="text-slate-500 mt-3 text-xs">See <code>config.example.js</code> and <code>deploy.md</code>.</p>
      </div>
    </div>;
  }
  return <AppCtx.Provider value={api}>{children}</AppCtx.Provider>;
}

// ---------- Tiny router (hash-based) ----------
function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash.slice(1) || '/');
  useEffect(() => {
    const on = () => setHash(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const nav = (to) => { window.location.hash = to; };
  return [hash, nav];
}

// ---------- Iconography (inline SVG) ----------
const Icon = ({ name, className = 'w-5 h-5' }) => {
  const paths = {
    dashboard: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l9-9 9 9M5 10v10h4v-6h6v6h4V10"/>,
    book: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 4.5A2.5 2.5 0 016.5 2H20v18H6.5a2.5 2.5 0 000 5H20"/>,
    user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 14a4 4 0 10-8 0m12 6a8 8 0 10-16 0"/>,
    users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20v-2a4 4 0 00-3-3.9M9 20v-2a4 4 0 013-3.9M9 12a4 4 0 110-8 4 4 0 010 8zm8 0a3 3 0 100-6 3 3 0 000 6z"/>,
    shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4z"/>,
    logout: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l-5-5 5-5M5 12h12"/>,
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4v16M4 12h16"/>,
    edit: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.2 3.8a2 2 0 112.8 2.8l-12 12L3 20l1.4-3L16 5.4"/>,
    trash: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M6 6l1 14a2 2 0 002 2h6a2 2 0 002-2l1-14"/>,
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 13l4 4L19 7"/>,
    chevron: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 6l6 6-6 6"/>,
    medal: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 15l-4 6 4-2 4 2-4-6zm0 0a6 6 0 100-12 6 6 0 000 12z"/>,
    megaphone: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 11v2a2 2 0 002 2h2l6 4V5L7 9H5a2 2 0 00-2 2zm17-6v14"/>,
    sparkles: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 3v4M3 5h4M19 13v4m-2-2h4M14 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z"/>,
    upload: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3v12m0-12l-4 4m4-4l4 4M5 21h14"/>
  };
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {paths[name] || null}
    </svg>
  );
};

// ============================================================
// AUTH PAGES
// ============================================================
function LandingPage({ nav }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-brand-50 to-white">
      <header className="px-6 md:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white flex items-center justify-center font-bold">UL</div>
          <div>
            <div className="font-bold text-lg">United Learn</div>
            <div className="text-xs text-slate-500 -mt-0.5">The United Group learning platform</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => nav('/login')} className="px-4 py-2 rounded-lg text-brand-700 hover:bg-brand-100 font-medium">Login</button>
          <button onClick={() => nav('/signup')} className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium">Sign up</button>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold mb-4">
          <Icon name="sparkles" className="w-3.5 h-3.5"/> AI-powered learning for Unitile & UniVicoustic
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Master our products.<br /><span className="text-brand-700">Sell with confidence.</span>
        </h1>
        <p className="text-lg text-slate-600 mt-5 max-w-2xl mx-auto">A single platform where every United Group employee gets role-matched training on Unitile RAF, UFlex Ceiling and UniVicoustic acoustic systems — with AI-generated quizzes, hands-on interactions, and certificates.</p>
        <div className="flex flex-wrap justify-center gap-3 mt-7">
          <button onClick={() => nav('/signup')} className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-lg shadow-brand-600/30">Create account</button>
          <button onClick={() => nav('/login')} className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-brand-400 font-semibold">I already have one</button>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-14 grid md:grid-cols-3 gap-5">
        {[
          { t: 'Two divisions, one roof', d: 'Unitile RAF + UniVicoustic acoustics — each with its own catalog, SOPs and assessments.', emoji: '🏢' },
          { t: 'Interactive, not passive', d: 'Flashcards, drag-and-match, hotspots, scored quizzes and capstone certificates.', emoji: '🎯' },
          { t: 'Admin-configurable', d: 'Upload any PDF module — AI drafts a quiz. Assign learners, add trainers, control access.', emoji: '🛠️' }
        ].map(f => (
          <div key={f.t} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">{f.emoji}</div>
            <div className="font-semibold text-slate-900">{f.t}</div>
            <div className="text-sm text-slate-600 mt-1">{f.d}</div>
          </div>
        ))}
      </section>
      <footer className="text-center text-xs text-slate-500 py-6 border-t">
        © United Group · Unitile · UniVicoustic
      </footer>
    </div>
  );
}

function LoginPage({ nav }) {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    const r = await login(email, password);
    setBusy(false);
    if (!r.ok) { setErr(r.msg); return; }
    // The AppRoot route guard will redirect to /admin or /learn based on role.
  };
  return (
    <AuthShell title="Welcome back" subtitle="Log in to continue your learning journey.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email"><input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@united-group.in" required /></Field>
        <Field label="Password"><input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} required /></Field>
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button className="btn-primary w-full" disabled={busy}>{busy ? 'Signing in…' : 'Log in'}</button>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <button type="button" onClick={() => nav('/signup')} className="hover:underline">New here? Create account</button>
          <button type="button" onClick={() => nav('/')} className="hover:underline">Back to home</button>
        </div>
      </form>
    </AuthShell>
  );
}

function SignupPage({ nav }) {
  const { signup, state } = useApp();
  const [form, setForm] = useState({ name: '', email: '', password: '', designation: state.designations[0], customDesignation: '', division: 'unitile', unit: '' });
  const [err, setErr] = useState('');
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { setErr('Password must be at least 6 characters.'); return; }
    if (form.designation === 'Other' && !form.customDesignation.trim()) { setErr('Please enter your designation.'); return; }
    const finalDesignation = form.designation === 'Other' ? form.customDesignation.trim() : form.designation;
    const { customDesignation, ...rest } = form;
    setBusy(true); setErr('');
    const r = await signup({ ...rest, designation: finalDesignation });
    setBusy(false);
    if (!r.ok) { setErr(r.msg); return; }
    if (r.needsConfirmation) { alert('Account created. Check your email to confirm, then sign in.'); nav('/login'); return; }
    // Signed in — guard will route to /learn.
  };
  return (
    <AuthShell title="Join United Learn" subtitle="Create your account to access training for your division.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full name"><input className="input" value={form.name} onChange={e => up('name', e.target.value)} required /></Field>
        <Field label="United Group email" help="Must end with @united-group.in"><input type="email" className="input" value={form.email} onChange={e => up('email', e.target.value)} placeholder="you@united-group.in" required /></Field>
        <Field label="Password"><input type="password" className="input" value={form.password} onChange={e => up('password', e.target.value)} required minLength={6} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Business division" help="Pick 'Both' if you work across Unitile and UniVicoustic.">
            <select className="input" value={form.division} onChange={e => up('division', e.target.value)}>
              {state.divisions.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              <option value="both">Both (Unitile & UniVicoustic)</option>
            </select>
          </Field>
          <Field label="Unit / Location"><input className="input" value={form.unit} onChange={e => up('unit', e.target.value)} placeholder="e.g. Mumbai HQ" required /></Field>
        </div>
        <Field label="Designation">
          <select className="input" value={form.designation} onChange={e => up('designation', e.target.value)}>
            {state.designations.map(d => <option key={d} value={d}>{d}</option>)}
            <option value="Other">Other (specify below)</option>
          </select>
        </Field>
        {form.designation === 'Other' && (
          <Field label="Your designation">
            <input className="input" value={form.customDesignation} onChange={e => up('customDesignation', e.target.value)} placeholder="Type your role..." required />
          </Field>
        )}
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button className="btn-primary w-full" disabled={busy}>{busy ? 'Creating…' : 'Create account'}</button>
        <div className="text-sm text-slate-500 text-center">
          <button type="button" onClick={() => nav('/login')} className="hover:underline">Already a member? Log in</button>
        </div>
      </form>
    </AuthShell>
  );
}

function AuthShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-brand-700 via-brand-800 to-slate-900 text-white">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center font-bold">UL</div>
            <div>
              <div className="font-bold text-xl">United Learn</div>
              <div className="text-xs text-white/70">Unitile · UniVicoustic</div>
            </div>
          </div>
          <h2 className="mt-20 text-4xl font-extrabold leading-tight">Product mastery,<br/>delivered interactively.</h2>
          <p className="mt-4 text-white/80 max-w-md">From raised-access-floor installation standards to acoustic NRC interpretation — everything in one trainable experience.</p>
        </div>
        <div className="flex gap-6 text-sm text-white/80">
          <div><div className="text-2xl font-bold text-white">12</div>Courses</div>
          <div><div className="text-2xl font-bold text-white">70+</div>Lessons</div>
          <div><div className="text-2xl font-bold text-white">200+</div>Assessment items</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="text-slate-500 mt-1">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, help, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      {children}
      {help && <span className="block text-xs text-slate-500 mt-1">{help}</span>}
    </label>
  );
}

// ============================================================
// LEARNER PORTAL
// ============================================================
function LearnerShell({ nav, hash, children }) {
  const app = useApp();
  const u = app.currentUser();
  const menu = [
    { id: '/learn', label: 'Dashboard', icon: 'dashboard' },
    { id: '/learn/catalog', label: 'Course catalog', icon: 'book' },
    { id: '/learn/certificates', label: 'My certificates', icon: 'medal' },
    { id: '/learn/profile', label: 'My profile', icon: 'user' }
  ];
  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        <div className="p-5 border-b">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold">UL</div>
            <div>
              <div className="font-bold text-slate-900 text-sm">United Learn</div>
              <div className="text-xs text-slate-500">Learner</div>
            </div>
          </div>
        </div>
        <nav className="p-3 space-y-1 flex-1">
          {menu.map(m => (
            <button key={m.id} onClick={() => nav(m.id)} className={cx('w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left', hash === m.id ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-700 hover:bg-slate-100')}>
              <Icon name={m.icon} className="w-4 h-4"/>{m.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t">
          <div className="px-3 py-2 text-xs text-slate-500">
            <div className="font-medium text-slate-700">{u?.name}</div>
            <div>{u?.designation}</div>
            <div className="capitalize">{u?.division}</div>
          </div>
          <button onClick={() => { app.logout(); nav('/'); }} className="w-full mt-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100">
            <Icon name="logout" className="w-4 h-4"/>Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

function LearnerDashboard({ nav }) {
  const app = useApp();
  const u = app.currentUser();
  const visibleCourses = app.state.courses.filter(c => app.isVisibleToUser(c, u)).sort((a,b) => a.order - b.order);
  const myDivCourses = u.division === 'both'
    ? visibleCourses
    : visibleCourses.filter(c => c.division === u.division || c.division === 'both');
  const totalLessons = myDivCourses.reduce((s, c) => s + c.lessons.length, 0);
  const doneLessons = Object.keys(u.progress.lessonsDone).filter(k => myDivCourses.some(c => k.startsWith(c.id + '::'))).length;
  const totalCourses = myDivCourses.length;
  const doneCourses = myDivCourses.filter(c => (u.progress.quizScores[c.id] || 0) >= c.passingScore).length;
  const myCapstones = u.division === 'both'
    ? app.state.capstones
    : app.state.capstones.filter(c => c.division === u.division);
  const totalCapstoneScore = myCapstones.length
    ? Math.round(myCapstones.reduce((s, c) => s + (u.progress.capstoneScores[c.id] || 0), 0) / myCapstones.length)
    : 0;
  const announcements = app.state.announcements.filter(a => a.audience === 'all' || a.audience === u.division || (u.division === 'both' && (a.audience === 'unitile' || a.audience === 'univicoustic'))).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Hi {u.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-600 mt-1">Your <b className="capitalize">{u.division}</b> learning track · {u.designation} · {u.unit}</p>
        </div>
        <div className="flex gap-3 text-sm">
          <StatCard label="Courses completed" value={`${doneCourses}/${totalCourses}`} color="emerald"/>
          <StatCard label="Lessons done" value={`${doneLessons}/${totalLessons}`} color="brand"/>
          <StatCard label={u.division === 'both' ? 'Capstones avg' : 'Capstone'} value={totalCapstoneScore ? `${totalCapstoneScore}%` : 'Not yet'} color={totalCapstoneScore >= 75 ? 'emerald' : 'amber'}/>
        </div>
      </div>

      {announcements.length > 0 && (
        <div className="mt-8">
          <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><Icon name="megaphone" className="w-4 h-4"/>Announcements</h2>
          <div className="space-y-2">
            {announcements.map(a => (
              <div key={a.id} className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
                <div>{a.msg}</div>
                <div className="text-xs text-amber-700 mt-1">{new Date(a.postedAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 space-y-8">
        {(u.division === 'both' ? ['unitile', 'univicoustic'] : [u.division]).map(divId => {
          const div = app.state.divisions.find(d => d.id === divId);
          const divCourses = myDivCourses.filter(c => c.division === divId || c.division === 'both').sort((a, b) => a.order - b.order);
          if (!divCourses.length) return null;
          const passed = divCourses.filter(c => (u.progress.quizScores[c.id] || 0) >= c.passingScore).length;
          return (
            <section key={divId}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cx('w-1.5 h-8 rounded-full', divId === 'unitile' ? 'bg-tile-500' : 'bg-acoustic-500')}/>
                  <div>
                    <h2 className="font-bold text-lg text-slate-900">{div?.name}</h2>
                    <div className="text-xs text-slate-500">{div?.tagline} · {passed}/{divCourses.length} courses complete</div>
                  </div>
                </div>
                <button onClick={() => nav('/learn/catalog')} className="text-sm text-brand-700 hover:underline">See all</button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                {divCourses.map(c => <CourseCard key={c.id} course={c} user={u} nav={nav}/>)}
              </div>
            </section>
          );
        })}
      </div>

      {myCapstones.length > 0 && (
        <div className="mt-10 space-y-4">
          {myCapstones.map(cap => {
            const sc = u.progress.capstoneScores[cap.id] || 0;
            return (
              <div key={cap.id} className="p-6 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-xs uppercase tracking-wide opacity-80">Earn your certificate</div>
                  <div className="text-2xl font-bold mt-1">{cap.title}</div>
                  <div className="text-sm opacity-90 mt-1">{cap.summary}</div>
                </div>
                <button onClick={() => nav(`/learn/capstone/${cap.id}`)} className="px-5 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50">
                  {sc >= 75 ? 'Retake' : sc > 0 ? 'Try again' : 'Start assessment'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color = 'brand' }) {
  const colors = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200'
  };
  return (
    <div className={cx('px-4 py-3 rounded-xl border', colors[color])}>
      <div className="text-xs font-medium opacity-80">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}

function CourseCard({ course, user, nav }) {
  const total = course.lessons.length;
  const done = course.lessons.filter(l => user.progress.lessonsDone[`${course.id}::${l.id}`]).length;
  const pct = total ? Math.round(done/total*100) : 0;
  const quizScore = user.progress.quizScores[course.id] || 0;
  const passed = quizScore >= course.passingScore;
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-brand-400 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="text-4xl">{course.thumbnail}</div>
        {passed && <span className="px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-700 font-semibold">Passed · {quizScore}%</span>}
      </div>
      <div className="mt-3 font-semibold text-slate-900 leading-snug">{course.title}</div>
      <div className="text-sm text-slate-600 mt-1 line-clamp-2">{course.summary}</div>
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span>{done}/{total} lessons</span><span>{pct}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-600 transition-all" style={{ width: `${pct}%` }}/>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end">
        <button onClick={() => nav(`/learn/course/${course.id}`)} className="text-sm font-semibold text-brand-700 hover:underline">
          {pct > 0 ? 'Continue →' : 'Start →'}
        </button>
      </div>
    </div>
  );
}

function CatalogPage({ nav }) {
  const app = useApp();
  const u = app.currentUser();
  const defaultFilter = u.division === 'both' ? 'all' : u.division;
  const [filter, setFilter] = useState(defaultFilter);
  const [search, setSearch] = useState('');
  const matches = (c) => !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.summary.toLowerCase().includes(search.toLowerCase());
  const accessible = app.state.courses.filter(c => app.isVisibleToUser(c, u));
  const divIds = filter === 'all' ? ['unitile', 'univicoustic'] : [filter];
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-extrabold">Course catalog</h1>
      <p className="text-slate-600 mt-1">All courses accessible to you.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <div className="inline-flex rounded-lg border border-slate-200 bg-white overflow-hidden">
          {['all', 'unitile', 'univicoustic'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={cx('px-4 py-2 text-sm capitalize', filter === f ? 'bg-brand-600 text-white' : 'hover:bg-slate-50')}>{f === 'all' ? 'All' : f}</button>
          ))}
        </div>
        <input className="input flex-1 min-w-[200px]" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)}/>
      </div>
      <div className="mt-6 space-y-8">
        {divIds.map(divId => {
          const div = app.state.divisions.find(d => d.id === divId);
          const courses = accessible.filter(c => (c.division === divId || c.division === 'both') && matches(c)).sort((a, b) => a.order - b.order);
          if (!courses.length) return null;
          return (
            <section key={divId}>
              <div className="flex items-center gap-3 mb-3">
                <div className={cx('w-1.5 h-8 rounded-full', divId === 'unitile' ? 'bg-tile-500' : 'bg-acoustic-500')}/>
                <div>
                  <h2 className="font-bold text-lg text-slate-900">{div?.name}</h2>
                  <div className="text-xs text-slate-500">{div?.tagline} · {courses.length} course{courses.length === 1 ? '' : 's'}</div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map(c => <CourseCard key={c.id} course={c} user={u} nav={nav}/>)}
              </div>
            </section>
          );
        })}
        {divIds.every(d => !accessible.some(c => (c.division === d || c.division === 'both') && matches(c))) && (
          <div className="text-center p-10 text-slate-500">No courses match.</div>
        )}
      </div>
    </div>
  );
}

function CertificatesPage() {
  const app = useApp();
  const u = app.currentUser();
  const certs = u.progress.certificates || [];
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-extrabold">My certificates</h1>
      <p className="text-slate-600 mt-1">Capstone completions and achievements.</p>
      {certs.length === 0 ? (
        <div className="mt-8 p-10 text-center bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500">
          No certificates yet. Complete a capstone assessment with ≥ 75% to earn one.
        </div>
      ) : (
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {certs.map(c => {
            const cap = app.state.capstones.find(x => x.id === c.id);
            if (!cap) return null;
            return (
              <div key={c.id} className="p-6 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-50 border-2 border-amber-300 relative">
                <div className="absolute top-4 right-4 text-4xl">🏆</div>
                <div className="text-xs font-semibold text-amber-800 uppercase">Certificate of Completion</div>
                <div className="text-xl font-bold text-slate-900 mt-2 pr-12">{cap.title}</div>
                <div className="mt-6 text-sm text-slate-700">Awarded to</div>
                <div className="text-lg font-bold text-slate-900">{u.name}</div>
                <div className="mt-3 flex justify-between text-xs text-slate-600">
                  <div>Score: <b className="text-emerald-700">{c.score}%</b></div>
                  <div>{new Date(c.earnedAt).toLocaleDateString()}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ProfilePage() {
  const app = useApp();
  const u = app.currentUser();
  const [form, setForm] = useState({ name: u.name, designation: u.designation, unit: u.unit });
  const [saved, setSaved] = useState(false);
  return (
    <div className="max-w-2xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-extrabold">My profile</h1>
      <div className="mt-6 p-6 bg-white rounded-2xl border">
        <Field label="Name"><input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}/></Field>
        <div className="mt-3"><Field label="Email"><input className="input bg-slate-50" value={u.email} disabled/></Field></div>
        <div className="mt-3"><Field label="Division"><input className="input bg-slate-50 capitalize" value={u.division} disabled/></Field></div>
        <div className="mt-3"><Field label="Designation">
          <select className="input" value={app.state.designations.includes(form.designation) ? form.designation : 'Other'}
            onChange={e => setForm(f => ({ ...f, designation: e.target.value === 'Other' ? (app.state.designations.includes(f.designation) ? '' : f.designation) : e.target.value }))}>
            {app.state.designations.map(d => <option key={d} value={d}>{d}</option>)}
            <option value="Other">Other (specify below)</option>
          </select>
        </Field></div>
        {!app.state.designations.includes(form.designation) && (
          <div className="mt-3"><Field label="Custom designation">
            <input className="input" value={form.designation} onChange={e => setForm(f => ({ ...f, designation: e.target.value }))} placeholder="Type your role..." />
          </Field></div>
        )}
        <div className="mt-3"><Field label="Unit"><input className="input" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}/></Field></div>
        <button onClick={() => { app.updateUser(u.id, form); setSaved(true); setTimeout(() => setSaved(false), 1500); }} className="btn-primary mt-4">Save changes</button>
        {saved && <span className="ml-3 text-emerald-600 text-sm">✓ Saved</span>}
      </div>
    </div>
  );
}

// ============================================================
// COURSE RUNNER — lessons, interactive, quizzes
// ============================================================
function CoursePage({ courseId, nav }) {
  const app = useApp();
  const u = app.currentUser();
  const course = app.state.courses.find(c => c.id === courseId);
  const [current, setCurrent] = useState(0);
  if (!course) return <div className="p-10">Course not found.</div>;
  const lesson = course.lessons[current];
  const progress = Math.round((current + 1) / course.lessons.length * 100);
  const done = (lid) => !!u.progress.lessonsDone[`${course.id}::${lid}`];

  const onLessonDone = () => {
    app.recordLessonDone(course.id, lesson.id);
    if (current < course.lessons.length - 1) setCurrent(current + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 bg-white border-b z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => nav('/learn')} className="text-slate-500 hover:text-brand-700">← Dashboard</button>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-slate-900 truncate">{course.title}</div>
            <div className="text-xs text-slate-500">{course.lessons.length} lessons</div>
          </div>
          <div className="hidden md:block w-48">
            <div className="text-xs text-slate-500 mb-1">Lesson {current + 1} of {course.lessons.length}</div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-brand-600" style={{ width: `${progress}%` }}/></div>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto grid md:grid-cols-[280px,1fr] gap-6 p-6">
        <aside className="md:sticky md:top-24 h-max space-y-3">
          <div className="bg-white border rounded-2xl p-3">
            <div className="text-xs uppercase font-semibold text-slate-500 px-2 pt-1 pb-2">Lessons</div>
            {course.lessons.map((l, i) => (
              <button key={l.id} onClick={() => setCurrent(i)}
                className={cx('w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-start gap-3',
                  i === current ? 'bg-brand-600 text-white' : 'hover:bg-slate-50')}>
                <div className={cx('w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold',
                  i === current ? 'bg-white/30 text-white' : done(l.id) ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600')}>
                  {done(l.id) ? '✓' : i + 1}
                </div>
                <span className="flex-1">{l.title}</span>
              </button>
            ))}
          </div>
          <ResourcePanel course={course}/>
        </aside>
        <main className="bg-white border rounded-2xl p-6 md:p-8">
          <LessonRenderer course={course} lesson={lesson} onDone={onLessonDone} key={lesson.id}/>
          <div className="mt-10 pt-6 border-t flex items-center justify-between">
            <button disabled={current === 0} onClick={() => setCurrent(current - 1)} className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50">← Previous</button>
            <button onClick={onLessonDone} className="px-5 py-2.5 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700">
              {current < course.lessons.length - 1 ? 'Mark done & continue →' : 'Finish course'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function ResourcePanel({ course }) {
  const [open, setOpen] = useState(true);
  const resources = course.resources || [];
  if (!resources.length) return null;
  const groups = resources.reduce((m, r) => {
    const g = r.group || 'Reference materials';
    (m[g] = m[g] || []).push(r);
    return m;
  }, {});
  const iconFor = (k) => ({ ppt: '📊', pdf: '📄', doc: '📝', xls: '📈', link: '🔗' }[k] || '📄');
  return (
    <div className="bg-white border rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-slate-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">📚</div>
          <span className="text-xs uppercase font-semibold text-slate-600">Reference materials</span>
          <span className="text-xs text-slate-400">({resources.length})</span>
        </div>
        <span className={cx('text-slate-400 transition-transform', open && 'rotate-90')}>▸</span>
      </button>
      {open && (
        <div className="border-t divide-y">
          {Object.entries(groups).map(([g, items]) => (
            <div key={g} className="px-2 py-2">
              {Object.keys(groups).length > 1 && <div className="px-2 pb-1 text-[10px] uppercase font-bold text-slate-400 tracking-wide">{g}</div>}
              <div className="space-y-0.5">
                {items.map((r, i) => (
                  <a key={i} href={r.kind === 'link' ? r.file : encodeURI(r.file)} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-2 px-2 py-2 rounded-lg hover:bg-brand-50 group">
                    <span className="text-base leading-none mt-0.5">{iconFor(r.kind)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-900 group-hover:text-brand-700 leading-snug">{r.title}</div>
                      <div className="text-[10px] text-slate-500 uppercase mt-0.5">{r.kind === 'link' ? 'External' : r.kind}</div>
                    </div>
                    <span className="text-slate-400 group-hover:text-brand-600 text-xs">↗</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LessonRenderer({ course, lesson, onDone }) {
  if (!lesson) return null;
  const t = lesson.type;
  if (t === 'reading') return <ReadingLesson lesson={lesson}/>;
  if (t === 'flashcards') return <FlashcardsLesson lesson={lesson}/>;
  if (t === 'match') return <MatchLesson course={course}/>;
  if (t === 'hotspot') return <HotspotLesson course={course}/>;
  if (t === 'quiz') return <QuizLesson course={course} onDone={onDone}/>;
  return <ReadingLesson lesson={lesson}/>;
}

function ReadingLesson({ lesson }) {
  return (
    <article>
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">{lesson.title}</h1>
      <div className="prose-lesson mt-4" dangerouslySetInnerHTML={{ __html: lesson.body || '' }}/>
    </article>
  );
}

function FlashcardsLesson({ lesson }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const cards = lesson.cards || [];
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">{lesson.title}</h1>
      <p className="text-slate-600 mt-1">Tap the card to reveal. Use arrows to navigate.</p>
      {cards.length > 0 && (
        <>
          <div className={cx('flashcard mt-6', flipped && 'flipped')} onClick={() => setFlipped(f => !f)}>
            <div className="flashcard-inner">
              <div className="flashcard-face bg-gradient-to-br from-brand-50 to-white border-2 border-brand-200">
                <div className="text-2xl font-bold text-brand-900 text-center">{cards[idx].front}</div>
              </div>
              <div className="flashcard-face flashcard-back bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200">
                <div className="text-slate-800 text-base">{cards[idx].back}</div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button onClick={() => { setIdx((idx - 1 + cards.length) % cards.length); setFlipped(false); }} className="px-4 py-2 rounded-lg border">← Prev</button>
            <div className="text-sm text-slate-600">{idx + 1} / {cards.length}</div>
            <button onClick={() => { setIdx((idx + 1) % cards.length); setFlipped(false); }} className="px-4 py-2 rounded-lg border">Next →</button>
          </div>
        </>
      )}
    </div>
  );
}

function MatchLesson({ course }) {
  const md = course.matchData || { pairs: [], instruction: 'Drag each left item to its match' };
  const [left] = useState(() => md.pairs.map(p => p.a));
  const [rightShuffled, setRightShuffled] = useState(() => [...md.pairs.map(p => p.b)].sort(() => Math.random() - 0.5));
  const [placed, setPlaced] = useState({});
  const [checked, setChecked] = useState(false);
  const onDrop = (leftItem, rightItem) => setPlaced(p => ({ ...p, [leftItem]: rightItem }));
  const check = () => setChecked(true);
  const reset = () => { setPlaced({}); setChecked(false); setRightShuffled([...md.pairs.map(p => p.b)].sort(() => Math.random() - 0.5)); };
  const isCorrect = (l) => md.pairs.find(p => p.a === l).b === placed[l];
  const score = Object.keys(placed).filter(isCorrect).length;
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Match it up</h1>
      <p className="text-slate-600 mt-1">{md.instruction}</p>
      <div className="grid md:grid-cols-2 gap-5 mt-6">
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Item</div>
          <div className="space-y-2">
            {left.map(l => {
              const val = placed[l];
              const correct = checked && val && isCorrect(l);
              const wrong = checked && val && !isCorrect(l);
              return (
                <div key={l} className="p-3 rounded-lg border-2 border-slate-200 bg-white flex items-center gap-3">
                  <div className="font-semibold flex-1">{l}</div>
                  <div className={cx('flex-1 min-h-[36px] px-3 py-1.5 rounded border-2 border-dashed text-sm',
                    val ? 'border-solid bg-slate-50' : 'border-slate-300 text-slate-400',
                    correct && 'bg-emerald-50 border-emerald-400 text-emerald-900',
                    wrong && 'bg-red-50 border-red-400 text-red-900')}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { const data = e.dataTransfer.getData('text'); onDrop(l, data); }}>
                    {val || 'Drop here'}
                  </div>
                  {val && <button onClick={() => setPlaced(p => { const n = { ...p }; delete n[l]; return n; })} className="text-slate-400 hover:text-red-500 text-xs">✕</button>}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Drag these</div>
          <div className="space-y-2">
            {rightShuffled.map(r => (
              <div key={r} draggable onDragStart={e => e.dataTransfer.setData('text', r)}
                className={cx('p-3 rounded-lg border-2 cursor-move bg-white hover:border-brand-400 active:opacity-50',
                  Object.values(placed).includes(r) ? 'opacity-40 line-through' : 'border-slate-200')}>
                {r}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        {!checked ? (
          <button onClick={check} className="btn-primary" disabled={Object.keys(placed).length < left.length}>Check answers</button>
        ) : (
          <>
            <div className={cx('px-3 py-2 rounded-lg font-semibold',
              score === left.length ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800')}>
              Score: {score} / {left.length}
            </div>
            <button onClick={reset} className="px-4 py-2 rounded-lg border">Try again</button>
          </>
        )}
      </div>
    </div>
  );
}

function HotspotLesson({ course }) {
  const hd = course.hotspotData;
  const [answers, setAnswers] = useState({});
  const [active, setActive] = useState(null);
  if (!hd) return <div className="text-slate-500">No hotspot data.</div>;
  const done = hd.spots.every(s => answers[s.id] !== undefined);
  const score = hd.spots.filter(s => answers[s.id] === s.correct).length;
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Identify the parts</h1>
      <p className="text-slate-600 mt-1">{hd.instruction}</p>
      <div className="relative mt-5 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-slate-300 aspect-[16/9] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-30">{hd.img}</div>
        {hd.spots.map(s => {
          const ans = answers[s.id];
          const stateCls = ans === undefined ? 'bg-brand-600'
            : ans === s.correct ? 'bg-emerald-500' : 'bg-red-500';
          return (
            <button key={s.id} onClick={() => setActive(s.id)}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              className={cx('absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full text-white font-bold text-sm hotspot-dot', stateCls)}>
              {s.id}
            </button>
          );
        })}
      </div>
      {active !== null && (
        <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          {(() => {
            const spot = hd.spots.find(s => s.id === active);
            return (
              <>
                <div className="font-semibold mb-2">Marker {active}: what is this?</div>
                <div className="flex gap-2 flex-wrap">
                  {spot.choices.map((c, i) => (
                    <button key={i} onClick={() => { setAnswers(a => ({ ...a, [active]: i })); setActive(null); }}
                      className="px-3 py-2 rounded-lg border bg-white hover:border-brand-400">{c}</button>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      )}
      {done && (
        <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
          <div className="font-bold text-emerald-900">You identified {score} of {hd.spots.length} correctly.</div>
          <button onClick={() => setAnswers({})} className="mt-2 text-sm text-emerald-700 hover:underline">Try again</button>
        </div>
      )}
    </div>
  );
}

function QuizLesson({ course, onDone }) {
  const app = useApp();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const questions = course.quiz || [];
  const score = submitted ? questions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0) : 0;
  const pct = submitted ? Math.round(score / questions.length * 100) : 0;
  const passed = pct >= (course.passingScore || 70);

  const submit = () => {
    setSubmitted(true);
    const p = questions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);
    const pp = Math.round(p / questions.length * 100);
    app.recordQuizScore(course.id, pp);
    if (pp >= (course.passingScore || 70)) { setConfetti(true); setTimeout(() => setConfetti(false), 2200); }
  };
  const retry = () => { setAnswers({}); setSubmitted(false); };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">{course.title} — Assessment</h1>
      <p className="text-slate-600 mt-1">{questions.length} questions · {course.passingScore}% to pass</p>
      {confetti && <Confetti/>}
      <div className="mt-6 space-y-4">
        {questions.map((q, i) => (
          <QuizQuestion key={i} q={q} idx={i} value={answers[i]}
            onChange={v => setAnswers(a => ({ ...a, [i]: v }))}
            submitted={submitted}/>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4">
        {!submitted ? (
          <button className="btn-primary" onClick={submit} disabled={Object.keys(answers).length < questions.length}>Submit assessment</button>
        ) : (
          <>
            <div className={cx('px-4 py-3 rounded-xl font-bold',
              passed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800')}>
              Score: {score} / {questions.length} ({pct}%) — {passed ? '✓ Passed' : 'Below pass mark — try again'}
            </div>
            <button onClick={retry} className="px-4 py-2 rounded-lg border">Retake</button>
            {passed && <button onClick={onDone} className="btn-primary">Continue →</button>}
          </>
        )}
      </div>
    </div>
  );
}

function QuizQuestion({ q, idx, value, onChange, submitted }) {
  const isMcq = q.type === 'mcq' || q.type === 'tf';
  const options = q.type === 'tf' ? ['True', 'False'] : q.options;
  return (
    <div className={cx('p-5 rounded-xl border-2 bg-white',
      submitted
        ? (value === q.correct ? 'border-emerald-300' : 'border-red-300')
        : 'border-slate-200')}>
      <div className="font-semibold mb-3"><span className="text-brand-700 mr-1">Q{idx + 1}.</span>{q.q}</div>
      <div className="space-y-2">
        {options.map((opt, i) => {
          const selected = value === i;
          const isRight = submitted && i === q.correct;
          const isWrongPick = submitted && selected && i !== q.correct;
          return (
            <button key={i} onClick={() => !submitted && onChange(i)} disabled={submitted}
              className={cx('w-full text-left px-3 py-2.5 rounded-lg border-2 flex items-center gap-2',
                !submitted && selected && 'border-brand-500 bg-brand-50',
                !submitted && !selected && 'border-slate-200 hover:border-brand-400',
                isRight && 'border-emerald-500 bg-emerald-50',
                isWrongPick && 'border-red-500 bg-red-50',
                submitted && !selected && !isRight && 'border-slate-200 opacity-60')}>
              <span className={cx('w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold',
                selected ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-300')}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {isRight && <span className="text-emerald-600 font-bold">✓</span>}
              {isWrongPick && <span className="text-red-600 font-bold">✗</span>}
            </button>
          );
        })}
      </div>
      {submitted && q.explain && (
        <div className="mt-3 text-sm p-3 rounded-lg bg-slate-50 text-slate-700 border border-slate-200">
          <b>Explanation:</b> {q.explain}
        </div>
      )}
    </div>
  );
}

function Confetti() {
  const colors = ['#1f3bf5', '#059669', '#ea580c', '#e11d48', '#7c3aed', '#eab308'];
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i, x: Math.random() * 100, dur: 1.5 + Math.random() * 1.5,
    delay: Math.random() * 0.4, color: colors[i % colors.length],
    rot: Math.random() * 360
  }));
  return (
    <div className="confetti">
      {pieces.map(p => (
        <span key={p.id} style={{
          position: 'absolute', top: '-10px', left: `${p.x}%`,
          width: 10, height: 14, background: p.color,
          transform: `rotate(${p.rot}deg)`,
          animation: `fall ${p.dur}s linear ${p.delay}s forwards`
        }}/>
      ))}
      <style>{`@keyframes fall { to { transform: translateY(110vh) rotate(720deg); } }`}</style>
    </div>
  );
}

// ---------- Capstone assessment ----------
function CapstonePage({ capstoneId, nav }) {
  const app = useApp();
  const u = app.currentUser();
  const capstone = app.state.capstones.find(c => c.id === capstoneId);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [confetti, setConfetti] = useState(false);
  if (!capstone) return <div className="p-10">Capstone not found.</div>;
  const qs = capstone.questions;
  const score = submitted ? qs.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0) : 0;
  const pct = submitted ? Math.round(score / qs.length * 100) : 0;
  const passed = pct >= capstone.passingScore;
  const submit = () => {
    setSubmitted(true);
    const p = qs.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);
    const pp = Math.round(p / qs.length * 100);
    app.recordCapstoneScore(capstone.id, pp);
    if (pp >= capstone.passingScore) { setConfetti(true); setTimeout(() => setConfetti(false), 3000); }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-emerald-50 p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => nav('/learn')} className="text-slate-500 hover:text-brand-700 text-sm">← Dashboard</button>
        <div className="mt-3 p-8 bg-white rounded-2xl border-2 border-brand-200 shadow-lg">
          <div className="text-xs font-bold text-brand-700 uppercase tracking-wide">Capstone Assessment</div>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">{capstone.title}</h1>
          <p className="text-slate-600 mt-2">{capstone.summary}</p>
          <p className="text-sm text-slate-500 mt-1">{qs.length} questions · pass at {capstone.passingScore}%</p>
        </div>
        {confetti && <Confetti/>}
        <div className="mt-6 space-y-4">
          {qs.map((q, i) => (
            <QuizQuestion key={i} q={q} idx={i} value={answers[i]} submitted={submitted}
              onChange={v => setAnswers(a => ({ ...a, [i]: v }))}/>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-4">
          {!submitted ? (
            <button className="btn-primary" onClick={submit} disabled={Object.keys(answers).length < qs.length}>Submit capstone</button>
          ) : (
            <div className={cx('p-4 rounded-xl font-bold w-full',
              passed ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300' : 'bg-amber-100 text-amber-800')}>
              {passed
                ? `🏆 Congratulations ${u.name}! You scored ${pct}% and earned the ${capstone.title} certificate.`
                : `You scored ${pct}%. Passing mark is ${capstone.passingScore}%. Review modules and try again.`}
              <div className="mt-3">
                <button onClick={() => nav(passed ? '/learn/certificates' : '/learn')} className="px-4 py-2 rounded-lg bg-white border font-semibold text-slate-800">
                  {passed ? 'View certificate →' : 'Back to dashboard'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ADMIN PORTAL
// ============================================================
function AdminShell({ nav, hash, children }) {
  const app = useApp();
  const u = app.currentUser();
  const menu = [
    { id: '/admin', label: 'Overview', icon: 'dashboard' },
    { id: '/admin/courses', label: 'Courses', icon: 'book' },
    { id: '/admin/trainers', label: 'Trainers', icon: 'users' },
    { id: '/admin/learners', label: 'Learners', icon: 'user' },
    { id: '/admin/access', label: 'Access control', icon: 'shield' },
    { id: '/admin/announcements', label: 'Announcements', icon: 'megaphone' },
    { id: '/admin/ai-quiz', label: 'AI Quiz Builder', icon: 'sparkles' }
  ];
  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-60 bg-slate-900 text-slate-100 flex flex-col sticky top-0 h-screen">
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold">UL</div>
            <div>
              <div className="font-bold text-sm">United Learn</div>
              <div className="text-xs text-brand-300">Admin console</div>
            </div>
          </div>
        </div>
        <nav className="p-3 space-y-1 flex-1">
          {menu.map(m => (
            <button key={m.id} onClick={() => nav(m.id)} className={cx('w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left',
              hash === m.id ? 'bg-brand-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800')}>
              <Icon name={m.icon} className="w-4 h-4"/>{m.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-800">
          <div className="px-3 py-2 text-xs text-slate-400">
            <div className="font-medium text-slate-200">{u?.name}</div>
            <div>{u?.email}</div>
          </div>
          <button onClick={() => { app.logout(); nav('/'); }} className="w-full mt-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800">
            <Icon name="logout" className="w-4 h-4"/>Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

function AdminOverview({ nav }) {
  const app = useApp();
  const learners = app.state.users.filter(u => u.role === 'learner');
  const activeLast7 = learners.filter(l => Object.values(l.progress.lessonsDone).some(ts => Date.now() - new Date(ts) < 7 * 86400000)).length;
  const totalCerts = learners.reduce((s, l) => s + (l.progress.certificates?.length || 0), 0);
  const avgCompletion = learners.length
    ? Math.round(learners.reduce((s, l) => {
        const total = app.state.courses.filter(c => c.division === l.division || c.division === 'both').reduce((x, c) => x + c.lessons.length, 0);
        const done = Object.keys(l.progress.lessonsDone).length;
        return s + (total ? (done / total) : 0);
      }, 0) / learners.length * 100)
    : 0;
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-extrabold">Admin overview</h1>
      <p className="text-slate-600 mt-1">Snapshot of everything happening across United Learn.</p>
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        <KpiCard icon="users" label="Total learners" value={learners.length} color="brand"/>
        <KpiCard icon="book" label="Active (7d)" value={activeLast7} color="emerald"/>
        <KpiCard icon="medal" label="Certificates issued" value={totalCerts} color="amber"/>
        <KpiCard icon="dashboard" label="Avg completion" value={`${avgCompletion}%`} color="violet"/>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white border rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Division split</h2>
            <button onClick={() => nav('/admin/learners')} className="text-sm text-brand-600 hover:underline">Manage learners →</button>
          </div>
          <div className="mt-4 space-y-3">
            {app.state.divisions.map(d => {
              const count = learners.filter(l => l.division === d.id).length;
              const pct = learners.length ? count / learners.length * 100 : 0;
              return (
                <div key={d.id}>
                  <div className="flex justify-between text-sm"><span className="font-medium">{d.name}</span><span>{count} learners</span></div>
                  <div className="h-2 bg-slate-100 rounded-full mt-1"><div className={cx('h-full rounded-full',
                    d.id === 'unitile' ? 'bg-tile-500' : 'bg-acoustic-500')} style={{ width: `${pct}%` }}/></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white border rounded-2xl p-5">
          <h2 className="font-semibold">Top performers</h2>
          <div className="mt-4 space-y-2">
            {[...learners].sort((a, b) => (b.progress.certificates?.length || 0) - (a.progress.certificates?.length || 0))
              .slice(0, 5).map(l => (
                <div key={l.id} className="flex items-center justify-between p-2 rounded hover:bg-slate-50">
                  <div>
                    <div className="font-medium text-sm">{l.name}</div>
                    <div className="text-xs text-slate-500 capitalize">{l.division} · {l.designation}</div>
                  </div>
                  <div className="text-sm"><span className="text-amber-600 font-bold">🏆 {l.progress.certificates?.length || 0}</span></div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white border rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Quick actions</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-3 mt-4">
          <button onClick={() => nav('/admin/courses')} className="p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-brand-400 hover:bg-brand-50 text-left">
            <div className="text-2xl">📘</div><div className="font-semibold mt-1">Add / edit courses</div>
            <div className="text-xs text-slate-500 mt-0.5">Create modules, lessons, quizzes</div>
          </button>
          <button onClick={() => nav('/admin/ai-quiz')} className="p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-brand-400 hover:bg-brand-50 text-left">
            <div className="text-2xl">🤖</div><div className="font-semibold mt-1">AI Quiz Builder</div>
            <div className="text-xs text-slate-500 mt-0.5">Paste training text, get a quiz</div>
          </button>
          <button onClick={() => nav('/admin/access')} className="p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-brand-400 hover:bg-brand-50 text-left">
            <div className="text-2xl">🔐</div><div className="font-semibold mt-1">Access control</div>
            <div className="text-xs text-slate-500 mt-0.5">Who can see what</div>
          </button>
          <button onClick={() => nav('/admin/announcements')} className="p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-brand-400 hover:bg-brand-50 text-left">
            <div className="text-2xl">📢</div><div className="font-semibold mt-1">Post announcement</div>
            <div className="text-xs text-slate-500 mt-0.5">Message learners</div>
          </button>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ icon, label, value, color = 'brand' }) {
  const c = { brand: 'bg-brand-50 text-brand-700', emerald: 'bg-emerald-50 text-emerald-700', amber: 'bg-amber-50 text-amber-700', violet: 'bg-violet-50 text-violet-700' }[color];
  return (
    <div className="bg-white border rounded-2xl p-5">
      <div className={cx('w-10 h-10 rounded-xl flex items-center justify-center', c)}><Icon name={icon}/></div>
      <div className="text-3xl font-extrabold mt-3">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}

function AdminCourses({ nav }) {
  const app = useApp();
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState('all');
  const visible = app.state.courses.filter(c => filter === 'all' || c.division === filter).sort((a, b) => a.order - b.order);
  const [showNew, setShowNew] = useState(false);

  if (editing) return <CourseEditor courseId={editing} onBack={() => setEditing(null)}/>;

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold">Courses</h1>
          <p className="text-slate-600 mt-1">{app.state.courses.length} courses across both divisions.</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn-primary flex items-center gap-2"><Icon name="plus" className="w-4 h-4"/>New course</button>
      </div>

      <div className="mt-5 flex gap-2 flex-wrap">
        {['all', 'unitile', 'univicoustic'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={cx('px-4 py-1.5 rounded-full text-sm capitalize',
            filter === f ? 'bg-slate-900 text-white' : 'bg-white border')}>{f === 'all' ? 'All divisions' : f}</button>
        ))}
      </div>

      <div className="mt-5 bg-white border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-600">
            <tr><th className="text-left p-3">Course</th><th className="p-3">Division</th><th className="p-3">Lessons</th><th className="p-3">Quiz Qs</th><th className="p-3">Trainer</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {visible.map(c => {
              const trainer = app.state.trainers.find(t => t.id === c.trainerId);
              return (
                <tr key={c.id} className="border-t hover:bg-slate-50">
                  <td className="p-3"><div className="font-medium flex items-center gap-2">{c.thumbnail} {c.title}</div><div className="text-xs text-slate-500">{c.summary}</div></td>
                  <td className="p-3 capitalize text-center">{c.division}</td>
                  <td className="p-3 text-center">{c.lessons.length}</td>
                  <td className="p-3 text-center">{c.quiz?.length || 0}</td>
                  <td className="p-3 text-center">{trainer?.name || '—'}</td>
                  <td className="p-3 text-right space-x-1 whitespace-nowrap">
                    <button onClick={() => setEditing(c.id)} className="px-3 py-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700 text-xs">Edit</button>
                    <button onClick={() => { if (confirm(`Delete "${c.title}"?`)) app.deleteCourse(c.id); }} className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs hover:bg-red-200">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showNew && <NewCourseModal onClose={() => setShowNew(false)} onCreated={(id) => { setShowNew(false); setEditing(id); }}/>}
    </div>
  );
}

function NewCourseModal({ onClose, onCreated }) {
  const app = useApp();
  const [form, setForm] = useState({ title: '', summary: '', division: 'unitile', thumbnail: '📘', passingScore: 70, estimatedMinutes: 30, accessRoles: ['all'] });
  const create = async () => {
    if (!form.title) return alert('Title required');
    const newId = uid();
    await app.addCourse({ ...form, id: newId, lessons: [], quiz: [] });
    onCreated(newId);
  };
  return (
    <Modal onClose={onClose} title="New course">
      <div className="space-y-3">
        <Field label="Title"><input className="input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}/></Field>
        <Field label="Summary"><textarea className="input h-20" value={form.summary} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}/></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Division">
            <select className="input" value={form.division} onChange={e => setForm(f => ({ ...f, division: e.target.value }))}>
              <option value="unitile">Unitile</option>
              <option value="univicoustic">UniVicoustic</option>
              <option value="both">Both</option>
            </select>
          </Field>
          <Field label="Thumbnail emoji"><input className="input" value={form.thumbnail} onChange={e => setForm(f => ({ ...f, thumbnail: e.target.value }))}/></Field>
          <Field label="Pass %"><input className="input" type="number" value={form.passingScore} onChange={e => setForm(f => ({ ...f, passingScore: +e.target.value }))}/></Field>
          <Field label="Est. minutes"><input className="input" type="number" value={form.estimatedMinutes} onChange={e => setForm(f => ({ ...f, estimatedMinutes: +e.target.value }))}/></Field>
        </div>
      </div>
      <div className="mt-4 flex gap-2 justify-end">
        <button onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
        <button onClick={create} className="btn-primary">Create</button>
      </div>
    </Modal>
  );
}

function CourseEditor({ courseId, onBack }) {
  const app = useApp();
  const course = app.state.courses.find(c => c.id === courseId);
  const [tab, setTab] = useState('lessons');
  if (!course) return <div>Not found</div>;
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <button onClick={onBack} className="text-slate-500 hover:text-brand-700 text-sm">← Courses</button>
      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-3">{course.thumbnail} {course.title}</h1>
          <p className="text-slate-600 mt-1">{course.summary}</p>
        </div>
      </div>
      <div className="mt-6 inline-flex bg-white border rounded-lg overflow-hidden">
        {['lessons', 'quiz', 'settings'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={cx('px-4 py-2 text-sm capitalize', tab === t ? 'bg-brand-600 text-white' : 'hover:bg-slate-50')}>{t}</button>
        ))}
      </div>
      <div className="mt-5">
        {tab === 'lessons' && <LessonsEditor course={course}/>}
        {tab === 'quiz' && <QuizEditor course={course}/>}
        {tab === 'settings' && <SettingsEditor course={course}/>}
      </div>
    </div>
  );
}

function LessonsEditor({ course }) {
  const app = useApp();
  const [edit, setEdit] = useState(null);
  return (
    <div className="bg-white border rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Lessons ({course.lessons.length})</h3>
        <button onClick={() => setEdit({ title: '', type: 'reading', body: '' })} className="btn-primary flex items-center gap-1"><Icon name="plus" className="w-4 h-4"/>Add lesson</button>
      </div>
      <div className="space-y-2">
        {course.lessons.map((l, i) => (
          <div key={l.id} className="p-3 rounded-lg border flex items-center gap-3 hover:bg-slate-50">
            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">{i + 1}</div>
            <div className="flex-1">
              <div className="font-medium">{l.title}</div>
              <div className="text-xs text-slate-500 capitalize">{l.type}</div>
            </div>
            <button onClick={() => setEdit(l)} className="px-2 py-1 text-xs rounded bg-slate-100 hover:bg-slate-200">Edit</button>
            <button onClick={() => { if (confirm('Delete?')) app.deleteLesson(course.id, l.id); }} className="px-2 py-1 text-xs rounded bg-red-50 text-red-700 hover:bg-red-100">Delete</button>
          </div>
        ))}
        {course.lessons.length === 0 && <div className="text-slate-400 text-sm text-center p-6">No lessons yet — add one to get started.</div>}
      </div>
      {edit && <LessonEditModal course={course} lesson={edit} onClose={() => setEdit(null)}/>}
    </div>
  );
}

function LessonEditModal({ course, lesson, onClose }) {
  const app = useApp();
  const [form, setForm] = useState({ ...lesson });
  const save = () => {
    if (!form.title) return alert('Title required');
    if (lesson.id) app.updateLesson(course.id, lesson.id, form);
    else app.addLesson(course.id, form);
    onClose();
  };
  return (
    <Modal onClose={onClose} title={lesson.id ? 'Edit lesson' : 'New lesson'} large>
      <div className="space-y-3">
        <Field label="Title"><input className="input" value={form.title || ''} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}/></Field>
        <Field label="Type">
          <select className="input" value={form.type || 'reading'} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
            <option value="reading">Reading</option>
            <option value="flashcards">Flashcards</option>
            <option value="match">Drag & match</option>
            <option value="hotspot">Hotspot</option>
            <option value="quiz">Quiz (uses course quiz)</option>
          </select>
        </Field>
        {form.type === 'reading' && (
          <Field label="HTML body (supports basic HTML, tables)">
            <textarea className="input h-48 font-mono text-xs" value={form.body || ''} onChange={e => setForm(f => ({ ...f, body: e.target.value }))}/>
          </Field>
        )}
        {form.type === 'flashcards' && (
          <FlashcardsEditor cards={form.cards || []} onChange={c => setForm(f => ({ ...f, cards: c }))}/>
        )}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
        <button onClick={save} className="btn-primary">Save</button>
      </div>
    </Modal>
  );
}

function FlashcardsEditor({ cards, onChange }) {
  const add = () => onChange([...cards, { front: '', back: '' }]);
  const upd = (i, k, v) => onChange(cards.map((c, idx) => idx === i ? { ...c, [k]: v } : c));
  const rem = (i) => onChange(cards.filter((_, idx) => idx !== i));
  return (
    <div>
      <label className="text-sm font-medium">Cards</label>
      <div className="space-y-2 mt-2">
        {cards.map((c, i) => (
          <div key={i} className="grid grid-cols-[1fr,1fr,auto] gap-2 items-start">
            <input className="input" placeholder="Front" value={c.front} onChange={e => upd(i, 'front', e.target.value)}/>
            <input className="input" placeholder="Back" value={c.back} onChange={e => upd(i, 'back', e.target.value)}/>
            <button onClick={() => rem(i)} className="px-2 py-2 text-red-600 hover:bg-red-50 rounded"><Icon name="trash" className="w-4 h-4"/></button>
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-2 text-sm text-brand-700 hover:underline">+ Add card</button>
    </div>
  );
}

function QuizEditor({ course }) {
  const app = useApp();
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ q: '', type: 'mcq', options: ['', '', '', ''], correct: 0, explain: '' });
  const add = () => {
    if (!draft.q) return;
    app.addQuizQuestion(course.id, { ...draft });
    setDraft({ q: '', type: 'mcq', options: ['', '', '', ''], correct: 0, explain: '' });
    setAdding(false);
  };
  return (
    <div className="bg-white border rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Quiz questions ({course.quiz?.length || 0})</h3>
        <button onClick={() => setAdding(true)} className="btn-primary flex items-center gap-1"><Icon name="plus" className="w-4 h-4"/>Add question</button>
      </div>
      <div className="space-y-2">
        {(course.quiz || []).map((q, i) => (
          <div key={i} className="p-3 rounded-lg border flex items-start gap-3">
            <div className="flex-1">
              <div className="font-medium text-sm"><span className="text-brand-700">Q{i+1}.</span> {q.q}</div>
              <div className="mt-1 text-xs text-slate-600 flex flex-wrap gap-2">
                {(q.type === 'tf' ? ['True', 'False'] : q.options).map((o, j) => (
                  <span key={j} className={cx('px-2 py-0.5 rounded', j === q.correct ? 'bg-emerald-100 text-emerald-800 font-semibold' : 'bg-slate-100 text-slate-600')}>{String.fromCharCode(65 + j)}. {o}</span>
                ))}
              </div>
            </div>
            <button onClick={() => { if (confirm('Delete?')) app.deleteQuizQuestion(course.id, i); }} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Icon name="trash" className="w-4 h-4"/></button>
          </div>
        ))}
      </div>
      {adding && (
        <Modal onClose={() => setAdding(false)} title="New question">
          <QuestionForm draft={draft} setDraft={setDraft}/>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setAdding(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
            <button onClick={add} className="btn-primary">Add question</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function QuestionForm({ draft, setDraft }) {
  return (
    <div className="space-y-3">
      <Field label="Question"><textarea className="input h-20" value={draft.q} onChange={e => setDraft({ ...draft, q: e.target.value })}/></Field>
      <Field label="Type">
        <select className="input" value={draft.type} onChange={e => {
          const type = e.target.value;
          setDraft({ ...draft, type, options: type === 'tf' ? ['True', 'False'] : (draft.options.length ? draft.options : ['','','','']) });
        }}>
          <option value="mcq">Multiple choice</option>
          <option value="tf">True / False</option>
        </select>
      </Field>
      {draft.type === 'mcq' && (
        <div>
          <label className="text-sm font-medium">Options (mark the correct one)</label>
          <div className="space-y-2 mt-2">
            {draft.options.map((o, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input type="radio" checked={draft.correct === i} onChange={() => setDraft({ ...draft, correct: i })}/>
                <input className="input flex-1" value={o} onChange={e => setDraft({ ...draft, options: draft.options.map((x, j) => j === i ? e.target.value : x) })}/>
              </div>
            ))}
          </div>
        </div>
      )}
      {draft.type === 'tf' && (
        <Field label="Correct answer">
          <select className="input" value={draft.correct} onChange={e => setDraft({ ...draft, correct: +e.target.value })}>
            <option value={0}>True</option>
            <option value={1}>False</option>
          </select>
        </Field>
      )}
      <Field label="Explanation (shown after submission)"><textarea className="input h-16" value={draft.explain} onChange={e => setDraft({ ...draft, explain: e.target.value })}/></Field>
    </div>
  );
}

function SettingsEditor({ course }) {
  const app = useApp();
  const [form, setForm] = useState({ ...course });
  return (
    <div className="bg-white border rounded-2xl p-4 space-y-3">
      <Field label="Title"><input className="input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}/></Field>
      <Field label="Summary"><textarea className="input h-20" value={form.summary} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}/></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Division">
          <select className="input" value={form.division} onChange={e => setForm(f => ({ ...f, division: e.target.value }))}>
            <option value="unitile">Unitile</option>
            <option value="univicoustic">UniVicoustic</option>
            <option value="both">Both</option>
          </select>
        </Field>
        <Field label="Trainer">
          <select className="input" value={form.trainerId || ''} onChange={e => setForm(f => ({ ...f, trainerId: e.target.value }))}>
            <option value="">Unassigned</option>
            {app.state.trainers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </Field>
        <Field label="Pass %"><input className="input" type="number" value={form.passingScore} onChange={e => setForm(f => ({ ...f, passingScore: +e.target.value }))}/></Field>
        <Field label="Est. minutes"><input className="input" type="number" value={form.estimatedMinutes || 0} onChange={e => setForm(f => ({ ...f, estimatedMinutes: +e.target.value }))}/></Field>
        <Field label="Thumbnail emoji"><input className="input" value={form.thumbnail} onChange={e => setForm(f => ({ ...f, thumbnail: e.target.value }))}/></Field>
      </div>
      <Field label="Access control — designations (leave 'all' for open access)">
        <DesignationPicker value={form.accessRoles || ['all']} onChange={v => setForm(f => ({ ...f, accessRoles: v }))}/>
      </Field>
      <div className="flex justify-end"><button onClick={() => app.updateCourse(course.id, form)} className="btn-primary">Save changes</button></div>
    </div>
  );
}

function DesignationPicker({ value, onChange }) {
  const app = useApp();
  const toggle = (d) => {
    if (d === 'all') { onChange(['all']); return; }
    const v = value.includes('all') ? [] : [...value];
    if (v.includes(d)) onChange(v.filter(x => x !== d).length ? v.filter(x => x !== d) : ['all']);
    else onChange([...v.filter(x => x !== 'all'), d]);
  };
  return (
    <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 rounded-lg border">
      <button type="button" onClick={() => toggle('all')} className={cx('px-3 py-1 rounded-full text-xs',
        value.includes('all') ? 'bg-brand-600 text-white' : 'bg-white border')}>All learners</button>
      {app.state.designations.map(d => (
        <button type="button" key={d} onClick={() => toggle(d)} className={cx('px-3 py-1 rounded-full text-xs',
          value.includes(d) ? 'bg-brand-600 text-white' : 'bg-white border')}>{d}</button>
      ))}
    </div>
  );
}

function AdminTrainers() {
  const app = useApp();
  const [editing, setEditing] = useState(null);
  const save = () => {
    if (!editing.name) return alert('Name required');
    if (editing.id) app.updateTrainer(editing.id, editing);
    else app.addTrainer(editing);
    setEditing(null);
  };
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-extrabold">Trainers</h1><p className="text-slate-600 mt-1">Subject-matter experts assigned to courses.</p></div>
        <button onClick={() => setEditing({ name: '', expertise: '', division: 'both', bio: '' })} className="btn-primary flex items-center gap-2"><Icon name="plus" className="w-4 h-4"/>Add trainer</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {app.state.trainers.map(t => (
          <div key={t.id} className="bg-white border rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-bold text-lg">{t.name}</div>
                <div className="text-sm text-brand-700">{t.expertise}</div>
                <div className="text-xs text-slate-500 capitalize mt-1">Division: {t.division}</div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(t)} className="p-2 rounded hover:bg-slate-100"><Icon name="edit" className="w-4 h-4"/></button>
                <button onClick={() => { if (confirm('Delete?')) app.deleteTrainer(t.id); }} className="p-2 rounded hover:bg-red-50 text-red-600"><Icon name="trash" className="w-4 h-4"/></button>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-3">{t.bio}</p>
            <div className="mt-3 text-xs text-slate-500">
              Courses: {app.state.courses.filter(c => c.trainerId === t.id).length}
            </div>
          </div>
        ))}
      </div>
      {editing && (
        <Modal onClose={() => setEditing(null)} title={editing.id ? 'Edit trainer' : 'New trainer'}>
          <div className="space-y-3">
            <Field label="Name"><input className="input" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })}/></Field>
            <Field label="Expertise"><input className="input" value={editing.expertise} onChange={e => setEditing({ ...editing, expertise: e.target.value })}/></Field>
            <Field label="Division">
              <select className="input" value={editing.division} onChange={e => setEditing({ ...editing, division: e.target.value })}>
                <option value="unitile">Unitile</option>
                <option value="univicoustic">UniVicoustic</option>
                <option value="both">Both</option>
              </select>
            </Field>
            <Field label="Bio"><textarea className="input h-20" value={editing.bio} onChange={e => setEditing({ ...editing, bio: e.target.value })}/></Field>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border">Cancel</button>
            <button onClick={save} className="btn-primary">Save</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function AdminLearners() {
  const app = useApp();
  const [search, setSearch] = useState('');
  const [divFilter, setDivFilter] = useState('all');
  const learners = app.state.users.filter(u => u.role === 'learner')
    .filter(l => divFilter === 'all' || l.division === divFilter)
    .filter(l => !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-extrabold">Learners</h1>
      <p className="text-slate-600 mt-1">{learners.length} learner accounts.</p>
      <div className="mt-5 flex gap-3 flex-wrap">
        <input className="input flex-1 min-w-[200px]" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)}/>
        <select className="input" value={divFilter} onChange={e => setDivFilter(e.target.value)}>
          <option value="all">All divisions</option>
          <option value="unitile">Unitile</option>
          <option value="univicoustic">UniVicoustic</option>
        </select>
      </div>
      <div className="mt-5 bg-white border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-600"><tr>
            <th className="p-3 text-left">Name</th><th className="p-3 text-left">Email</th>
            <th className="p-3">Division</th><th className="p-3">Designation</th>
            <th className="p-3">Unit</th><th className="p-3">Progress</th><th className="p-3"></th>
          </tr></thead>
          <tbody>
            {learners.map(l => {
              const myCourses = app.state.courses.filter(c => c.division === l.division || c.division === 'both');
              const total = myCourses.reduce((s, c) => s + c.lessons.length, 0);
              const done = Object.keys(l.progress.lessonsDone).filter(k => myCourses.some(c => k.startsWith(c.id + '::'))).length;
              const pct = total ? Math.round(done / total * 100) : 0;
              return (
                <tr key={l.id} className="border-t hover:bg-slate-50">
                  <td className="p-3 font-medium">{l.name}</td>
                  <td className="p-3 text-slate-600">{l.email}</td>
                  <td className="p-3 capitalize text-center">{l.division}</td>
                  <td className="p-3">{l.designation}</td>
                  <td className="p-3">{l.unit}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[80px]"><div className="h-full bg-brand-600" style={{ width: `${pct}%` }}/></div>
                      <span className="text-xs font-medium">{pct}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => { if (confirm('Delete account?')) app.deleteUser(l.id); }} className="text-red-600 hover:underline text-xs">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminAccess() {
  const app = useApp();
  const [selCourse, setSelCourse] = useState(app.state.courses[0]?.id);
  const course = app.state.courses.find(c => c.id === selCourse);
  const learners = app.state.users.filter(u => u.role === 'learner');
  const [selLearners, setSelLearners] = useState(() => new Set());
  useEffect(() => {
    if (!course) return;
    const assigned = new Set(app.state.assignments.filter(a => a.courseId === course.id).map(a => a.userId));
    setSelLearners(assigned);
  }, [selCourse]);
  const save = () => { app.assignCourseToUser(selCourse, Array.from(selLearners)); alert('Assignments saved'); };
  const toggle = (id) => setSelLearners(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-extrabold">Access control</h1>
      <p className="text-slate-600 mt-1">Course-level designation rules + per-learner assignment.</p>
      <div className="grid md:grid-cols-[320px,1fr] gap-6 mt-6">
        <div className="bg-white border rounded-2xl p-3 max-h-[70vh] overflow-y-auto scrollbar-thin">
          {app.state.courses.map(c => (
            <button key={c.id} onClick={() => setSelCourse(c.id)} className={cx('w-full text-left p-3 rounded-lg text-sm',
              selCourse === c.id ? 'bg-brand-600 text-white' : 'hover:bg-slate-50')}>
              <div className="font-medium">{c.thumbnail} {c.title}</div>
              <div className={cx('text-xs capitalize mt-0.5', selCourse === c.id ? 'text-white/80' : 'text-slate-500')}>{c.division}</div>
            </button>
          ))}
        </div>
        <div>
          {course && (
            <>
              <div className="bg-white border rounded-2xl p-5">
                <div className="text-xs uppercase text-slate-500 font-semibold">Designation rule</div>
                <div className="mt-1 mb-2">{course.accessRoles?.includes('all') ? 'Open to all learners' : `Restricted: ${(course.accessRoles || []).join(', ')}`}</div>
                <DesignationPicker value={course.accessRoles || ['all']} onChange={v => app.updateCourse(course.id, { accessRoles: v })}/>
              </div>
              <div className="bg-white border rounded-2xl p-5 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xs uppercase text-slate-500 font-semibold">Individual assignments</div>
                    <div className="text-sm">Assign this course explicitly to learners (overrides designation restriction).</div>
                  </div>
                  <button onClick={save} className="btn-primary">Save assignments</button>
                </div>
                <div className="grid md:grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto scrollbar-thin">
                  {learners.map(l => (
                    <label key={l.id} className={cx('flex items-center gap-3 p-2 rounded-lg border cursor-pointer',
                      selLearners.has(l.id) ? 'bg-brand-50 border-brand-400' : 'bg-white hover:bg-slate-50')}>
                      <input type="checkbox" checked={selLearners.has(l.id)} onChange={() => toggle(l.id)}/>
                      <div>
                        <div className="text-sm font-medium">{l.name}</div>
                        <div className="text-xs text-slate-500">{l.email} · <span className="capitalize">{l.division}</span> · {l.designation}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminAnnouncements() {
  const app = useApp();
  const [msg, setMsg] = useState('');
  const [aud, setAud] = useState('all');
  const post = () => {
    if (!msg.trim()) return;
    app.postAnnouncement(msg.trim(), aud);
    setMsg('');
  };
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-extrabold">Announcements</h1>
      <div className="mt-5 bg-white border rounded-2xl p-5">
        <Field label="Message"><textarea className="input h-24" value={msg} onChange={e => setMsg(e.target.value)} placeholder="Broadcast a quick note to learners..."/></Field>
        <div className="flex items-center justify-between gap-3 mt-3">
          <select className="input max-w-[240px]" value={aud} onChange={e => setAud(e.target.value)}>
            <option value="all">All learners</option>
            <option value="unitile">Unitile learners</option>
            <option value="univicoustic">UniVicoustic learners</option>
          </select>
          <button onClick={post} className="btn-primary">Post</button>
        </div>
      </div>
      <div className="mt-5 space-y-2">
        {app.state.announcements.map(a => (
          <div key={a.id} className="bg-white border rounded-lg p-4 flex items-start gap-3">
            <div className="flex-1">
              <div>{a.msg}</div>
              <div className="text-xs text-slate-500 mt-1">{new Date(a.postedAt).toLocaleString()} · {a.audience}</div>
            </div>
            <button onClick={() => app.deleteAnnouncement(a.id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded"><Icon name="trash" className="w-4 h-4"/></button>
          </div>
        ))}
        {!app.state.announcements.length && <div className="text-slate-400 text-sm text-center p-6">No announcements yet.</div>}
      </div>
    </div>
  );
}

// ---------- AI Quiz Builder ----------
function AiQuizBuilder() {
  const app = useApp();
  const [text, setText] = useState('');
  const [targetCourse, setTargetCourse] = useState('');
  const [draft, setDraft] = useState([]);
  const [fileName, setFileName] = useState('');

  const handleFile = async (file) => {
    if (!file) return;
    setFileName(file.name);
    const txt = await file.text();
    setText(txt.slice(0, 10000));
  };

  const generate = () => {
    // Local heuristic "AI" for this first-cut:
    //   - Split text into sentences.
    //   - Pick sentences with enough information (>= 8 words).
    //   - Convert each to a fill-style MCQ by blanking a key noun phrase.
    // In production this would call an LLM endpoint.
    const sentences = text.replace(/\n+/g, ' ').split(/(?<=[.!?])\s+/).filter(s => s.split(' ').length >= 8 && s.length < 220);
    if (!sentences.length) return alert('Paste enough text first (full sentences, ≥ a few paragraphs).');
    const picks = sentences.sort(() => Math.random() - 0.5).slice(0, Math.min(10, sentences.length));
    const drafts = picks.map((s, i) => {
      const words = s.match(/\b[A-Z][a-zA-Z]+\b/g) || s.match(/\b[a-zA-Z]{5,}\b/g) || [];
      const keyword = words.sort((a, b) => b.length - a.length)[0] || s.split(' ').find(w => w.length > 5) || 'it';
      const q = s.replace(new RegExp(`\\b${keyword}\\b`, 'i'), '______');
      const distractorsPool = ['process', 'material', 'installation', 'standard', 'metric', 'panel', 'absorption', 'rating', 'system', 'surface'];
      const distractors = distractorsPool.filter(d => d.toLowerCase() !== keyword.toLowerCase()).slice(0, 3);
      const options = [keyword, ...distractors].sort(() => Math.random() - 0.5);
      return {
        q: `Q${i + 1}. Complete the statement: ${q}`,
        type: 'mcq',
        options,
        correct: options.findIndex(o => o === keyword),
        explain: `The original text states: "${s}"`
      };
    });
    setDraft(drafts);
  };

  const saveToCourse = () => {
    if (!targetCourse) return alert('Pick a target course');
    draft.forEach(q => app.addQuizQuestion(targetCourse, q));
    alert(`Added ${draft.length} questions to the course.`);
    setDraft([]);
    setText('');
    setFileName('');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-brand-600 text-white flex items-center justify-center"><Icon name="sparkles"/></div>
        <div><h1 className="text-3xl font-extrabold">AI Quiz Builder</h1><p className="text-slate-600 text-sm">Paste training content or upload a text file — we'll draft quiz questions.</p></div>
      </div>
      <div className="mt-6 bg-white border rounded-2xl p-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <label className="flex items-center gap-2 text-sm font-medium text-brand-700 cursor-pointer hover:bg-brand-50 px-3 py-2 rounded-lg border border-brand-200">
            <Icon name="upload" className="w-4 h-4"/>Upload .txt / .md
            <input type="file" accept=".txt,.md,text/plain" className="hidden" onChange={e => handleFile(e.target.files[0])}/>
          </label>
          {fileName && <div className="text-xs text-slate-500">Loaded: <b>{fileName}</b></div>}
        </div>
        <Field label="Training text"><textarea className="input h-56 mt-2" value={text} onChange={e => setText(e.target.value)} placeholder="Paste lecture transcript, module text, product datasheet..."/></Field>
        <div className="flex items-center gap-3 mt-3">
          <button onClick={generate} className="btn-primary flex items-center gap-2"><Icon name="sparkles" className="w-4 h-4"/>Generate questions</button>
          <span className="text-xs text-slate-500">Generates up to 10 MCQs by blanking key terms (connect an LLM endpoint to upgrade).</span>
        </div>
      </div>
      {draft.length > 0 && (
        <div className="mt-5 bg-white border rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Draft ({draft.length}) — review and assign</h3>
            <div className="flex items-center gap-2">
              <select className="input max-w-[240px]" value={targetCourse} onChange={e => setTargetCourse(e.target.value)}>
                <option value="">Choose target course...</option>
                {app.state.courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
              <button onClick={saveToCourse} className="btn-primary">Save to course</button>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {draft.map((q, i) => (
              <div key={i} className="p-3 rounded-lg border">
                <div className="font-medium text-sm">{q.q}</div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {q.options.map((o, j) => (
                    <span key={j} className={cx('px-2 py-0.5 rounded', j === q.correct ? 'bg-emerald-100 text-emerald-800 font-semibold' : 'bg-slate-100')}>{o}</span>
                  ))}
                </div>
                <div className="text-xs text-slate-500 mt-1 italic">{q.explain}</div>
                <button onClick={() => setDraft(d => d.filter((_, x) => x !== i))} className="mt-2 text-xs text-red-600 hover:underline">Remove</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- UI primitives ----------
function Modal({ title, children, onClose, large }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className={cx('bg-white rounded-2xl shadow-2xl w-full overflow-hidden flex flex-col', large ? 'max-w-3xl max-h-[90vh]' : 'max-w-md max-h-[90vh]')}>
        <div className="px-5 py-4 border-b flex items-center justify-between"><div className="font-semibold">{title}</div><button onClick={onClose} className="text-slate-400 hover:text-slate-700">✕</button></div>
        <div className="p-5 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

// ============================================================
// ROOT APP — route switch
// ============================================================
function AppRoot() {
  const [hash, nav] = useHashRoute();
  const app = useApp();
  const u = app.currentUser();

  // Route guards
  useEffect(() => {
    if (!u) {
      if (!['/', '/login', '/signup'].includes(hash)) nav('/login');
    } else {
      if (hash === '/' || hash === '/login' || hash === '/signup') {
        nav(u.role === 'admin' ? '/admin' : '/learn');
      }
      if (hash.startsWith('/admin') && u.role !== 'admin') nav('/learn');
      if (hash.startsWith('/learn') && u.role === 'admin') nav('/admin');
    }
  }, [hash, u]);

  // Public routes
  if (!u) {
    if (hash === '/login') return <LoginPage nav={nav}/>;
    if (hash === '/signup') return <SignupPage nav={nav}/>;
    return <LandingPage nav={nav}/>;
  }

  // Learner routes
  if (u.role === 'learner') {
    if (hash.startsWith('/learn/course/')) {
      const id = hash.split('/').pop();
      return <CoursePage courseId={id} nav={nav}/>;
    }
    if (hash.startsWith('/learn/capstone/')) {
      const id = hash.split('/').pop();
      return <CapstonePage capstoneId={id} nav={nav}/>;
    }
    return (
      <LearnerShell nav={nav} hash={hash}>
        {hash === '/learn' && <LearnerDashboard nav={nav}/>}
        {hash === '/learn/catalog' && <CatalogPage nav={nav}/>}
        {hash === '/learn/certificates' && <CertificatesPage/>}
        {hash === '/learn/profile' && <ProfilePage/>}
      </LearnerShell>
    );
  }

  // Admin routes
  return (
    <AdminShell nav={nav} hash={hash}>
      {hash === '/admin' && <AdminOverview nav={nav}/>}
      {hash === '/admin/courses' && <AdminCourses nav={nav}/>}
      {hash === '/admin/trainers' && <AdminTrainers/>}
      {hash === '/admin/learners' && <AdminLearners/>}
      {hash === '/admin/access' && <AdminAccess/>}
      {hash === '/admin/announcements' && <AdminAnnouncements/>}
      {hash === '/admin/ai-quiz' && <AiQuizBuilder/>}
    </AdminShell>
  );
}

// ---------- Mount ----------
// Inject utility classes used across the app (via Tailwind's @apply would be cleaner;
// here we just set them as plain classes that reference Tailwind tokens via runtime).
const style = document.createElement('style');
style.textContent = `
  .input { display:block; width:100%; border:1px solid #cbd5e1; border-radius:8px; padding:9px 12px; font-size:14px; background:#fff; outline:none; transition:border .15s; }
  .input:focus { border-color:#1f3bf5; box-shadow:0 0 0 3px rgba(31,59,245,0.15); }
  .btn-primary { display:inline-flex; align-items:center; justify-content:center; background:#1f3bf5; color:#fff; padding:10px 18px; border-radius:10px; font-weight:600; font-size:14px; transition:background .15s; }
  .btn-primary:hover { background:#1a2fd1; }
  .btn-primary:disabled { opacity:0.5; cursor:not-allowed; }
  .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppProvider><AppRoot/></AppProvider>);
