//
// Optional API client - only used if REACT_APP_API_BASE is defined.
// Exposes CRUD functions. If base is not set, these functions will throw a special flag
// which should be handled by callers to fall back to local storage.
//

const API_BASE = process.env.REACT_APP_API_BASE;

// INTERNAL helper
async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// PUBLIC_INTERFACE
export function isApiEnabled() {
  /** Returns true if REACT_APP_API_BASE is set (non-empty). */
  return Boolean(API_BASE);
}

// PUBLIC_INTERFACE
export async function apiListNotes() {
  /** List notes via API if enabled. Throws if not enabled. */
  if (!isApiEnabled()) throw new Error('API_DISABLED');
  const res = await fetch(`${API_BASE}/notes`);
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function apiCreateNote(note) {
  /** Create a note via API if enabled. Throws if not enabled. */
  if (!isApiEnabled()) throw new Error('API_DISABLED');
  const res = await fetch(`${API_BASE}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function apiUpdateNote(id, update) {
  /** Update a note via API if enabled. Throws if not enabled. */
  if (!isApiEnabled()) throw new Error('API_DISABLED');
  const res = await fetch(`${API_BASE}/notes/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update),
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function apiDeleteNote(id) {
  /** Delete a note via API if enabled. Throws if not enabled. */
  if (!isApiEnabled()) throw new Error('API_DISABLED');
  const res = await fetch(`${API_BASE}/notes/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}
