# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```shell
cp sample.env .env   # first-time setup
npm run dev          # start dev server (Vite)
npm run build        # build to dist/
npm run preview      # serve the dist/ build locally
npm run format       # format with Prettier
```

No test suite exists in this project.

## Architecture

This is a **vanilla JS single-page app** with no framework. Vite is used only for bundling/dev server.

### Entry points

- `index.html` + `index.js` — main editor
- `cheatsheet.html` — standalone reference page (no JS logic)

### How it works

1. **Schema fetch** (`index.js`): On load, the app fetches the Modulix JSON Schema from the Pix API (tries localhost first in dev, then integration, then recette). If all fail, it alerts and stops.

2. **Schema manipulation**: Before passing the schema to `JSONEditor`, `index.js` mutates it to configure display (header templates, collapsed state, sort order, read-only fields, defaults).

3. **JSONEditor** (from `@json-editor/json-editor` CDN): Renders the full editing form driven by the fetched JSON Schema. Uses Bootstrap 5 theme and FontAwesome 5 icons. Rich text fields use **Jodit** as the embedded WYSIWYG editor.

4. **LocalBackup** (`LocalBackup.js`): Persists editor state to `localStorage` under key `modulix-schema`. Auto-saves on every `change` event, restores on `ready`. Reset button clears this storage and reloads.

5. **Preview**: Clicking preview opens `https://app.integration.pix.fr/modules/preview` in a new window. The editor listens for a `postMessage` handshake from the Pix app, then sends the current module JSON via `postMessage`.

6. **JSON output pane**: A raw `<textarea>` showing current JSON. Changes to the textarea (on `focusout`) are parsed and fed back into the editor. Editing in either direction stays in sync.

7. **Format button**: Applies French typography normalization (non-breaking spaces before `:`, `?`, `!`, `»`, spacing around `«`, curly apostrophes, strips empty `<p><br></p>` and `\n` artifacts from Jodit).

### Environment

`VITE_API_PORT` in `.env` sets the localhost port for the schema API during development.

### Deployment

Pushes to `main` or `gh-pages` trigger a GitHub Actions workflow that builds with Vite and deploys `dist/` to GitHub Pages. The base path is `/modulix-editor/`.
