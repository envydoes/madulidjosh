# Dingalan Aurora (Next.js + Supabase)

Conversion of the PHP/MySQL booking site to Next.js (App Router, TypeScript) on Supabase Postgres. Deploys to Vercel.

## Setup
1. Create a Supabase project and run `supabase/schema.sql` in the SQL editor.
2. Authentication -> Users -> Add user (your admin email + password), then run the `update auth.users ...` statement at the bottom of `schema.sql` to give that user the admin role.
3. `cp .env.example .env.local` and fill in the Supabase URL/keys (Project Settings -> API). Resend is optional.
4. `npm install && npm run dev`, then open http://localhost:3000 (admin: /admin).

## Deploy to Vercel
Import the repo and add the same variables from `.env.example` under Project Settings -> Environment Variables.

## What changed from the PHP version
- `rooms` replaces `services`; one `bookings` row per stay (check_in/check_out) instead of one row per night.
- Double booking is blocked by a database exclusion constraint, so simultaneous bookings can't both succeed.
- No more fake "guest" user accounts with the password `guest`; the guest email is stored on the booking.
- Prices come from the `rooms` table (the browser can no longer send its own price).
- Admin login uses Supabase Auth (email + password) instead of the `users` table; Row Level Security enforces admin-only access to bookings.
- Emails go through Resend instead of PHP `mail()`.
- Dropped: the unused weather/virtual-tour stubs, the `thankyou.php` fallback page, the scroll fade-in effect, and admin "edit booking" (change status or delete instead).

## Migrating existing MySQL data (untested; adjust names)
Load the old `users`, `services`, `bookings` tables into a `legacy` schema, then collapse nightly rows into stays:
```sql
insert into bookings (room_id, guest_email, check_in, check_out, total_price, status)
select r.id, u.email, min(b.booking_date), max(b.booking_date) + 1,
       (max(b.booking_date) + 1 - min(b.booking_date)) * r.price, b.status::booking_status
from (select *, booking_date - (row_number() over (partition by user_id, service_id, status order by booking_date))::int as grp
      from legacy.bookings) b
join legacy.users u on u.id = b.user_id
join legacy.services s on s.id = b.service_id
join rooms r on r.name = s.name
group by u.email, r.id, r.price, b.status, b.grp;
```
