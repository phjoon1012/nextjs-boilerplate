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

async function forceUpdateTSP() {
  console.log('🔄 Force updating TSP project...')

  const newTechnologies = [
    'Python',
    'JavaScript',
    'React',
    'TypeScript',
    'Next.js',
    'Tailwind CSS',
    'Algorithm Design',
    'Data Structures',
    'Graph Theory',
    'Dynamic Programming',
    'C++',
    'Algorithms',
    'Branch and Bound',
    'Minimum Spanning Trees',
    'Heuristics'
  ]

  const newAchievements = [
    'Implemented multiple TSP solving algorithms including Nearest Neighbor, 2-opt, and Genetic Algorithm',
    'Created an interactive visualization system showing algorithm execution in real-time',
    'Achieved 15-25% improvement in solution quality compared to basic greedy approaches',
    'Built a responsive web interface with modern UI/UX design principles',
    'Integrated multiple optimization techniques for better performance',
    'Developed comprehensive documentation and code examples',
    'Successfully handled edge cases and large dataset processing',
    'Implemented three distinct TSP algorithms with different complexity-optimality trade-offs',
    'Achieved optimal solutions for small instances using sophisticated branch-and-bound pruning',
    'Developed efficient heuristic solutions for larger problem instances',
    'Applied graph theory concepts including MST relationships and edge cost analysis',
    'Optimized memory usage and computational efficiency for large-scale problems'
  ]

  try {
    // First, let's get the project ID
    const { data: projectData, error: fetchError } = await supabase
      .from('projects')
      .select('id')
      .eq('slug', 'traveling-salesman-problem-solver')
      .single()

    if (fetchError) {
      console.error('❌ Error fetching project:', fetchError)
      return
    }

    console.log(`📊 Found project with ID: ${projectData.id}`)

    // Now update with the new data
    const { data, error } = await supabase
      .from('projects')
      .update({
        technologies: newTechnologies,
        achievements: newAchievements,
        updated_at: new Date().toISOString()
      })
      .eq('id', projectData.id)
      .select()

    if (error) {
      console.error('❌ Error updating project:', error)
      return
    }

    if (data && data.length > 0) {
      const updatedProject = data[0]
      console.log('✅ Successfully updated TSP project!')
      console.log(`📊 Project: ${updatedProject.title}`)
      console.log(`🔧 Technologies: ${updatedProject.technologies?.length || 0} items`)
      console.log(`🏆 Achievements: ${updatedProject.achievements?.length || 0} items`)
      console.log(`🕒 Updated at: ${updatedProject.updated_at}`)
      
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

forceUpdateTSP()
  .then(() => {
    console.log('🎉 Force update completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Force update failed:', error)
    process.exit(1)
  }) 