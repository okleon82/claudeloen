import SectionCard from "./SectionCard";
import { project4 } from "@/lib/portfolio/content";

function InfoGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-black/10 px-2.5 py-2">
          <p className="text-[10px] font-semibold text-[#0b0b0b]">{item.label}</p>
          <p className="mt-1 text-[10px] leading-snug text-[#52514e]">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export default function Project4Card() {
  return (
    <SectionCard index={project4.index} label={project4.label}>
      <h3 className="text-xl font-bold text-[#0b0b0b]">{project4.title}</h3>
      <p className="mt-1 text-sm text-[#52514e]">{project4.subtitle}</p>

      <div className="mt-4">
        <InfoGrid items={project4.overview} />
      </div>
      <div className="mt-2">
        <InfoGrid items={project4.strategy} />
      </div>

      <p className="mt-4 text-xs font-medium text-[#898781]">Financial Projection (1년차)</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {project4.financials.map((f) => (
          <div key={f.label} className="rounded-xl bg-[#f9f9f7] px-3 py-2">
            <p className="text-[11px] text-[#898781]">{f.label}</p>
            <p className="mt-1 text-sm font-semibold text-[#0b0b0b]">{f.value}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 rounded-xl bg-[#f9f9f7] px-3 py-2 text-xs text-[#52514e] lg:mt-auto">{project4.expansionPlan}</p>
    </SectionCard>
  );
}
