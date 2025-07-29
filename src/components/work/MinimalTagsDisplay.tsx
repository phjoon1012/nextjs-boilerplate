"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MinimalTagsDisplayProps {
  technologies: string[];
  concepts?: string[];
  maxVisible?: number;
  className?: string;
}

export default function MinimalTagsDisplay({ 
  technologies, 
  concepts = [], 
  maxVisible = 3,
  className = "" 
}: MinimalTagsDisplayProps) {
  const allTags = [...technologies, ...concepts];
  const visibleTags = allTags.slice(0, maxVisible);
  const hasMore = allTags.length > maxVisible;

  if (allTags.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
      <span className="font-medium">Tech:</span>
      <div className="flex items-center gap-1">
        {visibleTags.map((tag, index) => (
          <span key={index} className="text-muted-foreground">
            {tag}
            {index < visibleTags.length - 1 && ","}
          </span>
        ))}
        {hasMore && (
          <span className="text-muted-foreground">
            +{allTags.length - maxVisible}
          </span>
        )}
      </div>
    </div>
  );
} 