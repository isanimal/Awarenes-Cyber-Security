create extension if not exists "pgcrypto";

create table if not exists public.game_attempts (
  id uuid primary key default gen_random_uuid(),
  participant_name text not null,
  participant_role text not null,
  mode text not null check (mode in ('individual','team')),
  team_name text,
  started_at timestamptz default now(),
  completed_at timestamptz,
  total_score int default 0,
  security_score int default 50,
  operation_score int default 50,
  compliance_score int default 50,
  recovery_score int default 50,
  rating text,
  strongest_area text,
  weakest_area text,
  badge text,
  status text default 'in_progress' check (status in ('in_progress','completed')),
  created_at timestamptz default now()
);

create table if not exists public.game_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid references public.game_attempts(id) on delete cascade,
  scenario_id text not null,
  stage int not null,
  selected_option_id text not null,
  selected_option_label text not null,
  feedback_type text not null check (feedback_type in ('good','risky','dangerous')),
  score_delta jsonb not null,
  score_after jsonb not null,
  answered_at timestamptz default now()
);

create index if not exists idx_game_attempts_status on public.game_attempts(status);
create index if not exists idx_game_attempts_created_at on public.game_attempts(created_at);
create index if not exists idx_game_answers_attempt_id on public.game_answers(attempt_id);
create index if not exists idx_game_answers_stage on public.game_answers(stage);
create index if not exists idx_game_answers_feedback_type on public.game_answers(feedback_type);

alter table public.game_attempts enable row level security;
alter table public.game_answers enable row level security;

-- Policy ini dibuat untuk MVP classroom/training agar peserta tanpa login bisa
-- mengirim data dan trainer dashboard bisa membaca hasil. Ini bukan
-- production-grade security. Untuk produksi, gunakan Supabase Auth atau
-- protected backend API.

drop policy if exists "MVP allow anon insert attempts" on public.game_attempts;
drop policy if exists "MVP allow anon select attempts" on public.game_attempts;
drop policy if exists "MVP allow anon update attempts" on public.game_attempts;
drop policy if exists "MVP allow anon insert answers" on public.game_answers;
drop policy if exists "MVP allow anon select answers" on public.game_answers;

create policy "MVP allow anon insert attempts"
on public.game_attempts
for insert
to anon
with check (true);

create policy "MVP allow anon select attempts"
on public.game_attempts
for select
to anon
using (true);

create policy "MVP allow anon update attempts"
on public.game_attempts
for update
to anon
using (true)
with check (true);

create policy "MVP allow anon insert answers"
on public.game_answers
for insert
to anon
with check (true);

create policy "MVP allow anon select answers"
on public.game_answers
for select
to anon
using (true);
