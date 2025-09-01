"use client";

import { Mail, Github, Linkedin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
        <p className="text-muted-foreground mb-8">
          I'm open to opportunities and collaborations. Feel free to reach out!
        </p>
        <div className="flex flex-col items-center gap-4">
          <a href="mailto:phjoon@umich.edu" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="h-5 w-5 text-primary" />
            <span>phjoon@umich.edu</span>
          </a>
          <a href="https://github.com/phjoon1012" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Github className="h-5 w-5 text-primary" />
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/hyeonjoon-park-a6a531248/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="h-5 w-5 text-primary" />
            <span>LinkedIn</span>
          </a>
        </div>
      </section>
    </div>
  );
} 