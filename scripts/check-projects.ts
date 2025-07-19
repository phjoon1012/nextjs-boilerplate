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

async function checkProjects() {
  console.log('🔍 Checking projects in database...')

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('id, title, slug, technologies, achievements')
      .order('id', { ascending: true })

    if (error) {
      console.error('❌ Error fetching projects:', error)
      return
    }

    if (data && data.length > 0) {
      console.log(`✅ Found ${data.length} project(s):`)
      data.forEach((project, index) => {
        console.log(`${index + 1}. ${project.title} (${project.slug})`)
        console.log(`   Technologies: ${project.technologies?.length || 0} items`)
        console.log(`   Achievements: ${project.achievements?.length || 0} items`)
        console.log('')
      })
    } else {
      console.log('📭 No projects found in database')
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the check
checkProjects()
  .then(() => {
    console.log('🎉 Check completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Check failed:', error)
    process.exit(1)
  }) 