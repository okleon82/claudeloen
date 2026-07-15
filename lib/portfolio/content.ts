// 이 파일의 값만 바꾸면 사이트 전체 내용이 바뀝니다. 코드(컴포넌트)는 건드릴 필요 없습니다.

export interface StoryStep {
  icon: string;
  title: string;
  subtitle: string;
  period: string;
}

export interface ProcessStep {
  icon: string;
  title: string;
  desc: string;
}

export interface StatTile {
  label: string;
  value: string;
  delta?: string;
  deltaGood?: boolean;
}

export interface SkillItem {
  label: string;
  level: number; // 0 ~ 5
}

export const meta = {
  title: "Leon Joohyung Kim - Business Growth Portfolio",
  description: "데이터와 실행으로 브랜드와 매장의 성장을 만드는 사람",
};

export const hero = {
  eyebrow: "Business Growth Portfolio",
  headline: ["Building", "Better", "Businesses."],
  subheadline: "데이터와 실행으로\n브랜드와 매장의 성장을 만듭니다.",
  name: "Leon Joohyung Kim",
  roleTags: [
    "Business Growth & Strategy",
    "FIT / Fashion Business Management",
    "Restaurant Operations",
    "Brand Marketing",
    "Business Analytics",
  ],
};

export const story = {
  intro: "현장의 감각과 데이터를 연결해, 비즈니스를 성장시키는 사람이 되었습니다.",
  steps: [
    {
      icon: "🎓",
      title: "FIT Fashion Business",
      subtitle: "상품기획·재무회계·소비자행동·브랜드전략 학습",
      period: "FIT",
    },
    {
      icon: "📱",
      title: "스트리트 브랜드 SNS 운영",
      subtitle: "인플루언서 협업 및 고객 커뮤니케이션으로 브랜드 인지도 확대",
      period: "Street Brand",
    },
    {
      icon: "🏮",
      title: "이자카야 운영 총괄",
      subtitle: "매출·원가·재고·발주·직원 운영 및 메뉴 기획 전반 담당",
      period: "Izakaya",
    },
    {
      icon: "📈",
      title: "Business Analytics",
      subtitle: "POS 데이터 기반 의사결정으로 매장 운영 역량 강화",
      period: "Growth",
    },
  ] as StoryStep[],
};

export const project1 = {
  index: "03",
  label: "Project 1",
  title: "이자카야 매출 성장 프로젝트",
  subtitle: "POS 데이터 분석과 운영 개선으로 월 매출 30% 향상",
  before: { label: "Before", value: "19,000,000원" },
  after: { label: "After", value: "25,000,000원" },
  deltaLabel: "+30%",
  steps: [
    { icon: "❓", title: "문제 정의", desc: "매출 정체, 고객 구매 패턴 파악 필요" },
    { icon: "🔍", title: "데이터 분석", desc: "POS 데이터 분석 (메뉴, 시간대, 고객 구매 패턴)" },
    { icon: "💡", title: "인사이트 도출", desc: "인기 메뉴·동선·재방문 고객의 사이드 메뉴 선호 발견" },
    { icon: "🚀", title: "실행", desc: "메뉴 구성 및 매장 동선 개선, 세트 구성 변경" },
    { icon: "✅", title: "결과", desc: "월 매출 30% 증가, 재방문율 상승" },
  ] as ProcessStep[],
  trend: {
    label: "월 매출 추이 (백만 원)",
    unit: "월",
    data: [
      { label: "1월", value: 19 },
      { label: "2월", value: 21 },
      { label: "3월", value: 20 },
      { label: "4월", value: 23 },
      { label: "5월", value: 26 },
      { label: "6월", value: 25 },
    ],
  },
};

export const project2 = {
  index: "04",
  label: "Project 2",
  title: "스트리트 브랜드 SNS 마케팅",
  subtitle: "인플루언서 협업과 콘텐츠 전략으로 팔로워 성장",
  before: { label: "Before", value: "1,800명" },
  after: { label: "After", value: "2,300명" },
  deltaLabel: "+27.8%",
  goals: [
    { label: "목표", value: "브랜드 인지도 확대 및 커뮤니티 구축" },
    { label: "타겟", value: "스트리트 패션 관심층" },
  ],
  steps: [
    { icon: "🤝", title: "인플루언서 협업", desc: "협업 제안 및 콘텐츠 진행" },
    { icon: "💬", title: "고객 커뮤니케이션", desc: "DM/댓글 응대 및 관계 구축" },
    { icon: "📝", title: "콘텐츠 기획·제작", desc: "브랜드 톤에 맞는 콘텐츠 설계" },
    { icon: "🔁", title: "지속적 소통", desc: "반응 데이터 반영 및 관계 유지" },
  ] as ProcessStep[],
  result: "팔로워 1,800명 → 2,300명 (+27.8%), 브랜드 인지도 및 커뮤니티 참여 증가",
};

