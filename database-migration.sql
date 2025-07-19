-- Database Migration for Modular Project Sections
-- Run this in your Supabase SQL Editor

-- Add modular content sections
ALTER TABLE projects ADD COLUMN IF NOT EXISTS overview TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS objective TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS key_achievements TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS theory_approach TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tech_used TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS technical_deep_dive TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenges_solutions TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS review TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS future_improvements TEXT;

-- Add metadata for sections
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sections_order JSONB DEFAULT '["overview", "objective", "key_achievements", "theory_approach", "tech_used", "technical_deep_dive", "challenges_solutions", "review", "future_improvements"]'::jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sections_visibility JSONB DEFAULT '{"overview": true, "objective": true, "key_achievements": true, "theory_approach": true, "tech_used": true, "technical_deep_dive": true, "challenges_solutions": true, "review": true, "future_improvements": true}'::jsonb;

-- Add content management fields
ALTER TABLE projects ADD COLUMN IF NOT EXISTS content_type JSONB DEFAULT '{"overview": "markdown", "objective": "markdown", "key_achievements": "markdown", "theory_approach": "markdown", "tech_used": "markdown", "technical_deep_dive": "markdown", "challenges_solutions": "markdown", "review": "markdown", "future_improvements": "markdown"}'::jsonb;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS last_edited TIMESTAMP WITH TIME ZONE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS content_version INTEGER DEFAULT 1;

-- Add table of contents settings
ALTER TABLE projects ADD COLUMN IF NOT EXISTS show_toc BOOLEAN DEFAULT true;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS toc_position VARCHAR(20) DEFAULT 'left';

-- Verify the changes
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'projects' 
AND column_name IN (
  'overview', 'objective', 'key_achievements', 'theory_approach', 
  'tech_used', 'technical_deep_dive', 'challenges_solutions', 
  'review', 'future_improvements', 'sections_order', 'sections_visibility',
  'content_type', 'last_edited', 'content_version', 'show_toc', 'toc_position'
)
ORDER BY column_name; 