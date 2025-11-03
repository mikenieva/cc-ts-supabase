import { useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { NoteCard } from "./NoteCard";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import type { SessionNote } from "../types/SessionNote";

interface NotesListProps {
  notes: SessionNote[];
  loading: boolean;
  error: string | null;
  onDelete: (id: number) => Promise<boolean>;
}

export const NotesList = ({
  notes,
  loading,
  error,
  onDelete,
}: NotesListProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<SessionNote | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = (note: SessionNote) => {
    setNoteToDelete(note);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!noteToDelete) return;

    setDeleting(true);
    const success = await onDelete(noteToDelete.id);
    setDeleting(false);

    if (success) {
      setDeleteDialogOpen(false);
      setNoteToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setNoteToDelete(null);
  };

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  // Empty state
  if (notes.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No session notes yet. Create your first one above!
        </Typography>
      </Box>
    );
  }

  // Notes list
  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Session Notes ({notes.length})
      </Typography>

      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={() => handleDeleteClick(note)}
        />
      ))}

      {/* Delete confirmation dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        clientName={noteToDelete?.client_name || ""}
      />

      {/* Show overlay when deleting */}
      {deleting && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};
