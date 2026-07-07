# 점장AI (MVP v0.1)

전화 받기 힘든 사장님을 위한 AI 예약비서. 소형 음식점/이자카야 사장님이 네이버 예약 연동 없이도
바로 사용할 수 있는 자체 웹 예약 접수 + AI FAQ + 관리자 대시보드 MVP입니다.

## 기술 스택

- Frontend/Backend: Next.js 14 (App Router, API Route Handlers)
- Database: Supabase PostgreSQL
- Auth: 관리자 비밀번호 + 쿠키 세션 (미들웨어로 `/admin`, `/api/admin` 보호)
- AI: OpenAI API (`gpt-4o-mini`)
- Styling: Tailwind CSS
- Deployment: Vercel

## 페이지 구조

| 경로 | 설명 |
|---|---|
| `/` | 랜딩 페이지 (예약하기 / FAQ 문의 / 관리자) |
| `/reserve` | 고객 예약 요청 페이지 |
| `/faq` | 고객 FAQ / AI 챗 페이지 |
| `/admin` | 관리자 예약 대시보드 (비밀번호 보호) |
| `/admin/settings` | 매장 기본 설정 (비밀번호 보호) |
| `/admin/login` | 관리자 로그인 |

## 폴더 구조

```
app/
  page.tsx                        랜딩
  reserve/                        고객 예약 페이지
  faq/                            고객 FAQ 페이지
  admin/                          관리자 대시보드/설정/로그인
  api/
    reservations/route.ts         예약 생성 (공개)
    faq/route.ts                  AI FAQ 응답 (공개)
    admin/login/route.ts          관리자 로그인/로그아웃
    admin/reservations/route.ts   예약 목록 조회 (관리자)
    admin/reservations/[id]/      예약 상태/메모 변경 (관리자)
    admin/store/route.ts          매장 설정 조회/수정 (관리자)
lib/
  supabase/client.ts               브라우저용 Supabase 클라이언트 (anon key)
  supabase/admin.ts                서버 전용 Supabase 클라이언트 (service role key)
  types.ts                         Store / Reservation / Faq 타입 정의
  availability.ts                  예약 가능 여부 체크 로직
  db.ts                            Supabase 데이터 접근 함수 모음
  openai.ts                        OpenAI FAQ 응답 함수 (시스템 프롬프트 포함)
  notify.ts                        사장님 알림 (현재 콘솔 로그, 추후 이메일/알림톡 교체용)
  auth.ts                          관리자 비밀번호/세션 토큰 유틸
middleware.ts                      /admin, /api/admin 접근 보호
supabase/
  schema.sql                       테이블 스키마
  seed.sql                         초기 시드 데이터 (로바타풍산)
```

## 예약 가능 여부 로직 (`lib/availability.ts`)

1. 예약 날짜가 매장 휴무일이면 불가
2. 예약 시간이 영업시간 밖이면 불가 (자정을 넘기는 영업시간도 지원)
3. 예약 시간이 라스트오더 이후면 불가
4. 같은 날짜/시간대 pending+confirmed 인원 합계 + 신규 인원이 `max_reservation_seats`를 초과하면 불가
5. 인원이 `group_reservation_threshold` 이상이면 pending 저장은 되지만 "매장 확인 후 확정" 안내

## 로컬 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. Supabase 프로젝트 준비

1. [supabase.com](https://supabase.com)에서 새 프로젝트 생성
2. Supabase 대시보드 → SQL Editor에서 아래 순서로 실행
   - `supabase/schema.sql` 실행 (테이블 생성)
   - `supabase/seed.sql` 실행 (초기 매장/FAQ 데이터 등록)
3. Project Settings → API에서 URL / anon key / service role key 확인

### 3. 환경변수 설정

`.env.local.example`을 복사해 `.env.local`을 만들고 값을 채워주세요.

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=       # Supabase 프로젝트 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Supabase anon public key
SUPABASE_SERVICE_ROLE_KEY=      # Supabase service role key (서버 전용, 절대 클라이언트에 노출 금지)
OPENAI_API_KEY=                 # OpenAI API 키
ADMIN_PASSWORD=                 # /admin 관리자 로그인 비밀번호
```

### 4. 개발 서버 실행

```bash
npm run dev
```

`http://localhost:3000` 접속. 관리자 페이지는 `http://localhost:3000/admin`에서 `ADMIN_PASSWORD`로 로그인합니다.

## Vercel 배포 방법

1. GitHub 저장소를 Vercel에 Import
2. Framework Preset: Next.js (자동 감지)
3. Project Settings → Environment Variables에 아래 5개 값을 등록
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY`
   - `ADMIN_PASSWORD`
4. Deploy 클릭
5. 배포 전에 Supabase 프로젝트에 `schema.sql`, `seed.sql`이 이미 적용되어 있어야 합니다.

## 개발 우선순위 (구현 완료 상태)

- 1순위: DB schema, 예약 생성, 예약 목록, 예약 상태 변경 ✅
- 2순위: 매장 설정, 예약 가능 여부 체크 ✅
- 3순위: FAQ AI 응답 ✅
- 4순위: UI 개선, 관리자 비밀번호 보호 ✅

## 이번 버전(v0.1)에서 제외된 범위

- 네이버 예약 직접 연동
- 카카오톡 알림톡 연동 (현재는 콘솔 로그로 대체)
- 결제 기능 / POS 연동
- 복잡한 테이블 배치 알고리즘
- SNS 자동화, CRM 고도화