export const project3 = {
  index: "05",
  label: "Project 3 (예시)",
  title: "프로젝트 제목 3",
  subtitle: "데이터로 의사결정을 돕는 대시보드 구축 — 가상 예시",
  stats: [
    { label: "Total Sales", value: "25.0M", delta: "+30%", deltaGood: true },
    { label: "Gross Profit", value: "8.7M", delta: "+28%", deltaGood: true },
    { label: "Avg. Order Value", value: "32,500", delta: "+15%", deltaGood: true },
    { label: "Repeat Purchase Rate", value: "42%", delta: "+12%", deltaGood: true },
  ] as StatTile[],
  categoryBreakdown: [
    { label: "카테고리 A", value: 37 },
    { label: "카테고리 B", value: 28 },
    { label: "카테고리 C", value: 19 },
    { label: "카테고리 D", value: 10 },
    { label: "기타", value: 6 },
  ],
  topItems: [
    { label: "항목 1", value: 8 },
    { label: "항목 2", value: 6.5 },
    { label: "항목 3", value: 5 },
    { label: "항목 4", value: 3.5 },
    { label: "항목 5", value: 2 },
  ],
  insight:
    "특정 시간대에 매출 비중이 높고, 특정 카테고리 매출이 전체의 60% 이상을 차지 → 핵심 카테고리 중심 전략 및 구성 강화가 효과적",
};

export const project4 = {
  index: "06",
  label: "Project 4 (예시)",
  title: "프로젝트 제목 4",
  subtitle: "가상의 비즈니스 기획 프로젝트",
  overview: [
    { label: "Market Research", value: "시장 및 소비자 트렌드 조사" },
    { label: "Target Customer", value: "타겟 고객층 정의" },
    { label: "Concept", value: "핵심 컨셉 정의" },
  ],
  strategy: [
    { label: "Product Mix", value: "제품/서비스 구성안" },
    { label: "Pricing Strategy", value: "가격 전략 수립" },
    { label: "Marketing Strategy", value: "채널별 마케팅 전략" },
  ],
  financials: [
    { label: "매출", value: "000,000,000원" },
    { label: "매출원가", value: "000,000,000원" },
    { label: "총이익", value: "000,000,000원" },
    { label: "순이익", value: "000,000,000원" },
  ] as StatTile[],
  expansionPlan: "지역 A → 지역 B → 지역 C 순으로 확장",
};

export const skills = {
  skills: [
    { label: "Business Strategy", level: 4.5 },
    { label: "Store Operations", level: 4.5 },
    { label: "Data Analysis (POS)", level: 4 },
    { label: "Brand Marketing", level: 4 },
    { label: "Merchandising", level: 3.5 },
    { label: "Financial / Cost Management", level: 3.5 },
    { label: "Content Creation", level: 3.5 },
  ] as SkillItem[],
  tools: ["Excel", "POS 시스템", "Instagram / Meta Business Suite"],
};

export const future = {
  statement: "현장의 감각과 데이터를 연결해\n지속 가능한 성장을 만들어가겠습니다.",
  pillars: [
    {
      icon: "📊",
      title: "데이터 기반 의사결정",
      desc: "POS·매출 데이터를 통해 고객과 매장을 이해하고, 운영 개선에 반영합니다.",
    },
    {
      icon: "🎯",
      title: "브랜드·매장 성장에 기여",
      desc: "브랜드 인지도와 매장 운영 효율을 함께 높이는 데 기여합니다.",
    },
    {
      icon: "🌱",
      title: "지속 가능한 운영 전략",
      desc: "현장 경험과 데이터를 연결해 지속 가능한 성장 전략을 만듭니다.",
    },
  ],
};

export const contact = {
  quote: "좋은 아이디어보다 중요한 것은\n실행하고, 개선하고,\n지속적으로 성장시키는 것입니다.",
  email: "joohk1179@gmail.com",
  phone: "010-0000-0000",
  linkLabel: "linkedin.com/in/username",
  linkHref: "https://linkedin.com/in/username",
};
