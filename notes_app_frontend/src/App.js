import React, { useMemo } from 'react';
import './index.css';
import AppShell from './components/AppShell';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import EmptyState from './components/EmptyState';
import { useLocalNotes } from './hooks/useLocalNotes';

// PUBLIC_INTERFACE
export default function App() {
  /**
   * Notes App entrypoint. Two-pane responsive layout:
   * - Left: searchable, scrollable list of notes
   * - Right: editor for selected note
   * Persistence: localStorage via 'notes_app.v1.notes'. If REACT_APP_API_BASE is set, app will try to use it but gracefully fall back to local storage.
   */
  const {
    filtered,
    notes,
    query,
    setQuery,
    selectedId,
    setSelectedId,
    createNote,
    updateNote,
    deleteNote,
    getById,
  } = useLocalNotes();

  const selectedNote = useMemo(() => (selectedId ? getById(selectedId) : null), [selectedId, getById]);

  const handleCreate = async () => {
    const n = await createNote();
    setSelectedId(n.id);
  };

  const handleChange = (patch) => {
    if (!selectedNote) return;
    updateNote(selectedNote.id, patch);
  };

  const layout = (
    <div className="surface">
      <div className="layout">
        <Sidebar
          query={query}
          setQuery={setQuery}
          notes={filtered}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onCreate={handleCreate}
        />
        <div className="editor-panel">
          <Editor
            note={selectedNote}
            onChange={handleChange}
            onDelete={(id) => {
              deleteNote(id);
              // pick a new selection will be handled in hook; ensure we unset if none left
              if (notes.length <= 1) {
                setSelectedId(null);
              }
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <AppShell onCreate={handleCreate}>
      {notes.length === 0 ? <EmptyState onCreate={handleCreate} /> : layout}
    </AppShell>
  );
}
