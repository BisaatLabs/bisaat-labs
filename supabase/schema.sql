-- Bisaat Labs — Influencers table
-- Run this in your Supabase project's SQL editor (Database > SQL Editor).
-- Docs: https://supabase.com/docs/guides/database/overview

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

-- Keep the newest cards first without an ORDER BY on every query.
create index if not exists influencers_created_at_idx
  on public.influencers (created_at desc);

alter table public.influencers enable row level security;

-- Public marketplace board: anyone can view and add a card, nobody can
-- edit or delete other people's cards from the client. Tighten this
-- (e.g. require auth.uid() = created_by) before using this in production
-- with real user accounts.
create policy "Public read access"
  on public.influencers for select
  using (true);

create policy "Public insert access"
  on public.influencers for insert
  with check (true);

-- Seed data (optional) — matches the demo cards shown before Supabase is connected.
insert into public.influencers (name, avatar_url, rating, reach, content_type, instagram_url, languages, platforms, reviews)
values
  ('Ayesha Noor', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Ayesha%20Noor', 4.8, '245K', 'Comedy & Lifestyle Reels', 'https://instagram.com/', array['Urdu','English'], array['Instagram','TikTok'],
    '[{"reviewer":"Mavme Studio","comment":"Turned our launch reel into the most-watched thing we have ever posted.","rating":5}]'::jsonb),
  ('Bilal Siddiqui', 'https://api.dicebear.com/9.x/avataaars/svg?seed=Bilal%20Siddiqui', 4.6, '180K', 'Food & Restaurant Reviews', 'https://instagram.com/', array['Urdu','English'], array['Instagram','YouTube'],
    '[{"reviewer":"Maryas Cafe","comment":"His review brought in a full week of reservations.","rating":5}]'::jsonb)
on conflict do nothing;
