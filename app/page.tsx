import { SiteNav } from "@/components/nav/SiteNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Journal } from "@/components/sections/Journal";
import { Skills } from "@/components/sections/Skills";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Journal />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Leon Joohyung Kim
      </footer>
    </>
  );
}
