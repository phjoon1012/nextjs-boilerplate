'use client';

import { useEffect, useRef } from 'react';
import { Code, Database, Cloud, Brain, Users, Palette, Zap, Shield } from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  category: string;
  level: 'foundation' | 'intermediate' | 'advanced' | 'expert';
  x: number;
  y: number;
  connections: string[];
  icon?: React.ReactNode;
}

interface SkillGraphProps {
  nodes: SkillNode[];
  title?: string;
}

export default function SkillGraph({ nodes, title = "Skill Network" }: SkillGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const size = 600;
    canvas.width = size;
    canvas.height = size;
    const centerX = size / 2;
    const centerY = size / 2;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw connections first
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    nodes.forEach(node => {
      node.connections.forEach(connectionId => {
        const targetNode = nodes.find(n => n.id === connectionId);
        if (targetNode) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();
        }
      });
    });

    // Draw nodes
    nodes.forEach(node => {
      const getNodeColor = (level: string) => {
        switch (level) {
          case 'expert':
            return '#10b981';
          case 'advanced':
            return '#8b5cf6';
          case 'intermediate':
            return '#3b82f6';
          case 'foundation':
            return '#6b7280';
          default:
            return '#6b7280';
        }
      };

      const getNodeSize = (level: string) => {
        switch (level) {
          case 'expert':
            return 25;
          case 'advanced':
            return 20;
          case 'intermediate':
            return 18;
          case 'foundation':
            return 15;
          default:
            return 15;
        }
      };

      const radius = getNodeSize(node.level);
      const color = getNodeColor(node.level);

      // Draw node
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.fill();

      // Draw border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw label
      ctx.fillStyle = '#374151';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.name, node.x, node.y + radius + 15);
    });
  }, [nodes]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return <Code className="h-4 w-4" />;
      case 'backend':
        return <Database className="h-4 w-4" />;
      case 'cloud':
        return <Cloud className="h-4 w-4" />;
      case 'ai':
        return <Brain className="h-4 w-4" />;
      case 'leadership':
        return <Users className="h-4 w-4" />;
      case 'design':
        return <Palette className="h-4 w-4" />;
      case 'devops':
        return <Zap className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      default:
        return <Code className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">
          Network view showing how different skills connect and support each other
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Expert</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span>Advanced</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Intermediate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <span>Foundation</span>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          className="border rounded-lg bg-white"
          style={{ width: 600, height: 600 }}
        />
      </div>

      {/* Skill Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from(new Set(nodes.map(n => n.category))).map(category => (
          <div key={category} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            {getCategoryIcon(category)}
            <span className="text-sm font-medium capitalize">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 