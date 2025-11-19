# Ocean Notes – React Frontend

A simple, responsive Notes app that lets you create, view, edit, and delete notes. Notes are persisted to localStorage and optionally synchronized with a backend if `REACT_APP_API_BASE` is defined.

## Features

- Ocean Professional theme with subtle gradients and shadows
- Responsive two-pane layout (stacks on small screens)
- Notes list with search (title/content)
- Editor with title and markdown-like text area
- Autosave and Cmd/Ctrl+S to save
- Delete with confirmation
- Persistence via localStorage using key: `notes_app.v1.notes`
- Optional REST API integration via `REACT_APP_API_BASE` (graceful fallback to local storage)

## Getting Started

In the project directory:

### `npm start`
Runs the app in development mode.  
Open http://localhost:3000 to view it in your browser (port 3000 as required).

### `npm run build`
Builds the app for production into the `build` folder.

## Environment Variables

This frontend uses standard CRA-style environment variables. Relevant ones for this app:
- `REACT_APP_API_BASE` – Optional. If set, the app will attempt CRUD against this base URL (e.g., `https://api.example.com`). If omitted or unreachable, the app will continue working with localStorage without crashing.

Other variables may exist in your environment; they are not required for this app to function.

## Data Model

```
{id: string, title: string, content: string, updatedAt: number}
```

## Storage

Notes are persisted under the key: `notes_app.v1.notes` in `window.localStorage`.

## Keyboard Shortcuts

- Cmd/Ctrl+S: Save current note (in addition to autosave)

## No Backend Required

This app works entirely offline using localStorage. If a backend is later provided, set `REACT_APP_API_BASE` to enable syncing.

## Theming

Colors:
- Primary: `#2563EB`
- Secondary/Accent: `#F59E0B`
- Error: `#EF4444`
- Background: `#f9fafb`
- Surface: `#ffffff`
- Text: `#111827`

Found in `src/styles/theme.css`.
