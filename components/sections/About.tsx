import { about } from "@/lib/site/content";
import { FadeIn } from "@/components/motion/FadeIn";

export function About() {
  return (
    <section id="about" className="border-t border-border py-28">
      <div className="container">
        <FadeIn>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{about.title}</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">{about.intro}</p>
        </FadeIn>

        <div className="relative mx-auto mt-16 max-w-2xl">
          <div className="absolute bottom-3 left-[7px] top-3 w-px bg-border" aria-hidden />
          <ol className="flex flex-col gap-12">
            {about.timeline.map((step, i) => (
              <FadeIn key={step.label} delay={i * 0.08}>
                <li className="relative pl-10">
                  <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-primary bg-background" />
                  <p className="text-lg font-semibold">{step.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
