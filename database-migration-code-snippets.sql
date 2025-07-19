-- Database Migration for Code Snippets
-- Run this in your Supabase SQL Editor

-- Add code_snippets column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS code_snippets JSONB DEFAULT '[]'::jsonb;

-- Verify the changes
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'projects' 
AND column_name = 'code_snippets'; 