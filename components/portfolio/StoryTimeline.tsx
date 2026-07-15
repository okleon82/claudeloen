import SectionCard from "./SectionCard";
import { story } from "@/lib/portfolio/content";

export default function StoryTimeline() {
  return (
    <SectionCard index="02" label="My Business Story">
      <p className="text-sm text-[#52514e]">{story.intro}</p>
      <div className="relative mt-8 flex flex-1 items-start justify-between gap-2">
        <div className="absolute left-[10%] right-[10%] top-[22px] hidden h-px bg-[#e1e0d9] sm:block" aria-hidden />
        {story.steps.map((step) => (
          <div key={step.title} className="relative flex flex-1 flex-col items-center text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-[#f9f9f7] text-lg">
              {step.icon}
            </div>
            <p className="mt-2 text-xs font-semibold text-[#0b0b0b]">{step.title}</p>
            <p className="mt-1 text-[10px] leading-snug text-[#898781]">{step.subtitle}</p>
            <p className="mt-1 text-[10px] text-[#898781]">{step.period}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
