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

async function addProjectLocations() {
  try {
    console.log('Adding project locations and updating dates...')
    
    // Sample data with single dates and locations
    const projectData = {
      'naive-bayes-classifier': {
        project_date: '2024-12-15',
        project_location: 'Stanford, CA'
      },
      'ecommerce-platform': {
        project_date: '2024-11-20',
        project_location: 'San Francisco, CA'
      },
      'ml-recommendation-system': {
        project_date: '2024-10-10',
        project_location: 'Seattle, WA'
      },
      'pixel-adventure-game': {
        project_date: '2024-09-15',
        project_location: 'Austin, TX'
      },
      'microservices-platform': {
        project_date: '2024-08-30',
        project_location: 'New York, NY'
      },
      'real-time-chat-app': {
        project_date: '2024-07-25',
        project_location: 'Boston, MA'
      },
      'computer-vision-system': {
        project_date: '2024-06-20',
        project_location: 'Pittsburgh, PA'
      },
      'space-explorer-vr': {
        project_date: '2024-05-15',
        project_location: 'Los Angeles, CA'
      },
      'pwa-task-manager': {
        project_date: '2024-04-10',
        project_location: 'Chicago, IL'
      },
      'nlp-chatbot': {
        project_date: '2024-03-25',
        project_location: 'Denver, CO'
      },
      'puzzle-quest-mobile': {
        project_date: '2024-02-20',
        project_location: 'Portland, OR'
      }
    }
    
    // Update each project with date and location
    for (const [slug, data] of Object.entries(projectData)) {
      const { data: result, error } = await supabase
        .from('projects')
        .update({
          project_date: data.project_date,
          project_location: data.project_location,
          updated_at: new Date().toISOString()
        })
        .eq('slug', slug)
        .select()
      
      if (error) {
        console.error(`Error updating ${slug}:`, error)
      } else {
        console.log(`✅ Updated ${slug} with date: ${data.project_date}, location: ${data.project_location}`)
      }
    }
    
    console.log('Project locations and dates added successfully!')
    
  } catch (error) {
    console.error('Failed to add project locations:', error)
  }
}

addProjectLocations() 