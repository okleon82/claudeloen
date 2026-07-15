import SectionCard from "./SectionCard";
import LineTrend from "../charts/LineTrend";
import { project1 } from "@/lib/portfolio/content";

export default function Project1Card() {
  return (
    <SectionCard index={project1.index} label={project1.label}>
      <h3 className="text-xl font-bold text-[#0b0b0b]">{project1.title}</h3>
      <p className="mt-1 text-sm text-[#52514e]">{project1.subtitle}</p>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-[#f9f9f7] px-4 py-3">
        <div>
          <p className="text-[11px] text-[#898781]">{project1.before.label}</p>
          <p className="text-sm font-semibold text-[#0b0b0b]">{project1.before.value}</p>
        </div>
        <span className="text-[#898781]">→</span>
        <div>
          <p className="text-[11px] text-[#898781]">{project1.after.label}</p>
          <p className="text-sm font-semibold text-[#0b0b0b]">{project1.after.value}</p>
        </div>
        <span className="rounded-full bg-[#cde2fb] px-2 py-1 text-xs font-semibold text-[#184f95]">
          {project1.deltaLabel}
        </span>
      </div>

      <ul className="mt-4 flex flex-col gap-2 text-xs">
        {project1.steps.map((step) => (
          <li key={step.title} className="flex items-start gap-2">
            <span>{step.icon}</span>
            <span>
              <span className="font-semibold text-[#0b0b0b]">{step.title}</span>{" "}
              <span className="text-[#52514e]">{step.desc}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-[#898781]">{project1.trend.label}</p>
        <LineTrend data={project1.trend.data} />
      </div>
    </SectionCard>
  );
}
