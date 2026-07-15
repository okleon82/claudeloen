# Leon — Business Growth 디지털 헤드쿼터

"Growth is built before it is seen." 을 중심 메시지로 하는 1페이지 브랜드 사이트입니다.
포트폴리오가 아니라, 비즈니스 성장 전략가로서의 정체성을 보여주는 사이트를 목표로 만들었습니다.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · shadcn/ui 스타일 컴포넌트 ·
Framer Motion · next-themes(다크모드) 로 구성했습니다.

## 로컬 실행

```bash
npm install
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있습니다.

## 구성 섹션

Home(Hero) → About(타임라인) → Projects(4개 프로젝트 카드) → Business Journal(펼침형 아티클) →
Skills(아이콘 카테고리) → Resume(요약 + PDF 다운로드) → Contact(클로징 CTA)

## 내용 수정하기

**`lib/site/content.ts` 파일 하나만 수정하면 사이트의 모든 텍스트/숫자가 바뀝니다.**
컴포넌트(`components/sections/*.tsx`)는 레이아웃만 담당하므로 건드릴 필요가 없습니다.

| 항목 | 설명 |
|---|---|
| `site` / `nav` | 이름, 철학 문구, 상단 내비게이션 라벨 |
| `hero` | 표지 문구, 이름, 역할 태그, CTA |
| `about` | "Who I Am" 타임라인 (Korea → FIT → Street Brand → Restaurant → Analytics) |
| `projects` | 프로젝트 4개 (문제 정의, 실행 태그, before/after 지표, 트렌드) |
| `journal` | Business Journal 아티클 (제목, 한 줄 티저, 펼침 본문) |
| `skills` | 역량 카테고리 + 아이콘 |
| `resume` | 요약, 하이라이트, PDF/LinkedIn/GitHub/이메일 링크 |
| `contact` | 클로징 CTA 문구, 이메일 |

아직 예시 값으로 남아있는 항목: `resume.linkedinHref`, `resume.githubHref` (실제 주소로 교체 필요).

### 이력서 PDF 갱신하기

`public/resume-leon-joohyung-kim.pdf` 는 정적 파일입니다. 내용을 바꾸려면 새 PDF로 교체하거나,
같은 파일명으로 직접 만든 PDF를 덮어쓰면 `resume.pdfHref` 값 그대로 다운로드 버튼에 반영됩니다.

## 배포

Vercel에 저장소를 Import 하면 별도 설정 없이 바로 배포됩니다 (환경변수 불필요).

## 폴더 구조

```
app/
  layout.tsx              폰트, 메타데이터/SEO, ThemeProvider
  page.tsx                섹션 조립 (Hero~Contact)
  globals.css             Tailwind 진입점 + 라이트/다크 디자인 토큰
components/
  nav/SiteNav.tsx         고정 내비게이션 + 모바일 시트 메뉴
  theme/                  다크모드 Provider/Toggle
  sections/               섹션별 컴포넌트 (Hero, About, Projects, Journal, Skills, Resume, Contact)
  charts/Sparkline.tsx    프로젝트 카드용 미니 트렌드 차트
  motion/FadeIn.tsx       스크롤 등장 애니메이션 래퍼
  ui/                     버튼/카드/뱃지/아코디언/시트 등 shadcn 스타일 프리미티브
lib/
  site/content.ts         사이트에 표시되는 모든 텍스트/데이터
  utils.ts                cn() 클래스 병합 유틸
public/
  resume-leon-joohyung-kim.pdf   다운로드용 이력서 PDF
```
