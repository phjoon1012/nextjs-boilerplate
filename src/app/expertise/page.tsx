'use client';

import { ArrowLeft, CheckCircle, Users, Zap, Shield, Palette, GitBranch } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Expertise() {
  const expertise = [
    {
      title: "Scalable Application Development",
      description: "I know how to build a scalable application. Building a program that works is easy, but making it work with millions of traffic is very different. I know how to test with traffic load test, auto-scaling, load balancing, and creating efficient and intuitive db schema.",
      details: [
        "Load testing with realistic traffic patterns",
        "Auto-scaling infrastructure (AWS, GCP, Azure)",
        "Load balancing strategies and implementation",
        "Database optimization for high-traffic scenarios",
        "Caching strategies and CDN implementation"
      ],
      icon: <Zap className="h-8 w-8 text-primary" />,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Quality-First Development & CI/CD",
      description: "I am familiar with CI/CD pipeline with unit testing. I know the circumstances where unit testing / e2e testing is needed, and where it is never needed due to leverage that developing test cases bring.",
      details: [
        "Strategic test planning and implementation",
        "Unit testing frameworks and best practices",
        "E2E testing for critical user journeys",
        "CI/CD pipeline optimization",
        "Code coverage analysis and improvement"
      ],
      icon: <Shield className="h-8 w-8 text-primary" />,
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Agile Collaboration & Team Workflow",
      description: "I know how to fit in agile production environment with different cooperation style. I know how to work with people in github, Jira, etc and understand main / deployment/ feature branch etc.",
      details: [
        "Git workflow strategies (GitFlow, GitHub Flow)",
        "Jira project management and sprint planning",
        "Code review processes and best practices",
        "Branch management and deployment strategies",
        "Cross-functional team collaboration"
      ],
      icon: <GitBranch className="h-8 w-8 text-primary" />,
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Creative Problem Solving & Efficiency",
      description: "I always think about efficiency. I tackle challenges with creative solutions.",
      details: [
        "Performance optimization and profiling",
        "Algorithm and data structure optimization",
        "Resource utilization and cost optimization",
        "Creative technical solutions to complex problems",
        "System architecture improvements"
      ],
      icon: <Zap className="h-8 w-8 text-primary" />,
      color: "bg-orange-50 border-orange-200"
    },
    {
      title: "Leadership & Team Collaboration",
      description: "I work with people. I have been both a leader and a teammate when it comes to collaboration. I know how to lead a team, distribute workload, and deal with different opinions and come up with schedule. As a teammate, I know how to become a reliable gear that delivers what is needed and communicate any concerns and ideas considering the team's goal and direction.",
      details: [
        "Team leadership and project management",
        "Workload distribution and task delegation",
        "Conflict resolution and consensus building",
        "Effective communication and feedback",
        "Mentoring and knowledge sharing"
      ],
      icon: <Users className="h-8 w-8 text-primary" />,
      color: "bg-indigo-50 border-indigo-200"
    },
    {
      title: "User-First Design & UX/UI",
      description: "I know what we do is presented to a user. User-First design with different theories: color theory, spacing, the location of button and other UI theories I do understand. Not only limited to the UI, I also consider UX that provide the best experience for user with UX flows and considerations and predict how a user will use the product.",
      details: [
        "Color theory and visual hierarchy",
        "Spacing and layout principles",
        "User interface design patterns",
        "User experience flow optimization",
        "User behavior analysis and prediction",
        "Accessibility and inclusive design"
      ],
      icon: <Palette className="h-8 w-8 text-primary" />,
      color: "bg-pink-50 border-pink-200"
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <Link href="/about" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to About
          </Link>
          <h1 className="text-4xl font-bold mb-4">Technical Expertise & Capabilities</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Deep dive into my technical skills, methodologies, and approaches to building robust, scalable applications.
          </p>
        </div>

        {/* Expertise Grid */}
        <div className="space-y-12">
          {expertise.map((item, index) => (
            <div key={index} className={`border rounded-xl p-8 ${item.color} hover:shadow-lg transition-shadow`}>
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-3 text-foreground">{item.title}</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                    {item.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Key Capabilities:</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {item.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Work Together?</h2>
          <p className="text-muted-foreground mb-6">
            Let's discuss how my expertise can help bring your project to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="mailto:phjoon@umich.edu">
                Get In Touch
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects">
                View My Work
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 