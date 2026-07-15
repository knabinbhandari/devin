"use client";

import type { ContentItem } from "@/lib/db";

function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ContentList({ items }: { items: ContentItem[] }) {
  function handleApprove(id: number) {
    // TODO: wire up approval for this item.
    // Intentionally a no-op placeholder for now — no API call, no state change.
    void id;
  }

  if (items.length === 0) {
    return <p className="empty">No content items yet.</p>;
  }

  return (
    <ul className="list">
      {items.map((item) => {
        const needsReview = item.status === "Needs Review";
        return (
          <li key={item.id} className="card">
            <div className="card-main">
              <h2 className="card-title">{item.title}</h2>
              <span className="card-date">{formatDate(item.date)}</span>
            </div>
            <div className="card-actions">
              <span
                className={`badge ${needsReview ? "badge-review" : "badge-approved"}`}
              >
                {item.status}
              </span>
              {needsReview && (
                <button
                  type="button"
                  className="approve-btn"
                  onClick={() => handleApprove(item.id)}
                >
                  Approve
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
