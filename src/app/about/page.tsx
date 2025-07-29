'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Linkedin, Download, Calendar, MapPin, Building, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext, useRef, useState } from "react";
import { AdminAuthContext } from "@/components/home/AdminAuthProvider";
import SkillMatrix from "@/components/ui/skill-matrix";
import SkillRadar from "@/components/ui/skill-radar";
import SkillTree from "@/components/ui/skill-tree";
import SkillGraph from "@/components/ui/skill-graph";

export default function About() {
  const { isAdmin } = useContext(AdminAuthContext);
  const [profilePic, setProfilePic] = useState("/profile.jpg");
  const [resumeUrl, setResumeUrl] = useState("/resume.pdf");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.url) {
        setProfilePic(result.url);
      }
    } catch (err) {
      alert("Failed to upload profile picture.");
    } finally {
      setUploading(false);
    }
  };

  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.url) {
        setResumeUrl(result.url);
      }
    } catch (err) {
      alert("Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadResume = () => {
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Hyeonjoon_Park_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const skills: Array<{
    name: string;
    proficiency: 'expert' | 'advanced' | 'intermediate' | 'basic';
    category: string;
    icon: string;
  }> = [
    // Frontend Development
    { name: "React", proficiency: "expert", category: "Frontend", icon: "⚛️" },
    { name: "TypeScript", proficiency: "expert", category: "Frontend", icon: "📘" },
    { name: "Next.js", proficiency: "advanced", category: "Frontend", icon: "▲" },
    { name: "Tailwind CSS", proficiency: "advanced", category: "Frontend", icon: "🎨" },
    { name: "Vue.js", proficiency: "intermediate", category: "Frontend", icon: "💚" },
    { name: "Angular", proficiency: "basic", category: "Frontend", icon: "🔴" },

    // Backend Development
    { name: "Node.js", proficiency: "expert", category: "Backend", icon: "🟢" },
    { name: "Python", proficiency: "expert", category: "Backend", icon: "🐍" },
    { name: "Express.js", proficiency: "advanced", category: "Backend", icon: "🚀" },
    { name: "FastAPI", proficiency: "advanced", category: "Backend", icon: "⚡" },
    { name: "Java", proficiency: "intermediate", category: "Backend", icon: "☕" },
    { name: "Go", proficiency: "basic", category: "Backend", icon: "🐹" },

    // Database & Cloud
    { name: "PostgreSQL", proficiency: "expert", category: "Database & Cloud", icon: "🐘" },
    { name: "AWS", proficiency: "advanced", category: "Database & Cloud", icon: "☁️" },
    { name: "Redis", proficiency: "advanced", category: "Database & Cloud", icon: "🔴" },
    { name: "MongoDB", proficiency: "intermediate", category: "Database & Cloud", icon: "🍃" },
    { name: "Docker", proficiency: "advanced", category: "Database & Cloud", icon: "🐳" },
    { name: "Kubernetes", proficiency: "intermediate", category: "Database & Cloud", icon: "⚓" },

    // AI & Machine Learning
    { name: "TensorFlow", proficiency: "advanced", category: "AI & ML", icon: "🧠" },
    { name: "PyTorch", proficiency: "advanced", category: "AI & ML", icon: "🔥" },
    { name: "NLP", proficiency: "advanced", category: "AI & ML", icon: "💬" },
    { name: "Computer Vision", proficiency: "intermediate", category: "AI & ML", icon: "👁️" },
    { name: "OpenAI API", proficiency: "advanced", category: "AI & ML", icon: "🤖" },

    // DevOps & Tools
    { name: "Git", proficiency: "expert", category: "DevOps & Tools", icon: "📝" },
    { name: "CI/CD", proficiency: "advanced", category: "DevOps & Tools", icon: "🔄" },
    { name: "Jest", proficiency: "advanced", category: "DevOps & Tools", icon: "🧪" },
    { name: "Jira", proficiency: "advanced", category: "DevOps & Tools", icon: "📋" },
    { name: "Linux", proficiency: "intermediate", category: "DevOps & Tools", icon: "🐧" },
    { name: "Terraform", proficiency: "basic", category: "DevOps & Tools", icon: "🏗️" },

    // Design & UX
    { name: "UI/UX Design", proficiency: "advanced", category: "Design & UX", icon: "🎨" },
    { name: "Figma", proficiency: "intermediate", category: "Design & UX", icon: "🎯" },
    { name: "Adobe Creative Suite", proficiency: "basic", category: "Design & UX", icon: "🎭" },
  ];

  // Radar chart data - showing expertise areas
  const radarData = [
    {
      category: "Frontend",
      skills: [
        { name: "React", proficiency: 95 },
        { name: "TypeScript", proficiency: 90 },
        { name: "Next.js", proficiency: 85 },
        { name: "UI/UX", proficiency: 80 }
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", proficiency: 95 },
        { name: "Python", proficiency: 90 },
        { name: "API Design", proficiency: 85 },
        { name: "Microservices", proficiency: 80 }
      ]
    },
    {
      category: "Database",
      skills: [
        { name: "PostgreSQL", proficiency: 90 },
        { name: "Redis", proficiency: 85 },
        { name: "AWS", proficiency: 80 },
        { name: "Docker", proficiency: 75 }
      ]
    },
    {
      category: "AI/ML",
      skills: [
        { name: "TensorFlow", proficiency: 85 },
        { name: "PyTorch", proficiency: 80 },
        { name: "NLP", proficiency: 75 },
        { name: "OpenAI API", proficiency: 85 }
      ]
    },
    {
      category: "DevOps",
      skills: [
        { name: "Git", proficiency: 95 },
        { name: "CI/CD", proficiency: 85 },
        { name: "Testing", proficiency: 80 },
        { name: "Linux", proficiency: 70 }
      ]
    },
    {
      category: "Leadership",
      skills: [
        { name: "Team Lead", proficiency: 85 },
        { name: "Project Mgmt", proficiency: 80 },
        { name: "Mentoring", proficiency: 75 },
        { name: "Agile", proficiency: 90 }
      ]
    }
  ];

  const experience = [
    {
      title: "Software Engineer",
      company: "Tech Company",
      location: "San Francisco, CA",
      period: "2023 - Present",
      description: "Developed scalable microservices architecture handling 10M+ daily requests, implemented robust CI/CD pipelines reducing deployment time by 60%, and led cross-functional teams to deliver high-impact features.",
      technologies: ["React", "Node.js", "AWS", "Docker", "Kubernetes"]
    },
    {
      title: "AI Research Assistant",
      company: "University of Michigan",
      location: "Ann Arbor, MI",
      period: "2022 - 2023",
      description: "Researched and implemented machine learning models for natural language processing, achieving 15% improvement in model accuracy through innovative data preprocessing techniques.",
      technologies: ["Python", "TensorFlow", "PyTorch", "NLP", "Deep Learning"]
    },
    {
      title: "Full Stack Developer",
      company: "Startup",
      location: "Remote",
      period: "2021 - 2022",
      description: "Built reliable web applications from concept to deployment, designed robust database schemas supporting 100K+ users, and implemented comprehensive testing strategies ensuring 99.9% uptime.",
      technologies: ["JavaScript", "PostgreSQL", "Redis", "Jest", "TypeScript"]
    }
  ];

  // Skill Tree Data - Hierarchical structure
  const skillTreeData = [
    {
      id: 'software-development',
      name: 'Software Development',
      level: 'expert' as const,
      description: 'Full-stack development with modern technologies',
      children: [
        {
          id: 'frontend',
          name: 'Frontend Development',
          level: 'expert' as const,
          description: 'React, TypeScript, Next.js, UI/UX',
          children: [
            {
              id: 'react',
              name: 'React Ecosystem',
              level: 'expert' as const,
              description: 'Hooks, Context, Redux, Testing'
            },
            {
              id: 'typescript',
              name: 'TypeScript',
              level: 'expert' as const,
              description: 'Type safety, interfaces, generics'
            },
            {
              id: 'ui-ux',
              name: 'UI/UX Design',
              level: 'advanced' as const,
              description: 'User-centered design, accessibility'
            }
          ]
        },
        {
          id: 'backend',
          name: 'Backend Development',
          level: 'expert' as const,
          description: 'Node.js, Python, APIs, Microservices',
          children: [
            {
              id: 'nodejs',
              name: 'Node.js & Express',
              level: 'expert' as const,
              description: 'Server-side JavaScript, REST APIs'
            },
            {
              id: 'python',
              name: 'Python Development',
              level: 'expert' as const,
              description: 'FastAPI, Django, Data processing'
            },
            {
              id: 'databases',
              name: 'Database Design',
              level: 'advanced' as const,
              description: 'PostgreSQL, Redis, Schema optimization'
            }
          ]
        },
        {
          id: 'devops',
          name: 'DevOps & Cloud',
          level: 'advanced' as const,
          description: 'CI/CD, AWS, Docker, Kubernetes',
          children: [
            {
              id: 'ci-cd',
              name: 'CI/CD Pipelines',
              level: 'advanced' as const,
              description: 'GitHub Actions, Testing, Deployment'
            },
            {
              id: 'aws',
              name: 'AWS Services',
              level: 'advanced' as const,
              description: 'EC2, S3, Lambda, CloudFormation'
            },
            {
              id: 'containers',
              name: 'Containerization',
              level: 'intermediate' as const,
              description: 'Docker, Kubernetes orchestration'
            }
          ]
        }
      ]
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      level: 'advanced' as const,
      description: 'Deep learning, NLP, Computer Vision',
      children: [
        {
          id: 'deep-learning',
          name: 'Deep Learning',
          level: 'advanced' as const,
          description: 'TensorFlow, PyTorch, Neural Networks'
        },
        {
          id: 'nlp',
          name: 'Natural Language Processing',
          level: 'advanced' as const,
          description: 'Text analysis, Language models'
        },
        {
          id: 'computer-vision',
          name: 'Computer Vision',
          level: 'intermediate' as const,
          description: 'Image processing, Object detection'
        }
      ]
    },
    {
      id: 'leadership',
      name: 'Leadership & Collaboration',
      level: 'advanced' as const,
      description: 'Team leadership, Project management',
      children: [
        {
          id: 'team-lead',
          name: 'Team Leadership',
          level: 'advanced' as const,
          description: 'Mentoring, Code reviews, Architecture'
        },
        {
          id: 'project-mgmt',
          name: 'Project Management',
          level: 'intermediate' as const,
          description: 'Agile, Sprint planning, Stakeholder communication'
        }
      ]
    }
  ];

  // Skill Graph Data - Network structure
  const skillGraphData = [
    // Core Development Skills
    { id: 'react', name: 'React', category: 'frontend', level: 'expert' as const, x: 150, y: 100, connections: ['typescript', 'nodejs'] },
    { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 'expert' as const, x: 300, y: 100, connections: ['react', 'nodejs'] },
    { id: 'nodejs', name: 'Node.js', category: 'backend', level: 'expert' as const, x: 450, y: 100, connections: ['react', 'typescript', 'postgresql'] },
    
    // Backend & Database
    { id: 'python', name: 'Python', category: 'backend', level: 'expert' as const, x: 150, y: 250, connections: ['tensorflow', 'postgresql'] },
    { id: 'postgresql', name: 'PostgreSQL', category: 'backend', level: 'expert' as const, x: 300, y: 250, connections: ['nodejs', 'python', 'aws'] },
    { id: 'aws', name: 'AWS', category: 'cloud', level: 'advanced' as const, x: 450, y: 250, connections: ['postgresql', 'docker'] },
    
    // AI & ML
    { id: 'tensorflow', name: 'TensorFlow', category: 'ai', level: 'advanced' as const, x: 150, y: 400, connections: ['python', 'nlp'] },
    { id: 'nlp', name: 'NLP', category: 'ai', level: 'advanced' as const, x: 300, y: 400, connections: ['tensorflow', 'python'] },
    
    // DevOps
    { id: 'docker', name: 'Docker', category: 'devops', level: 'advanced' as const, x: 450, y: 400, connections: ['aws', 'git'] },
    { id: 'git', name: 'Git', category: 'devops', level: 'expert' as const, x: 300, y: 500, connections: ['docker', 'leadership'] },
    
    // Leadership
    { id: 'leadership', name: 'Leadership', category: 'leadership', level: 'advanced' as const, x: 150, y: 500, connections: ['git', 'react'] },
    
    // Design
    { id: 'ui-ux', name: 'UI/UX', category: 'design', level: 'advanced' as const, x: 450, y: 500, connections: ['react', 'leadership'] }
  ];

  const values = [
    {
      title: "Scalable Architecture",
      description: "Built systems handling 10M+ daily requests with load balancing, auto-scaling, and efficient database design.",
      icon: "🚀"
    },
    {
      title: "Quality-First Development",
      description: "Expert in CI/CD pipelines with strategic testing - knowing when to test and when to leverage development speed.",
      icon: "🛡️"
    },
    {
      title: "Agile Collaboration",
      description: "Thrived in diverse agile environments using GitHub, Jira, and proper branching strategies for seamless team coordination.",
      icon: "🤝"
    },
    {
      title: "Creative Problem Solving",
      description: "Tackle complex challenges with innovative solutions, always thinking about efficiency and optimal outcomes.",
      icon: "💡"
    },
    {
      title: "Leadership & Teamwork",
      description: "Experienced both leading teams and being a reliable teammate - distributing workloads and aligning with team goals.",
      icon: "👥"
    },
    {
      title: "User-First Design",
      description: "Deep understanding of UI/UX principles including color theory, spacing, and user flow optimization for exceptional experiences.",
      icon: "🎨"
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 max-w-4xl mx-auto px-4">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-primary shadow-lg relative">
            <Image
              src={profilePic}
              alt="Hyeonjoon Park"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
            {isAdmin && (
              <button
                className="absolute bottom-2 right-2 bg-white/80 rounded-full px-2 py-1 text-xs border shadow"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Edit"}
              </button>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </div>
          <h1 className="text-3xl font-bold mb-1">Hyeonjoon Park</h1>
          <p className="text-primary font-medium mb-2">Software Developer & AI Engineer</p>
          <p className="text-muted-foreground text-center max-w-2xl">
            Passionate about building scalable web applications, intelligent AI systems, and immersive games. 
            I specialize in creating robust, reliable solutions that handle millions of users while maintaining 
            exceptional performance and user experience.
          </p>
          {isAdmin && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <button
                className="bg-primary text-white px-3 py-1 rounded text-xs"
                onClick={() => resumeInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Resume"}
              </button>
              <input
                type="file"
                accept="application/pdf"
                ref={resumeInputRef}
                className="hidden"
                onChange={handleResumeChange}
              />
              {resumeUrl && (
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-600 text-xs">View Current Resume</a>
              )}
            </div>
          )}
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold mb-4">What I Bring to the Table</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Core competencies that drive successful project delivery and team collaboration.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {values.map((value, index) => (
              <div key={index} className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{value.icon}</span>
                  <div>
                    <h3 className="font-semibold mb-2 text-primary">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center space-y-4">
            <Link href="/expertise" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <span>Learn more about my technical expertise</span>
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
            <div className="text-muted-foreground text-sm">or</div>
            <Link href="/algorithms" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <span>Explore interactive data structure visualizations</span>
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Technical Skills & Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive overview of my technical capabilities and proficiency levels
            </p>
          </div>

          {/* Radar Chart Overview */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Expertise Overview</h3>
              <p className="text-muted-foreground">
                Visual representation of my core competencies across different domains
              </p>
            </div>
            <div className="flex justify-center">
              <SkillRadar data={radarData} size={500} />
            </div>
          </div>

          {/* Skill Tree - Hierarchical View */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Skill Hierarchy</h3>
              <p className="text-muted-foreground">
                How my expertise builds upon foundational knowledge in a structured way
              </p>
            </div>
            <SkillTree data={skillTreeData} />
          </div>

          {/* Skill Graph - Network View */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Skill Network</h3>
              <p className="text-muted-foreground">
                How different skills connect and support each other in practice
              </p>
            </div>
            <SkillGraph nodes={skillGraphData} />
          </div>

          {/* Detailed Skill Matrix */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Detailed Skill Breakdown</h3>
              <p className="text-muted-foreground">
                Comprehensive list of technologies and tools with proficiency levels
              </p>
            </div>
            <SkillMatrix skills={skills} />
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Professional Experience</h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{exp.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span className="text-sm">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{exp.period}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Resume */}
        <div className="bg-card border rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Get In Touch</h2>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-6">
              <a href="mailto:phjoon@umich.edu" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5 text-primary" />
                <span>phjoon@umich.edu</span>
              </a>
              <a href="https://github.com/phjoon1012" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5 text-primary" />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/hyeonjoon-park-0000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5 text-primary" />
                <span>LinkedIn</span>
              </a>
            </div>
            <Button onClick={handleDownloadResume} className="flex items-center gap-2 mt-4">
              <Download className="h-4 w-4" />
              Download Resume (PDF)
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 
 