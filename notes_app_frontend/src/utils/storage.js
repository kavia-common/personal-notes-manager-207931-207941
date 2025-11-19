//
// Local storage utilities for persisting notes
//

const STORAGE_KEY = 'notes_app.v1.notes';

// PUBLIC_INTERFACE
export function getStorageKey() {
  /** Returns the storage key used to persist notes. */
  return STORAGE_KEY;
}

// PUBLIC_INTERFACE
export function loadNotes() {
  /** Load notes array from localStorage, returning [] if none or invalid. */
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (e) {
    console.warn('Failed to parse notes from localStorage', e);
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveNotes(notes) {
  /** Persist notes array to localStorage safely. */
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes || []));
  } catch (e) {
    console.warn('Failed to save notes to localStorage', e);
  }
}
