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

// Your existing project data
const projectsData = [
  {
    id: 1,
    title: "Full-Stack E-commerce Platform",
    description: "Led development of a complete e-commerce solution serving 50,000+ users with real-time inventory and payment processing",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe API"],
    duration: "3 months",
    achievements: ["Reduced checkout time by 40% through optimized payment flow", "Implemented real-time inventory management preventing overselling", "Achieved 99.9% uptime with automated monitoring and scaling"],
    categories: ["Web Development"],
    slug: "ecommerce-platform"
  },
  {
    id: 2,
    title: "Machine Learning Recommendation System",
    description: "Architected and deployed an AI-powered recommendation engine that personalizes content for 1M+ users",
    technologies: ["Python", "TensorFlow", "Scikit-learn", "Docker", "AWS"],
    duration: "4 months",
    achievements: ["Increased user engagement by 35% through personalized recommendations", "Reduced recommendation latency from 2s to 0.3s", "Scaled system to handle 10M+ daily requests with 99.5% accuracy"],
    categories: ["Artificial Intelligence"],
    slug: "ml-recommendation-system"
  },
  {
    id: 3,
    title: "2D Platformer Game - 'Pixel Adventure'",
    description: "Designed and developed a complete 2D platformer game with 50+ unique mechanics and levels",
    technologies: ["Unity", "C#", "Adobe Photoshop", "Git"],
    duration: "6 months",
    achievements: ["Published on Steam with 5,000+ downloads and 4.2-star rating", "Implemented 50+ game mechanics with modular architecture", "Optimized performance to maintain 60 FPS across all target devices"],
    categories: ["Game Development"],
    slug: "pixel-adventure-game"
  },
  {
    id: 4,
    title: "Real-time Chat Application",
    description: "Built a scalable real-time messaging platform supporting 10,000+ concurrent users with end-to-end encryption",
    technologies: ["React", "Socket.io", "Express.js", "MongoDB", "Redis"],
    duration: "2 months",
    achievements: ["Designed architecture supporting 10,000+ concurrent users", "Implemented end-to-end encryption ensuring message privacy", "Achieved sub-100ms message delivery across global regions"],
    categories: ["Web Development"],
    slug: "real-time-chat-app"
  },
  {
    id: 5,
    title: "Computer Vision Object Detection System",
    description: "Developed an AI system for real-time object detection achieving 95% accuracy in production environments",
    technologies: ["Python", "OpenCV", "YOLO", "PyTorch", "CUDA"],
    duration: "5 months",
    achievements: ["Achieved 95% detection accuracy across 20+ object classes", "Optimized for real-time processing at 30 FPS on edge devices", "Reduced false positives by 60% through advanced filtering algorithms"],
    categories: ["Artificial Intelligence"],
    slug: "computer-vision-system"
  },
  {
    id: 6,
    title: "3D VR Game - 'Space Explorer'",
    description: "Created an immersive VR space exploration game featuring advanced physics and interactive environments",
    technologies: ["Unreal Engine", "C++", "Blender", "Oculus SDK"],
    duration: "8 months",
    achievements: ["Featured in major VR gaming showcase with 10,000+ demo downloads", "Implemented advanced physics simulation with realistic space mechanics", "Optimized VR performance maintaining 90 FPS for smooth experience"],
    categories: ["Game Development"],
    slug: "space-explorer-vr"
  },
  {
    id: 7,
    title: "Progressive Web App - Task Manager",
    description: "Built a PWA for task management with 100% offline functionality and cross-platform deployment",
    technologies: ["React", "Service Workers", "IndexedDB", "PWA", "Firebase"],
    duration: "3 months",
    achievements: ["Implemented 100% offline functionality with data synchronization", "Created app-like user experience with native performance", "Deployed across iOS, Android, and web with single codebase"],
    categories: ["Web Development"],
    slug: "pwa-task-manager"
  },
  {
    id: 8,
    title: "Natural Language Processing Chatbot",
    description: "Developed an intelligent chatbot using transformer models with 95% conversation accuracy",
    technologies: ["Python", "Transformers", "BERT", "FastAPI", "Docker"],
    duration: "4 months",
    achievements: ["Achieved 95% conversation accuracy across multiple domains", "Implemented multi-language support for 5+ languages", "Reduced customer service costs by 40% through automated responses"],
    categories: ["Artificial Intelligence"],
    slug: "nlp-chatbot"
  },
  {
    id: 9,
    title: "Mobile Game - 'Puzzle Quest'",
    description: "Created a cross-platform puzzle game achieving 50,000+ downloads with 4.5-star rating",
    technologies: ["Flutter", "Dart", "Firebase", "Google Play Console"],
    duration: "5 months",
    achievements: ["Achieved 50,000+ downloads with 4.5-star average rating", "Featured in 'New Games' section on Google Play Store", "Implemented 100+ unique puzzle levels with progressive difficulty"],
    categories: ["Game Development"],
    slug: "puzzle-quest-mobile"
  },
  {
    id: 10,
    title: "Microservices Architecture Platform",
    description: "Designed and implemented a scalable microservices platform handling 100K+ requests per minute",
    technologies: ["Docker", "Kubernetes", "Node.js", "MongoDB", "Redis"],
    duration: "6 months",
    achievements: ["Achieved 99.9% system availability with automated failover", "Reduced deployment time from 2 hours to 15 minutes", "Scaled platform to handle 100K+ requests/minute with load balancing"],
    categories: ["CS Fundamentals"],
    slug: "microservices-platform"
  }
]

async function migrateData() {
  try {
    console.log('Starting data migration to Supabase...')
    
    // Clear existing data (optional - remove if you want to keep existing data)
    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .neq('id', 0) // Delete all rows
    
    if (deleteError) {
      console.error('Error clearing existing data:', deleteError)
      return
    }
    
    console.log('Cleared existing data')
    
    // Insert new data
    const { data, error } = await supabase
      .from('projects')
      .insert(projectsData)
      .select()
    
    if (error) {
      console.error('Error inserting data:', error)
      return
    }
    
    console.log(`Successfully migrated ${data?.length} projects to Supabase!`)
    console.log('Migration completed successfully!')
    
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

migrateData() 