import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

export type ContentStatus = "Needs Review" | "Approved";

export interface ContentItem {
  id: number;
  title: string;
  status: ContentStatus;
  date: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "content.db");

const SEED_ITEMS: ReadonlyArray<Omit<ContentItem, "id">> = [
  {
    title: "How I automated my entire content workflow with AI agents",
    status: "Needs Review",
    date: "2026-07-11",
  },
  {
    title: "The 20-minute morning routine that actually stuck",
    status: "Approved",
    date: "2026-07-09",
  },
  {
    title: "I rebuilt my startup's landing page in a weekend — here's the result",
    status: "Needs Review",
    date: "2026-07-06",
  },
  {
    title: "Notion vs Obsidian: which one survives a real project?",
    status: "Needs Review",
    date: "2026-07-03",
  },
  {
    title: "Why most YouTube channels die at 1,000 subscribers",
    status: "Approved",
    date: "2026-06-30",
  },
  {
    title: "A day in the life of a solo indie developer",
    status: "Needs Review",
    date: "2026-06-27",
  },
];

let connection: Database.Database | null = null;

function connect(): Database.Database {
  if (connection) return connection;

  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new Database(DB_FILE);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS content_items (
      id     INTEGER PRIMARY KEY AUTOINCREMENT,
      title  TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('Needs Review', 'Approved')),
      date   TEXT NOT NULL
    );
  `);

  seedIfEmpty(db);
  connection = db;
  return db;
}

function seedIfEmpty(db: Database.Database): void {
  const row = db
    .prepare("SELECT COUNT(*) AS total FROM content_items")
    .get() as { total: number };

  if (row.total > 0) return;

  const insert = db.prepare(
    "INSERT INTO content_items (title, status, date) VALUES (@title, @status, @date)",
  );
  const insertAll = db.transaction(
    (items: ReadonlyArray<Omit<ContentItem, "id">>) => {
      for (const item of items) insert.run(item);
    },
  );
  insertAll(SEED_ITEMS);
}

export function listContentItems(): ContentItem[] {
  return connect()
    .prepare(
      "SELECT id, title, status, date FROM content_items ORDER BY date DESC, id DESC",
    )
    .all() as ContentItem[];
}

export function approveContentItem(id: number): ContentItem | null {
  const db = connect();
  db.prepare("UPDATE content_items SET status = 'Approved' WHERE id = ?").run(
    id,
  );
  const item = db
    .prepare("SELECT id, title, status, date FROM content_items WHERE id = ?")
    .get(id) as ContentItem | undefined;
  return item ?? null;
}
