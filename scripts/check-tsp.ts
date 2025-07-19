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

async function checkTSPProject() {
  console.log('🔍 Checking TSP project details...')

  try {
    // First, let's see all projects with "traveling" in the slug
    const { data: allData, error: allError } = await supabase
      .from('projects')
      .select('id, title, slug')
      .ilike('slug', '%traveling%')

    if (allError) {
      console.error('❌ Error fetching projects:', allError)
      return
    }

    console.log('📋 Projects with "traveling" in slug:')
    allData?.forEach(project => {
      console.log(`- ${project.title} (slug: "${project.slug}")`)
    })

    // Now try to get the exact TSP project
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
      console.log('✅ Found TSP project:')
      console.log(`Title: ${data.title}`)
      console.log(`Slug: ${data.slug}`)
      console.log(`Technologies: ${JSON.stringify(data.technologies)}`)
      console.log(`Achievements: ${JSON.stringify(data.achievements)}`)
    } else {
      console.log('⚠️  TSP project not found')
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the check
checkTSPProject()
  .then(() => {
    console.log('🎉 Check completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Check failed:', error)
    process.exit(1)
  }) 