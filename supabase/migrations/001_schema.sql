-- Nebular Portfolio schema migration 001
-- Seven-table RLS-enforced schema

create extension if not exists "pgcrypto";

create table if not exists galleries (
  slug text primary key,
  title text not null,
  description text not null,
  cover_photo_id text,
  order_index int not null default 100,
  published_at timestamptz not null default now()
);

create table if not exists photos (
  id text primary key,
  slug text unique not null,
  gallery_slug text references galleries(slug) on delete set null,
  title text not null,
  caption text,
  alt_text text not null,
  camera text,
  lens text,
  iso int,
  aperture text,
  shutter text,
  focal_length_mm int,
  captured_at timestamptz,
  file_path text not null,
  file_path_fallback text,
  width int not null default 1600,
  height int not null default 1067,
  attribution_source text not null check (attribution_source in ('self','unsplash','ai-generated','nebular-placeholder-svg')),
  attribution_license text not null,
  attribution_photographer text,
  attribution_url text,
  tags text[] not null default array[]::text[],
  ordering int not null default 100,
  published_at timestamptz not null default now(),
  exif_synthesized boolean not null default false
);

create table if not exists series (
  slug text primary key,
  title text not null,
  description text not null,
  theme_tag text not null,
  cover_photo_id text,
  status text not null default 'active' check (status in ('active','expanding','paused')),
  status_note text
);

create table if not exists series_photos (
  series_slug text references series(slug) on delete cascade,
  photo_id text references photos(id) on delete cascade,
  order_index int not null default 100,
  primary key (series_slug, photo_id)
);

create table if not exists tags (
  slug text primary key,
  label text not null
);

create table if not exists licensing_inquiries (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  inquiry_type text not null check (inquiry_type in ('commercial','editorial','personal','commission','coach','other')),
  budget_tier text,
  message text not null,
  photo_id text,
  locale text not null default 'en-CA',
  created_at timestamptz not null default now(),
  contacted_at timestamptz
);

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text,
  created_at timestamptz not null default now(),
  confirmed boolean not null default false
);

create table if not exists rss_items (
  id uuid primary key default gen_random_uuid(),
  link text not null,
  title text not null,
  description text,
  published_at timestamptz not null default now()
);

-- RLS enable

alter table galleries enable row level security;
alter table photos enable row level security;
alter table series enable row level security;
alter table series_photos enable row level security;
alter table tags enable row level security;
alter table licensing_inquiries enable row level security;
alter table newsletter_subscribers enable row level security;
alter table rss_items enable row level security;

-- Public read on content tables
drop policy if exists "public_read_galleries" on galleries;
create policy "public_read_galleries" on galleries for select to anon, authenticated using (true);

drop policy if exists "public_read_photos" on photos;
create policy "public_read_photos" on photos for select to anon, authenticated using (published_at <= now());

drop policy if exists "public_read_series" on series;
create policy "public_read_series" on series for select to anon, authenticated using (true);

drop policy if exists "public_read_series_photos" on series_photos;
create policy "public_read_series_photos" on series_photos for select to anon, authenticated using (true);

drop policy if exists "public_read_tags" on tags;
create policy "public_read_tags" on tags for select to anon, authenticated using (true);

drop policy if exists "public_read_rss" on rss_items;
create policy "public_read_rss" on rss_items for select to anon, authenticated using (true);

-- Write-only public on licensing_inquiries and newsletter_subscribers
drop policy if exists "public_insert_inquiry" on licensing_inquiries;
create policy "public_insert_inquiry" on licensing_inquiries for insert to anon, authenticated with check (true);

drop policy if exists "public_insert_newsletter" on newsletter_subscribers;
create policy "public_insert_newsletter" on newsletter_subscribers for insert to anon, authenticated with check (true);

-- Service-role-only select on sensitive tables (no anon select policy implies denied)

-- Indices

create index if not exists photos_gallery_idx on photos(gallery_slug);
create index if not exists photos_tags_idx on photos using gin(tags);
create index if not exists series_photos_series_idx on series_photos(series_slug);
create index if not exists licensing_inquiries_created_idx on licensing_inquiries(created_at desc);
