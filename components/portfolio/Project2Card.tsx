import SectionCard from "./SectionCard";
import { project2 } from "@/lib/portfolio/content";

export default function Project2Card() {
  return (
    <SectionCard index={project2.index} label={project2.label}>
      <h3 className="text-xl font-bold text-[#0b0b0b]">{project2.title}</h3>
      <p className="mt-1 text-sm text-[#52514e]">{project2.subtitle}</p>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-[#f9f9f7] px-4 py-3">
        <div>
          <p className="text-[11px] text-[#898781]">{project2.before.label}</p>
          <p className="text-sm font-semibold text-[#0b0b0b]">{project2.before.value}</p>
        </div>
        <span className="text-[#898781]">→</span>
        <div>
          <p className="text-[11px] text-[#898781]">{project2.after.label}</p>
          <p className="text-sm font-semibold text-[#0b0b0b]">{project2.after.value}</p>
        </div>
        <span className="rounded-full bg-[#cde2fb] px-2 py-1 text-xs font-semibold text-[#184f95]">
          {project2.deltaLabel}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {project2.goals.map((goal) => (
          <div key={goal.label} className="rounded-xl border border-black/10 px-3 py-2">
            <p className="text-[11px] text-[#898781]">{goal.label}</p>
            <p className="mt-1 text-xs font-medium text-[#0b0b0b]">{goal.value}</p>
          </div>
        ))}
      </div>

      <ul className="mt-4 flex flex-col gap-2 text-xs">
        {project2.steps.map((step) => (
          <li key={step.title} className="flex items-start gap-2">
            <span>{step.icon}</span>
            <span>
              <span className="font-semibold text-[#0b0b0b]">{step.title}</span>{" "}
              <span className="text-[#52514e]">{step.desc}</span>
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 rounded-xl bg-[#f9f9f7] px-3 py-2 text-xs leading-relaxed text-[#52514e] lg:mt-auto">
        {project2.result}
      </p>
    </SectionCard>
  );
}
