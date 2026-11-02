-- Run once in the SQL Editor of the dedicated Supabase wishlist project.
-- Safe to rerun: preserves existing reservations and does not change Auth settings.
begin;

create table if not exists public.wishlist_gifts (
  id text primary key,
  title text not null,
  repeatable boolean not null default false,
  position integer not null unique,
  constraint wishlist_gifts_known_id check (id in (
    'oneblade', 'mirror', 'sneakers', 'sunglasses', 'hairdryer', 'bracelets',
    'multitool', 'screwdriver', 'vacuum', 'phone-holder', 'giftcard', 'cash'
  )),
  constraint wishlist_gifts_repeatability check (
    repeatable = (id in ('sunglasses', 'giftcard', 'cash'))
  )
);

create table if not exists public.wishlist_reservations (
  id uuid primary key default pg_catalog.gen_random_uuid(),
  gift_id text not null references public.wishlist_gifts(id),
  name text not null,
  token_hash text not null,
  created_at timestamptz not null default pg_catalog.now(),
  -- NULL slots allow multiple people to choose money/certificates.
  -- A unique index arbitrates concurrent requests for every other gift.
  slot integer generated always as (
    case when gift_id in ('sunglasses', 'giftcard', 'cash') then null else 1 end
  ) stored,
  constraint wishlist_reservations_name check (
    name = pg_catalog.btrim(name)
    and pg_catalog.char_length(name) between 2 and 60
    and name !~ '[[:cntrl:]]'
  ),
  constraint wishlist_reservations_token check (token_hash ~ '^[0-9a-f]{64}$'),
  constraint wishlist_one_reservation_per_gift unique (gift_id, slot)
);

-- Certificates and cash allow several independent bookings, including when a
-- family uses one browser. The unique slot still permits only one physical gift.
alter table public.wishlist_reservations
  drop constraint if exists wishlist_one_reservation_per_browser;

-- The browser generates 32 random bytes and sends their 64-character lowercase
-- hex encoding in x-wishlist-token. It submits SHA-256(UTF8(hex)) as token_hash.
-- Only the hash is stored. Missing/malformed headers fail closed with NULL.
create or replace function public.wishlist_request_token_hash()
returns text
language sql
stable
security invoker
set search_path = ''
as $function$
  select case when token ~ '^[0-9a-f]{64}$'
    then pg_catalog.encode(
      pg_catalog.sha256(pg_catalog.convert_to(token, 'UTF8')), 'hex'
    )
    else null
  end
  from (
    select (nullif(pg_catalog.current_setting('request.headers', true), '')::jsonb
      ->> 'x-wishlist-token') as token
  ) as request_token;
$function$;

revoke all on function public.wishlist_request_token_hash() from public;
grant execute on function public.wishlist_request_token_hash() to anon, authenticated;

-- Supabase's automatic-RLS option creates this administrative event-trigger
-- function in public. It is not a guest API and needs no guest EXECUTE grant.
do $admin_rls$
begin
  if pg_catalog.to_regprocedure('public.rls_auto_enable()') is not null then
    revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end;
$admin_rls$;

alter table public.wishlist_gifts enable row level security;
alter table public.wishlist_reservations enable row level security;

-- Remove table-level defaults and any older column-level grants before granting
-- only the operations this public site actually needs.
revoke all on table public.wishlist_gifts from public, anon, authenticated;
revoke all (id, title, repeatable, position)
  on public.wishlist_gifts from public, anon, authenticated;
revoke all on table public.wishlist_reservations from public, anon, authenticated;
revoke all (id, gift_id, name, token_hash, created_at, slot)
  on public.wishlist_reservations from public, anon, authenticated;

grant usage on schema public to anon, authenticated;
grant select on public.wishlist_gifts to anon, authenticated;
grant select (id, gift_id, name, created_at)
  on public.wishlist_reservations to anon, authenticated;
grant insert (id, gift_id, name, token_hash)
  on public.wishlist_reservations to anon, authenticated;
grant delete on public.wishlist_reservations to anon, authenticated;

drop policy if exists wishlist_gifts_public_read on public.wishlist_gifts;
create policy wishlist_gifts_public_read on public.wishlist_gifts
  for select to anon, authenticated using (true);

drop policy if exists wishlist_reservations_public_read on public.wishlist_reservations;
create policy wishlist_reservations_public_read on public.wishlist_reservations
  for select to anon, authenticated using (true);

drop policy if exists wishlist_reservations_guest_insert on public.wishlist_reservations;
create policy wishlist_reservations_guest_insert on public.wishlist_reservations
  for insert to anon, authenticated
  with check (token_hash = (select public.wishlist_request_token_hash()));

drop policy if exists wishlist_reservations_owner_delete on public.wishlist_reservations;
create policy wishlist_reservations_owner_delete on public.wishlist_reservations
  for delete to anon, authenticated
  using (token_hash = (select public.wishlist_request_token_hash()));

-- No UPDATE policy or privilege: names, gifts, ownership and dates cannot be
-- reassigned by guests. Cancelling requires the original browser's secret.
insert into public.wishlist_gifts (id, title, repeatable, position) values
  ('oneblade', 'Philips OneBlade 360 / 360 Pro', false, 1),
  ('mirror', 'Підлогове дзеркало від 160 см', false, 2),
  ('sneakers', 'New Balance 530', false, 3),
  ('sunglasses', 'Сертифікат на сонцезахисні окуляри', true, 4),
  ('hairdryer', 'Фен', false, 5),
  ('bracelets', 'Шкіряний або металевий браслет', false, 6),
  ('multitool', 'Швейцарський ніж або мультитул', false, 7),
  ('screwdriver', 'Викрутка з магнітом', false, 8),
  ('vacuum', 'Мініакумуляторний пилосос', false, 9),
  ('phone-holder', 'Тримач телефона в авто', false, 10),
  ('giftcard', 'Гіфткард Amazon / Skroutz', true, 11),
  ('cash', 'Гроші в конвертику з побажаннями', true, 12)
on conflict (id) do update set
  title = excluded.title,
  repeatable = excluded.repeatable,
  position = excluded.position;

-- Oleg's existing reservation has no guest-held cancellation secret.
-- The server generates a random secret, hashes it and discards the original.
insert into public.wishlist_reservations (gift_id, name, token_hash)
values (
  'phone-holder', 'Олег',
  pg_catalog.encode(pg_catalog.sha256(pg_catalog.convert_to(
    pg_catalog.gen_random_uuid()::text || pg_catalog.gen_random_uuid()::text,
    'UTF8'
  )), 'hex')
)
on conflict (gift_id, slot) do nothing;

notify pgrst, 'reload schema';
commit;

-- Client REST queries must explicitly select id,gift_id,name,created_at.
-- SELECT * and selecting token_hash are deliberately forbidden.
-- Guests enter display names, not verified identities. This small public list
-- does not provide rate limiting; keep the invitation link within your circle.
