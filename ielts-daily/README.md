# IELTS Daily

매일 오후 5시, 나만의 IELTS General Training 연습을 위한 개인용 정적 웹사이트.
콘텐츠는 `content/days/day-XXX.json` 파일로 직접 관리하며, 별도의 백엔드나 DB 없이
빌드 타임에 폴더를 스캔해 사이트를 생성합니다.

> 이 프로젝트는 리포지토리 루트가 아니라 `ielts-daily/` 서브디렉터리에 있습니다.
> (루트에는 무관한 다른 프로젝트가 이미 있어서, 별도 폴더로 분리했습니다.)

## 기술 스택

- Next.js 14 (App Router, 정적 export) + TypeScript + Tailwind CSS
- 콘텐츠: `content/days/day-001.json`, `day-002.json` … 파일 기반, DB/CMS 없음
- 스키마 검증: Zod — 스키마와 다른 파일이 있으면 빌드가 명확한 에러 메시지와 함께 실패합니다
- 상태 저장(완료 체크, 진행률, 다크모드 등): 브라우저 `localStorage` (서버 불필요)

## 페이지 구성

| 경로 | 설명 |
|---|---|
| `/` | 오늘 날짜에 해당하는 Day를 자동으로 보여줌. 없으면 최신 Day + 안내 문구, 일요일에는 복습 안내 |
| `/day/[n]` | Day 상세 — Listening / Reading / Speaking / Writing / 단어장 / 숙어장 / 정답지 / 추천 콘텐츠 (아코디언) |
| `/archive` | 전체 Day 카드 목록 + 완료 체크박스 |
| `/vocab` | 전체 Day의 단어 모음 — 목록 검색 / 플래시카드 / 4지선다 퀴즈 모드 |

## 새 Day 추가하는 법 (매일 반복하는 작업)

1. `content/days/` 폴더에 `day-XXX.json` 파일을 새로 만듭니다. (예: `day-003.json`, `day-010.json`)
   - 파일명의 번호는 안 맞아도 되지만, 관리 편의를 위해 `day` 필드 값과 3자리로 맞춰서 이름 짓는 것을 권장합니다 (`day-003.json` → `"day": 3`).
