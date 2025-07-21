"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroCreative() {
  return (
    <section className="relative py-32 max-w-5xl mx-auto flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-secondary/10 to-background blur-2xl" />
      {/* Profile image with subtle animation */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8"
      >
        <Image
          src="/profile.jpg"
          alt="Hyeonjoon Park"
          width={128}
          height={128}
          className="rounded-full border-4 border-primary shadow-lg object-cover mx-auto"
        />
      </motion.div>
      {/* Animated intro text */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight"
      >
        Hi, I'm <span className="text-primary">Hyeonjoon Park</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="text-lg md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
      >
        Software Developer & AI Engineer passionate about building scalable web apps, intelligent systems, and creative digital experiences.
      </motion.p>
      {/* Animated buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button asChild size="lg" className="text-lg px-8 py-4">
          <Link href="/about">About Me</Link>
        </Button>
        <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4">
          <Link href="/work">My Work</Link>
        </Button>
      </motion.div>
      {/* Decorative floating shapes */}
      <motion.div
        className="absolute left-10 top-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
      <motion.div
        className="absolute right-10 bottom-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-pulse"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
    </section>
  );
} 