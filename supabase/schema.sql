-- Bisaat Labs influencer roster
-- Safe to run more than once in the Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.influencers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  avatar_url text not null default '',
  rating numeric(2, 1) not null default 4.5 check (rating >= 0 and rating <= 5),
  reach text not null default '',
  content_type text not null default '',
  instagram_url text not null default '',
  languages text[] not null default '{}',
  platforms text[] not null default '{}',
  reviews jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.influencers add column if not exists email text not null default '';
alter table public.influencers add column if not exists phone text not null default '';
alter table public.influencers add column if not exists location text not null default '';
alter table public.influencers add column if not exists engagement_rate numeric(5, 2) not null default 0;
alter table public.influencers add column if not exists average_views text not null default '';
alter table public.influencers add column if not exists rate_per_reel text not null default '';
alter table public.influencers add column if not exists status text not null default 'onboarding';
alter table public.influencers add column if not exists notes text not null default '';
alter table public.influencers add column if not exists is_published boolean not null default true;
alter table public.influencers alter column is_published set default true;

do $$ begin
  alter table public.influencers add constraint influencers_status_check
    check (status in ('onboarding', 'active', 'paused'));
exception when duplicate_object then null;
end $$;

create index if not exists influencers_created_at_idx on public.influencers (created_at desc);
create index if not exists influencers_status_idx on public.influencers (status);
create index if not exists influencers_published_idx on public.influencers (is_published);

alter table public.influencers enable row level security;

drop policy if exists "Public read access" on public.influencers;
drop policy if exists "Public insert access" on public.influencers;
drop policy if exists "Published profiles are public" on public.influencers;
drop policy if exists "Authenticated admins can read all profiles" on public.influencers;
drop policy if exists "Authenticated admins can create profiles" on public.influencers;
drop policy if exists "Authenticated admins can update profiles" on public.influencers;
drop policy if exists "Authenticated admins can delete profiles" on public.influencers;

create policy "Published profiles are public"
  on public.influencers for select
  to anon
  using (is_published = true);

create policy "Authenticated admins can read all profiles"
  on public.influencers for select
  to authenticated
  using (true);

create policy "Authenticated admins can create profiles"
  on public.influencers for insert
  to authenticated
  with check (true);

create policy "Authenticated admins can update profiles"
  on public.influencers for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated admins can delete profiles"
  on public.influencers for delete
  to authenticated
  using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'influencer-avatars',
  'influencer-avatars',
  true,
  5000000,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view influencer avatars" on storage.objects;
drop policy if exists "Authenticated admins can upload influencer avatars" on storage.objects;
drop policy if exists "Authenticated admins can update influencer avatars" on storage.objects;
drop policy if exists "Authenticated admins can delete influencer avatars" on storage.objects;

create policy "Public can view influencer avatars"
  on storage.objects for select
  using (bucket_id = 'influencer-avatars');

create policy "Authenticated admins can upload influencer avatars"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'influencer-avatars');

create policy "Authenticated admins can update influencer avatars"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'influencer-avatars')
  with check (bucket_id = 'influencer-avatars');

create policy "Authenticated admins can delete influencer avatars"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'influencer-avatars');
