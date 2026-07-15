import SectionCard from "./SectionCard";
import StatTile from "../charts/StatTile";
import Donut from "../charts/Donut";
import BarList from "../charts/BarList";
import { project3 } from "@/lib/portfolio/content";

export default function Project3Card() {
  return (
    <SectionCard index={project3.index} label={project3.label}>
      <h3 className="text-xl font-bold text-[#0b0b0b]">{project3.title}</h3>
      <p className="mt-1 text-sm text-[#52514e]">{project3.subtitle}</p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {project3.stats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-[#898781]">카테고리별 매출 비중</p>
        <Donut data={project3.categoryBreakdown} />
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-[#898781]">상위 항목</p>
        <BarList data={project3.topItems} />
      </div>

      <p className="mt-4 rounded-xl bg-[#f9f9f7] px-3 py-2 text-xs leading-relaxed text-[#52514e] lg:mt-auto">
        {project3.insight}
      </p>
    </SectionCard>
  );
}
