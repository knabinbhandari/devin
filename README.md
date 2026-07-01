# Content Pipeline Dashboard

A simple content pipeline dashboard built with Next.js (App Router). It shows a
list of content ideas (video ideas), each with a title, a status of either
**Needs Review** or **Approved**, and a date.

Items are persisted in a local SQLite database (via `better-sqlite3`) at
`data/content.db`, which is created and seeded automatically on first run.

## Getting started

This project targets **Node.js 20** (see `.nvmrc`). If you use `nvm`, run
`nvm use` first.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Troubleshooting

If the page returns a 500 with an error like `The module '.../better_sqlite3.node'
was compiled against a different Node.js version` (`ERR_DLOPEN_FAILED`), the native
`better-sqlite3` binary was built for a different Node.js version than the one
running the app. Rebuild it against your current Node version:

```bash
npm rebuild better-sqlite3
```

## Notes

- The database is seeded with 6 realistic content ideas on first launch.
- Each **Needs Review** item renders an **Approve** button. Its click handler is
  intentionally an empty placeholder (`TODO`) for now — clicking it does nothing
  and makes no API call. See `src/app/ContentList.tsx`.
- An unused approval API route lives at
  `src/app/api/items/[id]/approve/route.ts` for future wiring.
- The SQLite file under `data/` is gitignored.
