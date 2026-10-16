# Miniature Earth

A Vite, React, and strict TypeScript starter with a React Three Fiber preview, Tailwind CSS, and Vitest.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173. Baloo 2 and Nunito are bundled locally from Google Fonts with their OFL licenses. The procedural rounded box rotates continuously unless the visitor prefers reduced motion.

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

The production build is written to `dist/`. Vite copies existing public assets into that build without modifying the originals.

## Structure

```text
src/
  app/                 App composition and page smoke test
  components/scene/    React Three Fiber preview
  config/              Shared constants
  hooks/               Reduced-motion preference subscription
  lib/                 Reserved utility module
  pages/               Placeholder home page
  styles/              Tailwind theme and base styles
  test/                Vitest setup
  types/               Reserved domain types
```

Every source directory has an `index.ts`. The structure is provisional because CLAUDE.md and AGENTS.md were unavailable; see NOTES.md for assumptions and verification. This scaffold leaves `art/`, `public/models/`, and `public/icons/` unchanged.

Unit tests run in jsdom and substitute the canvas; real WebGL rendering and animation are verified separately in the browser. This distinction prevents a DOM-only test from falsely claiming to test a GPU renderer.

Setup references: [Tailwind's Vite integration](https://tailwindcss.com/docs/installation/using-vite) and [React Three Fiber's React compatibility guidance](https://r3f.docs.pmnd.rs/getting-started/installation). Exact dependency versions are pinned in package.json and package-lock.json.
