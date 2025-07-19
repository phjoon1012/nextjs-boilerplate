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

async function enhanceDatabaseForModularSections() {
  try {
    console.log('Enhancing database schema for modular project sections...')
    
    // SQL commands to add new columns for modular sections
    const sqlCommands = [
      // Remove old description field (we'll replace it with modular sections)
      // ALTER TABLE projects DROP COLUMN IF EXISTS description;
      
      // Add modular content sections
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS overview TEXT`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS objective TEXT`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS key_achievements TEXT`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS theory_approach TEXT`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS tech_used TEXT`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS technical_deep_dive TEXT`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenges_solutions TEXT`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS review TEXT`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS future_improvements TEXT`,
      
      // Add metadata for sections
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS sections_order JSONB DEFAULT '["overview", "objective", "key_achievements", "theory_approach", "tech_used", "technical_deep_dive", "challenges_solutions", "review", "future_improvements"]'::jsonb`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS sections_visibility JSONB DEFAULT '{"overview": true, "objective": true, "key_achievements": true, "theory_approach": true, "tech_used": true, "technical_deep_dive": true, "challenges_solutions": true, "review": true, "future_improvements": true}'::jsonb`,
      
      // Add content management fields
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS content_type JSONB DEFAULT '{"overview": "markdown", "objective": "markdown", "key_achievements": "markdown", "theory_approach": "markdown", "tech_used": "markdown", "technical_deep_dive": "markdown", "challenges_solutions": "markdown", "review": "markdown", "future_improvements": "markdown"}'::jsonb`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS last_edited TIMESTAMP WITH TIME ZONE`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS content_version INTEGER DEFAULT 1`,
      
      // Add table of contents settings
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS show_toc BOOLEAN DEFAULT true`,
      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS toc_position VARCHAR(20) DEFAULT 'left'`,
    ]
    
    console.log('Adding new columns to projects table...')
    
    for (const sql of sqlCommands) {
      const { error } = await supabase.rpc('exec_sql', { sql })
      if (error) {
        console.error('Error executing SQL:', error)
        console.log('SQL command that failed:', sql)
        console.log('\nNote: You may need to run these SQL commands manually in your Supabase dashboard:')
        console.log('1. Go to your Supabase project dashboard')
        console.log('2. Navigate to SQL Editor')
        console.log('3. Run each command individually')
      } else {
        console.log('✅ Successfully executed:', sql.split(' ').slice(0, 4).join(' ') + '...')
      }
    }
    
    console.log('\nDatabase schema enhancement completed!')
    console.log('\nNew modular sections added:')
    console.log('- overview: TEXT - Project overview')
    console.log('- objective: TEXT - Project objectives')
    console.log('- key_achievements: TEXT - Key achievements')
    console.log('- theory_approach: TEXT - Theory & approach')
    console.log('- tech_used: TEXT - Technologies used')
    console.log('- technical_deep_dive: TEXT - Technical deep dive')
    console.log('- challenges_solutions: TEXT - Challenges & solutions')
    console.log('- review: TEXT - Project review')
    console.log('- future_improvements: TEXT - Future improvements')
    
    console.log('\nManagement fields:')
    console.log('- sections_order: JSONB - Order of sections')
    console.log('- sections_visibility: JSONB - Which sections to show')
    console.log('- content_type: JSONB - Type of content (markdown/text)')
    console.log('- show_toc: BOOLEAN - Show table of contents')
    console.log('- toc_position: VARCHAR - Position of TOC (left/right)')
    
    console.log('\nNext steps:')
    console.log('1. Update your Project interface in src/lib/projects.ts')
    console.log('2. Create modular section components')
    console.log('3. Update your API routes to handle the new fields')
    console.log('4. Create the table of contents component')
    
  } catch (error) {
    console.error('Failed to enhance database schema:', error)
  }
}

enhanceDatabaseForModularSections() 