import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

export type Status = "Needs Review" | "Approved";

export interface ContentItem {
  id: number;
  title: string;
  status: Status;
  date: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "content.db");

const SEED_ITEMS: Array<Omit<ContentItem, "id">> = [
  {
    title: "5 AI tools that actually save you time",
    status: "Needs Review",
    date: "2026-06-24",
  },
  {
    title: "I tried the 5am productivity routine for 30 days",
    status: "Approved",
    date: "2026-06-22",
  },
  {
    title: "Why your side project keeps failing (and how to fix it)",
    status: "Needs Review",
    date: "2026-06-20",
  },
  {
    title: "Building a SaaS in a weekend: full walkthrough",
    status: "Needs Review",
    date: "2026-06-18",
  },
  {
    title: "The truth about remote work nobody talks about",
    status: "Approved",
    date: "2026-06-15",
  },
  {
    title: "How I edit my videos in under an hour",
    status: "Needs Review",
    date: "2026-06-12",
  },
];

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (db) return db;

  fs.mkdirSync(DATA_DIR, { recursive: true });
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS content_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('Needs Review', 'Approved')),
      date TEXT NOT NULL
    );
  `);

  const { count } = db
    .prepare("SELECT COUNT(*) AS count FROM content_items")
    .get() as { count: number };

  if (count === 0) {
    const insert = db.prepare(
      "INSERT INTO content_items (title, status, date) VALUES (@title, @status, @date)"
    );
    const insertMany = db.transaction((items: typeof SEED_ITEMS) => {
      for (const item of items) insert.run(item);
    });
    insertMany(SEED_ITEMS);
  }

  return db;
}

export function getContentItems(): ContentItem[] {
  return getDb()
    .prepare(
      "SELECT id, title, status, date FROM content_items ORDER BY date DESC, id DESC"
    )
    .all() as ContentItem[];
}

export function approveContentItem(id: number): ContentItem | null {
  const database = getDb();
  database
    .prepare("UPDATE content_items SET status = 'Approved' WHERE id = ?")
    .run(id);
  return (
    (database
      .prepare("SELECT id, title, status, date FROM content_items WHERE id = ?")
      .get(id) as ContentItem | undefined) ?? null
  );
}
