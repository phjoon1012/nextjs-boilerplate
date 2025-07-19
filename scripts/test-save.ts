import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

console.log('Supabase URL:', supabaseUrl)
console.log('Service Key exists:', !!supabaseServiceKey)

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testSave() {
  try {
    console.log('Testing save functionality...')
    
    // Test data
    const testData = {
      title: "Traveling Salesman Problem Solver",
      description: "Test description",
      overview: "Test overview content",
      theory_approach: "Test theory approach",
      technical_deep_dive: "Test technical deep dive",
      challenges_solutions: "Test challenges and solutions",
      review: "Test review",
      objective: "Test objective",
      tech_used: "Test tech used",
      future_improvements: "Test future improvements",
      technologies: ["JavaScript", "TypeScript"],
      categories: ["Algorithm", "Optimization"],
      duration: "2 months",
      project_date: "2023-03-31",
      project_location: "University of Michigan",
      achievements: ["Implemented 3 algorithms", "Achieved 95% accuracy"],
      code_snippets: []
    }

    console.log('Saving test data...')
    
    const { data, error } = await supabase
      .from('projects')
      .update(testData)
      .eq('slug', 'traveling-salesman-problem-solver')
      .select()

    if (error) {
      console.error('Error saving:', error)
      return
    }

    console.log('Save successful!')
    console.log('Updated data:', data[0])
    
  } catch (error) {
    console.error('Test failed:', error)
  }
}

testSave() 