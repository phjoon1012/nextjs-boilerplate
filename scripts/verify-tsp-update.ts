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

async function verifyTSPUpdate() {
  console.log('🔍 Verifying TSP project update...')

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', 'traveling-salesman-problem-solver')
      .single()

    if (error) {
      console.error('❌ Error fetching TSP project:', error)
      return
    }

    if (data) {
      console.log('✅ TSP Project Details:')
      console.log(`Title: ${data.title}`)
      console.log(`Slug: ${data.slug}`)
      console.log(`Updated at: ${data.updated_at}`)
      console.log('')
      
      console.log('🔧 Technologies:')
      if (data.technologies && data.technologies.length > 0) {
        data.technologies.forEach((tech: string, index: number) => {
          console.log(`  ${index + 1}. ${tech}`)
        })
      } else {
        console.log('  No technologies found')
      }
      console.log('')
      
      console.log('🏆 Achievements:')
      if (data.achievements && data.achievements.length > 0) {
        data.achievements.forEach((achievement: string, index: number) => {
          console.log(`  ${index + 1}. ${achievement}`)
        })
      } else {
        console.log('  No achievements found')
      }
      console.log('')
      
      console.log('📊 Summary:')
      console.log(`- Technologies: ${data.technologies?.length || 0} items`)
      console.log(`- Achievements: ${data.achievements?.length || 0} items`)
    } else {
      console.log('⚠️  TSP project not found')
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

verifyTSPUpdate()
  .then(() => {
    console.log('🎉 Verification completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Verification failed:', error)
    process.exit(1)
  }) 