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

async function addProjectDateColumn() {
  try {
    console.log('Adding project_date column to projects table...')
    
    // Note: You'll need to add this column manually in Supabase dashboard
    // Go to your Supabase project > Table Editor > projects table
    // Add a new column:
    // - Name: project_date
    // - Type: date
    // - Default value: null
    // - Allow nullable: true
    
    console.log('Please add the project_date column manually in Supabase dashboard:')
    console.log('1. Go to your Supabase project')
    console.log('2. Navigate to Table Editor > projects table')
    console.log('3. Add a new column:')
    console.log('   - Name: project_date')
    console.log('   - Type: date')
    console.log('   - Default value: null')
    console.log('   - Allow nullable: true')
    console.log('4. Save the changes')
    console.log('5. Then run the add-project-dates.ts script again')
    
  } catch (error) {
    console.error('Failed to add project_date column:', error)
  }
}

addProjectDateColumn() 