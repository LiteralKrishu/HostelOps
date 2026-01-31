-- =============================================================================
-- HostelOps - Supabase Database Setup Script
-- =============================================================================
-- Run this script in your Supabase SQL Editor to set up the database.
-- 
-- Prerequisites:
-- 1. Create a Supabase project at https://supabase.com
-- 2. Go to SQL Editor
-- 3. Paste and run this entire script
-- =============================================================================

-- Enable UUID extension (usually already enabled)
create extension if not exists "uuid-ossp";

-- =============================================================================
-- 1. PROFILES TABLE (extends auth.users)
-- =============================================================================
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text check (role in ('student', 'admin', 'management', 'staff')) not null default 'student',
  hostel text not null,
  block text,
  room text,
  is_approved boolean default true, -- Admin accounts require manual approval (set to false for admins)
  created_at timestamp with time zone default now()
);

-- =============================================================================
-- 2. ISSUES TABLE (Core Module)
-- =============================================================================
create table if not exists issues (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null,
  priority text check (priority in ('low', 'medium', 'high', 'emergency')) not null,
  status text check (
    status in ('reported', 'assigned', 'in_progress', 'resolved', 'closed')
  ) default 'reported',
  visibility text check (visibility in ('public', 'private')) default 'public',

  hostel text not null,
  block text,
  room text,

  created_by uuid references profiles(id),
  assigned_to uuid references profiles(id),

  merged_into uuid references issues(id),

  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- =============================================================================
-- 3. ISSUE MEDIA TABLE
-- =============================================================================
create table if not exists issue_media (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid references issues(id) on delete cascade,
  media_url text not null,
  media_type text check (media_type in ('image', 'video')),
  created_at timestamp with time zone default now()
);

-- =============================================================================
-- 4. COMMENTS TABLE
-- =============================================================================
create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid references issues(id) on delete cascade,
  user_id uuid references profiles(id),
  content text not null,
  created_at timestamp with time zone default now()
);

-- =============================================================================
-- 5. ANNOUNCEMENTS TABLE
-- =============================================================================
create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  hostel text,
  block text,
  target_role text,
  created_by uuid references profiles(id),
  created_at timestamp with time zone default now()
);

-- =============================================================================
-- 6. LOST & FOUND TABLE
-- =============================================================================
create table if not exists lost_found_items (
  id uuid primary key default gen_random_uuid(),
  type text check (type in ('lost', 'found')) not null,
  description text not null,
  image_url text,
  location text,
  status text check (status in ('open', 'claimed', 'closed')) default 'open',
  reported_by uuid references profiles(id),
  created_at timestamp with time zone default now()
);

-- =============================================================================
-- ENABLE ROW LEVEL SECURITY
-- =============================================================================
alter table profiles enable row level security;
alter table issues enable row level security;
alter table issue_media enable row level security;
alter table comments enable row level security;
alter table announcements enable row level security;
alter table lost_found_items enable row level security;

-- =============================================================================
-- RLS POLICIES - PROFILES
-- =============================================================================
-- Users can view all profiles
create policy "Profiles are viewable by everyone" on profiles
  for select using (true);

-- Users can only update their own profile
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- =============================================================================
-- RLS POLICIES - ISSUES
-- =============================================================================
-- Students can view their own issues + public issues
create policy "Students view own and public issues" on issues
  for select using (
    created_by = auth.uid() 
    or visibility = 'public'
    or exists (
      select 1 from profiles 
      where id = auth.uid() 
      and role in ('management', 'staff')
    )
  );

-- Students can create issues
create policy "Students can create issues" on issues
  for insert with check (
    auth.uid() = created_by
  );

-- Students can update their own issues (limited)
create policy "Students can update own issues" on issues
  for update using (created_by = auth.uid());

-- Staff/Management can update any issue
create policy "Staff can update any issue" on issues
  for update using (
    exists (
      select 1 from profiles 
      where id = auth.uid() 
      and role in ('management', 'staff')
    )
  );

-- =============================================================================
-- RLS POLICIES - COMMENTS
-- =============================================================================
-- Anyone can view comments on public issues
create policy "View comments on accessible issues" on comments
  for select using (
    exists (
      select 1 from issues 
      where issues.id = comments.issue_id
      and (issues.visibility = 'public' or issues.created_by = auth.uid())
    )
    or exists (
      select 1 from profiles 
      where id = auth.uid() 
      and role in ('management', 'staff')
    )
  );

-- Authenticated users can add comments
create policy "Users can add comments" on comments
  for insert with check (auth.uid() = user_id);

-- =============================================================================
-- RLS POLICIES - ANNOUNCEMENTS
-- =============================================================================
-- Anyone can view announcements
create policy "Announcements viewable by all" on announcements
  for select using (true);

-- Only management can create announcements
create policy "Management can create announcements" on announcements
  for insert with check (
    exists (
      select 1 from profiles 
      where id = auth.uid() 
      and role = 'management'
    )
  );

-- =============================================================================
-- RLS POLICIES - LOST & FOUND
-- =============================================================================
-- Anyone can view lost & found items
create policy "Lost found viewable by all" on lost_found_items
  for select using (true);

-- Authenticated users can create items
create policy "Users can create lost found items" on lost_found_items
  for insert with check (auth.uid() = reported_by);

-- Users can update their own items
create policy "Users can update own items" on lost_found_items
  for update using (reported_by = auth.uid());

-- =============================================================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- =============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, role, hostel)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'role', 'student'),
    coalesce(new.raw_user_meta_data ->> 'hostel', 'Unassigned')
  );
  return new;
end;
$$;

-- Trigger to auto-create profile
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================================================================
-- UPDATED_AT TRIGGER
-- =============================================================================
create or replace function update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger update_issues_updated_at
  before update on issues
  for each row execute procedure update_updated_at_column();

-- =============================================================================
-- DONE! Your database is ready.
-- =============================================================================
