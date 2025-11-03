import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import type {
  SessionNote,
  CreateSessionNoteInput,
  ValidationResponse,
} from "../types/SessionNote";

export const useSessionNotes = () => {
  const [notes, setNotes] = useState<SessionNote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all session notes
  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("session_notes")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setNotes(data || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch notes";
      setError(errorMessage);
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Validate note duration using Supabase Edge Function
  const validateNote = async (
    note: CreateSessionNoteInput
  ): Promise<ValidationResponse> => {
    try {
      // Call the edge function for server-side validation
      const { data, error } = await supabase.functions.invoke(
        "validate-session-note",
        {
          body: note,
        }
      );

      if (error) {
        console.error("Edge function error:", error);
        return {
          valid: false,
          error: error.message || "Validation failed",
        };
      }

      return data as ValidationResponse;
    } catch (err) {
      console.error("Error calling validation function:", err);
      return {
        valid: false,
        error: "Failed to validate note",
      };
    }
  };

  // Create a new session note
  const createNote = async (
    noteInput: CreateSessionNoteInput
  ): Promise<boolean> => {
    try {
      setError(null);

      // Validate before creating
      const validation = await validateNote(noteInput);
      if (!validation.valid) {
        setError(validation.error || "Validation failed");
        return false;
      }

      const { error: insertError } = await supabase
        .from("session_notes")
        .insert([noteInput]);

      if (insertError) throw insertError;

      // Refresh the notes list
      await fetchNotes();
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create note";
      setError(errorMessage);
      console.error("Error creating note:", err);
      return false;
    }
  };

  // Delete a session note
  const deleteNote = async (id: number): Promise<boolean> => {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from("session_notes")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      // Refresh the notes list
      await fetchNotes();
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete note";
      setError(errorMessage);
      console.error("Error deleting note:", err);
      return false;
    }
  };

  // Fetch notes on mount
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return {
    notes,
    loading,
    error,
    createNote,
    deleteNote,
    refreshNotes: fetchNotes,
  };
};
