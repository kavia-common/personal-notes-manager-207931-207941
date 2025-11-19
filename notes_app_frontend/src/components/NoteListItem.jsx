function formatTime(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString();
  } catch {
    return '';
  }
}

// PUBLIC_INTERFACE
export default function NoteListItem({ note, active, onClick }) {
  /** Renders a clickable note item */
  return (
    <div
      className={`note-item ${active ? 'active' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
      aria-pressed={active}
      aria-label={`Open note ${note.title || 'Untitled'}`}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="note-item-title">
          {note.title?.trim() || 'Untitled'}
        </div>
        <div className="note-item-meta">Updated {formatTime(note.updatedAt)}</div>
      </div>
    </div>
  );
}