2. 아래 [데이터 스키마](#데이터-스키마)에 맞춰 내용을 채웁니다. `content/days/day-001.json`을 복사해서 값만 바꾸는 것이 가장 빠릅니다.
3. 로컬에서 `npm run dev` 중이라면 파일을 저장하는 즉시 브라우저에 반영됩니다 (Fast Refresh).
4. 완료되면 git에 커밋 후 push하세요. Vercel에 연결되어 있다면 push 시 자동으로 재배포됩니다.
5. 스키마에 맞지 않는 값(필수 필드 누락, 타입 오류 등)이 있으면 `npm run build`(또는 배포 시 자동 빌드)가 **어느 파일의 어느 필드가 문제인지** 알려주며 실패합니다. 안내된 부분을 수정한 뒤 다시 빌드하세요.

## 데이터 스키마

`content/days/day-XXX.json`은 다음 형태를 따라야 합니다 (Zod 스키마 원본: `lib/schema.ts`).

```jsonc
{
  "day": 1,
  "date": "2026-07-31",           // YYYY-MM-DD
  "weekday": "금요일",             // 월요일|화요일|수요일|목요일|금요일|토요일|일요일 중 하나
  "topic": "Social Media Regulation and Young People",
  "listening": {
    "partA": {
      "script": "...",
      "questions": ["..."],
      "answers": ["..."]
    },
    "partB": {
      "script": "...",
      "questions": [{ "question": "...", "options": ["A) ...", "B) ...", "C) ..."] }],
      "answers": ["..."]
    }
  },
  "reading": {
    "title": "...",
    "article": "여러 문단은 \\n\\n으로 구분",
    "tfng": { "questions": ["..."], "answers": ["True", "False", "Not Given"] },
    "completion": { "questions": ["..."], "answers": ["..."] }
  },
  "speaking": {
    "part1": ["..."],
    "part2": "cue card 본문",
    "part3": ["..."]
  },
  "writing": {
    "task1": { "type": "Formal", "prompt": "...", "outline": "..." }, // type: Formal|Semi-formal|Informal
    "task2": { "prompt": "...", "outline": "..." },
    "feedback": { "before": "6점대 예시", "comment": "첨삭 코멘트", "after": "7점대 예시" }
  },
  "vocab": [{ "word": "...", "meaning": "...", "example": "..." }],
  "idioms": [{ "phrase": "...", "meaning": "...", "example": "..." }],
  "recommendations": {
    "article": { "title": "...", "url": "https://..." },
    "podcast": { "title": "...", "url": "https://..." }
  }
}
```

요일별 테마(홈/Day 페이지 배지에 자동 표시됨):

| 요일 | 테마 |
|---|---|
| 월 | 직장/커리어 |
| 화 | 환경/기술 |
| 수 | 교육 |
| 목 | 건강/라이프스타일 |
| 금 | 사회 이슈 |
| 토 | 자유 주제 + 모의 세트 |
| 일 | 복습만 (신규 콘텐츠 없이 복습 유도 문구 표시) |

일요일은 새 `day-XXX.json`을 만들지 않아도 됩니다 — 홈 화면이 자동으로 "복습의 날" 안내와 함께 최근 Day 목록을 보여줍니다.

## 로컬 실행

```bash
cd ielts-daily
npm install
npm run dev
```

`http://localhost:3000`에서 확인합니다.

```bash
npm run build   # 정적 빌드 (스키마 검증 포함) → out/ 폴더 생성
npm run start   # 빌드 결과를 로컬에서 서버로 미리보기
```

## 배포

### Vercel

1. GitHub 저장소를 Vercel에 Import
2. **Root Directory**를 `ielts-daily`로 지정 (리포지토리 루트가 아니라 이 서브폴더가 프로젝트이므로 반드시 설정)
3. Framework Preset: Next.js (자동 감지), 나머지 빌드 설정은 기본값 그대로 사용
4. Deploy — 이후 `ielts-daily/content/days/`에 파일을 추가하고 `main`에 push할 때마다 자동 재배포됩니다

### GitHub Pages

`next.config.mjs`에 `output: "export"`가 설정되어 있어 `npm run build` 결과물이 `out/` 폴더에 완전한 정적 HTML로 생성됩니다.

1. `npm run build`
2. `out/` 폴더 내용을 GitHub Pages가 서빙하는 브랜치(예: `gh-pages`)에 배포 (또는 GitHub Actions로 자동화)
3. 리포지토리가 `<user>.github.io`가 아닌 프로젝트 페이지라면, Pages 설정에서 base path를 프로젝트 이름으로 지정해야 링크가 깨지지 않습니다

## 기능 요약

- **완료 체크**: Day별로 "완료" 체크박스 (localStorage 저장, 기기별로 독립)
- **다크모드**: 헤더의 다크/라이트 버튼, 최초 방문 시 시스템 설정을 따름
- **모바일 반응형**: 폰에서 매일 저녁 확인하는 것을 기준으로 디자인
- **인쇄 / PDF 저장**: Day 페이지의 "인쇄 / PDF 저장" 버튼 → 전용 인쇄 스타일 적용, 정답지는 기본적으로 인쇄에서 제외되며 "정답지 포함하여 인쇄" 체크박스로 포함 여부 선택 가능
- **오늘 진행률**: Listening/Reading/Speaking/Writing 중 몇 개 섹션을 열어봤는지 상단 진행바로 표시 (Day별 localStorage)
- **단어장 모음** (`/vocab`): 전체 Day의 단어를 모아 검색, 플래시카드(클릭해서 뒤집기), 4지선다 퀴즈 모드 제공

## 폴더 구조

```
content/days/day-001.json   콘텐츠 (매일 추가하는 파일)
lib/schema.ts                Zod 스키마 정의
lib/content.ts                content/days 스캔·검증·정렬
lib/vocab.ts                  전체 Day의 단어 모음
lib/useLocalStorage.ts        localStorage 동기화 훅
components/                   Accordion, WordTable, Flashcards, VocabQuiz 등 UI 컴포넌트
app/page.tsx                  홈 (오늘의 Day / 복습 안내)
app/day/[n]/page.tsx          Day 상세
app/archive/page.tsx          아카이브
app/vocab/page.tsx            단어장 모음
```
