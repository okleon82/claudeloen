import {
  Target,
  TrendingUp,
  Briefcase,
  BarChart3,
  Users,
  PieChart,
  Database,
  FileSpreadsheet,
  Code2,
  Languages,
  type LucideIcon,
} from "lucide-react";

import { skills, type SkillItem } from "@/lib/site/content";
import { FadeIn } from "@/components/motion/FadeIn";

const iconMap: Record<SkillItem["icon"], LucideIcon> = {
  Target,
  TrendingUp,
  Briefcase,
  BarChart3,
  Users,
  PieChart,
  Database,
  FileSpreadsheet,
  Code2,
  Languages,
};

export function Skills() {
  return (
    <section id="skills" className="border-t border-border py-28">
      <div className="container">
        <FadeIn>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Skills</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">Tools and disciplines I work across.</p>
        </FadeIn>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {skills.map((skill, i) => {
            const Icon = iconMap[skill.icon];
            return (
              <FadeIn key={skill.label} delay={i * 0.04}>
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-border px-4 py-8 text-center transition-colors hover:border-primary/40">
                  <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  <span className="text-sm font-medium">{skill.label}</span>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
