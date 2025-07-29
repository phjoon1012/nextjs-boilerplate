import { supabase } from './supabase'

export interface Project {
  id: number
  title: string
  description?: string // Keep for backward compatibility
  technologies: string[]
  concepts: string[]
  duration: string
  achievements: string[]
  categories: string[]
  slug: string
  project_date?: string
  project_location?: string
  created_at?: string
  updated_at?: string
  
  // New customizable metadata fields
  project_role?: string
  project_type?: string
  project_team_size?: string
  pinned?: boolean
  
  // Modular content sections
  overview?: string
  objective?: string
  key_achievements?: string
  theory_approach?: string
  tech_used?: string
  technical_deep_dive?: string
  challenges_solutions?: string
  review?: string
  future_improvements?: string
  
  // Section management
  sections_order?: string[]
  sections_visibility?: Record<string, boolean>
  content_type?: Record<string, 'markdown' | 'text'>
  
  // Table of contents
  show_toc?: boolean
  toc_position?: 'left' | 'right'
  
  // Content metadata
  last_edited?: string
  content_version?: number
  
  // Code snippets
  code_snippets?: Array<{
    id: string
    language: string
    code: string
    title?: string
    description?: string
  }>
  
  // Legacy fields (for backward compatibility)
  theory_approach_legacy?: {
    problem_analysis: string
    design_philosophy: string
    algorithmic_thinking: string
  }
  technical_deep_dive_legacy?: {
    architecture_overview: string
    key_implementation_details: string[]
  }
  challenges_solutions_legacy?: Array<{
    challenge: string
    description: string
    solution: string
  }>
  lessons_learned_legacy?: {
    technical_insights: string
    development_process: string
    future_improvements: string
  }
}

// Helper function to parse enhanced description into sections
export function parseProjectDescription(description: string) {
  const sections: { [key: string]: string } = {}
  
  // Split by section headers (looking for patterns like "THEORY & APPROACH:")
  const parts = description.split(/\n\n([A-Z\s&]+):\n/)
  
  if (parts.length > 1) {
    // First part is the main description
    sections.overview = parts[0].trim()
    
    // Process remaining parts (header + content pairs)
    for (let i = 1; i < parts.length; i += 2) {
      if (i + 1 < parts.length) {
        const header = parts[i].trim()
        const content = parts[i + 1].trim()
        const key = header.toLowerCase().replace(/\s+/g, '_').replace(/&/g, 'and')
        sections[key] = content
      }
    }
  } else {
    // Try alternative splitting method
    const lines = description.split('\n')
    let currentSection = 'overview'
    let currentContent: string[] = []
    
    for (const line of lines) {
      if (line.match(/^[A-Z\s&]+:$/)) {
        // Save previous section
        if (currentContent.length > 0) {
          sections[currentSection] = currentContent.join('\n').trim()
        }
        // Start new section
        currentSection = line.toLowerCase().replace(/\s+/g, '_').replace(/&/g, 'and').replace(':', '')
        currentContent = []
      } else {
        currentContent.push(line)
      }
    }
    
    // Save last section
    if (currentContent.length > 0) {
      sections[currentSection] = currentContent.join('\n').trim()
    }
    
    // If no sections found, treat entire description as overview
    if (Object.keys(sections).length === 0) {
      sections.overview = description.trim()
    }
  }
  
  return sections
}

// Helper function to format project dates
export function formatProjectDate(dateString?: string, location?: string): string {
  if (!dateString) return ''
  
  try {
    console.log('formatProjectDate input:', dateString)
    
    // Check if it's a date range (contains " - " with spaces)
    if (dateString.includes(' - ')) {
      const [startDate, endDate] = dateString.split(' - ').map(d => d.trim())
      console.log('Parsed date range:', { startDate, endDate })
      
      const start = new Date(startDate)
      const end = new Date(endDate)
      
      console.log('Parsed dates:', { start, end })
      
      // Check if dates are valid
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error('Invalid dates:', { startDate, endDate })
        return dateString
      }
      
      const startFormatted = start.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })
      
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
      
      const dateRange = `${startFormatted} - ${endFormatted}`
      console.log('Formatted date range:', dateRange)
      
      // Add location if provided
      if (location) {
        return `${dateRange}, ${location}`
      }
      
      return dateRange
    } else {
      // Single date - try to parse as ISO date
      const date = new Date(dateString)
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.error('Invalid single date:', dateString)
        return dateString
      }
      
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })
      
      console.log('Formatted single date:', formattedDate)
      
      // Add location if provided
      if (location) {
        return `${formattedDate}, ${location}`
      }
      
      return formattedDate
    }
  } catch (error) {
    console.error('Error formatting project date:', error)
    return dateString
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data || []
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }

  return data
}

export async function searchProjects(searchTerm: string, category?: string): Promise<Project[]> {
  let query = supabase
    .from('projects')
    .select('*')

  // Add category filter if specified
  if (category && category !== 'All Articles') {
    query = query.contains('categories', [category])
  }

  const { data, error } = await query.order('id', { ascending: true })

  if (error) {
    console.error('Error searching projects:', error)
    return []
  }

  // If we have search term, filter the results
  if (searchTerm && data) {
    const searchLower = searchTerm.toLowerCase()
    return data.filter(project => {
      // Search in title
      const matchesTitle = project.title.toLowerCase().includes(searchLower)
      
      // Search in description
      const matchesDescription = project.description.toLowerCase().includes(searchLower)
      
      // Search in technologies
      const matchesTechnologies = project.technologies.some((tech: string) => 
        tech.toLowerCase().includes(searchLower)
      )
      
      // Search in achievements
      const matchesAchievements = project.achievements.some((achievement: string) => 
        achievement.toLowerCase().includes(searchLower)
      )
      
      // Search in categories
      const matchesCategories = project.categories.some((category: string) => 
        category.toLowerCase().includes(searchLower)
      )
      
      return matchesTitle || matchesDescription || matchesTechnologies || matchesAchievements || matchesCategories
    })
  }

  return data || []
}

export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('categories')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  // Extract unique categories from all projects
  const allCategories = data?.flatMap(project => project.categories) || []
  return Array.from(new Set(allCategories)).sort()
}

export async function getTechnologies(): Promise<string[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('technologies')

  if (error) {
    console.error('Error fetching technologies:', error)
    return []
  }

  // Extract unique technologies from all projects
  const allTechnologies = data?.flatMap(project => project.technologies) || []
  return Array.from(new Set(allTechnologies)).sort()
} 