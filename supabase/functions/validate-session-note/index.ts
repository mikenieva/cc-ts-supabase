// Supabase Edge Function - runs on Deno runtime
// @ts-ignore - Deno imports are not recognized by Node.js TypeScript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface SessionNote {
  client_name: string;
  session_date: string;
  notes: string;
  duration_minutes: number;
}

interface ValidationResponse {
  valid: boolean;
  error?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Parse request body
    const note: SessionNote = await req.json();

    // Validate duration is between 15 and 120 minutes
    if (!note.duration_minutes || typeof note.duration_minutes !== "number") {
      const response: ValidationResponse = {
        valid: false,
        error: "Duration must be a valid number",
      };
      return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (note.duration_minutes < 15 || note.duration_minutes > 120) {
      const response: ValidationResponse = {
        valid: false,
        error: "Session duration must be between 15 and 120 minutes",
      };
      return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Validation passed
    const response: ValidationResponse = {
      valid: true,
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch {
    const response: ValidationResponse = {
      valid: false,
      error: "Invalid request format",
    };
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
