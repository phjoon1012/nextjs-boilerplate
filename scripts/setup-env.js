#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');
const envExample = `# Supabase Configuration
# Get these values from your Supabase project dashboard
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Service role key (for admin operations like data migration)
# Only use this in server-side code or migration scripts
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
`;

if (fs.existsSync(envPath)) {
  console.log('✅ .env.local already exists');
} else {
  fs.writeFileSync(envPath, envExample);
  console.log('✅ Created .env.local file');
  console.log('📝 Please update the values in .env.local with your Supabase credentials');
}

console.log('\n📋 Next steps:');
console.log('1. Go to your Supabase project dashboard');
console.log('2. Navigate to Settings > API');
console.log('3. Copy the Project URL, anon key, and service_role key');
console.log('4. Update the values in .env.local');
console.log('5. Run the database schema in Supabase SQL editor');
console.log('6. Run: npx tsx scripts/migrate-to-supabase.ts'); 