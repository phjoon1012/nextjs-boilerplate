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
      

      {/* Featured Projects - Grid Layout */}
      {featuredProjects.length > 0 && (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground">Featured Work</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Selected projects that showcase my expertise and passion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Link 
                key={project.id} 
                href={`/projects/${project.slug}`}
                className="group block"
              >
                <div className="bg-gradient-to-br from-background to-muted/30 border border-border rounded-xl p-10 hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full">
                  {/* Project Number */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div className="flex items-center gap-3">
                      {project.categories.map((category, catIndex) => (
                        <span
                          key={catIndex}
                          className="text-xs bg-primary/10 text-primary px-4 py-2 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Title */}
                  <h4 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors mb-6">
                    {project.title}
                  </h4>

                  {/* Project Description */}
                  <p className="text-sm text-muted-foreground mb-8 leading-relaxed line-clamp-4">
                    {project.overview || project.description || ''}
                  </p>

                  {/* Project Metadata */}
                  <div className="space-y-6">
                    {/* Date */}
                    {project.project_date && (
                      <div className="text-xs text-muted-foreground">
                        {formatProjectDate(project.project_date, project.project_location)}
                      </div>
                    )}

                    {/* Role and Type */}
                    <div className="flex flex-wrap gap-3">
                      {project.project_role && (
                        <span className="text-xs bg-primary/10 text-primary px-4 py-2 rounded">
                          {project.project_role}
                        </span>
                      )}
                      {project.project_type && (
                        <span className="text-xs bg-muted text-muted-foreground px-4 py-2 rounded">
                          {project.project_type}
                        </span>
                      )}
                    </div>

                    {/* Technologies */}
                    <UltraMinimalTagsDisplay 
                      technologies={project.technologies} 
                      concepts={project.concepts || []}
                      maxVisible={2}
                    />
                  </div>

                  {/* View Project Link */}
                  <div className="mt-8 pt-6 border-t border-border/50">
                    <div className="flex items-center gap-2 text-xs text-primary group-hover:text-primary/80 transition-colors">
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
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