'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Code, Database, Cloud, Brain, Users, Palette } from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  level: 'foundation' | 'intermediate' | 'advanced' | 'expert';
  description: string;
  icon?: React.ReactNode;
  children?: SkillNode[];
  color?: string;
}

interface SkillTreeProps {
  data: SkillNode[];
  title?: string;
}

export default function SkillTree({ data, title = "Skill Hierarchy" }: SkillTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'foundation':
        return 'bg-gray-100 border-gray-300 text-gray-700';
      case 'intermediate':
        return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'advanced':
        return 'bg-purple-100 border-purple-300 text-purple-700';
      case 'expert':
        return 'bg-green-100 border-green-300 text-green-700';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'foundation':
        return '🌱';
      case 'intermediate':
        return '📈';
      case 'advanced':
        return '🚀';
      case 'expert':
        return '🏆';
      default:
        return '📊';
    }
  };

  const renderNode = (node: SkillNode, depth: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="relative">
        <div
          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
            getLevelColor(node.level)
          }`}
          style={{ marginLeft: `${depth * 24}px` }}
          onClick={() => toggleNode(node.id)}
        >
          {hasChildren && (
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          )}
          <div className="flex-shrink-0">
            {node.icon || <span className="text-lg">{getLevelIcon(node.level)}</span>}
          </div>
          <div className="flex-1">
            <div className="font-semibold">{node.name}</div>
            <div className="text-xs opacity-75">{node.description}</div>
          </div>
          <div className="flex-shrink-0 text-xs font-medium px-2 py-1 rounded-full bg-white/50">
            {node.level}
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-2">
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">
          Hierarchical view of skills showing how expertise builds upon foundational knowledge
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏆</span>
          <span>Expert</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">🚀</span>
          <span>Advanced</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">📈</span>
          <span>Intermediate</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">🌱</span>
          <span>Foundation</span>
        </div>
      </div>

      {/* Skill Tree */}
      <div className="space-y-2">
        {data.map((node) => renderNode(node))}
      </div>
    </div>
  );
} 