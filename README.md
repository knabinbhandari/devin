# Content Pipeline Dashboard

A simple content pipeline dashboard built with Next.js (App Router). It shows a
list of content ideas (video ideas), each with a title, a status of either
**Needs Review** or **Approved**, and a date.

Items are persisted in a local SQLite database (via `better-sqlite3`) at
`data/content.db`, which is created and seeded automatically on first run.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Notes

- The database is seeded with 6 realistic content ideas on first launch.
- Each **Needs Review** item renders an **Approve** button. Its click handler is
  intentionally an empty placeholder (`TODO`) for now — clicking it does nothing
  and makes no API call. See `src/app/ContentList.tsx`.
- An unused approval API route lives at
  `src/app/api/items/[id]/approve/route.ts` for future wiring.
- The SQLite file under `data/` is gitignored.
