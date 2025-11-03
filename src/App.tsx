import { Container, Typography, Box, Alert } from "@mui/material";
import { NoteForm } from "./components/NoteForm";
import { NotesList } from "./components/NotesList";
import { useSessionNotes } from "./hooks/useSessionNotes";

function App() {
  const { notes, loading, error, createNote, deleteNote } = useSessionNotes();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Therapy Session Notes
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Quick notes for therapy sessions
        </Typography>
      </Box>

      {/* Global error message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Create Note Form */}
      <NoteForm onSubmit={createNote} />

      {/* Notes List */}
      <NotesList
        notes={notes}
        loading={loading}
        error={null}
        onDelete={deleteNote}
      />
    </Container>
  );
}

export default App;
