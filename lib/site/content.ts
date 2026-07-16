// 이 파일 하나만 수정하면 사이트 전체 카피/데이터가 바뀝니다. 컴포넌트는 건드릴 필요 없습니다.

export const site = {
  name: "Leon",
  fullName: "Leon Joohyung Kim",
  philosophy: "Growth is built before it is seen.",
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Business Journal", href: "#journal" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: site.philosophy,
  name: "Leon",
  roles: ["Business Growth", "Brand Strategy", "Commercial Planning"],
  subheadline:
    "I help businesses grow through strategy, consumer insights, and data-driven decision making.",
  ctaLabel: "View Projects",
  ctaHref: "#projects",
};

export interface TimelineStep {
  label: string;
  detail: string;
}

export const about = {
  title: "Who I Am",
  intro:
    "Not a straight line — a path built one operating decision at a time, from the shop floor to the dashboard.",
  timeline: [
    { label: "Korea", detail: "Where the story starts" },
    { label: "Fashion Institute of Technology (FIT)", detail: "Merchandising, finance, consumer behavior, brand strategy" },
    { label: "Street Brand Marketing", detail: "Influencer collaboration, community building, SNS growth" },
    { label: "Restaurant Operations", detail: "Full operational ownership — P&L, menu, floor, people" },
    { label: "Business Analytics", detail: "Turning operational data into growth decisions" },
  ] as TimelineStep[],
};

export interface Metric {
  label: string;
  before: string;
  after: string;
  delta: string;
  trend: number[];
}

export interface Project {
  index: string;
  title: string;
  subtitle: string;
  problem: string;
  actions: string[];
  metric?: Metric;
  status: "live" | "capability" | "soon";
}

export const projects: Project[] = [
  {
    index: "01",
    title: "Restaurant Growth",
    subtitle: "Izakaya · Full Operations",
    problem: "Monthly revenue had plateaued despite steady foot traffic.",
    actions: ["Data Analysis", "Menu Strategy", "Layout Optimization"],
    metric: {
      label: "Monthly Revenue",
      before: "19,000,000원",
      after: "25,000,000원",
      delta: "+30%",
      trend: [19, 21, 20, 23, 26, 25],
    },
    status: "live",
  },
  {
    index: "02",
    title: "Street Brand Growth",
    subtitle: "SNS & Community",
    problem: "Low brand awareness in a saturated streetwear market.",
    actions: ["SNS Strategy", "Influencer Outreach", "Community Building"],
    metric: {
      label: "Followers",
      before: "1,800",
      after: "2,300",
      delta: "+27.8%",
      trend: [1800, 1950, 2100, 2200, 2300],
    },
    status: "live",
  },
  {
    index: "03",
    title: "Business Analytics",
    subtitle: "Power BI Dashboard",
    problem: "Operational decisions were made on intuition, not data.",
    actions: ["Power BI", "Dashboard Design", "Sales", "Inventory", "Customer Insights"],
    status: "capability",
  },
  {
    index: "04",
    title: "Fashion Business Project",
    subtitle: "Coming soon",
    problem: "",
    actions: [],
    status: "soon",
  },
];

export interface JournalArticle {
  title: string;
  teaser: string;
  content: string;
}

