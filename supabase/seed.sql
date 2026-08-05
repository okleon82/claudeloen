-- 업로드된 '자금관리_수정본_ETF증식자산 v6' 워크북 값을 초기 데이터로 삽입한다.
-- schema.sql 실행 후 이 파일을 실행한다.

insert into monthly_records (month, salary, other_income, loan_payment, other_fixed, extra_expense, memo) values
  ('2026-08', 2855860, 380000, 828533, 1007890, 0, '통신비 15만원(이번 달) — 9월부터 5만원으로 인하 예정'),
  ('2026-09', 2855860, 380000, 828533, 907890, 0, null),
  ('2026-10', 2855860, 380000, 828533, 907890, 0, null),
  ('2026-11', 0, 6587200, 828533, 707890, 0, '퇴직금(세전 320만원) 3,136,000원 + 실업급여 1,651,200원(9,907,200원÷6개월) + 용돈 1,800,000원'),
  ('2026-12', 0, 3451200, 828533, 707890, 0, null),
  ('2027-01', 0, 3451200, 828533, 707890, 0, null),
  ('2027-02', 0, 3451200, 828533, 707890, 0, null),
  ('2027-03', 0, 3451200, 828533, 707890, 0, null),
  ('2027-04', 0, 3451200, 828533, 707890, 0, '실업급여 마지막 지급월(11/25~4/25, 6개월 분할)'),
  ('2027-05', 1800000, 0, 828533, 707890, 0, '5/25부터 신규 급여 180만원'),
  ('2027-06', 1800000, 0, 828533, 707890, 0, null),
  ('2027-07', 1800000, 0, 828533, 707890, 0, null),
  ('2027-08', 1800000, 0, 828533, 707890, 0, null),
  ('2027-09', 1800000, 0, 828533, 707890, 0, null),
  ('2027-10', 1800000, 0, 828533, 707890, 0, null),
  ('2027-11', 1800000, 0, 828533, 707890, 0, null)
on conflict (month) do nothing;

insert into debts (name, balance, annual_rate, monthly_payment, priority) values
  ('다올저축은행', 38900411, 0.1366, 593753, 1),
  ('SBI저축은행', 15237533, 0.1366, 234780, 2);

insert into long_term_settings (id, cash_assets, investment_assets, target_net_worth, expected_annual_return, expected_severance, expected_unemployment_benefit, starting_cumulative_assets)
values (1, 2502867, 1314266, 100000000, 0.075, 3200000, 9907200, 2502867)
on conflict (id) do update set
  cash_assets = excluded.cash_assets,
  investment_assets = excluded.investment_assets,
  target_net_worth = excluded.target_net_worth,
  expected_annual_return = excluded.expected_annual_return,
  expected_severance = excluded.expected_severance,
  expected_unemployment_benefit = excluded.expected_unemployment_benefit,
  starting_cumulative_assets = excluded.starting_cumulative_assets;

insert into goal_plan_settings (id, title, target_month, note)
values (1, '자금확보플랜 · 호주 워킹홀리데이 (전기·배관 기술직 루트)', '2027-12', '모든 금액은 원화 환산 기준이며, 정확한 금액은 학원·기관 확인 후 업데이트 필요')
on conflict (id) do update set
  title = excluded.title,
  target_month = excluded.target_month,
  note = excluded.note;

insert into goal_plan_items (category, item, expected_month, amount, note, sort_order) values
  ('한국 자격증 취득', '전기기능사 (필기+실기)', '2026-11', 650000, '국비지원 적용', 1),
  ('한국 자격증 취득', '전기기능사 필기 교재 4종', '2026-08', 140000, '기초수학용어집·이론서·기출문제집·포켓요약집, 13만~15만원', 2),
  ('한국 자격증 취득', '배관기능사 (선택)', '2027-03', 250000, '국비지원, 약 20만원대 예상 — 학원 확인 후 업데이트 필요', 3),
  ('한국 자격증 취득', '공조냉동기계기능사 (선택)', '2027-06', 280000, '국비지원, 23만~33만원', 4),
  ('한국 자격증 취득', '학점은행제 41학점 (전기산업기사 응시자격용)', '2027-09', 950000, '국비지원 미적용, 정가 60만~130만원', 5),
  ('호주 출국 준비', '워킹홀리데이(417) 비자 신청비', '2027-09', 650000, '환율 변동 있을 수 있음 — 최신 금액 확인 필요', 6),
  ('호주 출국 준비', '입국 자금증빙 (AUD 5,000)', '2027-11', 4500000, '환율 900원/AUD 가정 — 실제 인출 없이 잔고 증명용', 7),
  ('호주 출국 준비', '항공권', '2027-12', 0, '비자 승인 후 예매 예정 — 별도 확인 필요, 금액 미포함', 8),
  ('호주 현지 초기비용', '지게차 면허 (LF class High Risk Work Licence)', '2028-01', 405000, 'AUD 300~600, 환율 900원/AUD 가정', 9);

insert into allocation_settings (
  id, monthly_spare_cash, cma_rate, emergency_fund_months, monthly_essential_expense, current_stage,
  stage1_debt_pct, stage1_etf_pct, stage1_stock_pct, stage1_cma_pct,
  stage2_debt_pct, stage2_etf_pct, stage2_stock_pct, stage2_cma_pct
) values (
  1, 1150000, 0.035, 3, 1078533, 1,
  0.35, 0.2, 0.1, 0.35,
  0.3, 0.4, 0.2, 0.1
)
on conflict (id) do update set
  monthly_spare_cash = excluded.monthly_spare_cash,
  cma_rate = excluded.cma_rate,
  emergency_fund_months = excluded.emergency_fund_months,
  monthly_essential_expense = excluded.monthly_essential_expense,
  current_stage = excluded.current_stage,
  stage1_debt_pct = excluded.stage1_debt_pct,
  stage1_etf_pct = excluded.stage1_etf_pct,
  stage1_stock_pct = excluded.stage1_stock_pct,
  stage1_cma_pct = excluded.stage1_cma_pct,
  stage2_debt_pct = excluded.stage2_debt_pct,
  stage2_etf_pct = excluded.stage2_etf_pct,
  stage2_stock_pct = excluded.stage2_stock_pct,
  stage2_cma_pct = excluded.stage2_cma_pct;

insert into etf_settings (
  id, stage1_monthly_invest, scenario_conservative_rate, scenario_base_rate, scenario_aggressive_rate,
  voo_pct, voo_dividend_yield, schd_pct, schd_dividend_yield, stock_pct, stock_dividend_yield
) values (
  1, 100000, 0.06, 0.075, 0.1,
  0.5, 0.013, 0.3, 0.035, 0.2, 0.01
)
on conflict (id) do update set
  stage1_monthly_invest = excluded.stage1_monthly_invest,
  scenario_conservative_rate = excluded.scenario_conservative_rate,
  scenario_base_rate = excluded.scenario_base_rate,
  scenario_aggressive_rate = excluded.scenario_aggressive_rate,
  voo_pct = excluded.voo_pct,
  voo_dividend_yield = excluded.voo_dividend_yield,
  schd_pct = excluded.schd_pct,
  schd_dividend_yield = excluded.schd_dividend_yield,
  stock_pct = excluded.stock_pct,
  stock_dividend_yield = excluded.stock_dividend_yield;

insert into stock_holdings (name, ticker, buy_amount, buy_date, current_value, note, sort_order) values
  ('Nvidia', 'NVDA', 0, null, 0, null, 1),
  ('Google (Alphabet)', 'GOOGL', 0, null, 0, null, 2),
  ('dispatch (종목명 확인 필요)', null, 0, null, 0, null, 3);
