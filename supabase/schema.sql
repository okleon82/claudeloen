-- 점장AI MVP schema
-- Supabase PostgreSQL

create extension if not exists "pgcrypto";

-- =========================
-- stores
-- =========================
create table if not exists stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  opening_time time not null,
  closing_time time not null,
  last_order_time time,
  total_seats integer not null default 30,
  max_reservation_seats integer not null default 24,
  closed_days text[] default '{}',
  address text,
  parking_info text,
  main_menu text,
  group_reservation_threshold integer default 7,
  notice text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =========================
-- reservations
-- =========================
create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references stores(id) on delete cascade,
  customer_name text not null,
  phone text not null,
  reservation_date date not null,
  reservation_time time not null,
  party_size integer not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'rejected', 'cancelled', 'no_show')),
  memo text,
  admin_note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_reservations_store_date
  on reservations (store_id, reservation_date);

create index if not exists idx_reservations_status
  on reservations (status);

-- =========================
-- faqs
-- =========================
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references stores(id) on delete cascade,
  question text not null,
  answer text not null,
  category text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_faqs_store on faqs (store_id);

-- =========================
-- updated_at 자동 갱신 트리거
-- =========================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_stores_updated_at on stores;
create trigger trg_stores_updated_at
  before update on stores
  for each row execute function set_updated_at();

drop trigger if exists trg_reservations_updated_at on reservations;
create trigger trg_reservations_updated_at
  before update on reservations
  for each row execute function set_updated_at();

drop trigger if exists trg_faqs_updated_at on faqs;
create trigger trg_faqs_updated_at
  before update on faqs
  for each row execute function set_updated_at();

-- =========================
-- RLS: MVP는 서비스 role key로 서버에서만 쓰기/읽기하므로 기본적으로 비활성화.
-- 추후 고객 직접 조회가 필요해지면 정책을 추가한다.
-- =========================
alter table stores enable row level security;
alter table reservations enable row level security;
alter table faqs enable row level security;

-- anon 키로는 아무 것도 못 하도록 막고, 서버(API routes)는 service role key로 우회한다.
drop policy if exists "no anon access stores" on stores;
create policy "no anon access stores" on stores for all
  using (false) with check (false);

drop policy if exists "no anon access reservations" on reservations;
create policy "no anon access reservations" on reservations for all
  using (false) with check (false);

drop policy if exists "no anon access faqs" on faqs;
create policy "no anon access faqs" on faqs for all
  using (false) with check (false);
