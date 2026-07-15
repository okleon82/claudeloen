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
  title: "OOO - Business Growth Portfolio",
  description: "데이터와 실행으로 비즈니스의 성장을 만드는 사람",
};

export const hero = {
  eyebrow: "Business Growth Portfolio",
  headline: ["Building", "Better", "Businesses."],
  subheadline: "데이터와 실행으로\n비즈니스의 성장을 만듭니다.",
  name: "OOO",
  roleTags: [
    "Business Growth & Strategy",
    "직무 / 전공",
    "관심 분야 1",
    "관심 분야 2",
    "관심 분야 3",
  ],
};

export const story = {
  intro: "경험이 쌓여, 비즈니스를 이해하고 성장시키는 사람이 되었습니다.",
  steps: [
    { icon: "🏫", title: "고등학교", subtitle: "주어진 환경에 익숙했던 시기", period: "20XX" },
    { icon: "🎯", title: "전공 / 동아리", subtitle: "관심 분야를 발견하고 학습", period: "20XX" },
    { icon: "📱", title: "SNS 운영 경험", subtitle: "채널 운영 및 커뮤니케이션", period: "20XX" },
    { icon: "🏬", title: "현장 경험", subtitle: "현장에서 기초를 학습", period: "20XX" },
    { icon: "📈", title: "성장 프로젝트", subtitle: "데이터 역량 강화 및 커리어 확장", period: "20XX" },
  ] as StoryStep[],
};

export const project1 = {
  index: "03",
  label: "Project 1",
  title: "프로젝트 제목 1",
  subtitle: "데이터 분석과 실행으로 핵심 지표 30% 향상",
  before: { label: "Before", value: "19,000,000원" },
  after: { label: "After", value: "25,000,000원" },
  deltaLabel: "+30%",
  steps: [
    { icon: "❓", title: "문제 정의", desc: "핵심 지표 정체, 원인 파악 필요" },
    { icon: "🔍", title: "데이터 분석", desc: "관련 데이터 분석 (기간, 채널, 고객군)" },
    { icon: "💡", title: "인사이트 도출", desc: "핵심 고객군의 행동 패턴 발견" },
    { icon: "🚀", title: "실행", desc: "구성 변경, 개선안 반영" },
    { icon: "✅", title: "결과", desc: "핵심 지표 30% 개선" },
  ] as ProcessStep[],
  trend: {
    label: "지표 추이",
    unit: "월",
    data: [
      { label: "1월", value: 19 },
      { label: "2월", value: 21 },
      { label: "3월", value: 20 },
      { label: "4월", value: 23 },
      { label: "5월", value: 26 },
      { label: "6월", value: 29 },
    ],
  },
};

export const project2 = {
  index: "04",
  label: "Project 2",
  title: "프로젝트 제목 2",
  subtitle: "타겟 소통과 콘텐츠 전략으로 팔로워 성장",
  before: { label: "Before", value: "1,800명" },
  after: { label: "After", value: "2,300명" },
  deltaLabel: "+27.8%",
  goals: [
    { label: "목표", value: "브랜드 인지도 상승 및 커뮤니티 구축" },
    { label: "타겟", value: "핵심 관심층 (연령대 / 특성)" },
  ],
  steps: [
    { icon: "✉️", title: "채널 발송", desc: "관련 채널 소식 및 정보 전달" },
    { icon: "💬", title: "DM 답변", desc: "채널 소식 및 정보 전달" },
    { icon: "📝", title: "콘텐츠 제작", desc: "활용/제품 콘텐츠 설계" },
    { icon: "🔁", title: "지속적 소통", desc: "피드백 반영 및 관계 유지" },
  ] as ProcessStep[],
  result: "팔로워 1,800명 → 2,300명 (+27.8%), 브랜드 인지도 상승 및 협업 문의 증가",
};

export const project3 = {
  index: "05",
  label: "Project 3",
  title: "프로젝트 제목 3",
  subtitle: "데이터로 의사결정을 돕는 대시보드 구축",
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
  label: "Project 4",
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
    { label: "Data Analysis", level: 4.5 },
    { label: "Excel / Power BI", level: 4.5 },
    { label: "SQL", level: 4 },
    { label: "Marketing", level: 4 },
    { label: "Financial Analysis", level: 3.5 },
    { label: "Project Management", level: 4 },
  ] as SkillItem[],
  tools: ["Excel", "Power BI", "SQL", "Python"],
};

export const future = {
  statement: "데이터와 실행으로\n더 큰 성장을 만들어가겠습니다.",
  pillars: [
    { icon: "📊", title: "데이터 기반 의사결정", desc: "데이터를 통해 고객과 시장을 이해하고, 전략적 의사결정을 지원합니다." },
    { icon: "🎯", title: "성과에 기여", desc: "조직의 가치를 높이고, 지속 가능한 성장을 만드는 데 기여합니다." },
    { icon: "🌍", title: "더 큰 무대로", desc: "더 큰 무대에서 역량을 이어가겠습니다." },
  ],
};

export const contact = {
  quote: "좋은 아이디어보다 중요한 것은\n실행하고, 개선하고,\n지속적으로 성장시키는 것입니다.",
  email: "example@email.com",
  phone: "010-0000-0000",
  linkLabel: "linkedin.com/in/username",
  linkHref: "https://linkedin.com/in/username",
};
