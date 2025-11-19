import '../styles/theme.css';
import Header from './Header';

// PUBLIC_INTERFACE
export default function AppShell({ children, onCreate }) {
  /** Layout wrapper with header and gradient background. */
  return (
    <div className="app-shell">
      <header className="header">
        <div className="header-inner">
          <div className="brand" aria-label="Notes brand">
            <div className="brand-badge">N</div>
            <div className="brand-title">Ocean Notes</div>
          </div>
          <div className="header-actions">
            <button type="button" className="primary-button" onClick={onCreate}>
              + New note
            </button>
            <Header />
          </div>
        </div>
      </header>
      <main className="main">{children}</main>
    </div>
  );
}
