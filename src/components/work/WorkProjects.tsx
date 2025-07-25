"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Project, getAllProjects, searchProjects, getCategories, getTechnologies, parseProjectDescription, formatProjectDate } from "@/lib/projects";
import { AdminAuthContext } from "@/components/home/AdminAuthProvider";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, X, Plus } from "lucide-react";

// Helper to parse duration string to hours
function parseDurationToHours(duration: string): number {
  if (!duration) return 0;
  const lower = duration.toLowerCase();
  const num = parseFloat(lower);
  if (lower.includes('month')) return num * 160; // assume 160 hours/month
  if (lower.includes('week')) return num * 40; // assume 40 hours/week
  if (lower.includes('day')) return num * 8; // assume 8 hours/day
  if (lower.includes('hour')) return num;
  return 0;
}

const Blog17 = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [allTechnologies, setAllTechnologies] = useState<string[]>([]);
  const [mainCategories, setMainCategories] = useState<string[]>(["All Articles"]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { isAdmin } = React.useContext(AdminAuthContext);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsData, categoriesData, technologiesData] = await Promise.all([
          getAllProjects(),
          getCategories(),
          getTechnologies()
        ]);
        
        setProjects(projectsData);
        setAllTechnologies(technologiesData);
        setMainCategories(["All Articles", ...categoriesData]);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Search and filter projects
  useEffect(() => {
    const searchData = async () => {
      if (loading) return;
      
      try {
        const filteredProjects = await searchProjects(searchTerm, selectedCategory);
        setProjects(filteredProjects);
      } catch (error) {
        console.error('Error searching projects:', error);
      }
    };

    searchData();
  }, [searchTerm, selectedCategory, loading]);

  // Get search suggestions based on current input
  const searchSuggestions = useMemo(() => {
    if (!searchTerm) return [];
    
    const suggestions = new Set<string>();
    const searchLower = searchTerm.toLowerCase();
    
    // Add matching technologies
    allTechnologies.forEach(tech => {
      if (tech.toLowerCase().includes(searchLower)) {
        suggestions.add(tech);
      }
    });
    
    // Add matching categories
    mainCategories.forEach(category => {
      if (category.toLowerCase().includes(searchLower) && category !== "All Articles") {
        suggestions.add(category);
      }
    });
    
    // Add matching project titles
    projects.forEach(project => {
      if (project.title.toLowerCase().includes(searchLower)) {
        suggestions.add(project.title);
      }
    });
    
    return Array.from(suggestions).slice(0, 5); // Limit to 5 suggestions
  }, [searchTerm, allTechnologies, mainCategories, projects]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || searchSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < searchSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : searchSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < searchSuggestions.length) {
          setSearchTerm(searchSuggestions[selectedSuggestionIndex]);
          setShowSuggestions(false);
          setSelectedSuggestionIndex(-1);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
    setSelectedSuggestionIndex(-1);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Articles");
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  if (loading) {
    return (
      <section className="py-32">
        <div className="container">
          <div className="text-center">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto">
      <div className="container">
        {/* Search and Filter Section */}
        <div className="mx-auto mt-20 max-w-4xl space-y-8">
          {/* Search Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Find Your Perfect Project</h2>
            <p className="text-muted-foreground text-lg">Search through my experiences by technology, category, or project name</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              ref={searchInputRef}
              placeholder="Search projects, technologies, languages..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(searchTerm.length > 0)}
              className="pl-12 h-12 text-lg"
            />
            
            {/* Search Suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div 
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg z-10 mt-1"
              >
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-full text-left px-3 py-2 hover:bg-muted text-sm transition-colors",
                      selectedSuggestionIndex === index && "bg-muted"
                    )}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Popular Technologies Quick Search */}
          {!searchTerm && (
            <div className="text-center space-y-4">
              <p className="text-lg font-medium text-muted-foreground">Popular technologies:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {["React", "Python", "Unity", "Node.js", "Docker", "TypeScript"].map((tech) => (
                  <Button
                    key={tech}
                    variant="outline"
                    size="default"
                    onClick={() => {
                      setSearchTerm(tech);
                      setShowSuggestions(false);
                    }}
                    className="text-base px-6 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {tech}
                  </Button>
                ))}
              </div>
            </div>
          )}

         
          {/* Results Count */}
          <div className="text-center text-muted-foreground">
            Showing {projects.length} projects
            {searchTerm && (
              <span className="ml-2">
                • Searching for "{searchTerm}"
              </span>
            )}
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-20 lg:grid-cols-4">
          <div className="hidden flex-col gap-2 lg:flex">
            {mainCategories.map((category) => (
              <Button
                variant="ghost"
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "justify-start text-left",
                  selectedCategory === category &&
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                )}
              >
                {category}
              </Button>
            ))}
            
            {/* Admin-only New Project button */}
            {isAdmin && (
              <>
                <div className="my-4 border-t border-border"></div>
                <Link href="/work/new">
                  <Button 
                    variant="outline" 
                    className="justify-start text-left w-full bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="lg:col-span-3">
            {projects.length > 0 ? (
              projects.map((item) => (
                <React.Fragment key={item.id}>
                  <Link href={`/projects/${item.slug}`} className="group block hover:bg-muted/30 p-6 rounded-none transition-colors border-t border-b border-border ">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {item.categories.map((category, index) => (
                            <span
                              key={index}
                              className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-md"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground flex-shrink-0 ml-4">
                        {item.project_date && (
                          <span>{formatProjectDate(item.project_date, item.project_location)}</span>
                        )}
                        <span className="text-primary font-medium">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {(() => {
                        const sections = parseProjectDescription(item.description || '');
                        return sections.overview || item.description || '';
                      })()}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Key Achievements - More Prominent */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">Key Achievements</h4>
                      <ul className="space-y-1">
                        {item.achievements.slice(0, 3).map((achievement, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1 text-sm">•</span>
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                        {item.achievements.length > 3 && (
                          <li className="text-sm text-muted-foreground italic">
                            +{item.achievements.length - 3} more achievements
                          </li>
                        )}
                      </ul>
                    </div>
                  </Link>
                  <div className="h-6" />
                </React.Fragment>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No projects found matching your criteria.
                </p>
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog17;
