import SectionCard from "./SectionCard";
import { future } from "@/lib/portfolio/content";

export default function Future() {
  return (
    <SectionCard index="08" label="Future" dark>
      <p className="whitespace-pre-line text-lg font-bold leading-snug">{future.statement}</p>
      <ul className="mt-6 flex flex-col gap-4">
        {future.pillars.map((pillar) => (
          <li key={pillar.title} className="flex gap-3">
            <span className="text-lg">{pillar.icon}</span>
            <div>
              <p className="text-sm font-semibold">{pillar.title}</p>
              <p className="mt-0.5 text-xs text-white/70">{pillar.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
