"use client";

import React from "react";
import Link from "next/link";
import { Project, formatProjectDate } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import UltraMinimalTagsDisplay from "./UltraMinimalTagsDisplay";

interface RecommendationBubbleProps {
  projects: Project[];
  onCategoryClick: (category: string) => void;
}

export default function RecommendationBubble({ projects, onCategoryClick }: RecommendationBubbleProps) {
  // Get unique categories from projects
  const categories = Array.from(new Set(projects.flatMap(p => p.categories))).slice(0, 4);
  
  // Get featured projects (pinned)
  const featuredProjects = projects.filter(p => p.pinned).slice(0, 3);
  
  // Get recent projects (not featured)
  const recentProjects = projects
    .filter(p => !p.pinned)
    .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      

      {/* Featured Projects - Minimalistic */}
      {featuredProjects.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground">Recommendations</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <Link 
                key={project.id} 
                href={`/projects/${project.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 border border-border/50 rounded-xl p-6 hover:border-primary/40 hover:shadow-md transition-all duration-300 h-full group">
                  {/* Background Accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Tag */}
                  <div className="flex justify-end mb-4">
                    <div className="flex items-center gap-1">
                      {project.categories.slice(0, 1).map((category, catIndex) => (
                        <span
                          key={catIndex}
                          className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Title */}
                  <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-3 text-left">
                    {project.title}
                  </h4>

                  {/* Project Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed text-left">
                    {project.overview || project.description || ''}
                  </p>

                  {/* Project Metadata */}
                  <div className="space-y-2 text-left">
                    {project.project_date && (
                      <div className="text-xs text-muted-foreground">
                        {formatProjectDate(project.project_date, project.project_location)}
                      </div>
                    )}
                    {project.project_role && (
                      <div className="text-xs text-primary font-medium">
                        {project.project_role}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      
    </div>
  );
} 