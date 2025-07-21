"use client";

import { useState, useEffect } from "react";
import { ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  sections: Array<{
    id: string;
    title: string;
    visible: boolean;
  }>;
  position?: 'left' | 'right';
  className?: string;
}

export default function TableOfContents({ 
  sections, 
  position = 'left',
  className = "" 
}: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(true);

  // Filter visible sections
  const visibleSections = sections.filter(section => section.visible);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = visibleSections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (visibleSections.length === 0) {
    return null;
  }

  return (
    <div className={cn(
      "sticky top-20 h-fit",
      position === 'left' ? "left-4" : "right-4",
      className
    )}>
      <div className="bg-background border rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">Table of Contents</h3>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight className={cn(
              "h-4 w-4 transition-transform",
              isVisible && "rotate-90"
            )} />
          </button>
        </div>
        
        {isVisible && (
          <nav className="space-y-1">
            {visibleSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "w-full text-left px-2 py-1 rounded text-sm transition-colors",
                  "hover:bg-muted/50 hover:text-foreground",
                  activeSection === section.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                {section.title}
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
} 