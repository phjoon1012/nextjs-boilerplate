"use client";

import React from "react";
import Link from "next/link";
import { Project, formatProjectDate } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink } from "lucide-react";
import TagsDisplay from "./TagsDisplay";
import MinimalTagsDisplay from "./MinimalTagsDisplay";

interface PinnedProjectsProps {
  projects: Project[];
}

export default function PinnedProjects({ projects }: PinnedProjectsProps) {
  const pinnedProjects = projects.filter(project => project.pinned).slice(0, 3);

  if (pinnedProjects.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Featured Projects</h3>
        </div>
        <p className="text-muted-foreground">My top picks - projects I'm most proud of</p>
      </div>

      {/* Pinned Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pinnedProjects.map((project) => (
          <Link 
            key={project.id} 
            href={`/projects/${project.slug}`}
            className="group block"
          >
            <div className="border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 h-full">
              {/* Project Header */}
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {project.title}
                </h4>
                <Star className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              </div>

              {/* Project Description */}
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                {project.overview || project.description || ''}
              </p>

              {/* Project Metadata */}
              <div className="space-y-2">
                {/* Date and Location */}
                {project.project_date && (
                  <div className="text-xs text-muted-foreground">
                    {formatProjectDate(project.project_date, project.project_location)}
                  </div>
                )}

                {/* Role and Type */}
                <div className="flex flex-wrap gap-1">
                  {project.project_role && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {project.project_role}
                    </span>
                  )}
                  {project.project_type && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      {project.project_type}
                    </span>
                  )}
                </div>

                {/* Technologies and Concepts */}
                <MinimalTagsDisplay 
                  technologies={project.technologies} 
                  concepts={project.concepts || []}
                  maxVisible={3}
                />
              </div>

              {/* View Project Link */}
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-xs text-primary group-hover:text-primary/80 transition-colors">
                  <span>View Project</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 