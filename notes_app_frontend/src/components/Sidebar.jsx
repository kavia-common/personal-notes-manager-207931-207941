import NoteListItem from './NoteListItem';

// PUBLIC_INTERFACE
export default function Sidebar({
  query,
  setQuery,
  notes,
  selectedId,
  onSelect,
  onCreate,
}) {
  /** Sidebar with search input and a list of notes */
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search"
          placeholder="Search notes..."
          aria-label="Search notes"
        />
        <button type="button" className="secondary-button" onClick={onCreate}>
          New
        </button>
      </div>
      <div className="note-list" role="list">
        {notes.length === 0 ? (
          <div className="empty">No notes yet. Create your first one!</div>
        ) : (
          notes.map((n) => (
            <NoteListItem
              key={n.id}
              note={n}
              active={n.id === selectedId}
              onClick={() => onSelect(n.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
