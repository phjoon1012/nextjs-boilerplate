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

async function addProjectDates() {
  try {
    console.log('Adding project dates to existing projects...')
    
    // Sample dates for projects (you can modify these)
    const projectDates = {
      'naive-bayes-classifier': '2024-12-15',
      'ecommerce-platform': '2024-11-20',
      'ml-recommendation-system': '2024-10-10',
      'pixel-adventure-game': '2024-09-15',
      'microservices-platform': '2024-08-30',
      'real-time-chat-app': '2024-07-25',
      'computer-vision-system': '2024-06-20',
      'space-explorer-vr': '2024-05-15',
      'pwa-task-manager': '2024-04-10',
      'nlp-chatbot': '2024-03-25',
      'puzzle-quest-mobile': '2024-02-20'
    }
    
    // Update each project with a date
    for (const [slug, date] of Object.entries(projectDates)) {
      const { data, error } = await supabase
        .from('projects')
        .update({
          project_date: date,
          updated_at: new Date().toISOString()
        })
        .eq('slug', slug)
        .select()
      
      if (error) {
        console.error(`Error updating ${slug}:`, error)
      } else {
        console.log(`✅ Updated ${slug} with date: ${date}`)
      }
    }
    
    console.log('Project dates added successfully!')
    
  } catch (error) {
    console.error('Failed to add project dates:', error)
  }
}

addProjectDates() 