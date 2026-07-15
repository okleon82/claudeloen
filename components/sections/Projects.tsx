import { projects } from "@/lib/site/content";
import { FadeIn } from "@/components/motion/FadeIn";
import { ProjectCard } from "@/components/sections/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="border-t border-border bg-secondary/40 py-28">
      <div className="container">
        <FadeIn>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Featured Projects</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Every project starts with a problem, not a tool.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <FadeIn key={project.index} delay={i * 0.06}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
