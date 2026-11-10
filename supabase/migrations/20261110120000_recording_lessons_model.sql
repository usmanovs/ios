-- Video recordings of live classes, separate from the written course
-- content in courses/chapters/lessons. Ported from android-course's
-- recording_lessons model (itself ported from ai-accelerator).
create table public.recording_lessons (
  id uuid primary key default gen_random_uuid(),
  lesson_number integer not null unique,
  title text not null default '',
  description text not null default '',
  homework_md text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.recording_topics (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.recording_lessons(id) on delete cascade,
  title text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.recording_lesson_videos (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.recording_lessons(id) on delete cascade,
  part_label text not null default '',
  title text not null default '',
  drive_url text not null default '',
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.recording_topic_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  topic_id uuid not null references public.recording_topics(id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, topic_id)
);

create table public.recording_lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  lesson_id uuid not null references public.recording_lessons(id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

alter table public.recording_lessons enable row level security;
alter table public.recording_topics enable row level security;
alter table public.recording_lesson_videos enable row level security;
alter table public.recording_topic_progress enable row level security;
alter table public.recording_lesson_progress enable row level security;

create policy "Admins can manage recording lessons"
  on public.recording_lessons for all
  using (has_role(auth.uid(), 'admin'::app_role))
  with check (has_role(auth.uid(), 'admin'::app_role));
create policy "Recording lessons are viewable by logged-in users"
  on public.recording_lessons for select
  using (auth.uid() is not null);

create policy "Admins can manage recording topics"
  on public.recording_topics for all
  using (has_role(auth.uid(), 'admin'::app_role))
  with check (has_role(auth.uid(), 'admin'::app_role));
create policy "Recording topics are viewable by logged-in users"
  on public.recording_topics for select
  using (auth.uid() is not null);

create policy "Admins can manage recording videos"
  on public.recording_lesson_videos for all
  using (has_role(auth.uid(), 'admin'::app_role))
  with check (has_role(auth.uid(), 'admin'::app_role));
create policy "Recording videos are viewable by logged-in users"
  on public.recording_lesson_videos for select
  using (auth.uid() is not null);

create policy "Users manage their own topic progress"
  on public.recording_topic_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage their own lesson progress"
  on public.recording_lesson_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- No seed rows: unlike android-course's fixed 7-lesson cohort, the iOS
-- live-class count isn't known here. Admins add lessons from the UI.

-- This project has two same-signature has_role(uuid, app_role) overloads
-- (likely a leftover duplicate); the one the policies above resolve to was
-- missing anon/authenticated EXECUTE, so every select on these tables
-- failed with "permission denied for function has_role". Grant both
-- overloads explicitly rather than guessing which one resolves.
DO $$
DECLARE
  sig text;
BEGIN
  FOR sig IN SELECT oid::regprocedure::text FROM pg_proc WHERE proname = 'has_role'
  LOOP
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO anon, authenticated', sig);
  END LOOP;
END $$;
