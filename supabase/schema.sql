-- =====================================================================
-- United Learn — Supabase schema
-- Run this in the Supabase SQL Editor (Project → SQL → New query).
-- =====================================================================

-- ---------- Extensions ----------
create extension if not exists "pgcrypto";

-- ---------- Profiles (1:1 with auth.users) ----------
create table if not exists profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text unique not null,
  name          text not null,
  role          text not null default 'learner' check (role in ('admin','learner')),
  designation   text not null default 'Intern / Trainee',
  division      text not null default 'unitile' check (division in ('unitile','univicoustic','both')),
  unit          text,
  created_at    timestamptz not null default now()
);

-- ---------- Trainers ----------
create table if not exists trainers (
  id          text primary key,
  name        text not null,
  expertise   text,
  division    text,
  bio         text,
  created_at  timestamptz not null default now()
);

-- ---------- Courses ----------
create table if not exists courses (
  id                 text primary key,
  division           text not null check (division in ('unitile','univicoustic','both')),
  "order"            int  not null default 1,
  title              text not null,
  summary            text,
  thumbnail          text,
  trainer_id         text references trainers(id) on delete set null,
  passing_score      int  not null default 70,
  estimated_minutes  int,
  access_roles       text[] not null default array['all'],
  match_data         jsonb,
  hotspot_data       jsonb,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- ---------- Lessons ----------
create table if not exists lessons (
  id         text primary key,
  course_id  text not null references courses(id) on delete cascade,
  "order"    int  not null,
  title      text not null,
  type       text not null default 'reading',
  body       text,
  cards      jsonb
);
create index if not exists idx_lessons_course_order on lessons(course_id, "order");

-- ---------- Quiz questions (per course) ----------
create table if not exists quiz_questions (
  id         bigserial primary key,
  course_id  text not null references courses(id) on delete cascade,
  "order"    int  not null default 0,
  q          text not null,
  type       text not null default 'mcq' check (type in ('mcq','tf')),
  options    jsonb,
  correct    int not null,
  explain    text
);
create index if not exists idx_quiz_course on quiz_questions(course_id, "order");

-- ---------- Capstones ----------
create table if not exists capstones (
  id             text primary key,
  division       text not null check (division in ('unitile','univicoustic','both')),
  title          text not null,
  summary        text,
  passing_score  int not null default 75
);

create table if not exists capstone_questions (
  id            bigserial primary key,
  capstone_id   text not null references capstones(id) on delete cascade,
  "order"       int  not null default 0,
  q             text not null,
  type          text not null default 'mcq',
  options       jsonb,
  correct       int  not null
);

-- ---------- Resources (PPT / PDF links per course) ----------
create table if not exists resources (
  id          bigserial primary key,
  course_id   text not null references courses(id) on delete cascade,
  "order"     int not null default 0,
  title       text not null,
  file_url    text not null,
  kind        text not null default 'pdf',
  group_name  text
);

-- ---------- Assignments (override access per learner) ----------
create table if not exists assignments (
  id           bigserial primary key,
  course_id    text not null references courses(id) on delete cascade,
  user_id      uuid not null references profiles(id) on delete cascade,
  assigned_at  timestamptz not null default now(),
  unique (course_id, user_id)
);

-- ---------- Progress ----------
create table if not exists progress_lessons (
  user_id    uuid not null references profiles(id) on delete cascade,
  course_id  text not null references courses(id) on delete cascade,
  lesson_id  text not null references lessons(id) on delete cascade,
  done_at    timestamptz not null default now(),
  primary key (user_id, course_id, lesson_id)
);

create table if not exists progress_quiz_scores (
  user_id     uuid not null references profiles(id) on delete cascade,
  course_id   text not null references courses(id) on delete cascade,
  score       int not null,
  updated_at  timestamptz not null default now(),
  primary key (user_id, course_id)
);

create table if not exists progress_capstones (
  user_id              uuid not null references profiles(id) on delete cascade,
  capstone_id          text not null references capstones(id) on delete cascade,
  score                int not null,
  certificate_issued   boolean not null default false,
  earned_at            timestamptz not null default now(),
  primary key (user_id, capstone_id)
);

-- ---------- Announcements ----------
create table if not exists announcements (
  id         bigserial primary key,
  message    text not null,
  audience   text not null default 'all' check (audience in ('all','unitile','univicoustic','both')),
  posted_at  timestamptz not null default now()
);

-- =====================================================================
-- Domain enforcement trigger + auto profile creation
-- =====================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.email !~* '@united-group\.in$' then
    raise exception 'Only @united-group.in email addresses are allowed';
  end if;

  insert into public.profiles (id, email, name, role, designation, division, unit)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name',        split_part(new.email,'@',1)),
    coalesce(new.raw_user_meta_data->>'role',        'learner'),
    coalesce(new.raw_user_meta_data->>'designation', 'Intern / Trainee'),
    coalesce(new.raw_user_meta_data->>'division',    'unitile'),
    coalesce(new.raw_user_meta_data->>'unit',        '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================================
-- Row Level Security
-- =====================================================================
alter table profiles              enable row level security;
alter table trainers              enable row level security;
alter table courses               enable row level security;
alter table lessons               enable row level security;
alter table quiz_questions        enable row level security;
alter table capstones             enable row level security;
alter table capstone_questions    enable row level security;
alter table resources             enable row level security;
alter table assignments           enable row level security;
alter table progress_lessons      enable row level security;
alter table progress_quiz_scores  enable row level security;
alter table progress_capstones    enable row level security;
alter table announcements         enable row level security;

-- Helper: is-admin check
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select coalesce((select role from profiles where id = auth.uid()) = 'admin', false);
$$;

-- ---------- Profiles ----------
drop policy if exists "profiles_self_read"    on profiles;
drop policy if exists "profiles_admin_read"   on profiles;
drop policy if exists "profiles_self_update"  on profiles;
drop policy if exists "profiles_admin_all"    on profiles;

create policy "profiles_self_read"   on profiles for select using (id = auth.uid());
create policy "profiles_admin_read"  on profiles for select using (public.is_admin());
create policy "profiles_self_update" on profiles for update using (id = auth.uid());
create policy "profiles_admin_all"   on profiles for all    using (public.is_admin()) with check (public.is_admin());

-- ---------- Catalog tables (anyone authenticated can read, only admin writes) ----------
do $$
declare t text;
begin
  foreach t in array array['trainers','courses','lessons','quiz_questions','capstones','capstone_questions','resources','announcements']
  loop
    execute format('drop policy if exists "%s_read"  on %I', t, t);
    execute format('drop policy if exists "%s_write" on %I', t, t);
    execute format($f$create policy "%s_read"  on %I for select using (auth.role() = 'authenticated')$f$, t, t);
    execute format($f$create policy "%s_write" on %I for all    using (public.is_admin()) with check (public.is_admin())$f$, t, t);
  end loop;
end $$;

-- ---------- Assignments (learner reads their own, admin manages all) ----------
drop policy if exists "assignments_own_read"  on assignments;
drop policy if exists "assignments_admin_all" on assignments;
create policy "assignments_own_read"  on assignments for select using (user_id = auth.uid() or public.is_admin());
create policy "assignments_admin_all" on assignments for all    using (public.is_admin()) with check (public.is_admin());

-- ---------- Progress: user owns their own rows; admin reads all ----------
do $$
declare t text;
begin
  foreach t in array array['progress_lessons','progress_quiz_scores','progress_capstones']
  loop
    execute format('drop policy if exists "%s_own"   on %I', t, t);
    execute format('drop policy if exists "%s_admin" on %I', t, t);
    execute format($f$create policy "%s_own"   on %I for all    using (user_id = auth.uid()) with check (user_id = auth.uid())$f$, t, t);
    execute format($f$create policy "%s_admin" on %I for select using (public.is_admin())$f$, t, t);
  end loop;
end $$;

-- =====================================================================
-- Storage bucket for reference materials (PPT / PDF)
-- Create via SQL so policies go alongside.
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('training-materials', 'training-materials', true)
on conflict (id) do nothing;

-- Public read; only admin uploads.
drop policy if exists "training_public_read" on storage.objects;
drop policy if exists "training_admin_write" on storage.objects;
create policy "training_public_read" on storage.objects
  for select using (bucket_id = 'training-materials');
create policy "training_admin_write" on storage.objects
  for all using (bucket_id = 'training-materials' and public.is_admin())
  with check (bucket_id = 'training-materials' and public.is_admin());
