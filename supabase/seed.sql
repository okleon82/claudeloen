-- 점장AI MVP seed data
-- schema.sql 실행 이후에 실행한다.

-- 기존 데이터가 있으면 정리 (개발용 재시드)
delete from faqs;
delete from reservations;
delete from stores;

insert into stores (
  id,
  name,
  opening_time,
  closing_time,
  last_order_time,
  total_seats,
  max_reservation_seats,
  closed_days,
  address,
  parking_info,
  main_menu,
  group_reservation_threshold,
  notice
) values (
  '00000000-0000-0000-0000-000000000001',
  '로바타풍산',
  '17:00',
  '01:00',
  '00:00',
  32,
  24,
  array['일요일'],
  '테스트 주소',
  '건물 주차 가능',
  '사시미, 나베, 후토마끼',
  7,
  '전화 받기 힘든 사장님을 위한 AI 예약비서, 점장AI가 도와드립니다.'
);

insert into faqs (store_id, question, answer, category) values
  ('00000000-0000-0000-0000-000000000001', '주차 가능한가요?', '건물 주차 가능합니다. 방문 전 매장에 확인 부탁드립니다.', '주차'),
  ('00000000-0000-0000-0000-000000000001', '라스트오더는 몇 시인가요?', '라스트오더는 00:00입니다.', '영업시간'),
  ('00000000-0000-0000-0000-000000000001', '단체예약 가능한가요?', '7명 이상 단체예약은 매장 확인 후 확정됩니다.', '예약'),
  ('00000000-0000-0000-0000-000000000001', '영업시간이 어떻게 되나요?', '영업시간은 17:00부터 01:00까지입니다.', '영업시간'),
  ('00000000-0000-0000-0000-000000000001', '대표 메뉴는 무엇인가요?', '사시미, 나베, 후토마끼가 대표 메뉴입니다.', '메뉴');
