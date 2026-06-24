-- Roboskills schema — run in the Supabase SQL editor (or via `supabase db push`).
-- Tables: robots, training_jobs, policies. Row-level security throughout so a
-- user can only ever see and mutate their own rows.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
do $$ begin
  create type job_status as enum ('queued', 'training', 'succeeded', 'failed', 'canceled');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- robots
-- ---------------------------------------------------------------------------
create table if not exists public.robots (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  name        text not null,
  type        text not null,                       -- e.g. 'petoi_bittle'
  config_json jsonb not null default '{}'::jsonb,  -- robot/env config
  created_at  timestamptz not null default now()
);
create index if not exists robots_user_id_idx on public.robots (user_id);

-- ---------------------------------------------------------------------------
-- training_jobs
-- ---------------------------------------------------------------------------
create table if not exists public.training_jobs (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  robot_id     uuid not null references public.robots (id) on delete cascade,
  behavior     text not null,                       -- e.g. 'walk_forward'
  params_json  jsonb not null default '{}'::jsonb,  -- commanded speed, budget, seed
  status       job_status not null default 'queued',
  is_demo      boolean not null default false,
  metrics_json jsonb,                               -- reward curve, final velocity, fall rate
  policy_url   text,
  video_url    text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists training_jobs_user_id_idx on public.training_jobs (user_id);
create index if not exists training_jobs_robot_id_idx on public.training_jobs (robot_id);
create index if not exists training_jobs_status_idx on public.training_jobs (status);

-- ---------------------------------------------------------------------------
-- policies (downloadable artifacts produced by a job)
-- ---------------------------------------------------------------------------
create table if not exists public.policies (
  id         uuid primary key default gen_random_uuid(),
  job_id     uuid not null references public.training_jobs (id) on delete cascade,
  file_url   text not null,
  format     text not null default 'onnx',         -- 'onnx' | 'zip' | 'pt'
  created_at timestamptz not null default now()
);
create index if not exists policies_job_id_idx on public.policies (job_id);

-- ---------------------------------------------------------------------------
-- updated_at trigger for training_jobs
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists training_jobs_set_updated_at on public.training_jobs;
create trigger training_jobs_set_updated_at
  before update on public.training_jobs
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------
alter table public.robots        enable row level security;
alter table public.training_jobs enable row level security;
alter table public.policies      enable row level security;

-- robots: owner-only
drop policy if exists "robots_owner_all" on public.robots;
create policy "robots_owner_all" on public.robots
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- training_jobs: owner-only
drop policy if exists "jobs_owner_all" on public.training_jobs;
create policy "jobs_owner_all" on public.training_jobs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- policies: accessible when the user owns the parent job
drop policy if exists "policies_via_job" on public.policies;
create policy "policies_via_job" on public.policies
  for all using (
    exists (
      select 1 from public.training_jobs j
      where j.id = policies.job_id and j.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.training_jobs j
      where j.id = policies.job_id and j.user_id = auth.uid()
    )
  );
