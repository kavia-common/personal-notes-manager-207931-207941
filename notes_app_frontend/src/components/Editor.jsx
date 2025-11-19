import { useEffect, useRef, useState } from 'react';
import { useDebouncedEffect } from '../hooks/useDebouncedEffect';

// PUBLIC_INTERFACE
export default function Editor({
  note,
  onChange,
  onDelete,
}) {
  /**
   * Rich text area with title and content editing.
   * Auto-saves with debounce and saves on Cmd/Ctrl+S.
   */
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const contentRef = useRef(null);

  // When note changes, load into local state
  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced autosave on changes
  useDebouncedEffect(() => {
    if (!note) return;
    onChange({
      title,
      content,
    });
  }, [title, content, note?.id], 500);

  // Save on Cmd/Ctrl+S
  useEffect(() => {
    function handler(e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        if (note) {
          onChange({ title, content });
        }
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [note, title, content, onChange]);

  if (!note) {
    return (
      <div className="empty">
        Select a note from the list or create a new one.
      </div>
    );
  }

  return (
    <section className="editor">
      <div className="editor-toolbar">
        <input
          className="title-input"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="button"
          className="secondary-button"
          onClick={() => {
            if (window.confirm('Delete this note? This cannot be undone.')) {
              onDelete(note.id);
            }
          }}
          aria-label="Delete note"
          title="Delete note"
          style={{ color: '#EF4444', borderColor: 'rgba(239,68,68,0.3)' }}
        >
          Delete
        </button>
      </div>
      <textarea
        ref={contentRef}
        className="content-area"
        placeholder="Write your note here... (Markdown-like supported in future)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </section>
  );
}
