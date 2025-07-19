import { 
  BookOpen, 
  Target, 
  Star, 
  Brain, 
  Zap, 
  Code, 
  AlertTriangle, 
  Eye, 
  TrendingUp 
} from "lucide-react";

export interface SectionConfig {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  defaultContentType: 'markdown' | 'text';
  description: string;
}

export const SECTION_CONFIGS: Record<string, SectionConfig> = {
  overview: {
    id: 'overview',
    title: 'Overview',
    icon: BookOpen,
    defaultContentType: 'markdown',
    description: 'Project overview and summary'
  },
  objective: {
    id: 'objective',
    title: 'Objective',
    icon: Target,
    defaultContentType: 'markdown',
    description: 'Project goals and objectives'
  },
  key_achievements: {
    id: 'key_achievements',
    title: 'Key Achievements',
    icon: Star,
    defaultContentType: 'markdown',
    description: 'Key accomplishments and results'
  },
  theory_approach: {
    id: 'theory_approach',
    title: 'Theory & Approach',
    icon: Brain,
    defaultContentType: 'markdown',
    description: 'Theoretical background and methodology'
  },
  tech_used: {
    id: 'tech_used',
    title: 'Technologies Used',
    icon: Zap,
    defaultContentType: 'markdown',
    description: 'Technologies, frameworks, and tools'
  },
  technical_deep_dive: {
    id: 'technical_deep_dive',
    title: 'Technical Deep Dive',
    icon: Code,
    defaultContentType: 'markdown',
    description: 'Detailed technical implementation'
  },
  challenges_solutions: {
    id: 'challenges_solutions',
    title: 'Challenges & Solutions',
    icon: AlertTriangle,
    defaultContentType: 'markdown',
    description: 'Problems encountered and solutions'
  },
  review: {
    id: 'review',
    title: 'Review',
    icon: Eye,
    defaultContentType: 'markdown',
    description: 'Project review and evaluation'
  },
  future_improvements: {
    id: 'future_improvements',
    title: 'Future Improvements',
    icon: TrendingUp,
    defaultContentType: 'markdown',
    description: 'Potential improvements and next steps'
  }
};

export const DEFAULT_SECTIONS_ORDER = [
  'objective',
  'theory_approach',
  'technical_deep_dive',
  'challenges_solutions',
  'review',
  'future_improvements'
];

export const DEFAULT_SECTIONS_VISIBILITY = {
  overview: true,
  objective: true,
  key_achievements: true,
  theory_approach: true,
  tech_used: true,
  technical_deep_dive: true,
  challenges_solutions: true,
  review: true,
  future_improvements: true
};

export const DEFAULT_CONTENT_TYPE = {
  overview: 'markdown' as const,
  objective: 'markdown' as const,
  key_achievements: 'markdown' as const,
  theory_approach: 'markdown' as const,
  tech_used: 'markdown' as const,
  technical_deep_dive: 'markdown' as const,
  challenges_solutions: 'markdown' as const,
  review: 'markdown' as const,
  future_improvements: 'markdown' as const
};

export function getSectionConfig(sectionId: string): SectionConfig | null {
  return SECTION_CONFIGS[sectionId] || null;
}

export function getAllSectionConfigs(): SectionConfig[] {
  return Object.values(SECTION_CONFIGS);
} 