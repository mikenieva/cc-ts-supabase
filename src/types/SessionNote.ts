// TypeScript types for Session Notes

export interface SessionNote {
  id: number;
  client_name: string;
  session_date: string; // ISO date string
  notes: string;
  duration_minutes: number;
  created_at?: string;
}

export interface CreateSessionNoteInput {
  client_name: string;
  session_date: string;
  notes: string;
  duration_minutes: number;
}

export interface ValidationResponse {
  valid: boolean;
  error?: string;
}
