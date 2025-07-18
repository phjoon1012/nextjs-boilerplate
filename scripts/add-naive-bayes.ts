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

// Naive Bayes Classifier project data
const naiveBayesProject = {
  id: 11,
  title: "Naive Bayes Text Classifier",
  description: "Implemented a complete Naive Bayes classifier from scratch in C++ for text classification tasks, achieving high accuracy on document categorization and sentiment analysis",
  technologies: ["C++", "Machine Learning", "Naive Bayes", "Text Processing", "CSV Parsing", "Probability Theory"],
  duration: "2 months",
  achievements: [
    "Built a complete ML classifier from mathematical foundations without external libraries",
    "Implemented log-probability calculations to prevent numerical underflow in large datasets",
    "Added smoothing techniques for handling unseen words in test data",
    "Achieved 85%+ accuracy on text classification tasks with proper cross-validation",
    "Designed efficient data structures using STL maps and sets for O(log n) lookups"
  ],
  categories: ["CS Fundamentals", "Artificial Intelligence"],
  slug: "naive-bayes-classifier"
}

async function addNaiveBayesProject() {
  try {
    console.log('Adding Naive Bayes Classifier project to Supabase...')
    
    // Insert the new project
    const { data, error } = await supabase
      .from('projects')
      .insert(naiveBayesProject)
      .select()
    
    if (error) {
      console.error('Error adding project:', error)
      return
    }
    
    console.log('✅ Successfully added Naive Bayes Classifier project!')
    console.log('Project ID:', data?.[0]?.id)
    console.log('Slug:', data?.[0]?.slug)
    
  } catch (error) {
    console.error('Failed to add project:', error)
  }
}

addNaiveBayesProject() 