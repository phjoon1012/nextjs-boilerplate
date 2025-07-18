import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkProjects() {
  try {
    console.log('Checking current projects in database...')
    
    const { data, error } = await supabase
      .from('projects')
      .select('id, title, slug')
      .order('id', { ascending: true })
    
    if (error) {
      console.error('Error fetching projects:', error)
      return
    }
    
    console.log('Current projects:')
    data?.forEach(project => {
      console.log(`ID: ${project.id}, Title: ${project.title}, Slug: ${project.slug}`)
    })
    
    console.log(`\nTotal projects: ${data?.length}`)
    
  } catch (error) {
    console.error('Failed to check projects:', error)
  }
}

checkProjects() 