export const journal: JournalArticle[] = [
  {
    title: "Why Starbucks Wins",
    teaser: "It never sold coffee. It sold the third place between work and home.",
    content:
      "Starbucks' real product was never the espresso — it was a designed environment people were willing to pay a premium to sit inside. By treating every store as a branded experience and every loyalty point as a small psychological reward, it turned a commodity into a daily ritual. The lesson for any brand: price the experience, not just the item.",
  },
  {
    title: "How Lululemon Built Loyalty",
    teaser: "Ambassadors, not ads, became the growth engine.",
    content:
      "Lululemon grew by handing its brand voice to local instructors and community ambassadors instead of a traditional ad budget. That created a loyalty loop where the customer already trusted the person recommending the product before they ever saw a price tag. Community-led growth is slower to start and far harder to copy — which is exactly why it compounds.",
  },
  {
    title: "Why Costco Works",
    teaser: "A $1.50 hot dog isn't a menu item — it's a trust signal.",
    content:
      "Costco caps its own margins and keeps a handful of prices frozen for decades to prove, constantly, that the membership fee is the only place it makes money from you. Paired with a rotating 'treasure hunt' assortment that rewards frequent visits, it turns a warehouse into a habit. Trust and surprise, running together, is a durable growth model.",
  },
  {
    title: "Business Lessons from Muji",
    teaser: "No logo, no excess — the absence of branding became the brand.",
    content:
      "Muji built a global business by removing everything ornamental: no visible logo, no unnecessary packaging, no decorative flourish on the product itself. That restraint became a distinct identity in a market full of noise, and it kept costs — and prices — structurally lower than competitors. Sometimes the most defensible strategy is subtraction, not addition.",
  },
  {
    title: "How Zara Turned Speed Into a Brand",
    teaser: "The product isn't the dress. The product is being first.",
    content:
      "Zara's edge was never design — it was the two-week loop from sketch to store shelf, built on small batches and a supply chain designed to move fast, not cheap. That speed manufactured scarcity: an item you didn't buy this week is likely gone next week. Commercial planning was the brand strategy — inventory turnover became the thing customers felt as 'always something new.'",
  },
  {
    title: "Nike Doesn't Sell Shoes — It Sells Identity",
    teaser: "\"Just Do It\" was never about the product spec sheet.",
    content:
      "Nike's advertising rarely dwells on cushioning technology; it sells the identity of the person who pushes through. That emotional anchor lets Nike command premium pricing and stay relevant across sports, generations, and product cycles that would sink a feature-led competitor. When the brand sells identity, the product just has to be good enough to carry it.",
  },
  {
    title: "Patagonia's Anti-Growth Growth Strategy",
    teaser: "\"Don't Buy This Jacket\" sold more jackets.",
    content:
      "Patagonia built loyalty by telling customers to consume less and repair what they own — a message that should have hurt sales but instead deepened trust to the point that customers chose the brand for everything else they did buy. Values, credibly held even at a short-term cost, became the moat competitors couldn't copy without admitting they didn't mean it.",
  },
];

export interface SkillItem {
  label: string;
  icon:
    | "Target"
    | "TrendingUp"
    | "Briefcase"
    | "BarChart3"
    | "Users"
    | "PieChart"
    | "Database"
    | "FileSpreadsheet"
    | "Code2"
    | "Languages";
}

export const skills: SkillItem[] = [
  { label: "Business Strategy", icon: "Target" },
  { label: "Brand Growth", icon: "TrendingUp" },
  { label: "Commercial Planning", icon: "Briefcase" },
  { label: "Business Analytics", icon: "BarChart3" },
  { label: "Consumer Insights", icon: "Users" },
  { label: "Power BI", icon: "PieChart" },
  { label: "SQL", icon: "Database" },
  { label: "Excel", icon: "FileSpreadsheet" },
  { label: "Python", icon: "Code2" },
  { label: "English", icon: "Languages" },
];

export const resume = {
  role: "Business Growth Strategist",
  summary:
    "FIT-trained in Fashion Business Management, with hands-on experience turning brand marketing and full-scale restaurant operations into measurable growth. I connect consumer insight, operational data, and execution to help businesses grow deliberately, not by accident.",
  highlights: [
    "Grew monthly restaurant revenue 30% through POS-driven menu and layout decisions",
    "Grew a street brand's audience 27.8% through influencer and community strategy",
    "Full operational ownership: P&L, cost and inventory, staffing, customer experience",
  ],
  pdfHref: "/resume-leon-joohyung-kim.pdf",
  linkedinHref: "https://www.linkedin.com/in/joo-hyung-kim-971800187",
  githubHref: "https://github.com/okleon82",
  email: "joohk1179@gmail.com",
  phone: "010-8040-0802",
};

export const contact = {
  heading: "Let's build something that grows.",
  subheading: "Open to business growth, strategy, and analytics roles.",
  email: "joohk1179@gmail.com",
  phone: "010-8040-0802",
};
