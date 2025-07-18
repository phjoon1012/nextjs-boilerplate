'use client';

import { Feature102 } from "@/components/feature102";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Download } from "lucide-react";

export default function About() {
  const handleDownloadResume = () => {
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Hyeonjoon_Park_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen">
      {/* Professional Bio Section */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            I&apos;m a passionate Software Developer and AI Engineer with expertise in building scalable web applications, 
            intelligent AI systems, and immersive gaming experiences. With a strong foundation in full-stack development 
            and machine learning, I specialize in creating innovative solutions that solve real-world problems.
          </p>
        </div>

        {/* Resume Download Section */}
        <div className="bg-card border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Download My Resume</h2>
          <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border">
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Get a comprehensive overview of my experience, skills, and achievements in a professional format.
            </p>
            <Button onClick={handleDownloadResume} className="flex items-center gap-2 mx-auto">
              <Download className="h-4 w-4" />
              Download Resume (PDF)
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-card border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Get In Touch</h2>
          <div className="text-center">
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="mailto:phjoon@umich.edu" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5 text-primary" />
                <span>phjoon@umich.edu</span>
              </a>
              <a href="https://github.com/phjoon1012" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5 text-primary" />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/hyeonjoon-park-0000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5 text-primary" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Technical Expertise</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold mb-3">Web Development</h3>
              <p className="text-muted-foreground text-sm">
                Full-stack development with React, Next.js, Node.js, and modern web technologies. 
                Experience with microservices, cloud deployment, and performance optimization.
              </p>
            </div>
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold mb-3">Artificial Intelligence</h3>
              <p className="text-muted-foreground text-sm">
                Machine learning, computer vision, and NLP with Python, TensorFlow, and PyTorch. 
                Experience deploying AI models in production environments.
              </p>
            </div>
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-semibold mb-3">Game Development</h3>
              <p className="text-muted-foreground text-sm">
                2D/3D game development with Unity and Unreal Engine. Mobile game development with Flutter. 
                Experience with VR/AR technologies and game optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Original Feature102 Component */}
      <Feature102 />
    </div>
  );
} 