"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { hero } from "@/lib/site/content";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
      >
        {hero.eyebrow}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-6 text-6xl font-semibold tracking-tight sm:text-8xl"
      >
        {hero.name}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-lg text-muted-foreground sm:text-xl"
      >
        {hero.roles.map((role, i) => (
          <span key={role} className="flex items-center gap-3">
            {i > 0 && <span className="h-1 w-1 rounded-full bg-muted-foreground/50" aria-hidden />}
            {role}
          </span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-8 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        {hero.subheadline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-10"
      >
        <Button size="lg" asChild>
          <a href={hero.ctaHref}>{hero.ctaLabel}</a>
        </Button>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="다음 섹션으로 스크롤"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
