import SectionCard from "./SectionCard";
import { hero } from "@/lib/portfolio/content";

export default function Hero() {
  return (
    <SectionCard index="01" label="About Me" dark className="lg:row-span-1">
      <p className="text-xs font-medium text-white/60">{hero.eyebrow}</p>
      <h1 className="mt-3 text-4xl font-bold leading-tight">
        {hero.headline.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>
      <p className="mt-4 whitespace-pre-line text-sm text-white/80">{hero.subheadline}</p>
      <div className="mt-auto pt-10">
        <p className="text-base font-semibold">{hero.name}</p>
        <ul className="mt-2 space-y-0.5 text-xs text-white/60">
          {hero.roleTags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </SectionCard>
  );
}
