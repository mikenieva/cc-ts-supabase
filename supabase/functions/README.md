# Supabase Edge Functions

This directory contains the Supabase Edge Functions used in this project.

## validate-session-note

**Purpose**: Server-side validation for session notes before saving to database.

**Location**: `supabase/functions/validate-session-note/index.ts`

**Deployment**: This function is deployed in Supabase Dashboard under Edge Functions.

### How to Deploy

1. Go to your Supabase project dashboard
2. Navigate to **Edge Functions** in the sidebar
3. Click **Create a new function**
4. Name it: `validate-session-note`
5. Copy the contents of `index.ts` into the editor
6. Click **Deploy**

### Function Details

- **Input**: JSON object with session note data

  ```typescript
  {
    client_name: string;
    session_date: string;
    notes: string;
    duration_minutes: number;
  }
  ```

- **Output**: Validation response

  ```typescript
  {
    valid: boolean
    error?: string
  }
  ```

- **Validation Rules**:
  - Duration must be a valid number
  - Duration must be between 15 and 120 minutes

### Testing

You can test the function using curl:

```bash
curl -X POST 'https://YOUR_PROJECT_ID.supabase.co/functions/v1/validate-session-note' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "client_name": "Test Client",
    "session_date": "2025-11-03",
    "notes": "Test notes",
    "duration_minutes": 60
  }'
```

Expected response:

```json
{
  "valid": true
}
```
