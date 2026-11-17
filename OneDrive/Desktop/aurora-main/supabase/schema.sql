-- Dingalan Aurora booking system: Supabase (Postgres) schema.
-- Run in the Supabase SQL editor.

create extension if not exists btree_gist;

create type booking_status as enum ('pending', 'confirmed', 'checkedin', 'checkedout', 'cancelled');

-- Rooms (was "services" in the MySQL version)
create table rooms (
  id          bigint generated always as identity primary key,
  name        text not null unique,
  description text not null default '',
  price       numeric(10,2) not null check (price >= 0),
  created_at  timestamptz not null default now()
);

-- One row per stay (was one row per night). The exclusion constraint makes
-- double booking impossible, even when two guests book at the same instant.
create table bookings (
  id          bigint generated always as identity primary key,
  room_id     bigint not null references rooms(id) on delete restrict,
  guest_email text not null,
  check_in    date not null,
  check_out   date not null,
  nights      int generated always as (check_out - check_in) stored,
  total_price numeric(10,2) not null,
  status      booking_status not null default 'pending',
  created_at  timestamptz not null default now(),
  check (check_out > check_in),
  constraint no_double_booking exclude using gist (
    room_id with =,
    daterange(check_in, check_out, '[)') with &&
  ) where (status in ('pending', 'confirmed', 'checkedin'))
);
create index bookings_check_in_idx on bookings (check_in desc);

-- Admin = a Supabase Auth user whose app_metadata.role is 'admin'
create or replace function is_admin() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
$$;

alter table rooms    enable row level security;
alter table bookings enable row level security;

create policy "rooms are public"   on rooms for select using (true);
create policy "admin manages rooms"    on rooms    for all to authenticated using (is_admin()) with check (is_admin());
create policy "admin manages bookings" on bookings for all to authenticated using (is_admin()) with check (is_admin());
-- No public policy on bookings: guest emails stay private.

-- Public availability lookup: returns only booked nights, never guest data.
create or replace function booked_dates(p_room bigint, p_from date, p_to date)
returns setof date
language sql stable security definer set search_path = public as $$
  select distinct d::date
  from bookings b
  cross join lateral generate_series(
    greatest(b.check_in, p_from)::timestamp,
    (least(b.check_out, p_to) - 1)::timestamp,
    interval '1 day') d
  where b.room_id = p_room
    and b.status in ('pending', 'confirmed', 'checkedin')
    and b.check_in < p_to and b.check_out > p_from
$$;
grant execute on function booked_dates(bigint, date, date) to anon, authenticated;

insert into rooms (name, description, price) values
 ('1 Bed Room', 'Perfect for solo travelers or couples, our 1 Bed Room offers comfort and privacy with a touch of Filipino hospitality. Enjoy a restful stay with all the essentials you need.', 1000),
 ('2 Bed Room', 'Ideal for families or friends, our 2 Bed Room provides extra space and comfort. Experience the beauty of Dingalan with a relaxing stay in a modern Filipino-inspired setting.', 1500),
 ('3 Bed Room', 'Traveling with a group? Our 3 Bed Room is perfect for barkadas or big families. Spacious, clean, and designed for comfort, it''s your home away from home in Aurora.', 1999);

-- After creating your admin user (Authentication -> Users -> Add user), run:
-- update auth.users
--   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'
--   where email = 'you@example.com';
