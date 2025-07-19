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

async function addEuchreProject() {
  try {
    console.log('Adding Euchre Card Game project...')
    
    const euchreProject = {
      title: "Euchre Card Game Implementation",
      description: `A complete implementation of the classic Euchre card game in C++, featuring object-oriented design, polymorphic player strategies, and comprehensive game logic. This project demonstrates advanced C++ programming concepts including inheritance, polymorphism, operator overloading, and complex algorithmic game mechanics.

THEORY & APPROACH:
This project implements the traditional Euchre card game, a trick-taking game popular in the Midwest United States. The design follows object-oriented principles with a clear separation of concerns: Card class handles individual card logic and comparison operations, Pack class manages the deck and shuffling, Player class provides polymorphic behavior for different player types (Human and Simple AI), and Game class orchestrates the overall game flow. The implementation uses inheritance and virtual functions to support multiple player strategies, allowing for both human players and AI opponents with different levels of sophistication.

TECHNICAL DEEP DIVE:
The Card class implements comprehensive comparison operators (<, >, <=, >=, ==, !=) and special Euchre-specific logic including trump suit handling, left bower detection, and face card identification. The Pack class manages a 24-card deck (7-Ace of each suit) with standard ordering and in-shuffle algorithms. The Player hierarchy uses virtual functions to support polymorphic behavior: SimplePlayer implements basic AI strategy for trump selection and card playing, while HumanPlayer provides interactive gameplay through console input. The Game class orchestrates the complete game flow including dealing, trump selection, trick playing, and scoring with proper turn management and team coordination.

CHALLENGES & SOLUTIONS:
The primary challenge was implementing the complex Euchre rules, particularly the trump suit mechanics and left bower logic. This was solved through careful state management and comprehensive card comparison functions that handle both regular and trump-based ordering. Another significant challenge was designing the polymorphic player system to support both human and AI players seamlessly. This was addressed through virtual function inheritance and factory pattern implementation. The trick-taking logic required careful tracking of led suits, trump cards, and valid playable cards, solved through iterative card validation and comparison algorithms. Memory management for dynamic player allocation was handled through proper RAII principles and smart pointer usage.

LESSONS LEARNED:
This project deepened my understanding of object-oriented design principles and the importance of clear class hierarchies in complex game implementations. The polymorphic player system demonstrated the power of virtual functions and inheritance for creating extensible, maintainable code. I learned the value of comprehensive operator overloading for custom data types and the importance of careful state management in game logic. The project also reinforced the significance of proper memory management and RAII principles in C++ development, particularly when dealing with dynamic object allocation and cleanup.`,
      technologies: ["C++", "Object-Oriented Programming", "Inheritance", "Polymorphism", "Operator Overloading", "Virtual Functions", "Game Development", "Algorithm Design"],
      duration: "3 months",
      project_date: "2023-02-15",
      project_location: "University of Illinois",
      achievements: [
        "Implemented complete Euchre card game with full rule compliance",
        "Designed polymorphic player system supporting human and AI players",
        "Created comprehensive card comparison logic with trump suit handling",
        "Developed sophisticated AI strategy for trump selection and card playing",
        "Built robust game flow management with proper turn and scoring systems"
      ],
      categories: ["CS Fundamentals"],
      slug: "euchre-card-game"
    }
    
    const { data, error } = await supabase
      .from('projects')
      .insert(euchreProject)
      .select()
    
    if (error) {
      console.error('Error adding Euchre project:', error)
    } else {
      console.log('✅ Successfully added Euchre Card Game project!')
      console.log('Project ID:', data[0].id)
    }
    
  } catch (error) {
    console.error('Failed to add Euchre project:', error)
  }
}

addEuchreProject() 