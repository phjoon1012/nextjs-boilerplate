'use client';

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import DataStructureViz from "@/components/ui/data-structure-viz";

export default function Algorithms() {
  const dataStructures = [
    {
      type: 'stack' as const,
      title: 'Stack (LIFO)',
      description: 'Last In, First Out data structure. Elements are added and removed from the top only.'
    },
    {
      type: 'queue' as const,
      title: 'Queue (FIFO)',
      description: 'First In, First Out data structure. Elements are added at the back and removed from the front.'
    },
    {
      type: 'tree' as const,
      title: 'Binary Search Tree',
      description: 'Hierarchical data structure where each node has at most two children, maintaining sorted order.'
    },
    {
      type: 'linked-list' as const,
      title: 'Linked List',
      description: 'Linear data structure where elements are stored in nodes, each pointing to the next node.'
    },
    {
      type: 'graph' as const,
      title: 'Graph',
      description: 'Non-linear data structure consisting of nodes (vertices) connected by edges.'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <Link href="/about" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to About
          </Link>
          <h1 className="text-4xl font-bold mb-4">Data Structures & Algorithms</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Interactive visualizations demonstrating my understanding of fundamental data structures and algorithms.
            Click play to see how these structures work in action.
          </p>
        </div>

        {/* Data Structure Visualizations */}
        <div className="grid md:grid-cols-2 gap-8">
          {dataStructures.map((ds, index) => (
            <DataStructureViz
              key={index}
              type={ds.type}
              title={ds.title}
              description={ds.description}
            />
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-card border rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Why Data Structures Matter</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2 text-primary">Performance</h3>
              <p className="text-muted-foreground text-sm">
                Choosing the right data structure can dramatically improve algorithm efficiency and application performance.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2 text-primary">Problem Solving</h3>
              <p className="text-muted-foreground text-sm">
                Understanding data structures helps in designing optimal solutions for complex programming challenges.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2 text-primary">System Design</h3>
              <p className="text-muted-foreground text-sm">
                Data structure knowledge is crucial for designing scalable systems and choosing appropriate storage solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-muted-foreground mb-6">
            Let's discuss how my technical expertise can help bring your project to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:phjoon@umich.edu"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              href="/projects"
              className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors"
            >
              View My Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 