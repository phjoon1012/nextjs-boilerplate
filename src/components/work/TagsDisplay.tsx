"use client";

import React from "react";
import { Code, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagsDisplayProps {
  technologies: string[];
  concepts?: string[];
  maxVisible?: number;
  className?: string;
}

export default function TagsDisplay({ 
  technologies, 
  concepts = [], 
  maxVisible = 3,
  className = "" 
}: TagsDisplayProps) {
  const hasConcepts = concepts.length > 0;
  const hasManyTechnologies = technologies.length > maxVisible;
  const hasManyConcepts = concepts.length > maxVisible;
  
  const visibleTechnologies = technologies.slice(0, maxVisible);
  const visibleConcepts = concepts.slice(0, maxVisible);

  return (
    <div className={cn("space-y-1.5", className)}>
      {/* Technologies Row */}
      <div className="flex flex-wrap gap-1.5">
        {visibleTechnologies.map((tech, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-md flex items-center gap-1"
          >
            <Code className="h-3 w-3" />
            {tech}
          </span>
        ))}
        
        {/* Hidden technologies indicator */}
        {hasManyTechnologies && (
          <span className="px-2 py-1 text-xs text-muted-foreground">
            +{technologies.length - maxVisible}
          </span>
        )}
      </div>

      {/* Concepts Row (if exists) */}
      {hasConcepts && (
        <div className="flex flex-wrap gap-1.5">
          {visibleConcepts.map((concept, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md flex items-center gap-1"
            >
              <Brain className="h-3 w-3" />
              {concept}
            </span>
          ))}
          
          {/* Hidden concepts indicator */}
          {hasManyConcepts && (
            <span className="px-2 py-1 text-xs text-muted-foreground">
              +{concepts.length - maxVisible}
            </span>
          )}
        </div>
      )}
    </div>
  );
} 