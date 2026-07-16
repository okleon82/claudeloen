import { ArrowRight, Lock } from "lucide-react";

import type { Project } from "@/lib/site/content";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Sparkline } from "@/components/charts/Sparkline";

export function ProjectCard({ project }: { project: Project }) {
  const isSoon = project.status === "soon";

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border p-8",
        isSoon ? "border-dashed bg-transparent" : "bg-card",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm text-muted-foreground">{project.index}</span>
        {isSoon && (
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            Coming soon
          </span>
        )}
      </div>

      <h3 className={cn("mt-4 text-2xl font-semibold tracking-tight", isSoon && "text-muted-foreground")}>
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{project.subtitle}</p>

      {!isSoon && (
        <>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{project.problem}</p>

          {project.actions.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.actions.map((action) => (
                <Badge key={action} variant="outline">
                  {action}
                </Badge>
              ))}
            </div>
          )}

          {project.metric && (
            <div className="mt-auto pt-8">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Before</p>
                  <p className="text-base font-medium text-muted-foreground">{project.metric.before}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">After</p>
                  <p className="text-xl font-semibold">{project.metric.after}</p>
                </div>
                <Badge variant="primary" className="ml-auto">
                  {project.metric.delta}
                </Badge>
              </div>
              <div className="mt-5">
                <Sparkline data={project.metric.trend} />
              </div>
            </div>
          )}

          {project.insight && (
            <p className="mt-auto rounded-xl bg-secondary/60 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
              {project.insight}
            </p>
          )}
        </>
      )}
    </div>
  );
}
