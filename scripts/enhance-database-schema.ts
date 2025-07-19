import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function enhanceDatabaseSchema() {
  try {
    console.log('Enhancing database schema for rich project content...')
    
    // SQL commands to add new columns
    const sqlCommands = [
      // Add rich content fields
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS rich_content TEXT`,                                                                 
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS theory_approach JSONB`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS technical_deep_dive JSONB`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenges_solutions JSONB`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS lessons_learned JSONB`,
      
      // Add image and file management fields
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS attachments JSONB DEFAULT '[]'::jsonb`,
      
      // Add metadata fields
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS content_version INTEGER DEFAULT 1`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS last_edited TIMESTAMP WITH TIME ZONE`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS editor_metadata JSONB DEFAULT '{}'::jsonb`
    ]
    
    console.log('Adding new columns to projects table...')
    
    for (const sql of sqlCommands) {
      const { error } = await supabase.rpc('exec_sql', { sql })
      if (error) {
        console.error('Error executing SQL:', error)
        console.log('SQL command that failed:', sql)
      } else {
        console.log('✅ Successfully executed:', sql.split(' ').slice(0, 4).join(' ') + '...')
      }
    }
    
    console.log('\nDatabase schema enhancement completed!')
    console.log('\nNew fields added:')
    console.log('- rich_content: TEXT - Stores the full markdown content')
    console.log('- theory_approach: JSONB - Structured theory section')
    console.log('- technical_deep_dive: JSONB - Structured technical section')
    console.log('- challenges_solutions: JSONB - Structured challenges section')
    console.log('- lessons_learned: JSONB - Structured lessons section')
    console.log('- images: JSONB - Array of image references and metadata')
    console.log('- attachments: JSONB - Array of file attachments')
    console.log('- content_version: INTEGER - Version tracking for content')
    console.log('- last_edited: TIMESTAMP - When content was last modified')
    console.log('- editor_metadata: JSONB - Editor state and preferences')
    
    console.log('\nNext steps:')
    console.log('1. Update your Project interface in src/lib/projects.ts')
    console.log('2. Update your API routes to handle the new fields')
    console.log('3. Migrate existing content to the new schema')
    
  } catch (error) {
    console.error('Failed to enhance database schema:', error)
  }
}

enhanceDatabaseSchema() 