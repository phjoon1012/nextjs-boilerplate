"use client";

import React from "react";
import { Code, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompactTagsDisplayProps {
  technologies: string[];
  concepts?: string[];
  maxVisible?: number;
  className?: string;
}

export default function CompactTagsDisplay({ 
  technologies, 
  concepts = [], 
  maxVisible = 6,
  className = "" 
}: CompactTagsDisplayProps) {
  const allTags = [
    ...technologies.map(tech => ({ type: 'tech', value: tech, icon: Code })),
    ...concepts.map(concept => ({ type: 'concept', value: concept, icon: Brain }))
  ];

  const visibleTags = allTags.slice(0, maxVisible);
  const hasMore = allTags.length > maxVisible;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {visibleTags.map((tag, index) => {
        const IconComponent = tag.icon;
        return (
          <span
            key={index}
            className={cn(
              "px-2 py-1 text-xs font-medium rounded-md flex items-center gap-1",
              tag.type === 'tech' 
                ? "bg-muted text-muted-foreground" 
                : "bg-primary/10 text-primary"
            )}
          >
            <IconComponent className="h-3 w-3" />
            {tag.value}
          </span>
        );
      })}
      
      {/* Hidden count indicator */}
      {hasMore && (
        <span className="px-2 py-1 text-xs text-muted-foreground">
          +{allTags.length - maxVisible}
        </span>
      )}
    </div>
  );
} 