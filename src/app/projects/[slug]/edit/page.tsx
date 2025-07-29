"use client";

import { useState, useEffect, use, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Plus, X, BookOpen, Brain, AlertTriangle, TrendingUp, User, Calendar, MapPin, Zap, Star, FileCode, Building } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { getProjectBySlug, Project } from "@/lib/projects";
import SimpleMarkdownEditor from "@/components/work/SimpleMarkdownEditor";
import CodeSnippetEditor from "@/components/work/CodeSnippetEditor";
import { AdminAuthContext } from "@/components/home/AdminAuthProvider";

interface EditProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const { isAdmin } = useContext(AdminAuthContext);
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [] as string[],
    concepts: [] as string[],
    categories: [] as string[],
    duration: "",
    project_date: "",
    project_location: "",
    achievements: [] as string[],
    // New metadata fields
    project_role: "",
    project_type: "",
    project_team_size: "",
    pinned: false,
    // Modular content fields
    overview: "",
    objective: "",
    theory_approach: "",
    technical_deep_dive: "",
    challenges_solutions: "",
    review: "",
    future_improvements: "",
    code_snippets: [] as Array<{
      id: string;
      language: string;
      code: string;
      title?: string;
      description?: string;
    }>,
  });

  // Unwrap params using React.use()
  const resolvedParams = use(params) as { slug: string };
  const slug = resolvedParams.slug;

  // Load project data (must be before any conditional return)
  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectData = await getProjectBySlug(slug);
        if (projectData) {
          console.log('Loaded project data:', projectData);
          console.log('Project date from database:', projectData.project_date);
          setProject(projectData);
          setFormData({
            title: projectData.title,
            description: projectData.description || "",
            technologies: projectData.technologies,
            concepts: projectData.concepts || [],
            categories: projectData.categories,
            duration: projectData.duration,
            project_date: projectData.project_date || "",
            project_location: projectData.project_location || "",
            achievements: projectData.achievements,
            // New metadata fields
            project_role: projectData.project_role || "",
            project_type: projectData.project_type || "",
            project_team_size: projectData.project_team_size || "",
            pinned: projectData.pinned || false,
            // Modular content fields
            overview: projectData.overview || "",
            objective: projectData.objective || "",
            theory_approach: projectData.theory_approach || "",
            technical_deep_dive: projectData.technical_deep_dive || "",
            challenges_solutions: projectData.challenges_solutions || "",
            review: projectData.review || "",
            future_improvements: projectData.future_improvements || "",
            code_snippets: projectData.code_snippets || [],
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading project:", error);
        setLoading(false);
      }
    };
    loadProject();
  }, [slug]);

  // Place this after all hooks, before the return
  useEffect(() => {
    if (!isAdmin && typeof window !== "undefined") {
      router.replace(`/projects/${slug}`);
    }
  }, [isAdmin, router, slug]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Unauthorized</h2>
          <p className="text-muted-foreground">You must be an admin to edit this project.</p>
        </div>
      </div>
    );
  }

  // Handle form field changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-calculate end date when both start date and duration are provided
    if (field === 'project_date' || field === 'duration') {
      const startDate = field === 'project_date' ? value : formData.project_date;
      const duration = field === 'duration' ? value : formData.duration;
      
      if (startDate && duration) {
        try {
          const start = new Date(startDate);
          if (!isNaN(start.getTime())) {
            // Parse duration (e.g., "3 months", "6 weeks", "2 years")
            const durationMatch = duration.toLowerCase().match(/(\d+)\s*(month|week|year|day)s?/);
            if (durationMatch) {
              const amount = parseInt(durationMatch[1]);
              const unit = durationMatch[2];
              
              const end = new Date(start);
              switch (unit) {
                case 'month':
                  end.setMonth(end.getMonth() + amount);
                  break;
                case 'week':
                  end.setDate(end.getDate() + (amount * 7));
                  break;
                case 'year':
                  end.setFullYear(end.getFullYear() + amount);
                  break;
                case 'day':
                  end.setDate(end.getDate() + amount);
                  break;
              }
              
              const endDateStr = end.toISOString().split('T')[0];
              const dateRange = `${startDate} - ${endDateStr}`;
              console.log('Auto-calculated date range:', dateRange);
              setFormData(prev => ({ ...prev, project_date: dateRange }));
            }
          }
        } catch (error) {
          console.error('Error calculating end date:', error);
        }
      }
    }
  };

  // Handle array field changes (technologies, categories, achievements)
  const handleArrayChange = (field: keyof typeof formData, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  // Add new item to array
  const addArrayItem = (field: keyof typeof formData) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""]
    }));
  };

  // Remove item from array
  const removeArrayItem = (field: keyof typeof formData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_: string, i: number) => i !== index)
    }));
  };

  // Helper function to extract a section from the description
  const extractSection = (description: string, sectionName: string): string => {
    const regex = new RegExp(`${sectionName}:\\s*\\n([\\s\\S]*?)(?=\\n\\n[A-Z\\s&]+:|$)`, 'i');
    const match = description.match(regex);
    return match ? match[1].trim() : '';
  };

  // Helper function to update a section in the description
  const updateSection = (sectionName: string, newContent: string) => {
    const currentDescription = formData.description;
    const sectionRegex = new RegExp(`${sectionName}:\\s*\\n[\\s\\S]*?(?=\\n\\n[A-Z\\s&]+:|$)`, 'i');
    
    let newDescription: string;
    
    if (sectionRegex.test(currentDescription)) {
      // Section exists, replace it
      newDescription = currentDescription.replace(
        sectionRegex,
        `${sectionName}:\n${newContent}`
      );
    } else {
      // Section doesn't exist, add it
      const sections = currentDescription.split('\n\n');
      const overview = sections[0];
      const otherSections = sections.slice(1).filter(s => s.trim());
      
      newDescription = [
        overview,
        `${sectionName}:\n${newContent}`,
        ...otherSections
      ].filter(s => s.trim()).join('\n\n');
    }
    
    handleInputChange("description", newDescription);
  };

  // Save project changes
  const handleSave = async () => {
    setSaving(true);
    try {
      console.log('Saving project data:', formData);
      console.log('Project slug:', slug);
      console.log('Project date being saved:', formData.project_date);
      
      // Check if we have content to save
      const hasContent = formData.description || 
                        formData.overview || 
                        formData.objective || 
                        formData.theory_approach ||
                        formData.technologies ||
                        formData.technical_deep_dive ||
                        formData.challenges_solutions ||
                        formData.review ||
                        formData.future_improvements ||
                        formData.code_snippets?.length > 0;
      
      console.log('Has content to save:', hasContent);
      
      const response = await fetch(`/api/projects/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Failed to save changes');
      }

      const result = await response.json();
      console.log('Save successful:', result);

      // Redirect back to project page
      router.push(`/projects/${slug}`);
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <p className="text-center text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <p className="text-center text-muted-foreground">Project not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href={`/projects/${slug}`}>
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Project
            </Button>
          </Link>
          <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Project Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter project title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    placeholder="e.g., 3 months, 6 weeks"
                  />
                </div>
                
                <div>
                  <Label htmlFor="project_date">Project Date</Label>
                  <Input
                    id="project_date"
                    type="text"
                    value={formData.project_date}
                    onChange={(e) => handleInputChange("project_date", e.target.value)}
                    placeholder="e.g., 2025-01-01 or 2025-01-01 - 2025-04-01"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter start date only or full date range
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="project_location">Location</Label>
                  <Input
                    id="project_location"
                    value={formData.project_location}
                    onChange={(e) => handleInputChange("project_location", e.target.value)}
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Edit Content</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="metadata">Metadata</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-4">
                    <div>
                      <Label htmlFor="overview">Project Overview</Label>
                      <Textarea
                        id="overview"
                        value={formData.description.split('\n\n')[0] || ''}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                          const sections = formData.description.split('\n\n');
                          sections[0] = e.target.value;
                          handleInputChange("description", sections.join('\n\n'));
                        }}
                        placeholder="Brief overview of your project..."
                        rows={6}
                        className="font-mono text-sm"
                      />
                    </div>
                  </TabsContent>

                  {/* Content Tab */}
                  <TabsContent value="content" className="space-y-6">
                    {/* Theory & Approach */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <Label className="text-lg font-semibold">Theory & Approach</Label>
                      </div>
                      <SimpleMarkdownEditor
                        value={formData.theory_approach}
                        onChange={(value: string) => setFormData(prev => ({ ...prev, theory_approach: value }))}
                        placeholder="Describe your theoretical approach, problem analysis, and design philosophy..."
                        label="Theory & Approach"
                      />
                    </div>

                    {/* Technical Deep Dive */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <Label className="text-lg font-semibold">Technical Deep Dive</Label>
                      </div>
                      <SimpleMarkdownEditor
                        value={formData.technical_deep_dive}
                        onChange={(value: string) => setFormData(prev => ({ ...prev, technical_deep_dive: value }))}
                        placeholder="Explain your technical implementation, architecture, and key technical decisions..."
                        label="Technical Deep Dive"
                      />
                    </div>

                    {/* Challenges & Solutions */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-primary" />
                        <Label className="text-lg font-semibold">Challenges & Solutions</Label>
                      </div>
                      <SimpleMarkdownEditor
                        value={formData.challenges_solutions}
                        onChange={(value: string) => setFormData(prev => ({ ...prev, challenges_solutions: value }))}
                        placeholder="Describe the challenges you faced and how you solved them..."
                        label="Challenges & Solutions"
                      />
                    </div>

                    {/* Lessons Learned */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <Label className="text-lg font-semibold">Lessons Learned</Label>
                      </div>
                      <SimpleMarkdownEditor
                        value={formData.review}
                        onChange={(value: string) => setFormData(prev => ({ ...prev, review: value }))}
                        placeholder="Share your key insights, learnings, and future improvements..."
                        label="Lessons Learned"
                      />
                    </div>

                    {/* Objective */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary" />
                        <Label className="text-lg font-semibold">Project Objective</Label>
                      </div>
                      <SimpleMarkdownEditor
                        value={formData.objective}
                        onChange={(value: string) => setFormData(prev => ({ ...prev, objective: value }))}
                        placeholder="What was the main objective of this project?"
                        label="Project Objective"
                      />
                    </div>

                    {/* Future Improvements */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <Label className="text-lg font-semibold">Future Improvements</Label>
                      </div>
                      <SimpleMarkdownEditor
                        value={formData.future_improvements}
                        onChange={(value: string) => setFormData(prev => ({ ...prev, future_improvements: value }))}
                        placeholder="What improvements would you make in the future?"
                        label="Future Improvements"
                      />
                    </div>
                  </TabsContent>

                  {/* Metadata Tab */}
                  <TabsContent value="metadata" className="space-y-6">
                    {/* Categories */}
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Categories
                      </Label>
                      <div className="space-y-2">
                        {formData.categories.map((category, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={category}
                              onChange={(e) => handleArrayChange("categories", index, e.target.value)}
                              placeholder="Enter category"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => removeArrayItem("categories", index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          onClick={() => addArrayItem("categories")}
                          className="flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add Category
                        </Button>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        Technologies
                      </Label>
                      <div className="space-y-2">
                        {formData.technologies.map((tech, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={tech}
                              onChange={(e) => handleArrayChange("technologies", index, e.target.value)}
                              placeholder="Enter technology"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => removeArrayItem("technologies", index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          onClick={() => addArrayItem("technologies")}
                          className="flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add Technology
                        </Button>
                      </div>
                    </div>

                    {/* Concepts */}
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        Concepts
                      </Label>
                      <div className="space-y-2">
                        {formData.concepts.map((concept, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={concept}
                              onChange={(e) => handleArrayChange("concepts", index, e.target.value)}
                              placeholder="Enter concept (e.g., Fine-tuning, Transfer Learning)"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => removeArrayItem("concepts", index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          onClick={() => addArrayItem("concepts")}
                          className="flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add Concept
                        </Button>
                      </div>
                    </div>

                    {/* Project Role */}
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Project Role
                      </Label>
                      <Input
                        value={formData.project_role}
                        onChange={(e) => handleInputChange("project_role", e.target.value)}
                        placeholder="e.g., Lead Developer, Full Stack Engineer, Team Lead"
                      />
                    </div>

                    {/* Project Type */}
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Project Type
                      </Label>
                      <Input
                        value={formData.project_type}
                        onChange={(e) => handleInputChange("project_type", e.target.value)}
                        placeholder="e.g., Web Application, Mobile App, Research Project"
                      />
                    </div>

                    {/* Team Size */}
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold flex items-center gap-2">
                        <Building className="h-5 w-5 text-primary" />
                        Team Size
                      </Label>
                      <Input
                        value={formData.project_team_size}
                        onChange={(e) => handleInputChange("project_team_size", e.target.value)}
                        placeholder="e.g., Solo Project, 3-person team, 10+ developers"
                      />
                    </div>

                    {/* Pinned Project */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-lg font-semibold flex items-center gap-2">
                          <Star className="h-5 w-5 text-primary" />
                          Pin as Featured Project
                        </Label>
                        <Switch
                          checked={formData.pinned}
                          onCheckedChange={(checked) => handleInputChange("pinned", checked.toString())}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Pinned projects appear at the top of the work page as featured projects
                      </p>
                    </div>


                  </TabsContent>

                  {/* Code Snippets Tab */}
                  <TabsContent value="code" className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <FileCode className="h-5 w-5 text-primary" />
                      <Label className="text-lg font-semibold">Code Snippets</Label>
                    </div>
                    <CodeSnippetEditor
                      snippets={formData.code_snippets}
                      onChange={(snippets) => setFormData(prev => ({ ...prev, code_snippets: snippets }))}
                    />
                  </TabsContent>

                  {/* Achievements Tab */}
                  <TabsContent value="achievements" className="space-y-3">
                    <Label className="text-lg font-semibold flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Key Achievements
                    </Label>
                    <div className="space-y-2">
                      {formData.achievements.map((achievement, index) => (
                        <div key={index} className="flex gap-2">
                          <Textarea
                            value={achievement}
                            onChange={(e) => handleArrayChange("achievements", index, e.target.value)}
                            placeholder="Enter achievement"
                            rows={2}
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeArrayItem("achievements", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => addArrayItem("achievements")}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Achievement
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 