import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Please check your .env.local file contains:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function updateTSPTechAndAchievements() {
  console.log('🔄 Updating TSP project technologies and achievements...')

  // Updated technologies and achievements for TSP project
  const technologies = [
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

  const achievements = [
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
    // First, let's get the current project to make sure it exists
    const { data: currentData, error: fetchError } = await supabase
      .from('projects')
      .select('id, title, technologies, achievements')
      .eq('slug', 'traveling-salesman-problem-solver')
      .single()

    if (fetchError) {
      console.error('❌ Error fetching TSP project:', fetchError)
      return
    }

    if (!currentData) {
      console.log('⚠️  TSP project not found')
      return
    }

    console.log('📊 Current project:', currentData.title)
    console.log('🔧 Current technologies:', currentData.technologies?.length || 0, 'items')
    console.log('🏆 Current achievements:', currentData.achievements?.length || 0, 'items')

    // Update the TSP project
    const { data, error } = await supabase
      .from('projects')
      .update({
        technologies: technologies,
        achievements: achievements,
        updated_at: new Date().toISOString()
      })
      .eq('id', currentData.id)
      .select()

    if (error) {
      console.error('❌ Error updating TSP project:', error)
      return
    }

    if (data && data.length > 0) {
      console.log('✅ Successfully updated TSP project!')
      console.log('📊 Updated project:', data[0].title)
      console.log('🔧 New technologies:', data[0].technologies?.length || 0, 'items')
      console.log('🏆 New achievements:', data[0].achievements?.length || 0, 'items')
      console.log('')
      console.log('🔧 Technologies:')
      data[0].technologies?.forEach((tech: string, index: number) => {
        console.log(`  ${index + 1}. ${tech}`)
      })
      console.log('')
      console.log('🏆 Achievements:')
      data[0].achievements?.forEach((achievement: string, index: number) => {
        console.log(`  ${index + 1}. ${achievement}`)
      })
    } else {
      console.log('⚠️  No project found with slug: traveling-salesman-problem-solver')
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the update
updateTSPTechAndAchievements()
  .then(() => {
    console.log('🎉 Update process completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Update failed:', error)
    process.exit(1)
  }) 