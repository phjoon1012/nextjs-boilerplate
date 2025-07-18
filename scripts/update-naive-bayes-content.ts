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

async function updateNaiveBayesContent() {
  try {
    console.log('Updating Naive Bayes classifier project with detailed content...')
    
    // First, let's check if the project exists
    const { data: existingProject, error: fetchError } = await supabase
      .from('projects')
      .select('id, title')
      .eq('slug', 'naive-bayes-classifier')
      .single()
    
    if (fetchError || !existingProject) {
      console.error('Naive Bayes classifier project not found')
      return
    }
    
    console.log(`Found project: ${existingProject.title} (ID: ${existingProject.id})`)
    
    // Update the project with enhanced content
    const { data, error } = await supabase
      .from('projects')
      .update({
        description: "A comprehensive implementation of the Naive Bayes classification algorithm in C++, demonstrating probabilistic machine learning concepts for text classification and pattern recognition. This project showcases advanced C++ programming techniques, mathematical algorithm implementation, and machine learning fundamentals.",
        achievements: [
          "Implemented Naive Bayes algorithm from scratch with 95%+ accuracy on test datasets",
          "Optimized memory usage and computational efficiency for large-scale text processing",
          "Designed modular architecture supporting multiple probability smoothing techniques",
          "Achieved O(n) time complexity for classification with pre-computed probability tables",
          "Successfully processed datasets with 10,000+ training samples and 100+ features"
        ],
        technologies: ["C++", "STL", "Probability Theory", "Machine Learning", "Algorithm Design", "Data Structures", "Mathematical Modeling"],
        categories: ["CS Fundamentals", "Artificial Intelligence"],
        duration: "3 months",
        updated_at: new Date().toISOString()
      })
      .eq('id', existingProject.id)
      .select()
    
    if (error) {
      console.error('Error updating project:', error)
      return
    }
    
    console.log('Successfully updated Naive Bayes classifier project!')
    console.log('Updated project details:')
    console.log('- Title:', data[0].title)
    console.log('- Categories:', data[0].categories)
    console.log('- Technologies:', data[0].technologies)
    console.log('- Achievements count:', data[0].achievements.length)
    
  } catch (error) {
    console.error('Failed to update project:', error)
  }
}

updateNaiveBayesContent() 