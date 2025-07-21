"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroAboutMe() {
  return (
    <section className="relative py-24 max-w-4xl mx-auto flex flex-col items-center text-center overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-5xl font-bold mb-4 tracking-tight"
      >
        Curious about the person behind the code?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
      >
        Learn more about my journey, values, and what drives my passion for technology and creativity.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <Button asChild size="lg" className="text-lg px-8 py-4">
          <Link href="/about">About Me</Link>
        </Button>
      </motion.div>
      {/* Decorative background */}
      <div className="absolute -z-10 left-1/2 top-1/2 w-[400px] h-[200px] -translate-x-1/2 -translate-y-1/2 bg-primary/10 rounded-full blur-2xl" />
    </section>
  );
} 