# Content Pipeline Dashboard

A simple content pipeline dashboard built with Next.js (App Router). It shows a
list of video content ideas, each with a **title**, a **status** of either
**Needs Review** or **Approved**, and a **date**.

State is persisted in a local SQLite database (via `better-sqlite3`) at
`data/content.db`, which is created and seeded automatically on first run.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Notes

- The database is seeded with 6 realistic video ideas on first launch.
- Each **Needs Review** item renders an **Approve** button. Its click handler
  (`handleApprove` in `src/app/ContentList.tsx`) is intentionally an empty
  placeholder (`TODO`) for now — clicking it does nothing and makes no API call.
- A placeholder approval API route lives at
  `src/app/api/items/[id]/approve/route.ts` for future wiring. It is not
  called by the UI yet.
- The SQLite file under `data/` is gitignored.
