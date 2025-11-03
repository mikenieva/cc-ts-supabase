import { useState } from "react";
import type { FormEvent } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import type { CreateSessionNoteInput } from "../types/SessionNote";

interface NoteFormProps {
  onSubmit: (note: CreateSessionNoteInput) => Promise<boolean>;
}

export const NoteForm = ({ onSubmit }: NoteFormProps) => {
  const [clientName, setClientName] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [notes, setNotes] = useState("");
  const [duration, setDuration] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage("");

    const noteInput: CreateSessionNoteInput = {
      client_name: clientName,
      session_date: sessionDate,
      notes: notes,
      duration_minutes: parseInt(duration, 10),
    };

    const success = await onSubmit(noteInput);

    if (success) {
      // Clear form on success
      setClientName("");
      setSessionDate("");
      setNotes("");
      setDuration("");
      setSuccessMessage("Note created successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    }

    setSubmitting(false);
  };

  const isFormValid =
    clientName.trim() !== "" &&
    sessionDate !== "" &&
    notes.trim() !== "" &&
    duration !== "" &&
    parseInt(duration, 10) > 0;

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create New Session Note
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          margin="normal"
          required
          disabled={submitting}
        />

        <TextField
          fullWidth
          label="Session Date"
          type="date"
          value={sessionDate}
          onChange={(e) => setSessionDate(e.target.value)}
          margin="normal"
          required
          disabled={submitting}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          fullWidth
          label="Quick Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value.slice(0, 500))}
          margin="normal"
          required
          multiline
          rows={4}
          disabled={submitting}
          helperText={`${notes.length}/500 characters`}
        />

        <TextField
          fullWidth
          label="Duration (minutes)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          margin="normal"
          required
          disabled={submitting}
          inputProps={{ min: 1, max: 120 }}
          helperText="Session duration between 15-120 minutes"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isFormValid || submitting}
          sx={{ mt: 2 }}
        >
          {submitting ? "Creating..." : "Create Note"}
        </Button>
      </Box>
    </Paper>
  );
};
