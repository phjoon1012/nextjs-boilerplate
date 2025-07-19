import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import MarkdownRenderer from "./markdown-renderer";

interface ProjectSectionProps {
  id: string;
  title: string;
  content?: string;
  contentType?: 'markdown' | 'text';
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export default function ProjectSection({
  id,
  title,
  content,
  contentType = 'markdown',
  icon,
  className = "",
  children
}: ProjectSectionProps) {
  if (!content && !children) {
    return null;
  }

  return (
    <section id={id} className={cn("scroll-mt-20", className)}>
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        {icon && <span className="text-primary">{icon}</span>}
        {title}
      </h2>
      
      <div className="bg-secondary/30 rounded-lg p-6">
        {children ? (
          children
        ) : contentType === 'markdown' ? (
          <MarkdownRenderer content={content || ""} />
        ) : (
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {content}
            </p>
          </div>
        )}
      </div>
    </section>
  );
} 