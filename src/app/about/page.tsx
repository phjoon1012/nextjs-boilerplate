'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Linkedin, Download, Calendar, MapPin, Building, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import SkillRadar from "@/components/ui/skill-radar";

export default function About() {
  // Simplified radar chart data - 5 main domains
  const radarData = [
    {
      category: "AI/ML",
      skills: [
        { name: "Overall", proficiency: 85 }
      ]
    },
    {
      category: "Frontend",
      skills: [
        { name: "Overall", proficiency: 92 }
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Overall", proficiency: 90 }
      ]
    },
    {
      category: "Cloud",
      skills: [
        { name: "Overall", proficiency: 80 }
      ]
    },
    {
      category: "Software Development",
      skills: [
        { name: "Overall", proficiency: 88 }
      ]
    }
  ];

  const experience = [
    {
      title: "Software Engineer",
      company: "Tech Company",
      location: "San Francisco, CA",
      period: "2023 - Present",
      description: "Developed scalable microservices architecture handling 10M+ daily requests, implemented robust CI/CD pipelines reducing deployment time by 60%, and led cross-functional teams to deliver high-impact features.",
      technologies: ["React", "Node.js", "AWS", "Docker", "Kubernetes"]
    },
    {
      title: "AI Research Assistant",
      company: "University of Michigan",
      location: "Ann Arbor, MI",
      period: "2022 - 2023",
      description: "Researched and implemented machine learning models for natural language processing, achieving 15% improvement in model accuracy through innovative data preprocessing techniques.",
      technologies: ["Python", "TensorFlow", "PyTorch", "NLP", "Deep Learning"]
    },
    {
      title: "Full Stack Developer",
      company: "Startup",
      location: "Remote",
      period: "2021 - 2022",
      description: "Built reliable web applications from concept to deployment, designed robust database schemas supporting 100K+ users, and implemented comprehensive testing strategies ensuring 99.9% uptime.",
      technologies: ["JavaScript", "PostgreSQL", "Redis", "Jest", "TypeScript"]
    }
  ];

  const skills = [
    { name: "React", proficiency: "Expert", category: "Frontend" },
    { name: "TypeScript", proficiency: "Expert", category: "Frontend" },
    { name: "Node.js", proficiency: "Expert", category: "Backend" },
    { name: "Python", proficiency: "Expert", category: "Backend" },
    { name: "PostgreSQL", proficiency: "Expert", category: "Database" },
    { name: "AWS", proficiency: "Advanced", category: "Cloud" },
    { name: "TensorFlow", proficiency: "Advanced", category: "AI/ML" },
    { name: "Docker", proficiency: "Advanced", category: "DevOps" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <Image
              src="/profile.jpg"
              alt="Hyeonjoon Park"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2">Hyeonjoon Park</h1>
          <p className="text-primary font-medium mb-3">Software Developer & AI Engineer</p>
          <p className="text-muted-foreground text-center max-w-2xl text-lg">
            Passionate about building scalable web applications, intelligent AI systems, and immersive games. 
            I specialize in creating robust, reliable solutions that handle millions of users while maintaining 
            exceptional performance and user experience.
          </p>
        </div>
        <Stats1 />
      </section>

      {/* Experience Section */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-12 text-center">Professional Experience</h2>
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-primary">{exp.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      <span className="text-sm">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Radar Chart Section (placed just above Skills) */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold mb-4">Expertise Overview</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visual representation of my core competencies across different technical domains
          </p>
        </div>
        <div className="flex justify-center">
          <SkillRadar data={radarData} size={500} />
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-12 text-center">Technical Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border rounded-lg p-6 text-center hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2">{skill.name}</h3>
              <p className="text-primary text-sm font-medium">{skill.proficiency}</p>
              <p className="text-muted-foreground text-xs mt-1">{skill.category}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <div className="bg-card border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
          <p className="text-muted-foreground mb-8">
            I'm always open to discussing new opportunities and collaborations.
          </p>
          <div className="flex flex-col items-center gap-4">
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
            <div className="flex gap-4 mt-4">
              <Button asChild>
                <Link href="/contact">
                  Contact Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Professional Stats with rolling animation
const Stats1 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayStats, setDisplayStats] = useState({
    users: 0,
    revenue: 0,
    projects: 0
  });
  const ref = useRef<HTMLDivElement>(null);

  const finalStats = {
    users: 10000000, // 10M+ users
    revenue: 2500000, // $2.5M+ revenue generated
    projects: 50 // 50+ projects
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setDisplayStats({
        users: Math.round(finalStats.users * easeOutQuart),
        revenue: Math.round(finalStats.revenue * easeOutQuart),
        projects: Math.round(finalStats.projects * easeOutQuart)
      });

      if (step >= steps) {
        setDisplayStats(finalStats);
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isVisible]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}K`;
    }
    return `$${num}`;
  };

  return (
    <section ref={ref} className="py-16">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-center text-2xl font-semibold lg:text-3xl mb-2">
          Impact & Results
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto text-sm">
          Measurable outcomes from my professional work and projects
        </p>
        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          <div className="text-center">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Total users served across platforms
            </p>
            <p className="text-4xl font-semibold lg:text-5xl text-primary">
              {formatNumber(displayStats.users)}+
            </p>
            <p className="text-sm font-medium text-muted-foreground mt-1">
              users
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Revenue generated through solutions
            </p>
            <p className="text-4xl font-semibold lg:text-5xl text-primary">
              {formatCurrency(displayStats.revenue)}+
            </p>
            <p className="text-sm font-medium text-muted-foreground mt-1">
              revenue
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Successful projects delivered
            </p>
            <p className="text-4xl font-semibold lg:text-5xl text-primary">
              {displayStats.projects}+
            </p>
            <p className="text-sm font-medium text-muted-foreground mt-1">
              projects
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 