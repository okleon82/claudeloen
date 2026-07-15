# 개인 포트폴리오 웹페이지

자기소개 + 경력/이력서 스타일의 1페이지 비즈니스 포트폴리오입니다. Next.js 14 (App Router) + Tailwind CSS로 만들었습니다.

## 로컬 실행

```bash
npm install
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있습니다.

## 내용 수정하기

**`lib/portfolio/content.ts` 파일 하나만 수정하면 사이트의 모든 텍스트/숫자가 바뀝니다.**
컴포넌트(`components/portfolio/*.tsx`, `components/charts/*.tsx`)는 레이아웃만 담당하므로 건드릴 필요가 없습니다.

`content.ts` 안에서 수정 가능한 항목:

| 항목 | 설명 |
|---|---|
| `meta` | 브라우저 탭 제목/설명 |
| `hero` | 표지 문구, 이름, 관심 분야 태그 |
| `story` | 경력/학력 타임라인 (아이콘, 제목, 설명, 연도) |
| `project1` ~ `project4` | 프로젝트 4개 (제목, 지표, 실행 단계, 차트 데이터) |
| `skills` | 역량 게이지, 사용 툴 뱃지 |
| `future` | 향후 목표/비전 문구 |
| `contact` | 이메일, 전화번호, 링크드인 등 연락처 |

`OOO`, `example@email.com`, `20XX`, `000,000,000원` 처럼 표시된 값은 전부 예시(placeholder)이니
실제 정보로 교체하면 됩니다. 필요 없는 프로젝트/섹션은 `app/page.tsx`에서 해당 컴포넌트를 지우면 됩니다.

## 배포

Vercel에 저장소를 Import 하면 별도 설정 없이 바로 배포됩니다 (환경변수 불필요).

## 폴더 구조

```
app/
  layout.tsx              메타데이터, 전역 폰트/배경
  page.tsx                섹션을 그리드로 배치
  globals.css             Tailwind 진입점
components/
  portfolio/              섹션별 컴포넌트 (Hero, StoryTimeline, ProjectCard, Skills, Future, Contact)
  charts/                 차트 컴포넌트 (LineTrend, Donut, BarList, StatTile, Meter)
lib/
  portfolio/content.ts    사이트에 표시되는 모든 텍스트/데이터
```
