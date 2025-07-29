'use client';

import { Calendar, MapPin, Users, Zap, Star, BookOpen, TrendingUp, AlertTriangle, Edit, FileCode, Award, Clock, Building } from "lucide-react";
import { Project } from "@/lib/projects";

interface MetadataItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: string;
}

interface ProjectMetadataProps {
  project: Project;
}

export default function ProjectMetadata({ project }: ProjectMetadataProps) {
  // Helper function to format date with "Present" support
  const formatDateWithPresent = (dateString?: string) => {
    if (!dateString) return '';
    
    if (dateString.includes(' - ')) {
      const [startDate, endDate] = dateString.split(' - ');
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return dateString;
      }
      
      const startFormatted = start.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
      
      // Check if end date is in the future (within 3 months) to show "Present"
      const now = new Date();
      const threeMonthsFromNow = new Date();
      threeMonthsFromNow.setMonth(now.getMonth() + 3);
      
      let endFormatted;
      if (end > threeMonthsFromNow) {
        endFormatted = 'Present';
      } else {
        endFormatted = end.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        });
      }
      
      return `${startFormatted} - ${endFormatted}`;
    } else {
      // Single date
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
    }
  };

  // Build metadata items based on available project data
  const metadataItems: MetadataItem[] = [];

  // Date (always show if available)
  if (project.project_date) {
    metadataItems.push({
      icon: <Calendar className="h-4 w-4" />,
      label: formatDateWithPresent(project.project_date),
      value: '',
      color: 'text-muted-foreground'
    });
  }

  // Location (always show if available)
  if (project.project_location) {
    metadataItems.push({
      icon: <MapPin className="h-4 w-4" />,
      label: project.project_location,
      value: '',
      color: 'text-muted-foreground'
    });
  }

  // Role (if specified)
  if (project.project_role) {
    metadataItems.push({
      icon: <Users className="h-4 w-4" />,
      label: project.project_role,
      value: '',
      color: 'text-muted-foreground'
    });
  }

  // Type (if specified)
  if (project.project_type) {
    metadataItems.push({
      icon: <BookOpen className="h-4 w-4" />,
      label: project.project_type,
      value: '',
      color: 'text-muted-foreground'
    });
  }

  // Team Size (if specified)
  if (project.project_team_size) {
    metadataItems.push({
      icon: <Building className="h-4 w-4" />,
      label: project.project_team_size,
      value: '',
      color: 'text-muted-foreground'
    });
  }

  // Fallback to default items if no custom metadata is set
  if (metadataItems.length === 0) {
    metadataItems.push(
      {
        icon: <Calendar className="h-4 w-4" />,
        label: project.project_date ? formatDateWithPresent(project.project_date) : project.duration,
        value: '',
        color: 'text-muted-foreground'
      },
      {
        icon: <Users className="h-4 w-4" />,
        label: 'Team Project',
        value: '',
        color: 'text-muted-foreground'
      },
      {
        icon: <Zap className="h-4 w-4" />,
        label: 'Production Ready',
        value: '',
        color: 'text-muted-foreground'
      },
      {
        icon: <Star className="h-4 w-4" />,
        label: 'Featured',
        value: '',
        color: 'text-muted-foreground'
      }
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t border-border pt-4">
      {metadataItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.icon}
          <span className={item.color}>{item.label}</span>
        </div>
      ))}
    </div>
  );
} 