import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function updateWithEditPageData() {
  console.log('🔄 Updating TSP project with edit page data...')

  // Exact technologies from the edit page
  const technologies = [
    'C++',
    'Algorithms',
    'Data Structures',
    'Graph Theory',
    'Dynamic Programming',
    'Branch and Bound',
    'Minimum Spanning Trees',
    'Heuristics'
  ]

  // Exact achievements from the edit page
  const achievements = [
    'Implemented three distinct TSP algorithms with different complexity-optimality trade-offs',
    'Achieved optimal solutions for small instances using sophisticated branch-and-bound pruning',
    'Developed efficient heuristic solutions for larger problem instances',
    'Applied graph theory concepts including MST relationships and edge cost analysis',
    'Optimized memory usage and computational efficiency for large-scale problems'
  ]

  try {
    const { data, error } = await supabase
      .from('projects')
      .update({
        technologies: technologies,
        achievements: achievements,
        updated_at: new Date().toISOString()
      })
      .eq('slug', 'traveling-salesman-problem-solver')
      .select()

    if (error) {
      console.error('❌ Error updating project:', error)
      return
    }

    if (data && data.length > 0) {
      const updatedProject = data[0]
      console.log('✅ Successfully updated TSP project with edit page data!')
      console.log(`📊 Project: ${updatedProject.title}`)
      console.log(`🔧 Technologies: ${updatedProject.technologies?.length || 0} items`)
      console.log(`🏆 Achievements: ${updatedProject.achievements?.length || 0} items`)
      
      console.log('')
      console.log('🔧 Technologies:')
      updatedProject.technologies?.forEach((tech: string, index: number) => {
        console.log(`  ${index + 1}. ${tech}`)
      })
      
      console.log('')
      console.log('🏆 Achievements:')
      updatedProject.achievements?.forEach((achievement: string, index: number) => {
        console.log(`  ${index + 1}. ${achievement}`)
      })
    } else {
      console.log('⚠️  No data returned from update')
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

updateWithEditPageData()
  .then(() => {
    console.log('🎉 Update completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Update failed:', error)
    process.exit(1)
  }) 