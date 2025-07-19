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

async function addTSPProject() {
  try {
    console.log('Adding Traveling Salesman Problem project...')
    
    const tspProject = {
      title: "Traveling Salesman Problem Solver",
      description: `A comprehensive implementation of the Traveling Salesman Problem (TSP) with three distinct algorithmic approaches, demonstrating advanced algorithmic design and optimization techniques for solving one of computer science's most challenging combinatorial optimization problems.

THEORY & APPROACH:
This project addresses the classic Traveling Salesman Problem, which seeks to find the shortest possible route that visits each city exactly once and returns to the starting city. The implementation explores three fundamentally different approaches: Minimum Spanning Tree (MST) for approximation, Arbitrary Insertion for fast heuristic solutions, and Branch-and-Bound with pruning for optimal solutions. The MST approach leverages the relationship between minimum spanning trees and TSP tours, while the arbitrary insertion method provides a greedy heuristic that balances speed and solution quality. The optimal solver employs sophisticated pruning techniques including lower bound calculations using MST approximations and edge cost analysis to dramatically reduce the search space.

TECHNICAL DEEP DIVE:
The implementation features three distinct coordinate structures optimized for each algorithm: Coordinate_MST for MST-based solutions with area type classification (land, sea, coast), Coordinate_FAST for heuristic approaches with efficient distance calculations, and Coordinate_OPT for optimal solutions with advanced pruning capabilities. The MST algorithm implements Prim's algorithm with area-based travel restrictions, ensuring valid paths between different terrain types. The FASTTSP solver uses arbitrary insertion with O(n²) complexity, iteratively inserting cities into the tour at optimal positions. The OPTTSP solver employs a sophisticated branch-and-bound approach with multiple pruning strategies: MST-based lower bounds, edge cost analysis, and partial tour evaluation to eliminate unpromising branches early in the search process.

CHALLENGES & SOLUTIONS:
The primary challenge was balancing computational efficiency with solution optimality across three different algorithmic paradigms. The MST approach required careful handling of area-based travel restrictions, solved through coordinate classification and path validation. The FASTTSP implementation needed to optimize insertion point selection, addressed through efficient distance matrix calculations and greedy insertion strategies. The most significant challenge was in the OPTTSP solver, where the exponential search space required sophisticated pruning techniques. This was solved through multiple lower bound calculations, including MST approximations and edge cost analysis, combined with early termination of unpromising branches. Memory management for large distance matrices was optimized through efficient data structures and careful memory allocation.

LESSONS LEARNED:
This project deepened my understanding of algorithmic complexity trade-offs and the importance of problem-specific optimizations. The implementation revealed how theoretical concepts like MST relationships and branch-and-bound pruning translate into practical performance improvements. I learned the value of algorithm selection based on problem constraints - when to prioritize speed (FASTTSP) versus optimality (OPTTSP) versus approximation quality (MST). The project also reinforced the importance of efficient data structures and memory management in algorithmic implementations, particularly when dealing with large-scale combinatorial problems.`,
      technologies: ["C++", "Algorithms", "Data Structures", "Graph Theory", "Dynamic Programming", "Branch and Bound", "Minimum Spanning Trees", "Heuristics"],
      duration: "4 months",
      project_date: "2023-03-31",
      project_location: "University of Illinois",
      achievements: [
        "Implemented three distinct TSP algorithms with different complexity-optimality trade-offs",
        "Achieved optimal solutions for small instances using sophisticated branch-and-bound pruning",
        "Developed efficient heuristic solutions for larger problem instances",
        "Applied graph theory concepts including MST relationships and edge cost analysis",
        "Optimized memory usage and computational efficiency for large-scale problems"
      ],
      categories: ["CS Fundamentals"],
      slug: "traveling-salesman-problem-solver"
    }
    
    const { data, error } = await supabase
      .from('projects')
      .insert(tspProject)
      .select()
    
    if (error) {
      console.error('Error adding TSP project:', error)
    } else {
      console.log('✅ Successfully added Traveling Salesman Problem project!')
      console.log('Project ID:', data[0].id)
    }
    
  } catch (error) {
    console.error('Failed to add TSP project:', error)
  }
}

addTSPProject() 