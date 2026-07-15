import SectionCard from "./SectionCard";
import Meter from "../charts/Meter";
import { skills } from "@/lib/portfolio/content";

export default function Skills() {
  return (
    <SectionCard index="07" label="Skills">
      <p className="mb-3 text-xs font-medium text-[#898781]">역량</p>
      <div className="flex flex-col gap-3">
        {skills.skills.map((skill) => (
          <Meter key={skill.label} label={skill.label} level={skill.level} />
        ))}
      </div>

      <p className="mb-3 mt-6 text-xs font-medium text-[#898781]">Tools</p>
      <div className="flex flex-wrap gap-2">
        {skills.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-black/10 bg-[#f9f9f7] px-3 py-1 text-xs font-medium text-[#0b0b0b]"
          >
            {tool}
          </span>
        ))}
      </div>
    </SectionCard>
  );
}
