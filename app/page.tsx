import Hero from "@/components/portfolio/Hero";
import StoryTimeline from "@/components/portfolio/StoryTimeline";
import Project1Card from "@/components/portfolio/Project1Card";
import Project2Card from "@/components/portfolio/Project2Card";
import Project3Card from "@/components/portfolio/Project3Card";
import Project4Card from "@/components/portfolio/Project4Card";
import Skills from "@/components/portfolio/Skills";
import Future from "@/components/portfolio/Future";
import Contact from "@/components/portfolio/Contact";
import { hero } from "@/lib/portfolio/content";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f9f9f7] px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#0b0b0b]">{hero.name} Portfolio</h1>
          <p className="mt-1 text-sm text-[#52514e]">{hero.eyebrow}</p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Hero />
          <StoryTimeline />
          <Project1Card />

          <Project2Card />
          <Project3Card />
          <Project4Card />

          <Skills />
          <Future />
          <Contact />
        </div>
      </div>
    </main>
  );
}
