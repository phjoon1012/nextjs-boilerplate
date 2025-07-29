"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface UltraMinimalTagsDisplayProps {
  technologies: string[];
  concepts?: string[];
  maxVisible?: number;
  className?: string;
}

export default function UltraMinimalTagsDisplay({ 
  technologies, 
  concepts = [], 
  maxVisible = 2,
  className = "" 
}: UltraMinimalTagsDisplayProps) {
  const allTags = [...technologies, ...concepts];
  const visibleTags = allTags.slice(0, maxVisible);
  const hasMore = allTags.length > maxVisible;

  if (allTags.length === 0) return null;

  return (
    <div className={cn("text-sm text-muted-foreground", className)}>
      {visibleTags.join(", ")}
      {hasMore && ` +${allTags.length - maxVisible}`}
    </div>
  );
} 