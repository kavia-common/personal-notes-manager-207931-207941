export default function EmptyState({ onCreate }) {
  /** Simple empty-state prompting users to create their first note. */
  return (
    <div className="empty">
      <div style={{ maxWidth: 520 }}>
        <h2 style={{ marginTop: 0 }}>Welcome to Ocean Notes</h2>
        <p>
          Create, view, edit, and delete your personal notes. Everything is saved locally in your browser.
        </p>
        <button type="button" className="primary-button" onClick={onCreate}>
          Create your first note
        </button>
      </div>
    </div>
  );
}
