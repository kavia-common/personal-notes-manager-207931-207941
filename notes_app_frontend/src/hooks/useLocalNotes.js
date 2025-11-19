import { useCallback, useEffect, useMemo, useState } from 'react';
import { loadNotes, saveNotes } from '../utils/storage';
import { isApiEnabled, apiListNotes, apiCreateNote, apiUpdateNote, apiDeleteNote } from '../utils/api';

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// PUBLIC_INTERFACE
export function useLocalNotes() {
  /**
   * Hook providing notes CRUD with localStorage persistence and optional API usage.
   * Returns {
   *   notes, filtered, query, setQuery,
   *   selectedId, setSelectedId,
   *   createNote, updateNote, deleteNote, getById, refresh
   * }
   */
  const [notes, setNotes] = useState(() => loadNotes());
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');

  // Load from API if available, otherwise stick with local
  const refresh = useCallback(async () => {
    if (isApiEnabled()) {
      try {
        const apiNotes = await apiListNotes();
        if (Array.isArray(apiNotes)) {
          setNotes(apiNotes);
          saveNotes(apiNotes);
          if (apiNotes.length > 0 && !selectedId) {
            setSelectedId(apiNotes[0].id);
          }
          return;
        }
      } catch (e) {
        // fall back to local
        console.warn('API list failed, using localStorage', e);
      }
    }
    const local = loadNotes();
    setNotes(local);
    if (local.length > 0 && !selectedId) {
      setSelectedId(local[0].id);
    }
  }, [selectedId]);

  useEffect(() => {
    // initial load
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist to localStorage whenever notes change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const createNote = useCallback(async () => {
    const newNote = {
      id: uid(),
      title: 'Untitled',
      content: '',
      updatedAt: Date.now(),
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedId(newNote.id);
    if (isApiEnabled()) {
      try {
        const created = await apiCreateNote(newNote);
        // Prefer server returning the canonical resource; replace local if ids differ.
        if (created && created.id && created.id !== newNote.id) {
          setNotes(prev =>
            prev.map(n => (n.id === newNote.id ? { ...created } : n))
          );
          setSelectedId(created.id);
        }
      } catch (e) {
        console.warn('API create failed, staying local', e);
      }
    }
    return newNote;
  }, []);

  const updateNote = useCallback(async (id, patch) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n))
    );
    if (isApiEnabled()) {
      try {
        await apiUpdateNote(id, patch);
      } catch (e) {
        console.warn('API update failed, staying local', e);
      }
    }
  }, []);

  const deleteNote = useCallback(async (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (selectedId === id) {
      // choose next available
      setSelectedId(prevId => {
        if (prevId !== id) return prevId;
        const remaining = notes.filter(n => n.id !== id);
        return remaining.length ? remaining[0].id : null;
      });
    }
    if (isApiEnabled()) {
      try {
        await apiDeleteNote(id);
      } catch (e) {
        console.warn('API delete failed, staying local', e);
      }
    }
  }, [notes, selectedId]);

  const getById = useCallback((id) => notes.find(n => n.id === id) || null, [notes]);

  const filtered = useMemo(() => {
    if (!query) return notes;
    const q = query.toLowerCase();
    return notes.filter(n =>
      (n.title || '').toLowerCase().includes(q) ||
      (n.content || '').toLowerCase().includes(q)
    );
  }, [notes, query]);

  return {
    notes,
    filtered,
    query,
    setQuery,
    selectedId,
    setSelectedId,
    createNote,
    updateNote,
    deleteNote,
    getById,
    refresh,
  };
}
