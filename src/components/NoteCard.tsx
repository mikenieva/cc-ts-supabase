import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import type { SessionNote } from "../types/SessionNote";

interface NoteCardProps {
  note: SessionNote;
  onDelete: (id: number) => void;
}

export const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  // Truncate notes to first 100 characters
  const truncatedNotes =
    note.notes.length > 100 ? `${note.notes.substring(0, 100)}...` : note.notes;

  // Format date for display
  const formattedDate = new Date(note.session_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Card elevation={2} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {note.client_name}
        </Typography>

        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Date:</strong> {formattedDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Duration:</strong> {note.duration_minutes} minutes
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mt: 2 }}>
          {truncatedNotes}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="error" onClick={() => onDelete(note.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
