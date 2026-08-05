# 자금관리 · ETF증식자산

개인용 자금관리 웹앱. 업로드된 `자금관리_수정본_ETF증식자산 v6.xlsx` 워크북(이번 달 자금관리 · 월별기록 · 장기플랜 ·
자금확보플랜 · 여유자금 배분 · ETF 증식자산)을 모바일에서 수정 가능한 웹사이트로 옮긴 것입니다. 스프레드시트의
수식은 모두 실시간 계산 로직(`lib/calc.ts`)으로 재현되어, 값을 바꾸면 관련된 모든 숫자가 즉시 다시 계산됩니다.

## 기술 스택

- Frontend/Backend: Next.js 14 (App Router, API Route Handlers)
- Database: Supabase PostgreSQL
- Auth: 앱 비밀번호 + 쿠키 세션 (미들웨어로 사이트 전체 보호, 로그인 페이지만 예외)
- Styling: Tailwind CSS (모바일 우선)
- Deployment: Vercel

## 페이지 구조

| 경로 | 설명 |
|---|---|
| `/` | 이번 달 자금관리 요약 + 자산·부채 요약 + 바로가기 |
| `/monthly` | 월별기록 (월별 수입/지출 입력, 누적 보유자산 자동 계산) |
| `/debts` | 장기플랜 — 자산·부채 현황, 대출 상세, 퇴직 관련 예상액 |
| `/goal` | 자금확보플랜 — 목표(호주 워킹홀리데이 등) 준비 비용 항목 |
| `/allocation` | 여유자금 배분 — 부채상환/ETF/개별주/CMA 단계별 배분, CMA 성장 표 |
| `/etf` | ETF 증식자산 — 30년 시나리오 시뮬레이션, 목표 순자산 도달 시점, 개별주 트래킹 |
| `/login` | 로그인 |

전체 사이트가 비밀번호로 보호됩니다(개인 재무 정보를 다루므로). `middleware.ts`가 `/login`, `/api/login`을
제외한 모든 경로를 세션 쿠키로 검사합니다.

## 폴더 구조

```
app/
  page.tsx, DashboardClient.tsx        이번 달 자금관리 (/)
  monthly/                             월별기록
  debts/                               장기플랜
  goal/                                자금확보플랜
  allocation/                          여유자금 배분
  etf/                                 ETF 증식자산 + 개별주
  login/                               로그인
  api/                                 각 화면에 대응하는 CRUD 라우트
lib/
  types.ts                             도메인 타입
  calc.ts                              스프레드시트 수식 재현 (NPER, FV, 누적계산 등)
  db.ts                                Supabase ↔ 데모 모드 분기
  mock-store.ts                        Supabase 미설정 시 메모리 저장 (업로드 워크북 값으로 시드)
  auth.ts                              비밀번호 세션 토큰
  supabase/                            Supabase 클라이언트
middleware.ts                          사이트 전체 접근 보호
supabase/
  schema.sql                           테이블 스키마
  seed.sql                             업로드 워크북 값 기반 초기 데이터
```

## API 키 없이 데모로 체험하기

Supabase / APP_PASSWORD를 아무것도 설정하지 않아도 전체 플로우를 바로 체험할 수 있다.

```bash
npm install
npm run dev
```

- `.env.local`을 만들지 않아도 된다 (환경변수가 없으면 자동으로 데모 모드로 동작).
- 데이터는 Supabase 대신 서버 메모리에 저장되며, 업로드된 워크북의 실제 값으로 미리 채워져 있다.
  **서버를 재시작하면 초기화**된다.
- 로그인 비밀번호는 기본값 `admin1234`이다.
- 실제로 계속 쓰려면(모바일에서 수정한 내용이 남아있으려면) 아래 "로컬 실행 방법"을 따라 Supabase를 반드시
  설정해야 한다.

## 로컬 실행 방법 (실제 Supabase 연동)

### 1. 의존성 설치

```bash
npm install
```

### 2. Supabase 프로젝트 준비

1. [supabase.com](https://supabase.com)에서 새 프로젝트 생성
2. Supabase 대시보드 → SQL Editor에서 아래 순서로 실행
   - `supabase/schema.sql` 실행 (테이블 생성)
   - `supabase/seed.sql` 실행 (업로드된 워크북 값으로 초기 데이터 등록)
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
APP_PASSWORD=                   # 사이트 전체 로그인 비밀번호
```

### 4. 개발 서버 실행

```bash
npm run dev
```

`http://localhost:3000` 접속 후 `APP_PASSWORD`로 로그인합니다.

## Vercel 배포 방법 (모바일에서 접속해서 수정하려면 필수)

1. GitHub 저장소를 Vercel에 Import
2. Framework Preset: Next.js (자동 감지)
3. Project Settings → Environment Variables에 아래 4개 값을 등록
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `APP_PASSWORD`
4. Deploy 클릭
5. 배포 전에 Supabase 프로젝트에 `schema.sql`, `seed.sql`이 이미 적용되어 있어야 합니다.
6. 배포된 URL을 모바일 브라우저에서 열고 "홈 화면에 추가"하면 앱처럼 사용할 수 있습니다.

## 스프레드시트 수식 재현

- 월별 누적 보유자산: 월 순서대로 남는 돈을 계속 더해가는 방식 (`computeMonthlySeries`)
- 대출 예상 상환개월: Excel `NPER` 재현 (`nper`)
- CMA/ETF 성장: Excel `FV` 재현 (`fv`, `fvStep`)
- 목표 순자산 도달 연도: 시나리오별 30년 표에서 목표액을 처음 넘는 연차 탐색 (`computeGoalReachYear`)

## 주의사항

이 워크북/앱은 개인적인 계획 수립을 돕기 위한 도구이며, 금융/세무 전문가의 투자자문을 대체하지 않습니다.
모든 수익률·시나리오는 참고용 추정치입니다.
