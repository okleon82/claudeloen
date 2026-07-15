import { Mail } from "lucide-react";

import { contact } from "@/lib/site/content";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contact" className="border-t border-border bg-primary py-28 text-primary-foreground">
      <div className="container flex flex-col items-center text-center">
        <FadeIn>
          <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {contact.heading}
          </h2>
          <p className="mt-4 text-primary-foreground/70">{contact.subheading}</p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10">
          <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
            <a href={`mailto:${contact.email}`}>
              <Mail className="h-4 w-4" />
              {contact.email}
            </a>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
