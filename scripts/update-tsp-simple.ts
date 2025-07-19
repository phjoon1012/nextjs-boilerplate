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

async function updateTSP() {
  console.log('🔄 Updating TSP project...')

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
    const { data, error } = await supabase
      .from('projects')
      .update({
        technologies: technologies,
        achievements: achievements
      })
      .eq('slug', 'traveling-salesman-problem-solver')

    if (error) {
      console.error('❌ Error:', error)
      return
    }

    console.log('✅ Successfully updated TSP project!')
    console.log(`🔧 Technologies: ${technologies.length} items`)
    console.log(`🏆 Achievements: ${achievements.length} items`)

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

updateTSP()
  .then(() => {
    console.log('🎉 Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Failed:', error)
    process.exit(1)
  }) 