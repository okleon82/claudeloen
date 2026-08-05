-- 자금관리 · ETF증식자산 웹앱 스키마
-- 개인용 단일 사용자 도구이므로 설정성 데이터는 싱글턴 행(id=1)으로 관리한다.

create extension if not exists "pgcrypto";

-- 월별기록
create table if not exists monthly_records (
  id uuid primary key default gen_random_uuid(),
  month text not null unique, -- 'YYYY-MM'
  salary bigint not null default 0,
  other_income bigint not null default 0,
  loan_payment bigint not null default 0,
  other_fixed bigint not null default 0,
  extra_expense bigint not null default 0,
  memo text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 대출 (장기플랜 · 대출 상세)
create table if not exists debts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  balance bigint not null default 0,
  annual_rate numeric not null default 0, -- 0.1366 = 13.66%
  monthly_payment bigint not null default 0,
  priority int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 장기플랜 설정 (현금성자산·투자자산·목표순자산·퇴직 관련 예상액)
create table if not exists long_term_settings (
  id int primary key default 1,
  cash_assets bigint not null default 0,
  investment_assets bigint not null default 0,
  target_net_worth bigint not null default 100000000,
  expected_annual_return numeric not null default 0.075,
  expected_severance bigint not null default 0,
  expected_unemployment_benefit bigint not null default 0,
  starting_cumulative_assets bigint not null default 0,
  updated_at timestamptz not null default now(),
  constraint long_term_settings_singleton check (id = 1)
);

-- 자금확보플랜 설정 (목표 제목/목표월)
create table if not exists goal_plan_settings (
  id int primary key default 1,
  title text not null default '자금확보플랜',
  target_month text,
  note text,
  updated_at timestamptz not null default now(),
  constraint goal_plan_settings_singleton check (id = 1)
);

-- 자금확보플랜 항목
create table if not exists goal_plan_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  item text not null,
  expected_month text,
  amount bigint not null default 0,
  note text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 여유자금 배분 설정
create table if not exists allocation_settings (
  id int primary key default 1,
  monthly_spare_cash bigint not null default 0,
  cma_rate numeric not null default 0.035,
  emergency_fund_months int not null default 3,
  monthly_essential_expense bigint not null default 0,
  current_stage int not null default 1,
  stage1_debt_pct numeric not null default 0.35,
  stage1_etf_pct numeric not null default 0.2,
  stage1_stock_pct numeric not null default 0.1,
  stage1_cma_pct numeric not null default 0.35,
  stage2_debt_pct numeric not null default 0.3,
  stage2_etf_pct numeric not null default 0.4,
  stage2_stock_pct numeric not null default 0.2,
  stage2_cma_pct numeric not null default 0.1,
  updated_at timestamptz not null default now(),
  constraint allocation_settings_singleton check (id = 1),
  constraint allocation_settings_stage check (current_stage in (1, 2))
);

-- ETF 증식자산 설정
create table if not exists etf_settings (
  id int primary key default 1,
  stage1_monthly_invest bigint not null default 0,
  scenario_conservative_rate numeric not null default 0.06,
  scenario_base_rate numeric not null default 0.075,
  scenario_aggressive_rate numeric not null default 0.1,
  voo_pct numeric not null default 0.5,
  voo_dividend_yield numeric not null default 0.013,
  schd_pct numeric not null default 0.3,
  schd_dividend_yield numeric not null default 0.035,
  stock_pct numeric not null default 0.2,
  stock_dividend_yield numeric not null default 0.01,
  updated_at timestamptz not null default now(),
  constraint etf_settings_singleton check (id = 1)
);

-- 개별주 투자 현황
create table if not exists stock_holdings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  ticker text,
  buy_amount bigint not null default 0,
  buy_date date,
  current_value bigint not null default 0,
  note text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS: 이 앱은 service role key로만 서버에서 접근하므로(비밀번호 보호 API 라우트 경유),
-- anon 키로는 아무것도 읽고 쓸 수 없도록 RLS를 켜고 정책을 만들지 않는다.
alter table monthly_records enable row level security;
alter table debts enable row level security;
alter table long_term_settings enable row level security;
alter table goal_plan_settings enable row level security;
alter table goal_plan_items enable row level security;
alter table allocation_settings enable row level security;
alter table etf_settings enable row level security;
alter table stock_holdings enable row level security;
