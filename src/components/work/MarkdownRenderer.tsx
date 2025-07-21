"use client";

import SimpleMathRenderer from "@/components/work/SimpleMathRenderer";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  if (!content || content.trim() === '') {
    return (
      <div className="text-muted-foreground italic">
        Content coming soon...
      </div>
    );
  }

  return (
    <div className={`prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:list-inside [&_li]:ml-4 ${className}`}>
      <SimpleMathRenderer content={content} />
    </div>
  );
} 