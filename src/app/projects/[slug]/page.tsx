"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Zap, Brain, Star, BookOpen, TrendingUp, AlertTriangle, Edit } from "lucide-react";
import { getProjectBySlug, parseProjectDescription, Project } from "@/lib/projects";
import { notFound } from "next/navigation";

// Simple admin check - you can modify this to your preference
const isAdmin = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAdmin') === 'true' || 
           window.location.search.includes('admin=true');
  }
  return false;
};

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  
  // Unwrap params using React.use()
  const resolvedParams = use(params) as { slug: string };
  const slug = resolvedParams.slug;

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectData = await getProjectBySlug(slug);
        if (projectData) {
          setProject(projectData);
        } else {
          notFound();
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading project:", error);
        setLoading(false);
      }
    };

    loadProject();
    setShowEdit(isAdmin());
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <p className="text-center text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  // Parse the enhanced description into sections
  const descriptionSections = parseProjectDescription(project.description);

  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Back Button and Edit Button */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/work">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Work
            </Button>
          </Link>
          {showEdit && (
            <Link href={`/projects/${slug}/edit`}>
              <Button variant="outline" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Project
              </Button>
            </Link>
          )}
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex flex-wrap gap-2">
              {project.categories.map((category: string, index: number) => (
                <span key={index} className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {category}
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{project.duration}</span>
          </div>
          
          <h1 className="text-4xl font-bold lg:text-5xl mb-6">
            {project.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            {descriptionSections.overview || project.description}
          </p>

          {/* Project Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{project.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Team Project</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Production Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Featured</span>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {/* Key Achievements */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Star className="h-6 w-6 text-primary" />
              Key Achievements
            </h2>
            <ul className="space-y-3">
              {project.achievements.map((achievement: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">{achievement}</span>
                </li>
              ))}
            </ul>
          </section>



          {/* Theory & Approach */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              Theory & Approach
            </h2>
            <div className="bg-secondary/30 rounded-lg p-6">
              <p className="text-muted-foreground leading-relaxed">
                {descriptionSections.theory_and_approach || "Content coming soon..."}
              </p>
            </div>
          </section>

          {/* Technologies */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Technologies Used
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {project.technologies.map((tech: string) => (
                <span key={tech} className="px-3 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Technical Deep Dive */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Technical Deep Dive
            </h2>
            <div className="space-y-6">
              <div className="bg-secondary/30 rounded-lg p-6">
                <p className="text-muted-foreground leading-relaxed">
                  {descriptionSections.technical_deep_dive || "Content coming soon..."}
                </p>
              </div>
            </div>
          </section>

          {/* Challenges & Solutions */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-primary" />
              Challenges & Solutions
            </h2>
            <div className="space-y-4">
              {descriptionSections.challenges_and_solutions ? (
                descriptionSections.challenges_and_solutions.split('\n').map((line, index) => {
                  if (line.trim().match(/^\d+\./)) {
                    const parts = line.split(':')
                    if (parts.length >= 2) {
                      const challenge = parts[0].replace(/^\d+\.\s*/, '').trim()
                      const solution = parts.slice(1).join(':').trim()
                      return (
                        <div key={index} className="border-l-4 border-primary/20 pl-4">
                          <h3 className="font-medium mb-2">Challenge {index + 1}: {challenge}</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            <strong>Solution:</strong> {solution}
                          </p>
                        </div>
                      )
                    }
                  }
                  return null
                })
              ) : (
                <p className="text-muted-foreground">Content coming soon...</p>
              )}
            </div>
          </section>

          {/* Lessons Learned */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Lessons Learned
            </h2>
            <div className="bg-secondary/30 rounded-lg p-6">
              <p className="text-muted-foreground leading-relaxed">
                {descriptionSections.lessons_learned || "Content coming soon..."}
              </p>
            </div>
          </section>

          {/* Project Links */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <ExternalLink className="h-6 w-6 text-primary" />
              Project Links
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                Source Code
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 