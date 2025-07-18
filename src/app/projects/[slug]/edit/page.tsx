"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { getProjectBySlug, Project } from "@/lib/projects";
import { supabase } from "@/lib/supabase";

interface EditProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [] as string[],
    categories: [] as string[],
    duration: "",
    achievements: [] as string[],
  });

  // Unwrap params using React.use()
  const resolvedParams = use(params) as { slug: string };
  const slug = resolvedParams.slug;

  // Load project data
  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectData = await getProjectBySlug(slug);
        if (projectData) {
          setProject(projectData);
          setFormData({
            title: projectData.title,
            description: projectData.description,
            technologies: projectData.technologies,
            categories: projectData.categories,
            duration: projectData.duration,
            achievements: projectData.achievements,
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

  // Handle form field changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

  // Save project changes
  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          title: formData.title,
          description: formData.description,
          technologies: formData.technologies.filter(t => t.trim()),
          categories: formData.categories.filter(c => c.trim()),
          duration: formData.duration,
          achievements: formData.achievements.filter(a => a.trim()),
          updated_at: new Date().toISOString()
        })
        .eq('slug', slug);

      if (error) {
        throw error;
      }

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
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/projects/${slug}`}>
            <Button variant="ghost" className="mb-4 flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Project
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Edit Project</h1>
            <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
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
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="description">Description (supports sections)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter project description. You can add sections like:&#10;&#10;THEORY &amp; APPROACH:&#10;Your theory content here...&#10;&#10;TECHNICAL DEEP DIVE:&#10;Your technical details here..."
                  rows={15}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Use section headers like "THEORY & APPROACH:", "TECHNICAL DEEP DIVE:", "CHALLENGES & SOLUTIONS:", "LESSONS LEARNED:" to create structured content.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card>
            <CardHeader>
              <CardTitle>Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Key Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 