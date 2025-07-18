# Supabase Setup Guide

## 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
# Get these values from your Supabase project dashboard
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Service role key (for admin operations like data migration)
# Only use this in server-side code or migration scripts
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 2. Database Schema

Run the SQL commands from `database-schema.sql` in your Supabase SQL editor to create the projects table.

## 3. Data Migration

To migrate your existing project data to Supabase:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables in `.env.local`

3. Run the migration script:
   ```bash
   npx tsx scripts/migrate-to-supabase.ts
   ```

## 4. Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following values:
   - Project URL
   - anon/public key
   - service_role key (for migrations)

## 5. Database Structure

The `projects` table has the following structure:

- `id`: Primary key (auto-increment)
- `title`: Project title
- `description`: Project description
- `technologies`: Array of technologies used
- `duration`: Project duration
- `achievements`: Array of key achievements
- `categories`: Array of project categories
- `slug`: Unique URL slug
- `created_at`: Timestamp when record was created
- `updated_at`: Timestamp when record was last updated

## 6. Features

- **Search**: Full-text search across titles, descriptions, technologies, and achievements
- **Filtering**: Filter by categories
- **Real-time**: Data updates automatically when changed in Supabase
- **Performance**: Optimized with database indexes for fast queries 