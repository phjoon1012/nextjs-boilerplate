# Database Migration Guide for Rich Content

## 🚨 **Critical Issue: Content Loss Risk**

Your current database schema only stores basic project information. The rich content (Theory & Approach, Lessons Learned, images, etc.) is **NOT stored in the database** and will be lost when you deploy or reset your environment.

## 🔧 **Solution: Enhanced Database Schema**

### **Step 1: Add New Columns to Projects Table**

Go to your **Supabase Dashboard** → **Table Editor** → **projects** table and add these columns:

#### **Rich Content Fields:**
```sql
-- Add rich content storage
ALTER TABLE projects ADD COLUMN rich_content TEXT;

-- Add structured content sections
ALTER TABLE projects ADD COLUMN theory_approach JSONB;
ALTER TABLE projects ADD COLUMN technical_deep_dive JSONB;
ALTER TABLE projects ADD COLUMN challenges_solutions JSONB;
ALTER TABLE projects ADD COLUMN lessons_learned JSONB;
```

#### **File Management Fields:**
```sql
-- Add image and file tracking
ALTER TABLE projects ADD COLUMN images JSONB DEFAULT '[]'::jsonb;
ALTER TABLE projects ADD COLUMN attachments JSONB DEFAULT '[]'::jsonb;
```

#### **Metadata Fields:**
```sql
-- Add version tracking and metadata
ALTER TABLE projects ADD COLUMN content_version INTEGER DEFAULT 1;
ALTER TABLE projects ADD COLUMN last_edited TIMESTAMP WITH TIME ZONE;
ALTER TABLE projects ADD COLUMN editor_metadata JSONB DEFAULT '{}'::jsonb;
```

### **Step 2: Update Project Interface**

Update `src/lib/projects.ts` to include the new fields:

```typescript
export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  duration: string
  achievements: string[]
  categories: string[]
  slug: string
  project_date?: string
  project_location?: string
  created_at?: string
  updated_at?: string
  
  // NEW FIELDS
  rich_content?: string
  theory_approach?: {
    problem_analysis: string
    design_philosophy: string
    algorithmic_thinking: string
  }
  technical_deep_dive?: {
    architecture_overview: string
    key_implementation_details: string[]
  }
  challenges_solutions?: Array<{
    challenge: string
    description: string
    solution: string
  }>
  lessons_learned?: {
    technical_insights: string
    development_process: string
    future_improvements: string
  }
  images?: Array<{
    url: string
    alt: string
    caption?: string
    uploaded_at: string
  }>
  attachments?: Array<{
    url: string
    filename: string
    file_type: string
    uploaded_at: string
  }>
  content_version?: number
  last_edited?: string
  editor_metadata?: Record<string, any>
}
```

### **Step 3: Update API Routes**

Update `src/app/api/projects/[slug]/route.ts` to handle the new fields:

```typescript
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json()
    const { slug } = params

    const { data, error } = await supabase
      .from('projects')
      .update({
        title: body.title,
        description: body.description,
        technologies: body.technologies.filter((t: string) => t.trim()),
        categories: body.categories.filter((c: string) => c.trim()),
        duration: body.duration,
        project_date: body.project_date || null,
        project_location: body.project_location || null,
        achievements: body.achievements.filter((a: string) => a.trim()),
        
        // NEW FIELDS
        rich_content: body.rich_content || null,
        theory_approach: body.theory_approach || null,
        technical_deep_dive: body.technical_deep_dive || null,
        challenges_solutions: body.challenges_solutions || null,
        lessons_learned: body.lessons_learned || null,
        images: body.images || [],
        attachments: body.attachments || [],
        content_version: (body.content_version || 1) + 1,
        last_edited: new Date().toISOString(),
        editor_metadata: body.editor_metadata || {},
        
        updated_at: new Date().toISOString()
      })
      .eq('slug', slug)
      .select()

    if (error) {
      console.error('Error updating project:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: data[0] })
  } catch (error) {
    console.error('Error in API route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

### **Step 4: Migrate Existing Content**

Create a migration script to move existing content to the new schema:

```typescript
// scripts/migrate-rich-content.ts
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function migrateRichContent() {
  try {
    console.log('Migrating existing content to new schema...')
    
    // Get all projects
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
    
    if (error) {
      console.error('Error fetching projects:', error)
      return
    }
    
    // Update each project with rich content
    for (const project of projects) {
      // Parse the existing description for structured content
      const richContent = project.description
      
      // Extract sections (you can enhance this parsing)
      const sections = parseDescriptionSections(project.description)
      
      const { error: updateError } = await supabase
        .from('projects')
        .update({
          rich_content: richContent,
          theory_approach: sections.theory_approach,
          technical_deep_dive: sections.technical_deep_dive,
          challenges_solutions: sections.challenges_solutions,
          lessons_learned: sections.lessons_learned,
          content_version: 1,
          last_edited: new Date().toISOString()
        })
        .eq('id', project.id)
      
      if (updateError) {
        console.error(`Error updating project ${project.id}:`, updateError)
      } else {
        console.log(`✅ Migrated project: ${project.title}`)
      }
    }
    
    console.log('Migration completed!')
    
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

function parseDescriptionSections(description: string) {
  // Add your parsing logic here
  // This is a placeholder - implement based on your content structure
  return {
    theory_approach: null,
    technical_deep_dive: null,
    challenges_solutions: null,
    lessons_learned: null
  }
}

migrateRichContent()
```

## 🎯 **Benefits of This Migration:**

### **✅ Data Persistence:**
- Rich content stored in database
- Images tracked and referenced
- Version control for content changes

### **✅ Environment Safety:**
- Content survives deployments
- Local and deployed environments can sync
- Backup and restore capabilities

### **✅ Enhanced Features:**
- Structured content sections
- Image management
- Content versioning
- Editor state persistence

## ⚠️ **Important Notes:**

1. **Backup First:** Always backup your current data before migration
2. **Test Locally:** Test the migration on a local copy first
3. **Update Code:** Update your frontend code to use the new fields
4. **File Storage:** Consider using Supabase Storage for images instead of local files

## 🚀 **Next Steps:**

1. Run the database schema updates
2. Update your TypeScript interfaces
3. Update your API routes
4. Migrate existing content
5. Test thoroughly before deploying

This will ensure your rich project content is properly stored and won't be lost! 🎉 