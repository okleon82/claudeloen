import { journal } from "@/lib/site/content";
import { FadeIn } from "@/components/motion/FadeIn";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function Journal() {
  return (
    <section id="journal" className="border-t border-border py-28">
      <div className="container">
        <FadeIn>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Business Journal</h2>
          <p className="mt-4 max-w-lg text-muted-foreground">Notes on how great businesses grow.</p>
        </FadeIn>

        <FadeIn delay={0.1} className="mx-auto mt-14 max-w-2xl">
          <Accordion type="single" collapsible>
            {journal.map((article) => (
              <AccordionItem key={article.title} value={article.title}>
                <AccordionTrigger>
                  <span className="flex flex-col gap-1 text-left">
                    <span>{article.title}</span>
                    <span className="text-sm font-normal text-muted-foreground">{article.teaser}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>{article.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
