import { Download, FileText, Github, Linkedin, Mail } from "lucide-react";

import { resume, site } from "@/lib/site/content";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Resume() {
  return (
    <section id="resume" className="border-t border-border bg-secondary/40 py-28">
      <div className="container">
        <FadeIn>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Resume</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">The short version of everything above.</p>
        </FadeIn>

        <FadeIn delay={0.1} className="mx-auto mt-14 max-w-2xl">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{site.fullName}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">{resume.role}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {resume.email} · {resume.phone}
            </p>

            <p className="mt-5 leading-relaxed text-muted-foreground">{resume.summary}</p>

            <Separator className="my-6" />

            <ul className="flex flex-col gap-3">
              {resume.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href={resume.pdfHref} download>
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={resume.coverLetterHref} download>
                  <FileText className="h-4 w-4" />
                  자기소개서 (PDF)
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={resume.linkedinHref} target="_blank" rel="noreferrer">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={resume.githubHref} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={`mailto:${resume.email}`}>
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
