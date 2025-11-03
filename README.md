# Therapy Session Quick Notes

A note-taking application for therapy sessions built with React, TypeScript, Material-UI, and Supabase.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Create Database Table

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE session_notes (
  id BIGSERIAL PRIMARY KEY,
  client_name TEXT NOT NULL,
  session_date DATE NOT NULL,
  notes TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE session_notes DISABLE ROW LEVEL SECURITY;
```

### 4. Deploy Edge Function

1. Go to Edge Functions in Supabase Dashboard
2. Create new function named `validate-session-note`
3. Copy code from `supabase/functions/validate-session-note/index.ts`
4. Deploy

### 5. Run the App

```bash
npm run dev
```

Open `http://localhost:5173`

## Supabase Project URL

`https://lhnagodehucixzhprgkq.supabase.co`

## Assumptions Made

1. **No Authentication**: User is already logged in (as per requirements)
2. **RLS Disabled**: Row Level Security disabled for demo purposes
3. **No Edit Functionality**: Only Create, Read, Delete operations (as per requirements)
4. **Edge Function Deployment**: Deployed via Dashboard (CLI would be used in production)
5. **Client-side Form Validation**: Basic validation in UI before calling edge function

## Tech Stack

- React 18 + TypeScript
- Material-UI (MUI) v5
- Supabase (PostgreSQL + Edge Functions)
- Vite

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom hooks (useSessionNotes)
├── lib/                # Supabase client
├── types/              # TypeScript types
└── App.tsx             # Main component

supabase/functions/     # Edge function code
```
